'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface PageProps {
  params: {
    token: string;
  };
}

export default function NewPasswordPage({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFormData>();

  const password = watch('password');

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you would validate the token with your API
        setIsValidToken(true);
      } catch (err) {
        setIsValidToken(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    validateToken();
  }, [params.token]);

  const onSubmit = async (data: NewPasswordFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to update password
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      toast.success('Password updated successfully! Redirecting to login...');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to update password. Please try again.');
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingToken) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow text-center">
              <Card.Body className="p-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5>Validating Reset Link</h5>
                <p className="text-muted">Please wait while we verify your reset link...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isValidToken) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Header className="bg-danger text-white text-center">
                <h5 className="mb-0">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Invalid Reset Link
                </h5>
              </Card.Header>
              <Card.Body className="p-4 text-center">
                <Alert variant="danger">
                  <i className="bi bi-x-circle-fill me-2"></i>
                  <strong>Invalid or expired reset link</strong>
                  <br />
                  This password reset link is invalid or has expired. 
                  Please request a new one.
                </Alert>
                <Link href="/reset-password">
                  <Button variant="primary" className="w-100">
                    <i className="bi bi-arrow-left me-2"></i>
                    Request New Reset Link
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 className="display-5 text-primary mb-3">
              <i className="bi bi-key-fill me-3"></i>
              New Password
            </h1>
            <p className="text-muted">
              Enter your new password below.
            </p>
          </div>

          <Card className="shadow">
            <Card.Header className="bg-success text-white text-center">
              <h5 className="mb-0">
                <i className="bi bi-shield-check-fill me-2"></i>
                Set New Password
              </h5>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}

              {success ? (
                <Alert variant="success">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Password updated successfully!</strong>
                  <br />
                  You will be redirected to the login page in a few seconds.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: 'Password must contain uppercase, lowercase, and number',
                        },
                      })}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Must be at least 8 characters with uppercase, lowercase, and number.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Update Password
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}

              <div className="text-center mt-4">
                <small className="text-muted">
                  Remember your password?{' '}
                  <Link href="/login" className="text-decoration-none">
                    Sign In
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
