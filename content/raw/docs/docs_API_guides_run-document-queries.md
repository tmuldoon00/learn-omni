# Running document queries with the Query API

**Source URL:** [https://docs.omni.co/docs/API/guides/run-document-queries](https://docs.omni.co/docs/API/guides/run-document-queries)  
**Extracted:** 2025-07-23 21:43:37  
**Source:** Omni Analytics Documentation

---

On this page

The

Document queries API

provides information about documents and their associated queries. You can use these queries directly with the

Query API

to programmatically run the document's queries.

1. Retrieve the document's queries

GET /api/v1/documents/:id/queries

curl -L'https://myorg.omniapp.co/api/v1/documents/12db1a0a/queries' \

-H 'Authorization: Bearer <TOKEN>'

2. Extract a query object from the response

The query objects returned by the Document Queries API are already structured in the format required by the Query API, making it easy to run these queries programmatically without having to manually build the query structure.

const

document

response

body

const

queryObject

document

queries

query

3. Run the query

Use the query object directly with the

Query API

to run the query:

POST /api/v1/query/run

curl -L -X POST 'https://myorg.omniapp.co/api/v1/query/run' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"query": {

"limit": 1000,

"sorts": [

"column_name": "order_items.created_at[month]",

"sort_descending": false

"table": "order_items",

"fields": [

"order_items.created_at[month]",

"order_items.sale_price_sum"

"filters": {},

"modelId": "7155f419-a071-405c-8426-b4b5d3939049"

1. Retrieve the document's queries

2. Extract a query object from the response

3. Run the query

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/guides/run-document-queries](https://docs.omni.co/docs/API/guides/run-document-queries) on 2025-07-23.*
