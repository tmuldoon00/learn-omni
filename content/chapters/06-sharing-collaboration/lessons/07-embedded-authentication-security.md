---
id: 07-embedded-authentication-security
title: Embedded Authentication and Security Architecture
description: Implement enterprise-grade security for embedded analytics with SSO, RBAC, and data protection
duration: 10 min
videoId: uOBCVXl0yKU
order: 7
---

# Embedded Authentication and Security Architecture

## **Overview**

Master enterprise-grade security implementation for embedded analytics. Learn to integrate SSO providers, implement role-based access control, secure data transmission, and maintain compliance while delivering seamless user experiences.

## **Key Learning Objectives**

- **Enterprise SSO Integration**: Implement seamless single sign-on workflows
- **Role-Based Access Control**: Design granular permission systems
- **Data Security**: Protect sensitive data in embedded environments
- **Compliance Architecture**: Meet regulatory and security requirements

## **Enterprise Authentication Architecture**

### **1. SSO Integration Patterns**
```javascript
// SAML 2.0 SSO Integration
class SAMLAuthProvider {
  constructor(config) {
    this.config = {
      entityId: config.entityId,
      ssoUrl: config.ssoUrl,
      certificate: config.certificate,
      nameIdFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
    };
  }
  
  async initiateSSOLogin(returnUrl) {
    const samlRequest = await this.generateSAMLRequest({
      issuer: this.config.entityId,
      destination: this.config.ssoUrl,
      returnUrl: returnUrl
    });
    
    return {
      ssoUrl: this.config.ssoUrl,
      samlRequest: samlRequest,
      relayState: returnUrl
    };
  }
  
  async validateSAMLResponse(samlResponse, relayState) {
    // Validate signature and certificate
    const isValid = await this.validateSignature(samlResponse);
    if (!isValid) {
      throw new Error('Invalid SAML signature');
    }
    
    // Extract user attributes
    const userAttributes = this.extractUserAttributes(samlResponse);
    
    // Generate session token
    const sessionToken = await this.generateSecureToken(userAttributes);
    
    return {
      success: true,
      user: userAttributes,
      token: sessionToken,
      returnUrl: relayState
    };
  }
}

// OAuth 2.0 / OpenID Connect Integration
class OIDCAuthProvider {
  constructor(config) {
    this.config = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      discoveryUrl: config.discoveryUrl,
      redirectUri: config.redirectUri,
      scopes: ['openid', 'profile', 'email', 'groups']
    };
  }
  
  async initiateOIDCLogin() {
    const state = this.generateSecureState();
    const nonce = this.generateNonce();
    
    const authUrl = new URL(this.config.authorizationEndpoint);
    authUrl.searchParams.set('client_id', this.config.clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', this.config.scopes.join(' '));
    authUrl.searchParams.set('redirect_uri', this.config.redirectUri);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);
    
    return {
      authUrl: authUrl.toString(),
      state: state,
      nonce: nonce
    };
  }
  
  async handleCallback(code, state, receivedState) {
    // Validate state parameter
    if (state !== receivedState) {
      throw new Error('Invalid state parameter');
    }
    
    // Exchange code for tokens
    const tokenResponse = await this.exchangeCodeForTokens(code);
    
    // Validate and decode ID token
    const idToken = await this.validateIdToken(tokenResponse.id_token);
    
    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      user: idToken.payload
    };
  }
}
```

