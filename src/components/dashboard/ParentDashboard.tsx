'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Mock data for parent dashboard
const mockParentData = {
  children: [
    {
      id: 1,
      name: "Emma Johnson",
      age: 15,
      grade: "10th Grade",
      avatar: "https://via.placeholder.com/80",
      isActive: true
    },
    {
      id: 2,
      name: "Lucas Johnson",
      age: 12,
      grade: "7th Grade",
      avatar: "https://via.placeholder.com/80",
      isActive: false
    }
  ],
  activeChild: {
    id: 1,
    name: "Emma Johnson",
    grade: "10th Grade",
    overallProgress: 87,
    recentActivity: [
      {
        id: 1,
        type: "assignment",
        subject: "Mathematics",
        title: "Algebra Quiz",
        score: 95,
        date: "2024-02-08"
      },
      {
        id: 2,
        type: "project",
        subject: "Science",
        title: "Chemistry Lab Report",
        score: 88,
        date: "2024-02-07"
      },
      {
        id: 3,
        type: "participation",
        subject: "English",
        title: "Class Discussion",
        score: 92,
        date: "2024-02-06"
      }
    ],
    performanceBySubject: [
      { subject: "Mathematics", score: 92, classAverage: 85, trend: "up" },
      { subject: "Science", score: 88, classAverage: 82, trend: "up" },
      { subject: "English", score: 85, classAverage: 87, trend: "down" },
      { subject: "History", score: 90, classAverage: 83, trend: "up" },
      { subject: "Art", score: 95, classAverage: 88, trend: "up" }
    ],
    attendance: {
      totalDays: 45,
      presentDays: 43,
      percentage: 95.6
    },
    skills: [
      { name: "Critical Thinking", level: "Advanced", verified: true },
      { name: "Problem Solving", level: "Intermediate", verified: true },
      { name: "Communication", level: "Advanced", verified: false },
      { name: "Creativity", level: "Intermediate", verified: false }
    ]
  },
  communications: [
    {
      id: 1,
      from: "Mrs. Sarah Chen",
      role: "Mathematics Teacher",
      subject: "Excellent Progress in Algebra",
      message: "Emma has shown remarkable improvement in algebraic concepts. Her problem-solving skills are exceptional.",
      date: "2024-02-08",
      type: "positive",
      read: false
    },
    {
      id: 2,
      from: "School Administration",
      role: "General Announcement",
      subject: "Parent-Teacher Conference Schedule",
      message: "Parent-teacher conferences will be held next week. Please schedule your appointment.",
      date: "2024-02-07",
      type: "info",
      read: true
    },
    {
      id: 3,
      from: "Mr. David Wilson",
      role: "English Teacher",
      subject: "Essay Writing Improvement Needed",
      message: "Emma's essay writing could use some improvement. I'd like to discuss strategies during our next meeting.",
      date: "2024-02-06",
      type: "concern",
      read: true
    }
  ],
  financialPlanning: {
    currentExpenses: {
      tuition: 2500,
      books: 300,
      activities: 150,
      technology: 200
    },
    scholarships: [
      {
        id: 1,
        name: "Academic Excellence Scholarship",
        amount: 5000,
        eligibility: 95,
        deadline: "2024-03-15",
        matchScore: 98
      },
      {
        id: 2,
        name: "STEM Achievement Award",
        amount: 3000,
        eligibility: 90,
        deadline: "2024-04-01",
        matchScore: 92
      }
    ],
    savingsGoal: 10000,
    currentSavings: 6500
  },
  careerGuidance: {
    interests: ["Mathematics", "Science", "Technology"],
    recommendedPaths: [
      {
        id: 1,
        title: "Engineering",
        probability: 85,
        description: "Strong math and science skills make engineering an excellent fit",
        universities: ["MIT", "Stanford", "UC Berkeley"],
        salary: "$85,000 - $120,000"
      },
      {
        id: 2,
        title: "Data Science",
        probability: 78,
        description: "Analytical thinking and problem-solving skills align well",
        universities: ["Harvard", "CMU", "NYU"],
        salary: "$90,000 - $130,000"
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Career Fair - STEM Focus",
        date: "2024-02-15",
        location: "School Gymnasium",
        description: "Meet professionals from engineering and technology companies"
      }
    ]
  },
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "English Grade Dropping",
      message: "Emma's English grade has decreased by 5% this month",
      date: "2024-02-08",
      priority: "high"
    },
    {
      id: 2,
      type: "success",
      title: "Scholarship Opportunity",
      message: "New scholarship available matching Emma's profile",
      date: "2024-02-07",
      priority: "medium"
    },
    {
      id: 3,
      type: "info",
      title: "Parent-Teacher Meeting",
      message: "Scheduled meeting with Math teacher next week",
      date: "2024-02-06",
      priority: "low"
    }
  ]
};

