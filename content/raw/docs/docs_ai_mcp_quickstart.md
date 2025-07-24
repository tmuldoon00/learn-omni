# MCP Server quickstart

**Source URL:** [https://docs.omni.co/docs/ai/mcp/quickstart](https://docs.omni.co/docs/ai/mcp/quickstart)  
**Extracted:** 2025-07-23 21:43:55  
**Source:** Omni Analytics Documentation

---

On this page

Use this guide to get up and running with Omni's MCP Server.

Requirements

To follow the steps in this guide, you'll need:

Omni API key

Access to the

Query APIs

To have the MCP Server enabled in your Omni instance

Reach out to Omni support for assistance in enabling these features.

1. Create an Omni API key

If you don't already have an Omni API key, follow

these steps

to create one before continuing.

2. Select an Omni model & topic

The MCP Server requires an Omni model ID to be able to successfully run queries. You can retrieve this by opening the model in Omni's model IDE and looking at the URL. The string between

/models/

and

/ide/

is the model ID:

https://blobsrus.omniapp.co/models/9d9440e5-8522-4507-b092-1ac26ba26673/ide/model?mode=combined

You also have the option of providing a specific topic to the MCP Server. If provided, the MCP Server will be scoped only to that topic. Otherwise, the AI will automatically select the most relevant topic for a given prompt.

3. Configure the AI client

Now that you have an API key, a model, and a topic, you'll need to configure the MCP Server in your AI client. Each client has its own setup process and requirements - refer to the guide for your client for specifics:

Cursor

Visual Studio Code

4. Test the setup

After you've finished connecting the server, run a test query to verify that everything is working correctly. The MCP Server should pick a topic, generate an Omni query, and then finally run the query. For example, this is a query executed in

Cursor

Requirements

1. Create an Omni API key

2. Select an Omni model & topic

3. Configure the AI client

4. Test the setup

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/mcp/quickstart](https://docs.omni.co/docs/ai/mcp/quickstart) on 2025-07-23.*
