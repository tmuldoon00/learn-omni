---
id: "01-connecting-data-sources"
title: "Connecting Data Sources"
description: "Step-by-step process for connecting your data to Omni, featuring Snowflake integration"
duration: "15 min"
videoId: "m5CnfB9Vb90"
order: 1
---

# Connecting Data Sources

Before you can analyze data in Omni, you need to connect to your data sources. This lesson covers the comprehensive process of connecting various databases to Omni, with detailed examples and best practices for enterprise deployments.

## Understanding Data Connections

### Why Connections Matter

Your data connection is the foundation of your analytics infrastructure:
- **Direct Database Access** - Query data where it lives, no copying required
- **Real-Time Analysis** - Always working with current data
- **Security and Governance** - Controlled access through database permissions
- **Performance Optimization** - Native database query optimization

### Connection Architecture

```
Your Database ←→ Omni Connection ←→ Omni Analytics
     ↓                ↓                  ↓
 Data Storage    Authentication    Analysis & Viz
```

## Supported Database Types

### Cloud Data Warehouses
- **❄️ Snowflake** - Leading cloud data platform
- **📊 BigQuery** - Google's serverless data warehouse
- **🟠 Databricks** - Unified analytics platform
- **🔴 Redshift** - Amazon's data warehouse service

### Traditional Databases
- **🐘 PostgreSQL** - Advanced open-source database
- **🐬 MySQL** - Popular relational database
- **🔵 Microsoft SQL Server** - Enterprise database platform
- **⚡ ClickHouse** - Column-oriented database for analytics

### Specialized Systems
- **🦆 MotherDuck** - Serverless DuckDB analytics
- **⭐ StarRocks** - Real-time analytics database
- **🟩 MariaDB** - MySQL-compatible database
- **📈 Athena** - Serverless query service for S3

## Step-by-Step Connection Process

### Phase 1: Pre-Connection Setup

#### 1. Gather Connection Information
Before starting, collect these details:
```yaml
Required Information:
  - Host/Server URL
  - Port number
  - Database name
  - Schema information
  - Authentication method
  - Network access details
```

#### 2. Database User Setup
Create a dedicated Omni user with appropriate permissions:
- **Read-only access** to analytical data
- **Schema discovery** permissions
- **Connection pooling** capabilities
- **Security constraints** as needed

#### 3. Network Configuration
Ensure network connectivity:
- **Firewall rules** for Omni IP addresses
- **VPN or private link** setup if required
- **SSL/TLS encryption** configuration
- **IP allowlisting** for security

### Phase 2: Omni Connection Configuration

#### Access Connection Settings
1. Navigate to **Organization Settings**
2. Select **Connections** tab
3. Click **Add Connection**
4. Choose your database type

#### Connection Form Fields
**Basic Configuration:**
```yaml
Connection Details:
  - Name: "Production Analytics DB"
  - Type: [Selected Database Type]
  - Host: your-database-host.com
  - Port: 5432 (or database-specific)
  - Database: analytics_db
  - Schema: public (or specific schema)
```

**Authentication:**
```yaml
Auth Options:
  - Username/Password
  - Key-pair authentication
  - OAuth integration
  - Service account keys
```

**Advanced Settings:**
```yaml
Performance Options:
  - Connection pooling
  - Query timeout limits
  - SSL encryption
  - Read replica usage
```

### Phase 3: Connection Testing and Validation

#### Test Connection
1. Click **Test Connection** button
2. Verify successful connection
3. Check schema discovery
4. Validate data access

#### Common Connection Issues
**❌ Connection Refused**
- Check host and port settings
- Verify firewall/network access
- Confirm database is running

**❌ Authentication Failed**
- Verify username/password
- Check user permissions
- Confirm authentication method

**❌ Schema Access Denied**
- Review user permissions
- Check schema ownership
- Verify database/schema names

## Database-Specific Connection Guides

### Snowflake Connection

#### Prerequisites
- Snowflake account with ACCOUNTADMIN access
- Ability to create users and roles
- Network access configuration

