'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case UserRole.STUDENT: return 'Student';
      case UserRole.PARENT: return 'Parent';
      case UserRole.INSTITUTION: return 'Institution';
      case UserRole.COMPANY: return 'Company';
      case UserRole.ADMIN: return 'Admin';
      default: return 'User';
    }
  };

  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case UserRole.STUDENT: return 'primary';
      case UserRole.PARENT: return 'success';
      case UserRole.INSTITUTION: return 'info';
      case UserRole.COMPANY: return 'warning';
      case UserRole.ADMIN: return 'danger';
      default: return 'secondary';
    }
  };

  const renderStudentMenu = () => (
    <>
      <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} href="/communication">Communication</Nav.Link>
          <Nav.Link as={Link} href="/gamification">Gamification</Nav.Link>
          <Nav.Link as={Link} href="/analytics">Analytics</Nav.Link>
          <Nav.Link as={Link} href="/learning">Learning Path</Nav.Link>
      <Nav.Link as={Link} href="/skills">Skills & Certificates</Nav.Link>
      <Nav.Link as={Link} href="/opportunities">Opportunities</Nav.Link>
      <Nav.Link as={Link} href="/connections">Network</Nav.Link>
      <Nav.Link as={Link} href="/achievements">Achievements</Nav.Link>
    </>
  );

  const renderParentMenu = () => (
    <>
      <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link as={Link} href="/children">Children Progress</Nav.Link>
      <Nav.Link as={Link} href="/communication">Communication</Nav.Link>
      <Nav.Link as={Link} href="/analytics">Analytics</Nav.Link>
      <Nav.Link as={Link} href="/planning">Financial Planning</Nav.Link>
      <Nav.Link as={Link} href="/family">Family Settings</Nav.Link>
    </>
  );

  const renderInstitutionMenu = () => (
    <>
      <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link as={Link} href="/communication">Communication</Nav.Link>
      <Nav.Link as={Link} href="/students">Student Management</Nav.Link>
      <Nav.Link as={Link} href="/curriculum">Curriculum</Nav.Link>
      <Nav.Link as={Link} href="/analytics">Analytics</Nav.Link>
      <Nav.Link as={Link} href="/partnerships">Partnerships</Nav.Link>
      <Nav.Link as={Link} href="/certificates">Certificates</Nav.Link>
    </>
  );

  const renderCompanyMenu = () => (
    <>
      <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link as={Link} href="/communication">Communication</Nav.Link>
      <Nav.Link as={Link} href="/analytics">Analytics</Nav.Link>
      <Nav.Link as={Link} href="/jobs">Job Postings</Nav.Link>
      <Nav.Link as={Link} href="/applications">Applications</Nav.Link>
      <Nav.Link as={Link} href="/talent">Talent Pool</Nav.Link>
      <Nav.Link as={Link} href="/csr">CSR Initiatives</Nav.Link>
      <Nav.Link as={Link} href="/branding">Employer Branding</Nav.Link>
    </>
  );

  const renderAdminMenu = () => (
    <>
      <Nav.Link as={Link} href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link as={Link} href="/users">User Management</Nav.Link>
      <Nav.Link as={Link} href="/analytics">System Analytics</Nav.Link>
      <Nav.Link as={Link} href="/security">Security</Nav.Link>
      <Nav.Link as={Link} href="/audit">Audit Logs</Nav.Link>
      <Nav.Link as={Link} href="/settings">System Settings</Nav.Link>
    </>
  );

  const renderMenuByRole = () => {
    if (!user) return null;

    switch (user.role) {
      case UserRole.STUDENT:
        return renderStudentMenu();
      case UserRole.PARENT:
        return renderParentMenu();
      case UserRole.INSTITUTION:
        return renderInstitutionMenu();
      case UserRole.COMPANY:
        return renderCompanyMenu();
      case UserRole.ADMIN:
        return renderAdminMenu();
      default:
        return null;
    }
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      className="shadow-sm"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className="fw-bold text-primary">
          <i className="bi bi-mortarboard-fill me-2"></i>
          EduBridge
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? renderMenuByRole() : (
              <>
                <Nav.Link as={Link} href="/about">About</Nav.Link>
                <Nav.Link as={Link} href="/features">Features</Nav.Link>
                <Nav.Link as={Link} href="/contact">Contact</Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} href="/notifications" className="position-relative">
                  <i className="bi bi-bell"></i>
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    3
                  </Badge>
                </Nav.Link>
                
                <NavDropdown 
                  title={
                    <span>
                      <i className="bi bi-person-circle me-1"></i>
                      {user.profile.firstName}
                    </span>
                  } 
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} href="/profile">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/settings">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Badge 
                  bg={getRoleColor(user.role)} 
                  className="ms-2 align-self-center"
                >
                  {getRoleDisplayName(user.role)}
                </Badge>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  href="/login" 
                  variant="outline-primary" 
                  className="me-2"
                >
                  Login
                </Button>
                <Button as={Link} href="/register" variant="primary">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
