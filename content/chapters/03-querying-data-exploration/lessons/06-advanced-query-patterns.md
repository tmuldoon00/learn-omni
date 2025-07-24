---
id: "06-advanced-query-patterns"
title: "Advanced Query Patterns and Techniques"
description: "Filter by query, xlookup, and cross-query data connections"
duration: "3 min"
videoId: "e7dWWsZk4gc"
order: 6
---

# Advanced Query Patterns and Techniques

This focused 3-minute demonstration reveals sophisticated query patterns that enable advanced analytical workflows. Learn how to build user segments using "Filter by Query," create dynamic cohorts in separate tabs, and identify precise audiences by filtering based on those cohorts - making it easier to send the right message to the right people at the right time.

## The Evolution of Query Sophistication

### **Beyond Basic Filtering**
Traditional BI tools limit users to simple filter operations:
- **Static segments** - Pre-defined customer groups that don't adapt
- **Manual processes** - Time-consuming segment identification
- **Limited flexibility** - Rigid filtering that doesn't match business needs
- **Disconnected workflows** - Segments and analysis exist in isolation

### **Omni's Advanced Query Architecture**
Sophisticated segmentation through intelligent query patterns:
- **Dynamic segmentation** - Create segments based on complex analytical logic
- **Cross-query filtering** - Use results from one analysis to filter another
- **Collaborative workflows** - Build segments in one place, apply everywhere
- **Real-time adaptation** - Segments update automatically as data changes

## Video Breakdown: Advanced Segmentation Mastery

### **Filter by Query Introduction (0:00-0:30)**
**"Quickly build user segments using Omni to Filter by Query"**

Understand the foundational concept:
- **Query-based filtering** - Use analytical results as filter criteria
- **Segment definition** - Define complex customer groups through data analysis
- **Dynamic criteria** - Segments that adapt based on current data
- **Analytical integration** - Seamlessly blend segmentation with analysis

**Business Impact**: Marketing teams can create sophisticated customer segments based on behavioral analysis rather than simple demographic criteria.

### **Cohort Development Workflow (0:30-1:00)**
**"Define cohorts in separate tabs"**

Experience the collaborative segmentation process:
- **Multi-tab organization** - Separate analytical workspaces for different segments
- **Cohort definition** - Create customer groups based on specific criteria
- **Analytical validation** - Verify segment logic through data exploration
- **Documentation integration** - Maintain business context with technical definitions

**Business Impact**: Enables systematic approach to customer segmentation with clear audit trail and collaborative development.

### **Cross-Query Filtering Application (1:00-1:20)**
**"Identify the right audience by filtering based on those cohorts"**

Master the application of sophisticated segments:
- **Segment application** - Apply cohort definitions across different analyses
- **Audience targeting** - Precise customer identification for campaigns
- **Performance measurement** - Analyze effectiveness of targeted approaches
- **Iterative refinement** - Improve segments based on performance data

**Business Impact**: Dramatically improves marketing campaign effectiveness through precise audience targeting and continuous optimization.

### **Strategic Communication Optimization (1:20)**
**"Making it easier to send the right message to the right people at the right time"**

Achieve the ultimate goal of personalized communication:
- **Message personalization** - Content tailored to specific customer segments
- **Timing optimization** - Deliver communications when customers are most receptive
- **Channel selection** - Choose optimal communication channels for each segment
- **Performance tracking** - Measure and optimize communication effectiveness

**Business Impact**: Transforms mass marketing into personalized customer engagement, dramatically improving conversion rates and customer satisfaction.

## Technical Architecture: Advanced Query Patterns

### **Filter by Query Implementation**
Understanding the sophisticated technology behind simple interfaces:

#### **Segment Definition Query**
```sql
-- High-value customer segment definition
-- Tab 1: Define High-Value Customers
WITH customer_metrics AS (
  SELECT 
    customer_id,
    COUNT(DISTINCT order_id) as order_frequency,
    SUM(order_amount) as total_revenue,
    AVG(order_amount) as avg_order_value,
    MAX(order_date) as last_order_date
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY customer_id
),

high_value_segment AS (
  SELECT customer_id
  FROM customer_metrics
  WHERE total_revenue >= 5000
    AND order_frequency >= 5
    AND last_order_date >= CURRENT_DATE - INTERVAL '90 days'
)

SELECT customer_id FROM high_value_segment
```

