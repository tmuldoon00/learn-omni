---
id: "02-modeling-overview"
title: "Data Modeling in Omni"
description: "Understanding Omni's just-in-time data modeling approach"
duration: "5 min"
videoId: "nmNG81KWpxA"
order: 2
---

# Data Modeling in Omni

Omni's data modeling approach is designed to be both flexible and governed, allowing you to start exploring data immediately while building reusable, trustworthy metrics as you go.

## Omni's Layered Modeling Approach

### Three Core Modeling Layers

#### 1. Schema Model
- **Mirrors your database** - Automatically reflects your database structure
- **Auto-generated** - Tables, columns, and basic relationships are detected
- **Always up-to-date** - Refreshes when your database schema changes
- **Foundation layer** - Provides the raw structure for analysis

#### 2. Shared Model  
- **Organization-wide metrics** - Governed business definitions everyone uses
- **Collaborative development** - Teams work together to define metrics
- **Version controlled** - Changes are tracked and can be reviewed
- **Single source of truth** - Consistent definitions across all analysis

#### 3. Workbook Model
- **Ad-hoc analysis** - Personal exploration and experimentation
- **Individual workspace** - Test ideas without affecting others
- **Promotion path** - Successful metrics can be promoted to shared model
- **Rapid iteration** - Quick analysis without formal processes

### Development Flow

The typical development pattern in Omni follows this progression:

```
Individual Exploration (Workbook Model)
         ↓
Team Validation & Review
         ↓
Promotion to Shared Model
         ↓
Organization-wide Usage
```

## Core Modeling Philosophy

### Start with Exploration
- **Begin in workbooks** - Start with ad-hoc analysis
- **Iterate quickly** - Test ideas and validate assumptions
- **Learn from data** - Discover patterns and relationships
- **Build understanding** - Develop domain expertise

### Promote What Works
- **Identify valuable metrics** - Find calculations used repeatedly
- **Validate business logic** - Ensure calculations are correct
- **Document context** - Add descriptions and business meaning
- **Share with organization** - Make metrics available to everyone

### Maintain Governance
- **Review process** - Changes go through approval workflows
- **Version control** - Track all changes to shared metrics
- **Testing and validation** - Ensure changes don't break existing content
- **Documentation** - Keep business context up to date

## Benefits of This Approach

### Speed to Insight
- **No modeling bottleneck** - Start analyzing immediately
- **Flexible exploration** - Change directions quickly as you learn
- **Iterative development** - Build understanding progressively
- **Rapid prototyping** - Test ideas before committing to formal definitions

### Governed Consistency
- **Single source of truth** - Shared metrics are used everywhere
- **Collaborative development** - Teams build metrics together
- **Change management** - Controlled updates to shared definitions
- **Audit trail** - Complete history of metric changes

### Scalable Architecture
- **Layer separation** - Clear boundaries between exploration and production
- **Performance optimization** - Shared metrics can be optimized
- **Access control** - Different permissions for different layers
- **Enterprise ready** - Scales from small teams to large organizations

## Model Structure in Practice

### Schema Model Refresh
When your database structure changes:
1. **Automatic detection** - Omni notices schema changes
2. **Refresh process** - Updates the schema model
3. **Impact analysis** - Identifies affected content
4. **Content validation** - Helps fix any broken references

### Workbook Development
For individual analysis:
1. **Start with schema** - Use raw database tables
2. **Add calculations** - Create custom metrics and dimensions
3. **Join tables** - Combine data from multiple sources
4. **Validate results** - Ensure calculations are correct

### Promotion to Shared Model
When ready to share:
1. **Review and validate** - Confirm business logic
2. **Add documentation** - Describe purpose and usage
3. **Promote components** - Move calculations to shared model
4. **Update references** - Workbooks use shared definitions

## Model Validation and Quality

### Strong Validation
- **Syntax checking** - Prevents invalid model definitions
- **Business logic validation** - Ensures calculations make sense
- **Reference checking** - Verifies all dependencies exist
- **Performance analysis** - Identifies potential performance issues

### Content Management
- **Impact analysis** - Shows what content uses each metric
- **Change tracking** - Complete history of modifications
- **Rollback capability** - Can revert problematic changes
- **Testing framework** - Validate changes before deployment

## Getting Started with Modeling

### For Analysts
1. **Start exploring** - Use schema model for initial analysis
2. **Create custom metrics** - Build calculations in workbooks
3. **Document findings** - Add descriptions to important calculations
4. **Collaborate with team** - Share insights and get feedback

### For Data Teams
1. **Set up connections** - Connect Omni to your databases
2. **Define topics** - Organize related tables and metrics
3. **Create shared metrics** - Build foundational business calculations
4. **Establish governance** - Set up review and approval processes

### For Organizations
1. **Define metric standards** - Establish naming conventions
2. **Create approval workflows** - Control changes to shared definitions
3. **Train users** - Ensure everyone understands the modeling approach
4. **Monitor usage** - Track which metrics are most valuable

## What's Next?

Now that you understand Omni's modeling approach, you're ready to:
- Learn about **dimensions and measures**
- Explore **calculated fields and metrics**
- Understand **table relationships**

> **Key Takeaway**: Omni's layered modeling approach gives you the flexibility to explore quickly while building governed, reusable metrics that scale across your organization.

Remember: Start with exploration, validate with collaboration, and promote what works!
