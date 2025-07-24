---
id: "01-connecting-data-sources"
title: "Connecting Data Sources"
description: "Step-by-step process for connecting your data to Omni"
duration: "12 min"
order: 1
---

# Connecting Data Sources

Before you can start analyzing data in Omni, you need to connect your data sources. Omni has native integrations with most popular data warehouses and databases.

## Supported Data Sources

Omni connects to all major data platforms:

### Cloud Data Warehouses
- **Snowflake** - Most popular for analytics workloads
- **BigQuery** - Google's cloud data warehouse
- **Redshift** - Amazon's data warehouse solution
- **Databricks** - Unified analytics platform

### Traditional Databases
- **PostgreSQL** - Open source relational database
- **MySQL** - Popular web application database
- **SQL Server** - Microsoft's database system
- **ClickHouse** - Fast columnar database

### Specialized Platforms
- **Athena** - Amazon's serverless query service
- **MotherDuck** - Cloud-native DuckDB
- **StarRocks** - Real-time analytics database

## Connection Process

### 1. Access Connection Settings
Navigate to **Settings > Connections** in your Omni workspace.

### 2. Choose Your Database Type
Select the database type that matches your data source.

### 3. Configure Connection Details
Each database type has specific settings:

**Common Settings:**
- **Host** - Database server address
- **Port** - Connection port (usually default)
- **Username** - Database user account
- **Password** - Authentication credentials
- **Database Name** - Specific database to connect

### 4. Test Connection
Always test your connection before saving to ensure:
- Credentials are correct
- Network connectivity works
- Permissions are properly configured

## Advanced Configuration

### Schema Management
- **Schema Restriction** - Limit which schemas Omni can access
- **Auto-refresh** - Keep schema changes synchronized
- **Manual Refresh** - Control when schema updates occur

### Security Options
- **SSH Tunnels** - For databases in private networks
- **SSL Encryption** - Secure data transmission
- **IP Allowlisting** - Restrict connection sources

### Performance Settings
- **Connection Pooling** - Optimize database connections
- **Query Timeout** - Set maximum query execution time
- **Timezone Configuration** - Handle date/time properly

## Best Practices

### Security
✅ **Use dedicated analytics users** with read-only permissions
✅ **Enable SSL/TLS encryption** for data in transit
✅ **Configure IP allowlists** to restrict access
✅ **Rotate credentials regularly** for better security

### Performance
✅ **Use connection pooling** to optimize resource usage
✅ **Set appropriate timeouts** to prevent hanging queries
✅ **Monitor connection health** through Omni's diagnostics

### Organization
✅ **Use descriptive connection names** for easy identification
✅ **Document connection purposes** and owners
✅ **Organize by environment** (dev, staging, production)

## Troubleshooting Common Issues

### Connection Fails
- Verify host and port settings
- Check username/password credentials
- Confirm network connectivity
- Review firewall settings

### Slow Performance
- Check database load and query patterns
- Optimize connection pooling settings
- Consider read replicas for analytics

### Schema Not Updating
- Trigger manual schema refresh
- Check auto-refresh settings
- Verify user permissions for schema access

## Next Steps

Once your data source is connected:
1. **Verify data access** - Browse tables and run test queries
2. **Set up permissions** - Configure user access levels
3. **Begin modeling** - Start defining your semantic model

> **Practice Tip**: Start with a single, small database to test the connection process before connecting production systems.

Your data connection is the foundation of everything you'll do in Omni - taking time to set it up properly pays dividends later! 