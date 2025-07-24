# Omni AI APIs

**Source URL:** [https://docs.omni.co/docs/API/ai](https://docs.omni.co/docs/API/ai)  
**Extracted:** 2025-07-23 21:43:31  
**Source:** Omni Analytics Documentation

---

On this page

The AI APIs allow you to leverage Omni's AI capabilities to enhance your data exploration and analysis.

Generate a query

Transforms a natural language description into a structured Omni query that can be executed using the

Query Run API

POST /api/v1/ai/generate-query

curl -X POST 'https://myorg.omniapp.co/api/v1/ai/generate-query' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--d '{

"modelId": "bcf0cffd-ec1b-44d5-945a-a261ebe407fc",

"currentTopicName": "order_items",

"prompt": "Show me top 10 products by sales amount"

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"query"

"model_job"

"model_id"

"bcf0cffd-ec1b-44d5-945a-a261ebe407fc"

"table"

"order_items"

"fields"

"products.item_name"

"order_items.total_sale_price"

"calculations"

"filters"

"sorts"

"column_name"

"order_items.total_sale_price"

"sort_descending"

true

"is_column_sort"

false

"null_sort"

"OMNI_DEFAULT"

"limit"

"pivots"

"fill_fields"

"column_totals"

"row_totals"

"column_limit"

"default_group_by"

true

"join_via_map"

"join_paths_from_topic_name"

"order_items"

"version"

"period_over_period_computations"

"query_references"

"metadata"

"custom_summary_types"

Field

Type

Description

query

object

A structured Omni query object that can be used with the Query Run API

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid JSON

Bad Request: Invalid JSON

Invalid method

Invalid method

403 Forbidden

"detail"

"<errorReason>"

"status"

Issue

Error detail

Feature not enabled

Feature is not enabled

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

500 Internal Server Error

"detail"

"<errorReason>"

"status"

Issue

Error detail

AI service error

No response from AI

or other AI service-related errors

Generate a query

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/ai](https://docs.omni.co/docs/API/ai) on 2025-07-23.*
