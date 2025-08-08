import { Container, Row, Col, Card, CardBody, Button, Badge, Alert, AlertHeading } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                <i className="bi bi-mortarboard-fill me-3"></i>
                EduBridge
              </h1>
              <p className="lead mb-4">
                Connecting Education, Innovation, and Opportunity. A holistic platform that bridges the gap between 
                students, parents, institutions, companies, and administrators.
              </p>
              <div className="d-flex gap-3">
                <Button as="a" href="/register" size="lg" variant="light">
                  Get Started
                </Button>
                <Button as="a" href="/login" size="lg" variant="outline-light">
                  Sign In
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="bg-white bg-opacity-10 rounded p-4">
                <i className="bi bi-graph-up-arrow display-1"></i>
                <h4 className="mt-3">Platform Statistics</h4>
                <Row className="text-center">
                  <Col>
                    <div className="h3 mb-0">12,847</div>
                    <small>Active Users</small>
                  </Col>
                  <Col>
                    <div className="h3 mb-0">156</div>
                    <small>Institutions</small>
                  </Col>
                  <Col>
                    <div className="h3 mb-0">89</div>
                    <small>Companies</small>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="mb-4">Platform Features</h2>
              <p className="lead text-muted">
                Discover how EduBridge serves different user types with specialized features
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-mortarboard text-primary fs-3"></i>
                  </div>
                  <h5>Students</h5>
                  <p className="text-muted">
                    Personalized learning paths, skill tracking, gamification, and direct access to opportunities.
                  </p>
                  <div className="mt-3">
                    <Badge bg="primary" className="me-1">AI Learning</Badge>
                    <Badge bg="primary" className="me-1">Skill Tracking</Badge>
                    <Badge bg="primary" className="me-1">Opportunities</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-people text-success fs-3"></i>
                  </div>
                  <h5>Parents</h5>
                  <p className="text-muted">
                    Monitor children's progress, communicate with institutions, and plan educational investments.
                  </p>
                  <div className="mt-3">
                    <Badge bg="success" className="me-1">Progress Tracking</Badge>
                    <Badge bg="success" className="me-1">Communication</Badge>
                    <Badge bg="success" className="me-1">Planning</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-building text-info fs-3"></i>
                  </div>
                  <h5>Institutions</h5>
                  <p className="text-muted">
                    Manage students, curriculum, partnerships, and issue verifiable certificates.
                  </p>
                  <div className="mt-3">
                    <Badge bg="info" className="me-1">Student Management</Badge>
                    <Badge bg="info" className="me-1">Curriculum</Badge>
                    <Badge bg="info" className="me-1">Certificates</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-briefcase text-warning fs-3"></i>
                  </div>
                  <h5>Companies</h5>
                  <p className="text-muted">
                    Recruit talent, validate skills, manage CSR initiatives, and build employer branding.
                  </p>
                  <div className="mt-3">
                    <Badge bg="warning" className="me-1">Recruitment</Badge>
                    <Badge bg="warning" className="me-1">Talent Pool</Badge>
                    <Badge bg="warning" className="me-1">CSR</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-shield text-danger fs-3"></i>
                  </div>
                  <h5>Administrators</h5>
                  <p className="text-muted">
                    Manage users, monitor system health, ensure security, and analyze platform performance.
                  </p>
                  <div className="mt-3">
                    <Badge bg="danger" className="me-1">User Management</Badge>
                    <Badge bg="danger" className="me-1">Security</Badge>
                    <Badge bg="danger" className="me-1">Analytics</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <CardBody className="text-center p-4">
                  <div className="bg-secondary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-link text-secondary fs-3"></i>
                  </div>
                  <h5>Integration</h5>
                  <p className="text-muted">
                    Seamless integration with LMS, HR systems, payment gateways, and blockchain for credentials.
                  </p>
                  <div className="mt-3">
                    <Badge bg="secondary" className="me-1">LMS</Badge>
                    <Badge bg="secondary" className="me-1">HR/ATS</Badge>
                    <Badge bg="secondary" className="me-1">Blockchain</Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Key Concepts Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="mb-4">Key Concepts</h2>
              <p className="lead text-muted">
                Core principles that drive the EduBridge ecosystem
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-arrow-repeat text-primary"></i>
                    </div>
                    <h5 className="mb-0">Circular Value Flow</h5>
                  </div>
                  <p className="text-muted">
                    Students develop skills → Companies validate and hire → Opportunities create value → 
                    Students benefit from opportunities. This creates a sustainable ecosystem where all 
                    participants benefit from each other's success.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-robot text-success"></i>
                    </div>
                    <h5 className="mb-0">AI-Powered Personalization</h5>
                  </div>
                  <p className="text-muted">
                    Advanced AI algorithms create personalized learning paths, recommend opportunities, 
                    and match skills with market demands. The system learns and adapts to each user's 
                    unique needs and goals.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-award text-warning"></i>
                    </div>
                    <h5 className="mb-0">Micro-Credentialing</h5>
                  </div>
                  <p className="text-muted">
                    Verifiable, blockchain-based credentials for specific skills and competencies. 
                    These micro-credentials are recognized by employers and institutions, providing 
                    immediate value to learners and clear validation for companies.
                  </p>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-shield-check text-info"></i>
                    </div>
                    <h5 className="mb-0">Privacy by Design</h5>
                  </div>
                  <p className="text-muted">
                    Security and privacy are built into every aspect of the platform from the ground up. 
                    User data is protected with enterprise-grade security, and privacy controls give 
                    users full control over their information.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="mb-4">Try the Platform</h2>
              <p className="lead text-muted">
                Experience EduBridge with our demo accounts
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Alert variant="info" className="text-center">
                <AlertHeading>
                  <i className="bi bi-info-circle me-2"></i>
                  Demo Accounts Available
                </AlertHeading>
                <p>
                  Click on any role below to explore the platform with pre-configured demo accounts. 
                  All accounts use the password: <strong>password</strong>
                </p>
                                 <div className="row g-2 mt-3">
                   <div className="col-6 col-md-3">
                     <Button variant="outline-primary" size="sm" as="a" href="/login">
                       <i className="bi bi-mortarboard me-1"></i>
                       Student
                     </Button>
                   </div>
                   <div className="col-6 col-md-3">
                     <Button variant="outline-success" size="sm" as="a" href="/login">
                       <i className="bi bi-people me-1"></i>
                       Parent
                     </Button>
                   </div>
                   <div className="col-6 col-md-3">
                     <Button variant="outline-info" size="sm" as="a" href="/login">
                       <i className="bi bi-building me-1"></i>
                       Institution
                     </Button>
                   </div>
                   <div className="col-6 col-md-3">
                     <Button variant="outline-warning" size="sm" as="a" href="/login">
                       <i className="bi bi-briefcase me-1"></i>
                       Company
                     </Button>
                   </div>
                 </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6}>
              <h5>
                <i className="bi bi-mortarboard-fill me-2"></i>
                EduBridge
              </h5>
              <p className="text-muted">
                Connecting Education, Innovation, and Opportunity
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="text-muted mb-0">
                © 2024 EduBridge. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
