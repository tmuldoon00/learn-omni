---
id: "05-api-development"
title: "API Development and Automation"
description: "Leverage Omni APIs for custom integrations and automation workflows"
duration: "7 min"
videoId: "7yfFbkEBOVg"
order: 5
---

# API Development and Automation

Omni's comprehensive REST API enables programmatic control over every aspect of your analytics platform. From automated user provisioning to dynamic content generation, the API transforms Omni from a standalone tool into an integrated component of your broader technology ecosystem. This lesson features the new Query API that allows you to take the Omni model anywhere you like.

## Why API Integration Matters

### Beyond Manual Administration

#### Traditional BI Administration Challenges
❌ **Manual User Management** - Time-consuming user provisioning and updates
❌ **Static Content** - Dashboards that don't adapt to changing business needs
❌ **Isolated Systems** - Analytics disconnected from operational workflows
❌ **Reactive Maintenance** - Manual monitoring and troubleshooting
❌ **Limited Scalability** - Human bottlenecks prevent growth

#### API-Driven Automation Benefits
✅ **Automated Operations** - Self-service user provisioning and content management
✅ **Dynamic Integration** - Analytics that respond to business system changes
✅ **Scalable Architecture** - Programmatic management handles enterprise scale
✅ **Proactive Monitoring** - Automated health checks and optimization
✅ **Custom Workflows** - Tailored processes that match your business logic

### Real-World API Use Cases

#### Operational Automation
- **User Lifecycle Management:** Automatic provisioning, role updates, deactivation
- **Content Deployment:** Automated dashboard creation and configuration
- **Data Pipeline Integration:** Trigger analytics updates when data refreshes
- **Performance Monitoring:** Automated optimization and alerting systems

#### Business Process Integration  
- **Customer Onboarding:** Auto-generate customer-specific analytics dashboards
- **Subscription Management:** Update user access based on plan changes
- **Compliance Reporting:** Automated audit trail generation and reporting
- **Multi-Tenant Operations:** Programmatic tenant isolation and management

## Omni API Architecture

### RESTful API Design

#### Core API Principles
```yaml
api_design:
  protocol: "REST over HTTPS"
  authentication: "Bearer token (API keys)"
  format: "JSON request/response"
  versioning: "URL path versioning (/api/v1/)"
  
  design_principles:
    - "Resource-based URLs"
    - "HTTP methods for operations (GET, POST, PUT, DELETE)"
    - "Consistent error handling"
    - "Comprehensive response metadata"
```

#### API Base Structure
```javascript
// API base configuration
const OMNI_API_BASE = "https://yourorg.omniapp.co/api/v1";
const API_TOKEN = "your_api_token_here";

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Standard API response format
{
  "data": { /* Resource data */ },
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 50
  },
  "links": {
    "self": "/api/v1/documents?page=1",
    "next": "/api/v1/documents?page=2",
    "last": "/api/v1/documents?page=3"
  }
}
```

## Content Management APIs

### Document and Dashboard Operations

#### Creating Dynamic Dashboards
```javascript
// Create customer-specific dashboard automatically
async function createCustomerDashboard(customer) {
  const dashboardConfig = {
    name: `${customer.name} - Performance Dashboard`,
    description: `Automated dashboard for ${customer.name}`,
    
    // Organize in customer folder
    folder: {
      path: `/Customers/${customer.name}`,
      create_if_missing: true
    },
    
    // Configure default filters for customer data
    default_filters: {
      customer_id: customer.id,
      subscription_tier: customer.subscriptionTier
    },
    
    // Set permissions based on customer team
    permissions: {
      [`customer_${customer.id}_users`]: "VIEWER",
      [`customer_${customer.id}_admins`]: "EDITOR",
      ["customer_success_team"]: "VIEWER"
    },
    
    // Define dashboard tiles
    tiles: [
      {
        type: "query",
        title: "Monthly Revenue Trend",
        query: {
          topic: "revenue_analytics",
          dimensions: ["date_month"],
          measures: ["total_revenue"],
          filters: { customer_id: customer.id }
        },
        visualization: "line_chart"
      },
      {
        type: "metric",
        title: "Active Users",
        query: {
          topic: "usage_metrics", 
          measures: ["active_users_count"],
          filters: { customer_id: customer.id }
        }
      }
    ]
  };
  
  const response = await fetch(`${OMNI_API_BASE}/documents`, {
    method: 'POST',
    headers,
    body: JSON.stringify(dashboardConfig)
  });
  
  return response.json();
}
```

