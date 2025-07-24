# Amazon Athena

**Source URL:** [https://docs.omni.co/docs/connections/database/athena](https://docs.omni.co/docs/connections/database/athena)  
**Extracted:** 2025-07-23 21:43:58  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Amazon Athena database to Omni.

Omni's Athena integration supports two types of authentication:

Access key

- Uses an IAM user to authenticate to Amazon Web Services (AWS) by providing Omni with the user's

Access key ID

and

Secret access key

Cross-account role

- Enables Omni services to assume an IAM role in your account

Requirements

To follow the steps in this guide, you'll need:

An existing Athena database

. Additionally, this database should have an S3 bucket configured to store query results. Refer to the

AWS documentation

to get started.

Omni Organization Admin permissions.

This is required to create the Athena connection in Omni.

Depending on the type of authentication you want to use, you'll also need permissions in AWS that:

Allow you to create access keys

Allow you to create IAM permission policies and roles

Option 1: Access key authentication

To use this method of authentication, you'll need to create an

access key

in the AWS console and then add it to the Athena configuration in Omni.

1. Create the access key in AWS

info

To complete this step, you need permissions in AWS that allow you to create access keys.

In the AWS console,

follow these instructions

to create an access key.

Note

: The key will only display once after it's created - make sure to copy it immediately.

2. Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

Amazon Athena

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

S3 Output Bucket

Required

. Enter the name of the Amazon S3 bucket in your account used to

store query results

for the Athena database. For example,

s3://blobs-r-us-ecommerce/

Data Catalog

Required

. Enter the name of the

data catalog

you want to connect to

in lowercase

. In the

Athena Query editor

, this is the

Data source

value:

In this example, you'd enter

awsdatacatalog

into the

Data catalog

field in Omni.

Include Other Data Catalogs

- Enter the names of other data catalogs you want to generate models for, in the format of

catalog1,catalog2

Include schemas

- To only include specific

schemas

, enter the names of the

schemas

as a comma-separated list. Leaving this field blank will allow Omni to access all

schemas

in the

database

Default schema

Required

. Enter the name of the default schema for the database.

Authentication Type

- Select

AWS Access Key

AWS Access Key ID

Required

. Enter the ID of the access key you created in

Step 1

AWS Secret Access Key

- Enter the secret access key of the access key you created in

Step 1

Database timezone

Required

. Select the timezone used by the database.

Query timezone

Required

. If specified, data will be converted from the

Database timezone

to this timezone when querying. Refer to the

Converting timezone data guide

for more information.

Allow User-Specific Timezones

- Check this option to allow individual users'

Query timezone

settings to be used as the query timezone for the connection.

Region

- Enter the AWS region the database is in. Defaults to

us-east-1

When finished, click

Create connection

Option 2: Cross-account role authentication

Cross-account role authentication allows you to specify an IAM role for Omni to assume when connecting to Athena.

1. Open the Athena setup page in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

Amazon Athena

Leave this page open for now - you'll need it in the next step.

2. Create an AWS IAM role

info

To complete this step, you need permissions in AWS that allow you to create IAM policies and roles.

2.1. Create an IAM policy

In this step, you'll create an IAM policy that grants the required permissions to the IAM role Omni will assume.

Sign into your AWS console.

Navigate to

IAM

, then click

Roles

in the left navigation.

On the page that displays, click

Create policy

In the

Policy editor

section, click the toggle to

JSON

In the policy editor, paste the following policy. Replace

<NAME-OF-ATHENA-QUERY-RESULTS-BUCKET>

with the name of the S3 bucket used to store Athena query results:

"Version"

"2012-10-17"

"Statement"

"Sid"

"BasePermissionsForAllS3Buckets"

"Effect"

"Allow"

"Action"

"s3:ListAllMyBuckets"

"s3:ListBucket"

"s3:GetBucketLocation"

"Resource"

"*"

"Sid"

"BaseAndQueryPermissionsForQueryResultBucket"

"Effect"

"Allow"

"Action"

"s3:GetObject"

"s3:ListBucket"

"s3:GetBucketLocation"

"s3:ListBucket"

"s3:ListBucketMultipartUploads"

"s3:ListMultipartUploadParts"

"s3:AbortMultipartUpload"

"s3:PutObject"

"Resource"

"arn:aws:s3:::<NAME-OF-ATHENA-QUERY-RESULTS-BUCKET>"

"arn:aws:s3:::*/*"

"Sid"

"GluePermissions"

"Effect"

"Allow"

"Action"

"glue:GetTables"

"glue:GetDatabases"

"glue:GetDatabase"

"glue:GetTable"

"Resource"

"*"

"Sid"

"AthenaPermissions"

"Effect"

"Allow"

"Action"

"athena:StartQueryExecution"

"athena:GetQueryResults"

"athena:GetQueryResultsStream"

"athena:ListDatabases"

"athena:GetQueryExecution"

"athena:ListTableMetadata"

"Resource"

"*"

Note

: If your data is stored in a separate bucket than the query results, you'll need to add an additional permissions block to the policy:

"Sid"

"S3AccessForDataBuckets"

"Effect"

"Allow"

"Action"

"s3:GetObject"

"s3:ListBucket"

"Resource"

"arn:aws:s3:::<NAME-OF-BUCKET-CONTAINING-DATA>"

"arn:aws:s3:::<NAME-OF-BUCKET-CONTAINING-DATA>/*"

Click

On the

Policy details

page, enter a name and description for the policy.

When finished, click

Create policy

2.2. Create the IAM role

In this step, you'll create the IAM role and attach the permissions policy you created in the last step to it.

You should still be in the

IAM

section of the AWS console. If not, navigate there.

Click

Roles

in the left navigation.

On the page that displays, click

Create role

Define the trusted entity for the role as follows:

Trusted entity type

- Select

AWS account

An AWS account

, click

Another AWS account

Account ID

field - Paste the

AWS Account ID

value from the Omni setup page

Options

, check

Require external ID

External ID

- Enter a placeholder value - we used

we-will-add-this-later

in the below image.

You will update this after you save the connection in Omni!

At this point, the page should look like this:

When finished, click

On the

Add permissions

page, locate and select the policy you created in the

previous section

Click

In the

Role details

section, enter a name for the role.

Review the selections and click

Create role

when finished.

After the role is created, open its details page in AWS and locate the

ARN

near the top of the page:

Leave this page open - you'll need it to complete the setup.

3. Create the connection in Omni

Navigate back to the Athena setup page in Omni and fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

S3 Output Bucket

Required

. Enter the name of the Amazon S3 bucket in your account used to

store query results

for the Athena database. For example,

s3://blobs-r-us-ecommerce/

Data Catalog

Required

. Enter the name of the

data catalog

you want to connect to

in lowercase

. In the

Athena Query editor

, this is the

Data source

value:

In this example, you'd enter

awsdatacatalog

into the

Data catalog

field in Omni.

Include Other Data Catalogs

- Enter the names of other data catalogs you want to generate models for, in the format of

catalog1,catalog2

Include schemas

- To only include specific

schemas

, enter the names of the

schemas

as a comma-separated list. Leaving this field blank will allow Omni to access all

schemas

in the

database

Default schema

Required

. Enter the name of the default schema for the database.

Authentication Type

- Select

AWS Cross Account Role

AWS Role ARN

- Paste the role ARN you retrieved in

Step 2.2

Database timezone

Required

. Select the timezone used by the database.

Query timezone

Required

. If specified, data will be converted from the

Database timezone

to this timezone when querying. Refer to the

Converting timezone data guide

for more information.

Allow User-Specific Timezones

- Check this option to allow individual users'

Query timezone

settings to be used as the query timezone for the connection.

Region

- Enter the AWS region the database is in. Defaults to

us-east-1

When finished, click

Create connection

Note

: After you save the connection, you'll likely see an error similar to

System message: AWS Role must be configured to check for an External ID

- don't worry! You're going to address this in the next step.

4. Add the Omni external ID to the IAM role

Navigate back to the AWS IAM role page.

On the role's details page, click the

Trust relationships

tab in the middle of the page:

Click

Edit trust policy

Locate the

sts:ExternalId

property. Replace its value with the

AWS External ID

value from the Omni setup page:

"Version"

"2012-10-17"

"Statement"

"Effect"

"Allow"

"Principal"

"AWS"

"arn:aws:iam::277577138649:root"

"Action"

"sts:AssumeRole"

"Condition"

"StringEquals"

"sts:ExternalId"

"<REPLACE-WITH-OMNI-EXTERNAL-ID>"

Click

Update policy

when finished.

Lastly, navigate back to the Omni setup page and click

Update and test connection

. At this point, the connection should return a

Success!

message.

Troubleshooting

Data & query results in different S3 buckets

Applicable if using cross-account role authentication.

If the S3 bucket containing your data is different than the bucket Athena is configured to use for query results, you may encounter an error in Omni.

Adding a block like the following to the

IAM permissions policy

can help resolve the issue:

"Sid"

"S3AccessForDataBuckets"

"Effect"

"Allow"

"Action"

"s3:GetObject"

"s3:ListBucket"

"Resource"

"arn:aws:s3:::<NAME-OF-BUCKET-CONTAINING-DATA>"

"arn:aws:s3:::<NAME-OF-BUCKET-CONTAINING-DATA>/*"

Requirements

Option 1: Access key authentication

1. Create the access key in AWS

2. Create the connection in Omni

Option 2: Cross-account role authentication

1. Open the Athena setup page in Omni

2. Create an AWS IAM role

3. Create the connection in Omni

4. Add the Omni external ID to the IAM role

Troubleshooting

Data & query results in different S3 buckets

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/athena](https://docs.omni.co/docs/connections/database/athena) on 2025-07-23.*
