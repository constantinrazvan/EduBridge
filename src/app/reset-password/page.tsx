'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface ResetPasswordFormData {
  email: string;
}

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 className="display-5 text-primary mb-3">
              <i className="bi bi-shield-lock-fill me-3"></i>
              Reset Password
            </h1>
            <p className="text-muted">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <Card className="shadow">
            <Card.Header className="bg-warning text-dark text-center">
              <h5 className="mb-0">
                <i className="bi bi-envelope-fill me-2"></i>
                Password Reset
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
                  <strong>Reset email sent!</strong>
                  <br />
                  We've sent a password reset link to your email address. 
                  Please check your inbox and follow the instructions.
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
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
                    <Form.Text className="text-muted">
                      We'll send a secure link to reset your password.
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending Reset Link...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-envelope-fill me-2"></i>
                          Send Reset Link
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
