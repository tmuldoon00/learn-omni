---
id: "02-dimensions-and-measures"
title: "Working with Dimensions and Measures"
description: "Understanding the building blocks of analytical queries"
duration: "12 min"
order: 2
---

# Working with Dimensions and Measures

Understanding dimensions and measures is fundamental to successful analytics in Omni. These two field types are the building blocks of every query you'll create.

## What Are Dimensions and Measures?

### Dimensions: The "What" and "When"
Dimensions are attributes that describe your data. They answer questions like:
- **What** - Product names, customer types, regions
- **When** - Dates, times, periods
- **Where** - Locations, offices, territories  
- **Who** - Customers, employees, vendors

### Measures: The "How Much" and "How Many"
Measures are numeric calculations performed on your data. They answer:
- **How much** - Revenue, costs, amounts
- **How many** - Counts, quantities, frequencies
- **How often** - Rates, percentages, ratios

## Dimensions in Detail

### Common Dimension Types

#### Text Dimensions
- `customer.name` - Individual customer names
- `product.category` - Product groupings
- `region.name` - Geographic regions
- `status.type` - Order or user status

#### Date Dimensions
- `order.created_date` - When orders were placed
- `user.signup_date` - When users registered
- `event.timestamp` - When events occurred

Date dimensions are special because they can be viewed at different levels:
- **Raw date** - 2024-01-15
- **Day** - Monday, Tuesday, etc.
- **Week** - Week of 2024-01-15
- **Month** - January 2024
- **Quarter** - Q1 2024
- **Year** - 2024

#### Boolean Dimensions
- `customer.is_active` - True/False values
- `product.on_sale` - Yes/No indicators
- `user.has_premium` - Binary status flags

### Using Dimensions Effectively

#### Grouping Data
Dimensions group your data into meaningful categories:

```
Dimension: product.category
Results:
- Electronics: [all electronics data]
- Clothing: [all clothing data]  
- Books: [all book data]
```

#### Creating Hierarchies
Combine dimensions for drill-down analysis:
- `Country` → `State` → `City`
- `Year` → `Quarter` → `Month` → `Day`
- `Department` → `Team` → `Employee`

#### Filtering by Dimensions
Use dimensions to limit your analysis:
- Only show data for "Premium" customers
- Focus on orders from "Last 30 days"
- Analyze only "Active" products

## Measures in Detail

### Types of Measures

#### Count Measures
Count the number of records:
- `order.count` - Total number of orders
- `customer.count_distinct` - Number of unique customers
- `product.count_active` - Count of active products

#### Sum Measures  
Add up numeric values:
- `order.total_revenue` - Sum of all order values
- `product.total_quantity` - Sum of quantities sold
- `expense.total_cost` - Sum of all expenses

#### Average Measures
Calculate mean values:
- `order.average_value` - Average order size
- `customer.average_rating` - Mean customer satisfaction
- `employee.average_tenure` - Mean employment length

#### Advanced Measures
More complex calculations:
- `customer.lifetime_value` - Total customer spend
- `product.profit_margin` - Revenue minus costs
- `sales.conversion_rate` - Leads that became customers

### Understanding Aggregation

#### What is Aggregation?
Aggregation combines multiple rows into summary values:

Raw Data:
```
Order 1: $100
Order 2: $200  
Order 3: $150
```

Aggregated (Sum):
```
Total Revenue: $450
```

#### Aggregation Levels
The aggregation level depends on your dimensions:

With `customer.name` dimension:
```
John Smith: $300 (2 orders)
Jane Doe: $150 (1 order)
```

With `month` dimension:
```
January: $200 (1 order)
February: $250 (2 orders)
```

## Combining Dimensions and Measures

### Basic Query Structure
Every analytical query follows this pattern:
```
SELECT dimension(s), measure(s)
FROM data
GROUP BY dimension(s)
```

In Omni's visual interface:
1. **Choose dimensions** - What to group by
2. **Add measures** - What to calculate
3. **Apply filters** - What to include/exclude

### Common Combinations

#### Time Series Analysis
```
Dimension: order.created_date (by month)
Measure: order.total_revenue
Result: Revenue trend over time
```

#### Category Breakdown
```  
Dimension: product.category
Measures: order.count, order.total_revenue
Result: Performance by product type
```

#### Regional Comparison
```
Dimensions: region.name, product.category  
Measure: sales.quantity
Result: What sells where
```

### Multi-Dimensional Analysis

#### Two Dimensions
```
Rows: product.category
Columns: region.name
Measure: sales.revenue
Result: Revenue by product and region
```

#### Three+ Dimensions
Use filtering or drill-down:
```
Base: product.category vs sales.revenue
Filter by: region.name = "North America"
Drill-down: Add customer.segment dimension
```

## Best Practices

### Choosing Dimensions

#### Start Simple
- Begin with **one dimension** to understand the data
- Add **time dimension** for trend analysis
- Gradually add **more dimensions** for deeper insights

#### Think Business First
- Choose dimensions that **answer business questions**
- Use **meaningful groupings** that stakeholders understand
- Avoid **too much granularity** initially

### Selecting Measures

#### Pick Relevant Metrics
- Choose measures that **relate to your question**
- Start with **simple counts and sums**
- Add **ratios and percentages** for context

#### Be Consistent  
- Use **same time periods** across measures
- Apply **consistent filters** to all measures
- Choose **appropriate aggregation levels**

### Performance Tips

#### Dimension Cardinality
- **Low cardinality** (few unique values) = faster queries
- **High cardinality** (many unique values) = slower queries

Examples:
- Low: `country` (200 values) ✅
- Medium: `city` (10,000 values) ⚠️
- High: `customer_id` (1M values) ❌

#### Measure Complexity
- **Simple aggregations** (SUM, COUNT) = fast
- **Complex calculations** = slower
- **Cross-table measures** = slowest

## Common Mistakes to Avoid

### Dimension Mistakes
❌ **Using measures as dimensions** - Don't group by revenue amounts
❌ **Too many dimensions** - Avoid more than 3-4 in one view
❌ **Meaningless groupings** - Don't group by IDs or random text

### Measure Mistakes  
❌ **Wrong aggregation** - Using SUM when you need COUNT
❌ **Mixing timeframes** - Comparing daily vs monthly measures
❌ **Double counting** - Adding measures that overlap

### Combination Mistakes
❌ **Unrelated dimensions and measures** - Mixing unrelated concepts
❌ **Missing filters** - Including irrelevant data
❌ **Wrong granularity** - Too detailed or too summarized

## Practice Exercises

Try building these queries to practice:

### Exercise 1: Basic Time Series
- **Dimension**: `order.created_date` (by month)
- **Measure**: `order.count`
- **Question**: How has order volume changed over time?

### Exercise 2: Category Analysis
- **Dimension**: `product.category`
- **Measures**: `order.total_revenue`, `order.count`
- **Question**: Which product categories perform best?

### Exercise 3: Customer Segmentation
- **Dimensions**: `customer.segment`, `order.created_date` (by quarter)
- **Measure**: `customer.average_order_value`
- **Question**: How do different customer segments behave over time?

## What's Next?

Now that you understand dimensions and measures, you're ready to:
- Learn about **Excel functions and AI-powered analysis**
- Explore **filtering and parameters**
- Master **advanced query techniques**

> **Practice Tip**: For every business question, identify what you want to group by (dimensions) and what you want to calculate (measures) before building your query.

Remember: Dimensions slice your data, measures dice it. Master both to unlock powerful analytical insights!
