---
title: "How To Have Global Parameters in Azure Synapse Analytics"
excerpt: "Unlike Azure Data Factory, Azure Synapse Analytics doesn't currently provide global parameters, but there are some ways to work around and achieve similar functionality."
toc: true
toc_label: "On This Page"
toc_icon: "database"
toc_sticky: true
author_profile: true
last_modified_at: 2026-08-03T16:11:26
header:
  teaser: /assets/images/SynapseTeaser.jpg
categories:
  - blog
tags:
  - tech
---


One of the more attractive features of [Azure Data Factory](https://docs.microsoft.com/en-us/azure/data-factory/) is its support for [global parameters](https://docs.microsoft.com/en-us/azure/data-factory/author-global-parameters). Despite the [dogmatic](https://softwareengineering.stackexchange.com/questions/148108/why-is-global-state-so-evil) aversion to global variables that some in the software engineering community have, there are scenarios where their usage is appropriate, if not preferred. [Azure Synapse Analytics](https://docs.microsoft.com/en-us/azure/synapse-analytics/) (Microsoft's answer to [Databricks](https://databricks.com/), and much [more](https://azure.microsoft.com/en-us/blog/azure-sql-data-warehouse-is-now-azure-synapse-analytics/)) presents many cases where, like Azure Data Factory, having access to global variables would be immensely valuable.

But unlike Azure Data Factory, **Synapse does not currently support global parameters.** There's a community thread on the topic [here](https://feedback.azure.com/d365community/idea/eaa47674-0442-ec11-a819-000d3ae2b5ca) where users have expressed their disappointment. Before proceeding, it's worth checking if Microsoft has introduced global variables to Synapse. If they have, you can skip this article. But if they haven't, keep reading for workarounds that will help you overcome this limitation.

## Easiest Workaround

Don't use global parameters.
{: .notice--warning}

Relax. I'm just kidding, kind of. If you can find a way to avoid global state in your Azure Synapse Analytics workspace, you'll save yourself some pain. Not that I believe global state is bad or anything, Synapse just lacks native support for it (at least as of the time I'm writing this article). Do you know what's better than finding a great workaround? Not needing one at all!

## Actual Workaround

Leverage a one-to-many relationship to invoke all pipelines from a central parent, supplying each child with a JSON object containing essential global values.
{: .notice--info}

In Synapse, you can pass JSON objects as parameters to any pipeline. To emulate global state, create a parent pipeline to act as the hub from which all other pipelines in the workspace are invoked. Within this parent pipeline, you can define the desired global values using a JSON object. Then, when invoking the child pipelines, you pass along the parent's global object. In the child pipelines, the global values can be accessed using dot notation.

Alternatively, you could create a `.json` file containing your global values, upload it to your Azure Storage Account, and access it via a [Lookup activity](https://learn.microsoft.com/en-us/azure/data-factory/control-flow-lookup-activity) in every pipeline needing globals. While this pattern is simpler, it has some [drawbacks](#workaround-drawbacks).

That being said, here's what the parent-child pattern looks like in action.

### Create your parent pipeline

Create a pipeline in your Synapse workspace from which you intend to call all other pipelines. If you're using [triggers](https://learn.microsoft.com/en-us/azure/data-factory/concepts-pipeline-execution-triggers), this is the pipeline that your trigger would need to be calling.

### Create a JSON object to house your global values

In your favorite text editor ([preferably one with linting](https://code.visualstudio.com/docs/languages/json)), create a JSON object with the values you need to be globally accessible in your Synapse workspace. Example below.

```JSON
{
  "GlobalStringValue": "some value",
  "GlobalIntegerValue": 42,
  "GlobalBooleanValue": true
}
```

### Choose a storage method for your JSON object

You have some options for storage of your JSON object containing global values, each with its pros and cons. They are as follows.

**Option 1:** Save your JSON in a `.json` file and upload it to the Azure Storage Account attached to your Synapse Workspace.

Then in your parent pipeline, load the global values from the `.json` file using a [Lookup activity](https://learn.microsoft.com/en-us/azure/data-factory/control-flow-lookup-activity).

![StorageAccountJson](/assets/images/storage-account-json.jpg)

---

![SynapseDataset](/assets/images/synapse-dataset.jpg)

---

![GetGlobals](/assets/images/get-globals.jpg)

**Option 2:** Save your JSON in the default value field of a parameter with the type `Object` on your parent pipeline.

This may sound weird, but this whole thing is a workaround, so bear with me. Create a parameter of the type `Object` in your parent pipeline. Populate its default with your JSON object string containing global values. Be sure to create a parameter of type `Object`, and not a variable. Only pipeline parameters support the `Object` type, which is another strange limitation of Synapse. Paste your JSON into the "Default value" field of the parameter.

![GlobalData](/assets/images/ParentPipelineGlobalData.jpg)

### Pass your globals JSON object to child pipelines

Ensure each child pipeline has a parameter of type `Object` for receiving global data from the parent. Then, when calling child pipelines via [Execute Pipeline](https://learn.microsoft.com/en-us/azure/data-factory/control-flow-execute-pipeline-activity) activities in the parent, pass in the JSON object containing your global values. Within your child pipelines, you can access the global properties of the inherited JSON using dot notation.

For example, here's a child pipeline with a parameter of type `Object`.

![SettingUpChildPipeline](/assets/images/Synapse-ChildPipeline-TakingGlobalObject-FromParent.jpg)

Now in the parent, when the child pipeline is executed, the globals JSON object can be provided to it via the parameter.

Here's how you would pass the globals object if you chose **Option 1 (using a `.json`)** for storing your JSON.

![LookupJsonDetailed](/assets/images/lookup-json-detailed.jpg)

Here's how it'd be passed if you chose **Option 2 (using the default value of an `Object` type parameter in the parent pipeline)** for storing your JSON.

![CallingChildPipeline](/assets/images/Synapse-ParentPipeline-CallingChild.jpg)

And then back in the child pipeline, global values inherited from the parent can be accessed using dot notation.

![ChildPipelineUsingGlobal](/assets/images/Synapse-ChildPipeline-UsingGlobalFromParent.jpg)

This workaround is essentially recreating the principle of [inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)), with some [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) mixed in, albeit in a somewhat roundabout way. It reminds me of some classes I took in college where professors demanded we create data structures from scratch. I can't say those were my favorite lessons at the time, but I certainly learned a lot. Perhaps Microsoft intentionally omitted global parameters from Synapse to [empower](https://www.microsoft.com/en-us/about) our growth as software artisans. Probably not, but they've certainly forced users to work on their problem-solving skills.

## Another Workaround

If you have a database connected to your Synapse workspace, you could store global values in a table instead of a JSON object. Then whenever you need a global value, you could read it straight from the database table via a Lookup activity in the relevant pipeline. That approach is discussed more in the article below.

[Paul Hernandez: Alternative pipeline parametrization for Azure Synapse Analytics](https://hernandezpaul.wordpress.com/2022/08/10/alternative-pipeline-parametrization-for-azure-synapse-analytics/)

## Workaround Drawbacks

There are some drawbacks to the aforementioned parent-child inheritance workaround for achieving globals in Synapse. Here are a few of them.

* If you go with the default parameter option, you don't get any JSON linting for your globals object. If someone enters in messed up JSON, you won't know until runtime.
* If you go with the default parameter option, whenever the globals JSON object needs a change, you'll have to copy out the existing JSON, make the necessary modifications, and then copy it back in. The Synapse UI has a multiline text editor, but it's not accessible from the default value input box, which is an obvious hint that you're not really supposed to be using it for complex JSON objects.
* If you go with the `.json` file in an Azure Storage Account option, you introduce an external dependency for your pipeline that could potentially be a point of failure. Not a big deal if you put some validations in place, but it's worth noting.
* Dynamically setting values in your globals JSON object is not possible. Only static values are allowed, depriving you of the flexibility and agility that dynamic configurations could bring.
* By forcing all pipelines needing global values to be called from the parent, you run the risk of hitting the [40 activity limit](https://github.com/MicrosoftDocs/azure-docs/blob/main/includes/azure-data-factory-limits.md). You could avoid this concern by ditching the parent-child pipeline pattern. Instead, you'd have a Lookup activity in every pipeline needing global values that gets them from a `.json` file in your storage account. But then you end up doing the same lookup all over the place, each time returning the same values. Why not just do it once? We might be in a low-code world with Synapse, but that's a [code smell](https://en.wikipedia.org/wiki/Code_smell) if I've ever heard (or I guess, smelled?) of one. But hey, you've got to do what you've got to do. It's not our fault that Synapse doesn't have global parameters. If you're reading this right now, you and I, we're the victims here. Do what you must.

In a nutshell, while this workaround might _work_, it's inferior to the native support for global parameters that's [already available](https://learn.microsoft.com/en-us/azure/data-factory/author-global-parameters) in Azure Data Factory.

![GlobalsSupportADFSynapse](/assets/images/GlobalsSupportADFSynapse.jpg)

## A Closing Soliloquy

In my current role as a software engineer, I have the privilege of working with some really smart people who possess an uncanny knack for devising creative, albeit sometimes not optimal, solutions to overcome the limitations of our product. These workarounds, or dare I say, "hacks," never cease to amaze me. They showcase the impressive resourcefulness of our users, even if their solutions aren't exactly ideal. While I applaud the ingenuity, a part of me can't help but cry a bit on the inside every time I discover one of their infamous workarounds.

You see, more often than not, these workarounds arise from a lack of communication about the challenges they face with our product's current state. Instead of reaching out to us, they embark on a "do it yourself" journey. They find a way to conquer the obstacle and experience a genuine sense of accomplishment, as they rightfully should. However, as a member of the engineering team, what I really want is trust, and open dialogue (with product managers as liaisons, wouldn't want users contacting engineers about every issue or complaint they have), between us and users. I want their first impulse to be sharing their struggles, granting us the opportunity to provide a properly supported solution. Of course, this requires an engineering team that embraces feedback. Building trust is a two-way street. If the engineering team becomes defensive when users raise concerns about the product, it inadvertently reinforces the users' reliance on workarounds.

That being said, if you want to see Microsoft add global parameters to Azure Synapse Analytics so you don't have to deal with strange workarounds, let your voice be heard on the community thread found [here](https://feedback.azure.com/d365community/idea/eaa47674-0442-ec11-a819-000d3ae2b5ca). Or, you can check out [Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview), which has swallowed Azure Data Factory, Azure Synapse Analytics, Power BI, and more into one massive data everything platform. Maybe it'll have global parameters.
