---
id: "04-embedding-integration"
title: "Embedding and External Integration"
description: "Embed Omni dashboards and AI capabilities in external applications" 
duration: "22 min"
videoId: "dQw4w9WgXcQ"
order: 4
---

# Embedding and External Integration

Modern analytics needs to be where your users are—not locked away in a separate BI tool. Omni's embedding capabilities allow you to bring powerful analytics directly into your existing applications, customer portals, and business workflows while maintaining enterprise security and governance.

## Why Embedding Matters

### The Analytics Adoption Challenge

#### Traditional Analytics Problems
❌ **Context Switching** - Users must leave their workflow to access insights
❌ **Tool Proliferation** - Multiple analytics tools create confusion and fragmentation
❌ **Adoption Barriers** - Learning a new interface reduces user engagement
❌ **Stale Insights** - Reports viewed outside the decision-making context lose impact
❌ **Limited Distribution** - Analytics locked in specialist tools don't reach decision makers

#### Embedding Benefits
✅ **Contextual Analytics** - Insights appear where decisions are made
✅ **Seamless User Experience** - Analytics feel native to existing applications
✅ **Increased Adoption** - Users don't need to learn new tools
✅ **Real-Time Decision Making** - Data available at the point of action
✅ **Broad Distribution** - Analytics reach all stakeholders naturally

### Business Use Cases for Embedding

#### Customer-Facing Analytics
- **SaaS Dashboards:** Customer usage and performance metrics
- **E-commerce Portals:** Sales performance and inventory insights  
- **Financial Services:** Account summaries and investment performance
- **Healthcare Systems:** Patient analytics and operational metrics

#### Internal Process Integration
- **CRM Systems:** Sales pipeline and performance data
- **Support Tools:** Customer success metrics and case analytics
- **Operations Dashboards:** Real-time monitoring and alerting
- **Executive Portals:** Strategic KPIs and board reporting

## Omni's Embedding Architecture

### Two Embedding Approaches

#### 1. Internal Embedding
**Use Case:** Embedding within your organization's internal tools
```yaml
# Simple iframe-based embedding
target_audience: "Internal employees and stakeholders"
authentication: "Organization's SSO system"
permissions: "Existing Omni user permissions"
setup_complexity: "Low - just iframe URLs"

examples:
  - "Salesforce dashboards"
  - "Notion workspace analytics"
  - "Internal wiki reporting"
  - "Slack channel summaries"
```

#### 2. External Embedding
**Use Case:** Customer-facing analytics and external partner access
```yaml
# Sophisticated programmatic embedding
target_audience: "Customers, partners, external stakeholders"
authentication: "Your application's authentication system"
permissions: "Row-level security and user attributes"
setup_complexity: "Medium - requires development integration"

examples:
  - "Customer portal analytics"
  - "Partner performance dashboards"
  - "Public-facing reports"
  - "Multi-tenant SaaS analytics"
```

## Internal Embedding Implementation

### Quick Setup for Internal Use

#### Generating Embed URLs
```javascript
// Simple internal embedding process
1. Navigate to dashboard or workbook in Omni
2. Click "Share" button in toolbar
3. Select "Embed" tab
4. Customize settings (theme, filters, etc.)
5. Copy iframe code
6. Paste into target application
```

#### Example Implementation
```html
<!-- Embedded Omni dashboard in internal portal -->
<div class="analytics-section">
  <h2>Sales Performance Dashboard</h2>
  <iframe 
    src="https://omni.yourorg.com/embed/dashboards/abc123?theme=light"
    width="100%"
    height="600"
    frameborder="0"
    style="border-radius: 8px;">
  </iframe>
</div>
```

### Internal Embedding Examples

#### Salesforce Integration
```apex
// Visualforce page for Omni dashboard
<apex:page sidebar="false" showHeader="false">
  <style>
    html { width: 100%; height: 100%; margin: 0; }
    .omni-container { width: 100%; height: 100vh; }
  </style>
  
  <div class="omni-container">
    <apex:iframe 
      scrolling="true" 
      width="100%" 
      height="100%"
      src="https://omni.yourorg.com/embed/dashboards/sales-pipeline?
           filter_account_id={!Account.Id}&
           theme=salesforce" 
    />
  </div>
</apex:page>
```

#### Notion Workspace Integration
```markdown
<!-- Notion page with embedded analytics -->
# Team Performance Dashboard

<iframe 
  src="https://omni.yourorg.com/embed/dashboards/team-metrics"
  width="100%" 
  height="500"
  frameborder="0">
</iframe>

## Key Insights
- Team velocity has increased 15% this quarter
- Customer satisfaction scores trending upward
- Resource utilization optimized across projects
```

## External Embedding Implementation

### Advanced Security and Customization

