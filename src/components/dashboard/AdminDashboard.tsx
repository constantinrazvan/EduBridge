'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, CardBody, ProgressBar, Badge, Button, Alert, Modal, Form, ListGroup, Dropdown, Spinner, Placeholder, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Mock data for admin dashboard
const mockAdminData = {
  overview: {
    totalUsers: 12478,
    activeUsers: 11892,
    totalInstitutions: 156,
    totalCompanies: 89,
    systemUptime: 99.97,
    averageResponseTime: 245,
    securityScore: 98.5,
    dataCompliance: 100
  },
  systemHealth: {
    servers: [
      { name: "Web Server 1", status: "healthy", cpu: 45, memory: 62, uptime: "15d 8h" },
      { name: "Database Server", status: "healthy", cpu: 78, memory: 85, uptime: "23d 12h" },
      { name: "Cache Server", status: "warning", cpu: 92, memory: 88, uptime: "8d 3h" },
      { name: "API Gateway", status: "healthy", cpu: 34, memory: 41, uptime: "12d 6h" }
    ],
    services: [
      { name: "Authentication", status: "healthy", responseTime: 120, errorRate: 0.1 },
      { name: "Payment Gateway", status: "healthy", responseTime: 180, errorRate: 0.05 },
      { name: "Email Service", status: "warning", responseTime: 450, errorRate: 2.1 },
      { name: "File Storage", status: "healthy", responseTime: 95, errorRate: 0.02 }
    ],
    alerts: [
      { id: 1, type: "warning", message: "Cache server CPU usage high", timestamp: "2024-02-08T10:30:00Z", resolved: false },
      { id: 2, type: "info", message: "Scheduled maintenance completed", timestamp: "2024-02-08T08:00:00Z", resolved: true },
      { id: 3, type: "error", message: "Email service slow response", timestamp: "2024-02-08T09:15:00Z", resolved: false }
    ]
  },
  userManagement: {
    recentRegistrations: [
      { id: "USR001", name: "Sarah Chen", email: "sarah.chen@student.edu", role: "student", status: "active", date: "2024-02-08" },
      { id: "USR002", name: "TechCorp Inc", email: "hr@techcorp.com", role: "company", status: "pending", date: "2024-02-07" },
      { id: "USR003", name: "State University", email: "admin@state.edu", role: "institution", status: "active", date: "2024-02-06" }
    ],
    userActivity: [
      { role: "Students", active: 8923, total: 9456, growth: 12.5 },
      { role: "Parents", active: 2341, total: 2456, growth: 8.2 },
      { role: "Institutions", active: 134, total: 156, growth: 5.8 },
      { role: "Companies", active: 67, total: 89, growth: 15.3 },
      { role: "Administrators", active: 12, total: 15, growth: 0 }
    ],
    pendingApprovals: [
      { id: "APP001", type: "institution", name: "New University", email: "admin@newuni.edu", submitted: "2024-02-08" },
      { id: "APP002", type: "company", name: "StartupXYZ", email: "hr@startupxyz.com", submitted: "2024-02-07" },
      { id: "APP003", type: "institution", name: "Community College", email: "admin@cc.edu", submitted: "2024-02-06" }
    ]
  },
  security: {
    incidents: [
      { id: 1, type: "failed_login", severity: "low", count: 45, date: "2024-02-08" },
      { id: 2, type: "suspicious_activity", severity: "medium", count: 3, date: "2024-02-07" },
      { id: 3, type: "data_access", severity: "low", count: 12, date: "2024-02-06" }
    ],
    compliance: {
      gdpr: { status: "compliant", lastAudit: "2024-01-15", nextAudit: "2024-04-15" },
      ferpa: { status: "compliant", lastAudit: "2024-01-20", nextAudit: "2024-04-20" },
      sox: { status: "compliant", lastAudit: "2024-01-10", nextAudit: "2024-04-10" }
    },
    vulnerabilities: [
      { id: 1, severity: "low", description: "Outdated SSL certificate", status: "pending", assigned: "Security Team" },
      { id: 2, severity: "medium", description: "Weak password policy", status: "in_progress", assigned: "Dev Team" },
      { id: 3, severity: "high", description: "SQL injection vulnerability", status: "resolved", assigned: "Security Team" }
    ]
  },
  analytics: {
    platformMetrics: {
      totalRevenue: 1250000,
      monthlyGrowth: 8.5,
      userEngagement: 87.3,
      featureAdoption: 92.1
    },
    performance: {
      pageLoadTime: 1.2,
      apiResponseTime: 245,
      databaseQueries: 156000,
      cacheHitRate: 94.2
    },
    usage: {
      peakConcurrentUsers: 3421,
      averageSessionDuration: 25.4,
      mostUsedFeatures: ["Dashboard", "Learning Paths", "Opportunities", "Communication"]
    }
  },
  maintenance: {
    scheduledTasks: [
      { id: 1, name: "Database Backup", status: "completed", lastRun: "2024-02-08T02:00:00Z", nextRun: "2024-02-09T02:00:00Z" },
      { id: 2, name: "Log Cleanup", status: "scheduled", lastRun: "2024-02-07T03:00:00Z", nextRun: "2024-02-08T03:00:00Z" },
      { id: 3, name: "Security Scan", status: "running", lastRun: "2024-02-08T01:00:00Z", nextRun: "2024-02-09T01:00:00Z" }
    ],
    updates: [
      { id: 1, type: "security", version: "2.1.4", status: "deployed", date: "2024-02-07" },
      { id: 2, type: "feature", version: "2.2.0", status: "testing", date: "2024-02-10" },
      { id: 3, type: "bugfix", version: "2.1.5", status: "scheduled", date: "2024-02-12" }
    ]
  }
};

