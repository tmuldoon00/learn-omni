# Security overview

**Source URL:** [https://docs.omni.co/docs/security](https://docs.omni.co/docs/security)  
**Extracted:** 2025-07-23 21:44:43  
**Source:** Omni Analytics Documentation

---

On this page

Product security

Omni is designed to ensure data is only accessible to those who are permitted to access it.

Our technical architecture keeps organizations and data sets isolated, and the foundation

of our product is a data model with robust governance capabilities that can limit the data sets,

fields, and records accessible on a per-user basis.

Some of the product and technical design principles we follow include:

Customer data is always encrypted at rest and in transit over public networks, and customer credentials are additionally encrypted at the application level and can only be decrypted by the application components that require them.

User authentication through your organization's identity provider like Google, Okta, or any SAML-compatible identity provider, allows you to control security requirements like MFA.

Users can be assigned attributes that are checked in authorization logic to, for example, limit the user's access to data sets or apply filters.

Authentication and authorization checks are applied immediately upon the receipt of every request to Omni, and, if passed, set an authorization context on subsequent code execution that ensures the request is sandboxed to the appropriate user and organization.

Access to a customer's Omni instance by Omni personnel for support is visible to and controllable by the customer.

Product architecture

Customer data

Omni processes the following data:

Information about Omni users, for example name and email. This does not include user passwords since this is delegated to a third party identity provider

Omni configuration data, for example connection parameters, the Omni data model, and chart and dashboard configuration,

excluding

credentials to customer systems

Data contained in the data sources connected to Omni, referred to as "Customer Data"

Credentials to access customer data, referred to as "Customer Credentials"

Customer Data and customer credentials are logically segregated on Omni's systems by customer tenant ID and unique dataset identifiers.

Customer Data and customer credentials are always encrypted at rest and in transit over public networks.

Ownership of Customer Data is retained by the customer.

Information security program

Omni maintains written policies and procedures designed to ensure the security of our employees, partners, and customers. Omni's CTO is responsible for the Information Security Program, which is reviewed and updated periodically. Compliance with the policies and procedures is audited at least annually through a SOC 2 Type II audit (report available upon request). Some key aspects of the program include:

People policies

Employees and contractors with access to company data and resources must sign a confidentiality agreement, agree to comply with the policies of the information security program, and pass a background check by a third party provider.

Data protection & access control

We classify customer data as our most sensitive asset, and protect it as follows:

Customer data is not permitted to be copied to destinations outside of the production infrastructure, and is not used for testing, development, or any purpose other than providing the product

Access:

Access to the production infrastructure and systems is granted on a least privilege basis, requires authentication with multiple factors, and logged. Production infrastructure is configured and deployed through automated processes, so direct human access is needed only in rare cases and is not granted to employees other than those responsible for maintaining the automated processes.

Access to customer data via the Omni application by Omni personnel for support can be controlled and revoked by the customer

Use of

third party subprocessors

on customer data is minimized and, when necessary, subject to thorough review.

Customer Data is only stored in Omni systems temporarily, and can be permanently deleted upon request.

Product security

Product architecture

Customer data

Information security program

People policies

Data protection & access control

---

*This content was automatically extracted from [https://docs.omni.co/docs/security](https://docs.omni.co/docs/security) on 2025-07-23.*
