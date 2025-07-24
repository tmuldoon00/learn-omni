---
id: "02-advanced-modeling-concepts"
title: "Advanced Modeling and Performance"
description: "Row-level security, caching policies, aggregate awareness, and branch management"
duration: "25 min"
videoId: "8Fhjv4cGe3I"
order: 2
---

# Advanced Modeling and Performance

Beyond basic semantic modeling, Omni provides enterprise-grade features for security, performance optimization, and sophisticated development workflows. This lesson covers the advanced concepts that separate simple BI tools from true enterprise data platforms, including practical guidance on migrating from legacy BI systems like Looker.

## Row-Level Security (RLS)

### Why Row-Level Security Matters

#### Business Challenge
Many organizations need to show the same dashboards to different users while ensuring each person only sees data they're authorized to access:

- **Sales Teams:** See only their territory's data
- **Regional Managers:** Access their region but not others
- **Multi-Tenant SaaS:** Each customer sees only their data
- **Financial Reporting:** Department-specific cost centers

#### Traditional Limitations
❌ **Separate Dashboards** - Maintenance nightmare with hundreds of similar reports
❌ **Manual Filtering** - Users can accidentally see unauthorized data
❌ **Database Views** - Rigid, hard to maintain, performance issues
❌ **Application Logic** - Security rules scattered across multiple systems

### Omni's RLS Implementation

#### User Attribute-Based Security
```yaml
# Model configuration
default_topic_access_filters:
  - field: sales_territory
    user_attribute: user_territory
    
  - field: department_code  
    user_attribute: user_department
    default_value: "NONE"  # Prevent access if attribute missing
```

#### Dynamic Security Examples

**Sales Territory Filtering:**
```yaml
# User: john.smith@company.com
user_attributes:
  user_territory: "West Coast"
  user_role: "Sales Rep"

# Automatic filter applied to all queries:
# WHERE sales_territory = 'West Coast'
```

**Multi-Tenant Customer Data:**
```yaml
# User: customer_analyst@clientco.com  
user_attributes:
  customer_id: "CUST_12345"
  data_access_level: "standard"

# All customer data tables automatically filtered:
# WHERE customer_id = 'CUST_12345'
```

#### Administrative Override
```yaml
# Admin users can bypass RLS filters
admin_bypass_filters: true
user_attributes:
  role: "admin"
  bypass_rls: true
```

### Implementation Strategies

#### 1. Schema-Level Security
**Use Case:** Each client has separate, identical schemas
```yaml
# Dynamic schema routing
dynamic_schemas:
  - user_attribute: client_id
    schema_pattern: "client_{client_id}_data"
    
# User with client_id: "acme" → schema: "client_acme_data"
```

#### 2. Database-Level Security  
**Use Case:** Each client has separate databases
```yaml
# Dynamic database environments
connection_environments:
  - name: "client_database"
    user_attribute: "client_db_name"
    database_pattern: "{client_db_name}_analytics"
```

#### 3. Table-Level Security
**Use Case:** All data in shared tables with access control columns
```yaml
# Row-level filtering on shared tables
access_filters:
  orders:
    - field: customer_tier
      user_attribute: access_tier
      operation: "in"  # Supports: =, !=, in, not_in, >, <, >=, <=
```

## Caching Policies and Performance

### Understanding Caching Strategy

#### Query Performance Hierarchy
```
1. In-Memory Cache (Fastest) - Milliseconds
2. Database Results - Seconds  
3. Complex Aggregations - Minutes
4. Cross-Database Joins - Could be slower
```

#### Business Impact of Poor Caching
- **User Experience:** Slow dashboards lead to abandonment
- **Database Load:** Repeated expensive queries impact system performance
- **Resource Costs:** Unnecessary compute and storage usage
- **Decision Speed:** Delayed insights affect business agility

### Omni's Caching Architecture

#### Multi-Level Caching Strategy

