# Managing users with Google Workspace SAML

**Source URL:** [https://docs.omni.co/docs/administration/saml/google-workspace](https://docs.omni.co/docs/administration/saml/google-workspace)  
**Extracted:** 2025-07-23 21:43:47  
**Source:** Omni Analytics Documentation

---

Omni can be integrated with Google Workspace for user authentication via the SAML protocol. Google Workspace cannot currently be used to provision users and groups using Omni's SCIM APIs.

To setup SAML with Google Workspace, follow these steps:

In your Google Workspace Admin console, create a new app for Omni

In the navigation bar, select Apps > Web and mobile apps

Click the "Add app" dropdown from above the table, and select "Add custom SAML app"

Name the app "Omni Analytics" or your preferred name, optionally add a description and logo, and press Continue

Note the SSO URL, Entity ID, and Certificate to enter into Omni in a later step

Set the ACS URL to the value of the Single sign-on URL from the Omni Authentication settings page

Set the Entity ID to the full hostname of your Omni instance - e.g.

myorg.omniapp.co

. Do NOT include

https://

in the Entity ID.

Leave Start URL blank and Signed response unchecked

Set the Name ID Format to EMAIL and Name ID to "Basic Information > Primary email"

press Continue

In the attributes section, add mappings from "First name" to "first_name" and "Last name" to "last_name"

Press finish

Configure Omni authentication settings

Enter the Sign on URL, Issuer, and Signing Certificate you noted from Google Workspace above

Check the box to enable the SAML connection

Save the SAML configuration

Assign users and groups to the Omni application in Google Workspace

In the User Access section of the app configuration, ensure that the appropriate users have access to the app

Once these steps are complete, you will see the option to Login with SAML on your Login page.

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/saml/google-workspace](https://docs.omni.co/docs/administration/saml/google-workspace) on 2025-07-23.*
