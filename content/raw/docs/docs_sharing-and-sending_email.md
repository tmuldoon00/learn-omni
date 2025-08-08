# Email deliveries

**Source URL:** [https://docs.omni.co/docs/sharing-and-sending/email](https://docs.omni.co/docs/sharing-and-sending/email)  
**Extracted:** 2025-07-23 21:44:48  
**Source:** Omni Analytics Documentation

---

On this page

With email deliveries, you can automatically schedule sending dashboards and individual tiles to your team.

Setup

No prior set up is required to use emails as a delivery destination. To create an email delivery, refer to the

Creating deliveries guide

for instructions.

Inline & attached images

If you select the PNG (image) format for an email delivery, how the image is included with the email will depend on the image's size:

If 2MB or less

, the image will be included inline in the email:

If larger than 2MB

, the image will be included as an attachment. Omni takes this approach to prevent failed deliveries, as some email providers limit how large inline images can be.

Whitelabeling with custom sender options

info

To have this feature enabled, reach out to Omni support.

By default, delivery emails are sent from an Omni email address. Omni's

Custom email sender

feature - also known as a vanity domain - allows you to customize delivery emails' sender information, such as the sender's name and reply-to email address. This is especially useful for instances where you need to whitelabel Omni emails, such as using Omni in an

embedded context

After Omni support enables this feature, an

Omni

Organization Admin

will need to:

Open the

Settings

page.

Click

Deliveries > Email tab

Custom email sender

Fill in the

Sender Name

and

Sender Email

fields.

When finished, you can send a test (

Send test

) or

Save changes

Recipients

Recipients can be other members of your Omni organization or non-users, such as a contractor or external stakeholder. When recipients without an Omni account are added to a delivery, Omni creates a shell account, or an

email-only user

Email-only users

tip

Need to programmatically work with email-only users?

Check out the APIs for managing

a single user

managing users in bulk

An email-only user is a recipient of a delivery that isn't associated with an Omni account. Omni builds these accounts to allow you to monitor scheduler usage and other related metadata.

Like users with Omni accounts, email-only users can also be assigned

user attributes

for dynamic content.

Organization Admins can view all email-only users by navigating to

Settings > Users > Email-only tab

Note

: This tab will only display if there is at least one email-only user receiving a delivery.

Subscribing

If you aren't currently a recipient of an email schedule, you can subscribe if you have the ability to view view the schedule. In a published dashboard, navigate to

File > Deliveries & Alerts

and then click the

Subscribe

link under the schedule:

Note

: In an embedded context, users with a defined embed

entity

will only see schedules created by users in the same embed entity. Embed users that don't have a defined

entity

property will only see their schedules.

Setup

Inline & attached images

Whitelabeling with custom sender options

Recipients

Email-only users

Subscribing

---

*This content was automatically extracted from [https://docs.omni.co/docs/sharing-and-sending/email](https://docs.omni.co/docs/sharing-and-sending/email) on 2025-07-23.*
