# Model generation

**Source URL:** [https://docs.omni.co/docs/modeling/manage-develop/model-generation](https://docs.omni.co/docs/modeling/manage-develop/model-generation)  
**Extracted:** 2025-07-23 21:44:27  
**Source:** Omni Analytics Documentation

---

On this page

Models are automatically generated after a

database connection

is added. Each model is divided into two layers:

The

schema model

that stays in sync with raw database tables and views, and

The

model extension

, where user-defined, virtualized data models live in Omni. Think fields, joins, and additional metadata such as formats, descriptions, and so on.

Schema Model

The schema model is intended to serve as a baseline version of the database schema, for simple point and click query, and some inferred key relationships. The schema model is not editable to users (more below in

model extension

). To refresh the schema to bring to live, simply hit the 'refresh schema' inside the given schema model:

Note that even when deleting / ignoring schema fields, they will still be available from direct SQL to users with permission to query open SQL.

Model Extension

The model extension is the core user-curated data model in Omni. Fields, joins, and other metadata extend / supplement the schema model. To "delete" raw schema fields from the model, simply ignore them in the model extension

more here

In addition to entirely new fields and relationships, schema fields can be extended with new metadata - formatting, labels, or 'deleting' (via

ignored:true

To see both schema model and the model extension together, simply toggle 'Combined Model'. Note edits can be made in the combined model and will be tucked into the model extension, for example ignoring 'deleted' schema fields.

Schema Model

Model Extension

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/manage-develop/model-generation](https://docs.omni.co/docs/modeling/manage-develop/model-generation) on 2025-07-23.*
