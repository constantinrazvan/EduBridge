// Environment configuration for EduBridge
export const environment = {
  // Application Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'EduBridge',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
    environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  },

  // API Configuration
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
    timeout: 30000,
  },

  // Authentication
  auth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here-change-in-production',
  },

  // Database
  database: {
    url: process.env.DATABASE_URL || 'your-database-url-here',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },

  // File Storage
  storage: {
    url: process.env.NEXT_PUBLIC_STORAGE_URL || 'https://your-storage-bucket.com',
    accessKey: process.env.STORAGE_ACCESS_KEY || 'your-access-key',
    secretKey: process.env.STORAGE_SECRET_KEY || 'your-secret-key',
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || 'your-google-analytics-id',
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'your-mixpanel-token',
  },

  // Error Tracking
  errorTracking: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'your-sentry-dsn',
  },

  // Feature Flags
  features: {
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
    pwa: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
  },

  // Performance Monitoring
  performance: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true',
    lighthouseApiKey: process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || 'your-lighthouse-api-key',
  },

  // Security
  security: {
    cspNonce: process.env.NEXT_PUBLIC_CSP_NONCE || 'your-csp-nonce',
    hstsMaxAge: parseInt(process.env.NEXT_PUBLIC_HSTS_MAX_AGE || '31536000'),
  },

  // Cache Configuration
  cache: {
    ttl: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '3600'),
    maxSize: parseInt(process.env.NEXT_PUBLIC_CACHE_MAX_SIZE || '100'),
  },

  // Rate Limiting
  rateLimit: {
    max: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_MAX || '100'),
    windowMs: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW || '900000'),
  },

  // Demo Mode
  demo: {
    enabled: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
    dataEnabled: process.env.NEXT_PUBLIC_DEMO_DATA_ENABLED === 'true',
  },
};

// Type-safe environment access
export type Environment = typeof environment;

// Helper functions
export const isProduction = () => environment.app.isProduction;
export const isDevelopment = () => environment.app.isDevelopment;
export const isFeatureEnabled = (feature: keyof typeof environment.features) => environment.features[feature];
export const getApiUrl = (endpoint: string) => `${environment.api.url}/${environment.api.version}/${endpoint}`;
