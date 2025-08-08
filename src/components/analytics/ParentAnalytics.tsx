import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, ProgressBar, Button, Modal, Alert, Dropdown } from 'react-bootstrap';
import { ParentAnalytics, AnalyticsMetric } from '../../types';

interface ParentAnalyticsProps {
  analytics: ParentAnalytics;
  children: { id: number; name: string; grade: string }[];
  activeChild: number;
  onChildChange: (childId: number) => void;
}

const ParentAnalyticsComponent: React.FC<ParentAnalyticsProps> = ({ 
  analytics, 
  children, 
  activeChild, 
  onChildChange 
}) => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);

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

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="analytics-container">
      <Row className="mb-4">
        <Col>
          <h3 className="text-primary mb-3">
            <i className="bi bi-graph-up me-2"></i>
            Parent Analytics Dashboard
          </h3>
        </Col>
      </Row>

      {/* Child Selection */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-person-badge text-primary me-2"></i>
                  Child Overview
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="child-dropdown">
                    {children.find(c => c.id === activeChild)?.name || 'Select Child'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {children.map((child) => (
                      <Dropdown.Item 
                        key={child.id} 
                        onClick={() => onChildChange(child.id)}
                        active={child.id === activeChild}
                      >
                        {child.name} - Grade {child.grade}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-graph-up text-primary fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Overall Progress</h5>
              <h3 className="text-primary mb-2">{formatMetric(analytics.childProgress.overall)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.childProgress.overall.trend)} text-${getMetricColor(analytics.childProgress.overall)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.childProgress.overall)}`}>
                  {analytics.childProgress.overall.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-trophy text-success fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Career Probability</h5>
              <h3 className="text-success mb-2">
                {Math.round(analytics.careerProbability.careers[0]?.probability * 100 || 0)}%
              </h3>
              <small className="text-muted">
                Top career: {analytics.careerProbability.careers[0]?.title || 'N/A'}
              </small>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-currency-dollar text-warning fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Savings Needed</h5>
              <h3 className="text-warning mb-2">{formatMetric(analytics.financialProjections.savingsNeeded)}</h3>
              <small className="text-muted">
                For next academic year
              </small>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-exclamation-triangle text-info fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Active Alerts</h5>
              <h3 className="text-info mb-2">
                {analytics.interventionRecommendations.alerts.filter(a => a.priority === 'high').length}
              </h3>
              <small className="text-muted">
                High priority alerts
              </small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Progress vs Peers */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-bar-chart text-primary me-2"></i>
                  Progress vs Peers
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowProgressModal(true)}>
                  View Details
                </Button>
              </div>
              
              {analytics.childProgress.vsPeers.map((comparison, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium">{comparison.metric}</span>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Child: {comparison.child}</span>
                      <span className="text-muted">Avg: {comparison.average}</span>
                    </div>
                  </div>
                  <ProgressBar className="mb-1">
                    <ProgressBar 
                      variant="primary" 
                      now={(comparison.child / Math.max(comparison.child, comparison.average)) * 100} 
                    />
                    <ProgressBar 
                      variant="secondary" 
                      now={(comparison.average / Math.max(comparison.child, comparison.average)) * 100} 
                    />
                  </ProgressBar>
                  <small className="text-muted">
                    {comparison.child > comparison.average ? 'Above average' : 'Below average'}
                  </small>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-briefcase text-success me-2"></i>
                  Career Probability
                </h5>
                <Button variant="outline-success" size="sm" onClick={() => setShowCareerModal(true)}>
                  View All
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Top Career Paths</h6>
                {analytics.careerProbability.careers.slice(0, 3).map((career, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">{career.title}</span>
                      <Badge bg="primary">{Math.round(career.probability * 100)}%</Badge>
                    </div>
                    <ProgressBar 
                      now={career.probability * 100} 
                      className="mb-2"
                      variant="primary"
                    />
                    <small className="text-muted">
                      Factors: {career.factors.slice(0, 2).join(', ')}
                      {career.factors.length > 2 && '...'}
                    </small>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Recommendations</h6>
                <ul className="list-unstyled">
                  {analytics.careerProbability.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="mb-1">
                      <i className="bi bi-arrow-right text-success me-2"></i>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Financial Planning & Alerts */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-currency-dollar text-warning me-2"></i>
                  Financial Planning
                </h5>
                <Button variant="outline-warning" size="sm" onClick={() => setShowFinancialModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Education Costs (Next 3 Years)</h6>
                {analytics.financialProjections.educationCosts.slice(0, 3).map((cost, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span>Year {cost.year}</span>
                    <Badge bg="warning">${cost.cost.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Scholarship Opportunities</h6>
                {analytics.financialProjections.scholarshipOpportunities.slice(0, 3).map((scholarship, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{scholarship.name}</span>
                    <div className="text-end">
                      <div className="fw-bold">${scholarship.amount.toLocaleString()}</div>
                      <small className="text-muted">{Math.round(scholarship.probability * 100)}% chance</small>
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
              <h5 className="mb-3">
                <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                Alerts & Interventions
              </h5>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Priority Alerts</h6>
                {analytics.interventionRecommendations.alerts.slice(0, 3).map((alert, index) => (
                  <Alert key={index} variant={getAlertColor(alert.priority)} className="mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{alert.type}</strong>
                        <div className="mt-1">{alert.message}</div>
                      </div>
                      <Badge bg={getAlertColor(alert.priority)}>{alert.priority}</Badge>
                    </div>
                  </Alert>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Recommended Actions</h6>
                <ul className="list-unstyled">
                  {analytics.interventionRecommendations.actions.slice(0, 3).map((action, index) => (
                    <li key={index} className="mb-1">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Progress Details Modal */}
      <Modal show={showProgressModal} onHide={() => setShowProgressModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-bar-chart text-primary me-2"></i>
            Detailed Progress Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Subject Performance</h6>
              {analytics.childProgress.bySubject.map((subject, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{subject.subject}</span>
                  <ProgressBar 
                    now={subject.progress} 
                    style={{ width: '150px' }}
                    variant="primary"
                  />
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Peer Comparison</h6>
              {analytics.childProgress.vsPeers.map((comparison, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>{comparison.metric}</span>
                    <div>
                      <span className="text-primary me-2">{comparison.child}</span>
                      <span className="text-muted">vs {comparison.average}</span>
                    </div>
                  </div>
                  <ProgressBar className="mb-1">
                    <ProgressBar variant="primary" now={(comparison.child / Math.max(comparison.child, comparison.average)) * 100} />
                    <ProgressBar variant="secondary" now={(comparison.average / Math.max(comparison.child, comparison.average)) * 100} />
                  </ProgressBar>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProgressModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Career Probability Modal */}
      <Modal show={showCareerModal} onHide={() => setShowCareerModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-briefcase text-success me-2"></i>
            Career Probability Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {analytics.careerProbability.careers.map((career, index) => (
            <Card key={index} className="mb-3">
              <CardBody>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1">{career.title}</h6>
                    <p className="text-muted mb-2">Probability: {Math.round(career.probability * 100)}%</p>
                  </div>
                  <Badge bg="primary" className="fs-6">{Math.round(career.probability * 100)}%</Badge>
                </div>
                
                <ProgressBar 
                  now={career.probability * 100} 
                  className="mb-3"
                  variant="primary"
                />
                
                <div>
                  <h6 className="text-muted mb-2">Contributing Factors</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {career.factors.map((factor, factorIndex) => (
                      <Badge key={factorIndex} bg="outline-success">{factor}</Badge>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          
          <Alert variant="info" className="mt-3">
            <h6 className="alert-heading">
              <i className="bi bi-lightbulb me-2"></i>
              Recommendations
            </h6>
            <ul className="mb-0">
              {analytics.careerProbability.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCareerModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Financial Planning Modal */}
      <Modal show={showFinancialModal} onHide={() => setShowFinancialModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-currency-dollar text-warning me-2"></i>
            Financial Planning Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-warning mb-3">Education Costs Projection</h6>
              {analytics.financialProjections.educationCosts.map((cost, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>Year {cost.year}</span>
                  <Badge bg="warning">${cost.cost.toLocaleString()}</Badge>
                </div>
              ))}
              
              <hr />
              
              <h6 className="text-info mb-3">Savings Required</h6>
              <div className="d-flex justify-content-between align-items-center">
                <span>Monthly savings needed</span>
                <Badge bg="info">{formatMetric(analytics.financialProjections.savingsNeeded)}</Badge>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Scholarship Opportunities</h6>
              {analytics.financialProjections.scholarshipOpportunities.map((scholarship, index) => (
                <Card key={index} className="mb-2">
                  <CardBody className="py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{scholarship.name}</h6>
                        <small className="text-muted">${scholarship.amount.toLocaleString()}</small>
                      </div>
                      <Badge bg="success">{Math.round(scholarship.probability * 100)}%</Badge>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFinancialModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ParentAnalyticsComponent;
