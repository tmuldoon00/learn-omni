# Omni topic APIs

**Source URL:** [https://docs.omni.co/docs/API/topics](https://docs.omni.co/docs/API/topics)  
**Extracted:** 2025-07-23 21:43:40  
**Source:** Omni Analytics Documentation

---

On this page

The Topic APIs allow you to interact with the topics in your Omni models.

Retrieve a model

Retrieves a topic in a model by name.

GET /api/v1/models/:modelId/topic/:topicName

curl -L 'https://myorg.omniapp.co/api/v1/models/9d9440e5-8522-4507-b092-1ac26ba26673/topic/blob_sales' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"success"

true

"topic"

"name"

"blob_sales"

"base_view_name"

"products"

"label"

"Blobs R Us Sales"

"default_filters"

"join_via_map"

"join_via_map_key_order"

"ignored_props"

"always_where_filters"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"has_frozen_join_via_map"

true

"relationships"

"ide_file_name"

"blob_sales.topic"

"views"

"name"

"products"

"dimensions"

"field_name"

"product_id"

"view_name"

"products"

"data_type"

"NUMBER"

"expr"

"type"

"reference"

"column_ref"

"Product_ID"

"is_default_alias_scoped"

true

"sql"

"\"Product_ID\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.product_id"

"field_name"

"product_name"

"view_name"

"products"

"data_type"

"STRING"

"expr"

"type"

"reference"

"column_ref"

"Product_Name"

"is_default_alias_scoped"

true

"sql"

"\"Product_Name\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.product_name"

"field_name"

"category"

"view_name"

"products"

"data_type"

"STRING"

"expr"

"type"

"reference"

"column_ref"

"Category"

"is_default_alias_scoped"

true

"sql"

"\"Category\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.category"

"field_name"

"price"

"view_name"

"products"

"data_type"

"NUMBER"

"expr"

"type"

"reference"

"column_ref"

"Price"

"is_default_alias_scoped"

true

"sql"

"\"Price\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.price"

"field_name"

"stock_quantity"

"view_name"

"products"

"data_type"

"NUMBER"

"expr"

"type"

"reference"

"column_ref"

"Stock_Quantity"

"is_default_alias_scoped"

true

"sql"

"\"Stock_Quantity\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.stock_quantity"

"field_name"

"supplier"

"view_name"

"products"

"data_type"

"STRING"

"expr"

"type"

"reference"

"column_ref"

"Supplier"

"is_default_alias_scoped"

true

"sql"

"\"Supplier\""

"display_order"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"is_dimension"

true

"fully_qualified_name"

"products.supplier"

"measures"

"type"

"aggregation"

"field_name"

"count"

"view_name"

"products"

"aggregate_type"

"COUNT"

"filters"

"data_type"

"NUMBER"

"ignored"

false

"label"

"Blobs R Us Sales Count"

"format"

"NUMBER_0"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"view_label"

"Blobs R Us Sales"

"display_sql"

"COUNT(*)"

"fully_qualified_name"

"products.count"

"label"

"Blobs R Us Sales"

"extension_model_id"

"9d9440e5-8522-4507-b092-1ac26ba26673"

"ide_file_name"

"products.view"

"filter_only_fields"

"is_pseudo_display_view"

false

"uploaded_table_name"

"products.csv::8a55b730-f23d-4fbf-80b6-3f2847706d72"

"uploaded_table_name_in_db"

"omni_upload_t8a55b730f23d4fbf80b63f2847706d72"

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid model UUID

Model with id <modelId> does not exist"

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Model not found

Model with id <modelId> does not exist"

Topic not found

No such topic \"<topicName>\" or access not permitted

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve a model

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/topics](https://docs.omni.co/docs/API/topics) on 2025-07-23.*
