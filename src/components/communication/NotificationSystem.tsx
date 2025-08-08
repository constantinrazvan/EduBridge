'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Dropdown, Modal, Form, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'urgent' | 'normal' | 'low';
  timestamp: Date;
  isRead: boolean;
  category: 'academic' | 'social' | 'system' | 'career';
  actionUrl?: string;
  sender?: string;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    academic: boolean;
    social: boolean;
    system: boolean;
    career: boolean;
  };
  priority: {
    urgent: boolean;
    normal: boolean;
    low: boolean;
  };
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'Dr. Chen has posted a new assignment for JavaScript Fundamentals',
      type: 'info',
      priority: 'normal',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      category: 'academic',
      actionUrl: '/assignments',
      sender: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      title: 'Study Group Invitation',
      message: 'You\'ve been invited to join the React Study Group',
      type: 'success',
      priority: 'normal',
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
      category: 'social',
      actionUrl: '/groups',
      sender: 'Alex Johnson'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday from 2-4 AM',
      type: 'warning',
      priority: 'low',
      timestamp: new Date(Date.now() - 900000),
      isRead: true,
      category: 'system'
    },
    {
      id: '4',
      title: 'Job Opportunity',
      message: 'New internship position available at TechCorp',
      type: 'success',
      priority: 'urgent',
      timestamp: new Date(Date.now() - 1200000),
      isRead: false,
      category: 'career',
      actionUrl: '/opportunities',
      sender: 'Career Services'
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    inApp: true,
    categories: {
      academic: true,
      social: true,
      system: false,
      career: true
    },
    priority: {
      urgent: true,
      normal: true,
      low: false
    }
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'New Message',
        message: 'You have a new message from your mentor',
        type: 'info',
        priority: 'normal',
        timestamp: new Date(),
        isRead: false,
        category: 'social',
        sender: 'Dr. Sarah Chen'
      };

      setNotifications(prev => [newNotification, ...prev]);
      toast.info('New notification received!');
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.info('Notification deleted');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'normal': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return 'bi-check-circle';
      case 'warning': return 'bi-exclamation-triangle';
      case 'error': return 'bi-x-circle';
      default: return 'bi-info-circle';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.isRead) ||
      (filter === 'urgent' && notification.priority === 'urgent');
    
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-gradient-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-bell me-2"></i>
            Notifications
            {unreadCount > 0 && (
              <Badge bg="danger" className="ms-2">{unreadCount}</Badge>
            )}
          </h5>
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
                <i className="bi bi-funnel me-1"></i>
                {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Urgent'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('unread')}>Unread</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('urgent')}>Urgent</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
                <i className="bi bi-tag me-1"></i>
                {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCategoryFilter('all')}>All Categories</Dropdown.Item>
                <Dropdown.Item onClick={() => setCategoryFilter('academic')}>Academic</Dropdown.Item>
                <Dropdown.Item onClick={() => setCategoryFilter('social')}>Social</Dropdown.Item>
                <Dropdown.Item onClick={() => setCategoryFilter('career')}>Career</Dropdown.Item>
                <Dropdown.Item onClick={() => setCategoryFilter('system')}>System</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="light" size="sm" onClick={() => setShowPreferences(true)}>
              <i className="bi bi-gear"></i>
            </Button>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <div>
            <small className="text-muted">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            </small>
            {urgentCount > 0 && (
              <Badge bg="danger" className="ms-2">{urgentCount} urgent</Badge>
            )}
          </div>
          <Button variant="outline-primary" size="sm" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredNotifications.length === 0 ? (
            <div className="text-center p-4 text-muted">
              <i className="bi bi-bell-slash fs-1 mb-3"></i>
              <p>No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.isRead ? 'unread' : ''} notification-enter`}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                      <i className={`bi ${getTypeIcon(notification.type)} me-2 text-${notification.type}`}></i>
                      <h6 className="mb-0">{notification.title}</h6>
                      <Badge 
                        bg={getPriorityColor(notification.priority)} 
                        className="ms-2 notification-priority"
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-muted small mb-1">{notification.message}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {notification.timestamp.toLocaleString()}
                        {notification.sender && ` • ${notification.sender}`}
                      </small>
                      <div className="d-flex gap-1">
                        {!notification.isRead && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        {notification.actionUrl && (
                          <Button variant="outline-success" size="sm">
                            View
                          </Button>
                        )}
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card.Body>

      {/* Preferences Modal */}
      <Modal show={showPreferences} onHide={() => setShowPreferences(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Notification Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h6>Notification Channels</h6>
              <Form.Check
                type="checkbox"
                label="Email Notifications"
                checked={preferences.email}
                onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.checked }))}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Push Notifications"
                checked={preferences.push}
                onChange={(e) => setPreferences(prev => ({ ...prev, push: e.target.checked }))}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="In-App Notifications"
                checked={preferences.inApp}
                onChange={(e) => setPreferences(prev => ({ ...prev, inApp: e.target.checked }))}
                className="mb-2"
              />
            </div>
            <div className="col-md-6">
              <h6>Categories</h6>
              {Object.entries(preferences.categories).map(([category, enabled]) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  checked={enabled}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    categories: {
                      ...prev.categories,
                      [category]: e.target.checked
                    }
                  }))}
                  className="mb-2"
                />
              ))}
            </div>
          </div>
          
          <hr />
          
          <div>
            <h6>Priority Levels</h6>
            {Object.entries(preferences.priority).map(([priority, enabled]) => (
              <Form.Check
                key={priority}
                type="checkbox"
                label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                checked={enabled}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  priority: {
                    ...prev.priority,
                    [priority]: e.target.checked
                  }
                }))}
                className="mb-2"
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreferences(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setShowPreferences(false);
            toast.success('Preferences updated!');
          }}>
            Save Preferences
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default NotificationSystem;
