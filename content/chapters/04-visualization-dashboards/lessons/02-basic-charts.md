---
id: "02-basic-charts"
title: "Creating Basic Charts and Tables"
description: "Bar charts, line charts, pie charts, KPIs, and advanced table configurations"
duration: "25 min"
videoId: "AbHSarPgnGA"
order: 2
---

# Creating Basic Charts and Tables

In Omni, visualizations transform raw data into compelling insights. This lesson covers the fundamental chart types and advanced table configurations that form the backbone of effective data presentation.

## Understanding Visualization Types

### When to Use Each Chart Type

#### 📊 **Bar Charts**
**Best for:** Comparing categories, showing rankings, displaying changes over time
- **Vertical bars** - Categories with short names, emphasizing height differences
- **Horizontal bars** - Categories with long names, easier reading
- **Stacked bars** - Showing composition within categories
- **Grouped bars** - Comparing multiple metrics across categories

#### 📈 **Line Charts**  
**Best for:** Trends over time, continuous data, multiple series comparison
- **Single line** - One metric over time
- **Multiple lines** - Comparing trends across different segments
- **Area charts** - Emphasizing magnitude and cumulative values
- **Combo charts** - Different metrics with different scales

#### 🥧 **Pie Charts**
**Best for:** Showing proportions of a whole, limited categories (5-7 max)
- **Standard pie** - Simple proportional relationships
- **Donut chart** - Central space for additional information
- **Use sparingly** - Often bar charts are more accurate for comparison

## Tables: The Foundation of Data Presentation

### Why Tables Matter

Tables aren't just raw data displays—they're sophisticated visualization tools that can:
- **Present precise values** alongside visual elements
- **Enable sorting and filtering** for interactive exploration
- **Support conditional formatting** for immediate insights
- **Include inline visualizations** like sparklines and progress bars
- **Handle complex data structures** with grouping and pivots

### Advanced Table Configuration

#### Table Layout and Structure

**Column Management:**
```
✅ Show/Hide Columns - Control what data is visible
✅ Column Reordering - Drag columns to optimal positions  
✅ Column Width Control - Fixed or stretching layouts
✅ Header Text Options - Truncate or wrap long headers
```

**Data Organization:**
```
📊 Subtotals & Grouping - Collapsible dimension hierarchies
📊 Pivot Tables - Transform rows to columns dynamically
📊 Field Sorting - Multiple sort criteria and custom orders
📊 Data Alignment - Left, center, right alignment per column
```

#### Interactive Table Features

**Column Manipulation:**
- **Drag and Drop Reordering** - Organize columns by importance
- **Right-Click Menus** - Quick access to column operations
- **Resizable Columns** - Adjust widths to fit content
- **Sortable Headers** - Click to sort by any column

**Grouping and Subtotals:**
When you have multiple dimensions, enable subtotals to create expandable sections:

```
Customer Region
├── North America
│   ├── Large Customers: $2.3M
│   ├── Medium Customers: $1.1M
│   └── Total: $3.4M
├── Europe  
│   ├── Large Customers: $1.8M
│   ├── Medium Customers: $0.9M
│   └── Total: $2.7M
└── Grand Total: $6.1M
```

**Benefits of Grouping:**
- **Hierarchical Navigation** - Expand/collapse data levels
- **Automatic Subtotals** - Calculated at each grouping level
- **Better Data Scanning** - Organized information structure
- **Interactive Exploration** - Users control detail level

#### Conditional Formatting

Transform numeric data into visual insights:

**Color Scales:**
- **Performance Indicators** - Green for high, red for low values
- **Distribution Visualization** - Show data spread across ranges
- **Threshold Highlighting** - Mark values above/below targets
- **Custom Color Palettes** - Brand-aligned visual themes

**Formatting Options:**
```yaml
Numeric Conditional Formatting:
  - Min/Max Gradient: Automatic scaling
  - Color Pairs: Two-color scales
  - Multi-Color: Complex gradients
  - Null Handling: Treat as zero or exclude
  - Background Options: Color or transparent
```