**1. Shared Model Caching**
```yaml
# Global caching policy
caching_policy:
  default_max_age: 3600  # 1 hour default
  
  # Override by query complexity
  complex_query_max_age: 7200    # 2 hours for expensive queries
  simple_query_max_age: 1800     # 30 minutes for fast queries
```

**2. Topic-Level Caching**
```yaml
# Topic-specific caching
topic: sales_performance
caching_policy:
  max_age: 900  # 15 minutes for operational metrics
  
topic: executive_summary  
caching_policy:
  max_age: 14400  # 4 hours for strategic reporting
```

**3. Workbook-Level Caching**
```yaml
# Individual workbook overrides
workbook_caching:
  enable_caching: true
  max_age: 300  # 5 minutes for real-time analysis
  cache_key_fields: ["date_filter", "region_filter"]
```

### Cache Optimization Strategies

#### Performance-Based Caching
```yaml
# Intelligent cache duration based on query performance
adaptive_caching:
  fast_queries: 1800      # 30 min for <5 second queries
  medium_queries: 3600    # 1 hour for 5-30 second queries  
  slow_queries: 7200      # 2 hours for >30 second queries
  
  # Automatic cache warming for popular queries
  cache_warming:
    enabled: true
    schedule: "0 6 * * *"  # 6 AM daily
    popular_query_threshold: 10  # Cache queries used >10 times
```

#### Cache Invalidation Strategies
```yaml
# Smart cache invalidation
cache_invalidation:
  # Time-based invalidation
  schedule_refresh: "0 */4 * * *"  # Every 4 hours
  
  # Data-driven invalidation
  invalidate_on_data_change: true
  change_detection_tables: ["orders", "customers"]
  
  # Manual invalidation triggers
  manual_refresh_enabled: true
  admin_force_refresh: true
```

## Aggregate Awareness

### The Performance Challenge

#### Query Performance Problems
```sql
-- Expensive query: Scanning millions of rows
SELECT 
  DATE_TRUNC('month', order_date) as month,
  SUM(order_total) as monthly_revenue
FROM orders 
WHERE order_date >= '2020-01-01'
GROUP BY month
ORDER BY month;

-- Query time: 45 seconds, scans 10M rows
```

#### Aggregate Awareness Solution
```sql
-- Omni automatically routes to pre-aggregated table:
SELECT 
  month,
  monthly_revenue
FROM monthly_order_summary
WHERE month >= '2020-01-01'
ORDER BY month;

-- Query time: 0.5 seconds, scans 48 rows
```

### Implementing Aggregate Awareness

#### Automatic Aggregate Detection
```yaml
# Omni detects and uses existing aggregate tables
aggregate_awareness:
  enabled: true
  
  # Define aggregate table patterns
  aggregate_tables:
    - base_table: "orders"
      aggregate_table: "daily_order_summary"
      aggregation_level: "day"
      dimensions: ["order_date", "product_category", "region"]
      measures: ["order_count", "total_revenue", "avg_order_size"]
      
    - base_table: "orders"  
      aggregate_table: "monthly_order_summary"
      aggregation_level: "month"
      dimensions: ["order_month", "product_category"]
      measures: ["order_count", "total_revenue"]
```

#### Intelligent Query Routing
```yaml
# Omni's query router logic
query_routing:
  # Route to most specific aggregate table available
  aggregation_precedence: ["hour", "day", "week", "month", "quarter", "year"]
  
  # Fallback to base table if aggregates don't match
  fallback_to_base: true
  
  # Performance thresholds
  route_to_aggregate_if:
    estimated_rows: "> 100000"
    estimated_time: "> 10 seconds"
```

### Creating Aggregate Tables

