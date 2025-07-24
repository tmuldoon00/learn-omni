# Migrating dashboards

**Source URL:** [https://docs.omni.co/docs/finding-content/migrate-content](https://docs.omni.co/docs/finding-content/migrate-content)  
**Extracted:** 2025-07-23 21:44:20  
**Source:** Omni Analytics Documentation

---

On this page

If you need to change the connection a dashboard uses, this guide is for you. Instead of creating and building a new dashboard from scratch, you can use Omni's

Content migration APIs

to make the changes programmatically.

Requirements

To follow the steps in this guide, you'll need:

Some familiarity with APIs

. This guide uses the command line to make API requests, which requires some technical know-how.

Permissions in Omni that allow you to

Create an API key (

Settings > API keys

Access the model IDE

An Omni dashboard you want to migrate

1. Retrieve the dashboard ID

The first step is to retrieve the dashboard's unique ID. You can do this by:

Using the dashboard's URL

. The string after

/dashboards

is the dashboard's ID; for example:

https://blobsrus.omniapp.co/dashboards/1c5e3040

Opening the dashboard settings

. Navigate to

File > Document settings

. The

Identifier

field

contains the dashboard ID:

2. Export the dashboard

Next, you'll export the dashboard you want to migrate. Use the following as a template for your

GET

request:

Template for GET /api/unstable/documents/:dashboardId/export

curl -L 'https://<YOUR_OMNI_ORG>.omniapp.co/api/unstable/documents/<DASHBOARD_ID>/export' \

-H 'Authorization: Bearer <YOUR_API_TOKEN>' \

-H 'Content-Type: application/json'

For example, the following request is for the

blobsrus

organization and exports the

1c5e3040

dashboard:

GET /api/unstable/documents/:dashboardId/export

curl -L 'https://blobsrus.omniapp.co/api/unstable/documents/1c5e3040/export' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

A successful request will return a JSON object with the following structure:

"dashboard"

...

// Contains details about the dashboard; truncated for simplicity

"document"

...

"exportVersion"

"0.1"

"workbookModel"

...

Copy the response into a text editor, as you'll be editing it in the next step.

3. Retrieve the new model ID

The next step is to retrieve the ID for model that the new dashboard should be built on.

In Omni, navigate to

Settings > Model

and click the model to open it in the IDE.

Locate the string between

/models/

and

/ide

in the URL:

https://blobsrus.omniapp.co/models/d37d0698-4558-41aa-b7f7-66ff85e89e9d/ide

In this example, the model ID is

d37d0698-4558-41aa-b7f7-66ff85e89e9d

Add following

baseModelId

property to the response body from

Step 2

"baseModelId"

"<NEW_MODEL_ID>"

# Replace with new model ID

The updated JSON should have the following structure:

"baseModelId"

"d37d0698-4558-41aa-b7f7-66ff85e89e9d"

// Example model ID

"dashboard"

...

"document"

...

"exportVersion"

"0.1"

"workbookModel"

...

4. Import the new dashboard

The last step is to import the dashboard. Start by using the following template to set up the API request:

Template for POST /api/unstable/documents/import

curl -L -X POST 'https://<YOUR_OMNI_ORG>.omniapp.co/api/unstable/documents/import' \

-H 'Authorization: Bearer <YOUR_API_TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

<UPDATED_JSON_FROM_STEP_3>

Replace

<UPDATED_JSON_FROM_STEP_3>

with the modified JSON from the

previous step

. Your request should look something like this:

POST /api/unstable/documents/import

curl -L -X POST 'https://blobsrus.omniapp.co/api/unstable/documents/import' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"baseModelId": "d37d0698-4558-41aa-b7f7-66ff85e89e9d",

"dashboard": {...},

"document": {...},

"exportVersion": "0.1",

"workbookModel": {...}

A successful request will return a JSON object similar to the following:

"dashboard"

"dashboardId"

"31b55e13-abd8-4ba8-b78c-c5afb0e4ed43"

"miniUuidMap"

"nY8mm3PM"

"c_afY5V5"

"workbook"

...

// Details about the workbook; truncated for simplicity

What's next?

At this point, you should be able to access the new dashboard. Further updates may be required, such as updating the corresponding model details to align topics, custom fields, and so on.

To learn more about the content migration APIs, refer to the API references:

Export a dashboard API reference

Import a dashboard API reference

Requirements

1. Retrieve the dashboard ID

2. Export the dashboard

3. Retrieve the new model ID

4. Import the new dashboard

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/finding-content/migrate-content](https://docs.omni.co/docs/finding-content/migrate-content) on 2025-07-23.*
