# Formatting & analyzing data with spreadsheet tabs

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/workbook/spreadsheet-tabs](https://docs.omni.co/docs/querying-and-sql/workbook/spreadsheet-tabs)  
**Extracted:** 2025-07-23 21:44:43  
**Source:** Omni Analytics Documentation

---

On this page

info

To have this feature enabled, reach out to Omni support.

Omni’s spreadsheet tabs bring the power of traditional Excel spreadsheets into your existing reporting and analysis workflows, with the added benefit of always-on, live data.

Spreadsheet tabs are ideal for:

Creating richly formatted tables such as financial statements, invoices, or planning sheets

Performing ad hoc or exploratory analysis

Because these spreadsheets are directly connected to your database via Omni queries, you no longer need to export or manually refresh data. You can build and maintain familiar spreadsheet workflows - such as reporting templates or budget trackers - confident that your data is accurate, current, and easy to work with.

How it works

Heads up!

Spreadsheets are still in beta.

However, when released, they'll be enabled by default for your organization.

Organization Admins

can disable (or re-enable) them in the

Organization settings

with the

Create spreadsheets

setting.

You can enable and disable spreadsheet tabs for individual documents by navigating to

File > Document settings > Abilities

in a saved document.

Spreadsheets are a type of tab that, when enabled, can be added to Omni workbooks. Other queries in the workbook can be connected to the spreadsheet and used as a data source.

When queries are connected to a spreadsheet tab, a new sheet will be added inside the spreadsheet tab. You can then reference the data in the sheet like you normally would in Excel.

Sheets that correspond to a workbook query will automatically update when the query changes. For example, if a new column is added to a query, the sheet associated with the query will be updated to include the new column.

Limitations

The most important limitation relates to data usability outside of a spreadsheet tab.

Data in spreadsheets can't be used in other queries or promoted to a shared model.

While you can work with query data by

connecting it to a spreadsheet tab

, data created in the spreadsheet - for example, by manual entry or through the use of

formulas

- can't be used elsewhere.

Excel differences

Some formulas may differ slightly from Excel

. Omni expects the majority of formulas to be the same, but we recommend using the

in-sheet formula builder

to verify the correct syntax.

Changes in spreadsheet tabs aren't autosaved.

You'll need to

manually save your work

to ensure changes are persisted.

Hotkeys aren't an exact match

References may not reflect structural changes the same way as Excel.

Refer to the

Handling query changes

section for more information and examples.

Creating pivot tables isn't supported

. If you need to create pivot tables, create a

"regular"

SQL query tab

to use Omni's native

pivot

functionality.

Note

: You can connect queries containing pivots to spreadsheets as a data source.

Creating in-sheet charts isn't supported

. If you need to create a visualization, create a

"regular"

SQL query tab

to use Omni's native

chart

functionality.

Adding spreadsheets to workbooks

When spreadsheet tabs are enabled, you'll see a

Spreadsheet

option when you create a new workbook or query tab. Click this option to add a

Sheet

tab to the workbook.

The tab will display a blank sheet similar to what you'd see in an Excel workbook. At this point, you can

connect other workbook queries to the spreadsheet

to interact with your data.

Migrating from the spreadsheet visualization

Spreadsheet visualization deprecation

Spreadsheet visualizations will be deprecated in the near future.

The spreadsheet visualization type will soon be deprecated in favor of the new and improved tab-based experience. When you view a spreadsheet visualization in a workbook, you'll see an

Upgrade to sheet tab

button in the

Chart options

panel:

When clicked, Omni will convert the spreadsheet visualization and add a new sheet tab to the workbook. Formulas and formatting will be preserved.

Note

: You'll need to complete the migration for any spreadsheets you want to keep.

Adding data to spreadsheets

You can add data to spreadsheets by:

Connecting workbook queries

Recommended

. Creates additional sheets containing query data in the spreadsheet, which are automatically updated when a query or its results change.

Importing existing CSVs & XLSX files

- Recreate existing formatting and formulas in Omni

Manually entering data

Omni recommends connecting workbook queries as data sources whenever possible. This ensures that your data is current and, if needed, accessible outside of the spreadsheet tab.

Connecting workbook queries

The recommended way to add data to a spreadsheet tab is to connect an existing workbook query. This allows you to manipulate and format data while taking advantage of your existing data model.

Open the spreadsheet's settings by clicking the

drawer icon

(highlighted in the following image) in the left navigation:

When a workbook query is added to a spreadsheet, Omni will add a

protected sheet

with the same name as the query to the spreadsheet.

Data in sheets associated with workbook queries will automatically update when the query's results or structure changes. For example, if you add a new column to a query, the associated sheet will also be updated to include the new column.

Importing existing CSVs & XLSX files

Heads up!

Data added using this method only lives in the spreadsheet tab where you upload it. If you need to use CSV or XLSX data outside of a spreadsheet tab, consider using

data input tables instead

Omni also supports importing existing CSV and XLSX files into spreadsheet tabs! For XLSX files, Omni will preserve your formatting, formulas, and references, allowing you to recreate existing workflows and wire them up to live data. CSVs will be parsed into columns.

In a workbook, create a new spreadsheet tab or add a blank sheet to an existing spreadsheet tab.

Drag the file into the blank sheet. A

Drag CSV or XLSX here

message should display.

Drop (release) the file to begin the import.

After the upload completes, you can edit the spreadsheet like you usually would.

Looking for inspiration?

Get started quickly by importing an

an Excel template

- you can then customize it using your own Omni data.

Manually entering data

To manually enter data, click into a cell and type or paste the data.

Note

: Data added using this method only lives in the spreadsheet tab you enter it into. It will not be accessible outside of the spreadsheet tab.

Referencing query data

Data in other sheets in a spreadsheet tab can be referenced just like you would in Excel. This includes direct references like

'<SHEET_NAME>'!A1

or as arguments in

formulas

Creating formulas

Heads up!

The formulas described in this section are

not

the same as Omni's

table calculations

. Spreadsheet tabs support additional formulas; additionally, the syntax between Omni table calculations and spreadsheet tab formulas may differ slightly.

Formulas in Omni spreadsheets generally mirror those in Excel. To view all supported formulas, click the

Formulas

tab in a spreadsheet and then

Insert Function

Refer to the

Excel documentation

for detailed information about these formulas.

If you prefer a more guided experience when using functions, select a function in this window and click

. You'll be prompted to fill in the formula's arguments.

You can also directly add formulas to sheets. In a cell or the formula editor, enter

to start building the formula. For example:

=AVG(A:A)

Handling query changes

When a workbook query is updated, the sheet associated with it in a spreadsheet tab will also be updated to reflect the changes. This includes - but isn't limited to - structural changes like adding columns, changing a filter value, or adding pivots.

Omni spreadsheets differ from Excel in the way that underlying data changes are "absorbed." For example, if you have a hardcoded reference for columns

A:D

and a new column (

) is added, only the query sheet will be updated to include the new column. The sheet containing the reference will have to be manually updated to

A:E

Let's take a look at another example, this time with a query that uses pivots.

1. Workbook query with filters & pivots

The image on the right displays the results of a query with two filters:

Category

- Only include specified product categories

Created At

- Only include records for the

past 3 complete years

The results of the query have been pivoted so that the table has columns for the years

, and

2. Query results sheet

This image displays the sheet in a spreadsheet tab associated with the

Sale Prices by Year

workbook query.

Notice that the years are in the

C, and

D` columns, which matches the results table in the actual workbook tab.

3. Reference query results data

This image displays a formatted sheet that references cells in the

Sale Prices by Year

sheet. Just like in the query results, this sheet contains a column for each year (or pivot).

For example, data for

is pulled from the

column in the

Sale Prices by Year

sheet.

4. Change filter in workbook query

Let's look at what happens to a sheet when the underlying structure of the query results changes.

In this example, the

Created At

filter has been changed to include only the

past 2 complete years

, resulting in the

column being removed from the query results.

5. Updated query results sheet

When query results change, the sheet associated with the query will automatically be updated. This image shows the updated

Sale Prices by Year

sheet in the spreadsheet tab.

Notice that it now only contains columns for

and

, which matches the results in the actual workbook tab.

6. Impact on query data references

In this last image, you can see what happened to the formatted sheet when the query results sheet it references changed. The references and formulas in the highlighted column are now incorrect.

When the query's filter included

the past 3 complete years

, the

column in the

Sale Prices by Year

sheet was populated. Because it was changed to

the past 2 complete years

, a column was removed and the data shifted to the left, leaving the

column empty.

Removing query data

You can remove workbook queries from a spreadsheet by unchecking them in the spreadsheet's settings panel.

Note

: When a workbook query is removed from a spreadsheet, the sheet referencing the query will also be removed. This doesn't delete the query from the workbook.

Saving your work

Changes in spreadsheet tabs aren't autosaved. Periodically save your work by clicking

Save Sheet

in the spreadsheet's

tab:

This button will be highlighted in blue when there are unsaved changes. Additionally, Omni will prompt you if you attempt to navigate away from the spreadsheet with unsaved changes.

Displaying spreadsheets on dashboards

tip

Spreadsheets on dashboards are currently read-only. To edit a spreadsheet, click

File > Edit

or the

Edit

button to open a draft of the document.

Spreadsheets can be included on a dashboard just like any other visualization. By default, Omni will only display the

first sheet

in the spreadsheet on the dashboard.

Including all sheets

To display all sheets on a dashboard, first open the spreadsheet's settings by clicking the

drawer icon

in the workbook's left navigation panel. Then in the

Dashboard settings

section, toggle

Show tab strip

When enabled, all sheets will display as tabs on the dashboard:

Changing sheet display order

By default, Omni will display the first sheet in a spreadsheet tab when a dashboard is viewed. You can change the sheet order by dragging sheets in the spreadsheet tab in the workbook. When finished, click

Home tab > Save Sheet

to ensure the changes are reflected on the dashboard.

Exporting spreadsheets

Spreadsheets can also be exported back to Excel. On a dashboard, hover over the right corner of a spreadsheet tile and click the ⠇ (three dots). Then select

Download XLSX

How it works

Limitations

Adding spreadsheets to workbooks

Migrating from the spreadsheet visualization

Adding data to spreadsheets

Connecting workbook queries

Importing existing CSVs & XLSX files

Manually entering data

Referencing query data

Creating formulas

Handling query changes

Removing query data

Saving your work

Displaying spreadsheets on dashboards

Including all sheets

Changing sheet display order

Exporting spreadsheets

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/workbook/spreadsheet-tabs](https://docs.omni.co/docs/querying-and-sql/workbook/spreadsheet-tabs) on 2025-07-23.*
