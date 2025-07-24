---
id: "01-ai-overview-introduction"
title: "AI in Omni - Complete Guide"
description: "Comprehensive overview of AI capabilities and semantic model integration"
duration: "20 min"
videoId: "Z8G2culbFWs"
order: 1
---

# AI in Omni - Complete Guide

Omni's AI capabilities represent a revolutionary approach to data analysis, combining the power of large language models with the accuracy of semantic data modeling. This creates an AI system that truly understands your business context and data relationships.

## Why AI in Analytics Matters

### Traditional Analytics Challenges
- **SQL Expertise Required** - Complex queries need technical knowledge
- **Time-Intensive Process** - Building analysis takes hours or days
- **Context Missing** - Raw data lacks business meaning
- **Barrier to Insights** - Non-technical users can't self-serve

### Omni's AI Solution
- **Natural Language Interface** - Ask questions in plain English
- **Business Context Aware** - Understands your metrics and definitions
- **Instant Results** - Get answers in seconds, not hours
- **Self-Service Analytics** - Everyone can explore data independently

## Core AI Capabilities

### 🗣️ Natural Language Querying
**Ask questions like a human:**
- "What was our revenue last quarter compared to the same quarter last year?"
- "Show me the top 10 customers by lifetime value"
- "Which products have declining sales trends?"
- "What's our customer churn rate by segment?"

**AI translates to precise queries:**
- Understands business terminology
- Handles complex time comparisons
- Manages multiple data relationships
- Applies appropriate filters automatically

### 🧠 Intelligent Query Building
**AI assists with query construction:**
- **Field Suggestions** - Recommends relevant dimensions and measures
- **Filter Logic** - Proposes appropriate data constraints
- **Calculation Help** - Creates complex metrics and formulas
- **Join Intelligence** - Understands table relationships

### 📊 Automated Insights Generation
**AI discovers patterns for you:**
- **Trend Analysis** - Identifies significant changes over time
- **Anomaly Detection** - Highlights unusual data points
- **Correlation Discovery** - Finds unexpected relationships
- **Summary Insights** - Explains what the data means

### 🎯 Context-Aware Responses
**Powered by your semantic model:**
- **Business Definitions** - Uses your metric definitions
- **Data Relationships** - Understands how tables connect
- **Security Permissions** - Respects user access controls
- **Custom Logic** - Incorporates your business rules

## How Omni's AI Works

### The Semantic Model Advantage

#### Traditional AI Limitations
- Generic responses without business context
- Hallucinations and inaccurate results
- No understanding of data relationships
- Security and permissions ignored

#### Omni's Semantic-Powered AI
1. **Model Context** - AI understands your data structure
2. **Business Logic** - Incorporates custom calculations and rules
3. **Relationship Awareness** - Knows how data connects
4. **Permission Respect** - Only shows accessible data
5. **Accuracy Guarantee** - Results based on actual data model

### AI Processing Flow

```
Natural Language Question
         ↓
Context Understanding (Semantic Model)
         ↓
Query Generation (Omni SQL)
         ↓
Data Retrieval (Your Database)
         ↓
Intelligent Response + Insights
```

## AI Features in Detail

### Natural Language Query Interface

#### Query Types Supported
- **Simple Aggregations** - "Total sales this month"
- **Comparisons** - "Revenue this year vs last year"  
- **Rankings** - "Top 5 products by profit margin"
- **Filtering** - "Customers in California with >$10K orders"
- **Time Analysis** - "Monthly growth rate for Q4"

#### AI Query Refinement
- **Clarifying Questions** - AI asks for missing context
- **Alternative Suggestions** - Proposes related queries
- **Progressive Refinement** - Builds on previous questions
- **Context Memory** - Remembers conversation history

### Intelligent Field Suggestions

#### Smart Recommendations
- **Related Fields** - Suggests complementary dimensions/measures  
- **Popular Combinations** - Shows commonly used field pairs
- **Business Logic** - Recommends calculated fields
- **Performance Optimized** - Suggests efficient query patterns

#### Context-Aware Filtering
- **Relevant Filters** - Proposes appropriate data constraints
- **Dynamic Suggestions** - Updates based on selected fields
- **Business Rules** - Incorporates custom logic
- **User Preferences** - Learns from usage patterns

### AI-Powered Calculations

#### Formula Generation
- **Excel-Style Functions** - Natural language to formulas
- **Business Metrics** - Creates KPIs and ratios
- **Time Calculations** - Period comparisons and trends
- **Statistical Functions** - Advanced analytical calculations

