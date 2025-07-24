# Managing users with Rippling SAML & SCIM

**Source URL:** [https://docs.omni.co/docs/administration/saml/rippling](https://docs.omni.co/docs/administration/saml/rippling)  
**Extracted:** 2025-07-23 21:43:48  
**Source:** Omni Analytics Documentation

---

On this page

Omni can be integrated with Rippling for user authentication via the SAML protocol and user and group provisioning via the SCIM protocol.

SAML

Omni supports SP-initiated SAML authentication with Rippling and other SAML 2.0-compatible identity providers. To setup Rippling, follow these instructions:

In Rippling, add a new Custom App

Search for and select 'Custom App' in the search bar

Press Create new Custom app

Complete the form - Name: Omni, Categories: Analytics & BI, and upload

this logo

Select 'Single Sign-on (SAML)' or 'SAML and SCIM app' if you intend to also configure SCIM (see guide below).

Complete the Single Sign-on Setup form:

Leave Metadata URL and Metadata fields empty

Set the ACS URL (Assertion Consumer Service URL) to the value of the Single sign-on URL from the Omni Authentication settings page

Set the Service Provider Entity ID to the full hostname of your Omni instance - e.g.

myorg.omniapp.co

. Do NOT include

https://

in the Service Provider Entity ID.

Leave this form up in a separate browser tab and note the following for the next step:

Single Sign-on URL

Issuer

X509 Certificate

Configure Omni authentication settings

Copy the Single Sign-on URL, Issuer, and X509 Certificate from the step above

Check the box to enable the SAML connection

Save the SAML configuration

Return to Rippling and complete the Single Sign-on Setup Form:

At the setup form, press continue.

Select 'Do not allow admins to sign in to the admin account'

Do not create any Group Attributes

Complete all other steps in the setup wizard, and then press 'Visit the app'

From the app's Settings tab, select the 'SAML Attributes' section.

Create two new Global attributes:

Name:

first_name

Value: User's Preferred First Name

Name:

last_name

Value: User's Preferred Last Name

Assign users and groups to the new application

Once these steps are complete, you will see the option to Login with SAML on your Login page.

SCIM

You can integrate Rippling's provisioning capability with Omni to create accounts for your users and synchronize Omni groups with attributes in Rippling. All users created via SCIM will be organization Members, organization Admins can only be created or converted from Member level in the UI.

The integration between Rippling and Omni that enables this is built around an industry-standard protocol known as SCIM (System for Cross-domain Identity Management).

Rippling provisioning with SCIM can be configured by an Omni organization admin by following these steps:

In Omni:

Navigate to Admin > API Keys.

Generate a new API key named 'Rippling SCIM' or similar, and leave the generated key visible for the next step.

In Rippling, in a new browser window:

Search for and select 'Custom App' in the search bar

Press Create new Custom app

Complete the form - Name: Omni, Categories: Analytics & BI, and upload

this logo

Select 'User Management via SCIM' or 'SAML and SCIM app' if you intend to also configure SAML (see guide above).

Press continue

Complete the SCIM configuration form:

SCIM version: 2.0

Leave 'Does not support One Way Sync' disabled

SCIM base url:

https://myorg.omniapp.co/api/scim/v2

where

https://myorg.omniapp.co

is the URL you use to login to Omni

SCIM authorization method: Bearer Token

Enable 'Supports groups'

Set 'Supports Mutually Exclusive Groups' to 'Not Mutually Exclusive Groups'

Enable 'Supports pagination'

Enable 'Create & Delete Groups'

Leave disabled 'Use PATCH to edit Groups'

Leave disabled 'Generate temporary password'

Select 'Use email address as username'

Supported SCIM attributes:

displayName

Press continue

Install the custom SCIM application:

If prompted, select 'I'm the Omni admin, I'll install it'

Keep offboarding enabled

Paste the API key generated in Omni into the Bearer Token input form

Due to a bug in Rippling, if you are not prompted to provide your Bearer token during the initial install, you may need to re-install the custom app by following the 'Modify App' link from the custom app's settings tab.

Complete the final steps to configure provisioning rules and match existing accounts and groups. Note that syncing additional attributes other than

displayName

from Rippling to Omni is not currently supported.

SAML

SCIM

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/saml/rippling](https://docs.omni.co/docs/administration/saml/rippling) on 2025-07-23.*
