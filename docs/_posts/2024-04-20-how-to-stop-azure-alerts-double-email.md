---
title: "How To Stop Azure Monitor Alerts From Sending Redundant 'Fired' and 'Resolved' Emails"
excerpt: "Learn how to configure Azure alert rules to stop getting two emails when an alert is fired and then resolved."
# classes: wide
toc: true
toc_sticky: true
toc_label: "On This Page"
last_modified_at: 2026-08-03T16:11:26
header:
  teaser: /assets/images/azure3.png
categories:
  - blog
tags:
  - tech
---


<style>
    .greentext {
        color: #789922; /* Classic 4chan green text color */
        font-family: 'Courier New', monospace; /* Monospaced font for authenticity */
        margin-left: 20px;
        font-size: 16px;
    }
    blockquote.greentext {
        border-left: 3px solid #789922; /* Adds a green vertical line before the text */
        padding-left: 10px;
    }
    blockquote.greentext a {
        color: #789922; /* Same green color for links */
        text-decoration: underline; /* Maintains the underline for links */
    }
    blockquote.greentext a:hover {
        color: #4d6626; /* Darker or different green on hover for better interaction feedback */
    }
</style>

If you're getting two emails from your Azure Monitor alert rule and want it to stop, click [here](#the-solution) for a solution. However, if you're okay with gradually making your way to said solution, enjoying a context-setting story along the way, keep scrolling.

## Story Time

