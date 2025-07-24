# Using the MCP Server in Cursor

**Source URL:** [https://docs.omni.co/docs/ai/mcp/cursor](https://docs.omni.co/docs/ai/mcp/cursor)  
**Extracted:** 2025-07-23 21:43:54  
**Source:** Omni Analytics Documentation

---

On this page

Cursor is an AI-powered code editor that can connect with other tools - like Omni! - with MCP. Once successfully connected, you can interact with your Omni data right in Cursor's interface.

Requirements

To follow the steps in this guide, you'll need:

To have

Cursor

installed on your computer

A Cursor version that supports MCP

In Omni:

An API key

. Refer to the

API documentation

for more information.

Access to the

Query APIs

To have the MCP Server enabled in your Omni instance

Reach out to Omni support for assistance in enabling these features.

Configuring MCP in Cursor

In Cursor, open the

Command Palette

(Mac -

⌘ + Shift + P

, Windows -

Ctrl + Shift + P

Search for

MCP

and select

View: Open MCP Settings

Click

Tools & Integrations

in the settings navigation.

Under

MCP Tools

, click

New MCP Server

Cursor will create an

mcp.json

file. Paste the following in this file:

"mcpServers"

"Omni"

"url"

"https://<YOUR-OMNI-INSTANCE>/mcp/https"

"headers"

"Authorization"

"Bearer <OMNI_API_KEY>"

"X-MCP-Model-ID"

"<OMNI_MODEL_ID>"

"X-MCP-Topic-Name"

"<OPTIONAL_TOPIC_NAME>"

You'll need to make a few changes to complete the setup. In the

mcp.json

, fill in the following:

<YOUR_OMNI_INSTANCE>

Required

. The URL of your Omni instance, for example:

https://blobsrus.omniapp.co

. This will be appended with

/mcp/https

, which tells Cursor what type of MCP Server is being used.

<OMNI_API_KEY>

Required

. Your

Omni API key

Note

: Cursor also supports providing the API key as an

environment variable

<OMNI_MODEL_ID>

Required

. The ID of the model to scope the MCP Server to. You can retrieve this by opening the model in Omni's model IDE and looking at the URL. The string between

/models/

and

/ide/

is the model ID:

https://blobsrus.omni.co/models/9d9440e5-8522-4507-b092-1ac26ba26673/ide/model?mode=combined

<OPTIONAL_TOPIC_NAME>

Optional

. If provided, the MCP Server will be scoped only to this topic. Remove this parameter to allow dynamic topic switching.

Save the file.

At this point, the Omni MCP Server should be up and running in Cursor. You can confirm this by checking the server's status in your

Settings

Using MCP in Cursor chat

Once the MCP Server is available, Cursor will automatically be able to use it in chat when it receives a relevant prompt. You can prompt Cursor to use Omni by referring to it by name or description.

To use the MCP Server, open the AI pane/chat panel and select

Agent

mode:

Enter a prompt, such as

Hey Omni, tell me how many users have been sourced by search and email

and submit it to the chat.

Each time Cursor uses an MCP tool, you'll be prompted

to approve its usage

. Click

Run tool

to proceed.

You can also use Cursor's Yolo mode to automatically run MCP tools without requiring approval. Refer to

Cursor's documentation

for more information.

The MCP Server will begin by picking a topic and then run a query to retrieve the data:

Requirements

Configuring MCP in Cursor

Using MCP in Cursor chat

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/mcp/cursor](https://docs.omni.co/docs/ai/mcp/cursor) on 2025-07-23.*
