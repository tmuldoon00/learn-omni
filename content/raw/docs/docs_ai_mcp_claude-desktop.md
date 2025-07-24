# Using the MCP Server in Claude Desktop

**Source URL:** [https://docs.omni.co/docs/ai/mcp/claude-desktop](https://docs.omni.co/docs/ai/mcp/claude-desktop)  
**Extracted:** 2025-07-23 21:43:54  
**Source:** Omni Analytics Documentation

---

On this page

Claude Desktop is the app version of Anthropic's AI assistant, Claude. Once successfully connected to Omni, you can interact with your Omni data right in the Claude Desktop interface.

Requirements

To follow the steps in this guide, you'll need:

The following installed on your computer

The latest version of

Claude Desktop

npm and Node.js.

Omni uses the

omni-co/mcp

package

to automate MCP Server setup for clients like Claude Desktop. To see if these are already installed, run the following from the command line:

node -v

npm -v

Refer to the

npm docs

if you need help getting started with npm.

In Omni:

An API key

. Refer to the

API documentation

for more information.

Access to the

Query APIs

To have the MCP Server enabled in your Omni instance

Reach out to Omni support for assistance in enabling these features.

Configuring MCP in Claude Desktop

In Claude Desktop, navigate to

Settings > Developer

Click

Edit Config

. If you haven't previously added an MCP Server to Claude Desktop, clicking this button will create a

claude_desktop_config.json

file.

Open this file and add the following to the

mcpServers

key:

"mcpServers"

"Omni MCP"

"command"

"npx"

"args"

"@omni-co/mcp"

"env"

"DEBUG"

"true"

"MCP_SERVER_URL"

"https://<YOUR_OMNI_INSTANCE>/mcp/https"

"MCP_API_KEY"

"<OMNI_API_KEY>"

"MCP_MODEL_ID"

"<OMNI_MODEL_ID>"

"MCP_TOPIC_NAME"

"<OPTIONAL_TOPIC_NAME>"

You'll need to make a few changes to complete the setup. In the

mcp.json

, fill in the following:

<YOUR_OMNI_INSTANCE>

Required

. The URL of your Omni instance, for example:

https://blobsrus.omniapp.co

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

https://blobsrus.omni.co/models/9d9440e5-8522-4507-b092-1ac26ba26673/ide/model?mode=combined

<OPTIONAL_TOPIC_NAME>

Optional

. If provided, the MCP Server will be scoped only to this topic. Remove this parameter to allow dynamic topic switching.

Save the file.

Restart Claude Desktop.

Once Claude Desktop has restarted, confirm that the MCP Server is running by navigating back to

Settings > Developers

Click the

Omni MCP

server to open its details. You should see a

running

badge next to the server name:

Using MCP in Claude Desktop chat

Once the MCP Server is available, Claude Desktop will automatically be able to use it in chat when it receives a relevant prompt. You can prompt Claude to use Omni by referring to it by name or description.

Enter a prompt in the chat panel, such as

Hey Omni, tell me how many users have been sourced by referrals

, and submit it to the chat.

Each time Claude uses an MCP tool, you'll be prompted to approve its usage. Click

Allow once

Allow always

to proceed:

The MCP Server will begin by picking a topic and then run a query to retrieve the data:

Requirements

Configuring MCP in Claude Desktop

Using MCP in Claude Desktop chat

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/mcp/claude-desktop](https://docs.omni.co/docs/ai/mcp/claude-desktop) on 2025-07-23.*
