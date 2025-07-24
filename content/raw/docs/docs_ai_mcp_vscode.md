# Using the MCP Server in Visual Studio Code

**Source URL:** [https://docs.omni.co/docs/ai/mcp/vscode](https://docs.omni.co/docs/ai/mcp/vscode)  
**Extracted:** 2025-07-23 21:43:55  
**Source:** Omni Analytics Documentation

---

On this page

Visual Studio Code (VS Code) is a code editor that, when paired with GitHub Copilot, empowers development with AI-backed features. VS Code can connect with other tools - like Omni! - using MCP. Once successfully connected, you can interact with your Omni data right in VS Code's interface.

Requirements

To follow the steps in this guide, you'll need:

For VS Code

To have the latest version of

VS Code

installed on your computer

Access to

Copilot

, which VS Code uses to run its

AI in Agent mode

For Omni:

An API key

. Refer to the

API documentation

for more information.

Access to the

Query APIs

To have the MCP Server enabled in your Omni instance

Reach out to Omni support for assistance in enabling these features.

Configuring MCP in VS Code

1. Add the MCP Server

In VS Code, open the

Command Palette

(Mac -

⌘ + Shift + P

, Windows -

Ctrl + Shift + P

Search for

MCP

and select

MCP: Add Server

Select

HTTP (HTTP or Server-Sent events)

for the MCP Server type and press Enter.

Paste your Omni instance URL and append it with

/mcp/https

. For example:

https://blobsrus.omniapp.co/mcp/https

Press Enter.

Enter a name for the MCP Server, such as

Omni MCP

. Press Enter.

Select

Workplace Settings

and press Enter.

2. Configure the MCP Server

.vscode/mcp.json

file should have been created in your project.

Open the file. At this point, it should look something like this:

"servers"

"Omni"

"url"

"https://YOUR-OMNI-INSTANCE/mcp/https"

Update your

mcp.json

file to include the

inputs

and

headers

objects:

"inputs"

"type"

"promptString"

"id"

"omni-mcp-key"

"description"

"API key for Omni Data MCP"

"password"

true

"servers"

"Omni"

"url"

"https://YOUR-OMNI-INSTANCE/mcp/https"

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

, which tells VS Code what type of MCP Server is being used.

<OMNI_API_KEY>

Required

. Your

Omni API key

<OMNI_MODEL_ID>

Required

. The ID of the model to scope the MCP Server to. You can retrieve this by opening the model in Omni's model IDE and looking at the URL. The string between

/models/

and

/ide/

is the model ID:

https://blobsrus.omniapp.co/models/9d9440e5-8522-4507-b092-1ac26ba26673/ide/model?mode=combined

<OPTIONAL_TOPIC_NAME>

Optional

. If provided, the MCP Server will be scoped only to this topic. Remove this parameter to allow dynamic topic switching.

Save the file.

3. Start the MCP Server

Before you can use the server, you'll need to start it:

Open the

Command Palette

again (Mac -

⌘ + Shift + P

, Windows -

Ctrl + Shift + P

Search for

MCP

and select

MCP: List Servers

The

Omni

server should display in the list of servers. Click the server.

A list of commands will display. Click

Start Server

You should see logs related to the Omni server begin to stream into the

Terminal

panel. Logs similar to the following example indicate that the server started successfully:

[info] Starting server Omni

[info] Connection state: Starting

[info] Starting server from LocalProcess extension host

[info] Connection state: Running

[info] Discovered 2 tools

Using MCP in VS Code Copilot

Once the MCP Server is available, VS Code will automatically be able to use it in chat when it receives a relevant prompt. You can prompt VS Code to use Omni by referring to it by name or description.

Open the chat panel (Mac -

⌃ + ⌘ + I

, Windows -

Ctrl + Alt + P

Select

Agent

mode

Enter a prompt, such as

Hey Omni, tell me how many users have been sourced by search and email

and submit it to the chat.

By default, when a tool is invoked, you need to confirm the action before VS Code will run it. Click

Continue

to proceed.

The MCP Server will pick a topic and then run a query to retrieve the data.

Requirements

Configuring MCP in VS Code

1. Add the MCP Server

2. Configure the MCP Server

3. Start the MCP Server

Using MCP in VS Code Copilot

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/mcp/vscode](https://docs.omni.co/docs/ai/mcp/vscode) on 2025-07-23.*
