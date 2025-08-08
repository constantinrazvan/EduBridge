'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Mock data for student dashboard
const mockStudentData = {
  profile: {
    name: "Alex Johnson",
    avatar: "https://via.placeholder.com/100",
    email: "alex.johnson@student.edu",
    level: "Advanced",
    points: 2847,
    rank: "Top 5%",
    streak: 15
  },
  learningPaths: [
    {
      id: 1,
      title: "Full Stack Development",
      progress: 75,
      estimatedCompletion: "3 weeks",
      nextMilestone: "React Advanced Concepts",
      aiRecommendation: "Based on your JavaScript expertise, focus on React hooks and state management"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 45,
      estimatedCompletion: "6 weeks",
      nextMilestone: "Python for Data Analysis",
      aiRecommendation: "Your math background makes you perfect for machine learning"
    }
  ],
  opportunities: [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Remote",
      salary: "$25/hour",
      matchScore: 95,
      skills: ["React", "JavaScript", "CSS"],
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "UI/UX Design Contest",
      company: "DesignHub",
      location: "Online",
      prize: "$500",
      matchScore: 88,
      skills: ["Figma", "Design Thinking"],
      deadline: "2024-02-20"
    }
  ],
  skills: [
    { name: "JavaScript", level: "Expert", verified: true, microCredentials: 3 },
    { name: "React", level: "Advanced", verified: true, microCredentials: 2 },
    { name: "Python", level: "Intermediate", verified: false, microCredentials: 1 },
    { name: "UI/UX Design", level: "Beginner", verified: false, microCredentials: 0 }
  ],
  portfolio: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack React application with Node.js backend",
      technologies: ["React", "Node.js", "MongoDB"],
      verified: true,
      blockchainHash: "0x1234...5678"
    }
  ],
  mentors: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      company: "Google",
      expertise: ["React", "TypeScript", "Performance"],
      nextSession: "2024-02-10T14:00:00Z"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "JavaScript Expert",
      description: "Completed advanced JavaScript certification",
      icon: "bi-code-slash",
      points: 500,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Perfect Attendance",
      description: "Attended 30 consecutive learning sessions",
      icon: "bi-calendar-check",
      points: 200,
      date: "2024-01-20"
    }
  ],
  careerPaths: [
    {
      id: 1,
      title: "Frontend Developer",
      probability: 85,
      skills: ["React", "TypeScript", "CSS"],
      companies: ["Google", "Meta", "Netflix"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      probability: 72,
      skills: ["React", "Node.js", "Database"],
      companies: ["Amazon", "Microsoft", "Startups"]
    }
  ]
};

