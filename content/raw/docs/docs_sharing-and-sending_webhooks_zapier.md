# Sending Omni webhook deliveries to Zapier

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending/webhooks/zapier](https://docs.omni.co/docs/sharing-and-sending/webhooks/zapier)  
**Extracted:** 2025-07-23 21:44:50  
**Source:** Omni Analytics Documentation

---

On this page

When paired with Omni webhook deliveries, Zapier enables you to send information from Omni to a variety of other apps and services. In this guide, you'll learn how to use Zapier to catch a webhook from Omni and export data to Google Sheets.

Requirements

To follow along, you'll need:

An Omni dashboard with a tile configured for export.

Note

: While entire dashboards can be delivered using webhooks, this example requires data in a CSV format, which isn't currently supported for entire dashboards.

A Zapier account.

Note

: Some Zapier features, such as webhooks, may require a Pro plan.

An existing Google Sheet

1. Copy the Zapier template

To get started, copy a Zapier template to your account:

Option 1:

Overwrite the existing tab in a Google Sheet

. Each time the Zap runs, Zapier will overwrite the data in the selected tab with new data.

Option 2:

Create a new timestamped tab

. Each time the Zap runs, Zapier will create a new tab in the worksheet and use the current timestamp as part of the tab's title.

2. Create the Zapier webhook

In Zapier, click the trigger step in the workflow, which should be labeled as

Catch Raw Hook

Click

Continue

Click

Test Trigger

Copy the webhook URL that displays after the test.

3. Create and test the Omni delivery

In Omni:

Follow the steps to

create a delivery

Set the

Destination

Webhook

Set the

Format

CSV

Click the

Webhook

tab.

Paste the Zapier webhook URL into the

Webhook URL

field.

Click the

Test Now

button, which will send a test webhook request to Zapier.

In Zapier:

In the trigger step, click

Test Trigger

If the delivery was successful, a

request A

will display. Click the request to open the request data.

Locate the

Raw Body

key, which will contain the CSV data. Verify that the data is correct before continuing.

4. Parse the CSV

In Zapier, click the second step in the workflow, which should be labeled

Line items from CSV

Fill in the fields as follows:

CSV file

- Set to the

Raw body

field from the workflow's trigger step

Has header row

- Set to

True

Delimiter

- Set to

Comma

Click

Continue

Click

Test step

and verify that the parsed data is correct before continuing.

5. Configure Google Sheet settings in Zapier

Click the option you selected in

Step 1

to view instructions:

Option 1: Overwrite existing tab

In Zapier, click the third step in the workflow, which should be labeled

Create worksheet

Use the

Account

field to select the correct Google account.

Click

Continue

Next, select the

Drive

and

Spreadsheet

Set the sheet's

Title

Use the

Headers

field to add an entry for each column in the Omni data.

Set

Overwrite existing worksheets

True

When finished, click

Continue

Test the step and verify that the data looks correct in the Google Sheet.

Option 2: Create new timestamped tabs

In Zapier, click the third step in the workflow, which should be labeled

Create worksheet

Use the

Account

field to select the correct Google account.

Click

Continue

Next, select the

Drive

and

Spreadsheet

In the

Title

field, enter a title for the sheet and append

--{{zap_meta_human_now}}

. For example:

Traffic Data--{{zap_meta_human_now}}

Use the

Headers

field to add an entry for each column in the Omni data.

Set

Overwrite existing worksheets

False

When finished, click

Continue

Test the step and verify that the data looks correct in the Google Sheet.

6. Populate the data

Click the option you selected in

Step 1

to view instructions:

Option 1: Overwrite existing tab

In Zapier, click the last step in the workflow, which should be labeled

Create Multiple Spreadsheet Rows

In the

Drive

and

Spreadsheet

fields, select the same drive and spreadsheet you used in the previous step.

In the

Worksheet

field, select the worksheet you created in the previous step.

In the

Rows

section, map the parsed CSV values to the correct spreadsheet columns.

Click

Continue

Test the step and verify that the data looks correct in the Google Sheet.

Note

: Zapier tests send up to 10 rows of data.

Option 2: Create new timestamped tabs

In Zapier, click the last step in the workflow, which should be labeled

Create Multiple Spreadsheet Rows

In the

Drive

and

Spreadsheet

fields, select the same drive and spreadsheet you used in the previous step.

For the

Worksheet

Use the

options menu

to select

Custom

For the value, select the

generated from the

Create Worksheet

step. This ensures that the data from the

previous step

is inserted into the new tab.

If the custom worksheet was set correctly, a

Rows

section will display. Map the fields in this section to their corresponding values from the

Line items from CSV

step

Click

Continue

Test the step and verify that the data looks correct in the Google Sheet.

Note

: Zapier tests send up to 10 rows of data.

7. Finalize the workflow

In Zapier, click the

Publish

button and follow the prompts. The workflow should now be active.

In Omni:

Navigate to the delivery you created in

Step 3

Click the

options menu

(three dots) and then

Send Now

After a few seconds, check the Google Sheet for updated data.

Troubleshooting

For table exports from Omni, consider disabling totals for the export.

Ensure column names and order match between Omni, Zapier, and Google Sheets configurations.

Verify webhook URL is correctly copied from Zapier to Omni.

Requirements

1. Copy the Zapier template

2. Create the Zapier webhook

3. Create and test the Omni delivery

4. Parse the CSV

5. Configure Google Sheet settings in Zapier

6. Populate the data

7. Finalize the workflow

Troubleshooting

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending/webhooks/zapier](https://docs.omni.co/docs/sharing-and-sending/webhooks/zapier) on 2025-07-23.*
