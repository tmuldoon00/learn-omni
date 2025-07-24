# Setting up the git integration

**Source URL:** [https://docs.omni.co/docs/integrations/git/setup](https://docs.omni.co/docs/integrations/git/setup)  
**Extracted:** 2025-07-23 21:44:24  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to set up Omni's git integration by connecting a git repository to an Omni model.

Requirements

To follow the steps in this guide, you'll need:

Omni Connection Admin permissions

for the model you want to connect to git

An existing git repository

in GitHub, Git Lab, or Azure DevOps

Permissions in your git provider that allow you to:

Add webhooks to repositories

Add deploy/SSH keys to repositories

Refer to the documentation for your git provider for information about their user permissions.

Step 1: Retrieve the repository's SSH URL

GitHub & GitLab

In your browser, navigate to the GitHub or GitLab

git

repository you want to connect to Omni.

Click the

Code

button.

In the modal that displays, locate the

SSH

option.

Keep this page open - you'll need it in the next step.

Azure DevOps

In your browser, navigate to the Azure DevOps

git

repository you want to connect to Omni.

Click the

Clone

button near the top right corner of the page.

Click the

SSH

option to display the repository's SSH URL.

Keep this page open - you'll need it in the next step.

Step 2: Connect the repository to Omni

In Omni, click

Develop

Click the model you want to connect to git.

In the model IDE, click

Model > Git settings

You'll be prompted to enter connection details for the repository:

SSH URL

- Copy and paste the repository's

SSH URL

from

Step 1

Base Branch

- Enter the name of default branch for the repository. Omni will default to

main

unless a different name is specified.

Click

Configure Git

The page will update to display additional git settings, along with information for deploy keys and webhooks. Keep this page handy and proceed to

Step 3

Step 3: Add a repository deploy key

GitHub

In the GitHub repository, click the

Settings

tab.

Click

Deploy keys

, located in the

Security

section of the left navigation.

Click

Add deploy key

Fill in the fields as follows:

Title

- Enter a descriptive title to help you identify what the key is used for. For example,

Omni Snowflake Model

Key

- Copy the

Public key

from the Omni

Git

settings

page

and paste it into this field.

Allow write access

Check this box, which will allow Omni to push changes made in Omni to the repository

Click

Add key

GitLab

Create a

project deploy key

for the GitLab repository by following

GitLab's documentation

Fill in the deploy key fields as follows:

Title

- Enter a descriptive title to help you identify what the key is used for. For example,

Omni Snowflake Model

Key

- Copy the

Public key

from the Omni

Git

settings

page

and paste it into this field.

Grant write permissions to this key

Check this box, which will allow Omni to push changes made in Omni to the repository

Click

Add key

Azure DevOps

Browse to the Azure DevOps web portal (ex:

https://dev.azure.com/<your-org-name>/

Click the

User settings

icon next to your avatar in the top right corner of the page.

Click

SSH public keys

On the page that displays, click

+ New Key

In the

Add New SSH Key

panel that displays, fill in the following:

Name

- Enter a descriptive name, such as

Omni Snowflake Model

Public Key Data

- Copy and paste the

Public key

from the Omni

Git

settings

page

Click

Add

Step 4: Add repository webhooks

GitHub

The repository settings page should still be open in GitHub. If not, re-open it.

Click

Webhooks

, located in the

Code and automation

section of the left navigation.

Click

Add webhook

Fill in the fields as follows:

Payload URL

- From the Omni

Git settings

page, copy the

Payload URL

and paste it into this field.

Content type

- Select the

application/json

option.

Secret

- From the Omni

Git settings

page, copy the

Webhook secret

and paste it into this field.

In the

Which events would you like to trigger this webhook?

section:

Click

Let me select individual events

Select the

Pull request

event.

If the

Push

event is selected, deselect it.

When finished, click

Add webhook

GitLab

The repository settings page should still be open in GitLab. If not, re-open it.

Click

Webhooks

Click

Add new webhook

Fill in the fields as follows:

URL

- From the Omni

Git settings

page, copy the

Payload URL

and paste it into this field.

Secret token

- From the Omni

Git settings

page, copy the

Webhook secret

and paste it into this field.

In the

Custom headers

section:

Click

Add custom header

In the

Header name

field, enter

Content_type

In the

Header value

field, enter

application/json

In the

Trigger

section, select

Merge request events

When finished, click

Add webhook

Azure DevOps

Next, you'll create

three

webhook subscriptions for the Azure DevOps repository, one for each of the following event types:

Pull request created

Pull request updated

Repository status updated

Step 1: Create the webhook subscription

Navigate to the Azure DevOps project that contains the repository you want to connect to Omni.

Click

Project settings

Click

Service hooks

, located in the

General

section of the left navigation.

On the

Service Hooks

page, click the

+ icon

Create subscription

On the

Service

screen, click

Web Hooks

and then

Step 2: Configure the Trigger

On the

Trigger

screen, select one of the following for the

Trigger on this type of event

field.

Pull request created

Pull request updated

Repository status updated

Select the

Repository

you want to connect to Omni.

If the

Target branch

field displays, select the

main

branch.

When finished, click

Step 3: Configure the Action

On the

Action

screen, fill in the fields as follows:

URL

- Copy and paste the

Webhook URL

from the Omni

Git settings

page

Basic auth username

omni

Basic auth password

- Copy and paste the

Webhook secret

from the Omni

Git settings

page

HTTP headers

- The value of this field depends on the type of event being configured:

Pull request created

x-azuredevops-omni-event:created

Pull request updated

x-azuredevops-omni-event:update-push

Repository status updated

x-azuredevops-omni-event:update-status

When finished, click

Finish

to create the webhook.

Part 4: Repeat steps 1-3

Repeat these steps for each of the three webhook subscription types.

Step 5: Test the connection

To verify the set up, navigate back to the

Git settings

page in Omni. Click the

Test git connection

button near the top of the page to test the connection.

What's next?

After the setup is complete, you can configure the integration's behavior by changing its settings. Refer to the

git integration settings reference

for more information.

Requirements

Step 1: Retrieve the repository's SSH URL

Step 2: Connect the repository to Omni

Step 3: Add a repository deploy key

Step 4: Add repository webhooks

Step 5: Test the connection

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/git/setup](https://docs.omni.co/docs/integrations/git/setup) on 2025-07-23.*
