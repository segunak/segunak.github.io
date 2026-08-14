---
title: "Microsoft Fabric Lakehouse SQL Analytics Endpoints: One Per Workspace, Not Per Lakehouse"
excerpt: "Microsoft Fabric SQL Analytics Endpoints have changed, now all Lakehouses in a workspace share one endpoint, which makes all of our lives easier."
last_modified_at: 2026-08-13T20:14:57
toc: true
toc_sticky: true
toc_label: "On This Page"
header:
  teaser: /assets/images/misc/microsoft-fabric.jpg
categories:
  - blog
tags:
  - tech
---

## Some Background

What's up, if you don't work with [Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview) (Microsoft's latest greatest data everything platform) this article will make no sense. But if you do, welcome. Let's get straight to it.

I'm here to clear up some confusion evidenced by posts like these from members of the Microsoft Fabric community:

- [Lakehouse SQL Endpoint Access](https://community.fabric.microsoft.com/t5/Fabric-platform/Lakehouse-SQL-endpoint-access/m-p/4706911)
- [How to Share a Single Lakehouse Within a Workspace](https://community.fabric.microsoft.com/t5/Fabric-platform/How-to-share-a-single-lakehouse-within-a-workspace/m-p/4398252)

For a given [Microsoft Fabric Workspace](https://learn.microsoft.com/en-us/fabric/fundamentals/workspaces), do the [Lakehouse databases](https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview) each have their own [SQL Analytics Endpoint](https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-sql-analytics-endpoint), or do they share the same one?

**Answer:** They share the same one. **All Lakehouses in a given Fabric Workspace share the same SQL Analytics Endpoint.** But it wasn't always that way. Here's what's up.

## Things Changed

According to this [Microsoft documentation page](https://learn.microsoft.com/en-us/fabric/data-warehouse/get-started-lakehouse-sql-analytics-endpoint):

> The number of SQL analytics endpoints in a workspace matches the number of Lakehouse items.
>
> [What is a Lakehouse SQL Analytics Endpoint?](https://learn.microsoft.com/en-us/fabric/data-warehouse/get-started-lakehouse-sql-analytics-endpoint)

![LakehouseDetails](/assets/images/misc/lakehouse-items-quote.png)

Reading that, you'd naturally think: "Okay, so if I have 3 Lakehouses in my workspace, I'll have 3 different SQL endpoints to connect to." Right? At least to me, that's how the language comes across. And well, that used to be true, but not anymore.

## Things Now

The only thing you need to know is: **All Lakehouses within a single Fabric workspace share the same SQL Analytics Endpoint**. When you copy the SQL Analytics Endpoint of any Lakehouse in your workspace from the Fabric UI, that endpoint is good to connect to all the Lakehouses.

There used to be one endpoint per Lakehouse, but that sucked and customers complained. Now, there is one endpoint per workspace, and each Lakehouse appears as a separate database on that endpoint.

## An Example

Let's say you have a workspace called `ImportantDataHub` with the following SQL endpoint:

```txt
SQL Endpoint: gibberish.datawarehouse.fabric.microsoft.com
```

You've created three Lakehouses in this workspace with cool names:

- [Kumogakure](https://naruto.fandom.com/wiki/Kumogakure)
- [Sunagakure](https://naruto.fandom.com/wiki/Sunagakure)
- [Konohagakure](https://naruto.fandom.com/wiki/Konohagakure)

When you connect to that single SQL endpoint, you'll see **all three databases**:

```sql
-- Connect to: gibberish.datawarehouse.fabric.microsoft.com

-- Available databases:
USE Kumogakure;   -- Your first Lakehouse
USE Sunagakure;   -- Your second Lakehouse
USE Konohagakure; -- Your third Lakehouse
```

This is actually closer to traditional SQL Server behavior. You can use `USE` statements to switch database context. At least, the `USE` statement works from [SSMS 22](https://learn.microsoft.com/en-us/ssms/install/install). I'm less sure about whether it works from the Fabric Workspace UI where I had some issues. Point is, you don't need a different connection string for every database.

## Working With The New Endpoints

Now, since it's an auto-created endpoint, as Microsoft states here:

> There's no need to create a SQL analytics endpoint in Microsoft Fabric. A SQL analytics endpoint is automatically created for every lakehouse, database, or mirrored database
>
> [What is a Lakehouse SQL Analytics Endpoint?](https://learn.microsoft.com/en-us/fabric/data-warehouse/get-started-lakehouse-sql-analytics-endpoint)

It's an ugly URL. A bunch of gibberish. Pretty hard to tell what it's pointing to if you're in a situation where you have many Fabric workspaces.

Thankfully, the latest version of SQL Server Management Studio (SSMS) has added a feature to address this. When connecting to a Fabric SQL Analytics Endpoint, the pretty name of the workspace shows up.

![SSM22](/assets/images/misc/fabric-ssms-22.png)

Read the full details of SSMS 22 here: [SQL Server Management Studio (SSMS) 22 is Now Generally Available](https://techcommunity.microsoft.com/blog/sqlserver/sql-server-management-studio-ssms-22-is-now-generally-available-ga/4469003)

It ends up looking like this when you connect. You can see the Fabric language now integrated into the platform. The black bar, redacted for privacy, would show the name of the Fabric workspace on which the SQL Analytics Endpoint sits.

![FabricExample](/assets/images/misc/example-fabric-name.png)

And side note, I'm digging the new SSMS logo. Makes me feel very modern, very suave, very cool. Like a hip, in the know, fresh, data modernist kind of guy, rather than an ancient on-premises SQL Server legacy infrastructure [DBA](https://voiceofthedba.com/2018/04/04/is-the-dba-title-dying/) type of guy, which I'm totally _not_. But looking at the old SSMS logo did at times make me feel like one of those legends (shout out to anyone who was doing data engineering before ChatGPT, you deserve your flowers).

<div style="text-align: center;">
  <img src="/assets/images/misc/new-ssms-logo.png" alt="New SSMS Logo" style="width: 30%;" />
</div>

## Why This Is Better

I think this architecture is actually better. It makes my life easier at least. In the early days of Fabric (which, given how fast they release updates, is just months ago), each Lakehouse had its own endpoint. At some point recently, Microsoft changed this. The documentation just hasn't caught up yet.

Here's why having one endpoint per workspace is superior:

- You only need to manage one connection string per workspace instead of N connection strings for N Lakehouses. Makes your CI/CD pipelines and configuration files simpler.
- If you're coming from a SQL Server background (which many working with Fabric are), this feels natural. One server, multiple databases. We already know how to work with this model.

## Closing Thoughts

Microsoft Fabric is rapidly evolving, and sometimes the documentation takes time to catch up with product changes. They'll get it updated eventually.

The best place to hangout, ask questions, and get the latest is [r/MicrosoftFabric](https://www.reddit.com/r/MicrosoftFabric). The Fabric product team engages directly there, and the community keeps it real, both with frustrations and praise when deserved.

Now go forth and connect to your Fabric Lakehouses with confidence. You've got [one endpoint to rule them all](https://lotr.fandom.com/wiki/One_Ring).
