# AI data security

**Source URL:** [https://docs.omni.co/docs/ai/data-security](https://docs.omni.co/docs/ai/data-security)  
**Extracted:** 2025-07-23 21:43:52  
**Source:** Omni Analytics Documentation

---

On this page

Several features in Omni are powered by AI, allowing you to use natural language to ask questions about your data, get help creating queries, build calculations, and more.

LLM providers

Omni uses two LLM providers to power its AI features:

Amazon Web Services (AWS) Bedrock

OpenAI (AI advanced visualizations only)

Any data, including metadata, provided to the LLMs used by Omni will not used for training.

User prompt categorization

When a user enters a prompt, Omni will first use

AWS Bedrock

's hosted Claude model to categorize the request to determine how to respond.

Shared data

To determine the correct category for the prompt, Omni shares the prompt itself with AWS Bedrock. Specifically, this is the natural language question or prompt provided by the user. For example,

"How many users signed up last month?"

"Filter by the last two years."

Query generation

When generating a query, the output of the AI's processing is a new Omni query, which is a collection of metadata - including field names, filters, sorts, pivots, topic name, and limit - that is translated into SQL. This new query is then run within the current workbook to provide an answer to the user's prompt.

Because the AI uses an abstract query format and not SQL to create queries, the generated query respects the permissions set in Omni. This means it's not possible to access data outside of the topics, models, and connections a user has been restricted to in Omni.

Additionally, this approach ensures that no private, relational, or result set data is shared to generate queries. Only metadata about the current query, user prompt, and selected topic fields is sent to AWS Bedrock, thus maintaining the privacy and security of your data.

Shared data

While relational data is not shared to generate queries, Omni does share certain metadata with AWS Bedrock to generate accurate responses. This metadata includes:

Description

What's shared?

Current query metadata

Information about the currently selected query in the workbook, such as field names, sorts, limits, pivots, and filters

User prompt

The natural language question or prompt provided by the user. For example,

"How many users signed up last month?"

"Filter by the last two years."

Context (

ai_context

Free text that provides context. This is set at the

topic

view

level using the

ai_context

parameter.

Fields within the selected topic

Metadata about the fields in the currently selected topic, such as field names, labels, descriptions, data types, and whether they're aggregates (

count

sum

average

) or dimensions.

Note

: Even if a user has access to multiple topics in a workbook, only metadata for the topic that's currently selected is accessed.

Omni will share the

metadata for the current query

to generate accurate formulas.

Data summarization

Omni's AI uses AWS Bedrock to power its data summarization features, which includes using the AI summary visualization or the query helper to summarize the results of a query.

Shared data

note

Models are region-specific to ensure data privacy. For example, if you're based in the EU, the models you use will be deployed in an EU-based region to ensure your data never leaves your region.

To generate accurate summaries, the following is shared with AWS Bedrock:

The

metadata for the current query

A CSV of the current query's results

All data will remain within AWS.

Features & shared data

The following table details each of Omni's AI features and the data it shares. Refer to the

AI settings reference

for information about enabling and disabling these features.

Name

User prompt

Current query metadata

Current query results

AI assistant / query helper

Yes

Data summarization

Yes

Yes

Yes

AI summary visualization

Yes

Yes

Yes

Blank workbook topic picking

Yes

Vega advanced Visualization assistant

Yes

IDE assistant

Yes

LLM providers

User prompt categorization

Shared data

Query generation

Shared data

Data summarization

Shared data

Features & shared data

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/data-security](https://docs.omni.co/docs/ai/data-security) on 2025-07-23.*
