'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
  password: string;
}

const demoAccounts = [
  { email: 'student@edubridge.com', password: 'password', role: 'Student', description: 'Personalized learning, skill tracking, opportunities' },
  { email: 'parent@edubridge.com', password: 'password', role: 'Parent', description: 'Monitor children progress, communication, planning' },
  { email: 'institution@edubridge.com', password: 'password', role: 'Institution', description: 'Student management, curriculum, analytics' },
  { email: 'company@edubridge.com', password: 'password', role: 'Company', description: 'Recruitment, talent pool, CSR initiatives' },
  { email: 'admin@edubridge.com', password: 'password', role: 'Admin', description: 'System management, security, analytics' },
];

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success('Welcome back! Redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
        toast.error('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAccount = (demoAccount: typeof demoAccounts[0]) => {
    setValue('email', demoAccount.email);
    setValue('password', demoAccount.password);
    setError('');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary mb-3">
              <i className="bi bi-mortarboard-fill me-3"></i>
              EduBridge
            </h1>
            <p className="lead text-muted">
              Connecting Education, Innovation, and Opportunity
            </p>
          </div>

          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h4 className="mb-0">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                  <div className="text-end mt-1">
                    <Link href="/reset-password" className="text-decoration-none small">
                      Forgot Password?
                    </Link>
                  </div>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-decoration-none">
                    Register here
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>

          {/* Demo Accounts Section */}
          <Card className="mt-4 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Demo Accounts
              </h6>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Click on any account below to fill the login form and explore different user roles:
              </p>
              <div className="row g-2">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="col-12 col-md-6">
                    <Card 
                      className="h-100 cursor-pointer demo-account-card"
                      onClick={() => fillDemoAccount(account)}
                    >
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-center mb-2">
                          <Badge 
                            bg={
                              account.role === 'Student' ? 'primary' :
                              account.role === 'Parent' ? 'success' :
                              account.role === 'Institution' ? 'info' :
                              account.role === 'Company' ? 'warning' : 'danger'
                            }
                            className="me-2"
                          >
                            {account.role}
                          </Badge>
                          <small className="text-muted">{account.email}</small>
                        </div>
                        <p className="small text-muted mb-0">{account.description}</p>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