#### Step 1: Create Omni User and Role
```sql
-- Connect as ACCOUNTADMIN
USE ROLE ACCOUNTADMIN;

-- Create role for Omni
CREATE ROLE IF NOT EXISTS OMNI_ROLE;

-- Create user for Omni
CREATE USER IF NOT EXISTS omni_user
  PASSWORD = 'secure_password_here'
  DEFAULT_ROLE = 'OMNI_ROLE'
  DEFAULT_WAREHOUSE = 'ANALYTICS_WH'
  DEFAULT_NAMESPACE = 'ANALYTICS_DB.PUBLIC';

-- Grant role to user
GRANT ROLE OMNI_ROLE TO USER omni_user;
```

#### Step 2: Grant Permissions
```sql
-- Database access
GRANT USAGE ON DATABASE ANALYTICS_DB TO ROLE OMNI_ROLE;
GRANT USAGE ON ALL SCHEMAS IN DATABASE ANALYTICS_DB TO ROLE OMNI_ROLE;

-- Table access
GRANT SELECT ON ALL TABLES IN DATABASE ANALYTICS_DB TO ROLE OMNI_ROLE;
GRANT SELECT ON FUTURE TABLES IN DATABASE ANALYTICS_DB TO ROLE OMNI_ROLE;

-- Warehouse access
GRANT USAGE ON WAREHOUSE ANALYTICS_WH TO ROLE OMNI_ROLE;
```

#### Step 3: Configure Connection in Omni
```yaml
Snowflake Connection Settings:
  Account: your-account.snowflakecomputing.com
  Username: omni_user
  Password: [secured password]
  Warehouse: ANALYTICS_WH
  Database: ANALYTICS_DB
  Schema: PUBLIC
  Role: OMNI_ROLE
```

#### Advanced Snowflake Features
**Key-Pair Authentication:**
```sql
-- Generate RSA key pair
-- Set public key for user
ALTER USER omni_user SET RSA_PUBLIC_KEY='your-public-key-here';
```

### BigQuery Connection

#### Prerequisites
- Google Cloud Project with BigQuery enabled
- Service account with appropriate permissions
- JSON key file for authentication

#### Step 1: Create Service Account
1. Go to Google Cloud Console
2. Navigate to **IAM & Admin > Service Accounts**
3. Create new service account: `omni-analytics`
4. Download JSON key file

#### Step 2: Grant BigQuery Permissions
```yaml
Required Roles:
  - BigQuery Data Viewer
  - BigQuery Job User
  - BigQuery Metadata Viewer
  - Project Viewer (if needed)
```

#### Step 3: Configure Connection
```yaml
BigQuery Connection Settings:
  Project ID: your-gcp-project-id
  Dataset: analytics_dataset
  Service Account Key: [Upload JSON file]
  Location: US (or your data location)
```

### PostgreSQL Connection

#### Step 1: Create Database User
```sql
-- Create user with read-only access
CREATE USER omni_user WITH PASSWORD 'secure_password';

-- Grant schema access
GRANT USAGE ON SCHEMA public TO omni_user;
GRANT USAGE ON SCHEMA analytics TO omni_user;

-- Grant table access
GRANT SELECT ON ALL TABLES IN SCHEMA public TO omni_user;
GRANT SELECT ON ALL TABLES IN SCHEMA analytics TO omni_user;

-- Grant access to future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
  GRANT SELECT ON TABLES TO omni_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA analytics 
  GRANT SELECT ON TABLES TO omni_user;
```

#### Step 2: Configure pg_hba.conf
```
# Allow Omni IP addresses
host  all  omni_user  [omni-ip-range]/32  md5
```

#### Step 3: Connection Settings
```yaml
PostgreSQL Connection:
  Host: your-postgres-host.com
  Port: 5432
  Database: analytics_db
  Username: omni_user
  Password: [secured password]
  SSL Mode: require
```

## Connection Security Best Practices

### Network Security

#### IP Allowlisting
```yaml
Omni IP Addresses to Allowlist:
  # Contact Omni support for current IP ranges
  # Ranges vary by deployment region
  US East: [IP ranges provided by Omni]
  US West: [IP ranges provided by Omni]
  Europe: [IP ranges provided by Omni]
```

#### VPC and Private Links
**AWS PrivateLink:**
- Enhanced security for AWS-hosted databases
- No internet traffic required
- Direct network connection to Omni

**Google Private Service Connect:**
- Secure BigQuery connections
- VPC-native connectivity
- No external IP exposure

#### SSL/TLS Encryption
```yaml
Encryption Settings:
  Enforce SSL: true
  TLS Version: 1.2 or higher
  Certificate Validation: enabled
  Cipher Suites: secure only
```

