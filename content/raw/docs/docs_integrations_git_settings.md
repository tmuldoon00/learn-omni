# Configuring git integration settings

**Source URL:** [https://docs.omni.co/docs/integrations/git/settings](https://docs.omni.co/docs/integrations/git/settings)  
**Extracted:** 2025-07-23 21:44:23  
**Source:** Omni Analytics Documentation

---

On this page

note

Organization Admin permissions are required to access and modify a model's git settings.

After a git repository is connected to a model, you can configure the integration's behavior by navigating to

Model > Git Settings

in the model IDE.

Test git connection

Clicking the

Test git connection

button will test the connection's

Deploy key

setup.

Note

: This doesn't currently test the repository's webhook setup.

Unlink git

To disconnect the repository from the model, click the

Unlink git

button.

Pull request settings

Base branch

Defines the target branch for Omni pull requests. Omni defaults this setting to main, but it may be different for your repository.

If you're unsure which branch is the default for your repository, check your repository's settings page:

GitHub

GitLab

Microsoft Azure DevOps

Pull request required

Enabling this setting will require all changes to the model to be made through a pull request. Otherwise, changes can be directly promoted to the shared model. If you're familiar with git, this is equivalent to committing changes directly to the repository's base (default) branch.

💡 Pull request reviews

For additional control, you can define rules in the git repository that require pull requests to be reviewed and approved before they're merged. Refer to the documentation for your git provider to learn more:

GitHub

GitLab

Azure DevOps

Require for system syncs

Some Omni actions, such as

schema refreshes

, API events, and model syncs, will automatically commit changes to the repository's

base branch

, making them visible in the shared model. Enabling the

Pull request required > Require for system syncs

setting will require that these actions are merged via a pull request.

To use this setting, the following settings must also be enabled:

Pull request required

Branch based schema refresh

for the connection associated with the model

Always create branches

When the

Create Omni branches for all pull requests

setting is enabled, pull requests in the connected repository will create a corresponding branch in Omni.

Deploy key

The

Deploy key

allows Omni to read from and commit to the connected git repository. Refer to the

git integration setup guide

to learn how to add the key to your repository.

Pull request webhook

The

Pull request webhook

settings allow Omni to be notified when pull request-related actions are taken in the repository. This is required to keep your git and Omni branches in sync. Refer to the

git integration setup guide

to learn how to add the webhooks to your repository.

Test git connection

Unlink git

Pull request settings

Base branch

Pull request required

Always create branches

Deploy key

Pull request webhook

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/git/settings](https://docs.omni.co/docs/integrations/git/settings) on 2025-07-23.*
