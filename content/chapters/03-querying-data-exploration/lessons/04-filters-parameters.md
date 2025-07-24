---
id: "04-filters-and-parameters"
title: "Filters and Parameters"
description: "Creating dynamic, interactive queries with advanced filtering techniques"
duration: "10 min"
videoId: "TjJ5lJfLPQM"
order: 4
---

# Filters and Parameters

Filters and parameters are essential tools for creating dynamic, interactive analyses in Omni. They allow you to slice and dice your data, create reusable queries, and build interactive dashboards that stakeholders can explore on their own.

## Understanding Filters vs Parameters

### Filters: Limiting Your Data
Filters restrict which rows of data are included in your analysis:
- **Basic function**: Include or exclude specific data
- **When to use**: Focus analysis on relevant subset
- **User interaction**: Can be changed by viewers
- **Query impact**: Changes the underlying data set

### Parameters: Dynamic Query Logic
Parameters inject dynamic values into your query structure:
- **Basic function**: Change calculations and field definitions
- **When to use**: Switch between different analysis modes
- **User interaction**: Control how data is calculated
- **Query impact**: Changes the logic applied to data

## Basic Filtering

### Simple Filters

#### Single Value Filters
```
Filter: orders.status = "Completed"
Result: Only completed orders
```

#### Multiple Value Filters
```
Filter: products.category IN ("Electronics", "Clothing", "Books")
Result: Only orders for specified categories
```

#### Range Filters
```
Filter: orders.total_amount BETWEEN 100 AND 1000
Result: Orders worth $100 to $1000
```

### Date Filters

#### Relative Date Filtering
- **Last 30 days** - Rolling 30-day window
- **This month** - Current calendar month
- **Quarter to date** - Start of quarter to now
- **Year over year** - Same period last year

#### Specific Date Ranges
```
Filter: orders.created_date >= '2024-01-01' AND orders.created_date < '2024-04-01'
Result: Q1 2024 orders only
```

#### Dynamic Date Expressions
```
Filter: orders.created_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
Result: Last 7 days, automatically updating
```

### Advanced Filter Types

#### Text Filters
```
// Contains text
customers.name CONTAINS "Smith"

// Starts with
products.sku STARTS_WITH "ELEC"

// Regular expressions
customers.email MATCHES "@gmail\.com$"
```

#### Null and Empty Filters
```
// Not null values
customers.phone IS NOT NULL

// Empty text fields
customers.notes = ""

// Has any value
orders.discount_amount > 0
```

## Parameters and Templated Filters

### What Are Templated Filters?

Templated filters use Omni's mustache template engine to inject dynamic values into SQL queries. They create parameters that users can control to change query behavior.

#### Basic Syntax
```yaml
# In view definition
filters:
  time_period:
    type: string
    suggestion_list:
      - value: "Daily"
      - value: "Weekly" 
      - value: "Monthly"
    default_filter: "Monthly"
    filter_single_select_only: true
```

#### Usage in SQL
```sql
-- Dynamic date grouping based on parameter
SELECT 
  CASE 
    WHEN {{# view.time_period.filter }} 'Daily' {{/ view.time_period.filter }} 
      THEN DATE_TRUNC('day', created_at)
    WHEN {{# view.time_period.filter }} 'Weekly' {{/ view.time_period.filter }} 
      THEN DATE_TRUNC('week', created_at)
    WHEN {{# view.time_period.filter }} 'Monthly' {{/ view.time_period.filter }} 
      THEN DATE_TRUNC('month', created_at)
  END as time_period,
  SUM(revenue) as total_revenue
FROM orders
GROUP BY 1
```

### Parameter Types

#### String Parameters
```yaml
filters:
  region_selector:
    type: string
    suggestion_list:
      - value: "North America"
      - value: "Europe"
      - value: "Asia Pacific"
    default_filter: "North America"
    filter_single_select_only: true
```

#### Numeric Parameters
```yaml
filters:
  minimum_order_value:
    type: number
    default_filter: 100
    description: "Minimum order value to include"
```

#### Date Parameters
```yaml
filters:
  analysis_date_range:
    type: timestamp
    default_filter: "30 days ago"
    description: "Date range for analysis"
```

#### Boolean Parameters
```yaml
filters:
  include_refunds:
    type: boolean
    default_filter: false
    description: "Include refunded orders in analysis"
```

### Advanced Parameter Patterns

#### Dynamic Field Selection
```yaml
# Parameter to switch between metrics
filters:
  metric_selector:
    type: string
    suggestion_list:
      - value: "revenue"
        label: "Total Revenue"
      - value: "profit"
        label: "Gross Profit"
      - value: "orders"
        label: "Order Count"
    default_filter: "revenue"
    filter_single_select_only: true
```

