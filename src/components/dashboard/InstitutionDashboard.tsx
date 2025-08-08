'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Mock data for institution dashboard
const mockInstitutionData = {
  overview: {
    totalStudents: 2847,
    activeStudents: 2712,
    totalTeachers: 156,
    departments: 8,
    averageGPA: 3.42,
    retentionRate: 94.2,
    graduationRate: 89.7
  },
  students: {
    byDepartment: [
      { department: "Computer Science", count: 342, avgGPA: 3.51, retention: 96.1 },
      { department: "Engineering", count: 298, avgGPA: 3.38, retention: 92.3 },
      { department: "Business", count: 456, avgGPA: 3.45, retention: 95.8 },
      { department: "Arts & Humanities", count: 234, avgGPA: 3.28, retention: 91.2 },
      { department: "Sciences", count: 312, avgGPA: 3.62, retention: 97.4 },
      { department: "Medicine", count: 189, avgGPA: 3.71, retention: 98.9 }
    ],
    atRisk: [
      {
        id: "ST001",
        name: "Alex Johnson",
        department: "Computer Science",
        gpa: 2.1,
        attendance: 78,
        riskFactors: ["Low GPA", "Poor Attendance"],
        lastContact: "2024-02-05"
      },
      {
        id: "ST002", 
        name: "Maria Rodriguez",
        department: "Engineering",
        gpa: 2.3,
        attendance: 82,
        riskFactors: ["Academic Struggles"],
        lastContact: "2024-02-03"
      },
      {
        id: "ST003",
        name: "David Chen",
        department: "Business",
        gpa: 2.0,
        attendance: 65,
        riskFactors: ["Low GPA", "Poor Attendance", "Financial Issues"],
        lastContact: "2024-02-01"
      }
    ],
    recentEnrollments: [
      { id: "ST004", name: "Sarah Wilson", department: "Computer Science", date: "2024-02-08" },
      { id: "ST005", name: "Michael Brown", department: "Engineering", date: "2024-02-07" },
      { id: "ST006", name: "Emma Davis", department: "Arts & Humanities", date: "2024-02-06" }
    ]
  },
  curriculum: {
    courses: [
      {
        id: "CS101",
        name: "Introduction to Programming",
        department: "Computer Science",
        enrolled: 45,
        capacity: 50,
        completionRate: 94.2,
        avgGrade: 3.6,
        instructor: "Dr. Sarah Chen"
      },
      {
        id: "ENG201",
        name: "Advanced Mathematics",
        department: "Engineering", 
        enrolled: 38,
        capacity: 40,
        completionRate: 89.5,
        avgGrade: 3.4,
        instructor: "Prof. Michael Johnson"
      },
      {
        id: "BUS301",
        name: "Strategic Management",
        department: "Business",
        enrolled: 52,
        capacity: 55,
        completionRate: 96.1,
        avgGrade: 3.7,
        instructor: "Dr. Lisa Wang"
      }
    ],
    departments: [
      { name: "Computer Science", courses: 24, students: 342, avgCompletion: 92.3 },
      { name: "Engineering", courses: 31, students: 298, avgCompletion: 88.7 },
      { name: "Business", courses: 28, students: 456, avgCompletion: 94.1 },
      { name: "Arts & Humanities", courses: 19, students: 234, avgCompletion: 89.4 },
      { name: "Sciences", courses: 22, students: 312, avgCompletion: 93.8 },
      { name: "Medicine", courses: 18, students: 189, avgCompletion: 97.2 }
    ]
  },
  teachers: {
    activeTeachers: 156,
    departments: [
      { name: "Computer Science", teachers: 18, avgRating: 4.6 },
      { name: "Engineering", teachers: 22, avgRating: 4.4 },
      { name: "Business", teachers: 25, avgRating: 4.7 },
      { name: "Arts & Humanities", teachers: 15, avgRating: 4.3 },
      { name: "Sciences", teachers: 20, avgRating: 4.8 },
      { name: "Medicine", teachers: 12, avgRating: 4.9 }
    ],
    recentCommunications: [
      {
        id: 1,
        teacher: "Dr. Sarah Chen",
        student: "Alex Johnson",
        type: "academic_concern",
        subject: "Low Performance Alert",
        date: "2024-02-08",
        status: "pending"
      },
      {
        id: 2,
        teacher: "Prof. Michael Johnson", 
        student: "Maria Rodriguez",
        type: "improvement",
        subject: "Significant Progress",
        date: "2024-02-07",
        status: "resolved"
      }
    ]
  },
  partnerships: {
    activePartnerships: 23,
    companies: [
      {
        id: 1,
        name: "TechCorp Solutions",
        industry: "Technology",
        type: "Internship Program",
        students: 15,
        status: "active",
        startDate: "2024-01-15",
        value: "$45,000"
      },
      {
        id: 2,
        name: "Global Engineering",
        industry: "Engineering",
        type: "Research Collaboration",
        students: 8,
        status: "active",
        startDate: "2024-01-10",
        value: "$32,000"
      },
      {
        id: 3,
        name: "Innovation Labs",
        industry: "Startup",
        type: "Capstone Projects",
        students: 12,
        status: "pending",
        startDate: "2024-02-01",
        value: "$28,000"
      }
    ],
    opportunities: [
      {
        id: 1,
        company: "DataFlow Systems",
        position: "Software Developer Intern",
        department: "Computer Science",
        positions: 5,
        deadline: "2024-03-15"
      },
      {
        id: 2,
        company: "GreenTech Industries",
        position: "Environmental Engineer",
        department: "Engineering",
        positions: 3,
        deadline: "2024-03-20"
      }
    ]
  },
  analytics: {
    trends: {
      enrollmentGrowth: 12.5,
      retentionImprovement: 3.2,
      graduationRate: 89.7,
      employmentRate: 87.3
    },
    metrics: {
      studentSatisfaction: 4.2,
      facultySatisfaction: 4.5,
      researchOutput: 156,
      industryConnections: 89
    }
  },
  communications: {
    announcements: [
      {
        id: 1,
        title: "Spring Semester Registration Deadline",
        content: "Registration for Spring 2024 closes on February 15th",
        priority: "high",
        target: "all_students",
        date: "2024-02-08",
        readCount: 1247
      },
      {
        id: 2,
        title: "Career Fair 2024",
        content: "Annual career fair featuring 50+ companies on March 10th",
        priority: "medium",
        target: "final_year",
        date: "2024-02-07",
        readCount: 892
      }
    ],
    events: [
      {
        id: 1,
        title: "Faculty Development Workshop",
        date: "2024-02-15",
        time: "10:00 AM",
        location: "Conference Hall A",
        attendees: 45
      },
      {
        id: 2,
        title: "Student Leadership Conference",
        date: "2024-02-20",
        time: "2:00 PM",
        location: "Auditorium",
        attendees: 120
      }
    ]
  }
};