// Loading skeleton for student dashboard
const StudentDashboardSkeleton = () => (
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
              <div className="col-4">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
              <div className="col-4">
                <Placeholder as="div" animation="glow" className="h4 mb-0" />
                <Placeholder as="small" animation="glow" className="text-muted" />
              </div>
              <div className="col-4">
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
          <Card.Header className="bg-gradient-primary text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            {[1, 2].map((i) => (
              <div key={i} className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Placeholder as="h6" animation="glow" className="mb-0" />
                  <Placeholder as="div" animation="glow" style={{ width: '40px', height: '20px' }} />
                </div>
                <Placeholder as="div" animation="glow" className="mb-2" style={{ height: '8px' }} />
                <div className="row">
                  <div className="col-md-6">
                    <Placeholder as="small" animation="glow" className="text-muted" />
                  </div>
                  <div className="col-md-6">
                    <Placeholder as="small" animation="glow" className="text-muted" />
                  </div>
                </div>
                <Placeholder as="div" animation="glow" className="mt-2 mb-0" style={{ height: '40px' }} />
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showOpportunityModal, setShowOpportunityModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized computed values for performance
  const topSkills = useMemo(() => 
    mockStudentData.skills.slice(0, 3), 
    []
  );

  const totalPoints = useMemo(() => 
    mockStudentData.achievements.reduce((sum, achievement) => sum + achievement.points, 0), 
    []
  );

  // Optimized event handlers
  const handleSkillClick = useCallback((skill: any) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  }, []);

  const handleOpportunityClick = useCallback((opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowOpportunityModal(true);
  }, []);

  const handleApplyOpportunity = useCallback(() => {
    toast.success('Application submitted successfully!');
    setShowOpportunityModal(false);
  }, []);

  const handleEditProfile = useCallback(() => {
    toast.info('Profile editing feature coming soon!');
  }, []);

  if (loading) {
    return <StudentDashboardSkeleton />;
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
      {/* Profile Card Section */}
      <Row className="mb-4">
        <Col lg={4}>
          <Card className="h-100 border-0 shadow-sm">
            <CardBody className="text-center p-4">
              <div className="mb-3">
                <img 
                  src={mockStudentData.profile.avatar} 
                  alt="Profile" 
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px' }}
                  loading="lazy"
                />
                <h4 className="mb-1">{mockStudentData.profile.name}</h4>
                <p className="text-muted mb-2">{mockStudentData.profile.email}</p>
                <Badge bg="primary" className="mb-2">{mockStudentData.profile.level}</Badge>
              </div>
              
              <div className="row text-center mb-3">
                <div className="col-4">
                  <div className="h4 mb-0 text-primary">{mockStudentData.profile.points}</div>
                  <small className="text-muted">Points</small>
                </div>
                <div className="col-4">
                  <div className="h4 mb-0 text-success">{mockStudentData.profile.rank}</div>
                  <small className="text-muted">Rank</small>
                </div>
                <div className="col-4">
                  <div className="h4 mb-0 text-warning">{mockStudentData.profile.streak}</div>
                  <small className="text-muted">Day Streak</small>
                </div>
              </div>

              <div className="mb-3">
                <h6>Top Skills</h6>
                <div className="d-flex flex-wrap gap-1">
                  {topSkills.map((skill, index) => (
                    <Badge key={index} bg={skill.verified ? "success" : "secondary"}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline-primary" size="sm" className="w-100" onClick={handleEditProfile}>
                <i className="bi bi-pencil me-2"></i>
                Edit Profile
              </Button>
            </CardBody>
          </Card>
        </Col>

        {/* Personalized Learning Paths */}
        <Col lg={8}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-robot me-2"></i>
                AI-Powered Learning Paths
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.learningPaths.map((path, index) => (
                <div key={path.id} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{path.title}</h6>
                    <Badge bg="info">{path.progress}%</Badge>
                  </div>
                  <ProgressBar now={path.progress} className="mb-2" />
                  <div className="row">
                    <div className="col-md-6">
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        Est. completion: {path.estimatedCompletion}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">
                        <i className="bi bi-flag me-1"></i>
                        Next: {path.nextMilestone}
                      </small>
                    </div>
                  </div>
                  <Alert variant="light" className="mt-2 mb-0">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    <small>{path.aiRecommendation}</small>
                  </Alert>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Opportunities Board & Skills Tracker */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-briefcase me-2"></i>
                Smart Opportunities Board
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.opportunities.map((opportunity, index) => (
                <div key={opportunity.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{opportunity.title}</h6>
                      <p className="text-muted small mb-2">
                        {opportunity.company} • {opportunity.location} • {opportunity.salary || opportunity.prize}
                      </p>
                      <div className="mb-2">
                        {opportunity.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} bg="light" text="dark" className="me-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="mb-2">
                        <Badge bg="success">Match: {opportunity.matchScore}%</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="primary"
                        onClick={() => handleOpportunityClick(opportunity)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-award me-2"></i>
                Skills Tracker
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium">{skill.name}</span>
                    <div>
                      {skill.verified && <i className="bi bi-patch-check text-success me-1"></i>}
                      <Badge bg={skill.verified ? "success" : "secondary"}>
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {skill.microCredentials} micro-credentials
                    </small>
                    <Button 
                      size="sm" 
                      variant="outline-primary"
                      onClick={() => handleSkillClick(skill)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Digital Portfolio & Mentor Network */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-warning text-white">
              <h5 className="mb-0">
                <i className="bi bi-folder2-open me-2"></i>
                Digital Portfolio
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.portfolio.map((project, index) => (
                <div key={project.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">{project.title}</h6>
                    {project.verified && (
                      <i className="bi bi-patch-check text-success" title="Blockchain Verified"></i>
                    )}
                  </div>
                  <p className="text-muted small mb-2">{project.description}</p>
                  <div className="mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} bg="light" text="dark" className="me-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.blockchainHash && (
                    <small className="text-muted">
                      <i className="bi bi-link-45deg me-1"></i>
                      Hash: {project.blockchainHash}
                    </small>
                  )}
                </div>
              ))}
              <Button variant="outline-warning" size="sm" className="w-100">
                <i className="bi bi-plus me-2"></i>
                Add New Project
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-danger text-white">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                Mentor Network
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.mentors.map((mentor, index) => (
                <div key={mentor.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex align-items-center mb-2">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-person text-white"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{mentor.name}</h6>
                      <small className="text-muted">{mentor.role} at {mentor.company}</small>
                    </div>
                  </div>
                  <div className="mb-2">
                    {mentor.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} bg="light" text="dark" className="me-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Next session: {new Date(mentor.nextSession).toLocaleDateString()}
                    </small>
                    <Button size="sm" variant="outline-danger">
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Gamification Hub & Career Exploration */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-trophy me-2"></i>
                Gamification Hub
              </h5>
            </Card.Header>
            <CardBody>
              <div className="row text-center mb-3">
                <div className="col-4">
                  <div className="h3 mb-0 text-primary">{mockStudentData.profile.points}</div>
                  <small className="text-muted">Total Points</small>
                </div>
                <div className="col-4">
                  <div className="h3 mb-0 text-success">{mockStudentData.achievements.length}</div>
                  <small className="text-muted">Achievements</small>
                </div>
                <div className="col-4">
                  <div className="h3 mb-0 text-warning">{mockStudentData.profile.streak}</div>
                  <small className="text-muted">Day Streak</small>
                </div>
              </div>

              <h6>Recent Achievements</h6>
              {mockStudentData.achievements.map((achievement, index) => (
                <div key={achievement.id} className="mb-2 p-2 border rounded">
                  <div className="d-flex align-items-center">
                    <i className={`bi ${achievement.icon} text-warning me-2`}></i>
                    <div className="flex-grow-1">
                      <div className="fw-medium">{achievement.title}</div>
                      <small className="text-muted">{achievement.description}</small>
                    </div>
                    <Badge bg="success">+{achievement.points}</Badge>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-gradient-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up-arrow me-2"></i>
                Career Exploration
              </h5>
            </Card.Header>
            <CardBody>
              {mockStudentData.careerPaths.map((career, index) => (
                <div key={career.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{career.title}</h6>
                    <Badge bg="info">{career.probability}% Match</Badge>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Required Skills:</small>
                    <div className="mt-1">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} bg="light" text="dark" className="me-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Top Companies:</small>
                    <div className="mt-1">
                      {career.companies.map((company, companyIndex) => (
                        <Badge key={companyIndex} bg="outline-secondary" className="me-1">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline-dark" className="w-100">
                    Explore Path
                  </Button>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Skill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSkill && (
            <div>
              <h5>{selectedSkill.name}</h5>
              <p>Level: {selectedSkill.level}</p>
              <p>Verified: {selectedSkill.verified ? 'Yes' : 'No'}</p>
              <p>Micro-credentials: {selectedSkill.microCredentials}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showOpportunityModal} onHide={() => setShowOpportunityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Opportunity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOpportunity && (
            <div>
              <h5>{selectedOpportunity.title}</h5>
              <p>Company: {selectedOpportunity.company}</p>
              <p>Location: {selectedOpportunity.location}</p>
              <p>Compensation: {selectedOpportunity.salary || selectedOpportunity.prize}</p>
              <p>Match Score: {selectedOpportunity.matchScore}%</p>
              <p>Deadline: {selectedOpportunity.deadline}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOpportunityModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApplyOpportunity}>
            Apply Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentDashboard;
