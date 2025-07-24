# Setting up embed infrastructure

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/setting-up-the-infrastructure](https://docs.omni.co/docs/embed/external-embedding/setting-up-the-infrastructure)  
**Extracted:** 2025-07-23 21:44:14  
**Source:** Omni Analytics Documentation

---

On this page

Omni is where the permissions are defined and content is managed and created; however, the application where the content is embedded should dynamically map the user to the right underlying data by generating a script. Make sure your

data security

is set up correctly in Omni before you start.

There are two options for external embedding:

Standard SSO embed

: Generate and use a single URL to create an embed user and session. This is the simplest way to embed Omni for your external users.

2-step SSO embed

: First, send a

POST

request to generate the embed user and session. Then, generate and use a URL to authenticate into the session. This requires more setup, but has a

few advantages

over the standard SSO embed experience.

Generating a secret

The first step is to generate an embed secret:

Navigate to

Admin > Embed

in your Omni instance:

Click the

Reset Secret

button to generate your random secret key.

Proceed with caution

Resetting an existing secret key will invalidate the previous one, so be sure to update any scripts with the latest secret.

Optional: Customize session length

In the

Embed

settings of your Omni instance, you can also customize the length of embed sessions using the

Session Length

setting. In this field, enter the number of hours you want sessions to be and click

Change

Embed URLs & parameters

Available parameters

Refer to the

Embed parameters reference

for a complete list of available parameters.

Omni embed URLs are composed of a few parts. These parts, used to customize the resulting embed user or session, are concatenated into a string and signed with a unique secret key used only by your organization. The signature is then added to a URL with all the parts specified as

query parameters

in the URL.

When an Omni server receives the request in the URL, it will attempt to generate the same signature. If the passed in signature matches the signature generated in Omni's servers, the request is honored.

Option 1: Standard SSO embed

There are three ways to generate standard signed embed URLs in Omni:

Typescript SDK for Typescript and JavaScript server implementations (Node, Deno, Bun, etc)

API endpoint

Writing your own script to generate the signed embed URL

Step 1: Generate a signed embed URL

SDK (Recommended)

Omni has a supported Typescript SDK and some unsupported examples in other languages. Over time the supported libraries will expand:

Supported:

Typescript

Unsupported:

Ruby

API (Second best)

While the Typescript SDK is the preferred method for generating signed URLs, you may not be able to leverage it if your backend isn't running a JavaScript runtime. For other languages and environments, Omni offers a stateless API as an escape hatch:

https://<YOUR OMNI HOSTNAME>/embed/sso/generate-url

The

/embed/sso/generate-url

endpoint only accepts

POST

requests. For

POST

operations, parameters are passed as a JSON object in the request body.

This endpoint returns a signed URL for an embedded piece of content.

Additional properties accepted or required

Property

Post Body Param

Description

Required

secret

secret

Your embed secret, obtainable from the

Admin > Embed

section of omni

Requirements & comments:

The endpoint does not accept a signature param as that is what's being generated

The endpoint requires a

secret param

The

nonce

param is optional. If not included, one will be automatically generated.

JSON encoded parameter values (

userAttributes

connectionRoles

) should be URL encoded. Refer to the

Embed parameters reference

for a complete list of available parameters.

POST /embed/sso/generate-url

POST https://example.omniapp.co/embed/sso/generate-url

contentPath: '/dashboards/12345678',

externalId: '12345678',

name: 'foo',

secret: '12345678901234567890123456789012',

userAttributes: '%7B%22shop_id%22%3A%22123%22%7D',

Manually generate a signature & URL (Hard mode)

To generate the signature, the follow steps must be followed exactly:

Concatenate the properties, delimited by a newline character

in the exact order enumerated below

Note

: The properties are in alphabetical order, with the exception of the leading login URL:

login URL

content path

external id

name

nonce

Next concatenate the optional properties, again in alphabetical order. Any undefined optional properties must be omitted (no space, no extra newline, etc):

access boost

connection roles

custom theme

custom theme id

email

entity

entity folder content role

filter search param

- Must be URI encoded unless pulled from Omni dashboard URL, in which case the string is already URI encoded

groups

link access

mode

prefers dark

theme

user attributes

There must be no leading or trailing spaces and only a single newline between each part of the signature.

The following example includes optional parameters for custom theme, entity, filter search param, prefers dark, link access, theme, and user attributes:

https://example.embed-omniapp.co/embed/login

/embed/dashboards/123abc

luke@example.com

Luke Skywalker

hN38NgtnV2B3PMILhKQOpwLyJRP4qVv4

{"dashboard-background":"#00FF00","dashboard-tile-title-font-size":"1.5rem"}

Acme Corp

f--users.country=%7B"kind"%3A"EQUALS"%2C"type"%3A"string"%2C"values"%3A%5B"USA"%5D%2C"is_negative"%3Afalse%7D&f--users.state=%7B"kind"%3A"EQUALS"%2C"type"%3A"string"%2C"values"%3A%5B%5D%2C"is_negative"%3Afalse%7D&f--inventory_items.cost=%7B"kind"%3A"GREATER_THAN"%2C"type"%3A"number"%2C"values"%3A%5B"20"%5D%2C"is_negative"%3Afalse%2C"is_inclusive"%3Afalse%7D

true

__omni_link_access_open

vibes

{"planet": "tatooine"}

Refer to the

Embed parameters reference

for more information about available parameters.

Sign the string using your

secret key

with an HMAC sha256 digest algorithm, encoded as a base64url string:

Node.js example

const

hmac

crypto

createHmac

"sha256"

secret

hmac

update

data

return

hmac

digest

"base64url"

Refer to

the Base64 spec

for more information about base64url.

Step 2: Craft the URL

To generate the signed URL, take the parts from above, URL encode them as part of a URL query string, and attach the generated signature.

The typical URL form:

https://<your org name>.embed-omniapp.co/embed/login

Search params are then URL encoded and appended. The order of parameters is irrelevant when generating the login URL.

Note

: Newlines are not required. In the following examples, they are added to enhance readability.

By now, this should look like:

https://example.embed-omniapp.co/embed/login

?contentPath=%2Fembed%2Fdashboards%2F123abc

&externalId=luke%40example.com

&name=Luke%20Skywalker

&nonce=hN38NgtnV2B3PMILhKQOpwLyJRP4qVv4

&entity=Acme+Corp

&theme=vibes

&userAttributes=%7B%22planet%22%3A%22tatooine%22%7D

&filterSearchParam=f--order_items.status%3D%257B%22kind%22%253A%22EQUALS%22%252C%22type%22%253A%22string%22%252C%22topic%22%253A%22order_items%22%252C%22values%22%253A%255B%22Returned%22%255D%252C%22base_view%22%253A%22order_items%22%252C%22is_negative%22%253Afalse%257D

&linkAccess=__omni_link_access_open

&prefersDark=true

&customTheme=%7B%22dashboard-background%22%3A%22%2300FF00%22%2C%22dashboard-tile-title-font-size%22%3A%221.5rem%22%7D

&signature=rpf-YbMMTd2XzO_HRyP1E_RiYpQYqBkU-X9iUMplEz4

Test your URL with the embed URL builder

While primarily intended for

internal embedding

, you can use Omni's embed URL builder to test the format of your

URL parameters

First, you'll need your content's unique ID:

Dashboards:

You can find the dashboard ID by:

Opening the document settings

. Navigate to

File > Document settings

in the dashboard and then click

Settings

. The

Identifier

field contains the dashboard ID.

Using the dashboard's URL

. The string after

/dashboards

is the dashboard's ID; for example:

https://myorg.omniapp.co/dashboards/12db1a0a

Workbooks:

The workbook content ID is the same as the dashboard ID if the workbook is tied to a dashboard. If the workbook is only saved as a workbook, you can find the ID by navigating to

File > Document settings

, then clicking

Settings

. The

Identifier

field contains the document ID.

Note

: Embedding a workbook creates a copy of the workbook for that embed user so their changes are not reflected back into the application's production version of the workbook.

Navigate to

Admin > Embed > URL Builder tab

Fill in the required fields, noted below:

Content Path

Dashboards

/dashboards/ID_value

Workbooks

/w/ID_value

External ID

- Any alphanumeric value

Name

- Any alphanumeric value

Generate your URL and embed!

Option 2: 2-step SSO Embed

An alternative approach to the standard SSO embed experience is the 2-step SSO embed login flow. Rather performing an SSO embed login via a single login URL, the 2-step login flow divides the process into 2 steps:

Generate an SSO embed user and session via POST request, returning a session token to be redeemed at a later time.

Redeem the generated session token and redirect to the specified content via a login URL.

Advantages

While the standard SSO embed experience is more straightforward, there a few reasons you might opt to use the 2-step SSO embed login flow over standard login URLs:

Sensitive user data

: If using the

userAttributes

parameter with sensitive user data, you may prefer creating SSO embed users and sessions via

POST

request for added security.

URL length

: While generally unlikely, there is more risk of standard SSO embed URLs exceeding a browser's URL character limit. 2-step login URLs are more compact and thus have no risk of hitting the limit.

Setup

Step 1: Generate the user and session

The first step of the 2-step SSO login flow is to generate the SSO embed user and session. This is done by sending a

POST

request to the

/api/unstable/embed/sso/generate-session

endpoint. This will return a token that will be redeemed later.

Most parameters listed in the

Embed parameters reference

can be passed in the JSON body of the request. The only exceptions are

theme

and

prefersDark

, which can be set via URL parameters in the login URL, and

nonce

, which isn't necessary at this step. Like the standard SSO login flow,

contentPath

externalId

, and

name

are required.

Note:

As with all other API endpoints, an

Authorization

header with an Omni API key as a

Bearer

token is necessary for authentication purposes. Refer to the

API docs

for more information.

POST /api/unstable/embed/sso/generate-session

curl -X POST 'https

//test.embed-thundersalmon.com/api/unstable/embed/sso/generate-session' \

-H 'Authorization

Bearer <YOUR_API_KEY>' \

-H 'Content-Type

application/json' \

-d '

"contentPath"

"/my"

"externalId"

"dodgers-21"

"name"

"Walker Buehler"

"connectionRoles"

"abcd1234-abcd-efgh-ijkl-abcdef123456"

"RESTRICTED_QUERIER"

"entity"

"Dodgers"

"entityFolderContentRole"

"EDITOR"

Once a successful request is made, a few things will happen:

The endpoint will return a JSON payload with a single

sessionId

property. This

sessionId

will be used in the next step during session redemption.

An embed user will be upserted into your organization based on the request body's values.

An embed session will be created for this embed user with a

5 minute expiry

. For security purposes, if the session isn't redeemed within 5 minutes of creation, the session will no longer be usable.

Step 2: Redeem the session

With the

sessionId

returned from

Step 1

, you can now create a 2-step session redemption URL.

Like standard SSO embed login URLs, session redemption URLs should be passed into the

src

attribute of an

iframe

HTML element. In addition, 2-step SSO embed login URLs must be signed using the request host, a nonce, and other

URL parameters

. Refer to the

Session redemption signature

section for details on how to generate the signature.

Required URL parameters

Session ID (

sessionId

Nonce (

nonce

Signature (

signature

Optional URL parameters

Prefers dark (

prefersDark

Theme (

theme

Example URL

https://test.embed-thundersalmon.com/embed/sso/redeem-session

?prefersDark=false

&theme=vibes

&nonce=XxDcs01bnenbOyJTNAAUHheXRVFTVDOA

&sessionId=abcd1234-abcd-efgh-ijkl-abcdef123456

&signature=7Gk9LmN2oP3QrStUvWxYzA1BcDeFgHiJkLmNoPqRsTu

Once the URL is passed into an

iframe

and a successful session redemption request is made, the following will happen:

The associated embed session will update its expiry from 5 minutes to

24 hours

, or to the custom

Session Length

specified in the

Admin > Embed

section of your Omni organization.

The iframe will redirect to the

contentPath

specified in

Step 1

during session generation.

Using the SDK

The simplest way to implement the 2-step SSO embed login flow is using the

TypeScript SDK

. The

createSessionToken

and

redeemSessionToken

functions are included in the TypeScript SDK and correspond to

Step 1

and

Step 2

, respectively.

TypeScript SDK

// Step 1

const

success

sessionToken

await

createSessionToken

apiKey

"<YOUR API KEY>"

connectionRoles

"abcd1234-abcd-efgh-ijkl-abcdef123456"

EmbedConnectionRoles

RESTRICTED_QUERIER

contentPath

"/dashboards/abcd1234"

externalId

"dodgers-17"

host

"myorg.embed-omniapp.co"

mode

EmbedSessionMode

Application

name

"Shohei Ohtani"

success

throw

new

Error

"Failed to generate session"

// Step 2

const

redeemSessionUrl

await

redeemSessionToken

host

"myorg.embed-omniapp.co"

prefersDark

"false"

theme

"vibes"

secret

"<YOUR EMBED SECRET>"

sessionToken

...

iframe

src

redeemSessionUrl

Session redemption signature

note

If using the TypeScript SDK

redeemSessionToken

function, the signature will be automatically generated and included in the returned session redemption URL.

Like with standard SSO embed login URLs, the signature is generated using the request URL and the URL parameters. To generate the signature, the following steps must be followed exactly:

Concatenate the properties, delimited by a newline character in the exact order enumerated below.

Note

: The parameters are in alphabetical order, with the exception of the leading login URL:

Request URL

Nonce (

nonce

Session ID

Concatenate the optional properties in alphabetical order.

Any undefined optional properties must be omitted

- no space, no extra newline, etc:

Prefers dark (

prefersDark

Theme (

theme

There must be no leading or trailing spaces, and only a single newline between each part of the signature. The following example includes optional parameters for custom theme, entity, filter search param, prefers dark, link access, theme, and user attributes:

Example signature

https://example.embed-omniapp.co/embed/sso/redeem-session

XxDcs01bnenbOyJTNAAUHheXRVFTVDOA

abcd1234-abcd-efgh-ijkl-abcdef123456

true

vibes

Sign the string using your secret key (available in Admin > Embed section) with an HMAC sha256 digest algorithm, encoded as a base64url string. Refer to

this standard

for more information about base64url.

Node.js example

const

hmac

crypto

createHmac

"sha256"

secret

hmac

update

data

return

hmac

digest

"base64url"

Generating a secret

Optional: Customize session length

Embed URLs & parameters

Option 1: Standard SSO embed

Step 1: Generate a signed embed URL

Step 2: Craft the URL

Option 2: 2-step SSO Embed

Advantages

Setup

Using the SDK

Session redemption signature

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/setting-up-the-infrastructure](https://docs.omni.co/docs/embed/external-embedding/setting-up-the-infrastructure) on 2025-07-23.*
