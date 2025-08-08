# Creating table calculations with AI

**Source URL:** [https://docs.omni.co/docs/ai/formulas](https://docs.omni.co/docs/ai/formulas)  
**Extracted:** 2025-07-23 21:43:53  
**Source:** Omni Analytics Documentation

---

On this page

In addition to helping you

build queries

, Omni's AI can also help you write complex, Excel-like formulas using natural language. Having AI create table calculations for you reduces the time you'll have otherwise spent searching for the right syntax and iterating to get it just right.

Then, when you're happy with the results, you can push the field to the shared model to make it reusable!

Are AI calculations different than calculations I make myself?

Only in how they're created! AI-generated calculations still use

Omni supported functions

and can be

renamed, formatted

, and

promoted

just like a calculation you'd manually create.

Supported functions & formulas

The AI formula builder can use any of the formulas supported in manually-created calculated fields. Refer to the

Functions & formulas reference

for a complete list of supported functions.

Creating AI formulas

Calculated fields can be created in workbooks by clicking the ✨ (three stars) in a workbook. In the left sidenav, this will open the

Query helper

, but you can also use the calculations bar:

In a workbook, click the ✨ (three stars) in the calculations bar:

In the text box, describe the formula you'd like to create. You can include the function to use if you know it, but otherwise, it's helpful to be specific about what you're trying to achieve. Refer to the

Examples

section to get some inspiration.

If you're not sure where to begin, click

Get suggestions

in the formula prompt window to generate a list of potential starting points:

When finished, click

to submit the prompt to AI.

If you need to

rename the column

, you can do so using the column header's options menu or the table options.

Promoting AI formulas to the shared model

AI-generated calculations can be promoted to the workbook (and then shared) model to allow for reuse. Refer to the

Promoting table calculations

section of the

Table calculations guide

for more information.

Examples

Two letter abbreviations for US states

Prompt

Using IFS, create a formula that uses the standard two letter abbreviations for US states. For District of Columbia, use DC as the abbreviation.

Generated formula

In the example query, the

column contains the full name of the state. For example,

California

Pennsylvania

IFS

"Alabama"

"AL"

"Alaska"

"AK"

"Arizona"

"AZ"

"Arkansas"

"AR"

"California"

"CA"

"Colorado"

"CO"

"Connecticut"

"CT"

"Delaware"

"DE"

"Florida"

"FL"

"Georgia"

"GA"

"Hawaii"

"HI"

"Idaho"

"ID"

"Illinois"

"IL"

"Indiana"

"IN"

"Iowa"

"IA"

"Kansas"

"KS"

"Kentucky"

"KY"

"Louisiana"

"LA"

"Maine"

"ME"

"Maryland"

"MD"

"Massachusetts"

"MA"

"Michigan"

"MI"

"Minnesota"

"MN"

"Mississippi"

"MS"

"Missouri"

"MO"

"Montana"

"MT"

"Nebraska"

"NE"

"Nevada"

"NV"

"New Hampshire"

"NH"

"New Jersey"

"NJ"

"New Mexico"

"NM"

"New York"

"NY"

"North Carolina"

"NC"

"North Dakota"

"ND"

"Ohio"

"OH"

"Oklahoma"

"OK"

"Oregon"

"OR"

"Pennsylvania"

"PA"

"Rhode Island"

"RI"

"South Carolina"

"SC"

"South Dakota"

"SD"

"Tennessee"

"TN"

"Texas"

"TX"

"Utah"

"UT"

"Vermont"

"VT"

"Virginia"

"VA"

"Washington"

"WA"

"West Virginia"

"WV"

"Wisconsin"

"WI"

"Wyoming"

"WY"

"District of Columbia"

"DC"

Results table

State

State Abbreviation

Alabama

Alaska

Arizona

Arkansas

...

...

Extract domain from email

Prompt

Give me the domain from the email column

Generated formula

In the example query, the

column contains an email address. For example,

blobby@blobsrus.com

RIGHT

LEN

FIND

"@"

Results table

Email

Email Domain

blobby@blobsrus.com

blobsrus.com

blobross@gmail.com

gmail.com

bobbyparton@blobbyworld.co

blobbyworld.co

Identify a date as a weekday or a weekend

Prompt

Tell me if COLUMN_A is a weekday or a weekend.

If you receive an error for this prompt, try this instead:

Tell me if COLUMN_A is a weekday or a weekend. If using WEEKDAY, only provide a date as an argument.

Generated formula

In the example query, the

column contains a timestamp.

WEEKDAY

WEEKDAY

"Weekend"

"Weekday"

Results table

Date

Weekday or Weekend

2024-12-27 00:25:19.000

Weekday

2024-09-30 13:11:47.000

Weekend

2023-04-27 18:59:25.000

Weekday

2022-05-15 18:02:33.000

Weekday

Supported functions & formulas

Creating AI formulas

Promoting AI formulas to the shared model

Examples

---

*This content was automatically extracted from [https://docs.omni.co/docs/ai/formulas](https://docs.omni.co/docs/ai/formulas) on 2025-07-23.*
