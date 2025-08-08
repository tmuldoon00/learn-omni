# Bar charts

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/bar-charts](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/bar-charts)  
**Extracted:** 2025-07-23 21:44:59  
**Source:** Omni Analytics Documentation

---

On this page

Basic Bar:

Group:

Stack:

Stack %:

Stacked Measures:

Grouped, Stacked Measures:

Data Structures

Bar charts can work with pivoted or unpivoted data, using 2 dimensions and one measure.  To stack or group a chart, one series should be moved to the color facet.

Unpivoted Data:

Pivoted Data

Additionally bar charts can plot several measures at once:

Configuration Notes

Setting Marks

The mark selector at the top of the configuration sets the global chart configuration (configuration across all series). Note that each series can be set independently to bar, line, scatter, area independently under their y-axis controls

Stacking Settings

The color section controls overall stacking and grouping behavior overall.  Additionally stack can be set independently on the different y-axis, under the y-axis series configuration (useful for overall grouping of two stacked grouplets):

Automatic: we'll guess for you

Stack: Series on same x-axis value, on top of each other

Group: Series offset from their baseline x-axis mark into grouplets

Overlay: Series

on top

of each other (usually very undesirable, but useful in rare cases)

Stack %: Series rebased to 100% across each x-axis value

Show Totals Labels on Stacked Charts

For color-by stacked charts, totals can be labeled under the y-axis series configuration (Series > Labels > Simple Totals).  Right now totals are not available for multiple-measure stacks.  Additional configuration is provided for styling and value formatting of the labels:

Positioning (Auto, Above, Below, Left, Right, Middle)

Font size and color

Bolding and italic

Value formatting

Other Notes

Axes are set to ordinal with bars (vs temporal with line, scatter, and area charts).  This means each bar will be labeled independently (not a continuous axis), the axes are not intelligent about time, and values that are not in the set will not be plotted.  To fill missing rows, the data must be adjusted in the table -

more here

With time fields, order will be automatically set to ascending; other data types will obey the table ordering when graphing

Tooltips on stacked bars will be designated to the individual segment of the chart when using color by.

Data Structures

Configuration Notes

Other Notes

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/bar-charts](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/bar-charts) on 2025-07-23.*
