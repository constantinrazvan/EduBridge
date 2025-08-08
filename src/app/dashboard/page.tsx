'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import dynamic from 'next/dynamic';

// Lazy load dashboard components for code splitting
const StudentDashboard = lazy(() => import('@/components/dashboard/StudentDashboard'));
const ParentDashboard = lazy(() => import('@/components/dashboard/ParentDashboard'));
const InstitutionDashboard = lazy(() => import('@/components/dashboard/InstitutionDashboard'));
const CompanyDashboard = lazy(() => import('@/components/dashboard/CompanyDashboard'));
const AdminDashboard = lazy(() => import('@/components/dashboard/AdminDashboard'));

// Loading skeleton component
const DashboardSkeleton = () => (
  <Container fluid>
    <Row className="mb-4">
      <Col lg={4}>
        <Card className="h-100 border-0 shadow-sm">
          <CardBody className="text-center p-4">
            <Placeholder as="div" animation="glow" className="rounded-circle mb-3" style={{ width: '80px', height: '80px' }} />
            <Placeholder as="h4" animation="glow" className="mb-1" />
            <Placeholder as="p" animation="glow" className="text-muted mb-2" />
            <Placeholder as="div" animation="glow" className="mb-2" style={{ width: '60px', height: '20px' }} />
            <div className="row text-center mb-3">
              <div className="col-4">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
              <div className="col-4">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
              <div className="col-4">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
            </div>
            <Placeholder.Button animation="glow" size="sm" className="w-100" />
          </CardBody>
        </Card>
      </Col>
      <Col lg={8}>
        <Card className="h-100 border-0 shadow-sm">
          <Card.Header className="bg-gradient-primary text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            {[1, 2].map((i) => (
              <div key={i} className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Placeholder as="h6" animation="glow" className="mb-0" />
                  <Placeholder as="div" animation="glow" style={{ width: '40px', height: '20px' }} />
                </div>
                <Placeholder as="div" animation="glow" className="mb-2" style={{ height: '8px' }} />
                <div className="row">
                  <div className="col-md-6">
                    <Placeholder as="small" animation="glow" className="text-muted" />
                  </div>
                  <div className="col-md-6">
                    <Placeholder as="small" animation="glow" className="text-muted" />
                  </div>
                </div>
                <Placeholder as="div" animation="glow" className="mt-2 mb-0" style={{ height: '40px' }} />
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col lg={8}>
        <Card className="h-100 border-0 shadow-sm">
          <Card.Header className="bg-gradient-success text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-3 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <Placeholder as="h6" animation="glow" className="mb-1" />
                    <Placeholder as="p" animation="glow" className="text-muted small mb-2" />
                    <div className="mb-2">
                      {[1, 2, 3].map((j) => (
                        <Placeholder key={j} as="span" animation="glow" className="me-1" style={{ width: '60px', height: '20px' }} />
                      ))}
                    </div>
                  </div>
                  <div className="text-end">
                    <Placeholder as="div" animation="glow" className="mb-2" style={{ width: '80px', height: '20px' }} />
                    <Placeholder.Button animation="glow" size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="h-100 border-0 shadow-sm">
          <Card.Header className="bg-gradient-info text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Placeholder as="span" animation="glow" className="fw-medium" />
                  <Placeholder as="div" animation="glow" style={{ width: '60px', height: '20px' }} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Placeholder as="small" animation="glow" className="text-muted" />
                  <Placeholder.Button animation="glow" size="sm" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

// Error boundary component
class DashboardErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
    // Here you would typically log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container fluid>
          <Alert variant="danger" className="mt-4">
            <Alert.Heading>
              <i className="bi bi-exclamation-triangle me-2"></i>
              Something went wrong
            </Alert.Heading>
            <p>
              We encountered an error while loading your dashboard. Please try refreshing the page.
            </p>
            <hr />
            <div className="d-flex gap-2">
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.reload()}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh Page
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={() => this.setState({ hasError: false })}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Try Again
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring hook
const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as PerformanceEventTiming;
            console.log('FID:', firstInputEntry.processingStart - firstInputEntry.startTime);
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      return () => observer.disconnect();
    }
  }, []);
};

// Main dashboard component with optimizations
export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [dashboardError, setDashboardError] = useState<Error | null>(null);

  usePerformanceMonitor();

  // Error recovery function
  const handleErrorRecovery = () => {
    setDashboardError(null);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <Container fluid>
        <Alert variant="warning" className="mt-4">
          <Alert.Heading>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Authentication Required
          </Alert.Heading>
          <p>
            Please log in to access your dashboard.
          </p>
          <hr />
          <Link href="/login" passHref>
            <Button variant="primary">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  const renderDashboard = () => {
    if (dashboardError) {
      return (
        <Alert variant="danger">
          <Alert.Heading>
            <i className="bi bi-exclamation-triangle me-2"></i>
            Dashboard Error
          </Alert.Heading>
          <p>{dashboardError.message}</p>
          <hr />
          <Button variant="outline-danger" onClick={handleErrorRecovery}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Retry
          </Button>
        </Alert>
      );
    }

    switch (user.role) {
      case UserRole.STUDENT:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <StudentDashboard />
          </Suspense>
        );
      case UserRole.PARENT:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <ParentDashboard />
          </Suspense>
        );
      case UserRole.INSTITUTION:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <InstitutionDashboard />
          </Suspense>
        );
      case UserRole.COMPANY:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <CompanyDashboard />
          </Suspense>
        );
      case UserRole.ADMIN:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <AdminDashboard />
          </Suspense>
        );
      default:
        return (
          <Alert variant="info">
            <Alert.Heading>
              <i className="bi bi-info-circle me-2"></i>
              Role Not Supported
            </Alert.Heading>
            <p>
              Your current role ({getRoleDisplayName(user.role)}) is not yet supported in the dashboard.
            </p>
          </Alert>
        );
    }
  };

  return (
    <ProtectedRoute>
      <Container fluid className="py-4">
        <DashboardErrorBoundary>
          {renderDashboard()}
        </DashboardErrorBoundary>
      </Container>
    </ProtectedRoute>
  );
}

function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.STUDENT:
      return 'Student';
    case UserRole.PARENT:
      return 'Parent';
    case UserRole.INSTITUTION:
      return 'Institution';
    case UserRole.COMPANY:
      return 'Company';
    case UserRole.ADMIN:
      return 'Administrator';
    default:
      return 'Unknown';
  }
}