// Loading skeleton for parent dashboard
const ParentDashboardSkeleton = () => (
  <Container fluid>
    <Row className="mb-4">
      <Col lg={4}>
        <Card className="h-100 border-0 shadow-sm">
          <CardBody className="text-center p-4">
            <Placeholder as="div" animation="glow" className="rounded-circle mb-3" style={{ width: '80px', height: '80px' }} />
            <Placeholder as="h4" animation="glow" className="mb-1" />
            <Placeholder as="p" animation="glow" className="text-muted mb-2" />
            <Placeholder as="div" animation="glow" className="mb-2" style={{ width: '60px', height: '20px' }} />
            <div className="row text-center mb-3">
              <div className="col-6">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
              <div className="col-6">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
            </div>
            <Placeholder.Button animation="glow" size="sm" className="w-100" />
          </CardBody>
        </Card>
      </Col>
      <Col lg={8}>
        <Card className="h-100 border-0 shadow-sm">
          <Card.Header className="bg-gradient-success text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            <div className="row">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="col-md-6 mb-3">
                  <div className="p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Placeholder as="h6" animation="glow" className="mb-0" />
                      <Placeholder as="div" animation="glow" style={{ width: '60px', height: '20px' }} />
                    </div>
                    <Placeholder as="div" animation="glow" className="mb-2" style={{ height: '8px' }} />
                    <Placeholder as="small" animation="glow" className="text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

const ParentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeChild, setActiveChild] = useState(mockParentData.activeChild);
  const [showChildSelector, setShowChildSelector] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<any>(null);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized computed values for performance
  const savingsProgress = useMemo(() => 
    (mockParentData.financialPlanning.currentSavings / mockParentData.financialPlanning.savingsGoal) * 100, 
    []
  );

  const totalExpenses = useMemo(() => 
    Object.values(mockParentData.financialPlanning.currentExpenses).reduce((sum, expense) => sum + expense, 0), 
    []
  );

  // Optimized event handlers
  const handleChildSwitch = useCallback((child: any) => {
    setActiveChild(child);
    toast.success(`Switched to ${child.name}'s dashboard`);
  }, []);

  const handleCommunicationClick = useCallback((communication: any) => {
    setSelectedCommunication(communication);
    setShowCommunicationModal(true);
  }, []);

  const handleScheduleMeeting = useCallback(() => {
    toast.info('Meeting scheduling feature coming soon!');
  }, []);

  const handleFindScholarships = useCallback(() => {
    toast.info('Scholarship search feature coming soon!');
  }, []);

  const getAlertIcon = useCallback((type: string) => {
    switch (type) {
      case 'warning': return 'bi-exclamation-triangle';
      case 'success': return 'bi-check-circle';
      case 'info': return 'bi-info-circle';
      default: return 'bi-bell';
    }
  }, []);

  const getAlertColor = useCallback((type: string) => {
    switch (type) {
      case 'warning': return 'danger';
      case 'success': return 'success';
      case 'info': return 'info';
      default: return 'secondary';
    }
  }, []);

  if (loading) {
    return <ParentDashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error Loading Dashboard
        </Alert.Heading>
        <p>{error}</p>
        <hr />
        <Button variant="outline-danger" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <>
      {/* Child Selector & Overview */}
      <Row className="mb-4">
        <Col lg={4}>
          <Card className="h-100 border-0 shadow-sm">
            <CardBody className="text-center p-4">
              <div className="mb-3">
                <img 
                  src="https://via.placeholder.com/80" 
                  alt="Child" 
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px' }}
                  loading="lazy"
                />
                <h4 className="mb-1">{activeChild.name}</h4>
                <p className="text-muted mb-2">{activeChild.grade}</p>
                <Badge bg="primary" className="mb-2">Active Child</Badge>
              </div>
              
              <div className="mb-3">
                <h6>Overall Progress</h6>
                <div className="h2 mb-0 text-primary">{activeChild.overallProgress}%</div>
                <ProgressBar now={activeChild.overallProgress} className="mt-2" />
              </div>

              <div className="mb-3">
                <h6>Attendance</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h4 mb-0 text-success">{activeChild.attendance.percentage}%</div>
                    <small className="text-muted">Present</small>
                  </div>
                  <div className="col-6">
                    <div className="h4 mb-0 text-info">{activeChild.attendance.presentDays}/{activeChild.attendance.totalDays}</div>
                    <small className="text-muted">Days</small>
                  </div>
                </div>
              </div>

              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" size="sm" className="w-100">
                  <i className="bi bi-people me-2"></i>
                  Switch Child
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {mockParentData.children.map((child) => (
                    <Dropdown.Item 
                      key={child.id} 
                      onClick={() => handleChildSwitch(child)}
                      active={child.id === activeChild.id}
                    >
                      {child.name} - {child.grade}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </CardBody>
          </Card>
        </Col>

        {/* Performance Analytics */}
        <Col lg={8}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Performance Analytics
              </h5>
            </Card.Header>
            <CardBody>
              <div className="row">
                {activeChild.performanceBySubject.map((subject, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{subject.subject}</h6>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold me-2">{subject.score}%</span>
                          <i className={`bi bi-arrow-${subject.trend === 'up' ? 'up text-success' : 'down text-danger'}`}></i>
                        </div>
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">Class Average: {subject.classAverage}%</small>
                      </div>
                      <ProgressBar 
                        now={subject.score} 
                        className="mb-1" 
                        variant={subject.score >= subject.classAverage ? "success" : "warning"}
                      />
                      <small className="text-muted">
                        {subject.score > subject.classAverage ? '+' : ''}
                        {subject.score - subject.classAverage}% vs class average
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Communication Hub & Recent Activity */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-chat-dots me-2"></i>
                Communication Hub
              </h5>
            </Card.Header>
            <CardBody>
              {mockParentData.communications.map((comm, index) => (
                <div key={comm.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{comm.subject}</h6>
                      <small className="text-muted">{comm.from} - {comm.role}</small>
                    </div>
                    <div className="text-end">
                      <small className="text-muted">{new Date(comm.date).toLocaleDateString()}</small>
                      {!comm.read && <Badge bg="danger" className="ms-2">New</Badge>}
                    </div>
                  </div>
                  <p className="text-muted small mb-2">{comm.message.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg={getAlertColor(comm.type)}>
                      {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline-info"
                      onClick={() => handleCommunicationClick(comm)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline-info" size="sm" className="w-100" onClick={handleScheduleMeeting}>
                <i className="bi bi-plus me-2"></i>
                Schedule Meeting
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-warning text-white">
              <h5 className="mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Recent Activity
              </h5>
            </Card.Header>
            <CardBody>
              {activeChild.recentActivity.map((activity, index) => (
                <div key={activity.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-1">{activity.title}</h6>
                      <small className="text-muted">{activity.subject}</small>
                    </div>
                    <Badge bg={activity.score >= 90 ? "success" : activity.score >= 80 ? "warning" : "danger"}>
                      {activity.score}%
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {new Date(activity.date).toLocaleDateString()}
                    </small>
                    <small className="text-muted">
                      <i className={`bi bi-${activity.type === 'assignment' ? 'file-text' : activity.type === 'project' ? 'folder' : 'chat'}`}></i>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </small>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Financial Planning & Career Guidance */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-cash-stack me-2"></i>
                Financial Planning
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Current Expenses</h6>
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">Tuition</small>
                    <div className="h5 mb-0">${mockParentData.financialPlanning.currentExpenses.tuition}</div>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Books & Supplies</small>
                    <div className="h5 mb-0">${mockParentData.financialPlanning.currentExpenses.books}</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Savings Goal</h6>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <small>Progress</small>
                    <small>{Math.round(savingsProgress)}%</small>
                  </div>
                  <ProgressBar 
                    now={savingsProgress} 
                    variant="success"
                  />
                </div>
                <small className="text-muted">
                  ${mockParentData.financialPlanning.currentSavings} / ${mockParentData.financialPlanning.savingsGoal}
                </small>
              </div>

              <div className="mb-3">
                <h6>Available Scholarships</h6>
                {mockParentData.financialPlanning.scholarships.map((scholarship, index) => (
                  <div key={scholarship.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{scholarship.name}</h6>
                        <small className="text-muted">Match: {scholarship.matchScore}%</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-success">${scholarship.amount}</div>
                        <small className="text-muted">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline-primary" size="sm" className="w-100" onClick={handleFindScholarships}>
                <i className="bi bi-search me-2"></i>
                Find More Scholarships
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-briefcase me-2"></i>
                Career Guidance
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Interests & Strengths</h6>
                <div className="mb-2">
                  {mockParentData.careerGuidance.interests.map((interest, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-1">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h6>Recommended Career Paths</h6>
                {mockParentData.careerGuidance.recommendedPaths.map((path, index) => (
                  <div key={path.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{path.title}</h6>
                      <Badge bg="info">{path.probability}% Match</Badge>
                    </div>
                    <p className="text-muted small mb-2">{path.description}</p>
                    <div className="mb-2">
                      <small className="text-muted">Salary Range: {path.salary}</small>
                    </div>
                    <small className="text-muted">Top Universities: {path.universities.join(', ')}</small>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Upcoming Events</h6>
                {mockParentData.careerGuidance.upcomingEvents.map((event, index) => (
                  <div key={event.id} className="mb-2 p-2 border rounded">
                    <h6 className="mb-1">{event.title}</h6>
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {new Date(event.date).toLocaleDateString()}
                    </small>
                    <p className="text-muted small mb-0">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Alerts & Notifications */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-bell me-2"></i>
                Alerts & Notifications
              </h5>
            </Card.Header>
            <CardBody>
              <div className="row">
                {mockParentData.alerts.map((alert, index) => (
                  <div key={alert.id} className="col-lg-4 mb-3">
                    <div className={`p-3 border rounded border-${getAlertColor(alert.type)}`}>
                      <div className="d-flex align-items-start">
                        <i className={`bi ${getAlertIcon(alert.type)} text-${getAlertColor(alert.type)} me-2 mt-1`}></i>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{alert.title}</h6>
                          <p className="text-muted small mb-2">{alert.message}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              {new Date(alert.date).toLocaleDateString()}
                            </small>
                            <Badge bg={getAlertColor(alert.type)}>
                              {alert.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showCommunicationModal} onHide={() => setShowCommunicationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Communication Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCommunication && (
            <div>
              <h5>{selectedCommunication.subject}</h5>
              <p><strong>From:</strong> {selectedCommunication.from} - {selectedCommunication.role}</p>
              <p><strong>Date:</strong> {new Date(selectedCommunication.date).toLocaleDateString()}</p>
              <hr />
              <p>{selectedCommunication.message}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommunicationModal(false)}>
            Close
          </Button>
          <Button variant="primary">Reply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ParentDashboard;