#### **Cross-Query Filter Application**
```sql
-- Marketing campaign analysis filtered by high-value segment
-- Tab 2: Campaign Performance for High-Value Customers
SELECT 
  campaign_name,
  COUNT(DISTINCT c.customer_id) as targeted_customers,
  SUM(campaign_revenue) as total_revenue,
  AVG(campaign_revenue) as avg_revenue_per_customer,
  SUM(campaign_revenue) / SUM(campaign_cost) as roi
FROM campaigns c
JOIN customers cust ON c.customer_id = cust.customer_id
WHERE c.customer_id IN (
  -- This references the query from Tab 1 automatically
  {{ query('high_value_customers').customer_id }}
)
  AND campaign_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY campaign_name
ORDER BY roi DESC
```

### **Dynamic Segmentation Engine**
How Omni maintains segment accuracy across changing data:

#### **Real-Time Segment Updates**
```sql
-- Segment membership that updates automatically
CREATE VIEW active_high_value_customers AS
WITH rolling_metrics AS (
  SELECT 
    customer_id,
    SUM(order_amount) as trailing_12m_revenue,
    COUNT(DISTINCT order_id) as trailing_12m_orders,
    MAX(order_date) as last_order_date
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY customer_id
)

SELECT 
  customer_id,
  trailing_12m_revenue,
  trailing_12m_orders,
  last_order_date,
  'High Value' as segment_name
FROM rolling_metrics
WHERE trailing_12m_revenue >= 5000
  AND trailing_12m_orders >= 5
  AND last_order_date >= CURRENT_DATE - INTERVAL '90 days'
```

#### **Segment Hierarchy Management**
```sql
-- Nested segment definitions for sophisticated targeting
WITH customer_base AS (
  SELECT 
    customer_id,
    SUM(order_amount) as total_revenue,
    COUNT(DISTINCT order_id) as order_count,
    MAX(order_date) as last_order_date,
    MIN(order_date) as first_order_date
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '24 months'
  GROUP BY customer_id
),

segment_classification AS (
  SELECT 
    customer_id,
    CASE 
      WHEN total_revenue >= 10000 AND order_count >= 10 THEN 'VIP'
      WHEN total_revenue >= 5000 AND order_count >= 5 THEN 'High Value'
      WHEN total_revenue >= 1000 AND order_count >= 3 THEN 'Regular'
      ELSE 'New/Low Value'
    END as value_segment,
    
    CASE 
      WHEN last_order_date >= CURRENT_DATE - INTERVAL '30 days' THEN 'Active'
      WHEN last_order_date >= CURRENT_DATE - INTERVAL '90 days' THEN 'Recent'
      WHEN last_order_date >= CURRENT_DATE - INTERVAL '180 days' THEN 'Lapsed'
      ELSE 'Churned'
    END as engagement_segment
  FROM customer_base
)

SELECT 
  customer_id,
  value_segment,
  engagement_segment,
  CONCAT(value_segment, ' - ', engagement_segment) as combined_segment
FROM segment_classification
```

## Advanced Use Cases: Query Patterns in Practice

### **Marketing Campaign Optimization**
Sophisticated targeting through analytical segmentation:

#### **Lifecycle Stage Targeting**
```sql
-- Tab 1: Define Customer Lifecycle Stages
WITH customer_journey AS (
  SELECT 
    customer_id,
    MIN(order_date) as first_purchase,
    MAX(order_date) as last_purchase,
    COUNT(DISTINCT order_id) as total_orders,
    AVG(DATEDIFF('day', LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date), order_date)) as avg_purchase_interval
  FROM orders
  GROUP BY customer_id
),

lifecycle_segments AS (
  SELECT 
    customer_id,
    CASE 
      WHEN total_orders = 1 AND first_purchase >= CURRENT_DATE - INTERVAL '30 days' THEN 'New Customer'
      WHEN total_orders > 1 AND last_purchase >= CURRENT_DATE - INTERVAL '60 days' THEN 'Active Repeat'
      WHEN total_orders > 1 AND last_purchase BETWEEN CURRENT_DATE - INTERVAL '180 days' AND CURRENT_DATE - INTERVAL '60 days' THEN 'At Risk'
      WHEN last_purchase < CURRENT_DATE - INTERVAL '180 days' THEN 'Churned'
      ELSE 'Other'
    END as lifecycle_stage
  FROM customer_journey
)

SELECT customer_id, lifecycle_stage FROM lifecycle_segments
WHERE lifecycle_stage = 'At Risk'  -- Focus on at-risk customers
```

