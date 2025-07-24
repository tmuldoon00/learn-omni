# Webhook deliveries

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending/webhooks](https://docs.omni.co/docs/sharing-and-sending/webhooks)  
**Extracted:** 2025-07-23 21:44:49  
**Source:** Omni Analytics Documentation

---

On this page

If you want to customize your Omni deliveries, webhooks may be a good fit. While you can specify some things -  like the email sender for

email

deliveries or the channel message for

Slack

deliveries - webhooks give you the ability to create context-specific workflows.

For example, you could use a platform like

Zapier

to catch Omni webhooks and:

Perform different actions based on data values, such as those for CSV-formatted deliveries

Schedule data exports to Google Sheets

Requirements

To successfully use Omni webhook deliveries, your webhook must return an HTTP

status response upon delivery. A different status could cause delivery retries or failures.

Setup

Prior to using webhooks as a delivery destination, you'll need to create a webhook URL for Omni to send requests to. Refer to the

section for app-specific walkthroughs.

To create a webhook delivery in Omni, refer to the

Creating deliveries guide

for instructions.

Similar to

database connections

, webhooks will origniate from a set list of IP addresses per environment. Omni's IP addresses can be found on an individual connection's page, accessed by navigating to

Settings > Connections

and clicking a connection.

Note:

If you choose to limit access to your database by IP address, make sure all the IPs listed on this page are included in the allowlist.

Request formats

The type of delivery Omni sends determines the format the request body will take:

Link-only

Omni will send a

POST

request with a JSON object in the body that contains:

"url"

"<dashboard_url>"

Text-based Formats (CSV, JSON)

Omni will send a

POST

request with the content directly in the body and appropriate Content-Type headers:

CSV:

Content-Type: text/csv

JSON:

Content-Type: application/json

Note:

For dashboard deliveries with multiple queries, CSV content will be delivered as a ZIP file using the binary format below.

Binary Formats (XLSX, PDF, PNG, ZIP)

Omni will send a

POST

request using

FormData

with the file content. The request will include:

Content-Type: multipart/form-data

File data with appropriate MIME type for each format

Google Apps Script

Use Google Apps Script to catch a webhook delivery from Omni.

Zapier

Use Zapier to catch a webhook delivery from Omni.

Requirements

Setup

Request formats

Link-only

Text-based Formats (CSV, JSON)

Binary Formats (XLSX, PDF, PNG, ZIP)

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending/webhooks](https://docs.omni.co/docs/sharing-and-sending/webhooks) on 2025-07-23.*
