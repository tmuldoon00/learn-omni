# Managing users with Okta SAML & SCIM

**Source URL:** [https://docs.omni.co/docs/administration/saml/okta](https://docs.omni.co/docs/administration/saml/okta)  
**Extracted:** 2025-07-23 21:43:48  
**Source:** Omni Analytics Documentation

---

On this page

Omni can be integrated with Okta for user authentication via the SAML protocol and user and group provisioning via the SCIM protocol.

SAML

Omni supports SP-initiated SAML authentication with Okta and other SAML 2.0-compatible identity providers. To setup Okta, follow these instructions:

In Okta, add Omni from the App Catalog

In Okta, go to Applications -> Applications -> Browser App Catalog

Search for "Omni Analytics", and add the integration.

In the General settings page, enter the subdomain of your Omni instance.

For example, if you log into

https://acme.omniapp.co

, enter

acme

Navigate to the "Sign On" tab, click "More details", and note the following for the next step:

Sign on URL

Issuer

Signing Certificate

Configure Omni authentication settings

From Okta, copy the Sign on URL, Issuer, and Signing Certificate

You will need to add the lines

-----BEGIN CERTIFICATE-----

and

-----END CERTIFICATE-----

to the beginning and end of the certificate.

Note: These must be on new lines between the cert.

Example:

-----BEGIN CERTIFICATE-----

xyz123........

abc456........

lmn789........

-----END CERTIFICATE-----

Check the box to enable the SAML connection

Save the SAML configuration

Assign users and groups to the Omni application in Okta

In Okta, go to the "Assignments" tab

Assign any users and groups that you would like to have access to Omni

Once these steps are complete, you will see the option to Login with SAML on your Login page.

SCIM

You can integrate Okta's provisioning capability with Omni to create accounts for your users and synchronize membership in select Okta groups with Omni groups. All users created via SCIM will be organization Members, organization Admins can only be created or converted from Member level in the UI.

The integration between Okta and Omni that enables this is built around an industry-standard protocol known as SCIM (System for Cross-domain Identity Management). To learn more about how Okta works with SCIM, please

see this article

Features

These Okta provisioning features are supported by Omni:

Push Users

: Users in Okta that are assigned to the Omni Analytics application within Okta are automatically added as users in Omni.

Update User Attributes

: When user attributes are updated in Okta, they will be updated in Omni.

Remove Users

: When users are removed in Okta, their membership to your Omni organization will be revoked.

Deactivate/Reactivate Users

: When users are deactivated in Okta, their membership to your Omni organization will be revoked, and reactivation will create a new user in Omni with a new external ID.

Push Groups

: Groups and their members in Okta can be pushed to Omni (as Omni groups and group members).

Omni does not currently support these Okta provisioning features:

Sync password

Enhanced group push

Configuration

Okta provisioning with SCIM can be configured by an Omni organization admin by following these steps:

In Omni:

Navigate to Admin > API Keys.

Generate a new API key named 'Okta Provisioning' or similar, and leave the generated key visible for the next step.

In Okta, in a new browser window:

Configure the integration:

Login to your admin portal and navigate to the Omni Analytics application.

Click on the “Provisioning” tab in the application. Under the “Settings” panel on the left side, click the “Integration” link. Then click the “Configure API Integration” button.

Check the “Enable API Integration” box. Then copy and paste the API key from Omni into the “API Token” field in Okta.

Click "Test API Credentials" and verify that the connection is working. Click "Save" to save your configuration in Okta.

Setup user provisioning, deprovisioning, and user attribute updating:

Click on the “Provisioning” tab in the application.

Under the “Settings” panel on the left side, click “To App” under the Settings panel on the left.

Click the "Edit" button at the top right. Check the “Enable” box next to “Create Users”, "Deactivate Users", and "Update User Attributes".

Important: Ensure that the “default username” used to create accounts in Okta is set to “Email”. You can update this value in the "Sign On" tab under the "Credentials Details" section.

In the "Assignments" tab, choose the Assign dropdown menu and select Assign to People.

Find a person and press Assign. Enter more details about the user if you want. When you’re done, select Save and Go Back.

The user is now provisioning in Omni, which generally completes in under 1 minute.

To enable "Push Groups" functionality:

In the "Push Groups" tab, select the + Push Groups dropdown menu, and choose Find groups by name.

In the Enter a group to push… box, enter the group name and select it.

Press Save.

The group is now provisioning in Omni, which generally completes in under 1 minute.

NOTE: Adding a group to Push Groups does not provision user accounts to all users in that group. You will need to assign all users in the Assignments tab first, which you can do by selecting Assign to Groups from the Assign dropdown menu.

User Attribute Mapping

Create the attributes you need in Omni (note the attribute type and exact reference name)

In Okta under Directory > Profile Editor select the Omni app

For each Omni attribute you created do the following:

click create new attribute

data type - needs to match the attribute type in Omni (i.e string or number)

Display name -- anything you'd like

variable name - match the reference name exactly for the attribute in Omni

external name -- will autopopulate from variable name

external namespace -- enter this exact string

urn:omni:params:1.0:UserAttribute

ie. do not replace "UserAttribute" with the name of the user attribute

Configure the remaining fields as appropriate for your Okta configuration and save

In the Profile Editor select Mappings

Create the appropriate mappings between Okta user fields and the Omni App profile attributes you created. Most likely you'll want the mapping to occur on user creation and upate

You can wait for the automatic sync cadence or go to Applications > Application > select the Omni app > Provisioning  and scroll down until you see the "Force Sync" button

SAML

SCIM

Features

Configuration

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/saml/okta](https://docs.omni.co/docs/administration/saml/okta) on 2025-07-23.*