To set the stage, I present to you a story in classic [green text](https://knowyourmeme.com/memes/greentext-stories) fashion, a narrative style [cherished](https://www.reddit.com/r/greentext/) by the denizens of the Internet's back pages.

<blockquote class="greentext">
    >be me<br>
    >software engineer working on a data project using Azure Synapse Analytics.<br>
    >get asked by project management team to send emails when the pipeline has completed.<br>
    >simple enough, right? Just use Azure Monitor Alerts. They are so easy. Click here, click there, export <s><a href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview" target="_blank">ARM</a></s> <a href="https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep" target="_blank">Bicep</a> template for deployments, done.<br>
    >alert goes live, everyone gets two emails.<br>
    >PM's start asking questions.<br>
    >What have you done?<br>
    >Why did we get two emails?<br>
    >Which email tells us the pipeline is complete?<br>
    >What makes you think it's acceptable to violate the sanctity of our inboxes in such amateur fashion?<br>
    >Why are the emails so ugly?<br>
    >Can you add pictures?<br>
    >Can you change the text?<br>
    ><a href="https://knowyourmeme.com/memes/panik-kalm" target="_blank">panik.jpg</a><br>
    >realize the alert's action group is triggering twice, once for 'Fired' and again for 'Resolved'.<br>
    >do research.<br>
    >find solution.<br>
    >fix problem.<br>
    ><a href="https://knowyourmeme.com/memes/panik-kalm" target="_blank">kalm.jpg</a>
</blockquote>

In summary, I needed to send emails when something happened in Azure without annoying my entire management chain, and figured out how to do so. I now share that knowledge with you.

## Why Redundant Email Notifications Occur

By default, Azure's [action groups](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups) are configured to notify on both state changes for an alert rule, when it fires and when it resolves. This setup ensures thorough communication but can lead to unnecessary email clutter. You're not alone if you find this annoying, although technically speaking, it's not a bug. Here are some others who've seen the same thing.

[Alert is fired twice: first time with "fired", other on "resolved" monitorCondition](https://github.com/MicrosoftDocs/azure-docs/issues/57247)

[Configuring Alert Rules to Not Send Secondary Resolved Notification](https://learn.microsoft.com/en-us/answers/questions/202429/configuring-alert-rules-to-not-send-secondary-reso)

## The Solution

If you want to ensure you only get one email from your Azure alert rule, here's what to do. You'll need to use something called an [alert processing rule](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules?tabs=portal), which is different from an alert rule, despite sounding similar.

1. Set up your [alert rule](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-types). I'm going to assume that if you're reading this article, you already have an alert rule, and it's causing you problems, so this step is likely done.
2. In the Azure Portal, go to `Alerts –> Alert processing rules`.
    ![AlertRules](/assets/images/alertprocessingrules.png)
3. Click `Create` on the `Alert processing rules` page.
    ![AlertRules](/assets/images/alertprocessingrules-2.png)
4. Here's where things get interesting. For the `Scope`, you need to select the resource that your alert rule is tied to. In my case, I was monitoring a Synapse workspace, but it was done by picking up data it emitted to a Log Analytics workspace. This meant I needed to attach my alert processing rule to the Log Analytics workspace, rather than the Synapse workspace directly. Your situation may differ, but the general guidance is to choose the resource your alert rule is directly scanning as your scope.
    ![AlertRules](/assets/images/scope.png)
5. Now with your scope chosen, apply filters to tie your alert processing rule to the alert rule causing you problems. Under `Scope` there should be a `Filter` section with dropdown menus.
6. Set your first filter to `Alert rule name` and choose the name of your problematic alert rule.
7. Set your second filter to `Alert condition` and choose either `Fired` or `Resolved`, whichever condition you want to silence (not get an email for). Here's an example of what this could look like.
    ![AlertRules](/assets/images/scopeandfilter.png)
8. Proceed to the `Rule settings` page and choose `Suppress notifications`, which does exactly what it sounds like. The alert will still fire, but its action groups won't be invoked, so you won't receive any notifications when it fires.
    ![AlertRules](/assets/images/rulesettings.png)
9. Proceed to the `Scheduling` page and select `Always` to ensure the alert processing rule is always active.
    ![AlertRules](/assets/images/scheduling.png)
10. Proceed to the `Details` page and select a resource group for your alert processing rule. Give it a sensible name and description.
    ![AlertRules](/assets/images/detailsscreen.png)
11. Proceed to the `Review + create` page and create the alert processing rule. Once created, it should show up on the overview page for all alert processing rules.
    ![AlertRules](/assets/images/createdalertprocessingrule.png)
12. Test your alert processing rule by triggering your alert rule and seeing if you end up getting two emails.

The trickiest part of the instructions above is selecting the correct scope for your alert processing rule. It took me a few tries to get the right configuration that would apply to my Synapse workspace indirectly through the Log Analytics workspace it emits to. If you go through the instructions and are still getting two emails, double-check your scope.

## Automating With Bicep Templates

If you manage your Azure resources through code, setting up alert processing rules via Bicep (or ARM, Terraform, etc.) templates is a must for [CI/CD](https://en.wikipedia.org/wiki/CI/CD). Below is a sample Bicep script to configure an alert processing rule. Here's the [relevant Microsoft documentation page](https://learn.microsoft.com/en-us/azure/templates/microsoft.alertsmanagement/actionrules?pivots=deployment-language-bicep).

```bicep
resource suppressMainPipelineResolvedAlert 'Microsoft.AlertsManagement/actionRules@2021-08-08' = {
  name: 'Suppress the Resolved or Fired State Of Some Alert So You Only Get One Email'
  location: 'Global'
  properties: {
    actions: [
      {
        actionType: 'RemoveAllActionGroups'
      }
    ]
    conditions: [
      {
        field: 'AlertRuleName'
        operator: 'Equals'
        values: [
          'The Name of the Alert You Are Trying to Suppress When Resolved or Fired'
        ]
      }
      {
        field: 'MonitorCondition',
        operator: 'Equals',
        values: [
            'Resolved
        ]
      }
    ]
    description: 'Write a good description so future people know why you did this'
    enabled: true
    scopes: [
    'The Id of your logAnalyticsWorkspace. You can find this on the overview tab of your workspace in the Azure Portal'
    ]
  }
}
```
