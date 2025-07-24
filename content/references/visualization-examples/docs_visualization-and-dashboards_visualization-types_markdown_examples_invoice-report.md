# Invoice report

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/invoice-report](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/invoice-report)  
**Extracted:** 2025-07-23 21:45:11  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a structured invoice, complete with contact information and order details.

Example code

# Invoice

img

src

https://i.etsystatic.com/21003174/r/il/a9dfd6/4600341262/il_fullxfull.4600341262_kno3.jpg

style

width

---------------------------------------

Invoice Number: {{result.0.order_items.user_id.value_static}}

Name: {{result.0.users.full_name.value_static}}

Contact: {{result.0.users.full_name.value_static}} • {{result.0.users.email.value_static}}

### Order Summary

table

thead

Order ID

Order Date

Item Count

Total

thead

tbody

{{#result}}

{{order_items.order_id.value}}

{{order_items.created_at[date].value}}

{{order_items.count.value}}

{{order_items.sale_price_sum.value}}

{{/result}}

tbody

table

**Grand Total**: {{result.totals.first.order_items.sale_price_sum.value}} (no tax)

### Terms

+ Payments are to be made payable to Initech via Paypal[^1] or Direct Deposit[^2].

+ Grand Total must be paid by the end of [DATE] (30 days).

+ If Grand Total is not paid by the end of [DATE], an late-fee[^3] will be applied to the Grand Total.

[^1]: Paypal e-mail address for payments is

payments@initech.com

[^2]: Please contact if you wish to do a Direct Deposit.

[^3]: Late-fee of *2%* interest per-day until paid.

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/invoice-report](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/invoice-report) on 2025-07-23.*
