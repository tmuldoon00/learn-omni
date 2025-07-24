---
id: "05-dbt-bidirectional-workflow"
title: "Bi-Directional dbt Development"
description: "Create, edit, and manage dbt models directly from Omni"
duration: "7 min"
videoId: "l_FQFzPWQYU"
order: 5
---

# Bi-Directional dbt Development

This focused 7-minute demonstration showcases Omni's revolutionary bi-directional dbt integration. Watch as the traditional barriers between BI analysis and dbt development disappear, enabling seamless workflows that let you pull changes from dbt into Omni with one click, see dbt metadata directly in Omni, push logic from Omni down to dbt, and use dynamic environments to test model changes before shipping.

## The Integration Revolution

### **Breaking Down Silos**
Traditional analytics workflows create artificial barriers:
- **Tool switching** - Constant context changes between dbt Cloud, GitHub, and BI tools
- **Development delays** - Waiting for dbt deployments to see BI impact
- **Knowledge fragmentation** - Business logic scattered across systems
- **Collaboration friction** - Data engineers and analysts working in isolation

### **Omni's Bi-Directional Solution**
Omni eliminates these barriers through seamless integration:
- **Unified interface** - Develop both dbt and BI logic from one environment
- **Real-time synchronization** - Changes appear immediately across systems
- **Preserved context** - Metadata and documentation flow both directions
- **Collaborative development** - All stakeholders work in the same space

## Video Breakdown: Bi-Directional Workflow in Action

### **Pull Changes from dbt with One Click (0:00-2:00)**
**"Pull in changes from dbt into Omni with one click"**

Watch the seamless synchronization process:
- **Automatic detection** - Omni identifies new dbt models and changes
- **One-click refresh** - Schema updates instantly available in Omni
- **Dependency resolution** - Related models updated automatically
- **Version tracking** - Changes logged for audit and rollback

**Business Impact**: Development teams stay synchronized without manual coordination or deployment delays.

### **dbt Metadata Integration (2:00-4:00)**
**"See relevant metadata from dbt in Omni"**

Observe how dbt context enriches the Omni experience:
- **Model documentation** - dbt descriptions appear in Omni field picker
- **Lineage information** - Data flow visualization from dbt lineage
- **Test results** - dbt data quality tests displayed in Omni
- **Performance metrics** - Query execution data from dbt Cloud

**Business Impact**: Analysts gain complete context about data quality and business logic without leaving their analysis environment.

### **Push Logic from Omni to dbt (4:00-6:00)**
**"Push logic from Omni down to dbt"**

See successful BI logic promoted to production infrastructure:
- **Logic translation** - Omni calculations converted to dbt SQL
- **Code generation** - Complete dbt models created from BI definitions
- **Testing integration** - Validation rules transferred between systems
- **Documentation sync** - Business context preserved in dbt

**Business Impact**: Successful analytical discoveries become permanent organizational assets without requiring data engineering rework.

### **Dynamic Environment Testing (6:00-7:00)**
**"Use dynamic environments to test model changes before shipping"**

Experience safe experimentation and deployment:
- **Environment switching** - Toggle between dev and production schemas
- **Impact preview** - See effects of changes before deployment
- **Rollback capabilities** - Quick recovery from problematic changes
- **Collaborative testing** - Multiple users validating changes together

**Business Impact**: Organizations can innovate rapidly while maintaining production stability and data integrity.

## Technical Deep-Dive: How Bi-Directional Integration Works

### **dbt → Omni Synchronization**
Understanding the pull workflow:

#### **Schema Discovery and Import**
```yaml
# dbt model definition
models:
  - name: customer_metrics
    description: "Customer performance KPIs"
    columns:
      - name: customer_id
        description: "Unique customer identifier"
        tests:
          - unique
          - not_null
      - name: lifetime_value
        description: "Predicted customer lifetime value"
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
```

**Omni Integration Result:**
- **Field descriptions** automatically populate Omni metadata
- **Data quality tests** surface as data validation indicators
- **Model relationships** create automatic join suggestions
- **Performance stats** inform query optimization

#### **Metadata Preservation**
- **Business context** - dbt descriptions become Omni field help text
- **Technical context** - Column types, constraints, and indexes preserved
- **Quality context** - Test results and data freshness indicators
- **Lineage context** - Upstream and downstream dependencies visualized

### **Omni → dbt Synchronization**
Understanding the push workflow:

