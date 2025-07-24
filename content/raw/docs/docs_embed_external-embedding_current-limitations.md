# Embedding limitations

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/current-limitations](https://docs.omni.co/docs/embed/external-embedding/current-limitations)  
**Extracted:** 2025-07-23 21:44:11  
**Source:** Omni Analytics Documentation

---

On this page

Session length

Currently, using a valid embed URL will create an embed session that lasts 24 hours. That embed session will be unusable after 24 hours. Visiting a new, valid embed SSO URL at any time will create a new session.

Chrome incognito

Using Chrome in Incognito mode requires allowing third-party cookies. These can be found under

Chrome > Settings... > Privacy and Security > Third-party cookies

. Enable the

Allow third-party cookies

option.

Copying values

Iframes, by default, restrict access to the "clipboard" of the viewing device. When you click on a data value within Omni and select

Copy value

, the value will

not

be copied to your clipboard.

To allow copying data values from an embedded Omni iframe, you will need to add

allow="clipboard-write"

to your iframe declaration. For example:

iframe

src

{omni-embed-url}

allow

clipboard-write

If you want stricter permissions, you can modify the

allow

clause to include the specific domain you want to permit

"clipboard-write"

access for. For example:

iframe

src

{omni-embed-url}

allow

clipboard-write self https://acme.embed-omniapp.co/

Safari, mobile Safari, & mobile iOS Chrome support

Omni currently uses cookies to manage its authentication sessions. When embedded in iframes, browsers like Safari view these as third-party cookies. By default, Safari takes a privacy-minded stance on these cookies and blocks them, effectively blocking access to Omni content.

There are a few options to allowing authorization in Safari, each with their own pros and cons:

Option

How it works

Pros

Cons

Safari default behavior

Uses a multi-step handshake to allow third-party cookies

No set up or end-user changes required

Retains Safari's default cookie behavior and anti-tracking philosophy

Extra steps to authorize cookies and log in

Vanity domain

Allows cookies from Omni to originate from the embedding domain

Eliminates the multi-step Safari authorization flow

Retains Safari's default privacy setup

Infrastructure setup required

Default Safari behavior

Safari provides a complicated meet-and-greet handshake to enable third-party cookies in supported contexts, which requires explicit action by the end-user. The steps are:

Attempt to load the Omni dashboard. If a

Cookies are not permitted

message displays, a button that will send the user to the Omni instance being embedded will display.

Once the embedded Omni instance has been visited in a non-embedded context, send the user back to the embedded context.

Present the form again which will now prompt the user to allow access to "use cookies and website data". Clicking

Allow

will redirect the user and display the embedded dashboard.

This process should only be required the first time a user accesses embedded content in Safari. However, occasionally Safari may ask the user to authorize access again.

Vanity domains

Vanity domains eliminate Safari's multi-step auth flow only if Omni is embedded in the same parent domain as the vanity domain. For example,

omni.myapp.co

is embedded in

myapp.co

Refer to the

Customization & Interactivity guide

for more information about setting up a vanity domain.

Session length

Chrome incognito

Copying values

Safari, mobile Safari, & mobile iOS Chrome support

Default Safari behavior

Vanity domains

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/current-limitations](https://docs.omni.co/docs/embed/external-embedding/current-limitations) on 2025-07-23.*
