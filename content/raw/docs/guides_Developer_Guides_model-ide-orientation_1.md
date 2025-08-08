# Model IDE orientation

**Source URL:** [https://docs.omni.co/guides/Developer%20Guides/model-ide-orientation](https://docs.omni.co/guides/Developer%20Guides/model-ide-orientation)  
**Extracted:** 2025-07-23 21:45:28  
**Source:** Omni Analytics Documentation

---

On this page

Omni does a lot of work on your behalf to understand how to navigate your database. This allows for both accelerated initial deployments and long term scalability as the underlying schema changes. You will notice that several files are automatically generated when you connect your database and initialize a data model. This section will walk through the different types of files in the model and orient you on how to use them.

Part 1: Model IDE basics

Start with learning about the key features of Omni's modeling IDE, which offers powerful tools for managing data models at scale.

In this video, you'll learn about:

Files in the IDE

, such as

models

relationships

topics

, and

views

Development tools

such as

branching

and

version control

The

content validator

, which identifies and fixes errors across dashboards and workbooks

The

dbt IDE

, which provides a read-only view of dbt projects

Part 2: Model files

Explore the powerful customization options within Omni's

model file

to curate experiences for your end users. Model files are used to define configuration for the analytical environment (topics, views, and so on) associated with a specific connection.

In this video, you'll learn to

Streamline navigation and reduce complexity by including and excluding schemas, views, and fields

Utilize

access grants

to restrict user access to topics and fields based on

user attributes

Balance performance and data freshness with

caching policies

Part 3: Relationships file

Enable your users to explore data without fear of disruption by utilizing the

relationship management file

. In this file, you can pre-define joins and automatically propagate them to workbook queries, thus removing the need for manual updates.

In this video, you'll learn to:

Define relationships between tables using Omni's YAML syntax and

the workbook

Specify

relationship types

and

direction

Create advanced custom joins with

SQL logic

table aliases

, and

filters

Part 4: View files

Define what users see when accessing tables in the workbook by customizing the table's

view file

In this video, you'll learn to:

Improve discovery with metadata such as

labels

, descriptions,

tags

, and field groups

Refine the data by adding filters and including or excluding specific

fields

Encourage deeper exploration with

drill fields

Part 5: Topic files

Curate an entire dataset by using

topics

, which allow you to organize and structure data around a specific area of interest or analysis.

In this video, you'll learn to:

Refine the dataset by specifying which

tables

and fields to include

Define pre-configured

filters

to apply to workbook queries

Improve

Blobby AI's

understanding of the topic by providing

context

Part 1: Model IDE basics

Part 2: Model files

Part 3: Relationships file

Part 4: View files

Part 5: Topic files

---

*This content was automatically extracted from [https://docs.omni.co/guides/Developer%20Guides/model-ide-orientation](https://docs.omni.co/guides/Developer%20Guides/model-ide-orientation) on 2025-07-23.*