```sql
-- Use parameter to select different metrics
SELECT 
  product_category,
  CASE 
    WHEN {{# view.metric_selector.filter }} 'revenue' {{/ view.metric_selector.filter }}
      THEN SUM(revenue)
    WHEN {{# view.metric_selector.filter }} 'profit' {{/ view.metric_selector.filter }}
      THEN SUM(profit)
    WHEN {{# view.metric_selector.filter }} 'orders' {{/ view.metric_selector.filter }}
      THEN COUNT(*)
  END as selected_metric
FROM sales_data
GROUP BY 1
```

#### Date Range Comparisons
```yaml
filters:
  comparison_period:
    type: string
    suggestion_list:
      - value: "1"
        label: "vs Yesterday"
      - value: "7" 
        label: "vs Last Week"
      - value: "30"
        label: "vs Last Month"
    default_filter: "7"
    filter_single_select_only: true
```

```sql
-- Dynamic period comparison
SELECT 
  'Current Period' as period,
  SUM(revenue) as revenue
FROM orders 
WHERE created_at >= CURRENT_DATE - INTERVAL '{{filters.view.comparison_period.value}}' DAY

UNION ALL

SELECT 
  'Comparison Period' as period,  
  SUM(revenue) as revenue
FROM orders
WHERE created_at >= CURRENT_DATE - INTERVAL '{{filters.view.comparison_period.value}}' * 2 DAY
  AND created_at < CURRENT_DATE - INTERVAL '{{filters.view.comparison_period.value}}' DAY
```

#### Dynamic Table Selection
```yaml
filters:
  data_granularity:
    type: string
    suggestion_list:
      - value: "daily_sales"
        label: "Daily Detail"
      - value: "weekly_sales"
        label: "Weekly Summary"
      - value: "monthly_sales"
        label: "Monthly Summary"
    default_filter: "daily_sales"
    filter_single_select_only: true
```

```sql
-- Switch between different aggregation levels
SELECT * FROM {{filters.view.data_granularity.value}}
WHERE date_column >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
```

## Filter Interaction Patterns

### Cascading Filters

When filters depend on each other's values:

#### Geography → Product Hierarchy
```
1. User selects "North America" (region filter)
2. Product category filter shows only products sold in North America
3. Product filter shows only specific products from selected categories
```

#### Time → Metric Availability
```
1. User selects date range
2. Available metrics filter based on data availability in that period
3. Calculations adjust for selected time frame
```

### Filter Dependencies

#### Using One Filter to Control Another
```yaml
# Region filter controls available products
filters:
  region:
    type: string
    suggest_from_field: sales.region
    
  product_category:
    type: string  
    suggest_from_field: products.category
    suggest_from_topic: sales  # Inherits region filter
```

#### Conditional Logic in Filters
```sql
-- Filter suggestions based on other filter values
SELECT DISTINCT product_category
FROM products p
JOIN sales s ON p.id = s.product_id
WHERE s.region = {{# view.region.filter }} ${view.region.filter} {{/ view.region.filter }}
```

## Performance Considerations

### Efficient Filter Design

#### Index-Friendly Filters
```sql
-- Good: Uses indexed columns
WHERE created_date >= '2024-01-01'
  AND status = 'completed'

-- Avoid: Functions on indexed columns  
WHERE YEAR(created_date) = 2024
  AND UPPER(status) = 'COMPLETED'
```

#### Early Filtering
```sql
-- Good: Filter early in query
WITH filtered_orders AS (
  SELECT * FROM orders 
  WHERE created_date >= '2024-01-01'
    AND status = 'completed'
)
SELECT 
  product_category,
  SUM(revenue)
FROM filtered_orders fo
JOIN products p ON fo.product_id = p.id
GROUP BY 1

-- Avoid: Filter after expensive joins
SELECT 
  product_category,
  SUM(revenue)
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.created_date >= '2024-01-01'
  AND o.status = 'completed'
GROUP BY 1
```

### Parameter Performance

#### Limit Parameter Combinations
```yaml
# Good: Reasonable number of options
filters:
  time_granularity:
    type: string
    suggestion_list:
      - value: "daily"
      - value: "weekly"
      - value: "monthly"

# Avoid: Too many dynamic options
filters:
  any_field_selector:
    type: string
    suggest_from_field: "*"  # Could generate hundreds of options
```

## Building Interactive Dashboards

### Dashboard Filter Strategy

#### Global vs Local Filters
- **Global filters** - Apply to all dashboard tiles
- **Local filters** - Apply to specific visualizations
- **Mixed approach** - Some global (date, region), some local (product details)

#### Filter Placement
```
Dashboard Layout:
┌─────────────────────────────────────┐
│ [Date Range] [Region] [Status]      │ ← Global filters
├─────────────────────────────────────┤
│ Revenue Trend        │ Top Products │
│ [Local: Show Avg]    │ [Local: Limit] │
├─────────────────────────────────────┤
│ Customer Analysis    │ Regional Map │
│                      │              │
└─────────────────────────────────────┘
```

