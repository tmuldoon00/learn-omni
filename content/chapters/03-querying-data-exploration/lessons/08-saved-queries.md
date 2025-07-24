---
id: "08-saved-queries"
title: "Saving and Organizing Queries"
description: "Best practices for query management and reuse"
duration: "8 min"
order: 8
---

# Saving and Organizing Queries

As you build more queries, organization becomes crucial. Learn how to save, name, and organize your work for maximum efficiency and team collaboration.

## Why Save Queries?

### Reusability
- **Base queries** - Create foundational queries others can build on
- **Common patterns** - Save frequently used query structures
- **Templates** - Standardize approaches across your team

### Collaboration  
- **Share insights** - Let others access your analysis
- **Build together** - Create queries others can modify
- **Knowledge transfer** - Document your analytical processes

### Efficiency
- **Quick access** - Find your work instantly
- **Avoid duplication** - Don't rebuild the same query twice
- **Iterative improvement** - Build incrementally on previous work

## Saving Your Queries

### Basic Save Process
1. **Build your query** using the query builder
2. **Test and validate** results are correct
3. **Click "Save"** in the top-right corner
4. **Choose descriptive name** and location
5. **Add description** explaining the query's purpose

### Naming Best Practices

#### Good Names ✅
- `Monthly Revenue by Product Category`
- `Customer Churn Analysis Q4 2024`
- `Weekly Active Users - Mobile App`
- `Top 10 Sales Reps by Revenue`

#### Poor Names ❌
- `Query 1` - Too generic
- `Sales stuff` - Vague and unprofessional
- `temp query` - Suggests temporary/unfinished work
- `John's analysis` - Not descriptive of content

### Adding Descriptions
Always include:
- **Purpose** - What question does this answer?
- **Context** - When/why was this created?
- **Notes** - Any important assumptions or limitations
- **Contact** - Who to ask questions about this query

Example:
```
Purpose: Track monthly recurring revenue trends by customer segment
Context: Created for Q1 2024 board presentation
Notes: Excludes one-time purchases and refunds
Contact: Sarah (sarah@company.com) for questions
```

## Query Organization Strategies

### Folder Structure
Organize queries by:

#### By Function
```
📁 Sales Analysis
  📄 Monthly Revenue Trends
  📄 Sales Rep Performance
  📄 Product Sales Analysis

📁 Marketing Analytics  
  📄 Campaign Performance
  📄 Lead Generation Analysis
  📄 Customer Acquisition Cost

📁 Customer Insights
  📄 Customer Lifetime Value
  📄 Churn Analysis
  📄 User Engagement Metrics
```

#### By Time Period
```
📁 2024 Analysis
  📁 Q1 2024
  📁 Q2 2024
  📁 Q3 2024
  
📁 Monthly Reports
📁 Weekly Dashboards
```

#### By Team/Department
```
📁 Executive Reports
📁 Sales Team
📁 Marketing Team
📁 Product Team
📁 Finance Team
```

### Tagging System
Use consistent tags:
- `#revenue` - All revenue-related queries
- `#weekly` - Weekly reporting queries  
- `#experiment` - A/B test analysis
- `#forecast` - Predictive analysis
- `#customer` - Customer-focused analysis

## Query Templates

### Creating Templates
1. Build a **flexible base query**
2. Use **clear filter placeholders**
3. **Document parameters** that can be changed
4. **Save with template name** prefix

Example Template:
```
Template: Product Performance Analysis

Base Structure:
- Dimension: product.name
- Measures: sales.total_revenue, sales.quantity_sold
- Filters: [DATE_RANGE], [PRODUCT_CATEGORY]

Instructions:
1. Update [DATE_RANGE] for desired time period
2. Modify [PRODUCT_CATEGORY] filter as needed
3. Rename query with specific date/category
```

### Common Template Types
- **Monthly business reviews** - Standard metrics and timeframes
- **Campaign analysis** - Marketing performance patterns
- **Product launches** - Pre/post launch analysis structure
- **A/B test evaluation** - Statistical significance patterns

## Query Versioning

### Version Naming
- `Customer Analysis v1.0` - Original version
- `Customer Analysis v1.1` - Minor updates
- `Customer Analysis v2.0` - Major restructure

### Change Documentation
Keep track of:
- **What changed** - Specific modifications made
- **Why changed** - Business reason for update
- **When changed** - Date of modification
- **Who changed** - Person responsible

### Archiving Old Versions
- **Move to archive folder** after 6 months
- **Keep final working version** easily accessible
- **Document replacement** if query is superseded

## Sharing and Permissions

### Sharing Levels
- **Private** - Only you can see and edit
- **Team** - Your immediate team access
- **Department** - Broader department access
- **Company** - Organization-wide access

### Permission Types
- **View** - Can see results, cannot modify
- **Edit** - Can modify query and structure
- **Admin** - Can change sharing settings

### Sharing Best Practices
✅ **Share early** - Let others benefit from your work
✅ **Set appropriate permissions** - Balance access with control
✅ **Document shared queries well** - Others need context
✅ **Update regularly** - Keep shared queries current

## Query Discovery

### Finding Existing Queries
Use search by:
- **Query name** - Exact or partial matches
- **Description** - Keywords in descriptions
- **Creator** - Find queries by specific people
- **Tags** - Filter by tag categories
- **Date created** - Find recent or historical queries

### Search Tips
- Use **specific keywords** from business context
- Try **multiple search terms** if first attempt fails
- Check **related folders** for similar analysis
- Ask **team members** about existing work

### Before Creating New Queries
Always check:
1. **Does similar analysis exist?** - Build on existing work
2. **Can existing query be modified?** - Avoid duplication
3. **Should this be a new version?** - Preserve original if needed
4. **Who else might need this?** - Consider sharing from start

## Maintenance and Cleanup

### Regular Review Schedule
- **Monthly** - Review your active queries
- **Quarterly** - Archive outdated analysis
- **Annually** - Major organization cleanup

### Cleanup Checklist
- [ ] Delete temporary/test queries
- [ ] Archive outdated analysis
- [ ] Update descriptions for clarity
- [ ] Consolidate similar queries
- [ ] Fix broken queries due to data changes

### Data Model Changes
When underlying data changes:
- **Test existing queries** for breakage
- **Update field references** as needed
- **Communicate changes** to query users
- **Document updates** in query descriptions

## Best Practices Summary

### Organization
✅ Use descriptive, consistent naming
✅ Organize in logical folder structure
✅ Tag queries for easy discovery
✅ Document purpose and context

### Collaboration
✅ Share queries with appropriate permissions
✅ Create templates for common patterns
✅ Communicate changes to shared queries
✅ Help others discover relevant work

### Maintenance
✅ Regular cleanup and archiving
✅ Keep documentation current
✅ Test queries after data model changes
✅ Version control for important queries

Well-organized queries are the foundation of efficient analytics. Take time to establish good habits early - your future self (and teammates) will thank you!

> **Practice Tip**: Start organizing from day one. Create a basic folder structure and naming convention before you have dozens of queries to sort through.
