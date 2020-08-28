---
title: 'PostgreSQL can be a performance bottleneck'
author: 'John'
date: '2020-08-28'
---

Drupal supports multiple different databases, MySQL / MariaDB, PostgreSQL, SQLite and more. On a large Drupal project we decided to use PostgreSQL, which we later discovered to be a significant performance bottleneck.

## Let's talk about case sensitivity

Database queries in Drupal are intended to be case insensitive which means that queries like

```
SELECT * FROM `users` WHERE username LIKE 'JOHN'
```

would match a record where the username is John.

MySQL and MariaDB is by default case insensitive which means that the query above would return a result as we expected. If we would run the same query in PostgresSQL we would not get a result, as PostgresSQL is case sensitive.

To solve that problem Drupal rewrites queries run by PostgresSQL to use `ILIKE` instead of `LIKE`, so our query would instead look like this:

```
SELECT * FROM `users` WHERE username ILIKE 'JOHN'
```

While this ensures the problem is solved, the queries end up being **much slower** to execute.

In the Drupal core issue [Performance issues with path alias generated queries on PostgreSQL](https://www.drupal.org/project/drupal/issues/2988018) we can see that path_alias queries are extremely slow to execute. While there are workarounds available for that particular query, there are many more queries being affected. In [#2464481](https://www.drupal.org/project/drupal/issues/2464481) the problem is being worked on.

So, what can we do?

* You can add indexes for the slowest queries
* You can try rewriting queries to use `LOWER()` which is a common workaround to run queries case insensitive.
* Change database

We ended up doing the latter, fixing the slowest queries would help, but the site would remain slower than it need to be, rewriting all queries could be risky and potentially introduce regressions.

The problem is being worked on, but given the complexity and our own time frame, the change of database ended up being the best solution for us.