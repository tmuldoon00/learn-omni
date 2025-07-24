# X

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/configuration/x-axis](https://docs.omni.co/docs/visualization-and-dashboards/configuration/x-axis)  
**Extracted:** 2025-07-23 21:44:54  
**Source:** Omni Analytics Documentation

---

On this page

Options

To access the controls, navigate to the

Chart

Options

then select the

Axis control

button to the right of the label. From there you can control three areas:

X-Axis

: Title, Sort

Labels

Show Labels

Show Axis Line

Show Ticks

Font

Format (Label rotation, Ticks (Auto, Number))

Grid

: On/Off Checkbox

tip

These control only the

axis itself

to customize the

series mapped to the axis

use the dropdown next to the series/field.

Temporal/quantitative (continuous) vs ordinal (discrete) axes

Omni adjusts axis treatment for different data types and visualization types:

For strings - axes will always be ordinal, and, by default, obey sort in the data table.

For numbers - bars are ordinal; line, scatter, area are quantitative (continuous)

For dates - bars are ordinal; line, scatter, area are temporal (continuous)

For the ordinal series, note that missing rows

will not

be displayed.  It's recommended to

fill missing rows

to retrieve these values when that is desirable.

Axis labels spacing

Axis labels will behave differently for continuous / temporal axes (vs ordinal / string).  In continuous mode, the labels will be spaced so as not to cut text, but may not align exactly with the visualization points.  In ordinal mode, the values will be labeled one-by-one, and hidden in consistent intervals to, again, avoid collision.

There are no current controls for label sparseness, but will come in the future.

Notes

When tuning axis colors note that there is not Independent configuration for light and dark mode.  The default palette will adjust colors (ie dark axis in light mode; light axis in dark mode), but when they are hard-coded they will be respected in light and dark mode.

The configuration can be reset (note, entirely for the vis to defaults) under Tab > Reset Chart

Long-tail axis configuration is available in the

Vega-lite spec

Options

Temporal/quantitative (continuous) vs ordinal (discrete) axes

Axis labels spacing

Notes

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/configuration/x-axis](https://docs.omni.co/docs/visualization-and-dashboards/configuration/x-axis) on 2025-07-23.*