#### Field Display Options

**Text Alignment and Formatting:**
- **Alignment Control** - Left, center, right per column
- **Word Wrapping** - Handle long text gracefully
- **Custom Labels** - Override default field names
- **Hide/Show Toggle** - Control column visibility

**Advanced Display Types:**

**📸 Images in Tables**
```
Configuration Options:
- Image Height/Width: Customize dimensions
- Image Links: Make images clickable
- Database Integration: Pull images from URLs
- Responsive Sizing: Adapt to table space
```

**🔗 Dynamic Links**
```
Link Types:
- Field Value Links: Use data as URL
- Custom URLs: Static links
- Parameterized Links: Dynamic per row
- Embed Events: Custom interactions
```

**📊 Inline Bar Charts**
For numeric columns, add visual bars alongside values:
- **Relative Sizing** - Bars show proportional values
- **Quick Comparison** - Immediate visual reference
- **Space Efficient** - Combine numbers and visuals
- **Customizable Colors** - Match your brand palette

### Practical Table Examples

#### Sales Performance Table
```
Rep Name        | Q4 Revenue | Goal    | Attainment | Trend
----------------|------------|---------|------------|-------
Sarah Johnson  | $2.3M      | $2.0M   | 115% ■■■■■ | ↗
Mike Chen       | $1.8M      | $2.1M   | 86%  ■■■□□ | ↘
Lisa Rodriguez  | $2.6M      | $2.2M   | 118% ■■■■■ | ↗
Total          | $6.7M      | $6.3M   | 106% ■■■■□ | ↗
```

**Features Used:**
- Conditional formatting on Attainment %
- Inline bars for visual goal tracking
- Trend arrows as custom formatting
- Subtotal row with different styling

#### Customer Analytics Table
```
Customer Segment | Revenue | Customers | Avg Order | Churn Risk
-----------------|---------|-----------|-----------|------------
Enterprise       | $5.2M   | 23        | $226K     | Low ●
Mid-Market       | $3.8M   | 156       | $24K      | Medium ●
Small Business   | $2.1M   | 1,247     | $1.7K     | High ●
```

**Features Used:**
- Color-coded risk indicators
- Formatted currency values
- Grouped data with clear hierarchy
- Contrasting styles for different data types

## Chart Configuration Fundamentals

### Bar Chart Best Practices

#### Choosing Bar Orientation
**Vertical Bars When:**
- Category names are short (1-2 words)
- Emphasizing height differences
- Showing time series data
- Standard business metrics (revenue, units)

**Horizontal Bars When:**
- Category names are long (3+ words)
- Many categories to display
- Easier reading of labels
- Ranking-style data

#### Stacked vs. Grouped Bars
**Stacked Bars:**
```
Revenue by Quarter
Q1 ████████ Product A: $2M | Product B: $1.5M
Q2 ████████ Product A: $2.3M | Product B: $1.8M  
Q3 ████████ Product A: $2.1M | Product B: $2.2M
Q4 ████████ Product A: $2.8M | Product B: $2.0M
```

**Grouped Bars:**
```
Revenue by Quarter
Q1  ████  ███   (Product A: $2M, Product B: $1.5M)
Q2  ████  ████  (Product A: $2.3M, Product B: $1.8M)
Q3  ████  ████  (Product A: $2.1M, Product B: $2.2M)
Q4  █████ ████  (Product A: $2.8M, Product B: $2.0M)
```

### Line Chart Optimization

#### Single vs Multiple Lines
**Single Line Charts:**
- Focus on one key metric trend
- Clear, uncluttered visualization
- Easy to understand progression
- Good for executive summaries

**Multiple Line Charts:**
- Compare trends across segments
- Show correlation patterns
- Identify diverging trends
- Maximum 5-7 lines for readability

#### Time Series Best Practices
- **Consistent Time Intervals** - Daily, weekly, monthly, quarterly
- **Appropriate Date Range** - Not too granular, not too broad
- **Clear Labels** - Date formats that match the context
- **Trend Lines** - Add regression lines for forecasting

### Pie Chart Guidelines