### **2. JWT Token Management**
```javascript
// Enterprise JWT handling with enhanced security
class EnterpriseTokenManager {
  constructor(config) {
    this.config = {
      issuer: config.issuer,
      audience: config.audience,
      algorithm: 'RS256',
      publicKey: config.publicKey,
      privateKey: config.privateKey,
      tokenTTL: config.tokenTTL || 3600, // 1 hour
      refreshTTL: config.refreshTTL || 86400 // 24 hours
    };
  }
  
  async generateAccessToken(userClaims) {
    const payload = {
      iss: this.config.issuer,
      aud: this.config.audience,
      sub: userClaims.userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.config.tokenTTL,
      
      // User claims
      email: userClaims.email,
      name: userClaims.name,
      roles: userClaims.roles,
      permissions: userClaims.permissions,
      
      // Security claims
      session_id: userClaims.sessionId,
      ip_address: userClaims.ipAddress,
      user_agent_hash: this.hashUserAgent(userClaims.userAgent),
      
      // Data access claims
      data_domains: userClaims.dataDomains,
      access_level: userClaims.accessLevel,
      organization_id: userClaims.organizationId
    };
    
    return jwt.sign(payload, this.config.privateKey, {
      algorithm: this.config.algorithm,
      keyid: this.config.keyId
    });
  }
  
  async validateToken(token, requiredScopes = []) {
    try {
      // Verify signature and standard claims
      const decoded = jwt.verify(token, this.config.publicKey, {
        algorithms: [this.config.algorithm],
        issuer: this.config.issuer,
        audience: this.config.audience
      });
      
      // Validate custom security claims
      await this.validateSecurityClaims(decoded);
      
      // Check required scopes/permissions
      if (requiredScopes.length > 0) {
        this.validateScopes(decoded.permissions, requiredScopes);
      }
      
      return decoded;
      
    } catch (error) {
      throw new Error(`Token validation failed: ${error.message}`);
    }
  }
  
  async validateSecurityClaims(tokenPayload) {
    // Check token hasn't been revoked
    const isRevoked = await this.checkTokenRevocation(tokenPayload.jti);
    if (isRevoked) {
      throw new Error('Token has been revoked');
    }
    
    // Validate session is still active
    const sessionValid = await this.validateSession(tokenPayload.session_id);
    if (!sessionValid) {
      throw new Error('Session is no longer valid');
    }
    
    // Additional security validations can be added here
  }
}
```

### **3. Row-Level Security Implementation**
```sql
-- Dynamic row-level security for embedded analytics
CREATE OR REPLACE FUNCTION get_user_data_filter(user_context OBJECT)
RETURNS VARCHAR
LANGUAGE SQL
AS
$$
BEGIN
  -- Extract user information from context
  LET user_id := user_context:user_id::VARCHAR;
  LET organization_id := user_context:organization_id::VARCHAR;
  LET roles := user_context:roles;
  LET data_domains := user_context:data_domains;
  
  -- Build dynamic filter based on user permissions
  LET base_filter := 'organization_id = ''' || organization_id || '''';
  
  -- Apply role-based restrictions
  IF (ARRAY_CONTAINS('executive'::VARIANT, roles)) THEN
    -- Executives see all organization data
    RETURN base_filter;
  ELSIF (ARRAY_CONTAINS('manager'::VARIANT, roles)) THEN
    -- Managers see their department data
    LET department_filter := ' AND department_id IN (SELECT department_id FROM user_departments WHERE user_id = ''' || user_id || ''')';
    RETURN base_filter || department_filter;
  ELSIF (ARRAY_CONTAINS('analyst'::VARIANT, roles)) THEN
    -- Analysts see data from their assigned domains
    LET domain_filter := ' AND data_domain IN (''' || ARRAY_TO_STRING(data_domains, ''',''') || ''')';
    RETURN base_filter || domain_filter;
  ELSE
    -- Default: user sees only their own data
    LET user_filter := ' AND created_by = ''' || user_id || '''';
    RETURN base_filter || user_filter;
  END IF;
END;
$$;

-- Apply row-level security to views
CREATE OR REPLACE SECURE VIEW customer_analytics_secure AS
SELECT 
  customer_id,
  customer_name,
  revenue,
  order_count,
  last_order_date,
  customer_segment
FROM customer_analytics
WHERE EVAL(get_user_data_filter(current_user_context()));

-- Column-level security for sensitive data
CREATE OR REPLACE SECURE VIEW financial_metrics_secure AS
SELECT 
  metric_date,
  organization_id,
  
  -- Revenue visible to all authorized users
  revenue,
  order_count,
  
  -- Costs only visible to finance roles
  CASE 
    WHEN ARRAY_CONTAINS('finance'::VARIANT, current_user_context():roles)
    THEN cost_of_goods_sold
    ELSE NULL
  END as cost_of_goods_sold,
  
  -- Profit margins only for executives and finance
  CASE 
    WHEN ARRAY_CONTAINS('executive'::VARIANT, current_user_context():roles) OR
         ARRAY_CONTAINS('finance'::VARIANT, current_user_context():roles)
    THEN profit_margin
    ELSE NULL
  END as profit_margin,
  
  -- Customer acquisition costs - restricted access
  CASE 
    WHEN ARRAY_CONTAINS('marketing'::VARIANT, current_user_context():roles) OR
         ARRAY_CONTAINS('executive'::VARIANT, current_user_context():roles)
    THEN customer_acquisition_cost
    ELSE NULL
  END as customer_acquisition_cost
  
FROM financial_metrics
WHERE EVAL(get_user_data_filter(current_user_context()));
```

