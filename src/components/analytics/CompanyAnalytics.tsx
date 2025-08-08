import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, ProgressBar, Button, Modal, Alert, Dropdown } from 'react-bootstrap';
import { CompanyAnalytics, AnalyticsMetric } from '../../types';

interface CompanyAnalyticsProps {
  analytics: CompanyAnalytics;
  positions: { id: number; title: string; department: string }[];
  activePosition: number;
  onPositionChange: (positionId: number) => void;
}

const CompanyAnalyticsComponent: React.FC<CompanyAnalyticsProps> = ({ 
  analytics, 
  positions, 
  activePosition, 
  onPositionChange 
}) => {
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showHiringModal, setShowHiringModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showDiversityModal, setShowDiversityModal] = useState(false);

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
            Company Analytics Dashboard
          </h3>
        </Col>
      </Row>

      {/* Position Selection */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-briefcase text-primary me-2"></i>
                  Position Overview
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="position-dropdown">
                    {positions.find(p => p.id === activePosition)?.title || 'All Positions'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onPositionChange(0)} active={activePosition === 0}>
                      All Positions
                    </Dropdown.Item>
                    {positions.map((position) => (
                      <Dropdown.Item 
                        key={position.id} 
                        onClick={() => onPositionChange(position.id)}
                        active={position.id === activePosition}
                      >
                        {position.title} - {position.department}
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
                <i className="bi bi-star text-primary fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Candidate Quality</h5>
              <h3 className="text-primary mb-2">{formatMetric(analytics.candidateQuality.overallScore)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.candidateQuality.overallScore.trend)} text-${getMetricColor(analytics.candidateQuality.overallScore)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.candidateQuality.overallScore)}`}>
                  {analytics.candidateQuality.overallScore.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-clock text-success fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Time to Hire</h5>
              <h3 className="text-success mb-2">{formatMetric(analytics.timeToHire.average)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.timeToHire.average.trend)} text-${getMetricColor(analytics.timeToHire.average)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.timeToHire.average)}`}>
                  {analytics.timeToHire.average.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-arrow-repeat text-warning fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Conversion Rate</h5>
              <h3 className="text-warning mb-2">{formatMetric(analytics.conversionRates.applicationToInterview)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.conversionRates.applicationToInterview.trend)} text-${getMetricColor(analytics.conversionRates.applicationToInterview)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.conversionRates.applicationToInterview)}`}>
                  {analytics.conversionRates.applicationToInterview.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-people text-info fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Diversity Score</h5>
              <h3 className="text-info mb-2">{formatMetric(analytics.diversityMetrics.overallDiversity)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.diversityMetrics.overallDiversity.trend)} text-${getMetricColor(analytics.diversityMetrics.overallDiversity)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.diversityMetrics.overallDiversity)}`}>
                  {analytics.diversityMetrics.overallDiversity.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Candidate Quality & Time to Hire */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-star text-primary me-2"></i>
                  Candidate Quality
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowQualityModal(true)}>
                  View Details
                </Button>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">By Source</h6>
                {analytics.candidateQuality.bySource.slice(0, 4).map((source, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{source.source}</span>
                    <div className="d-flex align-items-center">
                      <ProgressBar 
                        now={source.score} 
                        style={{ width: '100px' }}
                        variant="primary"
                        className="me-2"
                      />
                      <Badge bg="primary">{source.score}/10</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">By Position</h6>
                {analytics.candidateQuality.byPosition.slice(0, 3).map((position, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{position.position}</span>
                    <Badge bg="success">{position.score}/10</Badge>
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
                  <i className="bi bi-clock text-success me-2"></i>
                  Time to Hire
                </h5>
                <Button variant="outline-success" size="sm" onClick={() => setShowHiringModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">By Position</h6>
                {analytics.timeToHire.byPosition.slice(0, 4).map((position, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{position.position}</span>
                    <div className="d-flex align-items-center">
                      <Badge bg="success">{position.days} days</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Bottlenecks</h6>
                {analytics.timeToHire.bottlenecks.slice(0, 3).map((bottleneck, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{bottleneck.stage}</span>
                    <Badge bg="danger">{bottleneck.delay} days delay</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Conversion Rates & Source Effectiveness */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-arrow-repeat text-warning me-2"></i>
                  Conversion Rates
                </h5>
                <Button variant="outline-warning" size="sm">
                  View Funnel
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Funnel Metrics</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-primary mb-1">{formatMetric(analytics.conversionRates.applicationToInterview)}</h4>
                      <small className="text-muted">Application to Interview</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-success mb-1">{formatMetric(analytics.conversionRates.interviewToOffer)}</h4>
                      <small className="text-muted">Interview to Offer</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-info mb-1">{formatMetric(analytics.conversionRates.offerToAcceptance)}</h4>
                      <small className="text-muted">Offer to Acceptance</small>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-muted mb-2">By Source</h6>
                {analytics.conversionRates.bySource.slice(0, 3).map((source, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{source.source}</span>
                    <Badge bg="warning">{source.rate}%</Badge>
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
                  <i className="bi bi-graph-up text-info me-2"></i>
                  Source Effectiveness
                </h5>
                <Button variant="outline-info" size="sm" onClick={() => setShowSourceModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Top Sources</h6>
                {analytics.sourceEffectiveness.topSources.slice(0, 4).map((source, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{source.source}</span>
                    <div className="d-flex align-items-center">
                      <ProgressBar 
                        now={source.effectiveness} 
                        style={{ width: '100px' }}
                        variant="info"
                        className="me-2"
                      />
                      <Badge bg="info">{source.effectiveness}%</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Cost per Hire</h6>
                {analytics.sourceEffectiveness.costPerHire.slice(0, 3).map((source, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{source.source}</span>
                    <Badge bg="secondary">${source.cost.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Diversity Metrics */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-people text-info me-2"></i>
                  Diversity & Inclusion
                </h5>
                <Button variant="outline-info" size="sm" onClick={() => setShowDiversityModal(true)}>
                  View Details
                </Button>
              </div>
              
              <Row>
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Overall Diversity</h6>
                    <div className="diversity-circle bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-info fs-4 fw-bold">
                        {analytics.diversityMetrics.overallDiversity.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.diversityMetrics.overallDiversity.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">By Department</h6>
                    {analytics.diversityMetrics.byDepartment.slice(0, 3).map((dept, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                        <small>{dept.department}</small>
                        <Badge bg="info" className="fs-6">{dept.diversity}%</Badge>
                      </div>
                    ))}
                  </div>
                </Col>
                
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Goals Progress</h6>
                    {analytics.diversityMetrics.goals.slice(0, 3).map((goal, index) => (
                      <div key={index} className="mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small>{goal.metric}</small>
                          <small className="text-muted">{goal.current}/{goal.target}%</small>
                        </div>
                        <ProgressBar 
                          now={(goal.current / goal.target) * 100} 
                          variant="info"
                          className="mb-1"
                        />
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Candidate Quality Modal */}
      <Modal show={showQualityModal} onHide={() => setShowQualityModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-star text-primary me-2"></i>
            Candidate Quality Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Quality by Source</h6>
              {analytics.candidateQuality.bySource.map((source, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{source.source}</span>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      now={source.score} 
                      style={{ width: '150px' }}
                      variant="primary"
                      className="me-2"
                    />
                    <Badge bg="primary">{source.score}/10</Badge>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Quality by Position</h6>
              {analytics.candidateQuality.byPosition.map((position, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{position.position}</span>
                  <Badge bg="success">{position.score}/10</Badge>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQualityModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Time to Hire Modal */}
      <Modal show={showHiringModal} onHide={() => setShowHiringModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-clock text-success me-2"></i>
            Time to Hire Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-success mb-3">Time by Position</h6>
              {analytics.timeToHire.byPosition.map((position, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{position.position}</span>
                  <Badge bg="success">{position.days} days</Badge>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-danger mb-3">Bottlenecks</h6>
              {analytics.timeToHire.bottlenecks.map((bottleneck, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{bottleneck.stage}</span>
                  <Badge bg="danger">{bottleneck.delay} days delay</Badge>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHiringModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Source Effectiveness Modal */}
      <Modal show={showSourceModal} onHide={() => setShowSourceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-graph-up text-info me-2"></i>
            Source Effectiveness Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-info mb-3">Top Sources</h6>
              {analytics.sourceEffectiveness.topSources.map((source, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{source.source}</span>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      now={source.effectiveness} 
                      style={{ width: '150px' }}
                      variant="info"
                      className="me-2"
                    />
                    <Badge bg="info">{source.effectiveness}%</Badge>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-secondary mb-3">Cost per Hire</h6>
              {analytics.sourceEffectiveness.costPerHire.map((source, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{source.source}</span>
                  <Badge bg="secondary">${source.cost.toLocaleString()}</Badge>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSourceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Diversity Modal */}
      <Modal show={showDiversityModal} onHide={() => setShowDiversityModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-people text-info me-2"></i>
            Diversity & Inclusion Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-info mb-3">Diversity by Department</h6>
              {analytics.diversityMetrics.byDepartment.map((dept, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{dept.department}</span>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      now={dept.diversity} 
                      style={{ width: '150px' }}
                      variant="info"
                      className="me-2"
                    />
                    <Badge bg="info">{dept.diversity}%</Badge>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Goals Progress</h6>
              {analytics.diversityMetrics.goals.map((goal, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>{goal.metric}</span>
                    <small className="text-muted">{goal.current}/{goal.target}%</small>
                  </div>
                  <ProgressBar 
                    now={(goal.current / goal.target) * 100} 
                    variant="success"
                    className="mb-1"
                  />
                  <small className="text-muted">
                    {Math.round((goal.current / goal.target) * 100)}% of target
                  </small>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDiversityModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyAnalyticsComponent;
