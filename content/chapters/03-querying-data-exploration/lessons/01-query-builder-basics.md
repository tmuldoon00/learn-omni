---
id: "01-query-builder-basics"
title: "Query Builder Basics"
description: "Learn to build your first queries using Omni's visual interface"
duration: "15 min"
order: 1
---

# Query Builder Basics

Welcome to querying in Omni! This is where the magic happens - turning your connected data into meaningful insights. Let's start with the fundamentals.

## What is a Query?

A query is simply a question you ask your data. For example:
- "How much revenue did we generate last month?"
- "Which products are selling best?"
- "How many customers signed up this week?"

Omni's visual query builder makes it easy to ask these questions without writing SQL code.

## The Query Builder Interface

When you create a new query, you'll see:

### Field Picker (Left Side)
- **Tables** - Your data organized by source
- **Dimensions** - Things you can group by (dates, categories, names)
- **Measures** - Things you can count or calculate (revenue, quantities, averages)

### Query Canvas (Center)
- **Selected Fields** - What you've chosen to analyze
- **Filters** - Conditions to limit your data
- **Results Table** - Your query results

### Visualization Options (Right Side)
- **Chart Types** - Different ways to display your data
- **Configuration** - Customize colors, labels, and formatting

## Building Your First Query

Let's walk through creating a simple query step by step:

### Step 1: Choose Your Data
1. Look at the **Field Picker** on the left
2. Expand a table to see available fields
3. Notice fields are organized into **Dimensions** and **Measures**

### Step 2: Select a Dimension
Dimensions answer "**by what?**"
- Click on a dimension like `date` or `category`
- This will group your data

### Step 3: Add a Measure  
Measures answer "**how much?**" or "**how many?**"
- Click on a measure like `total_revenue` or `count_orders`
- This calculates values for each group

### Step 4: Review Results
- Your query runs automatically
- Results appear in the table below
- A basic chart is created on the right

## Understanding Dimensions vs Measures

### Dimensions (Grouping Fields)
✅ **Use for grouping data:**
- Dates (group by day, month, year)
- Categories (group by product type, region)
- Text fields (group by customer name, status)

Examples:
- `customer.name` - Group by individual customers
- `order.created_date` - Group by when orders were placed
- `product.category` - Group by product type

### Measures (Calculation Fields)
✅ **Use for calculations:**
- Sums (total revenue, total quantity)
- Counts (number of orders, number of customers)
- Averages (average order value, average rating)

Examples:
- `order.total_revenue` - Sum of all order values
- `order.count` - Count of total orders
- `customer.count_distinct` - Count of unique customers

## Field Search and Organization

### Searching Fields
- Use the **search box** above the field picker
- Search by field name or description
- Filter by **field type** or **in-use** fields

### Field Actions
Right-click any field for options:
- **Add to query** - Include in your analysis
- **Filter by** - Create a filter condition
- **View details** - See field information
- **Add custom field** - Create calculated fields

## Query Execution

### Automatic Execution
- Queries run automatically as you make changes
- Results update in real-time
- No need to manually "run" queries

### Performance Tips
✅ **Start small** - Begin with a few fields
✅ **Add filters** - Limit data to relevant timeframes
✅ **Use limits** - Set row limits for large datasets
✅ **Monitor query time** - Watch execution time in bottom status bar

## Common Query Patterns

### Time-Series Analysis
```
Dimension: order.created_date (by day)
Measure: order.total_revenue
Filter: Last 30 days
```

### Category Breakdown
```
Dimension: product.category
Measure: order.count, order.total_revenue
Sort: By total_revenue descending
```

### Customer Analysis
```
Dimension: customer.name
Measure: customer.total_spent, customer.order_count
Filter: Customers with > 5 orders
```

## Best Practices

### Starting Your Query
1. **Begin with time** - Add a date dimension first
2. **Add filters early** - Limit to relevant data
3. **One measure at a time** - Start simple, add complexity

### Organizing Your Work
1. **Use descriptive names** when saving queries
2. **Add comments** to explain complex logic
3. **Save frequently** to preserve your work

### Performance Optimization
1. **Filter first** - Add filters before dimensions
2. **Limit results** - Use row limits for exploration
3. **Aggregate high** - Use monthly instead of daily when possible

## What's Next?

Now that you understand the basics of building queries, you're ready to:
- Learn more about **dimensions and measures**
- Explore **filtering and parameters**
- Discover **advanced query techniques**

> **Practice Tip**: Try building 3-5 simple queries using different combinations of dimensions and measures. The more you practice, the more intuitive it becomes!

Remember: Every complex analysis starts with simple questions. Master the basics first, then build up to more sophisticated analysis.