// Loading skeleton for institution dashboard
const InstitutionDashboardSkeleton = () => (
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
            <div className="row mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-md-6 mb-3">
                  <div className="p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Placeholder as="h6" animation="glow" className="mb-0" />
                      <Placeholder as="div" animation="glow" style={{ width: '80px', height: '20px' }} />
                    </div>
                    <div className="row text-center">
                      <div className="col-6">
                        <Placeholder as="div" animation="glow" className="h5 mb-0" />
                        <Placeholder as="small" animation="glow" />
                      </div>
                      <div className="col-6">
                        <Placeholder as="div" animation="glow" className="h5 mb-0" />
                        <Placeholder as="small" animation="glow" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

const InstitutionDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedPartnership, setSelectedPartnership] = useState<any>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized computed values for performance
  const filteredDepartments = useMemo(() => 
    selectedDepartment === "all" 
      ? mockInstitutionData.students.byDepartment 
      : mockInstitutionData.students.byDepartment.filter(dept => dept.department === selectedDepartment),
    [selectedDepartment]
  );

  const totalPartnershipValue = useMemo(() => 
    mockInstitutionData.partnerships.companies
      .filter(company => company.status === "active")
      .reduce((sum, company) => sum + parseInt(company.value.replace(/[$,]/g, '')), 0),
    []
  );

  // Optimized event handlers
  const handleDepartmentChange = useCallback((department: string) => {
    setSelectedDepartment(department);
    toast.info(`Filtered by ${department === "all" ? "all departments" : department}`);
  }, []);

  const handleStudentContact = useCallback((student: any) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  }, []);

  const handlePartnershipView = useCallback((partnership: any) => {
    setSelectedPartnership(partnership);
    setShowPartnershipModal(true);
  }, []);

  const handleNewAnnouncement = useCallback(() => {
    toast.info('Announcement creation feature coming soon!');
  }, []);

  const getRiskColor = useCallback((gpa: number) => {
    if (gpa < 2.0) return "danger";
    if (gpa < 2.5) return "warning";
    return "success";
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
    return <InstitutionDashboardSkeleton />;
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
              <div className="h2 mb-0">{mockInstitutionData.overview.totalStudents.toLocaleString()}</div>
              <small>Total Students</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-success text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockInstitutionData.overview.retentionRate}%</div>
              <small>Retention Rate</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-info text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockInstitutionData.overview.totalTeachers}</div>
              <small>Faculty Members</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-warning text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockInstitutionData.overview.averageGPA}</div>
              <small>Average GPA</small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Student Management & Analytics */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-danger text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-people me-2"></i>
                  Student Management
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <i className="bi bi-funnel me-1"></i>
                    {selectedDepartment === "all" ? "All Departments" : selectedDepartment}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDepartmentChange("all")}>All Departments</Dropdown.Item>
                    {mockInstitutionData.students.byDepartment.map((dept) => (
                      <Dropdown.Item key={dept.department} onClick={() => handleDepartmentChange(dept.department)}>
                        {dept.department}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <CardBody>
              <div className="row mb-4">
                {filteredDepartments.map((dept, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">{dept.department}</h6>
                        <Badge bg="primary">{dept.count} students</Badge>
                      </div>
                      <div className="row text-center">
                        <div className="col-6">
                          <div className="h5 mb-0 text-success">{dept.avgGPA}</div>
                          <small className="text-muted">Avg GPA</small>
                        </div>
                        <div className="col-6">
                          <div className="h5 mb-0 text-info">{dept.retention}%</div>
                          <small className="text-muted">Retention</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Students at Risk</h6>
                {mockInstitutionData.students.atRisk.map((student, index) => (
                  <div key={student.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{student.name}</h6>
                        <small className="text-muted">{student.department}</small>
                      </div>
                      <div className="text-end">
                        <Badge bg={getRiskColor(student.gpa)} className="mb-1">
                          GPA: {student.gpa}
                        </Badge>
                        <div>
                          <small className="text-muted">Attendance: {student.attendance}%</small>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      {student.riskFactors.map((factor, factorIndex) => (
                        <Badge key={factorIndex} bg="warning" className="me-1">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleStudentContact(student)}>
                        Contact Student
                      </Button>
                      <Button size="sm" variant="outline-warning">
                        Schedule Meeting
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Analytics Overview
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Key Trends</h6>
                <div className="row text-center">
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-success">+{mockInstitutionData.analytics.trends.enrollmentGrowth}%</div>
                    <small className="text-muted">Enrollment Growth</small>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-info">+{mockInstitutionData.analytics.trends.retentionImprovement}%</div>
                    <small className="text-muted">Retention Improvement</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Performance Metrics</h6>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <small>Graduation Rate</small>
                    <small>{mockInstitutionData.analytics.trends.graduationRate}%</small>
                  </div>
                  <ProgressBar now={mockInstitutionData.analytics.trends.graduationRate} variant="success" />
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <small>Employment Rate</small>
                    <small>{mockInstitutionData.analytics.trends.employmentRate}%</small>
                  </div>
                  <ProgressBar now={mockInstitutionData.analytics.trends.employmentRate} variant="info" />
                </div>
              </div>

              <div className="mb-3">
                <h6>Satisfaction Scores</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h5 mb-0 text-warning">{mockInstitutionData.analytics.metrics.studentSatisfaction}/5</div>
                    <small className="text-muted">Students</small>
                  </div>
                  <div className="col-6">
                    <div className="h5 mb-0 text-success">{mockInstitutionData.analytics.metrics.facultySatisfaction}/5</div>
                    <small className="text-muted">Faculty</small>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Curriculum Tracker & Teacher Portal */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-book me-2"></i>
                Curriculum Tracker
              </h5>
            </Card.Header>
            <CardBody>
              {mockInstitutionData.curriculum.courses.map((course, index) => (
                <div key={course.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{course.name}</h6>
                      <small className="text-muted">{course.department} - {course.instructor}</small>
                    </div>
                    <Badge bg="primary">{course.enrolled}/{course.capacity}</Badge>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Completion Rate</small>
                      <div className="h6 mb-0 text-success">{course.completionRate}%</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Average Grade</small>
                      <div className="h6 mb-0 text-info">{course.avgGrade}</div>
                    </div>
                  </div>
                  <ProgressBar 
                    now={(course.enrolled / course.capacity) * 100} 
                    variant={course.enrolled / course.capacity > 0.9 ? "warning" : "success"}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-warning text-white">
              <h5 className="mb-0">
                <i className="bi bi-person-workspace me-2"></i>
                Teacher Portal
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Department Overview</h6>
                {mockInstitutionData.teachers.departments.map((dept, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{dept.name}</h6>
                        <small className="text-muted">{dept.teachers} teachers</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-warning">{dept.avgRating}/5</div>
                        <small className="text-muted">Avg Rating</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Recent Communications</h6>
                {mockInstitutionData.teachers.recentCommunications.map((comm, index) => (
                  <div key={comm.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{comm.subject}</h6>
                        <small className="text-muted">{comm.teacher} → {comm.student}</small>
                      </div>
                      <Badge bg={comm.status === "pending" ? "warning" : "success"}>
                        {comm.status}
                      </Badge>
                    </div>
                    <small className="text-muted">{new Date(comm.date).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Partnership Hub & Communication Tools */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-handshake me-2"></i>
                Partnership Hub
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Active Partnerships</h6>
                {mockInstitutionData.partnerships.companies.map((company, index) => (
                  <div key={company.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{company.name}</h6>
                      <Badge bg={company.status === "active" ? "success" : "warning"}>
                        {company.status}
                      </Badge>
                    </div>
                    <p className="text-muted small mb-2">{company.industry} - {company.type}</p>
                    <div className="row mb-2">
                      <div className="col-6">
                        <small className="text-muted">Students</small>
                        <div className="h6 mb-0">{company.students}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Value</small>
                        <div className="h6 mb-0 text-success">{company.value}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline-secondary" className="w-100" onClick={() => handlePartnershipView(company)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>New Opportunities</h6>
                {mockInstitutionData.partnerships.opportunities.map((opp, index) => (
                  <div key={opp.id} className="mb-2 p-2 border rounded">
                    <h6 className="mb-1">{opp.position}</h6>
                    <p className="text-muted small mb-2">{opp.company} - {opp.department}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{opp.positions} positions</small>
                      <small className="text-muted">Deadline: {new Date(opp.deadline).toLocaleDateString()}</small>
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
                <i className="bi bi-megaphone me-2"></i>
                Communication Tools
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">Announcements</h6>
                  <Button size="sm" variant="outline-primary" onClick={handleNewAnnouncement}>
                    <i className="bi bi-plus me-1"></i>
                    New Announcement
                  </Button>
                </div>
                {mockInstitutionData.communications.announcements.map((announcement, index) => (
                  <div key={announcement.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-1">{announcement.title}</h6>
                      <Badge bg={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-muted small mb-2">{announcement.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{announcement.target}</small>
                      <small className="text-muted">{announcement.readCount} reads</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Upcoming Events</h6>
                {mockInstitutionData.communications.events.map((event, index) => (
                  <div key={event.id} className="mb-2 p-2 border rounded">
                    <h6 className="mb-1">{event.title}</h6>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-calendar me-1"></i>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{event.location}</small>
                      <small className="text-muted">{event.attendees} attending</small>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Management Tools */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Management Tools
              </h5>
            </Card.Header>
            <CardBody>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 border rounded">
                    <i className="bi bi-upload text-primary fs-1 mb-2"></i>
                    <h6>Bulk Import</h6>
                    <p className="text-muted small">Import student data</p>
                    <Button size="sm" variant="outline-primary">Upload CSV</Button>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 border rounded">
                    <i className="bi bi-download text-success fs-1 mb-2"></i>
                    <h6>Export Reports</h6>
                    <p className="text-muted small">Generate custom reports</p>
                    <Button size="sm" variant="outline-success">Export Data</Button>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 border rounded">
                    <i className="bi bi-shield-check text-warning fs-1 mb-2"></i>
                    <h6>GDPR Tools</h6>
                    <p className="text-muted small">Data compliance</p>
                    <Button size="sm" variant="outline-warning">Manage Data</Button>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 border rounded">
                    <i className="bi bi-list-check text-info fs-1 mb-2"></i>
                    <h6>Audit Trail</h6>
                    <p className="text-muted small">Track all actions</p>
                    <Button size="sm" variant="outline-info">View Logs</Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <h5>{selectedStudent.name}</h5>
              <p><strong>Department:</strong> {selectedStudent.department}</p>
              <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
              <p><strong>Attendance:</strong> {selectedStudent.attendance}%</p>
              <p><strong>Risk Factors:</strong> {selectedStudent.riskFactors.join(', ')}</p>
              <p><strong>Last Contact:</strong> {new Date(selectedStudent.lastContact).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStudentModal(false)}>
            Close
          </Button>
          <Button variant="primary">Contact Student</Button>
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
              <p><strong>Industry:</strong> {selectedPartnership.industry}</p>
              <p><strong>Type:</strong> {selectedPartnership.type}</p>
              <p><strong>Value:</strong> {selectedPartnership.value}</p>
              <p><strong>Students:</strong> {selectedPartnership.students}</p>
              <p><strong>Start Date:</strong> {new Date(selectedPartnership.startDate).toLocaleDateString()}</p>
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

export default InstitutionDashboard;
