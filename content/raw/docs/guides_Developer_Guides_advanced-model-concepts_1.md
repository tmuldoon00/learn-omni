# Advanced model concepts

**Source URL:** [https://docs.omni.co/guides/Developer%20Guides/advanced-model-concepts](https://docs.omni.co/guides/Developer%20Guides/advanced-model-concepts)  
**Extracted:** 2025-07-23 21:45:27  
**Source:** Omni Analytics Documentation

---

On this page

While Omni aims to empower business users to contribute to the centralized data model, there are several features that are intentionally made unavailable in the UI. This section will cover topics that an Admin or Developer is explicitly responsible for maintaining in the data model as well as other helpful integrations to complement the broader data stack.

Row, column & topic security

In this tutorial, you'll explore how to implement robust security measures in Omni, including row, column, and topic-level security. Key features covered include:

Row-level security

: Apply access filters based on user attributes, enabling tailored data visibility. Admins can bypass these filters for comprehensive access.

User attributes

: Create and manage attributes that define user access levels, enhancing security and customization.

Column-level security

: Use required access grants to control visibility of specific fields or topics based on user eligibility.

Scalable configuration

: Set security parameters across the entire model efficiently, avoiding repetitive setups for individual datasets.

These features collectively ensure a secure and manageable data environment while promoting user-specific access to relevant information.

Caching policies & aggregate awareness

In this tutorial, you'll learn how to optimize performance in Omni through effective caching policies and aggregate awareness. Key features include:

Caching policies

: Define granular caching strategies at the shared, workbook, or topic level to control data refresh rates, enhancing performance and user experience. Set maximum cache ages to balance data freshness and cache hit rates, with the flexibility to refresh data on-demand.

Aggregate awareness

: Streamline query performance by routing traffic to pre-aggregated tables, reducing the need for expensive real-time calculations. This feature intelligently directs queries to the most efficient data sources, improving overall system efficiency.

By leveraging these tools, you can significantly enhance your data processing capabilities, ensuring users access both detailed and summarized information quickly and efficiently.

Embed row-level Security, SDK, & user attributes

In this tutorial, you'll discover how to leverage Omni for robust embedded analytics, emphasizing key features such as:

Row-level security

: Learn how to implement dynamic security measures that ensure users only access data relevant to them. This is facilitated through programmatically injected filters that maintain privacy across shared dashboards.

Customizable dashboards

: Explore how to create interactive dashboards embedded within your application, complete with drill-down capabilities, data export options, and customizable visualizations to enhance user engagement.

Self-service analytics

: Understand how to empower users with the ability to build their own reports and dashboards using an embedded workbook experience, while applying topic and column-level security for tailored data access.

Secure user sessions

: Dive into the technical aspects of secure session management using a TypeScript SDK, including unique session URLs and encrypted data transmission for enhanced security.

By harnessing these features, you can provide a powerful and secure analytics experience that scales efficiently for diverse user needs.

dbt integration

In this tutorial, we explore the powerful integration between Omni and dbt, focusing on three key pillars:

Seamless data sync

: Discover how Omni automatically absorbs new columns, tables, and updates from dbt, including view descriptions, ensuring users have the most current information without redundant effort.

Push changes to dbt

: Learn how to easily push new models and queries from Omni back to dbt. This feature streamlines the process of codifying your analytics logic directly into your warehouse setup, enhancing collaboration with existing dbt models.

Development environment access

: Understand how to point Omni to different dbt environments—like production and development—to preview changes before they go live. This functionality helps prevent downtime and breaking changes by allowing you to test and validate modifications in a safe environment.

Join us to see how this integration enhances your analytics workflow, ensures data accuracy, and supports a robust development lifecycle!

Branch mode

In this tutorial, we delve into Omni's branching feature within the modeling layer, which enhances collaborative development and workflow management.

Branch creation and management

: Learn how to create, rename, and manage branches within the shared model, ensuring changes are made in a contained environment before merging back to production.

Enhanced workflow with git integration

: Discover how Omni’s Git integration enforces a structured workflow where users must work in branches and submit pull requests, promoting best practices in development and reducing the risk of direct commits to the main branch.

Collective changes across workbooks

: Explore how to gather changes from multiple workbooks into a shared branch, making it easy to manage and merge isolated modifications into the main model seamlessly.

Join us to see how these features streamline collaboration, safeguard production environments, and foster efficient development cycles within your analytics workflows!

Row, column & topic security

Caching policies & aggregate awareness

Embed row-level Security, SDK, & user attributes

dbt integration

Branch mode

---

*This content was automatically extracted from [https://docs.omni.co/guides/Developer%20Guides/advanced-model-concepts](https://docs.omni.co/guides/Developer%20Guides/advanced-model-concepts) on 2025-07-23.*