#### External Embedding Benefits
- **Row-Level Security:** Each user sees only their authorized data
- **Custom Branding:** Match your application's look and feel
- **SSO Integration:** Users authenticate through your system
- **API Control:** Programmatic management of users and permissions
- **Real-time Updates:** Live data without manual refreshes

### Implementation Architecture

#### 1. Standard SSO Embed Flow
```javascript
// Standard single-step embedding process
const embedUrl = await generateOmniEmbedUrl({
  contentPath: '/dashboards/customer-analytics',
  externalId: user.customerId,
  name: user.fullName,
  userAttributes: {
    customer_id: user.customerId,
    subscription_tier: user.subscriptionTier,
    region: user.region
  },
  connectionRoles: {
    "connection_123": "RESTRICTED_QUERIER"
  }
});

// Use URL in iframe
const iframe = document.createElement('iframe');
iframe.src = embedUrl;
iframe.width = '100%';
iframe.height = '600px';
document.getElementById('analytics-container').appendChild(iframe);
```

#### 2. Two-Step SSO Embed Flow
```javascript
// Two-step process for enhanced control
// Step 1: Generate session
const sessionResponse = await fetch('/api/omni/generate-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    externalId: user.customerId,
    name: user.fullName,
    userAttributes: getUserAttributes(user),
    connectionRoles: getConnectionRoles(user.subscriptionTier)
  })
});

const { sessionToken } = await sessionResponse.json();

// Step 2: Use session token for authentication
const embedUrl = `https://omni.yourorg.com/embed/login?
  sessionToken=${sessionToken}&
  contentPath=/dashboards/customer-analytics`;
```

### Row-Level Security Implementation

#### Multi-Tenant Data Isolation
```yaml
# Customer A sees only their data
user_attributes:
  customer_id: "CUST_A_123"
  subscription_tier: "premium"
  
# Automatic data filtering
applied_filters:
  - table: "orders"
    filter: "customer_id = 'CUST_A_123'"
  - table: "analytics_events"  
    filter: "customer_id = 'CUST_A_123'"
  - table: "usage_metrics"
    filter: "customer_id = 'CUST_A_123'"

# Customer B sees completely different data
user_attributes:
  customer_id: "CUST_B_456"
  subscription_tier: "standard"
  
applied_filters:
  - table: "orders"
    filter: "customer_id = 'CUST_B_456'"
  # Same security rules, different data
```

#### Subscription Tier-Based Access
```yaml
# Premium customers see more detailed analytics
premium_user_attributes:
  subscription_tier: "premium"
  advanced_analytics: true
  
available_topics:
  - "Basic Usage Metrics"
  - "Advanced Performance Analytics"  
  - "Predictive Insights"
  - "Custom Reporting"

# Standard customers see basic metrics only
standard_user_attributes:
  subscription_tier: "standard"
  advanced_analytics: false
  
available_topics:
  - "Basic Usage Metrics"
  # Limited access based on subscription
```

## Advanced Embedding Features

### AI Chat Integration

#### Embedding Omni's AI Query Helper
```javascript
// Embed AI chat interface for natural language querying
const aiChatConfig = {
  contentPath: '/chat',
  connectionRoles: {
    "analytics_db": "RESTRICTED_QUERIER"
  },
  
  // Customize AI chat experience
  branding: {
    logo_url: "https://yourapp.com/logo.png",
    intro_headline: "Ask questions about your data",
    intro_body: "Use natural language to explore your analytics",
    prompt_placeholder: "What insights would you like to see?"
  },
  
  // Scope AI to specific topics
  ai_accessible_topics: [
    "Customer Performance",
    "Usage Analytics", 
    "Financial Metrics"
  ]
};

const aiEmbedUrl = await generateAiChatEmbed(aiChatConfig);
```

#### Natural Language Query Examples
```javascript
// Users can ask questions naturally
const exampleQueries = [
  "What was our revenue growth last quarter?",
  "Show me top 10 customers by usage",
  "How does churn rate vary by subscription tier?",
  "Which features are most popular this month?",
  "Compare this year's performance to last year"
];

// AI translates to precise Omni queries automatically
// Results respect all security and permission rules
```

### Create Mode for Self-Service

#### Empowering Customer Analytics
```yaml
# Enable customers to create their own content
create_mode_config:
  mode: "APPLICATION"
  entity: customer.organization_id  # Isolates customer data
  
  # Permissions for customer users
  entityFolderContentRole: "EDITOR"
  connectionRoles:
    customer_data_connection: "QUERIER"
    
  # Customer can create and share within their organization
  capabilities:
    - create_workbooks: true
    - build_dashboards: true  
    - share_with_team: true
    - export_data: true
    - use_ai_features: true
```

