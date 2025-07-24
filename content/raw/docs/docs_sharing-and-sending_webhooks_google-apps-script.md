# Sending Omni webhook deliveries to Google Apps Script

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending/webhooks/google-apps-script](https://docs.omni.co/docs/sharing-and-sending/webhooks/google-apps-script)  
**Extracted:** 2025-07-23 21:44:49  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to use Google Apps Script  to catch a webhook from Omni and export data to Google Sheets. Each time the script runs, it will create a new tab in the destination sheet and use the current timestamp as part of the tab's title.

Permissions Overview

The destination Google Sheet is private.

The Apps Script is deployed as a webhook url which has permissions

execute as=me

and

who has access=anyone

. Some Google Workspaces may not allow permission for

who has access=anyone

, which can result in seeing a

401: Unauthorized Access

error.

The Apps Script runs as the script creator (to take action and edit the destination sheet) but can be executed by anyone with the url. This configuration is how Omni can execute the script without authenticating itself to your Google account.

warning

The webhook url should only be used for Omni webhook deliveries to the destination sheet, If the url is used outside of this Omni integration, data could be written to the destination sheet by other sources.

Anyone with access to the dashboard will be able to see the URL and therefore potentially use it to write data to the sheet.

This may not be a good fit for sensitive or critical data sets or analyses.

Requirements​

Note:

While entire dashboards can be delivered using webhooks, this example requires data in a CSV format, which isn't currently supported for entire dashboards.

To follow along, you'll need:

An Omni dashboard with a tile configured for export.

A Google account and an existing Google Sheet.

1. Copy the Google Apps Script template

Navigate to

https://script.google.com/home/projects/create

and press Select New Project. This will open a blank Google Apps Script project with a new Script file.

Rename the Script File and Project.

Paste the Apps Script template into the file and save.

Script Template:

const SPREADSHEET_TITLE_PREFIX = 'Omni-Export'; // Edit this Variable to Rename Sheet Title Prefix

const SPREADSHEET_ID = 'YOUR_ID_HERE'; // Edit this Variable to Link to Your Sheet

function doPost(e) {

try {

// Parse and validate the incoming data

const csvData = e.postData.contents;

if (!csvData) {

throw new Error('No CSV data received');

// Process the data

copyCSVToSheet(csvData);

// Return 200 success response

return ContentService.createTextOutput(

JSON.stringify({

status: 200,

message: "Webhook received and data processed"

).setMimeType(ContentService.MimeType.JSON);

} catch (error) {

// Return error response

return ContentService.createTextOutput(JSON.stringify({

status: 'error',

message: error.message

}))

.setMimeType(ContentService.MimeType.JSON)

.setResponseCode(400);

function getTimestampFilename() {

const now = new Date();

return now.toISOString().replace(/:/g, '-');

function copyCSVToSheet(csvData) {

const timestamp = new Date().toISOString().replace(/:/g, '-');

const tabName = `${SPREADSHEET_TITLE_PREFIX} ${timestamp}`;

const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

const newSheet = ss.insertSheet(tabName);

const csvContent = Utilities.parseCsv(csvData);

newSheet.getRange(1, 1, csvContent.length, csvContent[0].length)

.setValues(csvContent);

console.log(`CSV data copied to "${tabName}"`);

2. Create the destination Google Sheet

Open a new Google Sheet, this will be your destination sheet.

Note the Sheet ID located in the URL between

d/SHEET_ID/edit

Tip: Native Google Sheet IDs are typically 44-characters long. Files that are not native Google Sheets may have a different ID length and may be incompatible with this integration.

3. Configure the Apps Script

In the Apps Script template there are two variables:

SPREADSHEET_TITLE_PREFIX

is used to prefix the new tab that is created when the .csv is imported into the sheet. You can modify this as needed.

SPREADSHEET_ID

is the spreadsheet ID of the destination sheet

Copy the spreadsheet ID from the destination sheet into the SPREADSHEET_ID variable in the Apps Script template, then save the Apps Script.

4. Deploy the Google Apps Script

Note:

Once deployed, any changes made to the script will require a new deployment which will generate a new Web App URL (webhook url) that will need to be updated in the Omni delivery.

Select

Deploy

, then

New deployment

to open the deployment dialog.

Press the gear icon and select

Web app

to set the deployment type.

In the configuration menu, select

Execute as = Me

, and

Who has access = Anyone

Press

Deploy

, then follow the prompt to authorize access.

On a successful deployment, you will see ‘Deployment successfully updated’ and a ‘Web app URL’.

Copy the Web app URL

then navigate to your Omni dashboard.

5. Finalize the workflow

In Omni:

Open your Omni dashboard and create a new delivery.

In the delivery

Send

menu, select the query you want to send to your Google Sheet.

Set

Destination

to 'Webhook', then open the

Webhook

tab below.

Paste the

Web App URL

into the ‘URL’.

Open the

Chart

tab and set the

Format

to ‘CSV’.

Test the delivery by pressing

Test Now

on the schedule, and check your destination sheet to confirm the integration is working. (this may take a moment to appear in your destination sheet).

Finalize by setting the delivery schedule, then

Save

Troubleshooting

Verify no changes were made to the script after deploying.

Verify the ‘Web App URL’ is correctly copied from Google Apps Script to Omni.

Permissions Overview

Requirements​

1. Copy the Google Apps Script template

Script Template:

2. Create the destination Google Sheet

3. Configure the Apps Script

4. Deploy the Google Apps Script

5. Finalize the workflow

Troubleshooting

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending/webhooks/google-apps-script](https://docs.omni.co/docs/sharing-and-sending/webhooks/google-apps-script) on 2025-07-23.*
