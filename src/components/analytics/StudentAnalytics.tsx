import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, ProgressBar, Button, Modal, Alert } from 'react-bootstrap';
import { StudentAnalytics, AnalyticsMetric } from '../../types';

interface StudentAnalyticsProps {
  analytics: StudentAnalytics;
}

const StudentAnalyticsComponent: React.FC<StudentAnalyticsProps> = ({ analytics }) => {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);

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
            Student Analytics Dashboard
          </h3>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-speedometer2 text-primary fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Learning Velocity</h5>
              <h3 className="text-primary mb-2">{formatMetric(analytics.learningVelocity)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.learningVelocity.trend)} text-${getMetricColor(analytics.learningVelocity)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.learningVelocity)}`}>
                  {analytics.learningVelocity.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-check-circle text-success fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Completion Rate</h5>
              <h3 className="text-success mb-2">{formatMetric(analytics.completionRates)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.completionRates.trend)} text-${getMetricColor(analytics.completionRates)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.completionRates)}`}>
                  {analytics.completionRates.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-clock text-info fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Time Spent</h5>
              <h3 className="text-info mb-2">{formatMetric(analytics.engagementTrends.timeSpent)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.engagementTrends.timeSpent.trend)} text-${getMetricColor(analytics.engagementTrends.timeSpent)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.engagementTrends.timeSpent)}`}>
                  {analytics.engagementTrends.timeSpent.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-calendar-check text-warning fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Active Days</h5>
              <h3 className="text-warning mb-2">{formatMetric(analytics.engagementTrends.activeDays)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.engagementTrends.activeDays.trend)} text-${getMetricColor(analytics.engagementTrends.activeDays)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.engagementTrends.activeDays)}`}>
                  {analytics.engagementTrends.activeDays.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Skill Gap Analysis */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-puzzle text-primary me-2"></i>
                  Skill Gap Analysis
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowSkillModal(true)}>
                  View Details
                </Button>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">Top Skills Gap</h6>
                {analytics.skillGapAnalysis.gaps.slice(0, 3).map((gap, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{gap.skill}</span>
                    <Badge bg="danger">{gap.gap}% gap</Badge>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Market Demand</h6>
                {analytics.skillGapAnalysis.marketDemand.slice(0, 3).map((demand, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{demand.skill}</span>
                    <Badge bg="success">{demand.demand}% demand</Badge>
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
                  <i className="bi bi-briefcase text-success me-2"></i>
                  Career Recommendations
                </h5>
                <Button variant="outline-success" size="sm" onClick={() => setShowCareerModal(true)}>
                  View All
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Top Career Paths</h6>
                {analytics.careerRecommendations.paths.slice(0, 3).map((path, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">{path.title}</span>
                      <Badge bg="primary">{Math.round(path.probability * 100)}% match</Badge>
                    </div>
                    <ProgressBar 
                      now={path.probability * 100} 
                      className="mb-2"
                      variant="primary"
                    />
                    <small className="text-muted">
                      Skills: {path.skills.slice(0, 2).join(', ')}
                      {path.skills.length > 2 && '...'}
                    </small>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Next Steps</h6>
                <ul className="list-unstyled">
                  {analytics.careerRecommendations.nextSteps.slice(0, 3).map((step, index) => (
                    <li key={index} className="mb-1">
                      <i className="bi bi-arrow-right text-primary me-2"></i>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Engagement Trends */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <h5 className="mb-3">
                <i className="bi bi-graph-up text-info me-2"></i>
                Engagement Trends
              </h5>
              
              <Row>
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Course Participation</h6>
                    <div className="engagement-circle bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-info fs-4 fw-bold">
                        {analytics.engagementTrends.courseParticipation.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.engagementTrends.courseParticipation.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={8}>
                  <div className="engagement-chart">
                    <h6 className="text-muted mb-2">Weekly Activity</h6>
                    <div className="activity-timeline">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="activity-day">
                          <div className="activity-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                          <small className="text-muted">{day}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Skill Gap Modal */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-puzzle text-primary me-2"></i>
            Detailed Skill Gap Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Your Current Skills</h6>
              {analytics.skillGapAnalysis.currentSkills.map((skill, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{skill.skill}</span>
                  <ProgressBar 
                    now={skill.level} 
                    style={{ width: '100px' }}
                    variant="primary"
                  />
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Market Demand</h6>
              {analytics.skillGapAnalysis.marketDemand.map((demand, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{demand.skill}</span>
                  <Badge bg="success">{demand.demand}%</Badge>
                </div>
              ))}
            </Col>
          </Row>
          
          <hr />
          
          <h6 className="text-danger mb-3">Skills Gap Priority</h6>
          {analytics.skillGapAnalysis.gaps.map((gap, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <span>{gap.skill}</span>
              <Badge bg="danger">{gap.gap}% gap</Badge>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSkillModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Career Recommendations Modal */}
      <Modal show={showCareerModal} onHide={() => setShowCareerModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-briefcase text-success me-2"></i>
            Career Path Recommendations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {analytics.careerRecommendations.paths.map((path, index) => (
            <Card key={index} className="mb-3">
              <CardBody>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1">{path.title}</h6>
                    <p className="text-muted mb-2">Match probability: {Math.round(path.probability * 100)}%</p>
                  </div>
                  <Badge bg="primary" className="fs-6">{Math.round(path.probability * 100)}%</Badge>
                </div>
                
                <ProgressBar 
                  now={path.probability * 100} 
                  className="mb-3"
                  variant="primary"
                />
                
                <div>
                  <h6 className="text-muted mb-2">Required Skills</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {path.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} bg="outline-primary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          
          <Alert variant="info" className="mt-3">
            <h6 className="alert-heading">
              <i className="bi bi-lightbulb me-2"></i>
              Next Steps
            </h6>
            <ul className="mb-0">
              {analytics.careerRecommendations.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
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
    </div>
  );
};

export default StudentAnalyticsComponent;