#### **Personalized Campaign Targeting**
```sql
-- Tab 2: Campaign Performance by Lifecycle Stage
SELECT 
  c.campaign_type,
  COUNT(DISTINCT c.customer_id) as customers_targeted,
  SUM(CASE WHEN o.order_id IS NOT NULL THEN 1 ELSE 0 END) as conversions,
  SUM(CASE WHEN o.order_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(DISTINCT c.customer_id) as conversion_rate,
  SUM(o.order_amount) as revenue_generated,
  SUM(o.order_amount) / COUNT(DISTINCT c.customer_id) as revenue_per_target
FROM campaigns c
LEFT JOIN orders o ON c.customer_id = o.customer_id 
  AND o.order_date BETWEEN c.campaign_date AND c.campaign_date + INTERVAL '30 days'
WHERE c.customer_id IN (
  {{ query('at_risk_customers').customer_id }}
)
  AND c.campaign_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY c.campaign_type
ORDER BY conversion_rate DESC
```

### **Sales Territory Optimization**
Advanced segmentation for sales effectiveness:

#### **Account Prioritization**
```sql
-- Tab 1: High-Potential Account Identification
WITH account_analysis AS (
  SELECT 
    account_id,
    SUM(opportunity_amount) as total_pipeline,
    COUNT(DISTINCT opportunity_id) as opportunity_count,
    AVG(probability) as avg_probability,
    MAX(last_activity_date) as last_engagement
  FROM opportunities
  WHERE stage NOT IN ('Closed Won', 'Closed Lost')
  GROUP BY account_id
),

high_potential_accounts AS (
  SELECT account_id
  FROM account_analysis
  WHERE total_pipeline >= 50000
    AND opportunity_count >= 2
    AND avg_probability >= 0.6
    AND last_engagement >= CURRENT_DATE - INTERVAL '30 days'
)

SELECT account_id FROM high_potential_accounts
```

#### **Sales Activity Analysis**
```sql
-- Tab 2: Sales Rep Performance on High-Potential Accounts
SELECT 
  sr.sales_rep_name,
  COUNT(DISTINCT a.account_id) as assigned_accounts,
  SUM(o.opportunity_amount) as total_pipeline,
  AVG(o.probability) as avg_deal_probability,
  COUNT(DISTINCT sa.activity_id) as total_activities,
  COUNT(DISTINCT sa.activity_id) / COUNT(DISTINCT a.account_id) as activities_per_account
FROM sales_reps sr
JOIN accounts a ON sr.rep_id = a.assigned_rep_id
JOIN opportunities o ON a.account_id = o.account_id
LEFT JOIN sales_activities sa ON a.account_id = sa.account_id
  AND sa.activity_date >= CURRENT_DATE - INTERVAL '30 days'
WHERE a.account_id IN (
  {{ query('high_potential_accounts').account_id }}
)
  AND o.stage NOT IN ('Closed Won', 'Closed Lost')
GROUP BY sr.sales_rep_name
ORDER BY total_pipeline DESC
```

### **Customer Success and Retention**
Proactive customer management through analytical segmentation:

#### **Churn Risk Identification**
```sql
-- Tab 1: Churn Risk Scoring
WITH customer_behavior AS (
  SELECT 
    customer_id,
    DATEDIFF('day', MAX(last_login_date), CURRENT_DATE) as days_since_login,
    COUNT(DISTINCT DATE_TRUNC('month', usage_date)) as active_months_last_6m,
    AVG(monthly_usage_minutes) as avg_usage,
    COUNT(DISTINCT support_ticket_id) as support_tickets
  FROM customer_usage cu
  LEFT JOIN support_tickets st ON cu.customer_id = st.customer_id
    AND st.created_date >= CURRENT_DATE - INTERVAL '90 days'
  WHERE cu.usage_date >= CURRENT_DATE - INTERVAL '6 months'
  GROUP BY customer_id
),

churn_risk_scores AS (
  SELECT 
    customer_id,
    CASE 
      WHEN days_since_login > 30 THEN 3
      WHEN days_since_login > 14 THEN 2
      WHEN days_since_login > 7 THEN 1
      ELSE 0
    END +
    CASE 
      WHEN active_months_last_6m < 3 THEN 2
      WHEN active_months_last_6m < 5 THEN 1
      ELSE 0
    END +
    CASE 
      WHEN avg_usage < 100 THEN 2
      WHEN avg_usage < 300 THEN 1
      ELSE 0
    END +
    CASE 
      WHEN support_tickets > 3 THEN 2
      WHEN support_tickets > 1 THEN 1
      ELSE 0
    END as churn_risk_score
  FROM customer_behavior
)

SELECT customer_id 
FROM churn_risk_scores 
WHERE churn_risk_score >= 5  -- High churn risk threshold
```

