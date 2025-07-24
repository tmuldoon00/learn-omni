---
id: "06-sql-mode"
title: "SQL Mode and Raw Queries"
description: "When and how to use SQL for complex analysis needs"
duration: "12 min"
videoId: "dQw4w9WgXcQ"
order: 6
---

# SQL Mode and Raw Queries

While Omni's visual query builder handles most analytics needs, there are times when you need the full power and flexibility of SQL. This lesson covers when and how to use SQL mode effectively.

## When to Use SQL Mode

### Omni's Visual Builder vs SQL Mode

#### Visual Builder Strengths ✅
- **Faster for standard queries** - Point and click interface
- **Business user friendly** - No SQL knowledge required
- **Automatic optimization** - Omni handles joins and aggregations
- **Error prevention** - Guided interface prevents common mistakes
- **Semantic layer benefits** - Leverages your defined business logic

#### SQL Mode Advantages 🔧
- **Complex logic** - Advanced calculations and business rules
- **Custom aggregations** - Window functions, advanced analytics
- **Data transformation** - Complex reshaping and processing
- **Legacy queries** - Migrate existing SQL reports
- **Performance optimization** - Hand-tuned queries for specific needs

### Specific Use Cases for SQL

#### Advanced Analytics
```sql
-- Cohort analysis with retention rates
WITH cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', first_order_date) AS cohort_month
  FROM user_facts
),
monthly_activity AS (
  SELECT DISTINCT
    user_id,
    DATE_TRUNC('month', order_date) AS activity_month
  FROM orders
)
SELECT 
  cohort_month,
  activity_month,
  COUNT(DISTINCT ma.user_id) as active_users
FROM cohorts c
LEFT JOIN monthly_activity ma ON c.user_id = ma.user_id
GROUP BY 1, 2
ORDER BY 1, 2;
```

#### Complex Transformations
```sql
-- Pivot sales data by quarter
SELECT 
  product_category,
  SUM(CASE WHEN quarter = 'Q1' THEN revenue END) AS q1_revenue,
  SUM(CASE WHEN quarter = 'Q2' THEN revenue END) AS q2_revenue,
  SUM(CASE WHEN quarter = 'Q3' THEN revenue END) AS q3_revenue,
  SUM(CASE WHEN quarter = 'Q4' THEN revenue END) AS q4_revenue
FROM sales_summary
GROUP BY product_category;
```

#### Custom Functions
```sql
-- Advanced statistical calculations
SELECT 
  region,
  AVG(revenue) as avg_revenue,
  STDDEV(revenue) as revenue_std,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY revenue) AS median_revenue,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY revenue) AS p95_revenue
FROM regional_sales
GROUP BY region;
```

## Getting Started with SQL Mode

### Accessing SQL Mode

#### From the Query Builder
1. **Start with visual builder** - Build your basic query structure
2. **Click "SQL" button** - Switch to SQL mode
3. **Review generated SQL** - See what Omni created
4. **Customize as needed** - Add your custom logic

#### Starting from Scratch
1. **Create new query** - Start in workbook
2. **Choose "SQL Mode"** - Skip visual builder
3. **Write raw SQL** - Full control from the beginning
4. **Test and iterate** - Run queries to validate results

### Understanding Generated SQL

When you switch from visual to SQL mode, Omni shows you:

#### Omni Helper Functions
```sql
-- Visual builder creates this:
SELECT 
  OMNI_DATE(created_at, 'month') as order_month,
  OMNI_SUM(${orders.revenue}) as total_revenue
FROM orders
WHERE OMNI_FILTER(${orders.status}, 'completed')
GROUP BY 1
ORDER BY 1;
```

#### Database-Specific SQL
```sql
-- Which becomes this (for PostgreSQL):
SELECT 
  DATE_TRUNC('month', created_at) as order_month,
  COALESCE(SUM(revenue), 0) as total_revenue
FROM orders  
WHERE status = 'completed'
GROUP BY 1
ORDER BY 1;
```

### SQL Mode Best Practices

#### Start with Visual Builder
```
1. Build basic structure visually
2. Switch to SQL mode
3. Add advanced logic
4. Test thoroughly
```

#### Use Model References
```sql
-- Good: Reference modeled fields
SELECT 
  ${customers.segment},
  ${orders.revenue_sum}
FROM ${orders}
JOIN ${customers} ON ${orders.customer_id} = ${customers.id}

-- Avoid: Raw table references
SELECT 
  c.segment,
  SUM(o.revenue)
FROM raw_orders o
JOIN raw_customers c ON o.customer_id = c.id
```

