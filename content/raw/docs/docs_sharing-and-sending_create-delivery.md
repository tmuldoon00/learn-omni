# Creating schedules & alerts

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending/create-delivery](https://docs.omni.co/docs/sharing-and-sending/create-delivery)  
**Extracted:** 2025-07-23 21:44:46  
**Source:** Omni Analytics Documentation

---

On this page

A scheduled delivery will run at a given date/time regardless of results

Requirements

To follow the steps in this guide, you'll need:

Permissions in Omni

that allow you to create schedules and alerts.

An existing destination to send deliveries to

. Refer to the destination setup guides for more information:

Email

SFTP

Slack

Webhook

1. Create the delivery

info

Deliveries can't be scheduled while in a draft or from the workbook.

In a published dashboard:

Click

File > Deliveries & Alerts

. The delivery options will display on the left side of the page.

Fill in the following:

Delivery

- Select

Schedule

Alert

Send

- Select the content to be delivered.

Destination

- Select where the delivery should be sent:

Email

SFTP

Slack

, or

webhook

Name

- Enter a name for the delivery.

If creating an alert

, use the

Alert

tab to define the conditions that must be met to trigger the delivery. For example, you have a chart that tracks the

Total sales

for your ecommerce company. Using an alert, you can trigger a delivery when the total of your sales has changed.

2. Configure the delivery schedule

All delivery types require a schedule:

For

schedules

, this determines when Omni will deliver the specified content to a destination

For

alerts

, this tells Omni when to check if the current query results meet the conditions required to send the delivery

To define the delivery's schedule, use the UI options (

Daily

Weekly

, etc.) to select a time period. For more control over timing, click the

Custom

option to use custom cron expressions.

Note

: By default, schedules are set to send in the local timezone of the delivery creator's computer. Use the

Times are in

drop down to change the timezone.

info

Schedule send timezone may be different than query run timezone. For example if your

database timezone

UTC

with no other timezone conversion settings and you set your schedule to send at 12:00 PM PST, the query will execute at 8:00 PM UTC.

Refer to your

connection timezone settings

for more detail.

Custom cron schedules (Advanced)

A cron expression is a string that describes the individual details of a schedule:

Allowed Values    Allowed Special Characters

┌───────────── minute                  0-59              * , - /

│ ┌───────────── hour                  0-23              * , - /

│ │ ┌───────────── day of month        1-31              * , - / L W ?

│ │ │ ┌───────────── month             1-12 or JAN-DEC   * , - /

│ │ │ │ ┌───────────── day of week     1-7  or SUN-SAT   * , - / # L ?

│ │ │ │ │ ┌───────────── year          any               * , - /

│ │ │ │ │ │

* * * * * *

Using cron, you can create schedules like the following:

0 9 ? * * *          # At 9:00 AM every morning

30 6 L * ? *         # At 6:30AM on the last day of the month

45 8 ? * MON-FRI *   # At 8:45 AM every day, Monday through Friday

Omni uses Amazon Web Services' (AWS) syntax for cron expressions. Refer to the

AWS documentation

for more information. By default, the most frequent you can configure a schedule is hourly.

3. Select format & filter options

In the

Dashboard

Chart

tab, you can:

Select the format of the content

, such as PNG, PDF, XLSX, or CSV

Lightly customize the contents and layout

, such as expanding tables to include up to 1,000 rows, hiding filter values, or arranging tiles in a single column.

Set filter or control values for the delivery

. Some formats will have additional customization options. PDF formats, for example, will allow you to specify the orientation and page size for the PDF.

For dashboard deliveries

, the default filters and controls will automatically be applied upon creation. Subsequent default filter value updates will not change the filter values set for existing deliveries.

Did you know?

You can use filters to customize content for different recipients! For example, set a filter to

in a scheduled delivery to recipient A, and in another scheduled delivery to recipient B, set a filter to

4. Configure destination settings

The last step is to define where the delivery will be sent. Click the last tab, which will be labeled with the type of

Destination

you selected.

Email

To finish setting up an email delivery, fill in the following:

Recipients

- Add one or more recipients. Recipients can be other members of your Omni organization or non-users, such as a contractor or external stakeholder.

Note

: When non-users are added as recipients, Omni creates a shell account, or an

email-only user

. Refer to the

Delivery administration guide

for more information.

Personalize delivery with the recipient's user attributes

- If enabled, the delivery will be personalized using the recipients'

user attributes

. Otherwise, the delivery owner's user attributes will be used.

For example, you could use personalization to deliver a dashboard to sales managers that only displays quarterly sales data for their region.

Subject

- Enter a subject.

Body

- Enter a message that will display in the email body.

SFTP

To finish setting up an

SFTP delivery

, you'll need the following:

The

Address

of your SFTP server

The

Port

of your SFTP server

An SFTP user's

Username

and

Password

Slack

To finish setting up a Slack delivery, select the

Channel

or user

Direct message

you want to receive the delivery. You can also add a message and format it with

Slack markup

Refer to the

Slack deliveries guide

for more information.

Webhook

To finish setting up a webhook delivery, add the webhook

URL

. Refer to the

Webhook deliveries

guide for more information.

5. Test the delivery

info

This step is optional.

If you want to test the delivery before saving, click the

Test Now

button in the bottom left corner of the page. This will send the dashboard/chart to the destination using the current settings. For example, using

Test Now

would send the delivery to all

Recipients

6. Save the delivery

When finished, click

Save

to create the delivery.

Requirements

1. Create the delivery

2. Configure the delivery schedule

3. Select format & filter options

4. Configure destination settings

5. Test the delivery

6. Save the delivery

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending/create-delivery](https://docs.omni.co/docs/sharing-and-sending/create-delivery) on 2025-07-23.*