### User Experience Best Practices

#### Clear Filter Labels
```
❌ "param_1", "filter_field"
✅ "Date Range", "Product Category", "Include Returns?"
```

#### Logical Filter Order
```
1. Time period (most common filter)
2. Geographic scope 
3. Business unit/department
4. Product/service categories
5. Status/stage filters
6. Advanced/optional filters
```

#### Default Values
```yaml
filters:
  date_range:
    type: timestamp
    default_filter: "last 30 days"  # Reasonable default
    
  include_test_data:
    type: boolean
    default_filter: false  # Safe default
    
  minimum_value:
    type: number
    default_filter: 0  # Inclusive default
```

## Common Filter Patterns

### Business-Specific Filters

#### Sales Analytics
```yaml
filters:
  sales_stage:
    type: string
    suggestion_list:
      - value: "prospect"
      - value: "qualified"
      - value: "proposal"
      - value: "closed_won"
      - value: "closed_lost"
        
  deal_size_category:
    type: string
    suggestion_list:
      - value: "small"
        label: "< $10K"
      - value: "medium" 
        label: "$10K - $100K"
      - value: "large"
        label: "> $100K"
```

#### Marketing Analytics
```yaml
filters:
  campaign_type:
    type: string
    suggest_from_field: campaigns.type
    
  attribution_window:
    type: string
    suggestion_list:
      - value: "1"
        label: "1 Day"
      - value: "7"
        label: "7 Days"  
      - value: "30"
        label: "30 Days"
    default_filter: "7"
```

#### Customer Analytics
```yaml
filters:
  customer_segment:
    type: string
    suggestion_list:
      - value: "new"
      - value: "returning"
      - value: "loyal"
      - value: "at_risk"
      
  lifetime_value_tier:
    type: string
    suggestion_list:
      - value: "low"
        label: "< $500"
      - value: "medium"
        label: "$500 - $2000"
      - value: "high"
        label: "> $2000"
```

## Troubleshooting Filters

### Common Issues

#### Filter Not Working
1. **Check data types** - Ensure filter type matches field type
2. **Verify field names** - Confirm filter references correct field
3. **Test values** - Ensure filter values exist in data
4. **Review permissions** - Check user access to filtered fields

#### Slow Filter Performance
1. **Add database indexes** on filtered columns
2. **Reduce filter options** to essential choices only
3. **Use more selective filters** first
4. **Consider pre-aggregated data** for common filter combinations

#### Unexpected Results
1. **Check null handling** - Decide how to treat missing values
2. **Verify filter logic** - AND vs OR conditions
3. **Test edge cases** - Empty strings, zero values, extreme dates
4. **Review data quality** - Inconsistent formatting or values

## Best Practices Summary

### Filter Design ✅
- **Start simple** - Basic filters first, add complexity gradually
- **Use clear labels** - Business-friendly filter names
- **Provide defaults** - Reasonable starting values
- **Group related filters** - Organize by business domain
- **Test thoroughly** - Validate all filter combinations

### Parameter Usage ✅
- **Document purpose** - Explain what each parameter controls
- **Limit options** - Avoid overwhelming users with choices
- **Handle errors gracefully** - Provide fallback values
- **Consider performance** - Cache parameter-based queries when possible

### User Experience ✅
- **Intuitive ordering** - Most important filters first
- **Visual feedback** - Show when filters are applied
- **Reset options** - Easy way to clear all filters
- **Mobile friendly** - Filters work on all devices

## Practice Exercises

### Exercise 1: Basic Filtering
Create a query that:
1. Shows monthly revenue trends
2. Includes filters for date range and product category
3. Allows users to include/exclude returns
4. Has reasonable default values

### Exercise 2: Dynamic Parameters  
Build a parameterized analysis that:
1. Lets users switch between different time granularities (daily/weekly/monthly)
2. Changes the metric being analyzed (revenue/profit/units)
3. Compares current period to previous period
4. Handles null values appropriately

### Exercise 3: Interactive Dashboard
Design dashboard filters that:
1. Apply globally across multiple visualizations
2. Have cascading relationships (region → product → customer)
3. Include both required and optional filters
4. Provide good default user experience

## What's Next?

Now that you understand filters and parameters, you're ready to:
- Learn **advanced filter techniques** like filter by query
- Master **SQL mode** for complex filtering logic
- Explore **table calculations** for advanced analytics

> **Key Takeaway**: Great filters make data exploration intuitive and powerful. Start with simple, clear filters and add complexity only when it adds real value.

Remember: The best filters feel invisible to users while giving them powerful control over their analysis! 