'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Mock data for company dashboard
const mockCompanyData = {
  overview: {
    totalCandidates: 1247,
    activePositions: 23,
    timeToHire: 28,
    costPerHire: 4500,
    diversityScore: 78.5,
    employerRating: 4.3,
    retentionRate: 92.4
  },
  talentPipeline: {
    candidates: [
      {
        id: "CAN001",
        name: "Sarah Chen",
        position: "Software Engineer",
        matchScore: 94,
        skills: ["JavaScript", "React", "Node.js", "Python"],
        experience: "3 years",
        education: "Computer Science",
        status: "interview_scheduled",
        aiPrediction: "high_success",
        diversity: "female",
        source: "university_partnership"
      },
      {
        id: "CAN002",
        name: "Marcus Rodriguez",
        position: "Data Scientist",
        matchScore: 87,
        skills: ["Python", "Machine Learning", "SQL", "R"],
        experience: "2 years",
        education: "Statistics",
        status: "technical_assessment",
        aiPrediction: "medium_success",
        diversity: "hispanic",
        source: "job_board"
      },
      {
        id: "CAN003",
        name: "Alex Johnson",
        position: "UX Designer",
        matchScore: 91,
        skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
        experience: "4 years",
        education: "Design",
        status: "offer_sent",
        aiPrediction: "high_success",
        diversity: "lgbtq",
        source: "referral"
      }
    ],
    skillsGap: [
      { skill: "Cloud Computing", gap: 15, priority: "high" },
      { skill: "Cybersecurity", gap: 22, priority: "high" },
      { skill: "Data Engineering", gap: 8, priority: "medium" },
      { skill: "DevOps", gap: 12, priority: "medium" }
    ],
    emergingSkills: [
      { skill: "AI/ML", growth: 45, demand: "high" },
      { skill: "Blockchain", growth: 32, demand: "medium" },
      { skill: "Quantum Computing", growth: 18, demand: "emerging" }
    ]
  },
  recruitment: {
    positions: [
      {
        id: "POS001",
        title: "Senior Software Engineer",
        department: "Engineering",
        openings: 3,
        applications: 47,
        interviews: 12,
        offers: 2,
        timeToFill: 35,
        budget: 120000
      },
      {
        id: "POS002",
        title: "Product Manager",
        department: "Product",
        openings: 1,
        applications: 23,
        interviews: 8,
        offers: 1,
        timeToFill: 42,
        budget: 140000
      },
      {
        id: "POS003",
        title: "Data Analyst",
        department: "Analytics",
        openings: 2,
        applications: 34,
        interviews: 15,
        offers: 2,
        timeToFill: 28,
        budget: 85000
      }
    ],
    funnel: {
      impressions: 15420,
      applications: 1247,
      interviews: 234,
      offers: 45,
      hires: 38
    },
    sources: [
      { source: "University Partnerships", candidates: 156, quality: 4.2 },
      { source: "Job Boards", candidates: 234, quality: 3.8 },
      { source: "Referrals", candidates: 89, quality: 4.5 },
      { source: "LinkedIn", candidates: 198, quality: 3.9 },
      { source: "Career Fairs", candidates: 67, quality: 4.1 }
    ]
  },
  skillsValidation: {
    assessments: [
      {
        id: "ASS001",
        title: "Frontend Development",
        type: "technical",
        candidates: 45,
        avgScore: 78.5,
        passRate: 82.3,
        duration: "90 min"
      },
      {
        id: "ASS002",
        title: "Problem Solving",
        type: "cognitive",
        candidates: 67,
        avgScore: 72.1,
        passRate: 68.7,
        duration: "60 min"
      },
      {
        id: "ASS003",
        title: "Culture Fit",
        type: "behavioral",
        candidates: 34,
        avgScore: 85.2,
        passRate: 91.2,
        duration: "45 min"
      }
    ],
    certifications: [
      {
        id: "CERT001",
        name: "Advanced JavaScript",
        issuer: "TechCorp",
        verified: true,
        blockchainHash: "0x1234...",
        holders: 23
      },
      {
        id: "CERT002",
        name: "Data Science Fundamentals",
        issuer: "TechCorp",
        verified: true,
        blockchainHash: "0x5678...",
        holders: 18
      }
    ]
  },
  employerBranding: {
    profile: {
      rating: 4.3,
      reviews: 156,
      photos: 45,
      videos: 12,
      testimonials: 23
    },
    content: [
      {
        id: 1,
        type: "video",
        title: "A Day in the Life",
        views: 1247,
        engagement: 89.2
      },
      {
        id: 2,
        type: "article",
        title: "Our Culture Values",
        views: 892,
        engagement: 76.5
      },
      {
        id: 3,
        type: "photo",
        title: "Team Building Event",
        views: 567,
        engagement: 92.1
      }
    ],
    csr: [
      {
        id: 1,
        initiative: "Green Tech Initiative",
        impact: "Reduced carbon footprint by 40%",
        participants: 89,
        mediaCoverage: 12
      },
      {
        id: 2,
        initiative: "Coding for Kids",
        impact: "Taught 500+ children programming",
        participants: 45,
        mediaCoverage: 8
      }
    ],
    achievements: [
      {
        id: 1,
        title: "Best Employer 2024",
        organization: "Tech Awards",
        date: "2024-01-15"
      },
      {
        id: 2,
        title: "Diversity Champion",
        organization: "HR Excellence",
        date: "2024-01-10"
      }
    ]
  },
  partnerships: {
    institutions: [
      {
        id: 1,
        name: "Tech University",
        type: "university",
        students: 45,
        projects: 12,
        value: "$125,000",
        status: "active"
      },
      {
        id: 2,
        name: "Code Academy",
        type: "bootcamp",
        students: 23,
        projects: 8,
        value: "$67,000",
        status: "active"
      }
    ],
    feedback: [
      {
        id: 1,
        institution: "Tech University",
        feedback: "Need more practical projects in curriculum",
        action: "scheduled_meeting",
        date: "2024-02-08"
      }
    ]
  },
  analytics: {
    roi: {
      costPerHire: 4500,
      timeToHire: 28,
      qualityOfHire: 4.2,
      retentionRate: 92.4,
      diversityScore: 78.5
    },
    funnel: {
      impressions: 15420,
      applications: 1247,
      interviews: 234,
      offers: 45,
      hires: 38
    },
    diversity: {
      gender: { male: 52, female: 48 },
      ethnicity: { white: 45, hispanic: 18, asian: 25, black: 12 },
      age: { "18-25": 15, "26-35": 45, "36-45": 30, "46+": 10 }
    }
  },
  mentorship: {
    programs: [
      {
        id: 1,
        name: "Women in Tech",
        mentees: 23,
        mentors: 8,
        successRate: 87.5,
        duration: "6 months"
      },
      {
        id: 2,
        name: "New Grad Program",
        mentees: 45,
        mentors: 12,
        successRate: 92.3,
        duration: "12 months"
      }
    ],
    mentors: [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        department: "Engineering",
        mentees: 5,
        rating: 4.8,
        specialties: ["Leadership", "Technical Skills"]
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        department: "Product",
        mentees: 3,
        rating: 4.6,
        specialties: ["Career Growth", "Product Strategy"]
      }
    ]
  }
};

