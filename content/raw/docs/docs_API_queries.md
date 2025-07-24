# Omni query APIs

**Source URL:** [https://docs.omni.co/docs/API/queries](https://docs.omni.co/docs/API/queries)  
**Extracted:** 2025-07-23 21:43:38  
**Source:** Omni Analytics Documentation

---

On this page

The query APIs allow you to interact with

workbook queries

in Omni. Use the

Retrieve document queries API

to retrieve a document's queries.

Run a query

Runs the query specified in the request body. Successful requests will return the data as a base64 encoded

Apache Arrow

table, allowing you to extract query results from Omni and use them elsewhere. For example, piping data to Google Sheets or leveraging data in a Python notebook.

POST /api/v1/query/run

curl -L -X POST 'https://myorg.omniapp.co/api/v1/query/run' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"query": {

"limit": 10,

"sorts": [

"column_name": "inventory_items.product_department",

"sort_descending": false

"column_name": "inventory_items.product_category",

"sort_descending": false

"table": "order_items",

"fields": [

"inventory_items.product_department",

"inventory_items.product_category",

"inventory_items.product_brand",

"inventory_items.count"

"modelId": "bcf0cffd-ec1b-44d5-945a-a261ebe407fc",

"version": 5,

"column_limit": 50,

"column_totals": {

"inventory_items.product_category": {

"type": "aggregation"

"inventory_items.product_department": {

"type": "aggregation"

"dimensionIndex": 3,

"join_paths_from_topic_name": "order_items"

"userId": "4c34905f-39bb-444b-9f8c-ffaf69b30100",  // Optional: Run query as specific user

"cache": "SkipRequery",  // Optional: Set cache policy

"resultType": "csv"      // Optional: Define export type

Parameters

Parameter

Type

Required

Default

Description

query

object

Yes

n/a

A JSON object representing the query to be run.

You can retrieve a query's JSON object right from an Omni workbook:

Open a workbook in Omni.

Inspector

panel. For

Mac

use

Option + 9

; for

Windows

, use

Alt + 9

Locate the

Query structure

section.

Copy the query JSON.

userId

string

n/a

Optional UUID to run the query as a specific user. If not provided, uses the user associated with the API token. The

userId

must belong to a user in your organization.

cache

string

SkipRequery

Optional cache policy to control how query caching behaves. Accepts one of the following values:

Standard

: Uses standard caching behavior.

SkipRequery

: Uses cached results if available, but does not requery if not found (default).

SkipCache

: Bypasses cache and always executes a fresh query.

resultType

string

Optional parameter to specify the format of query results exported by the API. Accepts one of the following values:

csv

json

xlsx

If omitted, the API will return results in a base-64 encoded format.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

View full response body

200 OK response

"jobs_submitted"

"6937012a-e9d4-445d-9a60-839566a6de49"

"572f5f28-c91f-453a-bb92-a1f89914a5bf"

"job_id"

"6937012a-e9d4-445d-9a60-839566a6de49"

"status"

"COMPLETE"

"client_result_id"

"572f5f28-c91f-453a-bb92-a1f89914a5bf"

"summary"

"cache_type"

"EXACT"

"display_sql"

"SELECT \"inventory_items.product_department\",\n    \"inventory_items.product_category\",\n    \"inventory_items.product_brand\",\n    \"inventory_items.count\",\n    \"ssort_0\",\n    \"ssort_1\",\n    \"$omni_group_grouping\",\n    \"$omni_column_total_indicator\",\n    \"$omni_total_sort\"\nFROM (SELECT \"inventory_items.product_department\",\n            \"inventory_items.product_category\",\n            \"inventory_items.product_brand\",\n            \"inventory_items.count\",\n            \"ssort_0\",\n            \"ssort_1\",\n            \"$omni_group_grouping\",\n            \"$omni_column_total_indicator\",\n            \"$omni_total_sort\",\n            ROW_NUMBER() OVER (PARTITION BY \"$omni_column_total_indicator\" ORDER BY \"inventory_items.product_department\" NULLS FIRST, \"ssort_0\", \"inventory_items.product_category\" NULLS FIRST, \"ssort_1\", \"$omni_total_sort\", \"inventory_items.product_brand\", \"inventory_items.count\", \"$omni_group_grouping\", \"$omni_column_total_indicator\") AS \"$f9\"\n        FROM (SELECT \"inventory_items.product_department\",\n                    \"inventory_items.product_category\",\n                    \"inventory_items.product_brand\",\n                    \"inventory_items.count\",\n                    CASE\n                        WHEN \"$omni_group_grouping\" = 3 THEN 1\n                        ELSE 0\n                    END AS \"ssort_0\",\n                    CASE\n                        WHEN \"$omni_group_grouping\" = 1 THEN 1\n                        ELSE 0\n                    END AS \"ssort_1\",\n                    \"$omni_group_grouping\",\n                    CASE\n                        WHEN \"$omni_group_grouping\" = 1 THEN 'column_subtotal::inventory_items.product_category'\n                        WHEN \"$omni_group_grouping\" = 3 THEN 'column_subtotal::inventory_items.product_department'\n                        WHEN \"$omni_group_grouping\" = 0 THEN NULL\n                        ELSE NULL\n                    END AS \"$omni_column_total_indicator\",\n                    \"$omni_group_grouping\" AS \"$omni_total_sort\"\n                FROM (SELECT \"inventory_items\".\"product_department\" AS \"inventory_items.product_department\",\n                            \"inventory_items\".\"product_category\" AS \"inventory_items.product_category\",\n                            \"inventory_items\".\"product_brand\" AS \"inventory_items.product_brand\",\n                            COUNT(\"inventory_items\".\"id\") AS \"inventory_items.count\",\n                            GROUPING(\"inventory_items\".\"product_department\", \"inventory_items\".\"product_category\", \"inventory_items\".\"product_brand\") AS \"$omni_group_grouping\"\n                        FROM \"order_items\"\n                            LEFT JOIN \"inventory_items\" ON \"order_items\".\"inventory_item_id\" = \"inventory_items\".\"id\"\n                        GROUP BY GROUPING SETS((1, 2, 3), (1, 2), 1)) AS \"t1\"\n                ORDER BY \"inventory_items.product_department\" NULLS FIRST, 5, \"inventory_items.product_category\" NULLS FIRST, 6, 9, \"inventory_items.product_brand\", \"inventory_items.count\", \"$omni_group_grouping\", 8\n                LIMIT 30) AS \"t3\") AS \"t4\"\nWHERE \"$f9\" <= 10\nORDER BY \"inventory_items.product_department\" NULLS FIRST, \"ssort_0\", \"inventory_items.product_category\" NULLS FIRST, \"ssort_1\", \"$omni_total_sort\""

"omni_sql"

"SELECT \"inventory_items\".\"product_department\" AS \"inventory_items.product_department\",\n    \"inventory_items\".\"product_category\" AS \"inventory_items.product_category\",\n    \"inventory_items\".\"product_brand\" AS \"inventory_items.product_brand\",\n    COUNT(\"inventory_items\".\"id\") AS \"inventory_items.count\"\nFROM \"order_items\"\n    LEFT JOIN \"inventory_items\" ON \"order_items\".\"inventory_item_id\" = \"inventory_items\".\"id\"\nGROUP BY GROUPING SETS((1, 2, 3), (1, 2), 1)\nORDER BY 1 NULLS FIRST, 2 NULLS FIRST\nLIMIT 10"

"stage_summaries"

"omni_sql_parse_failed"

false

"stats"

"job_completion_lookup"

"notification_latency"

"plan_queue_latency"

"job_add_latency"

"plan_job_lookup"

"plan_job_execution"

"plan_job_state_update"

"stream_open"

"plan_stats"

"model_fetch"

"connection_metadata_fetch"

"topic_permission_check"

"model_detail_build"

"plan_info_schema_lookups"

"semantic_plan_omni_algebra_gen"

"semantic_plan_to_exec"

"semantic_plan"

"cache_check"

"fields"

"inventory_items.product_department"

"field_name"

"product_department"

"view_name"

"inventory_items"

"data_type"

"STRING"

"is_dimension"

true

"fully_qualified_name"

"inventory_items.product_department"

"inventory_items.product_category"

"field_name"

"product_category"

"view_name"

"inventory_items"

"data_type"

"STRING"

"is_dimension"

true

"fully_qualified_name"

"inventory_items.product_category"

"inventory_items.product_brand"

"field_name"

"product_brand"

"view_name"

"inventory_items"

"data_type"

"STRING"

"is_dimension"

true

"fully_qualified_name"

"inventory_items.product_brand"

"inventory_items.count"

"field_name"

"count"

"view_name"

"inventory_items"

"aggregate_type"

"COUNT"

"filters"

"data_type"

"NUMBER"

"ignored"

false

"label"

"Inventory Items Count"

"format"

"NUMBER_0"

"display_sql"

"COUNT(*)"

"fully_qualified_name"

"inventory_items.count"

"missing_fields"

"invalid_calculations"

"cache_metadata"

"plan_key"

"8ab7613c-7b24-4d78-8370-2c1dd50e9530"

"field_list"

"inventory_items.product_department"

"inventory_items.product_category"

"inventory_items.product_brand"

"inventory_items.count"

"num_rows"

"created_at"

"data_fresh_at"

"bytes"

"ttl"

"model_id"

"bcf0cffd-ec1b-44d5-945a-a261ebe407fc"

"query"

"model_job"

"model_id"

"bcf0cffd-ec1b-44d5-945a-a261ebe407fc"

"table"

"order_items"

"fields"

"inventory_items.product_department"

"inventory_items.product_category"

"inventory_items.product_brand"

"inventory_items.count"

"calculations"

"filters"

"sorts"

"column_name"

"inventory_items.product_department"

"sort_descending"

false

"is_column_sort"

false

"null_sort"

"OMNI_DEFAULT"

"column_name"

"inventory_items.product_category"

"sort_descending"

false

"is_column_sort"

false

"null_sort"

"OMNI_DEFAULT"

"limit"

"pivots"

"fill_fields"

"column_totals"

"inventory_items.product_category"

"type"

"aggregation"

"inventory_items.product_department"

"type"

"aggregation"

"row_totals"

"column_limit"

"default_group_by"

true

"join_via_map"

"join_paths_from_topic_name"

"order_items"

"client_result_id"

"572f5f28-c91f-453a-bb92-a1f89914a5bf"

"version"

"period_over_period_computations"

"query_references"

"metadata"

"custom_summary_types"

"result"

"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"

"stream_stats"

"server_stream"

"remaining_job_ids"

"timed_out"

"false"

Successful responses will contain the following:

An object with a

jobs_submitted

property

An object containing details about the job, such as

job_id

status

, and the provided

query

The job details object will also contain a

result

property, which contains the query results as a base64 encoded Apache Arrow table. At this point, you can use something like

Omni Python SDK

to decode and validate the results.

Encountering timeouts?

If a request takes too long, the response will include a

remaining_job_ids

property. When this occurs, poll the

GET /api/v1/query/wait

endpoint until the

timeout

property is

false

curl -L https://myorg.omniapp.co/api/v1/query/wait?job_ids=[remaining_job_ids]

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Run a query

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/queries](https://docs.omni.co/docs/API/queries) on 2025-07-23.*