#### Entity-Based Isolation
```yaml
# Each customer gets isolated workspace
entity_isolation:
  customer_a:
    entity_id: "customer_a_corp"
    shared_folder: "/Customers/CustomerA Corp"
    user_group: "CustomerA Users"
    data_access: "customer_a filtered data only"
    
  customer_b:
    entity_id: "customer_b_inc"  
    shared_folder: "/Customers/CustomerB Inc"
    user_group: "CustomerB Users"
    data_access: "customer_b filtered data only"
    
# Complete data and content isolation between entities
```

## Customization and Branding

### Visual Customization

#### Theme and Styling Options
```javascript
// Custom themes for embedded content
const customTheme = {
  "dashboard-background": "#f8f9fa",
  "primary-color": "#007bff",
  "text-color": "#212529", 
  "border-color": "#dee2e6",
  "chart-color-palette": ["#007bff", "#28a745", "#ffc107", "#dc3545"],
  "font-family": "Inter, sans-serif",
  "dashboard-tile-title-font-size": "1.2rem",
  "dashboard-padding": "20px"
};

const embedUrl = generateEmbedUrl({
  contentPath: '/dashboards/customer-portal',
  customTheme: customTheme,
  prefersDark: false
});
```

#### Vanity Domain Setup
```yaml
# Use your own domain for embedded analytics
vanity_domain_setup:
  your_domain: "analytics.yourcompany.com"
  omni_subdomain: "analytics.yourcompany.com"
  
  benefits:
    - "First-party cookies support"
    - "Seamless branding experience"  
    - "No third-party content warnings"
    - "SSL certificate consistency"
    
  requirements:
    - "Multi-part domain (3+ segments)"
    - "DNS configuration"
    - "SSL certificate setup"
    - "Omni support coordination"
```

### Interactive Features

#### JavaScript Events and Communication
```javascript
// Listen for events from embedded Omni content
window.addEventListener('message', function(event) {
  if (event.origin !== 'https://omni.yourorg.com') return;
  
  // Handle different event types
  switch (event.data.type) {
    case 'OMNI_FILTER_CHANGED':
      console.log('User changed filters:', event.data.filters);
      updateApplicationState(event.data.filters);
      break;
      
    case 'OMNI_DRILL_DOWN':
      console.log('User drilled down:', event.data.drillPath);
      logAnalyticsInteraction('drill_down', event.data);
      break;
      
    case 'OMNI_QUERY_COMPLETED':
      console.log('Query finished:', event.data.queryTime);
      updatePerformanceMetrics(event.data.queryTime);
      break;
  }
});

// Send commands to embedded content
function applyFilterToOmni(filterName, filterValue) {
  const iframe = document.getElementById('omni-embed');
  iframe.contentWindow.postMessage({
    type: 'APPLY_FILTER',
    filter: { name: filterName, value: filterValue }
  }, 'https://omni.yourorg.com');
}
```

#### Dynamic Content Updates
```javascript
// Update embedded content based on application state
function updateEmbeddedDashboard(newFilters) {
  // Build new URL with updated parameters
  const updatedUrl = updateUrlParameters(currentEmbedUrl, {
    date_range: newFilters.dateRange,
    region: newFilters.region,
    product_category: newFilters.productCategory
  });
  
  // Update iframe source
  document.getElementById('omni-embed').src = updatedUrl;
}

// Respond to application navigation
function onApplicationRouteChange(route) {
  // Load different dashboard based on current page
  const dashboardMap = {
    '/customers': 'customer-analytics',
    '/sales': 'sales-dashboard', 
    '/operations': 'operational-metrics'
  };
  
  const dashboardId = dashboardMap[route];
  if (dashboardId) {
    loadDashboard(dashboardId);
  }
}
```

## API Integration and Automation

### Content Management APIs

#### Programmatic Dashboard Management
```javascript
// Create dashboards programmatically
async function createCustomerDashboard(customerId, customerName) {
  const dashboardConfig = {
    name: `${customerName} Analytics Dashboard`,
    description: `Dedicated analytics for ${customerName}`,
    folder: `/Customers/${customerName}`,
    
    // Apply customer-specific filters
    defaultFilters: {
      customer_id: customerId
    },
    
    // Configure permissions
    permissions: {
      [`customer_${customerId}_users`]: "VIEWER",
      ["customer_success_team"]: "EDITOR"
    }
  };
  
  const response = await fetch('/api/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${omniApiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dashboardConfig)
  });
  
  return response.json();
}

// Update dashboard based on customer changes
async function updateCustomerAccess(customerId, newSubscriptionTier) {
  const availableTopics = getTopicsForTier(newSubscriptionTier);
  
  await updateUserAttributes(customerId, {
    subscription_tier: newSubscriptionTier,
    available_topics: availableTopics,
    last_updated: new Date().toISOString()
  });
}
```

