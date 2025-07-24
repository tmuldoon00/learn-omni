# Editing & publishing content

**Source URL:** [https://docs.omni.co/docs/finding-content/drafting-publishing](https://docs.omni.co/docs/finding-content/drafting-publishing)  
**Extracted:** 2025-07-23 21:44:18  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports two ways to create and modify content:

Drafts

Branch Mode

Drafts

Every Omni document has two states:

draft

and

published

. When you create a draft, you're creating a saved - but unpublished - version of a document, including its workbook and dashboard. You can make changes in the draft without impacting the live version of the document.

Publishing a draft creates a new, read-only version of the document, which is the version that users with access will see when they view the document.

Drafts are specific to documents and a document can only have one draft at a time. This makes drafts ideal for things like quick changes, such as adding a new chart or calculated field.

If you added a new field to a model, your workflow to add the field to documents might look like this:

Branch Mode

Content in branches is in beta

Content in branches

is currently in beta. Reach out to Omni support to have this feature enabled.

Note

: Using branches with models is available for all Omni instances.

If you're familiar with git - and it's okay if you're not! - branches in Omni are similar.

In Omni, a branch is an isolated space that allows you to modify a model and/or content without affecting the live versions, typically referred to as production. This enables you to experiment, update, and refine changes at your own pace.

Merging a branch immediately applies all changes in the branch to the live environment. It also publishes an updated version of any documents that were modified as part of the branch. The ability to stage changes across documents and the model that backs them makes branches ideal for bigger changes, such as adding a new field to visualizations in separate dashboards.

Let's go back to the example in the

drafts section

, where you added a new field to a model. If you use Branch Mode, your workflow might look like this:

Comparing drafts & branches

While both drafts and branches allow you to make changes without impacting live content, there are times when one approach may be a better fit. If you need some guidance, use the following table as a starting point:

Document drafts

Branches

Works with

One document at a time

Documents and the associated model

Useful for

Changes to a single document

- Changes to multiple documents

- Changes to a model and documents

Drafts

One per document at any given time

One per document, per branch

Required permissions

Editor or Manager content permissions for the document

- Querier or Connection Admin to create a branch

- Connection Admin to merge a branch

git integration

Not supported

Only commits model changes to git, but content changes are published when branches are merged

Getting started

Check out these guides to get started working with your Omni content:

Drafting & publishing content

Using Branch Mode

Drafts

Branch Mode

Comparing drafts & branches

Getting started

---

*This content was automatically extracted from [https://docs.omni.co/docs/finding-content/drafting-publishing](https://docs.omni.co/docs/finding-content/drafting-publishing) on 2025-07-23.*