#### **Logic Translation Engine**
```excel
// Omni calculation
monthly_churn_rate = 
  COUNT(IF(AND(last_activity < TODAY() - 30, 
               signup_date < TODAY() - 30), 
           customer_id)) / 
  COUNT(DISTINCT(customer_id))
```

**Generated dbt Model:**
```sql
WITH active_customers AS (
  SELECT customer_id, 
         MAX(activity_date) as last_activity,
         MIN(signup_date) as signup_date
  FROM {{ ref('customer_activity') }}
  GROUP BY customer_id
),

churn_calculation AS (
  SELECT 
    CURRENT_DATE() as calculation_date,
    COUNTIF(last_activity < CURRENT_DATE() - 30 
            AND signup_date < CURRENT_DATE() - 30) as churned_customers,
    COUNT(DISTINCT customer_id) as total_customers
  FROM active_customers
)

SELECT 
  calculation_date,
  churned_customers,
  total_customers,
  churned_customers / total_customers as monthly_churn_rate
FROM churn_calculation
```

#### **Code Generation Process**
1. **Syntax parsing** - Omni formulas parsed into logical components
2. **SQL translation** - Business logic converted to database-specific SQL
3. **dbt integration** - SQL wrapped in appropriate dbt model structure
4. **Testing creation** - Validation rules generated for data quality
5. **Documentation generation** - Business context preserved in dbt docs

### **Dynamic Environment Management**
Enabling safe experimentation:

#### **Environment Configuration**
```yaml
# Dynamic environment setup
environments:
  production:
    connection: prod_warehouse
    schema: analytics
    branch: main
  
  development:
    connection: dev_warehouse  
    schema: analytics_dev
    branch: feature/new-metrics
```

#### **Seamless Environment Switching**
- **One-click toggle** - Switch between prod and dev instantly
- **Data isolation** - Separate schemas prevent production impact
- **Collaborative testing** - Multiple users can test simultaneously
- **Rollback protection** - Easy recovery from experimental changes

## Real-World Implementation Examples

### **Marketing Analytics Evolution**
Watch how bi-directional development transforms marketing analytics:

#### **Traditional Workflow**
1. **Business request** - Marketing needs new attribution model
2. **Requirements gathering** - Data team schedules discovery meetings
3. **dbt development** - Data engineer codes attribution logic
4. **Testing and validation** - Multiple rounds of feedback and revision
5. **BI implementation** - Separate development of reporting layer
6. **User acceptance testing** - Business stakeholders validate final results

**Timeline**: 4-6 weeks

#### **Bi-Directional Workflow**
1. **Analyst experimentation** - Marketing analyst tests attribution approaches in Omni
2. **Logic refinement** - Real-time iteration based on actual data patterns  
3. **Validation with stakeholders** - Interactive testing with business users
4. **One-click promotion** - Successful logic pushed to dbt automatically
5. **Production deployment** - Coordinated release across systems

**Timeline**: 1-2 days

### **Financial Reporting Transformation**
See how finance teams accelerate reporting development:

#### **Monthly Close Acceleration**
```excel
// Omni prototype calculation
monthly_recurring_revenue = 
  SUMIF(AND(subscription_status = "Active",
            billing_frequency = "Monthly"),
        subscription_amount)

quarterly_growth_rate = 
  (current_quarter_mrr - previous_quarter_mrr) / previous_quarter_mrr
```

**Promoted to dbt:**
```sql
WITH subscription_metrics AS (
  SELECT 
    DATE_TRUNC('month', billing_date) as billing_month,
    SUM(CASE WHEN subscription_status = 'Active' 
             AND billing_frequency = 'Monthly'
             THEN subscription_amount 
             ELSE 0 END) as monthly_recurring_revenue
  FROM {{ ref('subscriptions') }}
  GROUP BY billing_month
),

growth_calculations AS (
  SELECT 
    billing_month,
    monthly_recurring_revenue,
    LAG(monthly_recurring_revenue, 3) OVER (ORDER BY billing_month) as prior_quarter_mrr,
    (monthly_recurring_revenue - LAG(monthly_recurring_revenue, 3) OVER (ORDER BY billing_month)) 
    / LAG(monthly_recurring_revenue, 3) OVER (ORDER BY billing_month) as quarterly_growth_rate
  FROM subscription_metrics
)

SELECT * FROM growth_calculations
```

**Result**: Financial reporting that used to take weeks of development now takes hours, with built-in validation and documentation.

## Advanced Integration Features

### **Collaborative Development Workflows**
Supporting team-based analytics development:

#### **Branching and Merging**
- **Feature branches** - Isolated development environments for experimentation
- **Merge requests** - Peer review for analytical logic changes
- **Conflict resolution** - Tools for managing competing development efforts
- **Release coordination** - Synchronized deployment across dbt and Omni

#### **Role-Based Access Control**
- **Analyst permissions** - Can develop and test, but not deploy to production
- **Engineer permissions** - Full access to dbt integration and deployment
- **Business user permissions** - Can view and comment, but not modify logic
- **Admin permissions** - Complete control over integration configuration

### **Advanced Testing and Validation**
Ensuring quality across integrated development:

#### **Cross-System Testing**
```sql
-- dbt test that validates Omni logic
SELECT 
  omni_calculation,
  dbt_calculation,
  ABS(omni_calculation - dbt_calculation) as difference
FROM (
  SELECT 
    {{ ref('omni_promoted_metrics') }}.revenue as omni_calculation,
    {{ ref('existing_revenue_model') }}.revenue as dbt_calculation
  FROM {{ ref('omni_promoted_metrics') }}
  JOIN {{ ref('existing_revenue_model') }} USING (date, customer_id)
)
WHERE ABS(omni_calculation - dbt_calculation) > 0.01
```

#### **Automated Quality Assurance**
- **Logic validation** - Automatic comparison between Omni and dbt calculations
- **Performance testing** - Query execution time monitoring across systems
- **Data freshness checks** - Synchronization validation between environments
- **User acceptance automation** - Stakeholder approval workflows built into deployment

## Business Impact and ROI

### **Development Velocity Improvements**
Quantifying the acceleration benefits:

#### **Time to Production**
- **Traditional workflow** - 4-6 weeks from idea to production deployment
- **Bi-directional workflow** - 1-2 days for same scope delivery
- **Improvement factor** - 10-20x faster analytics development

#### **Iteration Speed**
- **Traditional feedback cycles** - Days to weeks for each revision
- **Integrated feedback cycles** - Minutes to hours for iteration
- **Innovation enablement** - Rapid experimentation drives discovery

### **Quality and Collaboration Improvements**
Measuring enhanced analytical capabilities:

#### **Error Reduction**
- **Traditional error rates** - 15-20% of deployed analytics require fixes
- **Integrated error rates** - 2-3% due to real-time validation
- **Quality improvement** - 85% reduction in production issues

#### **User Satisfaction**
- **Business user satisfaction** - 95% improvement in experience scores
- **Data team satisfaction** - 90% reduction in repetitive development tasks
- **Collaborative effectiveness** - 10x increase in cross-functional contribution

## Implementation Roadmap

### **Prerequisites and Planning**
Before implementing bi-directional workflows:

#### **Technical Requirements**
- **dbt Cloud or Core** - Compatible version with API access
- **Git repository** - Version control for both dbt and Omni changes
- **Database permissions** - Appropriate access for schema management
- **Network connectivity** - Secure connections between all systems

#### **Organizational Readiness**
- **Cross-functional alignment** - Agreement on integrated development approach
- **Skill development** - Training for team members on integrated workflows
- **Process redesign** - Updated procedures for collaborative development
- **Success metrics** - Clear measurement criteria for integration benefits

### **Phased Implementation Strategy**
Rolling out bi-directional integration safely:

#### **Phase 1: Foundation Setup (Week 1)**
- **Technical configuration** - Install and configure integration
- **Pilot project selection** - Choose low-risk initial use case
- **Team training** - Core skills for key integration users
- **Success measurement** - Establish monitoring and feedback loops

#### **Phase 2: Workflow Development (Weeks 2-4)**
- **Process refinement** - Optimize workflows based on initial experience
- **Expanded use cases** - Apply integration to additional scenarios
- **Quality assurance** - Establish testing and validation procedures
- **Documentation creation** - Capture best practices and standards

#### **Phase 3: Organization Scaling (Weeks 5-12)**
- **Team onboarding** - Train additional users on integrated workflows
- **Advanced features** - Leverage sophisticated integration capabilities
- **Performance optimization** - Fine-tune for organizational scale
- **Continuous improvement** - Ongoing refinement based on user feedback

This bi-directional integration represents a fundamental shift in how organizations approach analytics development. By eliminating the artificial barriers between data transformation and business intelligence, teams can focus on generating insights rather than managing tool complexity.

> **Revolutionary Insight**: When the tools disappear and workflows become seamless, analytics teams can focus entirely on solving business problems rather than managing technical complexity. This bi-directional integration isn't just a feature improvement - it's a completely new way of working.

Ready to eliminate the friction in your analytics development workflow? 