## **Role-Based Access Control (RBAC)**

### **1. Permission Management System**
```python
# Comprehensive RBAC implementation
from enum import Enum
from typing import List, Dict, Set
from dataclasses import dataclass

class Permission(Enum):
    # Data access permissions
    VIEW_DASHBOARD = "view_dashboard"
    EDIT_DASHBOARD = "edit_dashboard"
    SHARE_DASHBOARD = "share_dashboard"
    EXPORT_DATA = "export_data"
    VIEW_RAW_DATA = "view_raw_data"
    
    # Administrative permissions
    MANAGE_USERS = "manage_users"
    CONFIGURE_SECURITY = "configure_security"
    VIEW_AUDIT_LOGS = "view_audit_logs"
    
    # Data source permissions
    CONNECT_DATA_SOURCE = "connect_data_source"
    MODIFY_DATA_MODEL = "modify_data_model"
    
    # Advanced analytics permissions
    CREATE_CALCULATED_FIELDS = "create_calculated_fields"
    USE_AI_FEATURES = "use_ai_features"
    ACCESS_ADVANCED_FUNCTIONS = "access_advanced_functions"

@dataclass
class Role:
    name: str
    permissions: Set[Permission]
    data_domains: List[str]
    row_level_restrictions: Dict
    column_level_restrictions: Dict

class RBACManager:
    def __init__(self):
        self.roles = self._initialize_default_roles()
        self.user_roles = {}
        
    def _initialize_default_roles(self) -> Dict[str, Role]:
        return {
            'viewer': Role(
                name='Viewer',
                permissions={Permission.VIEW_DASHBOARD},
                data_domains=['public'],
                row_level_restrictions={'scope': 'department'},
                column_level_restrictions={'sensitive_columns': False}
            ),
            
            'analyst': Role(
                name='Analyst',
                permissions={
                    Permission.VIEW_DASHBOARD,
                    Permission.EDIT_DASHBOARD,
                    Permission.EXPORT_DATA,
                    Permission.CREATE_CALCULATED_FIELDS,
                    Permission.USE_AI_FEATURES
                },
                data_domains=['analytics', 'reporting'],
                row_level_restrictions={'scope': 'organization'},
                column_level_restrictions={'sensitive_columns': True}
            ),
            
            'manager': Role(
                name='Manager',
                permissions={
                    Permission.VIEW_DASHBOARD,
                    Permission.EDIT_DASHBOARD,
                    Permission.SHARE_DASHBOARD,
                    Permission.EXPORT_DATA,
                    Permission.VIEW_RAW_DATA,
                    Permission.CREATE_CALCULATED_FIELDS
                },
                data_domains=['all_departmental'],
                row_level_restrictions={'scope': 'multi_department'},
                column_level_restrictions={'sensitive_columns': True}
            ),
            
            'executive': Role(
                name='Executive',
                permissions=set(Permission),  # All permissions
                data_domains=['unrestricted'],
                row_level_restrictions={'scope': 'global'},
                column_level_restrictions={'sensitive_columns': True}
            )
        }
    
    def assign_role_to_user(self, user_id: str, role_name: str, context: Dict = None):
        """Assign role to user with optional context restrictions"""
        if role_name not in self.roles:
            raise ValueError(f"Role {role_name} does not exist")
            
        user_role = self.roles[role_name]
        
        # Apply context-specific restrictions if provided
        if context:
            user_role = self._apply_context_restrictions(user_role, context)
            
        self.user_roles[user_id] = user_role
        
    def check_permission(self, user_id: str, permission: Permission, resource_context: Dict = None) -> bool:
        """Check if user has specific permission for resource"""
        if user_id not in self.user_roles:
            return False
            
        user_role = self.user_roles[user_id]
        
        # Check basic permission
        if permission not in user_role.permissions:
            return False
            
        # Apply resource-specific context checks
        if resource_context:
            return self._validate_resource_access(user_role, resource_context)
            
        return True
        
    def get_data_filter(self, user_id: str) -> Dict:
        """Get data access filter for user"""
        if user_id not in self.user_roles:
            return {'access': 'denied'}
            
        user_role = self.user_roles[user_id]
        
        return {
            'data_domains': user_role.data_domains,
            'row_restrictions': user_role.row_level_restrictions,
            'column_restrictions': user_role.column_level_restrictions
        }
```

