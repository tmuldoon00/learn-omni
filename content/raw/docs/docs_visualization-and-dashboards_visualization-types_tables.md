# Tables

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/tables](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/tables)  
**Extracted:** 2025-07-23 21:45:23  
**Source:** Omni Analytics Documentation

---

On this page

Omni offers many ways to configure tables for more visual sharing, including layout controls, in-line visualization, conditional formatting, and other controls. It’s important to call out that this is a separate visualization from the results table. You can think of the table visualization as the way you want to present the data.

There are three ways of interacting with the table: 1. directly in the table, 2. using the options “Table” panel, 3. using the options “Style” panel.

Directly in the Table

Similar to how a user would interact with the table in the Results tab, users can drag and drop columns and interact with the “three dot” menu to interact with the data. Some of the functionality availability directly in table is:

Show / Hide Columns

To hide columns from the result table, right click on any column in the result set from the table visualization configuration. Hidden columns can then be returned from the configuration. Columns may also be hidden from the table options menu.

Columns Re-Sort / Column Reorder

Columns in the data table can be re-arranged using the drag target on each column header. Pivots can only be re-arranged via re-sort, not on an ad hoc basis. Note that dimensions and measures can be interspersed if there is no pivot.

Pivot Sorting

Pivots can be sorted the same way that columns are sorted, by clicking on the field header in the data table. Pivots can also be sorted based on values in the data table by clicking the row number, including by the total (clicking the blank row number for totals).

Options Panel “Table” Tab

Column Width

Choose between a full width table (stretch) and a fixed table where column widths will remain fixed regardless of table size, any extra space in the table tile will be blank.

Header Text

Choose if a header title will truncate or wrap the text if it doesn’t fit in the column.

Show / Hide View Names

Subtotals / Group Dimensions

If there is more than one dimension per row, if toggled on, this will group them into one expandable section. This allows for subtotaling data sets, and more interactive tables:

Expand & collapse grouped dimensions

You can also expand all groups in a column by right-clicking on its header and selecting

Expand groups

. To collapse all groups, click

Collapse groups

Pivots

Drag and drop fields to pivot the table. Pivots can also be hidden, but must be hidden from the table itself and they will be indexed to the value of the pivoted series. This means if you hide the first pivot, say status: Returned, the hide is not indexed to the first pivot, but rather Status: Returned.

Fields

Drag and drop fields to add to the table and reorder them directly in this section. Using the drop down arrow you further customize the data in the table. There are three tabs available: Field, Conditional Format, Display.

Text Alignment

Adjust how the field displays:

Label: add a label

Alignment: right align, center align, or left align

Word wrap: choose if text wraps or truncates if it is too long for the cell

Hide: particularly important for unhiding if you hide the column directly in the table.

Conditional Formatting

Numeric values can be colored based upon the distribution of values using conditional formatting. To activate conditional formatting, simply select the desired series. By default Omni will select three palettes and gradient in between the min and max values. This can be adjusted to a color pair, or more colors as desired.

Note background color can be set to transparent by removing text from the Hex code.

Additional options are available to treat nulls as 0 or exclude them from the color palette:

Display Decoration (Images, Links, Table Bars)

Customize how the field is displayed by choosing between the value in the database, an image, or a link.

Value: display the value available in the field

Image: will pull up image options available in your database and you can choose the height and width that will be displayed and you can choose if you’d like to link the image

Link: create a hyperlink that users can interact with whether that sends a user to a link from that field, a custom link, or an embed event

Bar: for numeric columns, bars can optionally be displayed alongside the values to more quickly show relative sizes

Displaying Links

Often times, it's valuable to make the links dyanmic per row using a formulaic URL construction.  The recommended pattern is building the URL with a calculation, hiding the calculation, and mapping the URL parameter to this hidden field.  Below is an example building a Google search URL for each brand:

Options Panel “Style” Tab

In the style tab, you can adjust the look and feel of your table by making descriptions available, adding row numbers, banding rows, and adjusting the text and background color of the various elements.

Banding will set the rows to alternate between the base background table value color (white) and the base banding background color (grey).

Table Colors

Tables offer configuration for both backgrounds and text.  Each pair is availanble for headers, table values, banding (if applicable), hover, and the totals row:

When choosing colors - the top box will set the color, and the slide below controls the transparency level of the color chosen:

Copying Table Color Palettes

When adjusting the color, you can use the three dot menu to reset the colors to the default, copy the hex codes for each of the elements to make them reusable, or paste in the colors from other table.  For example, the color copy functionality for the image above creates:

"header"

"fontColor"

"#fefefe"

"backgroundColor"

"#FF5788"

"banding"

"backgroundColor"

"#ffeff3ff"

Making it reusable for analysts who may be creating a lot of content.

Directly in the Table

Show / Hide Columns

Columns Re-Sort / Column Reorder

Pivot Sorting

Options Panel “Table” Tab

Column Width

Header Text

Show / Hide View Names

Subtotals / Group Dimensions

Pivots

Fields

Text Alignment

Conditional Formatting

Display Decoration (Images, Links, Table Bars)

Displaying Links

Options Panel “Style” Tab

Table Colors

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/tables](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/tables) on 2025-07-23.*
