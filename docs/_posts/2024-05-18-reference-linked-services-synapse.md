---
title: "How To Reference Linked Services In Azure Synapse Analytics Notebooks"
excerpt: "Learn how to reference linked services when writing Apache Spark code in Azure Synapse Analytics notebooks."
last_modified_at: 2026-08-13T20:14:57
toc: true
toc_sticky: true
toc_label: "On This Page"
header:
  teaser: /assets/images/misc/cloud-logo-teaser.png
categories:
  - blog
tags:
  - tech
---


[Azure Synapse Analytics](https://learn.microsoft.com/en-us/azure/synapse-analytics/) is described by Microsoft as a "limitless analytics service that brings together enterprise data warehousing and Big Data analytics". I'd say _limitless_ is a rather strong word, considering the meteoric rise of their own ~~competing~~ successor product dubbed [Microsoft Fabric](https://blog.fabric.microsoft.com/en-us/blog/microsoft-fabric-explained-for-existing-synapse-users/), but if you're trying to query a [Linked Service](https://learn.microsoft.com/en-us/azure/data-factory/concepts-linked-services?tabs=data-factory) from a [Synapse notebook](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-development-using-notebooks), here's how to do so. This feature is documented in more detail [here](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-secure-credentials-with-tokenlibrary?pivots=programming-language-python#adls-gen2-storage-with-linked-services).

## The Code

This code is written in [PySpark](https://pypi.org/project/pyspark/), but can easily be ported to Scala or other flavors of Spark.

```python
from pyspark.sql import SparkSession

# Initialize Spark session.
spark = SparkSession.builder.getOrCreate()

# Configure Synapse's OAuth provider to authorize the linked service. It uses whatever authentication method you set up in your linked service configuration.
spark.conf.set("spark.storage.synapse.linkedServiceName", "LinkedServiceName")
spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider")

# Full URL for the linked service.
base_url = "abfss://<container-name>@<storage-account-name>.dfs.core.windows.net"

# Example: Read a Parquet file
df_parquet = spark.read.parquet(f"{base_url}/some-folder/example.parquet")

# Example: Read a JSON file
df_json = spark.read.json(f"{base_url}/some-folder/example.json")

# Example: Read a CSV file
df_csv = spark.read.option("header", True).csv(f"{base_url}/some-folder/example.csv")

# Example: Read a Delta table.
df_delta = spark.read.format("delta").load(f"{base_url}/some-delta-table-root-folder/")
```

## Code Explanation

Let's break down that code.

### Initializing the Spark Session

```python
spark = SparkSession.builder.getOrCreate()
```

Initializes a Spark session or retrieves an existing one if it's already running. You can read all about Spark sessions [here](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/spark_session.html).

### Configuring Authentication for Linked Services

```python
spark.conf.set("spark.storage.synapse.linkedServiceName", "LinkedServiceName")
spark.conf.set("fs.azure.account.oauth.provider.type", "com.microsoft.azure.synapse.tokenlibrary.LinkedServiceBasedTokenProvider")
```

This is the most important part of the whole thing, which is covered in more detail [here](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-secure-credentials-with-tokenlibrary?pivots=programming-language-python#adls-gen2-storage-with-linked-services). These configurations let your Spark session authenticate using the same credentials already established in your linked service. By design, every linked service requires an authentication method upon creation. So, when you access a resource through an established linked service, there's no need (or there shouldn't be) to replicate authentication, it's already configured in the linked service. You simply need to ensure that the Spark session in your notebook recognizes this configuration. In the provided code:

* The first line specifies the linked service to use. Replace `LinkedServiceName` with the name of your linked service, which will utilize the authentication settings you've predefined.
* The second line determines the type of OAuth provider that Synapse utilizes, effectively linking the authentication process directly to your specified linked service.

By setting this up, you save yourself time and headaches. If you already have a linked service for your resource, it's way easier to reference it than to roll your own authentication code for it.

### Specifying the Base URL

```python
base_url = "abfss://<container-name>@<storage-account-name>.dfs.core.windows.net"
```

This should contain the URL of the linked service you're connecting to. By default, the Spark session references the storage account attached to the Synapse instance. To access data from a different linked service, you need to specify it explicitly. However, if you're querying data from the storage account already integrated with your Synapse workspace, you can use relative paths for simplicity.

### Reading Different Data Formats

```python
# Read a parquet file
df_parquet = spark.read.parquet(f"{base_url}/some-folder/example.parquet")

# Read a JSON file
df_json = spark.read.json(f"{base_url}/some-folder/example.json")

# Read a CSV file
df_csv = spark.read.option("header", True).csv(f"{base_url}/some-folder/example.csv")

# Read a Delta table
df_delta = spark.read.format("delta").load(f"{base_url}/delta-table-root-folder/")
```

With the Spark session configured to your linked service, you can now access various data formats. Use the read option that works for you. For more information, read through the [Data Sources](https://spark.apache.org/docs/latest/sql-data-sources.html) page on the Spark documentation site.

### Conclusion

I've nothing else _germane_ (the word "relevant" could've been used here, but I'm feeling fancy) to this article's theme to say, so I'm just going to talk about stuff ([and thangs](https://www.google.com/search?q=stuff+and+thangs+rick+grimes+the+walking+dead)).

If you're still using Synapse, Microsoft wants you to use [Fabric](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview), but it's like, Synapse is already a bunch of Microsoft products pooled under one roof. The primary functions of [Azure Data Factory](https://learn.microsoft.com/en-us/azure/data-factory/introduction), [Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/introduction/), and [SQL Data Warehouse](https://learn.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-overview-what-is) were bundled up and ~~shoved~~ copied under the Synapse roof. And now Fabric takes all of that plus [Power BI](https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview) and shoves it under a yet larger roof. It is an ambitious approach, to say the least. Particularly because Fabric is a [SaaS](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-saas) solution in contrast to the aforementioned [PaaS](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas) solutions.

That being said, Fabric does have a lot of [cool stuff](https://learn.microsoft.com/en-us/fabric/get-started/whats-new) going for it. Feedback from [users](https://www.reddit.com/r/MicrosoftFabric/comments/1bn5sb2/honest_review_of_fabric_so_far/) seems to be "it's good, has potential, but some important stuff is missing, so we can't migrate fully yet" which is to be expected given its 2023 release. I'm presently looking for opportunities to migrate a few Synapse pipelines I manage at work to Fabric. The [OneLake](https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview) architecture it features interests me.

So yeah, that's it. End article.
