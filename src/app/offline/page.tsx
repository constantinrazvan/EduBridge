'use client';

import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'react-bootstrap';
import Link from 'next/link';

const OfflinePage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col lg={6} md={8} sm={12}>
          <Card className="border-0 shadow-lg">
            <CardBody className="text-center p-5">
              <div className="mb-4">
                <i className="bi bi-wifi-off text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              
              <h1 className="h2 mb-3 text-primary">You're Offline</h1>
              
              <p className="text-muted mb-4">
                It looks like you've lost your internet connection. Don't worry - some features of EduBridge are still available offline.
              </p>
              
              <div className="mb-4">
                <h5 className="mb-3">What you can do offline:</h5>
                <ul className="list-unstyled text-start">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    View cached dashboard data
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Access previously loaded content
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Review your learning progress
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Check your saved opportunities
                  </li>
                </ul>
              </div>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleRetry}
                  className="me-md-2"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Try Again
                </Button>
                
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={handleGoHome}
                >
                  <i className="bi bi-house me-2"></i>
                  Go Home
                </Button>
              </div>
              
              <div className="mt-4">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Your data will sync automatically when you're back online
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OfflinePage;