#### dbt Integration
```sql
-- dbt model: daily_sales_summary.sql
{{ config(
    materialized='table',
    indexes=[
      {'columns': ['order_date', 'region'], 'type': 'btree'},
    ]
) }}

SELECT 
  order_date,
  region,
  product_category,
  COUNT(*) as order_count,
  SUM(order_total) as total_revenue,
  AVG(order_total) as avg_order_value,
  COUNT(DISTINCT customer_id) as unique_customers
FROM {{ ref('orders') }}
GROUP BY order_date, region, product_category
```

#### Automatic Aggregate Generation
```yaml
# Omni can generate aggregate tables automatically
auto_aggregates:
  enabled: true
  
  # Generate aggregates for slow queries
  generate_for:
    query_time_threshold: 30  # seconds
    usage_threshold: 5       # queries per day
    
  # Aggregate generation schedule  
  generation_schedule: "0 2 * * *"  # 2 AM daily
  
  # Storage management
  retention_policy: "90 days"
  compression: true
```

## Branch Mode and Development Workflow

### Enterprise Development Challenges

#### Traditional BI Development Problems
- **Production Risk:** Changes break existing dashboards
- **No Testing:** Limited ability to validate changes safely
- **Collaboration Issues:** Multiple developers stepping on each other
- **Version Control:** No history or rollback capabilities
- **Change Management:** No approval process for production changes

### Omni's Branch Mode Solution

#### Git-Like Branching for BI
```
Production (main)
├── feature/new-sales-metrics (Developer A)
├── feature/customer-segmentation (Developer B)  
└── hotfix/dashboard-bug-fix (Developer C)
```

#### Branch Workflow
```yaml
# 1. Create development branch
branch: feature/marketing-attribution
base: main
description: "Add multi-touch attribution models"

# 2. Develop in isolation
changes:
  - add_field: "attribution_weight"
  - modify_view: "campaign_performance"  
  - create_topic: "Attribution Analysis"

# 3. Test and validate
validation:
  - test_queries: 15 passed
  - dashboard_compatibility: 3 dashboards updated
  - performance_impact: "Minimal - <5% query time increase"

# 4. Submit for review
pull_request:
  title: "Marketing Attribution Models"
  reviewers: ["data-team", "marketing-team"]
  description: "Implements last-touch and time-decay attribution"
```

### Branch Management Features

#### Isolation and Safety
```yaml
# Branch isolation guarantees
isolation:
  model_changes: "Branch-specific, no production impact"
  content_changes: "Isolated workbooks and dashboards"
  user_access: "Branch creators and invited collaborators only"
  data_access: "Same security rules as production"
```

#### Collaborative Development
```yaml
# Multiple developers on same branch
collaboration:
  concurrent_editing: true
  conflict_resolution: "Last writer wins with change tracking"
  comment_system: true
  approval_workflow: true
  
# Branch permissions
permissions:
  branch_creator: "Full edit access"
  invited_collaborators: "Edit access to specific topics"
  reviewers: "Read access for validation"
  admins: "Full access to all branches"
```

#### Production Deployment
```yaml
# Merge to production
deployment:
  validation_required: true
  approvals_required: 2
  automated_testing: true
  
  # Deployment options
  deployment_type: "zero_downtime"  # or "maintenance_window"
  rollback_plan: "automatic"
  
  # Post-deployment monitoring
  monitoring:
    performance_tracking: 24  # hours
    error_alerting: true
    usage_analytics: true
```

## Performance Monitoring and Optimization

### Query Performance Analytics

#### Performance Metrics Dashboard
```yaml
# Built-in performance monitoring
performance_monitoring:
  metrics:
    - query_execution_time: "P95, P99 percentiles"
    - cache_hit_rate: "Percentage of cached responses"
    - database_load: "Connection utilization"
    - user_experience: "Time to first visualization"
    
  alerts:
    - slow_query_threshold: 30  # seconds
    - cache_miss_threshold: 60  # percent
    - database_utilization: 80  # percent
```