// Loading skeleton for admin dashboard
const AdminDashboardSkeleton = () => (
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
            <Placeholder as="h5" animation="glow" className="mb-0" />
          </Card.Header>
          <CardBody>
            <Placeholder as="div" animation="glow" style={{ height: '300px' }} />
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

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Memoized computed values for performance
  const totalActiveUsers = useMemo(() => 
    mockAdminData.userManagement.userActivity.reduce((sum, activity) => sum + activity.active, 0),
    []
  );

  const systemHealthScore = useMemo(() => {
    const healthyServices = mockAdminData.systemHealth.services.filter(service => service.status === "healthy").length;
    return (healthyServices / mockAdminData.systemHealth.services.length) * 100;
  }, []);

  // Optimized event handlers
  const handleTabChange = useCallback((tab: string) => {
    setSelectedTab(tab);
    toast.info(`Switched to ${tab} tab`);
  }, []);

  const handleUserView = useCallback((user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  }, []);

  const handleSecurityView = useCallback((incident: any) => {
    setSelectedIncident(incident);
    setShowSecurityModal(true);
  }, []);

  const handleApproveUser = useCallback((userId: string) => {
    toast.success(`User ${userId} approved successfully`);
  }, []);

  const handleRejectUser = useCallback((userId: string) => {
    toast.warning(`User ${userId} rejected`);
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  }, []);

  if (loading) {
    return <AdminDashboardSkeleton />;
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
              <div className="h2 mb-0">{mockAdminData.overview.totalUsers.toLocaleString()}</div>
              <small>Total Users</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-success text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockAdminData.overview.systemUptime}%</div>
              <small>System Uptime</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-info text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockAdminData.overview.securityScore}%</div>
              <small>Security Score</small>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="border-0 shadow-sm bg-gradient-warning text-white">
            <CardBody className="text-center">
              <div className="h2 mb-0">{mockAdminData.overview.averageResponseTime}ms</div>
              <small>Avg Response Time</small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* System Health & User Management */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-danger text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-heart-pulse me-2"></i>
                  System Health
                </h5>
                <Badge bg="light" text="dark">
                  {systemHealthScore.toFixed(1)}% Healthy
                </Badge>
              </div>
            </Card.Header>
            <CardBody>
              <div className="mb-4">
                <h6>Server Status</h6>
                <div className="row">
                  {mockAdminData.systemHealth.servers.map((server, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="p-3 border rounded">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0">{server.name}</h6>
                          <Badge bg={getStatusColor(server.status)}>
                            {server.status}
                          </Badge>
                        </div>
                        <div className="row text-center">
                          <div className="col-6">
                            <div className="h6 mb-0 text-info">{server.cpu}%</div>
                            <small className="text-muted">CPU</small>
                          </div>
                          <div className="col-6">
                            <div className="h6 mb-0 text-warning">{server.memory}%</div>
                            <small className="text-muted">Memory</small>
                          </div>
                        </div>
                        <small className="text-muted">Uptime: {server.uptime}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h6>Service Status</h6>
                {mockAdminData.systemHealth.services.map((service, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{service.name}</h6>
                        <small className="text-muted">{service.responseTime}ms response time</small>
                      </div>
                      <div className="text-end">
                        <Badge bg={getStatusColor(service.status)} className="mb-1">
                          {service.status}
                        </Badge>
                        <div>
                          <small className="text-muted">{service.errorRate}% error rate</small>
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
              <h5 className="mb-0">
                <i className="bi bi-bell me-2"></i>
                System Alerts
              </h5>
            </Card.Header>
            <CardBody>
              {mockAdminData.systemHealth.alerts.map((alert, index) => (
                <div key={alert.id} className={`mb-2 p-2 border rounded border-${getStatusColor(alert.type)}`}>
                  <div className="d-flex align-items-start">
                    <i className={`bi bi-exclamation-triangle text-${getStatusColor(alert.type)} me-2 mt-1`}></i>
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-1">{alert.message}</p>
                      <small className="text-muted">
                        {new Date(alert.timestamp).toLocaleString()}
                      </small>
                    </div>
                    <Badge bg={alert.resolved ? "success" : "warning"}>
                      {alert.resolved ? "Resolved" : "Active"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* User Management & Security */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                User Management
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>User Activity</h6>
                {mockAdminData.userManagement.userActivity.map((activity, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{activity.role}</h6>
                        <small className="text-muted">{activity.active} active / {activity.total} total</small>
                      </div>
                      <div className="text-end">
                        <div className="h6 mb-0 text-success">+{activity.growth}%</div>
                        <small className="text-muted">Growth</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Pending Approvals</h6>
                {mockAdminData.userManagement.pendingApprovals.map((approval, index) => (
                  <div key={approval.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{approval.name}</h6>
                        <small className="text-muted">{approval.email}</small>
                      </div>
                      <Badge bg="warning">{approval.type}</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Submitted: {new Date(approval.submitted).toLocaleDateString()}</small>
                      <div>
                        <Button size="sm" variant="outline-success" className="me-1" onClick={() => handleApproveUser(approval.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleRejectUser(approval.id)}>
                          Reject
                        </Button>
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
                <i className="bi bi-shield-check me-2"></i>
                Security & Compliance
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Security Incidents</h6>
                {mockAdminData.security.incidents.map((incident, index) => (
                  <div key={incident.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{incident.type.replace('_', ' ')}</h6>
                        <small className="text-muted">{incident.count} occurrences</small>
                      </div>
                      <div className="text-end">
                        <Badge bg={getSeverityColor(incident.severity)} className="mb-1">
                          {incident.severity}
                        </Badge>
                        <div>
                          <small className="text-muted">{new Date(incident.date).toLocaleDateString()}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>Compliance Status</h6>
                {Object.entries(mockAdminData.security.compliance).map(([key, compliance]) => (
                  <div key={key} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{key.toUpperCase()}</h6>
                        <small className="text-muted">Next audit: {new Date(compliance.nextAudit).toLocaleDateString()}</small>
                      </div>
                      <Badge bg={compliance.status === "compliant" ? "success" : "danger"}>
                        {compliance.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Analytics & Maintenance */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Platform Analytics
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Key Metrics</h6>
                <div className="row text-center">
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-success">${(mockAdminData.analytics.platformMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
                    <small className="text-muted">Total Revenue</small>
                  </div>
                  <div className="col-6 mb-2">
                    <div className="h4 mb-0 text-info">+{mockAdminData.analytics.platformMetrics.monthlyGrowth}%</div>
                    <small className="text-muted">Monthly Growth</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Performance Metrics</h6>
                <div className="row text-center">
                  <div className="col-6">
                    <div className="h5 mb-0 text-warning">{mockAdminData.analytics.performance.pageLoadTime}s</div>
                    <small className="text-muted">Page Load Time</small>
                  </div>
                  <div className="col-6">
                    <div className="h5 mb-0 text-success">{mockAdminData.analytics.performance.cacheHitRate}%</div>
                    <small className="text-muted">Cache Hit Rate</small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h6>Most Used Features</h6>
                {mockAdminData.analytics.usage.mostUsedFeatures.map((feature, index) => (
                  <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h5 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                System Maintenance
              </h5>
            </Card.Header>
            <CardBody>
              <div className="mb-3">
                <h6>Scheduled Tasks</h6>
                {mockAdminData.maintenance.scheduledTasks.map((task, index) => (
                  <div key={task.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{task.name}</h6>
                        <small className="text-muted">Next run: {new Date(task.nextRun).toLocaleString()}</small>
                      </div>
                      <Badge bg={task.status === "completed" ? "success" : task.status === "running" ? "warning" : "info"}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6>System Updates</h6>
                {mockAdminData.maintenance.updates.map((update, index) => (
                  <div key={update.id} className="mb-2 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">v{update.version}</h6>
                        <small className="text-muted">{update.type} update</small>
                      </div>
                      <div className="text-end">
                        <Badge bg={update.status === "deployed" ? "success" : update.status === "testing" ? "warning" : "info"}>
                          {update.status}
                        </Badge>
                        <div>
                          <small className="text-muted">{new Date(update.date).toLocaleDateString()}</small>
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
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <h5>{selectedUser.name}</h5>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Registration Date:</strong> {new Date(selectedUser.date).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button variant="primary">Manage User</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSecurityModal} onHide={() => setShowSecurityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Security Incident Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIncident && (
            <div>
              <h5>{selectedIncident.type.replace('_', ' ')}</h5>
              <p><strong>Severity:</strong> {selectedIncident.severity}</p>
              <p><strong>Count:</strong> {selectedIncident.count}</p>
              <p><strong>Date:</strong> {new Date(selectedIncident.date).toLocaleDateString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSecurityModal(false)}>
            Close
          </Button>
          <Button variant="primary">Investigate</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDashboard;
