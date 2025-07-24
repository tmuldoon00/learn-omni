# Chart color configuration

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/configuration/color](https://docs.omni.co/docs/visualization-and-dashboards/configuration/color)  
**Extracted:** 2025-07-23 21:44:51  
**Source:** Omni Analytics Documentation

---

On this page

Color options

Color sets a facet across the given data set to create individual series. Color options also include stacking controls for the visualization.

There will be slightly different options for string, date, and numeric data. Strings only offer discrete bucketing, while date and numeric data will offer both discrete (nominal) and continuous (temporal or quantitative) coloring.  Note also that the palette options will change for discrete vs continuous, with discrete offering diverging color palettes and continuous offering a set of gradient color palettes.

When continuous options are not offered on an apparent date or numeric, casting the field may solve the problem.

String options

Numeric options

Date options

Palettes & color faceting

When using color faceting, Omni automatically applies the organization's

default color palette

to your chart, using the discrete or continuous palette appropriate to the data. In the case of discrete data, colors from the palette are automatically applied based on the sort order of the query and the color order in the palette. For continuous data, the gradient palette is automatically applied to the range of the values from the query results. Select a different option from the palette menu to update the color treatment.

Use the

Reverse colors

option to reverse the order in which colors from the palette are applied to the data.

With color faceting, the series

are not

independently configurable.  For independent color configuration of a given series,

create separate measures

for each series and refer to the section below on

series color controls

Custom palettes

If one of the provide palettes doesn't quite suit your visualization needs, a custom palette can be built for an individual chart. The last option in either the continuous or discrete palette menus is a

Custom

palette option. Select this option and then click the

Customize button

next to the menu. From here you can add, remove, and edit the palette colors:

Use the

Open hex code editor

button to toggle a bulk editor. This makes it easy to copy and paste a list of comma-separated hex values.

Custom palettes built for individual charts can be reused by copying and pasting the hex codes from chart to chart. If you find yourself using the same custom palette repeatedly, an administrator can

add additional palettes to the organization

to make it broadly available in the palette menu.

Series color controls

Color controls are available on a series-by-series basis when no color facet is applied (with a single measure and no color, or with multiple measures). This will offer a simple color picker for each series.

You can also map a color to a specific measure when using it as a series with the

measure's

colors

parameter

Stacking options

Several stacking options are supported:

Automatic

: Omni will attempt to select the best option from the four below

Stack

: The series will be stacked

Group

: The series will appear side-by-side (only offered for bar charts)

Overlay

: The series will appear on top of each other.  This is how points and lines frequently work, but rarely valuable for bar.

Stack %

: The series will be stacked, and shown as the percentage rather than the absolute values.

Note

: The tooltip will show the raw value, not the percentage, so to add percentage it's recommended to use table calculations like

% of row

Legend options

Legends can be located on the right, left, top, or bottom of the chart. They can also be hidden.

Dimension colors

This feature is in beta

The

dimension color modeling

feature is currently in beta.

As such, it isn't currently supported everywhere in the workbook. For example, dimension color mapping won't apply colors to table cells.

Omni supports the ability to define consistent coloring for dimensions across visualizations, whether they're in the same document or in different documents. Using the

colors

parameter in a dimension

, you can map a color to specific values.

For example, the following image shows an example of two bar charts that include a

status

field. Notice that the bars for the

Complete

status are the same color:

Assigning colors to dimensions in the IDE

To achieve this in your own visualizations:

In the IDE, add the

colors

parameter to a dimension in a

view

query view

. For example:

dimensions

status

order_by_field

status_order

colors

conditions

# List of conditions

condition

# Required. A condition, specified using filter syntax.

Complete

color

green

# Required. The color to be used in visualizations when the condition is met

else

red

# Optional. Specifies fallback color if no condition is met

Refer to the

Dimensions parameter reference

for more information and examples.

In the

Chart

tab of the workbook, drag the dimension to the

Color

field:

Color options

Palettes & color faceting

Custom palettes

Series color controls

Stacking options

Legend options

Dimension colors

Assigning colors to dimensions in the IDE

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/configuration/color](https://docs.omni.co/docs/visualization-and-dashboards/configuration/color) on 2025-07-23.*
