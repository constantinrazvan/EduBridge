'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, Permission } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: Permission;
  fallbackPath?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = '/login',
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push(fallbackPath);
        return;
      }

      // If a specific role is required and user doesn't have it
      if (requiredRole && user.role !== requiredRole) {
        router.push('/dashboard');
        return;
      }

      // If a specific permission is required and user doesn't have it
      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, isLoading, requiredRole, requiredPermission, hasPermission, router, fallbackPath]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow text-center">
              <Card.Body className="p-5">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <h5>Loading...</h5>
                <p className="text-muted">Please wait while we verify your access.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // If no user is logged in, don't render children
  if (!user) {
    return null;
  }

  // If role requirement is not met, don't render children
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  // If permission requirement is not met, don't render children
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return null;
  }

  // All checks passed, render the protected content
  return <>{children}</>;
}