#### Content Migration and Deployment
```javascript
// Export dashboard from staging and deploy to production
async function deployDashboard(stagingDashboardId, productionOrg) {
  // Step 1: Export from staging
  const exportResponse = await fetch(
    `${STAGING_API_BASE}/documents/${stagingDashboardId}/export`,
    { method: 'GET', headers: stagingHeaders }
  );
  
  const dashboardExport = await exportResponse.json();
  
  // Step 2: Transform for production environment
  const productionConfig = {
    ...dashboardExport.dashboard,
    // Update connection references
    connection_mapping: {
      "staging_db": "production_db"
    },
    // Update topic references if needed
    topic_mapping: {
      "staging_analytics": "production_analytics"
    }
  };
  
  // Step 3: Import to production
  const importResponse = await fetch(
    `${PRODUCTION_API_BASE}/documents/import`,
    {
      method: 'POST',
      headers: productionHeaders,
      body: JSON.stringify({
        dashboard: productionConfig.dashboard,
        workbook_model: productionConfig.workbook_model,
        validation_mode: "strict"
      })
    }
  );
  
  return importResponse.json();
}
```

### Folder and Permission Management

#### Automated Organization Structure
```javascript
// Create standardized folder structure for new departments
async function createDepartmentStructure(department) {
  const folderStructure = [
    {
      path: `/Departments/${department.name}`,
      description: `${department.name} departmental analytics`,
      permissions: {
        [`${department.name.toLowerCase()}_team`]: "EDITOR",
        ["executives"]: "VIEWER",
        ["data_team"]: "CONNECTION_ADMIN"
      }
    },
    {
      path: `/Departments/${department.name}/Executive Reports`,
      description: "Executive-level reporting",
      permissions: {
        [`${department.name.toLowerCase()}_director`]: "EDITOR",
        ["executives"]: "VIEWER"
      }
    },
    {
      path: `/Departments/${department.name}/Operational Metrics`,
      description: "Day-to-day operational dashboards",
      permissions: {
        [`${department.name.toLowerCase()}_team`]: "EDITOR"
      }
    },
    {
      path: `/Departments/${department.name}/Analysis Sandbox`,
      description: "Experimental analysis workspace",
      permissions: {
        [`${department.name.toLowerCase()}_analysts`]: "EDITOR"
      }
    }
  ];
  
  // Create folders in sequence
  for (const folder of folderStructure) {
    await createFolder(folder);
  }
}

async function createFolder(folderConfig) {
  const response = await fetch(`${OMNI_API_BASE}/folders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(folderConfig)
  });
  
  if (!response.ok) {
    console.error(`Failed to create folder ${folderConfig.path}`);
  }
  
  return response.json();
}
```

## User Management APIs

### Automated User Provisioning

#### SCIM Integration for User Sync
```javascript
// Sync users from HR system to Omni
class OmniUserManager {
  constructor(apiToken, baseUrl) {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    };
  }
  
  async syncUser(hrUser) {
    const omniUser = this.transformUser(hrUser);
    
    // Check if user already exists
    const existingUser = await this.findUser(hrUser.email);
    
    if (existingUser) {
      return this.updateUser(existingUser.id, omniUser);
    } else {
      return this.createUser(omniUser);
    }
  }
  
  transformUser(hrUser) {
    return {
      email: hrUser.email,
      name: `${hrUser.firstName} ${hrUser.lastName}`,
      
      // Map HR attributes to Omni user attributes
      user_attributes: {
        employee_id: hrUser.employeeId,
        department: hrUser.department,
        job_title: hrUser.jobTitle,
        manager_email: hrUser.managerEmail,
        cost_center: hrUser.costCenter,
        security_clearance: hrUser.securityLevel,
        start_date: hrUser.startDate
      },
      
      // Determine connection permissions based on role
      connection_roles: this.getConnectionRoles(hrUser),
      
      // Add to appropriate groups
      groups: this.determineGroups(hrUser)
    };
  }
  
  getConnectionRoles(hrUser) {
    const roleMapping = {
      'Data Analyst': { 'main_db': 'QUERIER' },
      'Business Analyst': { 'main_db': 'RESTRICTED_QUERIER' },
      'Executive': { 'main_db': 'VIEWER' },
      'Data Engineer': { 'main_db': 'CONNECTION_ADMIN' },
      'Manager': { 'main_db': 'QUERIER' }
    };
    
    return roleMapping[hrUser.jobTitle] || { 'main_db': 'VIEWER' };
  }
  
  async createUser(userData) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userData)
    });
    
    return response.json();
  }
}
```

#### Role-Based Access Management  
```javascript
// Update user permissions based on role changes
async function updateUserRole(userId, newRole, effectiveDate) {
  const roleConfig = await getRoleConfiguration(newRole);
  
  const userUpdate = {
    user_attributes: {
      ...roleConfig.user_attributes,
      role_effective_date: effectiveDate,
      previous_role: await getCurrentUserRole(userId)
    },
    
    connection_roles: roleConfig.connection_roles,
    groups: roleConfig.groups,
    
    // Create audit trail
    change_log: {
      timestamp: new Date().toISOString(),
      change_type: "role_update",
      old_role: await getCurrentUserRole(userId),
      new_role: newRole,
      changed_by: "automated_system"
    }
  };
  
  // Update user
  const response = await fetch(`${OMNI_API_BASE}/users/${userId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(userUpdate)
  });
  
  // Log change for compliance
  await logComplianceEvent({
    event_type: "user_role_change",
    user_id: userId,
    details: userUpdate.change_log
  });
  
  return response.json();
}
```

## Query and Data APIs

### Programmatic Query Execution

#### Automated Report Generation
```javascript
// Generate and distribute automated reports
class AutomatedReporting {
  async generateExecutiveReport(executiveTeam, reportDate) {
    const reportQueries = [
      {
        name: "revenue_summary",
        topic: "financial_metrics",
        measures: ["total_revenue", "revenue_growth"],
        dimensions: ["date_month"],
        filters: { 
          date_range: this.getQuarterRange(reportDate)
        }
      },
      {
        name: "customer_metrics", 
        topic: "customer_analytics",
        measures: ["new_customers", "churn_rate", "customer_ltv"],
        dimensions: ["acquisition_channel"],
        filters: { 
          date_range: this.getQuarterRange(reportDate)
        }
      }
    ];
    
    const reportData = {};
    
    // Execute all queries
    for (const query of reportQueries) {
      const response = await fetch(`${OMNI_API_BASE}/queries/run`, {
        method: 'POST',
        headers,
        body: JSON.stringify(query)
      });
      
      const result = await response.json();
      reportData[query.name] = result.data;
    }
    
    // Generate report document
    const report = await this.formatExecutiveReport(reportData, reportDate);
    
    // Distribute to executive team
    for (const executive of executiveTeam) {
      await this.sendReport(executive, report);
    }
    
    return report;
  }
  
  async formatExecutiveReport(data, reportDate) {
    return {
      title: `Executive Summary - ${reportDate}`,
      generated_at: new Date().toISOString(),
      
      summary: {
        revenue: data.revenue_summary,
        customers: data.customer_metrics
      },
      
      insights: this.generateInsights(data),
      charts: await this.generateCharts(data)
    };
  }
}
```

#### Real-Time Data Monitoring
```javascript
// Monitor key metrics and trigger alerts
class MetricsMonitor {
  constructor(alertThresholds) {
    this.thresholds = alertThresholds;
    this.lastCheckTimestamp = new Date();
  }
  
  async monitorMetrics() {
    const criticalMetrics = [
      {
        name: "system_performance",
        query: {
          topic: "system_metrics",
          measures: ["avg_query_time", "error_rate"],
          filters: { 
            timestamp: { gte: this.lastCheckTimestamp }
          }
        },
        thresholds: {
          avg_query_time: { max: 30 }, // 30 seconds
          error_rate: { max: 0.05 }    // 5%
        }
      },
      {
        name: "business_kpis",
        query: {
          topic: "business_metrics",
          measures: ["daily_revenue", "active_users"],
          filters: {
            date: new Date().toISOString().split('T')[0]
          }
        },
        thresholds: {
          daily_revenue: { 
            min: 50000,  // Alert if revenue < $50k
            change_threshold: -0.20  // Alert if 20% drop
          }
        }
      }
    ];
    
    for (const metric of criticalMetrics) {
      const result = await this.executeQuery(metric.query);
      const alerts = this.checkThresholds(result, metric.thresholds);
      
      if (alerts.length > 0) {
        await this.sendAlerts(metric.name, alerts);
      }
    }
    
    this.lastCheckTimestamp = new Date();
  }
  
  checkThresholds(data, thresholds) {
    const alerts = [];
    
    for (const [metric, threshold] of Object.entries(thresholds)) {
      const value = data[metric];
      
      if (threshold.max && value > threshold.max) {
        alerts.push({
          type: "threshold_exceeded",
          metric,
          value,
          threshold: threshold.max
        });
      }
      
      if (threshold.min && value < threshold.min) {
        alerts.push({
          type: "threshold_below",
          metric,
          value,
          threshold: threshold.min
        });
      }
    }
    
    return alerts;
  }
}
```

## Model Management APIs

### Programmatic Model Updates

#### Dynamic Topic Configuration
```javascript
// Update model topics based on customer subscription changes
async function updateCustomerTopics(customerId, newSubscriptionTier) {
  const topicConfiguration = getTopicsForTier(newSubscriptionTier);
  
  const modelUpdate = {
    topics: topicConfiguration.topics,
    
    // Update access filters
    default_topic_access_filters: [
      {
        field: "customer_id",
        user_attribute: "customer_id",
        default_value: customerId
      },
      {
        field: "subscription_tier",
        user_attribute: "subscription_tier", 
        default_value: newSubscriptionTier
      }
    ],
    
    // Configure AI context for new tier
    ai_chat_topics: topicConfiguration.ai_enabled_topics,
    
    // Update caching policies
    caching_policy: topicConfiguration.caching_config
  };
  
  const response = await fetch(`${OMNI_API_BASE}/model`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(modelUpdate)
  });
  
  return response.json();
}

function getTopicsForTier(tier) {
  const tierConfigurations = {
    'basic': {
      topics: ['usage_overview', 'basic_analytics'],
      ai_enabled_topics: ['usage_overview'],
      caching_config: { default_max_age: 3600 }
    },
    'premium': {
      topics: ['usage_overview', 'advanced_analytics', 'predictive_insights'],
      ai_enabled_topics: ['usage_overview', 'advanced_analytics'],
      caching_config: { default_max_age: 1800 }
    },
    'enterprise': {
      topics: ['usage_overview', 'advanced_analytics', 'predictive_insights', 'custom_reporting'],
      ai_enabled_topics: ['usage_overview', 'advanced_analytics', 'predictive_insights'],
      caching_config: { default_max_age: 900 }
    }
  };
  
  return tierConfigurations[tier] || tierConfigurations['basic'];
}
```

## Webhook and Event Integration

### Real-Time System Integration

#### Webhook Configuration
```javascript
// Set up webhooks for real-time integration
async function configureWebhooks() {
  const webhookConfigs = [
    {
      name: "user_provisioning_webhook",
      url: "https://yourapp.com/api/webhooks/omni/user-events",
      events: ["user.created", "user.updated", "user.deleted"],
      
      // Filter events
      filters: {
        user_attributes: {
          department: ["Sales", "Marketing", "Customer Success"]
        }
      },
      
      // Security
      secret: process.env.WEBHOOK_SECRET,
      retry_policy: {
        max_retries: 3,
        backoff_strategy: "exponential"
      }
    },
    {
      name: "query_performance_webhook",
      url: "https://yourapp.com/api/webhooks/omni/performance",
      events: ["query.slow_execution", "query.error"],
      
      filters: {
        execution_time: { gte: 30 }, // Queries taking >30 seconds
        error_type: ["timeout", "permission_denied"]
      }
    }
  ];
  
  for (const config of webhookConfigs) {
    await createWebhook(config);
  }
}

// Handle incoming webhooks
app.post('/api/webhooks/omni/user-events', (req, res) => {
  const { event_type, data } = req.body;
  
  switch (event_type) {
    case 'user.created':
      handleUserCreated(data.user);
      break;
      
    case 'user.updated':
      handleUserUpdated(data.user, data.changes);
      break;
      
    case 'user.deleted':
      handleUserDeleted(data.user);
      break;
  }
  
  res.status(200).json({ received: true });
});
```

## Error Handling and Best Practices

### Robust API Integration

#### Error Handling Patterns
```javascript
// Comprehensive error handling for API calls
class OmniAPIClient {
  async makeRequest(endpoint, options = {}) {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers: {
            ...this.headers,
            ...options.headers
          }
        });
        
        // Handle different response types
        if (response.ok) {
          return await response.json();
        }
        
        // Handle specific error codes
        switch (response.status) {
          case 401:
            throw new AuthenticationError('Invalid API token');
            
          case 403:
            throw new AuthorizationError('Insufficient permissions');
            
          case 429:
            // Rate limiting - wait and retry
            await this.handleRateLimit(response);
            attempt++;
            continue;
            
          case 500:
            throw new ServerError('Internal server error');
            
          default:
            const errorData = await response.json();
            throw new APIError(errorData.message, response.status);
        }
        
      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
        
        attempt++;
      }
    }
  }
  
  async handleRateLimit(response) {
    const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
    console.log(`Rate limited. Waiting ${retryAfter} seconds...`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
  }
}
```

#### Performance Optimization
```javascript
// Batch operations for better performance
class BatchOperations {
  async batchUpdateUsers(userUpdates) {
    const batchSize = 10;
    const batches = this.chunk(userUpdates, batchSize);
    
    const results = [];
    
    for (const batch of batches) {
      // Process batch in parallel
      const batchPromises = batch.map(update => 
        this.updateUser(update.id, update.data)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
      
      // Rate limiting - pause between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }
  
  chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
```

## Implementation Roadmap

### API Integration Development Path

#### Phase 1: Core Operations (Week 1)
```yaml
foundation_setup:
  goals:
    - "Establish API connectivity and authentication"
    - "Implement basic CRUD operations"
    - "Set up error handling and logging"
    
  deliverables:
    - "API client library"
    - "User management functions"
    - "Basic content operations"
    - "Comprehensive error handling"
```

#### Phase 2: Automation (Weeks 2-3)
```yaml
automation_development:
  goals:
    - "Implement automated user provisioning"
    - "Create content deployment pipelines"
    - "Set up monitoring and alerting"
    
  deliverables:
    - "HR system integration"
    - "Automated dashboard creation"
    - "Performance monitoring system"
    - "Webhook integrations"
```

#### Phase 3: Advanced Features (Weeks 4-6)
```yaml
advanced_integration:
  goals:
    - "Implement complex business logic"
    - "Optimize performance and reliability"
    - "Create comprehensive documentation"
    
  deliverables:
    - "Multi-tenant management system"
    - "Advanced reporting automation"
    - "Custom workflow integration"
    - "API usage analytics"
```

API integration transforms Omni from a standalone analytics tool into a fully integrated component of your technology ecosystem. By leveraging programmatic control, organizations can achieve unprecedented scale, automation, and customization in their analytics operations.

> **Next Steps:** Our final lesson covers dbt and Git Integration, where you'll learn to integrate Omni with your existing data engineering workflows and version control systems for a complete modern data stack. 