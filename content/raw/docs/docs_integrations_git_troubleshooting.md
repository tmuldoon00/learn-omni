# Troubleshooting git settings

**Source URL:** [https://docs.omni.co/docs/integrations/git/troubleshooting](https://docs.omni.co/docs/integrations/git/troubleshooting)  
**Extracted:** 2025-07-23 21:44:24  
**Source:** Omni Analytics Documentation

---

On this page

Git push failed

Github

If you are receiving the error

Failed to sync git repo

Git push failed; status: REJECTED_OTHER_REASON, message: protect branch hook declined

This is most likely due to the branch protection settings applied to your base branch (the target branch Omni tracks for pull request webhooks).

If you want to require pull requests for your Omni git repo, there are most likely 2 ways in which you want Omni to operate with Git.

Give Omni has to be able to force push schema changes. But approval for pull requests made by users.

Require Omni to go through the pull request process for all schema refreshe by turning on Require system syncs as in the below screenshot.

[Option 1] Allow schema refreshes to bypass pull-requests but users

In the git settings for your shared model, set the

Require pull request

In the git repo's settings add a Github ruleset to require pull requests. Select the the rules

Require pull request before merging

Block force pushes

and

Restrict Deletions

On the same ruleset's settings, add a bypass to the bypass list.

Now the pull requests are required for all user generated pull requests but changes made with schema refreshes will be force pushed to your repo.

[Option 2] Require pull requests for all changes

In the connection settings for your model, enable the

Branch Based Schemas Refresh

setting.

In the git settings for your shared model, set the

Require pull request

and the

Require for system syncs

setting.

In the git repo's settings add a Github ruleset to require pull requests. Select the the rules

Require pull request before merging

Block force pushes

and

Restrict Deletions

. To not add anything to the bypass list.

Git push failed

Github

[Option 1] Allow schema refreshes to bypass pull-requests but users

[Option 2] Require pull requests for all changes

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/git/troubleshooting](https://docs.omni.co/docs/integrations/git/troubleshooting) on 2025-07-23.*
