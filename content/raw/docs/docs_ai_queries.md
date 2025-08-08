# Building queries & filters with AI

**Source URL:** [https://docs.omni.co/docs/ai/queries](https://docs.omni.co/docs/ai/queries)  
**Extracted:** 2025-07-23 21:43:57  
**Source:** Omni Analytics Documentation

---

On this page

Omni's AI query helper enables conversational analytics that take the need for technical know-how out of data analysis. Using natural language, you can create, iterate, filter, and summarize queries with ease.

Blobby, the AI query helper

info

To use

the AI query helper

, the

Query assistant

setting in your

AI settings

must be enabled.

Note

: This feature is enabled by default.

Omni's AI query helper, Blobby, can help you create and refine workbook queries using natural language. You can ask Blobby questions like:

... And Blobby will either provide a text response or generate a query in the workbook.

Answers are routed through

topics

and generate an Omni-modeled query rather than writing raw SQL. This means that Blobby can leverage joins and fields defined in the model layer while respecting user permissions. Refer to the

AI data security guide

for more technical information on how the AI processes queries.

Generating queries

In a document draft, click the ✨ (three stars) in the left side navigation. A panel will open next to the field picker with some tips about how to use the feature, as well as a text box to ask your first question.

In addition to prompting Blobby to create a query, Blobby can also:

Iterate on the questions you ask to provide a more refined result

. For example:

You: How many orders did we have in California?

Blobby: 1,005

You: How about in just the last 30 days?

Blobby: 126

Add totals to results

, such as adding a

column total

that sums a

Sale Price

measure

Create new measure fields

, such as a

Sale Price Average

Note

: Closing the query helper will delete the text history.

Use the API!

Along with the query helper in the workbook, you can also use the

Generate an AI query API

to interact with Blobby. You can then use the response to run the query with the

Run a query API

Creating filters

Make filtering easier by having Blobby create filters for you using natural language. You can describe a filter like

Only include orders created on a Saturday

Exclude customers with a status of deactivated

and Blobby will automatically apply the filter to the query.

To add an AI filter to your query:

Use the query helper window, or

Click the

starred funnel

icon next to the

Options

button in the

Results

tab:

Summarizing query results

info

To use

AI summarization

, the

Query assistant

setting in your

AI settings

must be enabled.

Note

: This feature is enabled by default.

In addition to helping you build queries, Blobby can also summarize the results of the query for you. For example, you can ask Blobby to:

Describe any anomalies in the data

Identify insights into trends

Detail the next steps you should take

To get started, you can enter a prompt directly in the query helper or click the

chat bubble

near the

Options

button:

Clicking the

Summarize results

button will automatically enter a

Summarize these results

prompt into the query helper. Blobby will typically respond with an overview of the data in the query, some observations, and potential analysis questions:

View full text response

Hourly Issue Distribution Analysis

Key Insights

Peak Hours: Issues are most frequent between 8-14 hours (PT), with a maximum of 1,600 issues at 9 AM

Response Time Trends:

Fastest median response times (2-3 minutes) occur during 8-16 hours (PT)

Slowest response times are late night/early morning (22-23 hours), reaching ~80-97 minutes

Visualization Recommendations

What are the busiest hours for issue creation?

How does response time correlate with issue volume?

Potential Actions

Optimize support staffing during peak hours (8-14 hours)

Investigate reasons for slow response times during late night/early morning

Consider implementing automated first-response mechanisms during low-staffing periods

If you want to enter an initial prompt that's more specific

, use the query helper. In the following example, Blobby was given the following prompt:

Can you please summarize these results and include recommendations for improvement?

View full text response

Hourly Issue Analysis Summary

Key Insights

Peak issue volume occurs between 8-14 hours (PT), with a maximum of 1,600 issues at 9 AM

Lowest issue volumes are during late evening/early morning (19-23 hours)

Median response times vary significantly across hours

Response Time Observations

Best response times (2-3 minutes):

9-12 hours (PT)

14-16 hours (PT)

Worst response times:

22-23 hours (PT): ~80-97 minutes median response

18 hours (PT): ~7.7 minutes median response

Recommendations

Investigate staffing during peak hours

Optimize support coverage for 22-23 hour window

Understand why 9 AM has highest issue volume

Potential Action Items

Adjust support team scheduling

Implement automated first-response mechanisms

Analyze root causes of high-volume periods

To make a summary part of a dashboard, use the

AI summary visualization

Improving AI results

Queries and filter prompts submitted to Blobby may require some tweaking to get the best result. Refer to the

Optimizing your models for AI guide

to learn how to curate your models and include context to achieve this.

Blobby, the AI query helper

Generating queries

Creating filters

Summarizing query results

Improving AI results

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/queries](https://docs.omni.co/docs/ai/queries) on 2025-07-23.*