### **2. Dynamic Permission Evaluation**
```javascript
// Client-side permission enforcement
class ClientPermissionManager {
  constructor(userToken) {
    this.userContext = this.decodeToken(userToken);
    this.permissions = new Set(this.userContext.permissions);
    this.roles = new Set(this.userContext.roles);
  }
  
  hasPermission(permission, resourceContext = null) {
    // Check basic permission
    if (!this.permissions.has(permission)) {
      return false;
    }
    
    // Apply resource-specific checks
    if (resourceContext) {
      return this.validateResourceAccess(permission, resourceContext);
    }
    
    return true;
  }
  
  validateResourceAccess(permission, resourceContext) {
    // Check data domain access
    if (resourceContext.dataDomain) {
      const allowedDomains = this.userContext.data_domains;
      if (!allowedDomains.includes('unrestricted') && 
          !allowedDomains.includes(resourceContext.dataDomain)) {
        return false;
      }
    }
    
    // Check organization context
    if (resourceContext.organizationId !== this.userContext.organization_id) {
      return false;
    }
    
    // Apply role-based resource restrictions
    return this.applyRoleBasedRestrictions(permission, resourceContext);
  }
  
  getUIPermissions() {
    return {
      canViewDashboard: this.hasPermission('view_dashboard'),
      canEditDashboard: this.hasPermission('edit_dashboard'),
      canShareContent: this.hasPermission('share_dashboard'),
      canExportData: this.hasPermission('export_data'),
      canAccessRawData: this.hasPermission('view_raw_data'),
      canUseAIFeatures: this.hasPermission('use_ai_features'),
      canManageUsers: this.hasPermission('manage_users'),
      
      // UI element visibility
      showAdvancedFeatures: this.roles.has('analyst') || this.roles.has('executive'),
      showAdminPanel: this.roles.has('admin') || this.roles.has('executive'),
      showFinancialData: this.hasPermission('view_financial_data')
    };
  }
}
```

## **Data Protection and Encryption**

### **1. End-to-End Encryption**
```javascript
// Data encryption for embedded analytics
class DataProtectionManager {
  constructor(config) {
    this.encryptionKey = config.encryptionKey;
    this.keyRotationSchedule = config.keyRotationSchedule;
    this.dataClassificationRules = config.dataClassificationRules;
  }
  
  async encryptSensitiveData(data, classification) {
    const encryptionMethod = this.getEncryptionMethod(classification);
    
    switch (encryptionMethod) {
      case 'AES-256-GCM':
        return await this.aesEncrypt(data);
      case 'RSA-OAEP':
        return await this.rsaEncrypt(data);
      case 'field-level':
        return await this.fieldLevelEncrypt(data);
      default:
        return data; // No encryption required
    }
  }
  
  async aesEncrypt(data) {
    const key = await crypto.subtle.importKey(
      'raw',
      this.encryptionKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encodedData
    );
    
    return {
      encryptedData: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      algorithm: 'AES-256-GCM'
    };
  }
  
  async fieldLevelEncrypt(data) {
    const encryptedData = { ...data };
    
    for (const [field, value] of Object.entries(data)) {
      const fieldClassification = this.classifyField(field, value);
      
      if (fieldClassification.requiresEncryption) {
        encryptedData[field] = await this.encryptField(value, fieldClassification);
      }
    }
    
    return encryptedData;
  }
  
  classifyField(fieldName, fieldValue) {
    // Apply data classification rules
    for (const rule of this.dataClassificationRules) {
      if (this.matchesRule(fieldName, fieldValue, rule)) {
        return {
          classification: rule.classification,
          requiresEncryption: rule.requiresEncryption,
          encryptionMethod: rule.encryptionMethod
        };
      }
    }
    
    return { classification: 'public', requiresEncryption: false };
  }
}
```

