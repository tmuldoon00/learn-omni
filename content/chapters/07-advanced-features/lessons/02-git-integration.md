# Integrate git for model version control

**Source URL:** [https://docs.omni.co/docs/integrations/git](https://docs.omni.co/docs/integrations/git)  
**Extracted:** 2025-07-23 21:44:22  
**Source:** Omni Analytics Documentation

---

On this page

Omni’s git integration allows you to sync an Omni model to a git repository (GitHub, GitLab, and Azure DevOps Server are currently supported). This is done on the model level.

Using a git integration provides added development benefits of storing backups of model files and using pull requests to create collaborative and peer reviewed changes. Additionally, it's possible to require pull requests, for those that want a more structured development lifecycle.

Enabling the git integration requires the use of

Branch Mode

for modifications to the Shared model, ensuring a structured and organized development process.

Limitations

A git repository and base branch can be linked to one model at a time.

Supported git providers

Omni's git integration currently supports the following git providers:

GitHub

GitLab

Microsoft Azure DevOps

Refer to the

git integration setup guide

to get started.

Configuration

After a git repository is connected to a model, Organization Admins can configure the integration's behavior by navigating to

Model > Git Settings

in the model IDE.

For example, pull requests aren't required by default. This can be changed using the integration's settings. Refer to the

git integration settings reference

for more information.

Limitations

Supported git providers

Configuration

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/git](https://docs.omni.co/docs/integrations/git) on 2025-07-23.*
