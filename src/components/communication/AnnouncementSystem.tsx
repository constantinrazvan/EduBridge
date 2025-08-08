'use client';

import React, { useState } from 'react';
import { Card, Button, Badge, Form, Dropdown, Modal, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  timestamp: Date;
  priority: 'urgent' | 'normal' | 'low';
  category: 'academic' | 'career' | 'event' | 'system';
  targetAudience: string[];
  isPublished: boolean;
  readBy: string[];
  attachments?: string[];
}

const AnnouncementSystem: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'New Internship Opportunities Available',
      content: 'We are excited to announce new internship opportunities with leading tech companies. Positions are available in software development, data science, and UX design.',
      author: 'Career Services',
      authorRole: 'Institution',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'urgent',
      category: 'career',
      targetAudience: ['students', 'graduates'],
      isPublished: true,
      readBy: ['user1', 'user2'],
      attachments: ['internship_guide.pdf']
    },
    {
      id: '2',
      title: 'Upcoming Career Fair - Tech Industry',
      content: 'Join us for our annual tech career fair featuring 50+ companies. Network with industry professionals and discover exciting opportunities.',
      author: 'University Events',
      authorRole: 'Institution',
      timestamp: new Date(Date.now() - 7200000),
      priority: 'normal',
      category: 'event',
      targetAudience: ['students', 'graduates', 'alumni'],
      isPublished: true,
      readBy: ['user1'],
      attachments: ['career_fair_schedule.pdf', 'company_list.pdf']
    },
    {
      id: '3',
      title: 'System Maintenance Notice',
      content: 'Scheduled maintenance will occur on Sunday from 2-4 AM. During this time, some features may be temporarily unavailable.',
      author: 'IT Department',
      authorRole: 'System',
      timestamp: new Date(Date.now() - 10800000),
      priority: 'low',
      category: 'system',
      targetAudience: ['all'],
      isPublished: true,
      readBy: [],
      attachments: []
    },
    {
      id: '4',
      title: 'New Course: Advanced Machine Learning',
      content: 'We are pleased to announce a new advanced machine learning course starting next semester. Limited seats available.',
      author: 'Computer Science Department',
      authorRole: 'Institution',
      timestamp: new Date(Date.now() - 14400000),
      priority: 'normal',
      category: 'academic',
      targetAudience: ['students'],
      isPublished: true,
      readBy: ['user1', 'user2', 'user3'],
      attachments: ['course_syllabus.pdf']
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal' as const,
    category: 'academic' as const,
    targetAudience: [] as string[],
    attachments: [] as string[]
  });

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author: 'Current User',
      authorRole: 'Institution',
      timestamp: new Date(),
      priority: newAnnouncement.priority,
      category: newAnnouncement.category,
      targetAudience: newAnnouncement.targetAudience,
      isPublished: true,
      readBy: [],
      attachments: newAnnouncement.attachments
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'normal',
      category: 'academic',
      targetAudience: [],
      attachments: []
    });
    setShowCreateModal(false);
    toast.success('Announcement created successfully!');
  };

  const markAsRead = (announcementId: string) => {
    setAnnouncements(prev => prev.map(announcement => 
      announcement.id === announcementId 
        ? { ...announcement, readBy: [...announcement.readBy, 'currentUser'] }
        : announcement
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'normal': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return 'bi-book';
      case 'career': return 'bi-briefcase';
      case 'event': return 'bi-calendar-event';
      case 'system': return 'bi-gear';
      default: return 'bi-megaphone';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesFilter = filter === 'all' || 
      (filter === 'urgent' && announcement.priority === 'urgent') ||
      (filter === 'unread' && !announcement.readBy.includes('currentUser'));
    
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  const unreadCount = announcements.filter(a => !a.readBy.includes('currentUser')).length;
  const urgentCount = announcements.filter(a => a.priority === 'urgent' && !a.readBy.includes('currentUser')).length;

  return (
    <div className="row">
      <div className="col-lg-8">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-warning text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-megaphone me-2"></i>
                Announcements
                {unreadCount > 0 && (
                  <Badge bg="danger" className="ms-2">{unreadCount}</Badge>
                )}
              </h5>
              <div className="d-flex gap-2">
                <Dropdown>
                  <Dropdown.Toggle variant="light" size="sm">
                    <i className="bi bi-funnel me-1"></i>
                    {filter === 'all' ? 'All' : filter === 'urgent' ? 'Urgent' : 'Unread'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter('urgent')}>Urgent</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter('unread')}>Unread</Dropdown.Item>
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
                    <Dropdown.Item onClick={() => setCategoryFilter('career')}>Career</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryFilter('event')}>Events</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryFilter('system')}>System</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="light" size="sm" onClick={() => setShowCreateModal(true)}>
                  <i className="bi bi-plus me-1"></i>
                  New
                </Button>
              </div>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center p-4 text-muted">
                <i className="bi bi-megaphone fs-1 mb-3"></i>
                <p>No announcements to display</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`p-3 border-bottom ${!announcement.readBy.includes('currentUser') ? 'bg-light' : ''}`}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-2">
                        <i className={`bi ${getCategoryIcon(announcement.category)} me-2 text-primary`}></i>
                        <h6 className="mb-0">{announcement.title}</h6>
                        <Badge 
                          bg={getPriorityColor(announcement.priority)} 
                          className="ms-2"
                        >
                          {announcement.priority}
                        </Badge>
                        {announcement.attachments && announcement.attachments.length > 0 && (
                          <Badge bg="info" className="ms-1">
                            <i className="bi bi-paperclip me-1"></i>
                            {announcement.attachments.length}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted small mb-2">{announcement.content.substring(0, 150)}...</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <small className="text-muted">{announcement.author}</small>
                          <small className="text-muted">{announcement.timestamp.toLocaleString()}</small>
                          <small className="text-muted">
                            {announcement.targetAudience.join(', ')}
                          </small>
                        </div>
                        <div className="d-flex gap-1">
                          {!announcement.readBy.includes('currentUser') && (
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => markAsRead(announcement.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => {
                              setSelectedAnnouncement(announcement);
                              setShowDetailModal(true);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-info text-white">
            <h6 className="mb-0">
              <i className="bi bi-bell me-2"></i>
              Quick Stats
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="row text-center">
              <div className="col-6 mb-3">
                <div className="h4 mb-0 text-primary">{announcements.length}</div>
                <small className="text-muted">Total</small>
              </div>
              <div className="col-6 mb-3">
                <div className="h4 mb-0 text-warning">{unreadCount}</div>
                <small className="text-muted">Unread</small>
              </div>
              <div className="col-6 mb-3">
                <div className="h4 mb-0 text-danger">{urgentCount}</div>
                <small className="text-muted">Urgent</small>
              </div>
              <div className="col-6 mb-3">
                <div className="h4 mb-0 text-success">{announcements.filter(a => a.category === 'career').length}</div>
                <small className="text-muted">Career</small>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm mt-3">
          <Card.Header className="bg-gradient-success text-white">
            <h6 className="mb-0">
              <i className="bi bi-calendar me-2"></i>
              Recent Activity
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-person text-white"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">Career Services</div>
                  <small className="text-muted">Posted new internship opportunities</small>
                </div>
                <small className="text-muted">2h ago</small>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-building text-white"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">University Events</div>
                  <small className="text-muted">Announced career fair details</small>
                </div>
                <small className="text-muted">4h ago</small>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-gear text-white"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">IT Department</div>
                  <small className="text-muted">Scheduled system maintenance</small>
                </div>
                <small className="text-muted">6h ago</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Create Announcement Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter announcement title..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter announcement content..."
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value as any }))}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, category: e.target.value as any }))}
                  >
                    <option value="academic">Academic</option>
                    <option value="career">Career</option>
                    <option value="event">Event</option>
                    <option value="system">System</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Target Audience</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                {['students', 'graduates', 'alumni', 'faculty', 'all'].map(audience => (
                  <Form.Check
                    key={audience}
                    type="checkbox"
                    label={audience.charAt(0).toUpperCase() + audience.slice(1)}
                    checked={newAnnouncement.targetAudience.includes(audience)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewAnnouncement(prev => ({
                          ...prev,
                          targetAudience: [...prev.targetAudience, audience]
                        }));
                      } else {
                        setNewAnnouncement(prev => ({
                          ...prev,
                          targetAudience: prev.targetAudience.filter(a => a !== audience)
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateAnnouncement}>
            Create Announcement
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Announcement Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedAnnouncement?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAnnouncement && (
            <div>
              <div className="d-flex align-items-center mb-3">
                <Badge bg={getPriorityColor(selectedAnnouncement.priority)} className="me-2">
                  {selectedAnnouncement.priority}
                </Badge>
                <Badge bg="secondary" className="me-2">
                  {selectedAnnouncement.category}
                </Badge>
                <small className="text-muted">
                  By {selectedAnnouncement.author} • {selectedAnnouncement.timestamp.toLocaleString()}
                </small>
              </div>
              
              <p className="mb-3">{selectedAnnouncement.content}</p>
              
              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="mb-3">
                  <h6>Attachments</h6>
                  {selectedAnnouncement.attachments.map((attachment, index) => (
                    <div key={index} className="d-flex align-items-center p-2 border rounded mb-2">
                      <i className="bi bi-file-earmark me-2"></i>
                      <span className="flex-grow-1">{attachment}</span>
                      <Button variant="outline-primary" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Target: {selectedAnnouncement.targetAudience.join(', ')}
                </small>
                <small className="text-muted">
                  Read by {selectedAnnouncement.readBy.length} people
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementSystem;
