# Omni content migration APIs

**Source URL:** [https://docs.omni.co/docs/API/content-migration](https://docs.omni.co/docs/API/content-migration)  
**Extracted:** 2025-07-23 21:43:34  
**Source:** Omni Analytics Documentation

---

On this page

These APIs are in beta

The

content migration

APIs are in beta and may have future breaking changes.

The content migration APIs allow you to programmatically migrate content from one Omni model to another, either within the same environment or from one environment to another.

Looking for something more step-by-step?

Check out the

Migrating dashboards guide

Limitations

Currently, the APIs do not support:

Workbooks without

dashboards

Workbooks using

query views

Heads up!

The content migration APIs are for

content migration only

. They do not support the underlying modeling that supports a dashboard.

Export a dashboard

Exports a dashboard from an Omni instance.

GET /api/unstable/documents/:dashboardId/export

curl -L 'https://myorg.omniapp.co/api/unstable/documents/12db1a0a/export' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Note

: All parameters must be provided as query parameters.

Parameter

Type

Required

Default

Description

dashboardId

string

Yes

n/a

The ID of the dashboard to be exported. This can be retrieved by:

Opening the dashboard settings

. Navigate to

File > Document settings

in the dashboard and then click

Settings

. The

Identifier

field

contains the dashboard ID.

Using the dashboard's URL

. The string after

/dashboards

is the dashboard's ID; for example:

https://myorg.omniapp.co/dashboards/12db1a0a

Response

200 OK

Successful requests will return a 200 OK status and a response body with the following structure:

200 OK

"dashboard"

...

"document"

...

"exportVersion"

"0.1"

"workbookModel"

...

View full example

200 OK

"dashboard"

"dashboardCustomTheme"

null

"facetFilters"

false

"id"

"18811d32-c6ef-48f5-ad86-d740d09b356c"

"organizationId"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"queryPresentationCollection"

"filterConfig"

"filterConfigVersion"

"filterOrder"

"id"

"028d3c99-57ba-4392-a96f-c063a8aa84df"

"queryPresentationCollectionMemberships"

"queryPresentation"

"id"

"f9467f90-b430-4381-b6b3-03436398421a"

"createdAt"

"2025-01-28T18:31:04.736Z"

"updatedAt"

"2025-01-28T18:31:04.736Z"

"type"

"query"

"name"

"Total Sales"

"description"

"organizationId"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"queryId"

"ee956bf5-cd5a-4d07-bb3b-6c4d54829b96"

"miniUuid"

"nY8mm3PM"

"modelId"

"7155f419-a071-405c-8426-b4b5d3939049"

"prefersChart"

true

"automaticVis"

true

"visConfigId"

"b1199b6c-5673-4b34-9ef6-552484e712b0"

"topicName"

"order_items"

"viewName"

null

"renamed"

true

"filterOrder"

"isSql"

false

"resultConfig"

"query"

"id"

"ee956bf5-cd5a-4d07-bb3b-6c4d54829b96"

"createdAt"

"2025-01-28T18:31:04.722Z"

"jsonHash"

"LBI8eliIlOJSszt2Hy8vb6lFP3rK9/zSQOJVY4vNBpg="

"modelId"

"7155f419-a071-405c-8426-b4b5d3939049"

"queryJson"

"limit"

"sorts"

"column_name"

"order_items.created_at[day_of_week_name]"

"sort_descending"

false

"table"

"order_items"

"fields"

"order_items.created_at[day_of_week_name]"

"order_items.sale_price_sum"

"pivots"

"dbtMode"

false

"filters"

"order_items.delivered_at"

"kind"

"TIME_FOR_INTERVAL_DURATION"

"type"

"date"

"left_side"

"6 months ago"

"right_side"

"6 months"

"is_negative"

false

"modelId"

"7155f419-a071-405c-8426-b4b5d3939049"

"version"

"controls"

"id"

"nh7Rwbw0"

"kind"

"FIELD"

"type"

"FIELD_SELECTION"

"field"

"order_items.sale_price_sum"

"options"

"label"

"Sale Price Sum"

"value"

"order_items.sale_price_sum"

"metadata"

"model_id"

"0121b79b-3706-4d29-b2da-8e307e72dc78"

"rewriteSql"

true

"row_totals"

"fill_fields"

"calculations"

"column_limit"

"join_via_map"

"column_totals"

"userEditedSQL"

"dimensionIndex"

"default_group_by"

true

"query_references"

"custom_summary_types"

"join_paths_from_topic_name"

"order_items"

"visConfig"

"id"

"b1199b6c-5673-4b34-9ef6-552484e712b0"

"createdAt"

"2025-01-21T17:49:52.350Z"

"visType"

"omni-kpi"

"chartType"

"kpi"

"jsonHash"

"FEkaJm9fFbjYfgb+1ryb82FNf3VozU0eUqidVzybWf0="

"spec"

"alignment"

"left"

"fontKPISize"

"fontBodySize"

"fontLabelSize"

"markdownConfig"

"id"

"88570cff-0bba-42ff-9181-126b9dca5476"

"type"

"number"

"config"

"field"

"row"

"_first"

"field"

"name"

"order_items.sale_price_sum"

"pivotMap"

"label"

"value"

"Sale Price Sum"

"descriptionBefore"

"lastModified"

"id"

"203dce1b-c18c-408e-915b-504cffdbf490"

"type"

"comparison"

"config"

"field"

"row"

"_first"

"field"

"name"

"order_items.sale_price_sum"

"pivotMap"

"label"

"value"

"comparison"

"row"

"_second"

"field"

"name"

"order_items.sale_price_sum"

"pivotMap"

"label"

"value"

"Sale Price Sum"

"colorNegative"

"colorPositive"

"comparisonType"

"percent"

"descriptionAfter"

"descriptionBefore"

"from"

"lastModified"

"verticalAlignment"

"top"

"fields"

"order_items.created_at[day_of_week_name]"

"order_items.sale_price_sum"

"queryPresentationCollectionId"

"028d3c99-57ba-4392-a96f-c063a8aa84df"

"refreshInterval"

null

"updater"

"id"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"name"

"Sales Blob"

"metadata"

"layouts"

"lg"

"h"

"i"

"nY8mm3PM"

"w"

"x"

"y"

"moved"

false

"static"

false

"textTiles"

"hiddenTiles"

"tileSettings"

"tileFilterMap"

"tileControlMap"

"metadataVersion"

"ephemeral"

"1:nY8mm3PM"

"identifier"

"12db1a0a"

"model"

"baseModelId"

"3fb59130-54fc-4848-832f-d22f61933485"

"connectionId"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"deletedAt"

null

"id"

"7155f419-a071-405c-8426-b4b5d3939049"

"modelKind"

"WORKBOOK"

"modelId"

"7155f419-a071-405c-8426-b4b5d3939049"

"name"

"Blobby Sales"

"workbook"

"identifier"

"12db1a0a"

"organizationRole"

null

"publicRole"

null

"folder"

null

"workbookId"

"7155f419-a071-405c-8426-b4b5d3939049"

"document"

"connection"

"database"

"ecomm_updated"

"deletedAt"

null

"dialect"

"postgres"

"id"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"name"

"Blobs R Us Postgres"

"connectionEnvironments"

null

"connectionId"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"deletedAt"

null

"documentId"

"7155f419-a071-405c-8426-b4b5d3939049"

"identifier"

"12db1a0a"

"isConnectionDeleted"

false

"isDeleted"

false

"lastItemIndex"

"modelId"

"7155f419-a071-405c-8426-b4b5d3939049"

"sharedModel"

"hasGit"

true

"id"

"3fb59130-54fc-4848-832f-d22f61933485"

"name"

"Blobs R Us Sales"

"pullRequestRequired"

false

"sharedModelId"

"3fb59130-54fc-4848-832f-d22f61933485"

"updatedAt"

"2025-01-28T18:31:14.569Z"

"updater"

"id"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"name"

"Sales Blobby"

"workbookId"

"7155f419-a071-405c-8426-b4b5d3939049"

"dashboardId"

"18811d32-c6ef-48f5-ad86-d740d09b356c"

"dashboardMiniUuid"

"cb2d6fbc"

"hasDashboard"

true

"ephemeral"

"1:nY8mm3PM"

"folder"

null

"isDocument"

true

"isDraft"

false

"name"

"Blobs R Us Sales"

"publishedAt"

"2025-01-28T18:31:14.568Z"

"scope"

"restricted"

"type"

"published"

"exportVersion"

"0.1"

"workbookModel"

"id"

"7155f419-a071-405c-8426-b4b5d3939049"

"connection_id"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"views"

"name"

"inventory_items"

"dimensions"

"field_name"

"product_retail_price_bin"

"view_name"

"inventory_items"

"data_type"

"STRING"

"expr"

"type"

"field"

"field_name"

"inventory_items.product_retail_price"

"sql"

"${inventory_items.product_retail_price}"

"bin_boundaries"

"label"

"Product Retail Price Bins"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"is_dimension"

true

"fully_qualified_name"

"inventory_items.product_retail_price_bin"

"measures"

"label"

"Inventory Items"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"ide_file_name"

"inventory_items.view"

"filter_only_fields"

"is_pseudo_display_view"

false

"name"

"order_items"

"dimensions"

"field_name"

"created_at"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"hidden"

true

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"is_group_parent_field"

true

"fully_qualified_name"

"order_items.created_at"

"field_name"

"created_at[date]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"DATE"

"label"

"Date"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[date]"

"field_name"

"created_at[day_of_week_name]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"DAY_OF_WEEK_NAME"

"label"

"Day of Week"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[day_of_week_name]"

"field_name"

"created_at[day_of_year]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"DAY_OF_YEAR"

"label"

"Day Of Year"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[day_of_year]"

"field_name"

"created_at[week]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"WEEK"

"label"

"Week"

"drill_fields"

"order_items.created_at[day_of_week_name]"

"order_items.created_at[date]"

"order_items.created_at[day_of_year]"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[week]"

"field_name"

"created_at[month]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"MONTH"

"label"

"Month"

"drill_fields"

"order_items.created_at[day_of_week_name]"

"order_items.created_at[date]"

"order_items.created_at[week]"

"order_items.created_at[day_of_year]"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[month]"

"field_name"

"created_at[quarter]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"QUARTER"

"label"

"Quarter"

"drill_fields"

"order_items.created_at[day_of_week_name]"

"order_items.created_at[date]"

"order_items.created_at[week]"

"order_items.created_at[month]"

"order_items.created_at[day_of_year]"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[quarter]"

"field_name"

"created_at[year]"

"view_name"

"order_items"

"data_type"

"TIMESTAMP"

"time_frames"

"DAY_OF_WEEK_NAME"

"DATE"

"WEEK"

"MONTH"

"QUARTER"

"YEAR"

"DAY_OF_YEAR"

"date_type"

"YEAR"

"label"

"Year"

"drill_fields"

"order_items.created_at[day_of_week_name]"

"order_items.created_at[date]"

"order_items.created_at[week]"

"order_items.created_at[month]"

"order_items.created_at[quarter]"

"order_items.created_at[day_of_year]"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"parent_field"

"created_at"

"parent_label"

"Created At"

"group_label"

"Created At"

"is_dimension"

true

"fully_qualified_name"

"order_items.created_at[year]"

"measures"

"type"

"aggregation"

"field_name"

"sale_price_max"

"view_name"

"order_items"

"aggregate_type"

"MAX"

"expr"

"type"

"field"

"field_name"

"order_items.sale_price"

"filters"

"data_type"

"NUMBER"

"ignored"

false

"label"

"Sale Price Max"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"display_sql"

"MAX(${order_items.sale_price})"

"original_sql_for_aggregation"

"${order_items.sale_price}"

"fully_qualified_name"

"order_items.sale_price_max"

"label"

"Order Items"

"extension_model_id"

"7155f419-a071-405c-8426-b4b5d3939049"

"ide_file_name"

"order_items.view"

"filter_only_fields"

"is_pseudo_display_view"

false

"relationships"

"model_kind"

"WORKBOOK"

"base_model_id"

"3fb59130-54fc-4848-832f-d22f61933485"

"topics"

"ignored_schemas"

"ignored_views"

"all_schema_names"

"virtualized_schemas"

"deleted_topics"

"dbt_virtualization_enabled"

true

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Dashboard not found

Document with identifier \":dashboardId\" not found

Import a dashboard

Imports a dashboard into an Omni instance.

POST /api/unstable/documents/import

curl -L 'https://myorg.omniapp.co/api/unstable/documents/import' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"baseModelId": "d37d0698-4558-41aa-b7f7-66ff85e89e9d",

"dashboard" : {<replace_with_dashboard_object>},

"identifier": "new-blobby-sales-document",

"document": {<replace_with_document_object>},

"exportVersion": "0.1",

"workbookModel": {<replace_with_workbook_model_object>}

Parameters

Parameter

Type

Required

Default

Description

baseModelId

string

Yes

n/a

The ID of the model that the dashboard will be built on. Retrieve the ID by navigating to the model in your browser (

Settings > Develop > Click the model

) and locating the string between

/models/

and

/ide

in the URL.

For example:

https://myorg.omniapp.co/models/d37d0698-4558-41aa-b7f7-66ff85e89e9d/ide

dashboard

object

Yes

n/a

A dashboard object.

identifier

string

n/a

A custom

identifier

for the document. This can be changed by accessing

File > Document settings

in the document.

folderPath

string

null

The path of the folder to place the imported dashboard in. If not specified, the dashboard will be imported to the root level.

document

object

Yes

n/a

document object

workbookModel

object

Yes

n/a

A workbook object.

exportVersion

string

Yes

n/a

A string specifying the version of the dashboard's metadata. Value must be

0.1

Response

200 OK

Successful requests will return a 200 OK status and a response body with the following structure:

200 OK

"dashboard"

"dashboardId"

"31b55e13-abd8-4ba8-b78c-c5afb0e4ed43"

"miniUuidMap"

"nY8mm3PM"

"c_afY5V5"

"workbook"

"id"

"31d4b13b-91fa-412d-a925-af99623f2bba"

"createdAt"

"2025-01-28T20:09:23.057Z"

"updatedAt"

"2025-01-28T20:09:23.088Z"

"deletedAt"

null

"publishedAt"

"2025-01-28T20:09:23.087Z"

"isDraft"

false

"identifier"

"07b6ab1f"

"name"

"Blobby Sales"

"lastItemIndex"

"ephemeral"

"1:c_afY5V5"

"organizationRole"

null

"organizationAccessBoost"

false

"publicRole"

null

"publicAccessBoost"

false

"canAnalyze"

true

"canViewWorkbook"

false

"canDownload"

true

"canDrill"

true

"canSchedule"

true

"organizationId"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"ownerId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"updaterId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"folderId"

null

"documentId"

"31d4b13b-91fa-412d-a925-af99623f2bba"

400 Bad Request

Results from invalid request parameters. Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid

baseModelId

value

Bad Request: baseModelId: Invalid uuid

Missing required

baseModelId

Bad Request: baseModelId: Required

Missing required

dashboard

Bad Request: dashboard: Required

Missing required

document

Bad Request: document: Required

Invalid or missing

exportVersion

value

Bad Request: exportVersion: Invalid literal value, expected \"0.1\"

Limitations

Export a dashboard

Parameters

Response

Import a dashboard

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/content-migration](https://docs.omni.co/docs/API/content-migration) on 2025-07-23.*
