# Customization & interactivity

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/customization-and-interactivity](https://docs.omni.co/docs/embed/external-embedding/customization-and-interactivity)  
**Extracted:** 2025-07-23 21:44:12  
**Source:** Omni Analytics Documentation

---

On this page

Embedded content can be customized with dashboard themes, vanity domains and you can also increase the interactivity of embed content with linking, JavaScript events, and post messages.

Vanity Domains

You may want to implement the use of a vanity domain for your embedded dashboards if you need to utilize first-party cookies or would like to have cohesive branding of the content you share with your clients.

🔥 Tips

SDK Example

This feature is only available for private embed use cases.

Only one vanity domain is allowed per Omni organization.

Have a multi-part domain like products.ecommerce.com or dev.products.ecommerce.com.

Vanity Domain:

products.ecommerce.com

const

iframeUrl

await

embedSsoDashboard

contentId

"miU0hL6z"

externalId

"wile.e@coyote.co"

name

"Wile E"

host

"products.ecommerce.com"

secret

"abcdefghijklmnopqrstuvwxyz123456"

Typescript SDK

https://www.npmjs.com/package/@omni-co/embed

How to...

📧 Start this process by reaching out to

support@omni.co

with the following information:

Provide the vanity domain you are interested in, e.g. products.ecommerce.com

Key considerations:

Note that a vanity domain must have three, or more, parts like the example above - ecommerce.com without “products” prepended will not be considered a valid vanity domain.

The top level domain of the vanity domain must match the embedding page to support first party cookies.

If your embedding page is ecommerce.com, then your embedded vanity domain should be omni.ecommerce.com

If your embedding page is ecommerce.com and you provide an embedded vanity domain of ecommerce.omni.com then you may still run into third-party cookie limitations on some browsers like Safari or other iOS applications.

Your dedicated Omni team will reach back out with DNS configuration details and ask that you update your DNS configuration.

Once confirmed it is updated with Omni, the team can complete the next configuration steps.

Your Omni team will let you know once all of the settings are enabled and ready for you to start rocking that vanity domain 🤘

Linking to Other Content

The Markdown component can be used to build links to other Omni content, like other dashboards.

These links work seamlessly within the app, and don't require any complex iframe manipulation.

Embed SSO requires enabling link access:

You'll need to specify

__omni_link_access_open

in the

Link Access

parameter

to permit linking in an embed session.

Linking is as easy as setting an

<a>

tag's

href

in markdown to the relative path of a piece of content, like a dashboard.

Example:

## Dashboards

1. <a href="/dashboards/123abc">Product Dashboard</a>

2. <a href="/dashboards/789xyz">Sales Dashboard</a>

You can also link filters between dashboards using mustache references to the filter values. For example, if you have a filter on Traffic Source you can reference it like so:

<a href="/dashboards/123abc?f--users.traffic_source={{filters.users.traffic_source.json}}">Product Dashboard</a>

This allows linking of dashboard and dashboard state across multiple dashboards.

Event messaging

Consuming events

Using JavaScript events, you can trigger interactions in your application based on events in an Omni iframe. Events are emitted by Omni using the

postMessage

protocol

. These events will have the following shape:

type

EmbedEvent

Payload

payload

Payload

description

string

name

EmbedEventName

Listening for events

Subscribe to events in the parent frame with the following:

const

setFrameHeight

height

// do the work to set the iframe element's height here

// eg. `iframeElement.height = height`

const

listener

event

// Only accept messages from a known origin

event

origin

!==

"https://example.embed-omniapp.co"

return

switch

event

data

name

case

'size'

const

height

event

data

payload

height

setFrameHeight

height

break

case

'page:changed'

// Do something with the page:changed event, etc

// Must attach the event listener for messages.

window

addEventListener

'message'

listener

Sending events

You can also send events into an Omni iframe to trigger actions in your embedded Omni application. Like emitted events, events sent to Omni should use the

postMessage

protocol

. Events sent to Omni are expected to have the following shape:

type

EmbedEvent

Payload

payload

Payload

name

EmbedEventName

The following is an example of a JavaScript event handler that sends a

navigate

embed event to an Omni iframe via postmessage.

const

handleNavigateButtonClick

path

document

querySelector

'iframe'

contentWindow

postMessage

name

"navigate"

payload

path

"https://youromniorganization.embed-omniapp.co"

Supported events

Supported events are categorized as one of the following:

Events emitted by Omni

Events sent to Omni

Events emitted by Omni

page:changed

Emitted when the page URL changes. Can be consumed by the embedding frame to generate shareable links.

Payload:

href

string

// The fully qualified URL like: https://example.omniapp.co/dashboards/123abc?f--users.email=someone@example.com

pathname

string

// pathname of the URL. From the previous example: /dashboards/123abc

string

// query params from the URL. From the previous example: ?f--users.email=someone@example.com

type

string

// one of 'dashboard', 'workbook', 'other'

dashboard:filters

Triggers when a user applies a filter to a document within an iframe.

Payload:

'users.id'

filter

is_negative

false

kind

'EQUALS'

...

asJsonUrlSearchParam

'f--users.id=%7B"is_inclusive"%3Afalse%2C"is_negative"%3Afalse%2C"kind"%3A"EQUALS"%2C"type"%3A"number"%2C"values"%3A%5B"3"%5D%7D'

dashboard:download

Triggers when a user downloads the dashboard.

Payload:

userId

string

// id of the user who downloaded the dashboard

dashboard

filters

filterName

string

filter

Filter

// complex object representing the filter

asJsonUrlSearchParam

string

// filter as a JSON URL search param that can be used in dashboard urls

href

string

// full url of the dashboard

urlId

string

// id of the dashboard used in the url

path

string

// path to the dashboard

title

string

// title of the dashboard

format

string

// one of 'pdf', 'csv', 'xlsx'

dashboard:tile-download

Triggers when a user downloads a given tile on a dashboard.

Payload:

userId

string

// id of the user who downloaded the dashboard

dashboard

filters

filterName

string

filter

Filter object

// complex object representing the filter

asJsonUrlSearchParam

string

// filter as a JSON URL search param that can be used in dashboard urls

href

string

// full url of the dashboard

urlId

string

// id of the dashboard used in the url

path

string

// path to the dashboard

title

string

// title of the dashboard

format

string

// one of 'csv', 'xlsx', 'png'

tile

string

// id of the tile

title

string

// title of the tile

appliedFilters

// filters applied to the tile

filterName

string

filter

Filter object

// complex object representing the filter

asJsonUrlSearchParam

string

// filter as a JSON URL search param that can be used in dashboard urls

size

Triggers on dashboard load to give the size of the frame, allowing users to dynamically size the iframe.

Payload:

width

number

// width of the dashboard in the iframe

height

number

// height of the dashboard in the iframe

status

Sends the dashboard status to the parent frame, with a status of

loading

running

done

, or

error

Payload:

status

string

// status of the dashboard in the iframe

error

Emitted when there has been a detectable error on the page.

Payload:

href

string

// The fully qualified URL like: https://example.omniapp.co/dashboards/123abc?f--users.email=someone@example.com

message

string

// The error message, if one exists

Events that can be sent to Omni

navigate

When sent from a parent frame to a child Omni iframe, the

navigate

event triggers a redirect to the path specified in the event payload:

name

"navigate"

payload

path

"/dashboards/abcd1234"

Note

: Omni will not automatically provide content or connection permissions to the user during a

navigate

event. This means that if you redirect a user to a dashboard or workbook, that user will need proper content and/or connection permissions to view that content.

dashboard:filter-change-by-url-parameter

When sent from a parent frame to a child Omni iframe, the

dashboard:filter-change-by-url-parameter

event triggers a filter value change based on the event payload.

The value for the payload's sole

filterUrlParameter

property can be derived when using the standard Omni application (i.e. in a non-embedded context). More specifically, you can use the filter URL search parameters generated when changing filter values on an Omni dashboard.

This event is additive in that only filters included in the

filterUrlParameter

string will be affected; filters not included in the

filterUrlParameter

string will retain their existing values.

name

"dashboard:filter-change-by-url-parameter"

payload

filterUrlParameter

f--order_items.status=%7B"appliedLabels"%3A%7B%7D%2C"values"%3A%5B"Complete"%5D%7D

Note:

This event can only be processed by dashboards. Sending this event to an iframe that's housing a non-dashboard Omni URL will have no effect on the embedded page.

Table and Markdown Events

In addition to javascript events, users can send post messages from markdown or table visualizations. These can be observed by listeners in the parent frame to trigger certain actions, such as popping open custom drill modals or passing through certain data from Omni to the parent frame.

Table Visualizations

Within the table visualization, if a user clicks on the field level settings, then the

display

tab, and updates

display as

link

, then update

URL

Embed Event

. This will allow a user to give an embed event name, which will be triggered on a click to send a message out to the parent frame.

Markdown Visualizations

Using a tag for a custom element in markdown, we can send post messages from the iframe to the parent frame. This can be done upon a click to the corresponding aspect of the markdown visualization. To include it, you can include the following tag:

<omni-message event-name="product-image-click" event-data="{{products.name.raw}},{{products.retail_price.raw}},{{products.sku.raw}}">

Within this tag, you can set the event name, as well as the data that will be sent out to the parent frame.

Custom Theme Properties

Custom themes are currently only available for dashboards. There are two ways to create and use custom themes:

directly on a dashboard

or through the url.

Advanced

If you intend to make the theme dynamic with some external logic then adjusting the url theme properties using the

customTheme

parameter is also available to use.

Page

Property Name

Description

Accepts

dashboard-background

The background of the embedded dashboard.

background

dashboard-page-padding

The padding of the embedded dashboard page.

padding

Tiles

Property Name

Description

Accepts

dashboard-tile-margin

The spacing around tile elements on the embedded dashboard.

padding

dashboard-tile-background

The background of the embedded dashboard's tiles.

background

dashboard-tile-shadow

The box shadow of the embedded dashboard's tiles.

box-shadow

dashboard-tile-text-body-color

The text color of primary text in the embedded dashboard's tiles. Primary text refers to the tile title of most tiles or the single value tiles.

color

dashboard-tile-text-secondary-color

The text color of secondary text in the embedded dashboard's tiles.

color

dashboard-tile-border-color

The border color of the embedded dashboard's tiles.

color

dashboard-tile-border-radius

The border radius of the embedded dashboard's tiles.

border-radius

dashboard-tile-border-style

The border style of the embedded dashboard's tiles.

border-style

dashboard-tile-border-width

The border width of the embedded dashboard's tiles.

border-width

dashboard-tile-title-font-size

The font size of the embedded dashboard tiles' titles.

font-size

dashboard-tile-title-font-weight

The font weight of embedded dashboard tiles' titles.

font-weight

dashboard-tile-title-text-color

The text color of title text in the embedded dashboard's tiles.

color

dashboard-tile-title-font-family

The font family of title text in the embedded dashboard's tiles. Pass a link to a remote woff2 file to use a custom font.

woff2 url

dashboard-tile-text-body-font-family

The font family of the body text in the embedded dashboard's tiles. Pass a link to a remote woff2 file to use a custom font.

woff2 url

dashboard-tile-text-code-font-family

The font family of a markdown

<code>

element in the embedded dashboard's markdown tiles. Pass a link to a remote woff2 file for custom font usage.

woff2 url

Controls

Page-level controls like filters, field switchers, and period-over-period.

Property Name

Description

Accepts

dashboard-control-background

The background of filter controls in the embedded dashboard.

background

dashboard-control-radius

The border radius of controls.

border-radius

dashboard-control-border-color

The border color of filter controls in the embedded dashboard.

color

dashboard-control-text-color

The text color of filter controls in the embedded dashboard.

color

dashboard-control-placeholder-color

The text color of placeholder text inside controls.

color

dashboard-control-label-color

The text color of labels above filter controls in the embedded dashboard.

color

dashboard-control-outline-color

The outline color for controls when they have focus.

outline-color

Control popover

Styles applied to control popovers and the inputs inside of them.

Property Name

Description

Accepts

dashboard-control-popover-background

The background of filter control popovers in the embedded dashboard.

background

dashboard-control-popover-text-color

The base text color in control popovers.

color

dashboard-control-popover-secondary-text-color

The secondary text color in control popovers.

color

dashboard-control-popover-link-color

The color of links in control popovers.

color

dashboard-control-popover-divider-color

The color of dividers in control popovers.

color

dashboard-control-popover-radius

The border radius of control popovers.

border-radius

dashboard-control-popover-border-color

The border color of control popovers.

color

dashboard-filter-input-background

The background of filter inputs inside of the popover.

background

dashboard-filter-input-radius

The border radius of filter inputs inside the popover.

border-radius

dashboard-filter-input-border-color

The border color of filter inputs inside the popover.

color

dashboard-filter-input-text-color

The text color of filter inputs inside the popover in the embedded dashboard.

color

dashboard-filter-input-placeholder-color

The color of placeholder text inside filter inputs.

color

dashboard-filter-input-icon-color

The color of icons inside filter inputs.

color

dashboard-filter-input-outline-color

The outline color inputs when they have focus.

outline-color

dashboard-filter-input-accent-color

The color of checkbox, radio, and toggle inputs.

color

dashboard-filter-input-accent-invert-color

The invert color of elements in checkbox and radio inputs.

color

dashboard-filter-input-token-color

The background color of tokens in multi-select inputs.

color

dashboard-filter-input-token-text-color

The text color of tokens in multi-select inputs.

color

Buttons

Property Name

Description

Accepts

dashboard-key-color

The key color of the embedded dashboard, used on filter

Update

buttons and other key elements.

color

dashboard-key-text-color

The key text color of the embedded dashboard, used on the text of filter

Update

buttons and other key elements.

color

dashboard-button-radius

The border radius of buttons in popover controls.

border-radius

dashboard-button-transparent-text-color

The text color of transparent buttons in filter control popovers.

color

dashboard-button-transparent-interactive-color

The background color of transparent buttons in filter control popovers when the user hovers over the button.

color

dashboard-menu-item-interactive-color

The background color of menu items in filter control popovers when the user hovers over it.

color

Getting woff2 file links from Google Fonts

Font family properties like

dashboard-tile-title-font-family

support links to a remote woff2 file. A typical use case is to link to a woff2 file from a Google Font. To grab the link to a Google Font woff2 file, perform the following steps:

Go to fonts.google.com and click on your font of choice. For this example, we’ll be using the “Yarndings 12” font.

That click should take you to a font specimen page. On that font specimen page, click the “Get font” button.

After pressing “Get font” you’ll be taken to a selection page. On that selection page, click the “Get embed code” button.

Go to the fonts.googleapis.com link that appears in the third <link> element of the example embed code. Note that some Google Fonts allow you to customize font weight and font style in the left panel so feel free to filter down to the exact font styling you’d like.

Find the @font-face at-rule under labeled “latin” and copy the src property url(...).

Pass that url(...) value into the appropriate customTheme property when generating your Omni SSO embed link.

"dashboard-tile-title-font-family": "url(https://fonts.gstatic.com/s/yarndings12/v2/55xreyp2N8T5P2LJbZAlkY9s9pjNAWZEnA.woff2)",

And voilà!

Deliveries

Embed users can leverage  Omni’s

delivery functionality

to schedule or set alerts on documents. If needed, you can disable this feature at an

instance-wide

or a

document

level.

Need to whitelabel delivery emails?

The

Customer email sender

feature allows you to customize the sender information for Omni delivery emails, including the sender's name, email domain, and reply-to address. Refer to the

Email delivery guide

for more information.

In order for email suggestions to be populated automatically for deliveries, the

email

parameter

needs to be included in the embed URL.

Vanity Domains

Linking to Other Content

Event messaging

Consuming events

Sending events

Supported events

Table and Markdown Events

Custom Theme Properties

Page

Tiles

Controls

Control popover

Buttons

Deliveries

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/customization-and-interactivity](https://docs.omni.co/docs/embed/external-embedding/customization-and-interactivity) on 2025-07-23.*
