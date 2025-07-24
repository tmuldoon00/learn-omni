# Connecting databases using AWS PrivateLink

**Source URL:** [https://docs.omni.co/docs/connections/manage/aws-privatelink](https://docs.omni.co/docs/connections/manage/aws-privatelink)  
**Extracted:** 2025-07-23 21:44:05  
**Source:** Omni Analytics Documentation

---

On this page

If your database is in a private network within Amazon Web Services (AWS), Omni can connect to your database via PrivateLink. In this configuration, Omni establishes an encrypted connection from our network to your network via a VPC endpoint.

Note:

At this time

Redshift managed VPC endpoints

are not supported by Omni, only regular VPC endpoint services.

This option will require some configuration within your AWS account to allow Omni to connect to your database.

Requirements

To follow the steps in this guide, you'll need permissions in AWS that allow you to create VPC endpoint services.

Step 1: Complete AWS setup

In your AWS account, set up a VPC endpoint service that connects to your database:

Allow access to our account principal:

arn:aws:iam::767117061426:root

Enable cross-region access and allow access to the regions of your Omni environment:

EastUsa =

us-east-1

(primary) and

us-west-2

(disaster recovery)

Ireland =

eu-west-1

(primary) and

eu-central-1

(disaster recovery)

Australia =

ap-southeast-2

(primary) and

ap-southeast-4

(disaster recovery)

Canada =

ca-central-1

(primary) and

ca-west-1

(disaster recovery)

Step 2: Contact Omni support

Contact Omni support with the following information:

The name of your VPC endpoint service, for example

com.amazonaws.vpce.REGION.vpce-svc-XXXXXXXXXX

The port your database will be listening on

Technical contact details, in case of connection difficulties

Omni will create a VPC endpoint connecting to your service to support the connection to your database. If your service requires manual approval of new endpoint connections, we will contact you to request approval.

Once this is complete, Omni support will add the new database connection to your Omni instance.

Requirements

Step 1: Complete AWS setup

Step 2: Contact Omni support

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/manage/aws-privatelink](https://docs.omni.co/docs/connections/manage/aws-privatelink) on 2025-07-23.*
