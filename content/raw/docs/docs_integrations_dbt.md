# dbt

**Source URL:** [https://docs.omni.co/docs/integrations/dbt](https://docs.omni.co/docs/integrations/dbt)  
**Extracted:** 2025-07-23 21:44:21  
**Source:** Omni Analytics Documentation

---

On this page

Omni’s integration with dbt (both dbt Core and Cloud) embraces the idea that

models should be layered

, and it should be easy to move between the BI layer and dbt.

These are the features the dbt integration supports (and more coming soon!):

Schema refreshes to sync dbt changes

Pull dbt context and metadata into Omni such as descriptions, as well as foreign key constraints

Author dbt models from Omni queries

Dynamic schema switching

Connecting dbt to Omni

Refer to the

dbt setup guide

to connect your dbt repository to Omni.

Sync dbt changes with schema refresh

Schema refresh syncs downstream changes from dbt into your Omni model, pulling in field changes, new fields, new tables, etc. This eliminates the need to manually update the Omni model every time something changes in the layer below. To kick off a refresh, select 'Refresh Schema' from the IDE model menu, or use our

API endpoint

. Learn more about

schema refreshes here

Pull dbt context and metadata into Omni

info

Note: When column descriptions differ between your dbt instance and your data warehouse's catalog, Omni

prioritizes

dbt's column descriptions.

Pulling metadata from dbt into Omni makes it easier for analytics engineers, analysts, and business users to share context about what fields and tables mean, ensuring they're using the right things in their queries (and making tracing logic throughout the data stack very easy!). Omni pulls the following information from dbt:

dbt model and field descriptions are brought into the corresponding Omni view files. Descriptions also become viewable in the workbook field picker

dbt SQL code is brought into the corresponding Omni view files. This makes it easy to trace logic between the tools

dbt dependencies are also brought into the corresponding Omni view files

When the

Auto-generate primary keys and relationships from dbt constraints

box on the dbt settings page is checked, Omni will create relationships and primary keys on creation of the model

Working with dbt models

Refer to the

Working with dbt models

guide for more information about working with your dbt models in Omni.

Dynamic schemas

Dynamic schemas allow users to switch the environment that their dbt integration is pointing to within Omni. Users can easily switch between development and production environments to test changes made in the model and how they impact content. Users can...

Run the

content validator

while pointing at a dbt development schema to determine the possible impact ahead of merging changes.

Create new queries or create visualizations against the dbt dev schema to validate the model changes work as expected.

To switch schemas, users must be in

branch mode

. To switch schemas, modify the

Default Schema

in the branch.

dbt Environments

dbt Environments are used in Omni to instruct which underlying schemas the

omni_dbt

schema should be pointed at. Additional environments beyond the production environment, which you get by default when enabling the integration, can be added on the dbt Settings page for the connection. The connections will take in a few arguments:

Name: UI name for the environment that will appear when in use in Omni

Default Schema: The default schema where models will land if there are no overrides or customization to schema names for dbt models on the environment or profile

Database (optional): Allows a user to point an environment to a different database than the default database for the connection

Target Name (optional, often

prod

dev

): A variable often used to trigger decision trees in macros or other overrides in dbt based on the type of

dbt run

being executed. This should be left blank unless you know that your dbt code depends on it.

Target Role (optional): Allows a user to specify a target role for the

dbt run

, often used when dynamically switching databases per dbt developer. This should be left blank unless you know that your dbt code depends on it.

Variables: Used for pulling dbt dependencies or that are used to specify the database or schema where your models will be placed. Variable names must begin with DBT_

Getting Started with Dynamic Schemas and dbt Environments

When we hook up the dbt integration, Omni will create at least one

omni_dbt

schema. If you have schema overrides in place, are using custom schemas, or a

generate_schema_name dbt

macro, you can likely expect multiple

omni_dbt*

variants corresponding to the config schemas that you have set up in dbt.

The intended use of the dbt integration, is that you build all content and modeling in Omni on the

omni_dbt

schemas, while using the

ignored_schemas:

parameter in the model file to hide the physical schemas that the omni_dbt schemas are referencing. The benefit of building on these omni_dbt schemas is that we can point them to different dbt environments underneath the hood.

These should be configured in Omni to mirror dbt (e.g. Production environment with a target name of “prod”, a development environment for each developer schema, etc.). This allows you to point Omni to production tables and schemas when in production, while also easily swapping to a development environment view to see how tables look in that context and how your associated content may be impacted. This can be done in a branch within the model, and will then point the omni_dbt schemas there.

The core difference here is that you build on just one set of tables (with the omni_dbt prefix), rather than building two copies of a dashboard (one on public, the other on a development schema) and you can swap across the two seamlessly within a branch to see how things change and eliminate the duplication of work.

As a result, to use the environment switching you have to be built on something dynamic (the

omni_dbt*

schemas) to allow for that swapping under the hood rather than the static schemas in the db.

Migrating Existing Models to dbt Virtual Schemas

If you’ve already built a bit of content on your physical production schemas

and you want to get started using the

omni_dbt

virtual schemas, you can run

the dbt migrator. The dbt migrator will copy the existing logic from those

physical schemas to the

omni_dbt

schemas, as well as replicate any

relationships.

For example, if you have custom dimensions defined on top of a model such as

dbt__customers.view

, running the migrator will copy those dimensions into the

omni_dbt__customers.view

file.

You will still need to update your topics so they point to the new virtual

schemas, as well as use the content validator to cut over any content that is

referencing the raw table views.

The migrator can be found in the

dbt

tab within the connection's settings:

Common Troubleshooting:

I connected to dbt, but I don’t see the omni_dbt schemas / I see the omni_dbt schemas, but they are empty

When in a branch for a given environment, go to Model > Refresh Schema. If the schema folders are still empty, you should go and add a

to a table in each schema and check again.

Additionally, you should check that on the database connection page as well as the shared model file that you are not explicitly excluding the schemas that the service account may have permissions to, but are otherwise not showing up in Omni.

I see tables in my dbt schemas, but no dbt metadata

This is typically due to your dbt environment either not having the proper default schema name that aligns to dbt, or the proper target name for the environment.

I have a schema that has some tables from dbt and others from a different source. Why are these non-dbt tables in omni_dbt?

Essentially, since some parts of your schema are from dbt and others are not, we are picking up that dbt metadata exists in there, and then we are creating those

omni_dbt*

schemas for all tables within there.

The way that this works, is if there are config level schemas, they get dropped into

omni_dbt_<schema_name>

. If they don't have a config level schema, they just go into omni_dbt.

So, in this case we see there is dbt metadata in public, we grab the tables where there's the override and put them in their new omni_dbt_public  schema, and then when we go to get the other source tables we notice that their dbt metadata is blank. This makes sense, because they didn't come from dbt and have no concept of it. So, since they still need a home, they get plopped into omni_dbt which is the default.

Connecting dbt to Omni

Sync dbt changes with schema refresh

Pull dbt context and metadata into Omni

Working with dbt models

Dynamic schemas

dbt Environments

Getting Started with Dynamic Schemas and dbt Environments

Migrating Existing Models to dbt Virtual Schemas

Common Troubleshooting:

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/dbt](https://docs.omni.co/docs/integrations/dbt) on 2025-07-23.*