#### Automated User Management
```javascript
// Sync users between your system and Omni
async function syncUserToOmni(user) {
  const omniUser = {
    externalId: user.id,
    name: user.fullName,
    email: user.email,
    
    // Map your user attributes to Omni
    userAttributes: {
      customer_id: user.organizationId,
      department: user.department,
      role: user.role,
      subscription_tier: user.organization.subscriptionTier,
      data_access_level: calculateDataAccessLevel(user)
    },
    
    // Set appropriate connection permissions
    connectionRoles: getConnectionRoles(user.role, user.subscriptionTier)
  };
  
  // Create or update user in Omni
  const response = await fetch('/api/v1/embed/users', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${omniApiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(omniUser)
  });
  
  return response.json();
}
```

## Security Best Practices for Embedding

### Data Security Framework

#### Multi-Tenant Security Checklist
```yaml
security_checklist:
  data_isolation:
    - "Row-level security implemented for all tables"
    - "User attributes properly configured and validated"
    - "Default filters prevent data leakage"
    - "Cross-tenant access impossible"
    
  authentication:
    - "Strong session token generation"
    - "Token expiration and refresh policies"
    - "SSL/TLS encryption for all communications"
    - "CSRF protection implemented"
    
  authorization:
    - "Least privilege access principle"
    - "Regular permission audits"
    - "Automated access reviews"
    - "Emergency access revocation procedures"
    
  monitoring:
    - "All data access logged"
    - "Unusual activity alerts"
    - "Performance monitoring"
    - "Security incident response plan"
```

#### Implementation Validation
```javascript
// Test data isolation in embedded environments
async function validateDataIsolation() {
  const testScenarios = [
    {
      name: "Customer A isolation test",
      userId: "customer_a_user_1",  
      expectedData: "customer_a_data_only",
      forbiddenData: ["customer_b_data", "customer_c_data"]
    },
    {
      name: "Subscription tier test",
      userId: "standard_tier_user",
      expectedFeatures: ["basic_analytics"],
      forbiddenFeatures: ["advanced_analytics", "predictive_models"]
    }
  ];
  
  for (const scenario of testScenarios) {
    const embedUrl = await generateTestEmbedUrl(scenario.userId);
    const accessibleData = await testDataAccess(embedUrl);
    
    // Validate proper isolation
    assert(containsOnly(accessibleData, scenario.expectedData));
    assert(containsNone(accessibleData, scenario.forbiddenData));
  }
}
```

## Implementation Best Practices

### Development Workflow

#### Phase 1: Internal Embedding (Week 1)
```yaml
internal_phase:
  goals:
    - "Prove value with internal stakeholders"
    - "Test basic embedding functionality"
    - "Validate user experience"
    
  tasks:
    - "Identify 2-3 high-value internal use cases"
    - "Implement simple iframe embedding"
    - "Gather feedback from internal users"
    - "Document lessons learned"
```

#### Phase 2: External Pilot (Weeks 2-4)
```yaml
external_pilot:
  goals: 
    - "Validate external embedding architecture"
    - "Test security and isolation"
    - "Measure customer adoption"
    
  tasks:
    - "Select 3-5 pilot customers"
    - "Implement row-level security"
    - "Build customer-specific dashboards"
    - "Monitor usage and performance"
```

#### Phase 3: Production Rollout (Weeks 5-8)
```yaml
production_rollout:
  goals:
    - "Scale to all customers"
    - "Optimize performance and user experience"
    - "Establish operational procedures"
    
  tasks:
    - "Automate user and content provisioning"
    - "Implement monitoring and alerting"
    - "Train customer success team"
    - "Document support procedures"
```

### Measuring Embedding Success

#### Technical Metrics
```yaml
technical_kpis:
  - embed_load_time: "< 3 seconds"
  - api_response_time: "< 500ms"
  - uptime: "> 99.5%"
  - security_incidents: "0 data breaches"
  - user_provisioning_time: "< 5 minutes"
```

#### Business Metrics
```yaml
business_kpis:
  - user_adoption_rate: "> 60% monthly active users"
  - customer_satisfaction: "> 4.5/5 for embedded analytics"
  - support_ticket_reduction: "30% fewer data-related tickets"
  - time_to_insight: "50% faster than previous solution"
  - customer_retention_impact: "Measurable improvement in churn"
```

Embedding transforms analytics from a separate tool into an integral part of your business processes and customer experience. By bringing insights directly to where decisions are made, organizations can dramatically increase the impact and adoption of their analytics investments while maintaining enterprise-grade security and governance.

> **Next Steps:** Our final lesson in this chapter covers API Development and Automation, where you'll learn to programmatically manage Omni resources, automate workflows, and integrate analytics capabilities into your broader technology stack. 