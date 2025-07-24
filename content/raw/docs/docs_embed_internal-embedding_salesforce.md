# Embedding Omni in Salesforce

**Source URL:** [https://docs.omni.co/docs/embed/internal-embedding/salesforce](https://docs.omni.co/docs/embed/internal-embedding/salesforce)  
**Extracted:** 2025-07-23 21:44:16  
**Source:** Omni Analytics Documentation

---

When looking to embed Omni into Salesforce, there are two different primary implementation methods: a dashboard can be implemented as a new tab and whole page or can be placed within a section on an existing Salesforce object (ie. Accounts).

We can also add parameterization to the dashboards that are embedded into existing Salesforce objects. For example, a dashboard that is embedded into the Account page can dynamically filter based on the current account that is being viewed

To get started with either method the first thing that we will need to do is construct a visualforce page that will contain our Omni iframe.

We will want to head over to the developer console and create a new Visualforce page:

Next, we will want to find the dashboard that you would like to embed from Omni. You can retrieve the

embed URL

via the share link on a dashboard.

Next, if we want to embed a dashboard that is not going to be parameterized we will construct a Visualforce page that looks like this (we have added some styling elements so that the dashboard will take up the whole page). In this case, we don’t need to include current filters from Omni since we will not be parameterizing the iframe URL:

<apex:page sidebar="false">

<style>

html { width: 100%; height: 100%; }

</style>

<apex:iframe scrolling="true" width="100%" height="100%" src="https://omni.demo.embed-exploreomni.dev/embed/dashboards/1ilyzzIc" ></apex:iframe>

</apex:page>

If we wanted to embed a dashboard that will be added to an existing Salesforce object we will add a few more features.

We will specify a standard control that denotes the Salesforce object that we will be embedding into (in this case Account).

From there, we will want to add a filter that is not a default filter to our dashboard on the field that we would like to parameterize and grab the iframe tag and check the include current filters option (this will help with parameterization later).

When we paste the URL into the iframe tag we will replace the filter value with the proper apex variable that we would like to use to parameterize the URL. In this case, we are using {!Account.Id} to pull the Account ID from the current page into the Account ID filter on our dashboard.

<apex:page standardController="Account">

<apex:iframe scrolling="true" src="https://omni.embed-omniapp.co/embed/dashboards/-MXlZXnX?f--salesforce__account.id=%28%27kind%21%27EQUALS%27%7Etype%21%27string%27%7Evalues%21%5B%27{!Account.Id}%27%5D%7Eis_negative%21false%29O_O"></apex:iframe>

</apex:page>

Once we have created the visualforce page with the desired iframe we can place it on the appropriate object.

If we want to create a tab that stores a dashboard we will head over to settings and open up the tab menu:

From here we can choose to create a new Visualforce tab based on the page that we created above. The tab will then be available and will open up an interactive embedded dashboard for your team.

If we want to add the embedded dashboard to an existing Salesforce object we will head over to Objects Manager in the Setup menu:

Next, navigate over to the object that you would like to embed the dashboard on (in this case Account):

Then select to edit the page layout:

We then will add a new section to hold our iframe:

Lastly we will drop out Visualforce object into the new section that we just created:

Note: You can adjust the size of the iframe/section with the little wrench in the upper right-hand corner.

And now you have a dynamic embedded dashboard in SFDC!

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/internal-embedding/salesforce](https://docs.omni.co/docs/embed/internal-embedding/salesforce) on 2025-07-23.*