### Authentication Security

#### Credential Management
✅ **Use dedicated service accounts** - Never use personal credentials
✅ **Rotate passwords regularly** - Implement password rotation policies  
✅ **Minimum required permissions** - Principle of least privilege
✅ **Monitor access logs** - Track connection and query activity

#### Key-Pair Authentication
```yaml
Benefits:
  - No password storage required
  - Enhanced security
  - Key rotation capabilities
  - Audit trail improvements

Setup Process:
  1. Generate RSA key pair
  2. Configure public key in database
  3. Provide private key to Omni
  4. Test connection security
```

## Connection Performance Optimization

### Query Performance

#### Connection Pooling
```yaml
Pool Configuration:
  Min Connections: 2
  Max Connections: 10
  Connection Timeout: 30s
  Idle Timeout: 300s
```

#### Read Replicas
- **Reduced load** on primary database
- **Geographic distribution** for global teams
- **Failover capabilities** for reliability
- **Cost optimization** for analytics workloads

#### Warehouse Optimization
**Snowflake:**
```sql
-- Create dedicated analytics warehouse
CREATE WAREHOUSE OMNI_ANALYTICS
  WAREHOUSE_SIZE = 'MEDIUM'
  AUTO_SUSPEND = 300
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
```

### Data Access Patterns

#### Schema Organization
```yaml
Recommended Structure:
  analytics/
    ├── staging/       # Raw, unprocessed data
    ├── intermediate/  # Business logic applied
    ├── marts/         # Final business metrics
    └── utility/       # Helper tables and views
```

#### Indexing Strategy
```sql
-- Create indexes for common query patterns
CREATE INDEX idx_orders_date ON orders(created_date);
CREATE INDEX idx_customers_segment ON customers(segment);
CREATE INDEX idx_products_category ON products(category);
```

## Troubleshooting Common Issues

### Connection Problems

#### Timeout Issues
**Symptoms:** Connection times out during setup
**Solutions:**
- Verify network connectivity
- Check firewall rules
- Increase timeout settings
- Test from different network

#### Permission Errors
**Symptoms:** "Access denied" or "Permission denied" errors
**Solutions:**
- Review user permissions
- Check schema access rights
- Verify role assignments
- Test with database admin

#### SSL Certificate Issues
**Symptoms:** SSL handshake failures
**Solutions:**
- Update SSL certificates
- Check TLS version compatibility
- Verify certificate chain
- Test SSL connection manually

### Performance Issues

#### Slow Query Performance
**Diagnosis:**
- Check database query logs
- Monitor connection pool usage
- Review index utilization
- Analyze query execution plans

**Solutions:**
- Optimize database indexes
- Adjust connection pool settings
- Use read replicas
- Implement query caching

#### Connection Pool Exhaustion
**Symptoms:** "Connection pool full" errors
**Solutions:**
- Increase pool size limits
- Reduce connection timeout
- Monitor connection usage
- Implement connection recycling

## Connection Monitoring and Maintenance

### Health Monitoring

#### Connection Status Dashboard
Monitor these key metrics:
- **Connection uptime** - Availability percentage
- **Query response time** - Performance trends
- **Error rates** - Connection and query failures
- **Connection pool usage** - Resource utilization

#### Automated Alerts
```yaml
Alert Conditions:
  - Connection failure > 1 minute
  - Query response time > 30 seconds
  - Error rate > 5%
  - Pool utilization > 80%
```

### Maintenance Procedures

#### Regular Tasks
**Weekly:**
- Review connection performance metrics
- Check for failed queries
- Monitor connection pool usage
- Validate SSL certificate status

**Monthly:**
- Update connection credentials
- Review user permissions
- Analyze query performance
- Plan capacity adjustments

**Quarterly:**
- Rotate authentication keys
- Update SSL certificates
- Review security configurations
- Performance optimization review

## What's Next?

Now that your data is connected to Omni, you're ready to:
- **Understand Omni's modeling approach** and how it works with your data
- **Learn about dimensions and measures** to start building your semantic model
- **Explore relationships** between your data tables
- **Set up topics and views** to organize your data for analysis

> **Pro Tip**: Start with a single, well-understood dataset for your initial connection. You can always add more data sources later as you become comfortable with Omni's modeling approach.

Remember: A well-configured connection is the foundation of reliable, high-performance analytics. Take time to set it up properly! 