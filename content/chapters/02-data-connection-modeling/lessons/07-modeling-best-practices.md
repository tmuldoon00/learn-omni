# Best Practices

**Source URL:** [https://docs.omni.co/guides/best-practices](https://docs.omni.co/guides/best-practices)  
**Extracted:** 2025-07-23 21:45:30  
**Source:** Omni Analytics Documentation

---

On this page

This guide covers best practices, tips, and tricks to keep your model clean and your environment intuitive to navigate for your entire organization. We leaned on our team’s experience building across many customers, so we hope it can provide a helpful starting place as you build. Let us know if you have questions about anything not covered here, as we will continue to update and improve this guide!

Use labels to organize and verify content

Curate the homepage

by setting tags to display on the “Homepage”

Signal to users which content should be trusted by

marking as verified

Have users

favorite

content

Creating tailored content and workflows for users

Build Dashboards for specific use cases + set of users (don’t try to do too much on a single dashboard!)

Make dashboards look good

Simplify Axis Labels

Create a unified color scheme

KPI tiles or headers go a long way. Try the built in

KPI

vis or customize with

markdown

Take advantage of markdown visualizations to create customized dashboards including

nice headers

data readouts

or something

custom

Reach out to Omni for additional ideas or inspiration

Build in workflows to get additional data as needed:

Define drill fields on measures to allow users to “drill deeper” into data. We recommend defining

default_drill_fields

for each view so that you won’t need to specify for each measure.

Utilize

links

and

embedding

to get data in front of users where they need it. Links can be really helpful to create workflows between dashboards or jump out to external applications. Embedding options allow you to bring other applications into Omni dashboards or embed omni into external applications to bring data in front of users where they need it most.

Don’t rely on users navigating to a dashboard, set up a

scheduled delivery

to get data in front of users regularly.

Encouraging self service

Topics are a mechanism for creating reusable environments and are especially valuable to encourage self service. Best practices when creating topics:

Consider what sorts of questions the users you are onboarding are likely to have, and whether you have an appropriate topic set up for them to do so. Starting with the core datasets each team cares about and what the most common questions you answer for them will help you prepare the environment.

We typically recommend several smaller topics rather than one big topic. This can help for both usability and performance.

For most topics, you’ll want to have your base table be the one that’s the most granular, then join out with many-to-one or one-to-one joins.

Avoid many-to-many joins if possible. Instead consider creating multiple topics or pre-aggregating one side of the join.

Don’t overpopulate the shared model. Again, start by defining the basics you know will be used and add additional fields and logic as requests come in over time. Leave one-off definitions in workbooks if they won’t be re-used in other workbooks.

Organize your topics to help users understand where to go and how to find what they need.

group_label

on the

field

and

topic

level are tools to help you organize.

Translate database columns/tables to language familiar to users using

label

and

description

hidden

ignored

, and

field

parameters can be used to limit the fields and not overwhelm users

Set up

default_filters

always_where_sql

to ensure users have the correct defaults applied to their analyses / avoid querying excessive volumes of data on large tables

General development

Promote common or frequently used logic to the shared model. The general rule of thumb for promotion is whenever you’re utilizing the logic in several workbooks and that logic is non-trivial, that’s a good signal to promote to the shared model. On the flip side, keep logic that is specific to a single dashboard in the workbook rather than polluting the shared model.

Utilize the semantic model for repeatable patterns and self-service exploration. For one-off cases or patterns involving subqueries and window functions, it might be quickest and easiest to write a query in SQL. Otherwise, we recommend breaking down common SQL queries and building reusable patterns into the model. While it might take extra time upfront, the pay off in maintenance and reusability over time can be huge.

Utilize Omni field references (e.g.

${field_name}

) rather than the raw table name whenever possible. This helps simplify maintenance by only needing to update the field in one place, should the underlying column name or logic change.

Utilize

filtered measures

when possible rather than writing a case when directly in the SQL of a measure. This allows Omni to pass through filters on drill fields.

Use

ignored_schemas

included_schemas

, and

ignored_views

to define relevant schemas and tables in Omni.

Push heavy queries into the database (both long running and queries performing large transformations) using a transformation or orchestration tool like

DBT

Set up the

dbt integration

if you're currently using dbt. This will allow you to pull through descriptions for views and fields you may already be setting, as well as table config information into Omni that can be viewed in the IDE. You can also push back net new dbt models from the workbook for a bi-directional workflow

Administration

Use the principle of least privilege for your Omni permission structure. When a user has a different level of permissions compared to the connection default, the more permissive level wins. Thus, if concerned about security it is best to leave the connection default at a low level of permissions such as viewer or restricted querier and give individuals or groups increased levels of access.

Leverage user groups to make permissioning and implementation of user attributes easier to manage

Make it easy to get help: if you don’t already have one, we highly recommend having an internal Slack/Teams channel for people to ask analytics-related questions (and see each others’ questions), or at least a clear process of where and how to get help around data.

A little documentation goes a long way: pulling together a quick description of what data sources are available in Omni and what the topics are can be really helpful. We’ve seen this done successfully in anything from Notion/Confluence to Google Docs.

Content Organization and Permissions

These are suggestions on possible implementations of content permissioning that may suit your organization. There are many possible combinations of how to apply permissions to your organization’s content.

This table provides a quick comparison of best practices for content sharing within closed, open with restrictions, and very open systems across different aspects of file organization, permissions, and sharing.

Closed System

Open System with Restrictions

Very Open System

File Naming

Utilize clear, descriptive names

Maintain clear and organized names

Prioritize descriptive, standardized names

Content Organization

Hub:

Organization-wide sharing

Hub:

Open visibility, restrictions on modification

Hub:

Maximum transparency, open access

Shared with me:

Directly shared content

Shared with me:

Restricted access to direct shares

Shared with me:

Open access to shared content

Content Permissions

Roles:

most users and content in this system are assigned Viewer roles. Editor and Manager roles are assigned with caution.

Roles:

most users and content in this system are assigned Viewer roles. Editor roles are assigned more liberally. Manager roles are still assigned to users and content with caution.

Roles:

users in this system can have any role with little to no caution.

AccessBoost:

Use with extreme caution. Content and users that have this enabled will be able to access all data on dashboards irrespective of their assigned roles as a user or the permission role on the dashboard.

AccessBoost:

Cautious use

AccessBoost:

can be used

Setting Permissions for Users or Groups

Explicitly opted-in users/groups

Permissions based on project teams

Promote a culture of collaboration

Default Permissions

Defaults to Viewer at the organization level

Defaults to Editor at the organization level

Defaults to Editor or Manager at the organization level

Audit and update content permissions regularly

Periodic training on permission management

Loose content permission regulations

Best Practices

Cautiously selected opt-ins

Moderate restrictions

Very open with maximum transparency

Use labels to organize and verify content

Creating tailored content and workflows for users

Encouraging self service

General development

Administration

Content Organization and Permissions

---

*This content was automatically extracted from [https://docs.omni.co/guides/best-practices](https://docs.omni.co/guides/best-practices) on 2025-07-23.*
