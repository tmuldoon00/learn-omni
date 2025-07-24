# Model management

**Source URL:** [https://docs.omni.co/docs/modeling/manage-develop/model-management](https://docs.omni.co/docs/modeling/manage-develop/model-management)  
**Extracted:** 2025-07-23 21:44:28  
**Source:** Omni Analytics Documentation

---

On this page

Managing your models in Omni can be done through the workbook layer or the development IDE. This is made possible by Omni's layered approach to maintaining your data and allowing users to promote those changes to the different layers, i.e. model layer and workbook layer. We also offer a dbt integration that allows you to access that layer as well.

Users can model and query in the workbook model layer and leave all the content they create isolated to that workbook. If users want to make the changes in that workbook reusable and accessible to other users, the changes need to be promoted to the Shared Model. This action pushes the workbook model changes to the model layer and new workbooks will include the changes that were pushed.

Shared Model Promotion

Shared model promotion is an important facet of model editing within the workbook model layer. Shared model promotion pushes changes made in the workbook layer into the model layer so the changes are reusable and available in all workbooks. Model promotion can be done a number of ways depending on your workflow preferences:

Promote all changes

Promote all of your collective changes into the

Shared Model any time from the workbook

Model

menu option,

Promote to Shared

Incrementally promote workbook changes

Incrementally promote changes to the Shared Model by clicking on the branch icon to the left of the workbook. This is a handy feature for changes that are not quite ready to go live to the masses yet.

Note this option only works while making changes using

Branch Mode

. Learn more about Branch Mode.

Editing in the IDE

Edits made directly in the develop model IDE will be "Promoted to the Shared Model" as soon as the file is saved. For more structured development processes, explore the

branch mode

and

git integration

options.

Branch Mode

More structured than

document drafts

but less complex than the

git integration

, Branch Mode allows you to test changes to models and content before making them visible to your teammates.

By creating a separate space to experiment with updates, you can develop confidently without disrupting production data. This approach supports scalable and reliable workflows, reducing the need for reactive fixes while improving traceability and accountability in the development process.

Refer to the

Using Branch Mode for collaboration guide

for more information.

Content Validator

The Content Validator allows users to visualize broken content when the model or downstream database references inevitably change.

Access the model validator from the left-hand navigation in the model IDE. You can update content in bulk when those downstream dependencies change. Another bonus use case is you can use the validator to find all content that uses a certain field, view, or topic to understand how much something is being used before you update or remove it.

Updates can be pushed through across views (swapping the reference table), fields (swapping field references), or topics (moving queries between topics).  Updates can be pushed through one-by-one, or in bulk across all content.

Model Editing

Edit a Model in the Workbook Layer(Easy Mode)

The workbook allows users to not only explore data but it also allows users to create new model content like topics, relationships (joins), new fields, SQL views and fields, as well as promote those all from the workbook model layer back into the model layer.

Create a Topic

Topics curate the views that are joined together for exploring (querying) data in the workbook view.

Starting from your Omni app's homepage, click on the ** + New ** button in the top left corner of your Omni app's homepage.

Select the database connection you want to use. Now we have two options:

Create a new topic

Edit an existing topic

Create a new topic

At the bottom of the list of Topics, click on the

All Views * Fields

option in the Advanced section. This will show you the views and the fields in those views available in the model connection you chose.

Topic with a single view

In the view's menu, click on the

Modeling

option then choose

Make Topic

The topic is now available in this workbook model.

To promote this topic to the Shared Model, choose from an option outlined here. #ADD A LINK#

Topic with multiple views (Joins)

Hover over the view name that you want to set as the base view and click on the vertical three-dot icon that appears.

Click on the

Set as Base View

option. This hides the other views field picker menu.

After opening the view's menu and clicking on

Joins

there are two options:

a. Omni makes a suggested join, it's the option with the links icon to the left of the suggested view name.

Clicking on this option still opens up the

Join

modal but all of the join options are pre-populated based on inferred knowledge of the fields in the two views.

(Optional) Edit the choices in the parameter options.

Click

Update

b. Clicking on

+ New Join

opens up the Join modal. Walk through the field inputs in the pop-up modal to create a new join. Repeat this process for adding multiple joins back to the base view.

This method is only recommended for joins requiring one join condition in the

clause.

Choose the view to join from the

Choose right view

drop-down.

Click on the fields you want to join on.

Recommend choosing a field like a unique ID.

The default join type is a

Left

join but other join types like inner, full outer and cross joins are also available.

In the

Relationship (Advanced)

field can you can click on the

Infer Relationship

button in the bottom left of the modal. This will populate the assumed relationship into this field. Alternatively, if you know your join relationship choose one of the options from the drop-down.

We recommend only adding joins to your current topic. Use the

Add to all possible topics

option with caution as this may expose data in workbooks that should not be seen by certain users.

Edit an Existing Topic

Click on the topic you want to make edits to.

Make your desired model edits

Add in new joins.

Create custom fields.

Create table calculations (these can also be promoted to the Shared Model!)

Edit a Model in the IDE (Hard Mode)

Create Your First Topic

Find your model

Define relationships

Create your topic

Navigate to your Omni app's homepage.

Click on the ** + New ** button in the top right of your Omni app's homepage.

The next step is to define the relationships between the tables we want to inlcude in our topic. We recommend starting as simple as possible just to give you a good base on how modeling works in Omni.

It's important to select tables that contain unique IDs you can join on to prevent your aggregate values from fanning out.

For the last bit of modeling in this tutorial, let's create your first topic!

Quick tips

Joins

Topics

Workbook

Omni automatically adds joinable tables by default when you set up your connection.

Users can curate the list of joinable tables to add or remove specific tables.

New joins can be added to topics using the relationships file or custom joins per-topic basis.

Limiting the number of joined tables creates a cleaner Workbook exploration experience for your users.

Be sure to save your changes so they are visible in the Workbook view of the topic.

Apply a clear, customized name to topics making it easier for business users to navigate table and schema names.

Group related topics using group_label to make it easier to navigate a large number of topics.

Limit field accessibility

in each topic and

hide

ignore

fields in their views. This can be used to hide unnecessary or helper fields, which keeps views refined and relevant for all users.

Set up

default filters

always_where_sql

to ensure users have the correct defaults applied to their analyses.

Workbooks provide users with a versatile interface for querying data in their databases.

Users can explore and iterate on analyses without impacting the saved version. Exploration changes are not saved, and users can exit exploration to return to the latest version.

Workbooks consist of one or more tabs where users can query data using a UI-driven table experience.

Workbooks can be in either View or Edit mode. In View mode, users see the latest saved version, while in Edit mode, changes auto-save and impact attached dashboards.

Workbooks can be named and saved, appearing alongside other dashboards and workbooks in the content system. Unsaved workbooks can be accessed via the Activity section or URL.

Model History

Model history in the developer IDE allows users to see the changes made to the model and restore to an older version.

Explore & Compare Older Versions

The left-hand menu includes a chronological list of time-stamped changes. The detailed view to the right of the list of changes, compares the previous change to the currently selected version.

Restore an Older Version

Restore a previously saved version of your model files by navigating to the change you want to restore to.

Click

Preview restore

Compare the changes in all affected files.

Select

Restore this version

Refresh Schema

Omni strives to stay in lockstep with changes in the database layer below.  One of the more challenging experiences in BI management are when schema changes occur in the database layer, and this has only become more prevalent with dbt.

The shared data model exists in

two layers

, the schema model from the database and the user-generated, virtual fields that exist only in the Omni layer.  When Refresh Schema is selected from Model dropdown in the IDE, simple field references will be updated to reflect the current schema in the database (including objects like dbt views).  This means if columns or tables are added or removed, these changed would be reflected in the updated schema model.  Note these changes may result in invalid/broken references, but will be flagged by the model validator.

Schema refresh may be user-triggered or

automated on a schedule

Note that the schema refresh kicks off a job that runs in the background, so can take several minutes depending on size of database.  If schema updates do not appear instantly, give the refresh job a bit of time to complete.

Refresh Your Schema

You can refresh your schema(s) connected to Omni by selecting "Refresh Schema" from the Model dropdown in your model's IDE.

warning

The updates (if any) made by refreshing your schema may result in invalid/broken references, but will be flagged by the

model validator

Refreshing the schema updates field references to reflect current database schema changes, though this process is currently manual and may take several minutes to complete (depends on the size of your schema in the database). Automated scheduling for schema refreshes is planned for future implementation.

Refresh Schema with dbt

Refreshing to schema while connnected to dbt will mostly work the same as schema refreshes in isolation.  The current differences include:

Omni will search your schema for views that correspond to dbt models and add dbt metadata to them

Omni will optionally generate primary key definitions and relationships based on constraints

Export to dbt

We want to make model management easy both in Omni and below the BI layer.  To this end, we offer the ability to export a view file's dbt SQL.  This will allow users to build fact tables, or virtualized fields into their dbt models beneath Omni.

Currently this will require some rework of your Omni model, because new dbt views will then be populated into the model upon schema refresh.  This means field references would need to be remapped to maintain continuity.  In the future the intent is for this promotion to become button-click.

Shared Model Promotion

Branch Mode

Content Validator

Model Editing

Edit a Model in the Workbook Layer(Easy Mode)

Edit a Model in the IDE (Hard Mode)

Model History

Explore & Compare Older Versions

Restore an Older Version

Refresh Schema

Refresh Schema with dbt

Export to dbt

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/manage-develop/model-management](https://docs.omni.co/docs/modeling/manage-develop/model-management) on 2025-07-23.*
