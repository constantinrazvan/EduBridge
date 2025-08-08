import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, ProgressBar, Button, Modal, Alert, Dropdown } from 'react-bootstrap';
import { InstitutionAnalytics, AnalyticsMetric } from '../../types';

interface InstitutionAnalyticsProps {
  analytics: InstitutionAnalytics;
  departments: { id: number; name: string }[];
  activeDepartment: number;
  onDepartmentChange: (departmentId: number) => void;
}

const InstitutionAnalyticsComponent: React.FC<InstitutionAnalyticsProps> = ({ 
  analytics, 
  departments, 
  activeDepartment, 
  onDepartmentChange 
}) => {
  const [showRetentionModal, setShowRetentionModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);

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
            Institution Analytics Dashboard
          </h3>
        </Col>
      </Row>

      {/* Department Selection */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-building text-primary me-2"></i>
                  Department Overview
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="department-dropdown">
                    {departments.find(d => d.id === activeDepartment)?.name || 'All Departments'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onDepartmentChange(0)} active={activeDepartment === 0}>
                      All Departments
                    </Dropdown.Item>
                    {departments.map((dept) => (
                      <Dropdown.Item 
                        key={dept.id} 
                        onClick={() => onDepartmentChange(dept.id)}
                        active={dept.id === activeDepartment}
                      >
                        {dept.name}
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
                <i className="bi bi-people text-primary fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Student Retention</h5>
              <h3 className="text-primary mb-2">{formatMetric(analytics.studentRetention.overall)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.studentRetention.overall.trend)} text-${getMetricColor(analytics.studentRetention.overall)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.studentRetention.overall)}`}>
                  {analytics.studentRetention.overall.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-mortarboard text-success fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Graduation Rate</h5>
              <h3 className="text-success mb-2">{formatMetric(analytics.graduationRates.overall)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.graduationRates.overall.trend)} text-${getMetricColor(analytics.graduationRates.overall)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.graduationRates.overall)}`}>
                  {analytics.graduationRates.overall.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-handshake text-warning fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Partnership ROI</h5>
              <h3 className="text-warning mb-2">{formatMetric(analytics.partnershipEffectiveness.roi)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.partnershipEffectiveness.roi.trend)} text-${getMetricColor(analytics.partnershipEffectiveness.roi)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.partnershipEffectiveness.roi)}`}>
                  {analytics.partnershipEffectiveness.roi.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="analytics-card h-100">
            <CardBody className="text-center">
              <div className="metric-icon bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-star text-info fs-4"></i>
              </div>
              <h5 className="text-muted mb-2">Teacher Rating</h5>
              <h3 className="text-info mb-2">{formatMetric(analytics.teacherPerformance.averageRating)}</h3>
              <div className="d-flex align-items-center justify-content-center">
                <i className={`bi ${getTrendIcon(analytics.teacherPerformance.averageRating.trend)} text-${getMetricColor(analytics.teacherPerformance.averageRating)} me-1`}></i>
                <small className={`text-${getMetricColor(analytics.teacherPerformance.averageRating)}`}>
                  {analytics.teacherPerformance.averageRating.change}% from last period
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Student Retention & Graduation */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-people text-primary me-2"></i>
                  Student Retention
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowRetentionModal(true)}>
                  View Details
                </Button>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted mb-2">By Department</h6>
                {analytics.studentRetention.byDepartment.slice(0, 4).map((dept, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{dept.department}</span>
                    <div className="d-flex align-items-center">
                      <ProgressBar 
                        now={dept.rate} 
                        style={{ width: '100px' }}
                        variant="primary"
                        className="me-2"
                      />
                      <Badge bg="primary">{dept.rate}%</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">Risk Factors</h6>
                {analytics.studentRetention.riskFactors.slice(0, 3).map((factor, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{factor.factor}</span>
                    <Badge bg="danger">{factor.impact}% impact</Badge>
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
                  <i className="bi bi-mortarboard text-success me-2"></i>
                  Graduation Rates
                </h5>
                <Button variant="outline-success" size="sm">
                  View Trends
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">By Program</h6>
                {analytics.graduationRates.byProgram.slice(0, 4).map((program, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{program.program}</span>
                    <div className="d-flex align-items-center">
                      <ProgressBar 
                        now={program.rate} 
                        style={{ width: '100px' }}
                        variant="success"
                        className="me-2"
                      />
                      <Badge bg="success">{program.rate}%</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="text-muted mb-2">5-Year Trend</h6>
                <div className="trend-chart">
                  {analytics.graduationRates.trends.slice(-5).map((trend, index) => (
                    <div key={index} className="trend-point">
                      <div className="trend-bar" style={{ height: `${trend.rate}%` }}></div>
                      <small className="text-muted">{trend.year}</small>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Partnership Effectiveness & Teacher Performance */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-handshake text-warning me-2"></i>
                  Partnership Effectiveness
                </h5>
                <Button variant="outline-warning" size="sm" onClick={() => setShowPartnershipModal(true)}>
                  View Details
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Key Metrics</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-primary mb-1">{analytics.partnershipEffectiveness.totalPartnerships.value}</h4>
                      <small className="text-muted">Total Partnerships</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-success mb-1">{analytics.partnershipEffectiveness.activePartnerships.value}</h4>
                      <small className="text-muted">Active Partnerships</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-info mb-1">{analytics.partnershipEffectiveness.studentPlacements.value}</h4>
                      <small className="text-muted">Student Placements</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-warning mb-1">{formatMetric(analytics.partnershipEffectiveness.roi)}</h4>
                      <small className="text-muted">ROI</small>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="analytics-card h-100">
            <CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="bi bi-star text-info me-2"></i>
                  Teacher Performance
                </h5>
                <Button variant="outline-info" size="sm" onClick={() => setShowTeacherModal(true)}>
                  View All
                </Button>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Key Metrics</h6>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-info mb-1">{formatMetric(analytics.teacherPerformance.averageRating)}</h4>
                      <small className="text-muted">Avg Rating</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-success mb-1">{formatMetric(analytics.teacherPerformance.studentSatisfaction)}</h4>
                      <small className="text-muted">Satisfaction</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text-center mb-3">
                      <h4 className="text-primary mb-1">{formatMetric(analytics.teacherPerformance.courseCompletion)}</h4>
                      <small className="text-muted">Completion Rate</small>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-muted mb-2">Top Performers</h6>
                {analytics.teacherPerformance.byTeacher.slice(0, 3).map((teacher, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{teacher.name}</span>
                    <div className="d-flex align-items-center">
                      <Badge bg="success" className="me-1">{teacher.metrics.rating}/5</Badge>
                      <Badge bg="info">{teacher.metrics.completion}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Resource Utilization */}
      <Row className="mb-4">
        <Col>
          <Card className="analytics-card">
            <CardBody>
              <h5 className="mb-3">
                <i className="bi bi-gear text-secondary me-2"></i>
                Resource Utilization
              </h5>
              
              <Row>
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Classroom Usage</h6>
                    <div className="utilization-circle bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-primary fs-4 fw-bold">
                        {analytics.resourceUtilization.classroomUsage.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.resourceUtilization.classroomUsage.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Equipment Utilization</h6>
                    <div className="utilization-circle bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-success fs-4 fw-bold">
                        {analytics.resourceUtilization.equipmentUtilization.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.resourceUtilization.equipmentUtilization.change}% from last period
                    </small>
                  </div>
                </Col>
                
                <Col md={4}>
                  <div className="text-center mb-3">
                    <h6 className="text-muted mb-2">Staff Efficiency</h6>
                    <div className="utilization-circle bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                      <span className="text-warning fs-4 fw-bold">
                        {analytics.resourceUtilization.staffEfficiency.value}%
                      </span>
                    </div>
                    <small className="text-muted">
                      {analytics.resourceUtilization.staffEfficiency.change}% from last period
                    </small>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Retention Details Modal */}
      <Modal show={showRetentionModal} onHide={() => setShowRetentionModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-people text-primary me-2"></i>
            Student Retention Analysis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Retention by Department</h6>
              {analytics.studentRetention.byDepartment.map((dept, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{dept.department}</span>
                  <div className="d-flex align-items-center">
                    <ProgressBar 
                      now={dept.rate} 
                      style={{ width: '150px' }}
                      variant="primary"
                      className="me-2"
                    />
                    <Badge bg="primary">{dept.rate}%</Badge>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={6}>
              <h6 className="text-danger mb-3">Risk Factors</h6>
              {analytics.studentRetention.riskFactors.map((factor, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{factor.factor}</span>
                  <Badge bg="danger">{factor.impact}% impact</Badge>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRetentionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Partnership Details Modal */}
      <Modal show={showPartnershipModal} onHide={() => setShowPartnershipModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-handshake text-warning me-2"></i>
            Partnership Effectiveness Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="text-primary mb-3">Partnership Metrics</h6>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Partnerships</span>
                  <Badge bg="primary">{analytics.partnershipEffectiveness.totalPartnerships.value}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Active Partnerships</span>
                  <Badge bg="success">{analytics.partnershipEffectiveness.activePartnerships.value}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Student Placements</span>
                  <Badge bg="info">{analytics.partnershipEffectiveness.studentPlacements.value}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>ROI</span>
                  <Badge bg="warning">{formatMetric(analytics.partnershipEffectiveness.roi)}</Badge>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <h6 className="text-success mb-3">Trends</h6>
              <div className="trend-chart">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total Partnerships</span>
                  <small className={`text-${getMetricColor(analytics.partnershipEffectiveness.totalPartnerships)}`}>
                    {analytics.partnershipEffectiveness.totalPartnerships.change}%
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Active Partnerships</span>
                  <small className={`text-${getMetricColor(analytics.partnershipEffectiveness.activePartnerships)}`}>
                    {analytics.partnershipEffectiveness.activePartnerships.change}%
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Student Placements</span>
                  <small className={`text-${getMetricColor(analytics.partnershipEffectiveness.studentPlacements)}`}>
                    {analytics.partnershipEffectiveness.studentPlacements.change}%
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>ROI</span>
                  <small className={`text-${getMetricColor(analytics.partnershipEffectiveness.roi)}`}>
                    {analytics.partnershipEffectiveness.roi.change}%
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPartnershipModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Teacher Performance Modal */}
      <Modal show={showTeacherModal} onHide={() => setShowTeacherModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-star text-info me-2"></i>
            Teacher Performance Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {analytics.teacherPerformance.byTeacher.map((teacher, index) => (
            <Card key={index} className="mb-3">
              <CardBody>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1">{teacher.name}</h6>
                    <p className="text-muted mb-2">Performance metrics</p>
                  </div>
                  <div className="text-end">
                    <Badge bg="success" className="me-1">{teacher.metrics.rating}/5</Badge>
                    <Badge bg="info">{teacher.metrics.completion}%</Badge>
                  </div>
                </div>
                
                <Row>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted mb-1">Rating</h6>
                      <ProgressBar 
                        now={(teacher.metrics.rating / 5) * 100} 
                        variant="success"
                        className="mb-1"
                      />
                      <small className="text-muted">{teacher.metrics.rating}/5</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted mb-1">Satisfaction</h6>
                      <ProgressBar 
                        now={teacher.metrics.satisfaction} 
                        variant="info"
                        className="mb-1"
                      />
                      <small className="text-muted">{teacher.metrics.satisfaction}%</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6 className="text-muted mb-1">Completion</h6>
                      <ProgressBar 
                        now={teacher.metrics.completion} 
                        variant="primary"
                        className="mb-1"
                      />
                      <small className="text-muted">{teacher.metrics.completion}%</small>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTeacherModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstitutionAnalyticsComponent;
