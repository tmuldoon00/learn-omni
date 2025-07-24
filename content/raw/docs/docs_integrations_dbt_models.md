# Working with dbt models

**Source URL:** [https://docs.omni.co/docs/integrations/dbt/models](https://docs.omni.co/docs/integrations/dbt/models)  
**Extracted:** 2025-07-23 21:44:21  
**Source:** Omni Analytics Documentation

---

On this page

Omni is great for building analyses

and

data models. Every time you construct a query - selecting columns, creating aggregations, applying filters, and adding joins - you're creating the building blocks of a model. While not every query needs to be pushed down to dbt, when you do create a query where you want to promote the logic into dbt, you can do so within Omni.

Omni also supports editing existing models. You can run and compile dbt SQL with Jinja references and config settings, allowing you to interact with data as you build and eliminate the need for manual SQL substitutions when referencing existing models. Models authored in Omni can then be materialized through existing dbt workflows without requiring complex warehouse permissions for schema ownership.

Requirements

To follow the steps in this guide, you'll need:

An Omni connection with a

configured dbt integration

Creating new dbt models from Omni queries

In a workbook, open the query you want to use to create the model.

Click

Model > Convert to dbt model

Omni will convert the query to dbt SQL. Use the SQL editor to build the model, periodically running the query to check that the data is as you expect.

When finished, click

Model > Push to dbt repo

In the

Push to dbt

dialog, modify the dbt file name, git branch, and commit message as needed, clicking

Push

when finished.

You'll be prompted to create a pull request in the dbt git repository. Complete the pull request process, following your organization's process.

After the pull request is merged, the new model can be integrated with existing CI/CD pipelines, approval flows, or other git-based automations. You can bring the model into Omni by

triggering a schema refresh

after the model is built in your warehouse.

Editing dbt models

note

Connection Admin

permissions are required to edit a dbt model using the steps in this section.

While the dbt IDE is currently read-only, you can edit existing dbt models in a workbook and push them back to the dbt repository. This can be useful for prototyping new dbt models, as it allows you to iteratively build and visualize the data.

Click

Develop

In the list of Omni models, click the model you want to edit. The IDE will open.

In the left navigation, click the

dbt icon

The dbt IDE will open. Use the file picker to select the dbt model you want to edit.

Once the model is open, click the

Open in workbook

button near the top right corner of the page:

The model will open in a new workbook. From here, you can the SQL editor to iterate on the model.

When finished, click

Model > Push to dbt repo

In the

Push to dbt

dialog, modify the dbt file name, git branch, and commit message as needed, clicking

Push

when finished.

After the model is rebuilt in your warehouse, you can bring in the updated version by

triggering a schema refresh

Requirements

Creating new dbt models from Omni queries

Editing dbt models

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/dbt/models](https://docs.omni.co/docs/integrations/dbt/models) on 2025-07-23.*