#### When to Use Pie Charts
✅ **Good Use Cases:**
- Market share representation
- Budget allocation display
- Simple proportional data
- 3-5 categories maximum

❌ **Avoid Pie Charts For:**
- More than 7 categories
- Similar-sized segments
- Time series data
- Precise value comparison

#### Pie Chart Alternatives
**Consider Instead:**
- **Horizontal bar chart** - Better for comparison
- **Donut chart** - Center space for totals
- **Treemap** - Hierarchical proportions
- **Stacked bar** - Part-to-whole with baseline

## Visualization Selection Guide

### Quick Decision Framework

**What's your primary goal?**

**📊 Compare Values?**
→ Bar charts (vertical/horizontal)
→ Tables with inline bars
→ Bullet charts for targets

**📈 Show Trends?**
→ Line charts
→ Area charts for magnitude
→ Combo charts for multiple metrics

**📋 Display Detailed Data?**
→ Tables with conditional formatting
→ Pivot tables for analysis
→ Interactive grouped tables

**🥧 Show Proportions?**
→ Pie charts (limited categories)
→ Donut charts
→ Stacked bar charts

**🗺️ Geographic Data?**
→ Maps (covered in advanced charts)
→ Tables with location grouping

### Chart Combination Strategies

#### Dashboard Layout Patterns
```
Executive Dashboard Layout:
┌─────────────────┬─────────────┐
│ Key Metrics     │ Trend Lines │
│ (KPI Cards)     │ (Line Chart)│
├─────────────────┼─────────────┤
│ Performance Table           │
│ (Detailed Breakdown)        │
├─────────────────────────────┤
│ Regional Analysis (Bar Chart)│
└─────────────────────────────┘
```

#### Progressive Detail Pattern
1. **Summary Level** - KPI cards with totals
2. **Trend Analysis** - Line charts showing direction
3. **Detailed Breakdown** - Tables with full data
4. **Action Items** - Highlighted exceptions and opportunities

## Practical Exercises

### Exercise 1: Sales Performance Dashboard
Create visualizations for this scenario:
- Monthly sales data for 6 sales reps
- Target vs. actual performance
- Regional breakdown
- Product category analysis

**Challenge:** Use 3 different chart types and explain why you chose each.

### Exercise 2: Customer Analytics Table
Build an interactive table showing:
- Customer segments with revenue
- Conditional formatting for performance tiers
- Inline bars for visual comparison
- Grouping by region with subtotals

### Exercise 3: Chart Selection
Given these business questions, recommend the best chart type:
1. "Which marketing channel drives the most leads?"
2. "How has our customer churn rate changed over time?"
3. "What percentage of revenue comes from each product line?"
4. "Which sales reps are closest to hitting their quotas?"

## Common Mistakes to Avoid

### Chart Selection Errors
❌ **3D Charts** - Distort data perception
❌ **Too Many Colors** - Creates visual chaos
❌ **Wrong Chart Type** - Pie charts for trending data
❌ **Cluttered Layouts** - Too much information per chart

### Table Design Issues
❌ **Poor Column Order** - Most important data should be leftmost
❌ **Inconsistent Formatting** - Mixing number formats
❌ **Missing Context** - No units or time periods specified
❌ **Overwhelming Detail** - Everything visible by default

### General Visualization Problems
❌ **No Clear Message** - Visualization doesn't answer a question
❌ **Poor Color Choices** - Red/green for colorblind users
❌ **Missing Labels** - Axes, legends, or context unclear
❌ **Inappropriate Scale** - Truncated axes misleading readers

## What's Next?

Now that you understand basic charts and tables, you're ready to:
- **Explore advanced chart types** like scatterplots and heatmaps
- **Master dashboard composition** with multiple visualizations
- **Learn chart styling** and branding techniques
- **Implement interactive features** for user engagement

> **Key Takeaway**: The best visualization is the one that most clearly answers your audience's question. Start with the question, then choose the chart type—never the reverse.

Remember: Tables aren't boring—they're the Swiss Army knife of data visualization when configured properly! 