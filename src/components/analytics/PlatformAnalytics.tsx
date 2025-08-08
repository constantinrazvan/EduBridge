import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, ProgressBar, Button, Modal, Alert } from 'react-bootstrap';
import { PlatformAnalytics, AnalyticsMetric } from '../../types';

interface PlatformAnalyticsProps {
  analytics: PlatformAnalytics;
}

const PlatformAnalyticsComponent: React.FC<PlatformAnalyticsProps> = ({ analytics }) => {
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);

  const getMetricColor = (metric: AnalyticsMetric) => {
    if (metric.changeType === 'increase') return 'success';
    if (metric.changeType === 'decrease') return 'danger';
    return 'secondary';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'bi-arrow-up';
      case 'down': return 'bi-arrow-down';
      default: return 'bi-dash';
    }
  };

  const formatMetric = (metric: AnalyticsMetric) => {
    return `${metric.value}${metric.unit}`;
  };

  return (
    <div className="analytics-container">
      <Row className="mb-4">
        <Col>
          <h3 className="text-primary mb-3">
            <i className="bi bi-graph-up me-2"></i>
            Platform Analytics Dashboard
          </h3>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-people text-primary fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Active Users</h5>
              <h3 className="text-primary mb-2">{formatMetric(analytics.userEngagement.activeUsers)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.userEngagement.activeUsers.trend)} text-${getMetricColor(analytics.userEngagement.activeUsers)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.userEngagement.activeUsers)}`}>
                  {analytics.userEngagement.activeUsers.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-currency-dollar text-success fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Total Revenue</h5>
              <h3 className="text-success mb-2">{formatMetric(analytics.revenueMetrics.totalRevenue)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.revenueMetrics.totalRevenue.trend)} text-${getMetricColor(analytics.revenueMetrics.totalRevenue)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.revenueMetrics.totalRevenue)}`}>
                  {analytics.revenueMetrics.totalRevenue.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-speedometer2 text-warning fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Response Time</h5>
              <h3 className="text-warning mb-2">{formatMetric(analytics.systemPerformance.responseTime)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.systemPerformance.responseTime.trend)} text-${getMetricColor(analytics.systemPerformance.responseTime)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.systemPerformance.responseTime)}`}>
                  {analytics.systemPerformance.responseTime.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-globe text-info fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Total Users</h5>
              <h3 className="text-info mb-2">{formatMetric(analytics.globalMetrics.totalUsers)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.globalMetrics.totalUsers.trend)} text-${getMetricColor(analytics.globalMetrics.totalUsers)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.globalMetrics.totalUsers)}`}>
                  {analytics.globalMetrics.totalUsers.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* User Engagement & System Performance */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-people text-primary me-2"></i>
                  User Engagement
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowEngagementModal(true)}>
                  View Details
                </Button>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">Session Duration</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Average</span>
                  <Badge bg="primary">{formatMetric(analytics.userEngagement.sessionDuration)}</Badge>
                </div>
                <small className="text-muted">
                  {analytics.userEngagement.sessionDuration.change}% from last period
                </small>
              </div>

              <div>
                <h6 className="text-muted mb-2">Feature Usage</h6>
                {analytics.userEngagement.featureUsage.slice(0, 4).map((feature, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{feature.feature}</span>
                    <div className="d-flex align-items-center">
                      <ProgressBar 
                        now={feature.usage} 
                        style={{ width: '100px' }}
                        variant="primary"
                        className="me-2"
                      />
                      <Badge bg="primary">{feature.usage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-speedometer2 text-warning me-2"></i>
                  System Performance
                </h5>
                <Button variant="outline-warning" size="sm" onClick={() => setShowPerformanceModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Key Metrics</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-warning mb-1">{formatMetric(analytics.systemPerformance.responseTime)}</h4>
                      <small className="text-muted">Response Time</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-success mb-1">{formatMetric(analytics.systemPerformance.uptime)}</h4>
                      <small className="text-muted">Uptime</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-danger mb-1">{formatMetric(analytics.systemPerformance.errorRate)}</h4>
                      <small className="text-muted">Error Rate</small>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-muted mb-2">Performance Trends</h6>
                <div className="performance-chart">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Response Time</span>
                    <small className={`text-${getMetricColor(analytics.systemPerformance.responseTime)}`}>
                      {analytics.systemPerformance.responseTime.change}%
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Uptime</span>
                    <small className={`text-${getMetricColor(analytics.systemPerformance.uptime)}`}>
                      {analytics.systemPerformance.uptime.change}%
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Error Rate</span>
                    <small className={`text-${getMetricColor(analytics.systemPerformance.errorRate)}`}>
                      {analytics.systemPerformance.errorRate.change}%
                    </small>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Revenue Metrics & Global Metrics */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-currency-dollar text-success me-2"></i>
                  Revenue Metrics
                </h5>
                <Button variant="outline-success" size="sm" onClick={() => setShowRevenueModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Revenue by Role</h6>
                {analytics.revenueMetrics.revenueByRole.slice(0, 4).map((role, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{role.role}</span>
                    <Badge bg="success">${role.revenue.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Growth Rate</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Overall Growth</span>
                  <Badge bg="success">{formatMetric(analytics.revenueMetrics.growthRate)}</Badge>
                </div>
                <small className="text-muted">
                  {analytics.revenueMetrics.growthRate.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <h5 className="mb-3">
                <i className="bi bi-globe text-info me-2"></i>
                Global Metrics
              </h5>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Platform Overview</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-info mb-1">{formatMetric(analytics.globalMetrics.totalUsers)}</h4>
                      <small className="text-muted">Total Users</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-primary mb-1">{formatMetric(analytics.globalMetrics.totalInstitutions)}</h4>
                      <small className="text-muted">Institutions</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-success mb-1">{formatMetric(analytics.globalMetrics.totalCompanies)}</h4>
                      <small className="text-muted">Companies</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-warning mb-1">{formatMetric(analytics.globalMetrics.totalPartnerships)}</h4>
                      <small className="text-muted">Partnerships</small>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-muted mb-2">Growth Trends</h6>
                <div className="growth-chart">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Users</span>
                    <small className={`text-${getMetricColor(analytics.globalMetrics.totalUsers)}`}>
                      {analytics.globalMetrics.totalUsers.change}%
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Institutions</span>
                    <small className={`text-${getMetricColor(analytics.globalMetrics.totalInstitutions)}`}>
                      {analytics.globalMetrics.totalInstitutions.change}%
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Companies</span>
                    <small className={`text-${getMetricColor(analytics.globalMetrics.totalCompanies)}`}>
                      {analytics.globalMetrics.totalCompanies.change}%
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Partnerships</span>
                    <small className={`text-${getMetricColor(analytics.globalMetrics.totalPartnerships)}`}>
                      {analytics.globalMetrics.totalPartnerships.change}%
                    </small>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* System Health Overview */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <h5 className="mb-3">
                <i className="bi bi-heart-pulse text-danger me-2"></i>
                System Health Overview
              </h5>
              
              <Row>
                <Col md={3}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Response Time</h6>
                    <div className="health-circle bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-warning fs-4 fw-bold">
                        {analytics.systemPerformance.responseTime.value}ms
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.systemPerformance.responseTime.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={3}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Uptime</h6>
                    <div className="health-circle bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-success fs-4 fw-bold">
                        {analytics.systemPerformance.uptime.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.systemPerformance.uptime.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={3}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Error Rate</h6>
                    <div className="health-circle bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-danger fs-4 fw-bold">
                        {analytics.systemPerformance.errorRate.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.systemPerformance.errorRate.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={3}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Active Users</h6>
                    <div className="health-circle bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-primary fs-4 fw-bold">
                        {analytics.userEngagement.activeUsers.value}
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.userEngagement.activeUsers.change}% from last period
                    </small>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* User Engagement Modal */}
      <Modal show={showEngagementModal} onHide={() => setShowEngagementModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-people text-primary me-2"></i>
            User Engagement Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Session Metrics</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Active Users</span>
                  <Badge bg="primary">{formatMetric(analytics.userEngagement.activeUsers)}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Session Duration</span>
                  <Badge bg="success">{formatMetric(analytics.userEngagement.sessionDuration)}</Badge>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Feature Usage</h6>
              {analytics.userEngagement.featureUsage.map((feature, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{feature.feature}</span>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      now={feature.usage} 
                      style={{ width: '150px' }}
                      variant="success"
                      className="me-2"
                    />
                    <Badge bg="success">{feature.usage}%</Badge>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEngagementModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* System Performance Modal */}
      <Modal show={showPerformanceModal} onHide={() => setShowPerformanceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-speedometer2 text-warning me-2"></i>
            System Performance Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-warning mb-3">Performance Metrics</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Response Time</span>
                  <Badge bg="warning">{formatMetric(analytics.systemPerformance.responseTime)}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Uptime</span>
                  <Badge bg="success">{formatMetric(analytics.systemPerformance.uptime)}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Error Rate</span>
                  <Badge bg="danger">{formatMetric(analytics.systemPerformance.errorRate)}</Badge>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="text-info mb-3">Trends</h6>
              <div className="trend-chart">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Response Time</span>
                  <small className={`text-${getMetricColor(analytics.systemPerformance.responseTime)}`}>
                    {analytics.systemPerformance.responseTime.change}%
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Uptime</span>
                  <small className={`text-${getMetricColor(analytics.systemPerformance.uptime)}`}>
                    {analytics.systemPerformance.uptime.change}%
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Error Rate</span>
                  <small className={`text-${getMetricColor(analytics.systemPerformance.errorRate)}`}>
                    {analytics.systemPerformance.errorRate.change}%
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPerformanceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Revenue Modal */}
      <Modal show={showRevenueModal} onHide={() => setShowRevenueModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-currency-dollar text-success me-2"></i>
            Revenue Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-success mb-3">Revenue by Role</h6>
              {analytics.revenueMetrics.revenueByRole.map((role, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{role.role}</span>
                  <Badge bg="success">${role.revenue.toLocaleString()}</Badge>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-primary mb-3">Growth Metrics</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Revenue</span>
                  <Badge bg="success">{formatMetric(analytics.revenueMetrics.totalRevenue)}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Growth Rate</span>
                  <Badge bg="primary">{formatMetric(analytics.revenueMetrics.growthRate)}</Badge>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRevenueModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlatformAnalyticsComponent;
