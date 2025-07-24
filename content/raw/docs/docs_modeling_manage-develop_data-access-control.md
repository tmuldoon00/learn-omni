# Controlling data access

**Source URL:** [https://docs.omni.co/docs/modeling/manage-develop/data-access-control](https://docs.omni.co/docs/modeling/manage-develop/data-access-control)  
**Extracted:** 2025-07-23 21:44:27  
**Source:** Omni Analytics Documentation

---

On this page

Using a combination of

user attributes

and modeling parameters, you can control how data is accessed in your Omni models. To gain access to data - such as a topic, table, field, or row - users must have a user attribute with the required value.

Omni supports two approaches to managing data access through the modeling layer:

Loading data...

Requirements

To follow the steps in this guide, you'll need permissions in Omni that allow you to:

Edit models

Create and/or edit

user attributes

Granting topic & field access with access grants

To apply an access grant, the first step is to create an

access_grant

in the model file. You'll need to specify a

user_attribute

to use and the

allowed_values

that are necessary to gain access under the grant.

For example, the

nw_region

access grant will grant access to users with a

region

user attribute that has a value of

washington

idaho

oregon

wyoming

, or

alaska

Model file

access_grants

nw_region

user_attribute

region

allowed_values

washington

idaho

oregon

wyoming

alaska

finance

user_attribute

omni_user_groups

allowed_values

Finance

marketing

user_attribute

omni_user_groups

allowed_values

Marketing

Default access grants can also be applied to a model

, ensuring all new topics have access grants applied unless specifically excluded.

Omni system attributes in access grants

Omni system attributes

can be used in access grants. In the following example, the

omni_is_org_admin

attribute is used to control the topics that are accessible only to Admin users.

Model file

access_grants

omni_admin

user_attribute

omni_is_org_admin

allowed_values

"true"

default_topic_required_access_grants

omni_admin

# Apply omni_admin grant to all topics in model

Topic access grants

After an access grant is created in the model file, you can use

required_access_grants

in topic files to apply specific access grants to individual topics:

Topic file

joins

distribution_centers

required_access_grants

marketing

finance

Note

: The values specified in

required_access_grants

must match an existing

access_grant

in the model file.

Default access grants for topics

Using

default_topic_required_access_grants

in the model file allows you to set a default required access grant for all topics contained in the model, unless others are applied. In the following example,

finance

will be the default access grant for the topics in the model:

Model file

default_topic_required_access_grants

finance

access_grants

nw_region

user_attribute

region

allowed_values

washington

idaho

oregon

wyoming

alaska

finance

user_attribute

omni_user_groups

allowed_values

Finance

marketing

user_attribute

omni_user_groups

allowed_values

Marketing

In this topic, the default

finance

access grant will be used because a

required_access_grants

isn't defined:

products topic

joins

distribution_centers

Overriding default topic access grants

You can override a

default topic access grant

if needed:

To allow all users to see a topic

, add a blank

required_access_grants

parameter:

order_items topic

label

Transactional

joins

inventory_items

products

distribution_centers

users

required_access_grants

# doesn't use an access grant

To override the default and use a different access grant

, add a

required_access_grants

parameter and include the access grant you want to use:

users topic

joins

required_access_grants

marketing

# uses only the marketing access grant

Table (view) access grants

To apply an access grant to a table (

database view

), use the

required_access_grants

parameter in a view file:

View file

required_access_grants

finance

dimensions

margin

sql

order_items.sale_price

products.cost

Field access grants

If you need to restrict access to specific fields instead of an entire view, you can apply access grants to individual

dimensions

and

measures

with the

required_access_grants

parameter:

View file

dimensions

margin

sql

order_items.sale_price

products.cost

format

CURRENCY

description

margin = sale price

cost

required_access_grants

finance

measures

sensitive_measure

sql

orders.sale_price

* $

fancy_formula

aggregate_type

sum

required_access_grants

finance

Conditional access grants

You can also conditionally allow access when specifying

required_access_grants

by using pipes (

) and commas (

) to create

and

AND

conditions, respectively.

Grant access if either condition is met

required_access_grants

finance

marketing

Grant access if either set of conditions are met

# Grant access if conditions are met for:

# marketing

# OR

# finance AND nw_region

required_access_grants

marketing

finance

nw_region

Conditional syntax can be used anywhere the

required_access_grants

parameter is supported.

AccessBoostable access grants

By default, access grant checks will restrict query access even if

AccessBoost

is enabled on a dashboard. For content built on topics or views that use access grants, you'll need to add an

access_boostable: true

property to the grant to enable permission boosting via AccessBoost:

Model file

access_grants

omni_admin

user_attribute

is_marketing_member

allowed_values

"true"

access_boostable

true

Granting row-level access with access filters

Row-level permissions are specified at the topic level with the

access_filters

parameter or at the model level with the

default_topic_access_filters

parameter.

Like access grants, access filters use

user attributes

to determine if a user should have access to the data in a given row. You can also

selectively permit access for users

if needed.

Fields in a topic

Use the

access_filter

parameter in a topic file to specify a list of fields in the topic where access should be limited.

In this example, the

order_items

topic will be filtered so that each brand can only see their own transactions and the associated metadata for each transaction.

order_items topic

joins

orders

user

inventory_items

products

access_filters

field

products.brand

# field to use in the filter, specifies the product's brand

user_attribute

customer

# user attribute to match to

values_for_unfiltered

is_admin

Under the hood, any query would require a join to

orders

inventory_items

products

and use a filter like the following, which limits access to rows with a

brand

value that matches the user attribute:

WHERE

products

brand

the_value_in_user_attribute_customer

Default access filters for topics

Using

default_topic_access_filters

in the model file allows you to set default access filters for all topics contained in the model, unless others are applied. In the following example, an access filter for the

products.brand

field is defined:

Model file

default_topic_access_filters

field

products.brand

user_attribute

customer

In this topic, the default access filter will be used because no

access_filters

are defined:

order_items topic

joins

orders

user

inventory_items

products

Note

: If a default access filter can't be mapped to a given topic, an error like the following will display in the model IDE:

No such access filter field "brand" (resolved to "main__users.brand") specified in default_topic_access_filters

Apply the following to the topic to avoid this:

order_items topic

access_filters

Default access filters with unscoped table references

default_topic_access_filters

can also be applied with an unscoped table reference, allowing for a common field across multiple tables to be applied universally with ease.

The following example demonstrates how to apply an

access_filter

for the

user_id

field to both the

order_items

and the

users

topics, allowing for a more generalized approach:

Model file

default_topic_access_filters

field

user_id

user_attribute

user_id

values_for_unfiltered

is_admin

In the

order_items

topic, which includes a

user_id

field:

order_items topic

joins

orders

users

inventory_items

products

In the

users

topic, which includes a

user_id

field:

users topic

joins

orders

users

Permit access for specific users

There may be situations where you want to generally restrict data for a field, but still allow specific users like Admins to access all data for the field. To achieve this, you can set a special value for the user's user attribute and then specify it in the access filter with the

values_for_unfiltered

parameter:

access_filters

field

products.brand

user_attribute

customer

values_for_unfiltered

is_admin

In this example, the access filter won't be applied to users who have a

customer

user attribute with a value of

is_admin

Note

: Users who don't have a defined value for the user attribute - in this case,

customer = null

will receive an error. Omni expects a value for any assigned access filter.

Requirements

Granting topic & field access with access grants

Omni system attributes in access grants

Topic access grants

Default access grants for topics

Table (view) access grants

Field access grants

Conditional access grants

AccessBoostable access grants

Granting row-level access with access filters

Fields in a topic

Default access filters for topics

Permit access for specific users

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/manage-develop/data-access-control](https://docs.omni.co/docs/modeling/manage-develop/data-access-control) on 2025-07-23.*
