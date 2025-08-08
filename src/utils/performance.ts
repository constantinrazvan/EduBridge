// Performance monitoring utilities

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

interface UserInteraction {
  type: string;
  target: string;
  timestamp: number;
  duration?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private interactions: UserInteraction[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric('pageLoad', navEntry.loadEventEnd - navEntry.loadEventStart, 'ms');
            this.recordMetric('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart, 'ms');
            this.recordMetric('firstPaint', navEntry.responseStart - navEntry.requestStart, 'ms');
          }
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navigationObserver);

      // Observe paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.recordMetric(entry.name, entry.startTime, 'ms');
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('paint', paintObserver);

      // Observe resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordMetric('resourceLoad', resourceEntry.duration, 'ms');
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
    }
  }

  recordMetric(name: string, value: number, unit: string) {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now()
    };
    this.metrics.push(metric);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  recordInteraction(type: string, target: string, duration?: number) {
    const interaction: UserInteraction = {
      type,
      target,
      timestamp: Date.now(),
      duration
    };
    this.interactions.push(interaction);
    
    // Keep only last 50 interactions
    if (this.interactions.length > 50) {
      this.interactions = this.interactions.slice(-50);
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getInteractions() {
    return this.interactions;
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }

  getSlowestMetrics(count: number = 5): PerformanceMetric[] {
    return [...this.metrics]
      .sort((a, b) => b.value - a.value)
      .slice(0, count);
  }

  getRecentInteractions(minutes: number = 5): UserInteraction[] {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.interactions.filter(interaction => interaction.timestamp > cutoff);
  }

  // Memory usage monitoring
  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  // Network information
  getNetworkInfo() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      };
    }
    return null;
  }

  // Component render time tracking
  trackComponentRender(componentName: string, renderTime: number) {
    this.recordMetric(`${componentName}Render`, renderTime, 'ms');
  }

  // API call performance tracking
  trackApiCall(endpoint: string, duration: number, status: number) {
    this.recordMetric(`api_${endpoint}`, duration, 'ms');
    this.recordMetric(`api_${endpoint}_status`, status, '');
  }

  // User interaction tracking
  trackClick(element: string) {
    this.recordInteraction('click', element);
  }

  trackScroll(element: string) {
    this.recordInteraction('scroll', element);
  }

  trackFormSubmit(formName: string, duration: number) {
    this.recordInteraction('formSubmit', formName, duration);
  }

  // Performance report generation
  generateReport(): any {
    return {
      metrics: this.metrics,
      interactions: this.interactions,
      averages: {
        pageLoad: this.getAverageMetric('pageLoad'),
        domContentLoaded: this.getAverageMetric('domContentLoaded'),
        firstPaint: this.getAverageMetric('first-paint')
      },
      slowest: this.getSlowestMetrics(),
      memory: this.getMemoryUsage(),
      network: this.getNetworkInfo(),
      timestamp: Date.now()
    };
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics = [];
    this.interactions = [];
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for React components
export const usePerformanceMonitor = () => {
  const trackRender = (componentName: string, renderTime: number) => {
    performanceMonitor.trackComponentRender(componentName, renderTime);
  };

  const trackClick = (element: string) => {
    performanceMonitor.trackClick(element);
  };

  const trackScroll = (element: string) => {
    performanceMonitor.trackScroll(element);
  };

  const trackFormSubmit = (formName: string, duration: number) => {
    performanceMonitor.trackFormSubmit(formName, duration);
  };

  const getReport = () => {
    return performanceMonitor.generateReport();
  };

  return {
    trackRender,
    trackClick,
    trackScroll,
    trackFormSubmit,
    getReport
  };
};
