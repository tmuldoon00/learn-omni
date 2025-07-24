---
id: "08-totals-and-aggregation"
title: "Totals for Everything"
description: "Flexible totals, min, max, and count on any field including dimensions"
duration: "7 min"
videoId: "FFcJY2eEkgA"
order: 8
---

# Totals for Everything

One of the most powerful features in Omni is the ability to add totals, minimums, maximums, and counts to any field—including dimensions. This goes far beyond traditional BI tools that only support totals on measures.

## The Power of Universal Totals

### Traditional BI Limitations
Most analytics tools restrict totals to numeric measures:
- ❌ Can only sum, average, or count numeric fields
- ❌ No totals on text or categorical dimensions  
- ❌ Limited aggregation options on complex data types
- ❌ Rigid table structures with fixed total rows

### Omni's Advanced Totals
Omni allows totals on **any field type**:
- ✅ **Numeric totals** - Sum, average, min, max on measures
- ✅ **Dimension totals** - Count distinct values, most common value
- ✅ **Text totals** - Count unique text values, longest/shortest
- ✅ **Date totals** - Earliest, latest, date ranges
- ✅ **Complex totals** - Custom calculations across any field

## Types of Totals Available

### Numeric Field Totals
When working with measures and numeric dimensions:

#### Standard Aggregations
- **Sum** - Add all values together
- **Average** - Calculate mean value
- **Count** - Number of non-null records
- **Count Distinct** - Number of unique values

#### Range Aggregations  
- **Minimum** - Smallest value in the dataset
- **Maximum** - Largest value in the dataset
- **Range** - Difference between max and min
- **Median** - Middle value when sorted

### Text Field Totals
Even text and categorical fields support totals:

#### Counting Operations
- **Count** - Total number of records
- **Count Distinct** - Number of unique text values
- **Count Non-Empty** - Records with non-null text

#### Text Analysis
- **Most Common** - Most frequently occurring value
- **Least Common** - Least frequently occurring value
- **Longest Text** - Text field with most characters
- **Shortest Text** - Text field with fewest characters

### Date Field Totals
Date and timestamp fields offer temporal aggregations:

#### Date Range Operations
- **Earliest Date** - Oldest date in the dataset
- **Latest Date** - Most recent date in the dataset
- **Date Range** - Time span from earliest to latest
- **Count Days** - Number of distinct days

## Practical Use Cases

### Sales Analysis with Dimension Totals
```
Product Sales Table:
Product Name | Region | Sales Rep | Revenue | Units
Widget A     | West   | John      | $1,200  | 10
Widget B     | East   | Sarah     | $2,400  | 15
Widget A     | East   | Mike      | $1,800  | 12

Totals Row:
Count Distinct Products: 2
Count Distinct Regions: 2  
Count Distinct Reps: 3
Total Revenue: $5,400
Total Units: 37
```

### Customer Analysis
- **Count distinct customers** - Total unique customers
- **Most common city** - Where most customers are located  
- **Latest signup date** - When the newest customer joined
- **Average customer lifetime** - Days from signup to churn

### Operational Metrics
- **Count distinct error types** - Different kinds of system errors
- **Most common error source** - System component with most issues
- **Earliest error time** - When problems first started
- **Peak error day** - Date with highest error volume

## Adding Totals in Omni

### Quick Totals
1. **Right-click any column header** in your results table
2. **Select "Add Total"** from the context menu
3. **Choose aggregation type** from the dropdown
4. **Total appears instantly** at the bottom of your table

### Advanced Total Configuration
1. **Click the column settings** (gear icon) on any field
2. **Navigate to "Totals" section**
3. **Select multiple aggregation types** for comprehensive analysis
4. **Customize total display names** for clarity

### Custom Total Calculations
For complex business logic:
1. **Create calculated fields** that combine multiple totals
2. **Use Excel-style functions** within total calculations  
3. **Apply conditional logic** to total computations
4. **Format totals** with custom number formatting

## Best Practices

### When to Use Totals
- **Summary reporting** - Executive dashboards need high-level numbers
- **Data validation** - Ensure data completeness and accuracy
- **Comparative analysis** - Compare subsets against overall totals
- **Operational monitoring** - Track key metrics at aggregate level

### Total Display Tips
- **Label totals clearly** - Use descriptive names like "Total Customers" not just "Count"
- **Format appropriately** - Currency for revenue, percentages for rates
- **Position strategically** - Place most important totals prominently
- **Use visual emphasis** - Bold or highlight key total rows

### Performance Considerations
- **Large datasets** - Totals on millions of rows may take time to calculate
- **Complex calculations** - Custom total formulas can impact query performance
- **Real-time data** - Totals update automatically as underlying data changes
- **Caching benefits** - Frequently used totals are cached for faster loading

## Advanced Scenarios

### Multi-Level Totals
Create subtotals and grand totals:
- **Group by region** - Show regional subtotals
- **Add grand total** - Overall company total across all regions
- **Nested grouping** - Department totals within regional totals

### Conditional Totals
Apply business logic to totals:
- **Only count active customers** - Exclude churned customers from totals
- **Sum profitable products** - Total revenue only from profitable items
- **Recent activity only** - Count activities from last 30 days

### Cross-Query Totals
Use totals across multiple analyses:
- **Save total as metric** - Reuse calculated totals in other queries
- **Compare period totals** - This month vs last month totals
- **Benchmark against targets** - Compare totals to goal values

This comprehensive totals functionality makes Omni exceptionally powerful for business analysis, allowing you to summarize and aggregate any aspect of your data regardless of field type or complexity. 