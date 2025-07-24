# Embedding Omni in Notion

**Source URL:** [https://docs.omni.co/docs/embed/internal-embedding/notion](https://docs.omni.co/docs/embed/internal-embedding/notion)  
**Extracted:** 2025-07-23 21:44:15  
**Source:** Omni Analytics Documentation

---

From the share dialog on a dashboard, copy the embeddable URL.

For notion, you'll then need to strip off the iframe tag, you only want the omni URL in the middle.

E.g. instead of:

<iframe src="https://omni.test.embed-exploreomni.dev/dashboards/demo-dash"></iframe>

You will want to just grab:

https://omni.test.embed-exploreomni.dev/dashboards/demo-dash

Then in Notion, use the slash command

/embed

and paste in that URL.

Voila! Omni is embedded in Notion.

Note that users will have to authenticate into Omni when they first see the iframe in a notion doc. This works best on the web version of Notion.

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/internal-embedding/notion](https://docs.omni.co/docs/embed/internal-embedding/notion) on 2025-07-23.*