#### Examples of AI Calculations
```
"Calculate customer lifetime value"
→ SUM(order.total_revenue) BY customer.id

"Show month-over-month growth rate"  
→ (current_month - previous_month) / previous_month * 100

"Find customers above 90th percentile"
→ PERCENTILE(customer.total_spent, 0.9)
```

## AI Configuration and Optimization

### Model Preparation for AI

#### Essential AI Context
- **Field Descriptions** - Clear, business-friendly names
- **Business Definitions** - What metrics actually mean
- **Relationship Documentation** - How data connects
- **Usage Examples** - Sample queries and use cases

#### AI Context Parameters
```yaml
# Example field with AI context
dimension: customer_segment {
  type: string
  sql: ${TABLE}.segment
  label: "Customer Segment"
  description: "Customer categorization: Premium, Standard, Basic"
  ai_context: "Use for analyzing customer behavior patterns. 
               Premium customers have >$50K annual spend."
}
```

### Performance Optimization

#### AI Response Speed
- **Semantic Model Efficiency** - Well-structured models respond faster
- **Context Limits** - Balanced detail vs. performance
- **Caching Strategy** - Frequently used patterns cached
- **Query Optimization** - AI generates efficient SQL

#### Accuracy Improvements
- **Field Documentation** - Clear descriptions improve understanding
- **Example Queries** - Train AI with common patterns
- **Business Glossary** - Define domain-specific terms
- **Usage Feedback** - AI learns from corrections

## AI Security and Governance

### Data Privacy
- **On-Premises Processing** - No data leaves your environment
- **Permission Inheritance** - AI respects all user permissions
- **Audit Trails** - Track all AI-generated queries
- **Data Residency** - Compliant with regional requirements

### Access Control
- **Role-Based AI Access** - Control who can use AI features  
- **Feature Permissions** - Granular control over AI capabilities
- **Query Limits** - Prevent resource abuse
- **Content Filtering** - Block inappropriate queries

## Best Practices for AI Success

### Model Design for AI
✅ **Use descriptive field names** - "customer_lifetime_value" not "clv"
✅ **Add comprehensive descriptions** - Explain what each field represents
✅ **Document business logic** - Explain calculation methods
✅ **Provide usage examples** - Show common query patterns

### AI Context Writing
✅ **Business-focused language** - Use terms your users understand
✅ **Specific examples** - "Premium customers spend >$50K annually"
✅ **Relationship explanations** - How fields connect to others
✅ **Edge case handling** - What to do with null values, etc.

### User Training
✅ **Start simple** - Begin with basic questions
✅ **Progressive complexity** - Build to advanced queries
✅ **Common patterns** - Teach frequently used question types
✅ **AI limitations** - Set appropriate expectations

## Common AI Use Cases

### Executive Reporting
- "Show me our key metrics for the board meeting"
- "What are the main growth drivers this quarter?"
- "How do our results compare to our targets?"

### Sales Analysis
- "Which sales reps are exceeding their quotas?"
- "What's our win rate by product category?"
- "Show me pipeline conversion trends"

### Customer Analytics  
- "Who are our highest-value customers?"
- "What's driving customer churn this month?"
- "Which customer segments are growing fastest?"

### Operational Intelligence
- "Where are our biggest cost drivers?"
- "What products have the highest profit margins?"
- "Show me efficiency trends across regions"

## Troubleshooting AI Issues

### Common Problems
- **Vague responses** - Add more field context and descriptions
- **Incorrect results** - Verify semantic model accuracy
- **Slow performance** - Optimize model complexity
- **Missing data** - Check permissions and data availability

### Optimization Strategies
- **Iterative improvement** - Continuously refine AI context
- **User feedback collection** - Learn from actual usage
- **Model validation** - Regularly test AI responses
- **Performance monitoring** - Track response times and accuracy

## What's Next?

Now that you understand Omni's AI capabilities, you're ready to:
- **Set up natural language querying** for your users
- **Optimize your models** for better AI performance
- **Implement embedded AI** for customer-facing applications
- **Train your team** on AI-powered analytics

> **Pro Tip**: Start with well-documented, simple models and gradually add AI context as you learn what works best for your users.

Omni's AI transforms analytics from a technical skill to a conversational experience. When properly configured, it democratizes data access and accelerates insights across your entire organization!
