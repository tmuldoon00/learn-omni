# Optimize models for Omni AI

**Source URL:** [https://docs.omni.co/docs/ai/optimize-models](https://docs.omni.co/docs/ai/optimize-models)  
**Extracted:** 2025-07-23 21:43:56  
**Source:** Omni Analytics Documentation

---

On this page

Enhancing your models for using Omni's AI can significantly improve the accuracy and relevance of AI-generated responses. In this guide, you'll learn what AI context is and how to use it to curate your models.

Requirements

To follow this guide, you'll need:

An understanding of Omni modeling concepts

Familiarity with Omni's model IDE

Familiarity with basic AI terminology such as tokens, agents, etc.

AI context in Omni

What is AI context?

Context is information such as:

Descriptions of topics and fields

Possible field values

How a field might be used

In Omni, this is provided to the AI using a

context window

. A context window is the amount of text an AI can read and consider at one time when answering a question or completing a task.

Why provide context to AI?

Using context windows allows AI models to understand and incorporate relevant information. Specifically, providing context to the LLM makes it more effective, enabling it to interpret your request accurately and generate meaningful responses.

What does Omni AI use for context?

Omni uses the following for context:

Priority

Description

Context from Omni

The

ai_context

parameters in the model, topics and views, if provided

Topic's

description

, if provided

Topic's

name

and

base_view

Prioritized field properties:

fully_qualified_name

view_name.field_name

) - For example,

order_items.total_sale_price

name

- For example,

total_sale_price

aliases

ai_context

all_values

- Used to specify the possible values for the field

Pruned field properties. These properties will be pruned in the following order, but note that fields may be truncated entirely if required.

description

group_label

- The categorization of the field

label

- If defined, the value will be used. If not provided, a title-cased field name with underscores removed will be used. For example,

Total Sale Price

semantic_type

- The dimension or aggregate type, such as

dimension

sum

count

, etc. This value is evaluated based on the field definition and can't be directly modified.

data_type

The field's data type, such as

number

string

, etc.

sample_values

- Example values for the field

synonyms

- Other terms used to refer to the field

Where does context apply?

Context applies to:

AI assistant /

Embedded chat instances

AI query helper (Blobby)

in the workbook

AI summary visualizations

AI filter generator

What limitations does context have?

Omni's model can handle

~200K

characters of context:

~15-25K

is reserved for Omni app context, which is used to ensure queries are generated properly

The remaining

~175K characters

are allocated for context from the semantic layer before truncation, starting with field metadata

To prevent field truncation, we recommend limiting the number of fields included in the context window to

. Let's look at example to explain to demonstrate why.

You have a topic that you want to use for AI querying. Including the topic's

description

name

base_view

ai_context

, and the included fields' prioritized properties (ex:

name

), let's say the total characters used is around

10,000

175,000 characters   // total allocated for semantic layer context

-  10,000 characters   // topic metadata & prioritized field properties

------------------

165,000 characters   // total remaining for additional context

In the topic, the included fields generally look like this:

active_camp_active_campaign_id_c

sql

'"ACTIVE_CAMP_ACTIVE_CAMPAIGN_ID_C"'

label

Active Campaign Active Campaign ID

group_label

Active Campaign

The total characters used for this field's basic metadata equals

160 characters

You'll likely want to add

field-level context

, such as

description

sample_values

, and

ai_context

. Let's add

140 characters

to account for the AI-specific metadata, which brings the total characters per field to

300 characters

160 characters      // basic field metadata

+ 140 characters      // field-level context for AI

--------------

300 characters      // total field metadata

To get the total number of fields, divide the remaining characters available (

165,000

) by the total metadata characters per field:

165,000 characters      // total remaining for additional context

/     300 characters      // total field metadata

-------------------

550(ish) fields     // total fields for inclusion

This gives you roughly

fields to include in the context window before Omni begins truncating fields.

How is context to the AI processed?

Context provided to Omni's AI is shared with AWS Bedrock. Refer to the

AI data security guide

for more information.

Curate AI outputs across the model

You can use the model parameter

ai_context

to pass context shared across topics. This parameter may also be useful for topic selection in the AI Assistant.

Implement chain-of-thought reasoning for AI chat

If you want to have Blobby give a more thorough explanation of what is being generated (topic selection, field selection, etc.), you can include the following context within the model's

ai_context

This can be altered and tweaked if desired, but the reference to

GenerateQuery

is required for proper behavior.

ai_context

Before calling the 'GenerateQuery' tool, please do the following steps:

1. Explain your reasoning of how you picked the fields in detail (9-10 sentences), under the header "Reasoning for field selection"

2. Another 3-4 sentences on alternative queries or fields you could have chosen under the header "Alternative approaches considered"

3. Finally add 4 markdown links as follow up questions under the header "Follow-up questions"

Output summaries in multiple languages

