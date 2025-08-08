# Embedding Omni's AI query helper

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/ai-chat](https://docs.omni.co/docs/embed/external-embedding/ai-chat)  
**Extracted:** 2025-07-23 21:44:10  
**Source:** Omni Analytics Documentation

---

On this page

Omni's

AI query helper

can be embedded as a standalone page in your application, allowing your users to explore data outside of workbooks using the same AI-powered experience (aka Blobby) found in the native Omni app.

In this guide, you'll learn how to integrate a whitelabeled version of the query helper directly into your application.

How it works

The embedded chat experience can be tailored to include only the connections, models, and topics you specify:

Up to three pickers (shown in the above image) can display in the chat interface:

Connections

- Lists the connections the user has access to. The picker only displays if more than

one

connection is available.

Models

- Lists the available models in the selected connection. The picker only displays if:

The connection has more than one model,

AND

At least one topic in the model is accessible. This could mean that the model's

ai_chat_topics

is unset, making all topics accessible,

that it specifies at least one topic:

ai_chat_topics

Products

Topics

- Lists the available topics in the model. The picker only displays if at least

two

topics in the model are accessible. This could mean that the model's

ai_chat_topics

is unset,

that it specifies at least two topics:

ai_chat_topics

Products

Orders

Scoping responses & selecting topics

If a prompt is entered and a topic isn't selected - meaning that

Auto-select a topic

is selected in the topic picker - the AI will attempt to select the most relevant topic.

To scope the AI's response to a specific dataset, users should use the pickers to select a specific topic. The AI will remain "locked" to the selected topic until the selection is changed.

Additionally, note that the picker menus won't display when a model only has one AI-accessible topic. If a connection has one model with a single AI-accessible topic - determined by the value of the model's

ai_chat_topics

parameter -

the AI will be scoped only to that topic

and the pickers will not display.

Step 1: Define connection access

The first step is to decide which connections you want your users to have access to when using the query helper. These connections will display in the

Connections

picker below the chatbox.

Start by retrieving the connections' unique IDs. Later in this guide, you'll use the IDs to construct a

connectionRoles

parameter and configure the embed session. You can retrieve connection IDs using either of the following methods:

From connection settings

In Omni:

Navigate to

Settings > Connections

Click on the connection.

At the top of the

Settings

tab, locate the

Connection ID

field:

Using the API

To programatically retrieve connection IDs, use the

List connections API

If you want to retrieve a specific connection - such as a connection specific to a client - use the endpoint's filtering functionality. In this example, the request will retrieve a connection named

Blobs R Us

GET /api/v1/connections

curl -X GET 'https://blobsrus.omniapp.co/api/v1/connections?name=Blobs+R+Us' \

--H 'Authorization: Bearer <TOKEN>' \

--H 'Content-Type: application/json'

Valid requests to the API will return a

200 OK

status and a response body containing

connection

objects. Each object will the connection's unique

Step 2: Curate the topic list

Next, you'll curate the list of topics you want users to have access to in the topic picker:

This is accomplished with the

ai_chat_topics

model parameter. This parameter accepts a list of topic names, which will limit access only to the specified topics.

In Omni, navigate to the models associated with the connections from

Step 1

. Add the

ai_chat_topics

parameter and specify the topics that users should have access to:

Example model file

ai_chat_topics

Product Performance

Order Transactions

Did you know?

You can add

sample queries

to accessible topics, which will display in the chat interface as clickable questions:

Refer to the

Optimizing models for AI guide

for more information about curating topics for AI.

Step 3: Define embed parameters

The next step is to define the embed parameters to create the chat session for the user. Along with the

required parameters

externalId

name

, and

nonce

- set the following parameters:

contentPath

- Set to

/chat

connectionRoles

- Use the connection IDs from

Step 1

to build an object that specifies the connection roles available to the embed users. For example:

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"RESTRICTED_QUERIER"

If you're using

standard SSO embed

to create embed sessions, the embed URL you build might look like the following:

https://omni.blobsrus.com/embed/login?

&connectionRoles=%7B%22c0f12353-4817-4398-bcc0-d501e6dd2f64%22%3A%22RESTRICTED_QUERIER%22%7D

contentPath=%2Fchat

&externalId=Blobs+R+Us

&mode=SINGLE_CONTENT

&name=Blobby

&nonce=yRt9RbPRST1pKP0fv4hkZkOcyydnwmWX

&signature=prfIqNKkUBYlXiAdXLe_E__w19QbM_-6o3CIi4kkV1s

Step 4: Apply your branding

Heads up!

Reach out to Omni support to enable the

AI branding settings

After you've successfully configured and created an embed session, the last step is to apply your branding styles. While this last step is

optional

, it allows you to make the query helper your own and blend it seamlessly with your application.

Navigate to

Settings > AI

and then click the

Branding

tab

Use the settings to configure how you want the query helper to look and then click

Save

URL to assistant image

Customize logo used for AI chat

Intro headline

Customize text right below logo

Intro body

Customize overview explaining main ways users can interact with AI chat

Prompt placeholder

Customize temporary text displayed in the input box for chat

How it works

Scoping responses & selecting topics

Step 1: Define connection access

Step 2: Curate the topic list

Step 3: Define embed parameters

Step 4: Apply your branding

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/ai-chat](https://docs.omni.co/docs/embed/external-embedding/ai-chat) on 2025-07-23.*
