# Developing content & models with Branch Mode

**Source URL:** [https://docs.omni.co/docs/finding-content/drafting-publishing/branch-mode](https://docs.omni.co/docs/finding-content/drafting-publishing/branch-mode)  
**Extracted:** 2025-07-23 21:44:19  
**Source:** Omni Analytics Documentation

---

On this page

Content in branches is in beta

Content in branches

is currently in beta. Reach out to Omni support to have this feature enabled.

Note

: Using branches with models is available for all Omni instances.

More structured than

document drafts

but less complex than the

git integration

, Branch Mode allows you to test changes to models and content before making them visible to your teammates.

By creating a separate space to experiment with updates, you can develop confidently without disrupting production data. This approach supports scalable and reliable workflows, reducing the need for reactive fixes while improving traceability and accountability in the development process.

Branching in Omni

What's a branch?

If you're familiar with git - and it's okay if you're not! - branches in Omni are similar.

In Omni, a branch is an isolated space that allows you to make changes to a model and/or content without affecting the live versions, typically referred to as production. This enables you to experiment, update, and refine your changes before applying any modifications to the live environment.

Why use branches?

To demonstrate why branches are useful, let's look at an example that starts with a change to a shared model.

When changes are made directly to a shared model, the model's history might look like this:

The changes in this example were immediately applied to the model.

If a query had been using the modified field, its logic and results could have changed unexpectedly. These differences might not be noticed right away, potentially leading to incorrect conclusions or broken content.

Now consider this example, where changes to the model and impacted documents were made together in a branch:

In this example,

the branch contained updates to the field logic and impacted documents

. You could navigate to documents that use the field, open the branch, and make the changes required to ensure the updated data was correct.

When everything worked as expected, you would then merge the branch, applying the changes to the live version of the model and publishing new versions of the documents at the same time.

Want to learn more?

Check out

this blog post

to learn more about why traditional development practices - like branches - are useful for modern data teams.

What's the difference between a branch and a document draft?

Unlike a document draft which is specific to a single document, branches can include changes to a model and multiple documents. This makes branches especially useful for updating a model and any impacted content at the same time.

Branches shouldn't be thought of as entirely separate from document drafts - they act more as a layer of additional functionality on top of document drafts. When content changes are made in a branch, a draft of each modified document is attached to the branch. Publishing the branch publishes new versions of the documents.

Refer to the

Editing & publishing guide

for a detailed overview, including a comparison between drafts and branches.

Where can branches be used?

Branches can be used in the

model IDE

and documents.

Who can use branches?

Your

connection permissions

determine the level of access you have to branches:

View branches

Create branches

Merge branches

Viewer

Restricted Queriers

Queriers

Yes

Yes

Connection Admins

Yes

Yes

Yes

Note

Create branches

also includes the ability to make changes within a branch.

Do branches work with the git & dbt integrations?

Yes, but only for changes to models. If a branch includes content changes, those changes will not be pushed to the connected git repository. However, the drafts of the content will be published when the branch is merged.

When the

git

is configured for a connection, Branch Mode is required to make changes to the connection's models. The

dbt integration

uses branches to enable switching

dbt environments

Creating branches

note

Connection Admin

Querier

permissions are required to create branches.

In a workbook or the model IDE, click

Model > New branch

Model > Branch > New branch

When prompted, enter a name for the branch.

Want to group branches in the branch menu?

To group (or nest) branches in the branch menu, you can use forward slashes. For example, these branch names:

- add-new-topic

- field-updates/add-new-calc

- field-updates/rename-fields

- field-updates/update-field-def

- remove-topic

Would create this structure in the branch menu:

- add-new-topic

- field-updates

- add-new-calc

- rename-fields

- update-field-def

- remove-topic

Click

Create

A green and pink header will display at the top of the page, indicating that you're in the branch:

At this point, you can begin making changes.

Note

: If you created the branch in a workbook, you'll be automatically placed in a document draft.

Editing documents

info

Connection Admin

Querier

permissions are required to edit documents in branches.

Additionally,

Content in branches

is currently in beta. Reach out to Omni support to have this feature enabled.

To open an existing branch in a document, click

Model > Branch

and select your branch. You'll be placed in a draft and any changes will be auto-saved as you work.

You can add changes to the model associated with the document by opening the branch in the

model IDE

Moving drafts to branches

Branches can include changes to multiple documents. If the draft you want to move uses the same model as any documents in the branch, you can attach it to a branch.

To attach an existing draft to a branch:

Open the draft.

Click

File > Move to branch

Select the branch. The draft header at the top of the page will be updated to include the branch.

You can detach a draft from the branch at any time by clicking

File > Move to different branch > Detach from branch

in the workbook.

One draft per document, per branch

If a draft for a document is already attached to the branch, it will be overwritten if another draft for the same document is moved. For example, a branch has a draft for

Document A

attached to it. If a different draft for

Document A

is moved to the branch, the original draft will be overwritten.

The opposite is also true - if you detach a draft from a branch and the source document already has a draft, it will be overwritten. You'll be prompted to confirm the detachment when this occurs.

Viewing document changes

For every change you make in a document, an entry will be added to the

Draft changes

panel. Click

See changes

in the branch header or

View workbook changes

on the left side of the page to open the panel:

Note

: The

Draft changes

panel will only display changes for the current document.

Editing models

info

Connection Admin

Querier

permissions are required to edit models in branches.

To open an existing branch in the model IDE, click

Model > Branch

and select your branch.

Click

Save to branch

to add your changes to the branch:

While you're working, you may want to periodically see how your changes will impact documents. You can do this by

opening the branch in a workbook

Viewing staged model changes

Each time you save a change in the IDE, an entry will be added to the

Model history

panel. Open this panel to view the changes currently on the branch, as well as the before and after (also called a diff) of each change:

To view only the model files you've changed (and saved) in the branch, click the

Browse mode

dropdown in the file picker, then

Staged

. The IDE will update to filter out any unchanged files:

Publishing & merging branches

info

Connection Admin

permissions are required to merge branches.

After you've verified your changes work as expected, you'll need to merge the branch to apply them. The steps to merge a branch will vary if the git integration is enabled.

If the integration is enabled, you'll see a

Create pull request button

in the branch header:

Click this button to create a pull request in the connected git repository. The changes in the branch will be applied to production once the pull request is merged. If the branch includes content changes, the drafts of the impacted documents will be published.

If git isn't enabled or pull requests aren't required, follow these instructions:

In the branch header at the top of the page, click

Merge

You'll be prompted to confirm the merge.

Note

: Leaving the

Delete branch after merge

box checked is recommended.

Click

Merge branch

Branching in Omni

Creating branches

Editing documents

Moving drafts to branches

Viewing document changes

Editing models

Viewing staged model changes

Publishing & merging branches

---

*This content was automatically extracted from [https://docs.omni.co/docs/finding-content/drafting-publishing/branch-mode](https://docs.omni.co/docs/finding-content/drafting-publishing/branch-mode) on 2025-07-23.*