// Loading skeleton for company dashboard
const CompanyDashboardSkeleton = () => (
  <Container fluid>
    <Row className="mb-4">
      {[1, 2, 3, 4].map((i) => (
        <Col key={i} lg={3} md={6}>
          <Card className="border-0 shadow-sm">
            <CardBody className="text-center">
              <Placeholder as="div" animation="glow" className="h2 mb-0" />
              <Placeholder as="small" animation="glow" />
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
    <Row className="mb-4">
      <Col lg={8}>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-danger text-white">
            <div className="d-flex justify-content-between align-items-center">
              <Placeholder as="h5" animation="glow" className="mb-0" />
              <Placeholder.Button animation="glow" size="sm" />
            </div>
          </Card.Header>
          <CardBody>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-3 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <Placeholder as="h6" animation="glow" className="mb-1" />
                    <Placeholder as="p" animation="glow" className="text-muted small mb-2" />
                    <div className="mb-2">
                      {[1, 2, 3].map((j) => (
                        <Placeholder key={j} as="span" animation="glow" className="me-1" style={{ width: '60px', height: '20px' }} />
                      ))}
                    </div>
                  </div>
                  <div className="text-end">
                    <Placeholder as="div" animation="glow" className="mb-2" style={{ width: '80px', height: '20px' }} />
                    <Placeholder.Button animation="glow" size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-info text-white">
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            <Placeholder as="div" animation="glow" style={{ height: '200px' }} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

const CompanyDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized computed values for performance
  const filteredCandidates = useMemo(() => 
    selectedPosition === "all" 
      ? mockCompanyData.talentPipeline.candidates 
      : mockCompanyData.talentPipeline.candidates.filter(candidate => candidate.position === selectedPosition),
    [selectedPosition]
  );

  const totalPartnershipValue = useMemo(() => 
    mockCompanyData.partnerships.institutions
      .filter(institution => institution.status === "active")
      .reduce((sum, institution) => sum + parseInt(institution.value.replace(/[$,]/g, '')), 0),
    []
  );

  // Optimized event handlers
  const handlePositionChange = useCallback((position: string) => {
    setSelectedPosition(position);
    toast.info(`Filtered by ${position === "all" ? "all positions" : position}`);
  }, []);

  const handleCandidateView = useCallback((candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  }, []);

  const handleAssessmentView = useCallback((assessment: any) => {
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  }, []);

  const handlePartnershipView = useCallback((partnership: any) => {
    setSelectedPartnership(partnership);
    setShowPartnershipModal(true);
  }, []);

  const getMatchColor = useCallback((score: number) => {
    if (score >= 90) return "success";
    if (score >= 80) return "warning";
    return "danger";
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'offer_sent': return 'success';
      case 'interview_scheduled': return 'primary';
      case 'technical_assessment': return 'warning';
      case 'application_review': return 'info';
      default: return 'secondary';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  }, []);

  if (loading) {
    return <CompanyDashboardSkeleton />;
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
      {/* Overview Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-primary text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockCompanyData.overview.totalCandidates.toLocaleString()}</div>
              <small>Active Candidates</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-success text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockCompanyData.overview.timeToHire} days</div>
              <small>Avg Time to Hire</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-info text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockCompanyData.overview.employerRating}/5</div>
              <small>Employer Rating</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-warning text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockCompanyData.overview.diversityScore}%</div>
              <small>Diversity Score</small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Intelligent Talent Pipeline & Advanced Recruitment */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-danger text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-people me-2"></i>
                  Intelligent Talent Pipeline
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <i className="bi bi-funnel me-1"></i>
                    {selectedPosition === "all" ? "All Positions" : selectedPosition}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handlePositionChange("all")}>All Positions</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePositionChange("Software Engineer")}>Software Engineer</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePositionChange("Data Scientist")}>Data Scientist</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePositionChange("UX Designer")}>UX Designer</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <CardBody>
              {filteredCandidates.map((candidate, index) => (
                <div key={candidate.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{candidate.name}</h6>
                      <small className="text-muted">{candidate.position} • {candidate.experience}</small>
                    </div>
                    <div className="text-end">
                      <Badge bg={getMatchColor(candidate.matchScore)} className="mb-1">
                        {candidate.matchScore}% Match
                      </Badge>
                      <Badge bg={getStatusColor(candidate.status)}>
                        {candidate.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-2">
                    {candidate.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} bg="light" text="dark" className="me-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">AI Prediction</small>
                      <div className="h6 mb-0 text-success">
                        {candidate.aiPrediction === 'high_success' ? 'High Success' : 'Medium Success'}
                      </div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Source</small>
                      <div className="h6 mb-0 text-info">{candidate.source}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleCandidateView(candidate)}>
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline-success">
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Recruitment Analytics
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Funnel Metrics</h6>
                <div className="row text-center">
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-primary">{mockCompanyData.recruitment.funnel.applications}</div>
                    <small className="text-muted">Applications</small>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-success">{mockCompanyData.recruitment.funnel.hires}</div>
                    <small className="text-muted">Hires</small>
                  </div>
                </div>
                <ProgressBar 
                  now={(mockCompanyData.recruitment.funnel.hires / mockCompanyData.recruitment.funnel.applications) * 100} 
                  variant="success"
                />
              </div>

              <div className="mb-3">
                <h6>Top Sources</h6>
                {mockCompanyData.recruitment.sources.map((source, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{source.source}</h6>
                        <small className="text-muted">{source.candidates} candidates</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-warning">{source.quality}/5</div>
                        <small className="text-muted">Quality</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Skills Validation & Employer Branding */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-award me-2"></i>
                Skills Validation Center
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Active Assessments</h6>
                {mockCompanyData.skillsValidation.assessments.map((assessment, index) => (
                  <div key={assessment.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{assessment.title}</h6>
                      <Badge bg="primary">{assessment.type}</Badge>
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">
                        <small className="text-muted">Avg Score</small>
                        <div className="h6 mb-0 text-success">{assessment.avgScore}%</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Pass Rate</small>
                        <div className="h6 mb-0 text-info">{assessment.passRate}%</div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{assessment.candidates} candidates</small>
                      <Button size="sm" variant="outline-success" onClick={() => handleAssessmentView(assessment)}>
                        View Results
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Blockchain Certifications</h6>
                {mockCompanyData.skillsValidation.certifications.map((cert, index) => (
                  <div key={cert.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{cert.name}</h6>
                        <small className="text-muted">Issued by {cert.issuer}</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-success">{cert.holders} holders</div>
                        {cert.verified && <i className="bi bi-patch-check text-success"></i>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-warning text-white">
              <h5 className="mb-0">
                <i className="bi bi-star me-2"></i>
                Employer Branding Suite
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Brand Performance</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h4 mb-0 text-warning">{mockCompanyData.employerBranding.profile.rating}/5</div>
                    <small className="text-muted">Rating</small>
                  </div>
                  <div className="col-6">
                    <div className="h4 mb-0 text-info">{mockCompanyData.employerBranding.profile.reviews}</div>
                    <small className="text-muted">Reviews</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Content Performance</h6>
                {mockCompanyData.employerBranding.content.map((content, index) => (
                  <div key={content.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{content.title}</h6>
                        <small className="text-muted">{content.type}</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-primary">{content.views}</div>
                        <small className="text-muted">{content.engagement}% engagement</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>CSR Impact</h6>
                {mockCompanyData.employerBranding.csr.map((initiative, index) => (
                  <div key={initiative.id} className="mb-2 p-2 border rounded">
                    <h6 className="mb-1">{initiative.initiative}</h6>
                    <p className="text-muted small mb-2">{initiative.impact}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{initiative.participants} participants</small>
                      <small className="text-muted">{initiative.mediaCoverage} media mentions</small>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Partnership Management & ROI Analytics */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-handshake me-2"></i>
                Partnership Management
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Institution Partnerships</h6>
                {mockCompanyData.partnerships.institutions.map((institution, index) => (
                  <div key={institution.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{institution.name}</h6>
                      <Badge bg={institution.status === "active" ? "success" : "warning"}>
                        {institution.status}
                      </Badge>
                    </div>
                    <p className="text-muted small mb-2">{institution.type} • {institution.students} students</p>
                    <div className="row mb-2">
                      <div className="col-6">
                        <small className="text-muted">Projects</small>
                        <div className="h6 mb-0">{institution.projects}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Value</small>
                        <div className="h6 mb-0 text-success">{institution.value}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline-secondary" className="w-100" onClick={() => handlePartnershipView(institution)}>
                      Manage Partnership
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Curriculum Feedback</h6>
                {mockCompanyData.partnerships.feedback.map((feedback, index) => (
                  <div key={feedback.id} className="mb-2 p-2 border rounded">
                    <h6 className="mb-1">{feedback.institution}</h6>
                    <p className="text-muted small mb-2">{feedback.feedback}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{feedback.action}</small>
                      <small className="text-muted">{new Date(feedback.date).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                ROI Analytics Dashboard
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Key Metrics</h6>
                <div className="row text-center">
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-success">${mockCompanyData.analytics.roi.costPerHire.toLocaleString()}</div>
                    <small className="text-muted">Cost per Hire</small>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-info">{mockCompanyData.analytics.roi.timeToHire} days</div>
                    <small className="text-muted">Time to Hire</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Quality Metrics</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h5 mb-0 text-warning">{mockCompanyData.analytics.roi.qualityOfHire}/5</div>
                    <small className="text-muted">Quality of Hire</small>
                  </div>
                  <div className="col-6">
                    <div className="h5 mb-0 text-success">{mockCompanyData.analytics.roi.retentionRate}%</div>
                    <small className="text-muted">Retention Rate</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Diversity Analytics</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h5 mb-0 text-info">{mockCompanyData.analytics.diversity.gender.female}%</div>
                    <small className="text-muted">Female</small>
                  </div>
                  <div className="col-6">
                    <div className="h5 mb-0 text-primary">{mockCompanyData.analytics.diversity.gender.male}%</div>
                    <small className="text-muted">Male</small>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showCandidateModal} onHide={() => setShowCandidateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Candidate Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <div>
              <h5>{selectedCandidate.name}</h5>
              <p><strong>Position:</strong> {selectedCandidate.position}</p>
              <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
              <p><strong>Education:</strong> {selectedCandidate.education}</p>
              <p><strong>Match Score:</strong> {selectedCandidate.matchScore}%</p>
              <p><strong>Status:</strong> {selectedCandidate.status.replace('_', ' ')}</p>
              <p><strong>AI Prediction:</strong> {selectedCandidate.aiPrediction.replace('_', ' ')}</p>
              <p><strong>Source:</strong> {selectedCandidate.source.replace('_', ' ')}</p>
              <p><strong>Skills:</strong> {selectedCandidate.skills.join(', ')}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCandidateModal(false)}>
            Close
          </Button>
          <Button variant="primary">Schedule Interview</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAssessmentModal} onHide={() => setShowAssessmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assessment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAssessment && (
            <div>
              <h5>{selectedAssessment.title}</h5>
              <p><strong>Type:</strong> {selectedAssessment.type}</p>
              <p><strong>Candidates:</strong> {selectedAssessment.candidates}</p>
              <p><strong>Average Score:</strong> {selectedAssessment.avgScore}%</p>
              <p><strong>Pass Rate:</strong> {selectedAssessment.passRate}%</p>
              <p><strong>Duration:</strong> {selectedAssessment.duration}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssessmentModal(false)}>
            Close
          </Button>
          <Button variant="primary">View Detailed Results</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPartnershipModal} onHide={() => setShowPartnershipModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Partnership Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPartnership && (
            <div>
              <h5>{selectedPartnership.name}</h5>
              <p><strong>Type:</strong> {selectedPartnership.type}</p>
              <p><strong>Students:</strong> {selectedPartnership.students}</p>
              <p><strong>Projects:</strong> {selectedPartnership.projects}</p>
              <p><strong>Value:</strong> {selectedPartnership.value}</p>
              <p><strong>Status:</strong> {selectedPartnership.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPartnershipModal(false)}>
            Close
          </Button>
          <Button variant="primary">Manage Partnership</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyDashboard;
