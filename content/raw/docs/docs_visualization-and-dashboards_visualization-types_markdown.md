# Markdown visualizations

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown)  
**Extracted:** 2025-07-23 21:45:02  
**Source:** Omni Analytics Documentation

---

On this page

Markdown visualizations allow for a combination of Markdown elements and query variables. You can use it to create a visualization that includes text, images, links, data, iframes, and more.

Using the Markdown editor

When you select

Markdown

as the visualization type, a Markdown editor will display in the chart's

Options

pane. As changes are made, the chart area will automatically update.

As you write, the chart area will update. At the top of the editor is a toolbar to help you generate correct

Markdown syntax

for common formatting actions.

Including HTML

The Markdown editor interprets Markdown first and foremost. While it is possible to incorporate HTML, it helps to think of these more as text documents than true HTML files.

When formatting your code, keep the following in mind:

Indentation is interpreted as a code block

. Keep your code flush to the left to prevent unintended code blocks.

Empty lines may cause odd behavior

. In Markdown, these are paragraph indicators. This occurs because the

div

is included in a code block as plain text, which will strand its closing tag.

While you can use HTML, try to use it sparingly to simplify things. If you do need to use HTML elements:

Use supported semantic HTML elements where possible

, such as

article

section

. Large numbers of

divs

in a row can cause parsing issues.

Limit the depth of

div

nesting

. Deeply nested elements increase the likelihood of conflicts between the Markdown and HTML parsing.

Use

<style></style>

and CSS classes

over inline

style

tags for custom CSS.

And you plan to generate PDFs

, note that they can render differently than what's in the browser:

Directly referencing native HTML tags

- for example,

h3 { font-size: 18px; }

- may not always work

Some characters in CSS can't be parsed

causing those style declarations to be ignored. Some known situations:

the quotation marks needed for

content: "foo";

will not work so avoid using the

content

declaration

and

notation in your CSS will be ignored so if you nest your css avoid that syntax

Invalid HTML or CSS syntax may render as expected in the browser

, but not in PNGs or PDFs

Referencing query elements

Data and other elements from the query can be exposed using

Mustache syntax

. For example,

{{query_element}}

.  The full list of query elements can be seen using

{{ inspect }}

To reference query elements, you can do any of the following:

Use the

Query details

drop-down menu inside the Markdown editor:

Click any cell in the data table to copy the Markdown syntax:

Write the syntax directly:

Fields

{{fields.view_name.field_name.property}}

Filters

{{filters.view_name.field_name.property}}

Refer to the

Markdown Mustache syntax reference

for more information and examples.

Looping through the results set

To iteratively generate Markdown tiles based on the results set, use

{{#result}}

and

{{/result}}

to create a loop. For example:

{{#result}} // start a loop

{{<view_name>.<field_name>.value}} // access contents of that loop

[...] // you can reference more fields...

{{<view_name_n>.<field_name_n>.value}} // ...maybe you'll want to separate them with a new line (<br>)

{{/result}} // end loop

To see this in action, check out these examples in the Markdown examples gallery:

Repeating pie charts

Repeating square fill charts

Repeating waffle charts

Adding visual components

Along with adding images and code to help highlight your data, you can also use the built-in components to create simple visualizations:

Change arrow

- Adds an arrow icon indicating the type of change between two data points

Sparkline

- Adds a

sparkline

. Useful for seeing the shape in variation in a simple, condensed way.

More complex visualizations are possible - check out the

Markdown examples gallery

for inspiration.

Change arrow

Adds an arrow icon indicating the type of change between two data points. If the change is a positive number, the arrow will be green. If negative, it will be red.

To use this component, your results must include two data points that can be used to calculate a change.

ChangeArrow

current

{{result.0.users.count.value_static}}

comparison

{{result.1.users.count.value_static}}

ChangeArrow

Properties

Name

Value

Notes

current

result.0.view_name.field_name.value_static

Use

value_static

instead of

value

, since the value and not the drillable element is needed

comparison

result.1.view_name.field_name.value_static

Sparkline

Adds a

sparkline

. Useful for seeing the shape in variation in a simple, condensed way.

To use this component, your results must have more than one row of data and a field name.

Sparkline

field

users.count

color

cornflowerblue

Sparkline

Properties

Name

Value

Notes

color

CSS color, ex:

cornflowerblue

field

view_name.field_name

height

Integer, ex:

width

Integer, ex:

reverse

true

Remove property for

false

type

line

(default) or

bar

Adding iframes

Using iframes in a Markdown visualization is also supported. iframes can be parameterized with

query elements

By default, Omni applies restrictions (

sandboxing

) when rendering iframes. This means that some website features, such as popups, may be unavailable or incompatible.

Use the dropdowns to check out some examples.

Google Docs

note

Before embedding in Omni, publish the doc and retrieve its embed link.

Code

iframe

width

height

src

https://docs.google.com/document/d/id

iframe

Result

Google News

Code

iframe

width

src

https://google.com/search?igu=1&q={{result._first.customers.name.value_static}}+company&tbm=nws&source=lnms&sa=X&ved=2ahUKEwjv1rPg7LmAAxXsFFkFHWTbCYcQ0pQJegQIPxAB&biw=1420&bih=840&dpr=2

iframe

Result

Google Maps

Code

iframe

src

https://www.google.com/maps/embed/v1/search?q={{result.0.products.brand.value_static}}+in+{{result._first.users.city.value_static}},{{result._first.users.state.value_static}}&key=AIzaSyCXfF4zpXaYkgVaBzj3oZUtmcDAxpdoOGk&

width

100%

height

100%

iframe

Result

Twitter/X

Code

iframe

height

width

src

https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fjack%2Fstatus%2F20

iframe

Result

Windy

Code

iframe

width

height

src

https://embed.windy.com/embed2.html?lat=39.018&lon=-77.539&detailLat=39.018&detailLon=-77.539&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1

iframe

Result

YouTube

Code

iframe

width

height

src

https://www.youtube.com/embed/lNAzOJrV-Zk

title

YouTube video player

iframe

Result

Example gallery

Markdown visualizations can be as simple or as complex as you can make them. Check out the

Markdown examples gallery

to get inspired!

Using the Markdown editor

Including HTML

Referencing query elements

Looping through the results set

Adding visual components

Change arrow

Sparkline

Adding iframes

Example gallery

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown) on 2025-07-23.*