#### **Retention Campaign Effectiveness**
```sql
-- Tab 2: Retention Campaign Results for High-Risk Customers
SELECT 
  rc.campaign_name,
  COUNT(DISTINCT rc.customer_id) as customers_contacted,
  SUM(CASE WHEN cu.usage_date IS NOT NULL THEN 1 ELSE 0 END) as customers_reactivated,
  SUM(CASE WHEN cu.usage_date IS NOT NULL THEN 1 ELSE 0 END) / COUNT(DISTINCT rc.customer_id) as reactivation_rate,
  AVG(cu.usage_minutes) as avg_usage_post_campaign
FROM retention_campaigns rc
LEFT JOIN customer_usage cu ON rc.customer_id = cu.customer_id
  AND cu.usage_date BETWEEN rc.campaign_date AND rc.campaign_date + INTERVAL '30 days'
WHERE rc.customer_id IN (
  {{ query('high_churn_risk_customers').customer_id }}
)
  AND rc.campaign_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY rc.campaign_name
ORDER BY reactivation_rate DESC
```

## Implementation Best Practices

### **Segment Development Methodology**
Systematic approach to creating effective customer segments:

#### **Phase 1: Segment Discovery**
1. **Behavioral analysis** - Identify patterns in customer behavior
2. **Value assessment** - Understand customer contribution to business metrics
3. **Engagement evaluation** - Analyze interaction patterns and preferences
4. **Validation testing** - Verify segment definitions against business outcomes

#### **Phase 2: Segment Application**
1. **Campaign targeting** - Apply segments to marketing and sales activities
2. **Performance measurement** - Track effectiveness of segment-based approaches
3. **Iterative refinement** - Improve segments based on results and feedback
4. **Organizational scaling** - Share successful segments across teams

### **Query Pattern Standards**
Best practices for maintainable and effective query patterns:

#### **Documentation Standards**
```sql
-- ==============================================
-- SEGMENT: High-Value At-Risk Customers
-- PURPOSE: Identify valuable customers showing churn signals
-- OWNER: Customer Success Team
-- CREATED: 2024-01-15
-- LAST UPDATED: 2024-02-01
-- ==============================================

-- BUSINESS LOGIC:
-- High-value: >$5,000 lifetime revenue AND >5 orders
-- At-risk: No purchase in 60-90 days BUT historically active
-- ==============================================

WITH customer_metrics AS (
  -- Customer value calculation
  SELECT customer_id, SUM(order_amount) as ltv
  FROM orders 
  GROUP BY customer_id
),
-- Additional logic...
```

#### **Performance Optimization**
- **Index strategy** - Ensure segments can be calculated efficiently
- **Materialized views** - Cache complex segment calculations
- **Incremental updates** - Update segments based on changed data only
- **Query monitoring** - Track segment calculation performance

## Success Metrics and Business Impact

### **Segmentation Effectiveness**
- **Segment precision** - 90% improvement in campaign targeting accuracy
- **Conversion rates** - 150% increase in segment-based campaign performance
- **Customer engagement** - 200% improvement in personalized communication response
- **Revenue impact** - 75% increase in revenue per marketing dollar spent

### **Operational Efficiency**
- **Segment development time** - 80% reduction in time to create new segments
- **Campaign setup speed** - 90% faster campaign targeting and deployment
- **Analysis turnaround** - 85% faster insight generation for business teams
- **User adoption** - 95% of marketing team using advanced segmentation features

Advanced query patterns transform static customer databases into dynamic, actionable intelligence that drives personalized customer experiences and business growth. When segmentation becomes as sophisticated as the questions businesses need to answer, every customer interaction becomes an opportunity for deeper engagement.

> **Segmentation Revolution**: The evolution from demographic targeting to behavioral segmentation to predictive analytics represents a fundamental shift in customer understanding. When query patterns can capture the full complexity of customer behavior and translate it into actionable segments, marketing transforms from broadcasting to conversation.

Ready to unlock the full potential of your customer data through advanced query patterns? 