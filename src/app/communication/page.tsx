'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Badge } from 'react-bootstrap';
import ChatSystem from '@/components/communication/ChatSystem';
import NotificationSystem from '@/components/communication/NotificationSystem';
import ForumSystem from '@/components/communication/ForumSystem';
import VideoCallSystem from '@/components/communication/VideoCallSystem';
import AnnouncementSystem from '@/components/communication/AnnouncementSystem';
import { useAuth } from '@/contexts/AuthContext';

const CommunicationPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'chat': return 'bi-chat-dots';
      case 'notifications': return 'bi-bell';
      case 'forum': return 'bi-people';
      case 'video': return 'bi-camera-video';
      case 'announcements': return 'bi-megaphone';
      default: return 'bi-chat';
    }
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'chat': return 'Chat';
      case 'notifications': return 'Notifications';
      case 'forum': return 'Community Forum';
      case 'video': return 'Video Calls';
      case 'announcements': return 'Announcements';
      default: return 'Chat';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatSystem currentUser={user?.profile?.firstName || 'User'} />;
      case 'notifications':
        return <NotificationSystem />;
      case 'forum':
        return <ForumSystem />;
      case 'video':
        return <VideoCallSystem />;
      case 'announcements':
        return <AnnouncementSystem />;
      default:
        return <ChatSystem currentUser={user?.profile?.firstName || 'User'} />;
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">
                <i className="bi bi-chat-square-text me-2"></i>
                Communication Hub
              </h2>
              <p className="text-muted mb-0">
                Connect, collaborate, and stay informed with the EduBridge community
              </p>
            </div>
            <div className="d-flex gap-2">
              <Badge bg="primary" className="d-flex align-items-center">
                <i className="bi bi-wifi me-1"></i>
                Connected
              </Badge>
              <Badge bg="success" className="d-flex align-items-center">
                <i className="bi bi-shield-check me-1"></i>
                Encrypted
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-primary text-white">
              <Nav variant="pills" className="flex-row">
                {[
                  { key: 'chat', label: 'Chat', count: 3 },
                  { key: 'notifications', label: 'Notifications', count: 5 },
                  { key: 'forum', label: 'Forum', count: 12 },
                  { key: 'video', label: 'Video Calls', count: 2 },
                  { key: 'announcements', label: 'Announcements', count: 4 }
                ].map(({ key, label, count }) => (
                  <Nav.Item key={key}>
                    <Nav.Link
                      active={activeTab === key}
                      onClick={() => setActiveTab(key)}
                      className="text-white border-0"
                      style={{ 
                        backgroundColor: activeTab === key ? 'rgba(255,255,255,0.2)' : 'transparent',
                        color: 'white'
                      }}
                    >
                      <i className={`bi ${getTabIcon(key)} me-2`}></i>
                      {label}
                      {count > 0 && (
                        <Badge bg="light" text="dark" className="ms-2">
                          {count}
                        </Badge>
                      )}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Header>
            
            <Card.Body className="p-0">
              <div className="p-4">
                {renderTabContent()}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Sidebar */}
      <Row className="mt-4">
        <Col lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-info text-white">
              <h6 className="mb-0">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-plus-circle me-2"></i>
                  Start New Chat
                </button>
                <button className="btn btn-outline-success btn-sm">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Call
                </button>
                <button className="btn btn-outline-warning btn-sm">
                  <i className="bi bi-megaphone me-2"></i>
                  Create Post
                </button>
                <button className="btn btn-outline-info btn-sm">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-secondary text-white">
              <h6 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Communication Analytics
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="row text-center">
                <div className="col-3">
                  <div className="h4 mb-0 text-primary">24</div>
                  <small className="text-muted">Messages Today</small>
                </div>
                <div className="col-3">
                  <div className="h4 mb-0 text-success">8</div>
                  <small className="text-muted">Active Chats</small>
                </div>
                <div className="col-3">
                  <div className="h4 mb-0 text-warning">3</div>
                  <small className="text-muted">Unread Notifications</small>
                </div>
                <div className="col-3">
                  <div className="h4 mb-0 text-info">12</div>
                  <small className="text-muted">Forum Posts</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Security & Privacy Info */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-gradient-dark text-white">
              <h6 className="mb-0">
                <i className="bi bi-shield-lock me-2"></i>
                Security & Privacy
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">End-to-End Encryption</div>
                      <small className="text-muted">All messages are encrypted</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">Privacy Controls</div>
                      <small className="text-muted">Manage your data and preferences</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    <div>
                      <div className="fw-medium">Content Moderation</div>
                      <small className="text-muted">AI-powered safety features</small>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunicationPage;