#### Maintain Readability  
```sql
-- Good: Well-structured and commented
-- Customer segment performance analysis
WITH segment_metrics AS (
  SELECT 
    ${customers.segment} as segment,
    COUNT(DISTINCT ${customers.id}) as customer_count,
    ${orders.revenue_sum} as total_revenue
  FROM ${orders}
  JOIN ${customers} ON ${orders.customer_id} = ${customers.id}
  WHERE ${orders.status} = 'completed'
  GROUP BY 1
)
SELECT 
  segment,
  customer_count,
  total_revenue,
  total_revenue / customer_count as revenue_per_customer
FROM segment_metrics
ORDER BY total_revenue DESC;
```

## Advanced SQL Techniques

### Window Functions

#### Running Totals
```sql
SELECT 
  order_date,
  daily_revenue,
  SUM(daily_revenue) OVER (
    ORDER BY order_date 
    ROWS UNBOUNDED PRECEDING
  ) as running_total
FROM daily_sales
ORDER BY order_date;
```

#### Ranking and Percentiles
```sql
SELECT 
  customer_id,
  total_spend,
  RANK() OVER (ORDER BY total_spend DESC) as spend_rank,
  NTILE(10) OVER (ORDER BY total_spend) as spend_decile,
  PERCENT_RANK() OVER (ORDER BY total_spend) as spend_percentile
FROM customer_totals;
```

#### Period-over-Period Comparisons
```sql
SELECT 
  month,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY month) as previous_month,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) as month_change,
  LAG(revenue, 12) OVER (ORDER BY month) as year_ago,
  revenue / LAG(revenue, 12) OVER (ORDER BY month) - 1 as yoy_growth
FROM monthly_revenue
ORDER BY month;
```

### Common Table Expressions (CTEs)

#### Breaking Down Complex Logic
```sql
-- Multi-step customer analysis
WITH customer_orders AS (
  SELECT 
    customer_id,
    COUNT(*) as order_count,
    SUM(revenue) as total_spend,
    MIN(order_date) as first_order,
    MAX(order_date) as last_order
  FROM orders
  GROUP BY customer_id
),
customer_segments AS (
  SELECT 
    *,
    CASE 
      WHEN order_count >= 10 THEN 'High Frequency'
      WHEN order_count >= 5 THEN 'Medium Frequency'  
      ELSE 'Low Frequency'
    END as frequency_segment,
    CASE
      WHEN total_spend >= 1000 THEN 'High Value'
      WHEN total_spend >= 500 THEN 'Medium Value'
      ELSE 'Low Value'  
    END as value_segment
  FROM customer_orders
)
SELECT 
  frequency_segment,
  value_segment,
  COUNT(*) as customer_count,
  AVG(total_spend) as avg_spend,
  AVG(order_count) as avg_orders
FROM customer_segments
GROUP BY 1, 2
ORDER BY 1, 2;
```

### Custom Functions and Calculations

#### Business-Specific Metrics
```sql
-- Customer lifetime value calculation
SELECT 
  customer_id,
  -- Average order value
  total_revenue / NULLIF(order_count, 0) as aov,
  -- Purchase frequency (orders per month)
  order_count::float / NULLIF(
    EXTRACT(months FROM (last_order - first_order)) + 1, 0
  ) as monthly_frequency,
  -- Estimated CLV (simplified)
  (total_revenue / NULLIF(order_count, 0)) * 
  (order_count::float / NULLIF(
    EXTRACT(months FROM (last_order - first_order)) + 1, 0
  )) * 12 as estimated_clv
FROM customer_summary;
```

## Mixing SQL with Omni Features

### Using Modeled Fields in SQL

#### Reference Model Objects
```sql
-- Leverage existing business logic
SELECT 
  ${products.category} as category,
  ${customers.segment} as segment,
  COUNT(*) as order_count,
  ${orders.revenue_sum} as total_revenue,
  ${orders.profit_sum} as total_profit  -- Uses modeled calculation
FROM ${orders}
JOIN ${products} ON ${orders.product_id} = ${products.id}  
JOIN ${customers} ON ${orders.customer_id} = ${customers.id}
GROUP BY 1, 2;
```

#### Apply Model Filters
```sql
-- SQL query with model-based filtering
SELECT 
  product_name,
  SUM(quantity) as total_sold
FROM ${order_items}
WHERE ${order_items.created_at} >= '2024-01-01'
  AND ${products.category} IN ('Electronics', 'Clothing')
GROUP BY 1
ORDER BY 2 DESC;
```

### SQL Query Performance

