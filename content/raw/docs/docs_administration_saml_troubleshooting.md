# Troubleshooting SAML & SCIM

**Source URL:** [https://docs.omni.co/docs/administration/saml/troubleshooting](https://docs.omni.co/docs/administration/saml/troubleshooting)  
**Extracted:** 2025-07-23 21:43:49  
**Source:** Omni Analytics Documentation

---

On this page

IdP-initiated SSO login

Omni does not support IdP-initiated SSO login for SAML, which means you can't login by clicking a link in your identity provider's dashboard, you must login by clicking the "Log in with SAML" button on the Omni login page. You will receive this error if you attempt an IdP-initiated login:

Unable to process request due to missing initial state. This may happen if browser sessionStorage is inaccessible or accidentally cleared. Some specific scenarios are - 1) Using IDP-Initiated SAML SSO. 2) Using signInWithRedirect in a storage-partitioned browser environment.

If your users are accustomed to logging in to applications directly from your identity provider, most allow you to provide a link to the Omni login page as an app tile.

IdP-initiated SSO login

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/saml/troubleshooting](https://docs.omni.co/docs/administration/saml/troubleshooting) on 2025-07-23.*
