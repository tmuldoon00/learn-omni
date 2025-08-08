# Dashboard tile anchors Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/dashboard-tile-anchors](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/dashboard-tile-anchors)  
**Extracted:** 2025-07-23 21:45:07  
**Source:** Omni Analytics Documentation

---

On this page

Markdown visualizations

and

dashboard markdown text tiles

can include links to other tiles within the dashboard. This is a nice way to create a table of contents or "back to the top" links or buttons to help users move around a longer dashboard.

Linking to existing charts

Any HTML element with an

on the page can be referenced as an anchor point to jump to. Every chart tile on the dashboard has a unique ID that is based on the title of the tile. For example, if the title of your tile is

Top Performing Brands

the corresponding ID is

top-performing-brands

and you can reference that anchor point with a markdown link like this:

(Jump to brand analysis)[#top-performing-brands]

or if you are writing HTML in the markdown editor, like this:

<a href="#top-performing-brands">Jump to brand analysis</a>

Creating your own anchors

If you are making more complex HTML-based markdown tiles, you can also include IDs in your element tags. It's a bit more complex to reference these IDs in other markdown tiles. Because we sanitize the HTML and markdown for security, we replace all user-generated IDs with a

user-content-

prepended to the provided ID. For example, if you write this HTML:

<article id="brand-analysis">We sell lots of stuff!</article>

then you will need to reference it like this:

<a href="#user-content-brand-analysis">Jump to brand analysis</a>

Tip

: if you need help getting the ID for any element, you can also use your browser's code inspector to locate the element.

Example code

The following example references the video at the top of the page.

Anchor/header tiles

Each of the 3 colorful headers in the above example serve as anchor destinations to navigate too. For this example, each hading has been created using a separate markdown visualization in the workbook, each titled to match the text inside the heading. Below is the code for the "Overview" heading.

style

.md-card

display

flex

background

linear-gradient

deg

#8eecd5

2.13

#9DAAF4

67.53

#F7A8CB

padding

var

--size4

border-radius

var

--radius-md

color

var

--color-text-inverse

justify-content

center

height

align-items

center

margin-block

style

class

md-card

Overview

Table of contents

The table of contents can be created using a dashboard text tile.

style

color

#E40473

text-decoration

none

font-size

border-radius

border

solid

#D3D3D3

margin-left

auto

padding

margin-right

.navbar

background-color

padding

display

flex

justify-content

space-between

align-items

center

.right

display

block

position

absolute

style

nav

class

navbar

span

style

color

#E40473

padding

font-size

Sections:

span

href

#overview

Overview

href

#organic-marketing

Organic Marketing - Detail

href

#paid-marketing

Paid Marketing - Detail

nav

style

border

none

border-bottom

solid

#FF1493

margin

width

padding-top

Linking to existing charts

Creating your own anchors

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/dashboard-tile-anchors](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/dashboard-tile-anchors) on 2025-07-23.*