#### Optimization Strategies
1. **Use indexes** - Ensure proper database indexing
2. **Limit result sets** - Add WHERE clauses and LIMIT statements  
3. **Aggregate early** - Push aggregations to subqueries
4. **Avoid unnecessary JOINs** - Only join tables you need
5. **Use appropriate data types** - Match your filter types

#### Performance Monitoring
```sql
-- Add query hints for debugging
EXPLAIN ANALYZE
SELECT 
  customer_segment,
  COUNT(*) as customer_count,
  AVG(revenue) as avg_revenue
FROM customer_analysis
GROUP BY 1;
```

## Troubleshooting SQL Queries

### Common Errors

#### Syntax Errors
```sql
-- Wrong: Missing comma
SELECT 
  customer_id
  total_revenue  -- Missing comma here
FROM orders;

-- Right: Proper syntax
SELECT 
  customer_id,
  total_revenue
FROM orders;
```

#### Data Type Mismatches
```sql
-- Wrong: Comparing text to number
WHERE customer_id = '123'  -- If customer_id is numeric

-- Right: Match data types  
WHERE customer_id = 123
```

#### NULL Handling
```sql
-- Wrong: Division by zero
SELECT revenue / order_count FROM summary;

-- Right: Handle NULLs
SELECT revenue / NULLIF(order_count, 0) FROM summary;
```

### Debugging Techniques

#### Step-by-Step Validation
1. **Start simple** - Build query incrementally
2. **Test each part** - Validate subqueries individually  
3. **Check data types** - Ensure compatible operations
4. **Validate joins** - Confirm join conditions are correct
5. **Sample data** - Use LIMIT to test with small datasets

#### Use SQL Comments
```sql
-- Customer analysis for Q1 2024
-- Last updated: 2024-03-15
-- Expected rows: ~1000

SELECT 
  c.segment,           -- Customer segment from model
  COUNT(*) as customers, -- Total customers per segment
  SUM(o.revenue) as revenue -- Total revenue per segment
FROM ${customers} c
JOIN ${orders} o ON c.id = o.customer_id
WHERE o.created_at >= '2024-01-01'  -- Q1 filter
  AND o.created_at < '2024-04-01'
GROUP BY 1;
```

## When to Promote SQL to the Model

### Reusable Logic
If your SQL creates logic used across multiple queries:

```sql
-- Custom field definition that should be in model
CASE 
  WHEN customer_tier = 'Premium' AND total_spend > 5000 THEN 'VIP'
  WHEN customer_tier = 'Premium' THEN 'Premium'  
  WHEN total_spend > 2000 THEN 'High Value'
  ELSE 'Standard'
END as customer_classification
```

### Business Metrics
Standard business calculations should move to the model:

```sql
-- Metric that belongs in shared model
(revenue - cost) / NULLIF(revenue, 0) as profit_margin
```

### Performance Optimizations
Complex queries used frequently should be modeled as views.

## Best Practices Summary

### Do ✅
- **Start visual, enhance with SQL** - Build foundation first
- **Reference model objects** - Leverage existing business logic
- **Comment your code** - Explain complex logic
- **Test incrementally** - Build and verify step by step  
- **Consider performance** - Optimize for your database
- **Promote reusable logic** - Move common patterns to model

### Don't ❌  
- **Bypass the model entirely** - Lose business context
- **Write overly complex queries** - Break into steps
- **Ignore data types** - Cause runtime errors
- **Skip testing** - Deploy unvalidated logic
- **Duplicate business logic** - Create maintenance burden

## Practice Exercises

### Exercise 1: Convert Visual to SQL
1. Build a basic revenue-by-month query visually
2. Switch to SQL mode
3. Add year-over-year growth calculation
4. Include a 3-month moving average

### Exercise 2: Customer Cohort Analysis  
Create a SQL query that:
1. Groups customers by signup month
2. Tracks retention rates over subsequent months
3. Calculates average revenue per cohort
4. Identifies highest-value cohorts

### Exercise 3: Advanced Ranking
Build a query that:
1. Ranks products by revenue within each category
2. Shows percentage of category revenue for each product
3. Identifies top 3 products per category
4. Includes year-over-year comparison

## What's Next?

Now that you understand SQL mode, you're ready to:
- Learn **table calculations and functions**
- Master **saving and organizing queries**
- Explore **advanced visualization techniques**

> **Key Takeaway**: SQL mode provides unlimited flexibility, but use it strategically. Start with visual builder for structure, then enhance with SQL for complex logic.

Remember: Great analytics combines the accessibility of visual tools with the power of SQL when needed!
