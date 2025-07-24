---
id: "03-ai-settings"
title: "Advanced AI: Text-to-Query Workbooks"
description: "Free text data exploration using GPT-powered natural language queries within data model bounds"
duration: "15 min"
videoId: "qiirj3C26Uk"
order: 3
---

# Advanced AI: Text-to-Query Workbooks

Beyond basic AI query assistance, Omni provides sophisticated text-to-query capabilities that enable completely free-form data exploration using natural language. This advanced AI feature operates within the bounds of your data model while providing unprecedented flexibility for exploratory analysis.

## The Evolution of AI Analytics

### From Structured to Conversational
Traditional BI tools require users to:
- Understand data model structure
- Know field names and relationships
- Construct queries using specific syntax
- Navigate complex UI controls

Text-to-query AI transforms this into natural conversation:
- **Describe What You Want** - Ask questions in plain English
- **Explore Freely** - No need to know specific field names or structure
- **Iterate Naturally** - Follow up with additional questions and refinements
- **Discover Insights** - AI suggests relevant analyses based on your questions

### GPT Integration Benefits
By leveraging GPT technology within Omni's semantic model:
- **Contextual Understanding** - AI comprehends business terminology and relationships
- **Bounded Exploration** - Queries stay within your defined data model and security rules
- **Intelligent Interpretation** - Complex business questions translated into precise analytics
- **Learning Capability** - AI improves based on successful interaction patterns

## How Text-to-Query Works

### Natural Language Processing
The AI interprets various question formats and converts them into appropriate queries:

**Exploratory Questions:**
> "What are our top performing products this quarter?"
> "Show me customer churn patterns by region"
> "How has our sales pipeline changed over the past 6 months?"

**Comparative Analysis:**
> "Compare this month's revenue to the same month last year"
> "Which marketing channels are performing better than average?"
> "How do our top customers differ from our average customers?"

**Trend Analysis:**
> "What trends do you see in our customer acquisition data?"
> "Are there any seasonal patterns in our sales data?"
> "Show me the correlation between marketing spend and lead generation"

### Intelligent Query Construction
The AI automatically handles complex query logic:
- **Join Logic** - Automatically connects related tables and data sources
- **Aggregation Selection** - Chooses appropriate summarization methods
- **Filter Application** - Applies relevant constraints based on context
- **Time Period Handling** - Interprets date ranges and temporal comparisons

## Advanced Use Cases

### Executive Discovery Sessions

**Scenario:** CEO exploring quarterly performance
```
User: "How did we perform this quarter compared to our goals?"
AI: Creates dashboard showing revenue vs. targets, key metrics, variance analysis

User: "What's driving the revenue shortfall in the West region?"
AI: Drills down to regional performance, identifies specific product categories and customer segments

User: "Show me the customer segments that are underperforming"
AI: Generates customer cohort analysis with performance indicators and trend data
```

### Product Manager Analysis

**Scenario:** Product manager investigating user engagement
```
User: "Which features are our most active users engaging with?"
AI: Creates feature usage analysis segmented by user activity levels

User: "Are there differences in feature adoption between customer tiers?"
AI: Generates comparative analysis showing feature usage by customer segments  

User: "What's the relationship between feature usage and customer satisfaction?"
AI: Builds correlation analysis with satisfaction scores and engagement metrics
```

### Sales Team Exploration

**Scenario:** Sales director analyzing team performance
```
User: "Show me which sales reps are exceeding their quotas this quarter"
AI: Creates sales performance dashboard with quota attainment and rankings

User: "What do our top performers have in common?"
AI: Analyzes successful sales patterns, deal characteristics, and activity metrics

User: "How can we help underperforming reps improve?"
AI: Identifies coaching opportunities based on successful rep behaviors and deal patterns
```

## Technical Architecture

### Model-Bounded Intelligence
Text-to-query operates within your semantic model boundaries:
- **Security Compliance** - All queries respect existing row-level and field-level security
- **Data Governance** - Maintains business rules and definitions from your model
- **Performance Optimization** - Leverages existing model optimizations and caching
- **Quality Assurance** - Uses validated business logic and metrics definitions

### Query Generation Process
1. **Natural Language Parsing** - AI interprets the business question
2. **Intent Recognition** - Identifies the type of analysis requested
3. **Model Mapping** - Maps concepts to available data model elements
4. **Query Construction** - Builds optimal SQL or model-based query
5. **Result Validation** - Ensures query results make business sense
6. **Presentation Optimization** - Formats results for optimal understanding

## Best Practices for Text-to-Query

### Effective Question Patterns

**Specific and Contextual:**
✅ "Show me Q3 2024 sales performance by product category for the Enterprise segment"
❌ "Show me sales data"

**Business-Focused:**
✅ "Which customers are at risk of churning based on their recent activity patterns?"
❌ "Query the customer activity table"

**Outcome-Oriented:**
✅ "Help me understand why conversion rates dropped last month"
❌ "Show me conversion data"

### Iterative Exploration
- **Start Broad** - Begin with high-level questions to understand the overall picture
- **Drill Down** - Follow up with more specific questions based on initial insights
- **Compare and Contrast** - Ask comparative questions to identify patterns and anomalies
- **Validate Findings** - Use different question approaches to confirm important insights

### Model Optimization for AI
- **Rich Descriptions** - Include business context in field and measure descriptions
- **Logical Groupings** - Organize related metrics and dimensions together
- **Consistent Naming** - Use business-friendly names that AI can easily interpret
- **Relationship Documentation** - Clearly define how different data elements connect

## Advanced Configuration

### AI Context Enhancement
```yaml
# Example model configuration for AI optimization
topic: sales_performance
description: "Comprehensive sales metrics including pipeline, conversion, and team performance"

ai_context:
  business_domain: "Sales and Revenue Operations"
  key_metrics: ["revenue", "deals_closed", "conversion_rate", "pipeline_value"]
  common_questions:
    - "sales performance by rep"
    - "pipeline health and forecast accuracy"
    - "deal conversion patterns"
  
fields:
  - name: deal_value
    description: "Total contract value including all products and services"
    ai_synonyms: ["deal size", "contract value", "revenue potential"]
```

### Custom AI Prompts
Organizations can customize AI behavior:
- **Industry Terminology** - Train AI on specific business vocabulary
- **Analysis Templates** - Pre-configured analysis patterns for common questions
- **Response Formatting** - Standardized output formats for consistency
- **Context Awareness** - AI understanding of business cycles and seasonal patterns

## Measuring AI Effectiveness

### Usage Analytics
- **Question Success Rate** - Percentage of queries that produce meaningful results
- **User Satisfaction** - Feedback on AI-generated analyses quality
- **Time to Insight** - Reduction in analysis completion time
- **Exploration Depth** - Average number of follow-up questions per session

### Business Impact
- **Decision Velocity** - Faster business decisions enabled by conversational analytics
- **User Adoption** - Increased engagement with data exploration tools
- **Insight Quality** - More thorough analysis through AI-guided exploration
- **Democratization Success** - Non-technical users successfully conducting advanced analysis

Text-to-query represents the future of business intelligence—where anyone can explore data using natural language while maintaining the precision, security, and governance that enterprises require. This technology democratizes advanced analytics while preserving data quality and business context.
