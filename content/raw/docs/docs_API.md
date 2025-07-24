# Omni APIs

**Source URL:** [https://docs.omni.co/docs/API](https://docs.omni.co/docs/API)  
**Extracted:** 2025-07-23 21:43:31  
**Source:** Omni Analytics Documentation

---

On this page

With Omni's APIs, you can programmatically interact with your Omni instance.

Base URL

The API base URL is the same as the URL you use to login to Omni. For example, if you log in using

https://myorg.omniapp.co

, your base URL will be

https://myorg.omniapp.co/api

Only HTTPS calls are accepted.

Authentication

Authenticate your calls to the API by providing an API key in your requests. Every request made to the API must have an

Authentication

header with the API key as a

Bearer

token:

curl -L 'https://myorg.omniapp.co/api/scim/v2/users' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <YOUR_API_KEY>'

Create API key

info

Organization Admin

permissions are required to create and access the API keys. If you're an admin and find you don't have access to API keys, reach out to

Omni support

To create an API key:

Navigate to

Settings > API Keys

Click

Generate new key

In the modal that displays, enter a descriptive name for the API key.

Heads up!

API keys will inherit the

user attributes

of the user who created the key. Enter something that distinguishes you as the creator, such as your initials, into the key's

Name

field to make it easy to identify who created the key. This can be helpful when troubleshooting permission issues.

Click

Generate

Copy the key.

Note

: API keys are only displayed once when created.

API key expiration

API keys do not expire, but they may be revoked by the user at any time. In the event that your API key is lost or compromised, delete the API key in your Omni instance and create a new one.

Available endpoints

Note

: Some APIs are marked as

beta

, but they can still be used.

Loading data...

Rate limiting

The Omni API uses rate limiting to prevent instability as a result of large numbers of simultaneous requests. If you send more than 60 requests in a minute, you may encounter

429 Too Many Requests

errors.

If you hit the limit, we recommend implementing a retry mechanism that uses exponential backoff to reduce request volume when needed.

Base URL

Authentication

Create API key

API key expiration

Available endpoints

Rate limiting

---

*This content was automatically extracted from [https://docs.omni.co/docs/API](https://docs.omni.co/docs/API) on 2025-07-23.*
