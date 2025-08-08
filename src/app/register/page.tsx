'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from 'react-toastify';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: UserRole.STUDENT,
      agreeToTerms: false,
    },
  });

  const password = watch('password');

  const roleDescriptions = {
    [UserRole.STUDENT]: {
      title: 'Student',
      description: 'Access personalized learning paths, opportunities, and skill development',
      icon: '🎓',
      color: 'primary',
    },
    [UserRole.PARENT]: {
      title: 'Parent',
      description: 'Monitor children\'s progress and communicate with educational institutions',
      icon: '👨‍👩‍👧‍👦',
      color: 'success',
    },
    [UserRole.INSTITUTION]: {
      title: 'Educational Institution',
      description: 'Manage students, curricula, and partnerships with companies',
      icon: '🏫',
      color: 'info',
    },
    [UserRole.COMPANY]: {
      title: 'Company',
      description: 'Recruit talent, validate competencies, and build employer branding',
      icon: '🏢',
      color: 'warning',
    },
    [UserRole.ADMIN]: {
      title: 'Administrator',
      description: 'Manage the entire platform and user base',
      icon: '🔒',
      color: 'danger',
    },
  } as const;

  const onSubmit = async (data: RegisterFormData) => {
    if (!selectedRole) {
      setError('Please select a role');
      toast.error('Please select a role');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create mock user data based on role
      const mockUser = {
        id: `user_${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: selectedRole,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        profile: {
          avatar: null,
          bio: '',
          location: '',
          phone: '',
        },
      };

      // Auto-login after successful registration
      await login(data.email, data.password);
      toast.success(`Welcome to EduBridge! Your ${roleDescriptions[selectedRole].title} account has been created successfully.`);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
    setError('');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="bi bi-person-plus-fill me-2"></i>
                Join EduBridge
              </h2>
              <p className="mb-0 mt-2 opacity-75">
                Connect with education, innovation, and opportunity
              </p>
            </Card.Header>
            
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Role Selection */}
                <div className="mb-4">
                  <Form.Label className="fw-bold">Select Your Role</Form.Label>
                  <Row className="g-3">
                    {Object.entries(roleDescriptions).map(([role, details]) => (
                      <Col key={role} xs={12} sm={6}>
                        <Card
                          className={`role-card h-100 cursor-pointer ${
                            selectedRole === role ? 'border-primary shadow-sm' : 'border-light'
                          }`}
                          onClick={() => handleRoleSelect(role as UserRole)}
                        >
                          <Card.Body className="text-center p-3">
                            <div className="role-icon mb-2">
                              <span className="fs-1">{details.icon}</span>
                            </div>
                            <h6 className="mb-1">{details.title}</h6>
                            <small className="text-muted">{details.description}</small>
                            {selectedRole === role && (
                              <Badge bg="primary" className="mt-2">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Selected
                              </Badge>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>

                {/* Personal Information */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        {...register('firstName', {
                          required: 'First name is required',
                          minLength: {
                            value: 2,
                            message: 'First name must be at least 2 characters',
                          },
                        })}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        {...register('lastName', {
                          required: 'Last name is required',
                          minLength: {
                            value: 2,
                            message: 'Last name must be at least 2 characters',
                          },
                        })}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
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

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
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
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
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
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="agreeToTerms"
                    {...register('agreeToTerms', {
                      required: 'You must agree to the terms and conditions',
                    })}
                    isInvalid={!!errors.agreeToTerms}
                    label={
                      <span>
                        I agree to the{' '}
                        <a href="#" className="text-primary">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary">
                          Privacy Policy
                        </a>
                      </span>
                    }
                  />
                  {errors.agreeToTerms && (
                    <div className="text-danger small mt-1">
                      {errors.agreeToTerms.message}
                    </div>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Create Account
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary fw-bold">
                      Sign In
                    </a>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
