# Scheduling & Alerts

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending](https://docs.omni.co/docs/sharing-and-sending)  
**Extracted:** 2025-07-23 21:44:45  
**Source:** Omni Analytics Documentation

---

On this page

Automating the delivery of dashboards and tiles makes it easy for your team to stay informed and make data-driven decisions. Omni offers two ways to automate sharing content, which can be delivered to

destinations

like Slack or webhooks:

Schedules

, which deliver content at specified frequencies

Alerts

, which deliver content only if specific conditions are met

Embedded Omni instances

also support this functionality

Need some inspiration?

Check out our

Alerts for operational workflows

blog post to see how some Omni customers use alerts!

Destinations

Multiple destinations

A delivery can only have one destination.

To deliver to multiple destinations, you'll need to create a delivery for each destination. For example, to deliver a dashboard to email and Slack, you'll need to create two deliveries.

destination

is the channel or service Omni will send deliveries to. Omni currently supports the following delivery destinations:

Destination

How it works

Email

Sends an email to one or more recipients. Recipients can be other users in your Omni organization or non-users, such as an external stakeholder. Supports customizing sender options, such as email domain.

Learn more

SFTP

Delivers content to an existing SFTP server.

Learn more

Slack

Delivers content to individual Slack users, public channels, and private channels. Set up in Slack is required prior to use in Omni.

Learn more

Webhook

Sends a request to a webhook URL, such as a Zapier webhook. Recipients are determined by the webhook's configuration.

Learn more

Delivery permissions

The ability to create deliveries can be controlled through instance and document-level settings:

Instance

- In

Settings > General > Content permissions

, Organization Admins can

select the default abilities for documents

Document

- In a document, navigate to

File > Document Settings

select the abilities other users can have when accessing the document

Getting started

Ready to get started? Refer to the

Creating deliveries guide

to learn how.

Destinations

Delivery permissions

Getting started

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending](https://docs.omni.co/docs/sharing-and-sending) on 2025-07-23.*
