# Managing users with Active Directory SAML & SCIM

**Source URL:** [https://docs.omni.co/docs/administration/saml/active-directory](https://docs.omni.co/docs/administration/saml/active-directory)  
**Extracted:** 2025-07-23 21:43:46  
**Source:** Omni Analytics Documentation

---

On this page

Omni can be integrated with Active Directory for user authentication via the SAML protocol and user and group provisioning via the SCIM protocol.

SAML

Omni supports SP-initiated SAML authentication with Microsoft Active Directory and other SAML 2.0-compatible identity providers. To setup Active Directory, follow these instructions:

In the Microsoft Entra admin panel, navigate to Applications > Enterprise Applications.

If you haven't already created an application for Omni, create one:

Click New application and then Create your own application

Name the application

Omni

, select the radio button for	"Integrate any other application you don't find in the gallery (Non-gallery)", and press

Create

Select the Omni application, then navigate to the Manage > Single sign-on configuration section.

Select the SAML sign-on method.

Edit the Basic SAML Configuration:

Set the Identifier (Entity ID) to the full hostname of your Omni instance - e.g.

myorg.omniapp.co

. Do NOT include

https://

in the Identifier.

Set the Reply URL (Assertion Consumer Service URL) to the value of the Single sign-on URL from the Omni Authentication settings page

Edit the Attributes & Claims:

Edit the Unique User Identifier (Name ID) claim:

Name identifier format: Email address

Source: Attribute

Source attribute:

user.mail

Note: if you use a different attribute for user email address, use that instead.

You should have two Additional claims (remove others that are populated by default):

Name:

first_name

, Namespace: (blank), Source: Attribute, Source attribute:

user.givenname

Name:

last_name

, Namespace: (blank), Source: Attribute, Source attribute:

user.surname

Download the

Certificate (Base64)

from Step 3 and make note of the

Login URL

and

Microsoft Entra ID Identifier

values from Step 4

Note: the Test button in Microsoft Entra will not work, even the SAML integration is properly configured.

In the Omni authentication settings form:

Copy the

Login URL

value from the step above into the SSO (Sign on) URL form input

SCIM

You can integrate Active Directory's provisioning capability with Omni to create accounts for your users and synchronize Omni groups with groups in Active Directory. All users created via SCIM will be organization Members, organization Admins can only be created or converted from Member level in the UI.

The integration between Active Directory and Omni that enables this is built around an industry-standard protocol known as SCIM (System for Cross-domain Identity Management).

To setup Active Directory provisioning with SCIM, an Omni organization admin can follow these steps:

In Omni:

Navigate to Admin > API Keys.

Generate a new API key named 'Active Directory SCIM' or similar, and leave the generated key visible for the next step.

In the Microsoft Entra admin panel, in a new browser window:

Navigate to Manage > Enterprise Applications

If you haven't already created an application for Omni, create one:

Click New application and then Create your own application

Name the application

Omni

, select the radio button for	"Integrate any other application you don't find in the gallery (Non-gallery)", and press

Create

Select the Omni application, then navigate to the Manage > Provisioning section.

Click Get Started

Complete the form:

Select the Automatic Provisioning Mode

In the Admin Credentials section enter the following values:

Tenant URL:

https://myorg.omniapp.co/api/scim/v2

where

https://myorg.omniapp.co

is the URL you use to login to Omni

Secret Token: enter the API key you generated in Omni in the first step of this guide.

Press Test Connection and confirm it succeeds

In the Mappings section:

Click on Provision Microsoft Entra ID Groups, remove all Attribute Mappings except

displayName

and

members

. Then press Save and then press your browser's back button.

Click on Provision Microsoft Entra ID Users, remove all Attribute Mappings except

userName

active

, and

displayName

. Then press Save and then press your browser's back button.

Press Save

Return to the Provisioning section for the Omni application in the Entra admin panel.

Navigate to Manage > Users and Groups

Assign the relevant Users and Groups to be provisioned in Omni.

To setup mapping between Active Directory attributes and Omni User Attributes, an Omni organization admin can follow these steps:

In Omni:

Create User Attributes by following

this guide

, noting each attribute's Reference and Type.

In the Microsoft Entra admin panel:

Navigate to Manage > Enterprise Applications

Select the Omni application, then navigate to the Manage > Provisioning section.

Navigate from the Provisioning Overview to the Manage > Provisioning section section again.

Open the Mappings section and click Provision Microsoft Entra ID Users.

At the bottom of the page, select Show advanced options, and then click Edit attribute list for customappsso

For each Omni User Attribute you created, add a new Attribute in the Entra Attribute editor as follows:

Set the Name to the Reference of the Omni User Attributed prefixed with

urn:omni:params:1.0:UserAttribute:

. For example, if the Reference of your Omni User Attribute is

department

, enter

urn:omni:params:1.0:UserAttribute:department

as the Name in the Entra User Attribute editor.

Set the Type to the Type of the Omni User Attribute (note: only

String

and

Integer

are currently supported)

Select Multi-Value? if the Omni User Attribute is configured to support Multiple Values.

Configure the remaining fields as appropriate for your Entra configuration.

Save the changes to the User Attribute List.

In the Attribute Mapping configuration, click Add New Mapping, select the Attribute you just created at the Target attribute, and configure the remaining fields to map the appropriate value to that attribute.

Press OK, and then press Save to save the changes to the Omni app in Entra.

SAML

SCIM

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/saml/active-directory](https://docs.omni.co/docs/administration/saml/active-directory) on 2025-07-23.*