### **2. Data Masking and Anonymization**
```sql
-- Dynamic data masking based on user permissions
CREATE OR REPLACE FUNCTION apply_data_masking(
  field_value VARCHAR,
  field_name VARCHAR,
  user_context OBJECT
)
RETURNS VARCHAR
LANGUAGE SQL
AS
$$
BEGIN
  -- Check if user has permission to see unmasked data
  LET permissions := user_context:permissions;
  LET access_level := user_context:access_level;
  
  -- Email masking
  IF (field_name ILIKE '%email%') THEN
    IF (ARRAY_CONTAINS('view_pii'::VARIANT, permissions)) THEN
      RETURN field_value;
    ELSE
      RETURN REGEXP_REPLACE(field_value, '(.{2})(.*)(@.*)', '\\1***\\3');
    END IF;
  END IF;
  
  -- Phone number masking
  IF (field_name ILIKE '%phone%') THEN
    IF (ARRAY_CONTAINS('view_pii'::VARIANT, permissions)) THEN
      RETURN field_value;
    ELSE
      RETURN REGEXP_REPLACE(field_value, '(\\d{3})(\\d{3})(\\d{4})', '\\1-***-\\3');
    END IF;
  END IF;
  
  -- Credit card masking
  IF (field_name ILIKE '%card%' OR field_name ILIKE '%payment%') THEN
    IF (ARRAY_CONTAINS('view_financial_details'::VARIANT, permissions)) THEN
      RETURN field_value;
    ELSE
      RETURN REGEXP_REPLACE(field_value, '(\\d{4})(\\d+)(\\d{4})', '\\1-****-****-\\3');
    END IF;
  END IF;
  
  -- SSN masking
  IF (field_name ILIKE '%ssn%' OR field_name ILIKE '%social%') THEN
    IF (ARRAY_CONTAINS('view_government_id'::VARIANT, permissions)) THEN
      RETURN field_value;
    ELSE
      RETURN '***-**-' || RIGHT(field_value, 4);
    END IF;
  END IF;
  
  -- Salary/compensation masking
  IF (field_name ILIKE '%salary%' OR field_name ILIKE '%compensation%') THEN
    IF (access_level >= 7) THEN -- Manager level and above
      RETURN field_value;
    ELSE
      RETURN '[CONFIDENTIAL]';
    END IF;
  END IF;
  
  -- Default: return original value
  RETURN field_value;
END;
$$;

-- Apply masking to embedded views
CREATE OR REPLACE SECURE VIEW employee_analytics_masked AS
SELECT 
  employee_id,
  apply_data_masking(employee_name, 'employee_name', current_user_context()) as employee_name,
  apply_data_masking(email, 'email', current_user_context()) as email,
  apply_data_masking(phone, 'phone', current_user_context()) as phone,
  department,
  hire_date,
  apply_data_masking(salary::VARCHAR, 'salary', current_user_context()) as salary,
  performance_rating
FROM employee_data
WHERE EVAL(get_user_data_filter(current_user_context()));
```

## **Compliance and Audit Framework**