#### Optimization Recommendations
```yaml
# Automated performance suggestions
performance_optimizer:
  recommendations:
    - type: "create_aggregate"
      confidence: 95
      description: "Create monthly sales summary table"
      expected_improvement: "10x faster queries"
      
    - type: "index_suggestion"  
      confidence: 87
      description: "Add index on orders.customer_id"
      expected_improvement: "3x faster joins"
      
    - type: "cache_policy_adjustment"
      confidence: 76
      description: "Increase cache time for executive reports"
      expected_improvement: "Reduce database load by 40%"
```

### Resource Management

#### Connection Pool Management
```yaml
# Database connection optimization
connection_management:
  max_connections: 50
  connection_timeout: 30  # seconds
  pool_size: 10
  
  # Query prioritization
  query_prioritization:
    interactive_queries: "high"
    scheduled_reports: "medium" 
    data_exports: "low"
    
  # Resource limits
  resource_limits:
    max_query_time: 300  # 5 minutes
    max_result_size: "100MB"
    concurrent_queries_per_user: 3
```

## Best Practices for Advanced Modeling

### Security Best Practices

#### Defense in Depth
```yaml
# Multi-layer security approach
security_layers:
  1_database_level: "Database user permissions"
  2_connection_level: "Omni connection roles" 
  3_model_level: "Topic and field access controls"
  4_row_level: "User attribute filtering"
  5_column_level: "Sensitive field restrictions"
```

#### Security Validation
```yaml
# Automated security testing
security_testing:
  - test_rls_enforcement: true
  - validate_user_attributes: true  
  - check_sensitive_data_exposure: true
  - audit_permission_changes: true
  
# Security monitoring
security_monitoring:
  failed_access_attempts: "Alert after 5 attempts"
  unusual_data_access: "Alert on access pattern changes"
  privilege_escalation: "Alert on permission changes"
```

### Performance Best Practices

#### Query Optimization Guidelines
```yaml
# Query performance guidelines
optimization_guidelines:
  - "Use specific date ranges rather than open-ended queries"
  - "Leverage existing aggregate tables when possible"
  - "Apply filters early in query execution"
  - "Use appropriate indexes for common join patterns"
  - "Monitor and tune cache policies based on usage patterns"
  
# Development standards
development_standards:
  - "Test performance impact of model changes"
  - "Document expected query patterns for new topics"
  - "Use branch mode for performance-sensitive changes" 
  - "Monitor resource usage after deployments"
```

### Development Workflow Standards

#### Model Development Lifecycle
```yaml
# Standardized development process
development_lifecycle:
  1_planning: "Define business requirements and success metrics"
  2_design: "Create model architecture and security design"
  3_development: "Implement in branch with testing"
  4_validation: "Stakeholder testing and performance validation"
  5_deployment: "Merge to production with monitoring"
  6_monitoring: "Track adoption and performance post-deployment"
```

## Measuring Advanced Modeling Success

### Key Performance Indicators

#### Technical Metrics
```yaml
performance_kpis:
  - avg_query_response_time: "< 10 seconds"
  - cache_hit_rate: "> 70%"
  - database_utilization: "< 80%"
  - model_deployment_time: "< 2 days"
  - production_incidents: "< 1 per month"
```

#### Business Metrics  
```yaml
business_kpis:
  - self_service_adoption: "% of queries created by business users"
  - time_to_insight: "Days from question to dashboard"
  - user_satisfaction: "Survey scores and usage growth"
  - data_governance_compliance: "% of data following security rules"
  - analytics_roi: "Business value per dollar of analytics investment"
```

Advanced modeling capabilities transform Omni from a simple BI tool into an enterprise data platform that scales securely and performantly while maintaining the agility needed for modern business analytics. The combination of row-level security, intelligent caching, aggregate awareness, and branch-based development creates a foundation for analytics that grows with your organization.

> **Next Steps:** Our next lesson dives into Security and Governance, where we'll explore enterprise-grade controls, audit capabilities, and compliance frameworks that ensure your analytics platform meets the highest security standards. 