If you'd like Blobby to summarize outputs in multiple languages, you can include the following context:

ai_context

When generating a summary, always output the summary in both English and Spanish.

Curate topics for AI

Topics

have an

ai_context

parameter, which is useful for providing behavioral prompts and guidance for handling certain questions specific to the topic.

For example:

ai_context for e-commerce orders topic

ai_context

This topic is focuses on e

commerce orders. The main concepts are orders

at the line item level in the order items table

users in our user table

inventory in our inventory items table

and products in the products table.

Only respond with accurate answers based on the data that you're aware of.

Don't pivot unless there is more than one dimension included in the query.

Typical questions will be focused on order performance over time

breakdowns across users

and more.

if asked about sales or performance

always use the order_items.total_sale_price field

if asked about which users or who

use the users.full_name and users.email fields. Never return an ID unless explicitly asked.

if asked about top n without a specific metric or dimension

assume it involves the order_items.total_sale_price and products.name fields

Curating topics for the AI Assistant

You can use the

ai_chat_topics

model parameter to curate the list of topics that the AI Assistant or

embedded chat instances

have access to.

Limit the context window with

ai_fields

Blobby only uses the fields that exist within the context of a topic to output a response. Fields that have a

hidden: true

parameter are excluded from the context window. If you'd like to specify fields you want included in the context window, you can leverage the

ai_fields

parameter within a topic. For fields that you want to include, you can provide additional

context at the field level

While Blobby can create calculations and aggregations, we recommend periodically checking the

Analytics > AI usage

dashboard to see what questions your users are asking, so you can identify opportunities to promote logic to the shared model and improve the self-serve experience.

Reuse logic and limit the context window with topic extensions

Topics that you're already leveraging in Omni can be extended to further curate them for AI. Using the

extends

parameter, you can reuse the definition of an existing topic without needing to repeat the code. Consider the following

Order Transactions

topic, which you want to extend to create a curated version dedicated to AI usage:

Order Transactions topic

label

Order Transactions

default_filters

order_items.status

not

Returned

Cancelled

joins

users

user_order_facts

inventory_items

products

distribution_centers

In a new topic, use

extends: [ order_items ]

to extend the

Order Transactions

topic. You can then specify what to include in the AI-specific topic, such as limiting fields, filtering the data for specific use cases, adding more AI context, and so on:

Orders for AI querying topic, extended from Order Transactions

extends

order_items

base_view_label

Order Items

label

Orders for AI Querying

# limit fields included in the context window

ai_fields

tag

use_for_ai

Add example queries as context

Along with providing context about the topic itself, you can use the topic's

sample_queries

to provide example questions. This approach is useful if you anticipate specific, recurring questions or you find that Blobby struggles with date filters.

To do this, you'll want to:

Create a query in a workbook that contains the correct answer to the question.

In the workbook, click

Model > Save as sample query to topic

When prompted, fill in the following:

Label

- A user-friendly name for the query

Description

- An optional description

Display on topic overview

- If checked, the query will display as a sample query when the topic is selected in a new query tab

Include in AI context

- If checked, the query will be included in the AI context for the topic

Prompt

- An optional example prompt that could be used to generate this query

AI context

- Optional, additional context for the AI

When finished, click

Save

Curate views and fields for AI

Views

also have an

ai_context

parameter which can be useful for passing context to AI that is specific to the view.

Keeping fields organized and labeled can not only help you create a top-notch self-service experience, it can also make Omni's AI more efficient. The following parameters can be used to add metadata to fields for the purposes of AI:

ai_context

- Adds context useful for AI responses

all_values

- All possible values for the field

Note

: when the

dbt integration

is enabled,

accepted_values

tests will be ingested as

all_values

sample_values

- Example values for the field

synonyms

- Other terms used to refer to the field

You can use the workbook or the IDE to add the parameters.

In the workbook

In the field browser, click the

options (three dots)

menu next to the field.

Click

Modeling > Edit

to open the

Edit field

side panel.

In the IDE

In the IDE, navigate to the view containing the field to add the parameters. For example:

products.view

dimensions

brand

sql

'"BRAND"'

description

Brand name of product

sample_values

Calvin Klein

Carhartt

Hanes

Volcom

Levi's

Diesel

Lucky Brand

Quicksilver

Nautica

American Apparel

Columbia

Hurley

Dockers

Arc'teryx

IN2

DKNY

HOBO

NOM

ANS

synonyms

logo

ai_context

To filter this field

use contains with the brand name.

Requirements

AI context in Omni

Curate AI outputs across the model

Implement chain-of-thought reasoning for AI chat

Output summaries in multiple languages

Curate topics for AI

Limit the context window with

ai_fields

Reuse logic and limit the context window with topic extensions

Curate views and fields for AI

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/optimize-models](https://docs.omni.co/docs/ai/optimize-models) on 2025-07-23.*