### **1. Comprehensive Audit Logging**
```python
# Enterprise audit logging system
class AuditLogger:
    def __init__(self, config):
        self.config = config
        self.log_retention_days = config.get('retention_days', 2555)  # 7 years
        
    async def log_security_event(self, event_type: str, user_context: Dict, 
                                resource_context: Dict, additional_data: Dict = None):
        """Log security-related events with comprehensive context"""
        
        audit_record = {
            'timestamp': datetime.utcnow().isoformat(),
            'event_type': event_type,
            'event_id': str(uuid.uuid4()),
            
            # User context
            'user_id': user_context.get('user_id'),
            'session_id': user_context.get('session_id'),
            'ip_address': user_context.get('ip_address'),
            'user_agent': user_context.get('user_agent'),
            'organization_id': user_context.get('organization_id'),
            
            # Resource context
            'resource_type': resource_context.get('resource_type'),
            'resource_id': resource_context.get('resource_id'),
            'action_performed': resource_context.get('action'),
            'data_accessed': resource_context.get('data_accessed'),
            
            # Security context
            'authentication_method': user_context.get('auth_method'),
            'authorization_granted': resource_context.get('authorized', False),
            'permission_level': user_context.get('permission_level'),
            
            # Additional metadata
            'additional_data': additional_data or {},
            
            # Compliance flags
            'pii_accessed': self._contains_pii(resource_context.get('data_accessed', [])),
            'financial_data_accessed': self._contains_financial_data(resource_context.get('data_accessed', [])),
            'requires_retention': self._requires_long_term_retention(event_type)
        }
        
        # Store in secure audit log
        await self.store_audit_record(audit_record)
        
        # Check for suspicious activities
        await self.analyze_for_anomalies(audit_record)
        
    async def generate_compliance_report(self, start_date: datetime, 
                                       end_date: datetime, 
                                       compliance_framework: str):
        """Generate compliance reports for various frameworks"""
        
        query_filters = {
            'timestamp_range': (start_date, end_date),
            'compliance_framework': compliance_framework
        }
        
        if compliance_framework == 'SOX':
            return await self._generate_sox_report(query_filters)
        elif compliance_framework == 'GDPR':
            return await self._generate_gdpr_report(query_filters)
        elif compliance_framework == 'HIPAA':
            return await self._generate_hipaa_report(query_filters)
        else:
            return await self._generate_general_audit_report(query_filters)
```

### **2. Privacy Controls**
```javascript
// Privacy control implementation
class PrivacyControlManager {
  constructor(config) {
    this.privacyPolicies = config.privacyPolicies;
    this.consentManager = new ConsentManager(config.consent);
    this.dataMinimization = new DataMinimizationEngine(config.minimization);
  }
  
  async enforcePrivacyControls(dataRequest, userContext) {
    // Check user consent
    const consentValid = await this.consentManager.validateConsent(
      userContext.userId, 
      dataRequest.dataTypes
    );
    
    if (!consentValid) {
      throw new Error('User consent required for this data access');
    }
    
    // Apply data minimization
    const minimizedRequest = await this.dataMinimization.minimize(
      dataRequest, 
      userContext.purpose
    );
    
    // Apply purpose limitation
    this.validatePurposeLimitation(minimizedRequest, userContext.purpose);
    
    // Log privacy control application
    await this.logPrivacyAction({
      action: 'privacy_controls_applied',
      user: userContext.userId,
      dataTypes: dataRequest.dataTypes,
      purpose: userContext.purpose,
      minimizationApplied: minimizedRequest !== dataRequest
    });
    
    return minimizedRequest;
  }
  
  async handleDataSubjectRights(request) {
    const { requestType, subjectId, requestData } = request;
    
    switch (requestType) {
      case 'access':
        return await this.handleDataAccessRequest(subjectId);
      case 'rectification':
        return await this.handleDataRectificationRequest(subjectId, requestData);
      case 'erasure':
        return await this.handleDataErasureRequest(subjectId);
      case 'portability':
        return await this.handleDataPortabilityRequest(subjectId);
      case 'restriction':
        return await this.handleProcessingRestrictionRequest(subjectId, requestData);
      default:
        throw new Error(`Unsupported data subject right: ${requestType}`);
    }
  }
}
```

## **Next Steps**

After mastering embedded authentication and security:
1. **Explore Customer Self-Service Analytics** → Lesson 8
2. **Implement Security Architecture** → Deploy in your environment
3. **Configure Compliance Monitoring** → Set up audit and compliance systems
4. **Train Security Team** → Share security best practices and procedures

---

*Build a fortress of security around your embedded analytics while maintaining seamless user experiences and regulatory compliance.* 