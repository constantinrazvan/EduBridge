'use client';

import React, { useState } from 'react';
import { Card, Button, Badge, Form, Dropdown, Modal, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'student' | 'teacher' | 'expert' | 'admin';
  timestamp: Date;
  tags: string[];
  votes: number;
  replies: number;
  views: number;
  isPinned: boolean;
  isLocked: boolean;
  category: string;
}

interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  author: string;
  authorRole: 'student' | 'teacher' | 'expert' | 'admin';
  timestamp: Date;
  votes: number;
  isAccepted: boolean;
  parentId?: string;
}

const ForumSystem: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([
    {
      id: '1',
      title: 'Best practices for React hooks',
      content: 'I\'m learning React hooks and would love to hear from experienced developers about best practices and common pitfalls to avoid.',
      author: 'Sarah Chen',
      authorRole: 'expert',
      timestamp: new Date(Date.now() - 3600000),
      tags: ['react', 'javascript', 'frontend'],
      votes: 15,
      replies: 8,
      views: 124,
      isPinned: true,
      isLocked: false,
      category: 'programming'
    },
    {
      id: '2',
      title: 'Study group for Data Structures',
      content: 'Looking for study partners for the upcoming Data Structures exam. Anyone interested in forming a study group?',
      author: 'Alex Johnson',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 7200000),
      tags: ['study-group', 'data-structures', 'algorithms'],
      votes: 8,
      replies: 12,
      views: 89,
      isPinned: false,
      isLocked: false,
      category: 'academic'
    },
    {
      id: '3',
      title: 'Career advice for CS graduates',
      content: 'I\'m graduating soon and would appreciate advice on job hunting, interview preparation, and career paths in software development.',
      author: 'Mike Rodriguez',
      authorRole: 'student',
      timestamp: new Date(Date.now() - 10800000),
      tags: ['career', 'job-hunting', 'interviews'],
      votes: 23,
      replies: 15,
      views: 256,
      isPinned: false,
      isLocked: false,
      category: 'career'
    }
  ]);

  const [replies, setReplies] = useState<ForumReply[]>([
    {
      id: '1',
      topicId: '1',
      content: 'Great question! Here are some key best practices: 1) Always use hooks at the top level, 2) Don\'t call hooks inside loops or conditions, 3) Use the dependency array properly in useEffect.',
      author: 'Dr. Sarah Chen',
      authorRole: 'expert',
      timestamp: new Date(Date.now() - 1800000),
      votes: 12,
      isAccepted: true
    },
    {
      id: '2',
      topicId: '1',
      content: 'I\'d also recommend using custom hooks to extract reusable logic. This makes your components much cleaner.',
      author: 'Prof. David Wilson',
      authorRole: 'teacher',
      timestamp: new Date(Date.now() - 900000),
      votes: 8,
      isAccepted: false
    }
  ]);

  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pinned' | 'recent' | 'popular'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const [newReply, setNewReply] = useState('');

  const handleVote = (topicId: string, isUpvote: boolean) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, votes: topic.votes + (isUpvote ? 1 : -1) };
      }
      return topic;
    }));
    toast.success(isUpvote ? 'Voted up!' : 'Voted down!');
  };

  const handleCreateTopic = () => {
    if (!newTopic.title.trim() || !newTopic.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const topic: ForumTopic = {
      id: Date.now().toString(),
      title: newTopic.title,
      content: newTopic.content,
      author: 'Current User',
      authorRole: 'student',
      timestamp: new Date(),
      tags: newTopic.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      votes: 0,
      replies: 0,
      views: 0,
      isPinned: false,
      isLocked: false,
      category: newTopic.category
    };

    setTopics(prev => [topic, ...prev]);
    setNewTopic({ title: '', content: '', category: 'general', tags: '' });
    setShowNewTopic(false);
    toast.success('Topic created successfully!');
  };

  const handleCreateReply = () => {
    if (!newReply.trim() || !selectedTopic) return;

    const reply: ForumReply = {
      id: Date.now().toString(),
      topicId: selectedTopic.id,
      content: newReply,
      author: 'Current User',
      authorRole: 'student',
      timestamp: new Date(),
      votes: 0,
      isAccepted: false
    };

    setReplies(prev => [...prev, reply]);
    setTopics(prev => prev.map(topic => 
      topic.id === selectedTopic.id ? { ...topic, replies: topic.replies + 1 } : topic
    ));
    setNewReply('');
    setShowReply(false);
    toast.success('Reply posted!');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'expert': return <Badge bg="warning">Expert</Badge>;
      case 'teacher': return <Badge bg="info">Teacher</Badge>;
      case 'admin': return <Badge bg="danger">Admin</Badge>;
      default: return <Badge bg="secondary">Student</Badge>;
    }
  };

  const filteredTopics = topics.filter(topic => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pinned' && topic.isPinned) ||
      (filter === 'recent' && (Date.now() - topic.timestamp.getTime()) < 86400000) ||
      (filter === 'popular' && topic.votes > 10);
    
    const matchesCategory = categoryFilter === 'all' || topic.category === categoryFilter;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const topicReplies = selectedTopic ? replies.filter(reply => reply.topicId === selectedTopic.id) : [];

  return (
    <div className="row">
      <div className="col-lg-8">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                Community Forum
              </h5>
              <Button variant="light" size="sm" onClick={() => setShowNewTopic(true)}>
                <i className="bi bi-plus me-1"></i>
                New Topic
              </Button>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            <div className="p-3 border-bottom">
              <div className="row">
                <div className="col-md-6">
                  <Form.Control
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100">
                      {filter === 'all' ? 'All Topics' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setFilter('all')}>All Topics</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilter('pinned')}>Pinned</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilter('recent')}>Recent</Dropdown.Item>
                      <Dropdown.Item onClick={() => setFilter('popular')}>Popular</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="col-md-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100">
                      {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setCategoryFilter('all')}>All Categories</Dropdown.Item>
                      <Dropdown.Item onClick={() => setCategoryFilter('programming')}>Programming</Dropdown.Item>
                      <Dropdown.Item onClick={() => setCategoryFilter('academic')}>Academic</Dropdown.Item>
                      <Dropdown.Item onClick={() => setCategoryFilter('career')}>Career</Dropdown.Item>
                      <Dropdown.Item onClick={() => setCategoryFilter('general')}>General</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="forum-container">
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="forum-topic">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-2">
                        {topic.isPinned && <i className="bi bi-pin-angle text-warning me-2"></i>}
                        <h6 className="mb-0">{topic.title}</h6>
                        {getRoleBadge(topic.authorRole)}
                      </div>
                      <p className="text-muted small mb-2">{topic.content.substring(0, 150)}...</p>
                      <div className="topic-stats">
                        <span><i className="bi bi-arrow-up-circle me-1"></i>{topic.votes}</span>
                        <span><i className="bi bi-chat me-1"></i>{topic.replies}</span>
                        <span><i className="bi bi-eye me-1"></i>{topic.views}</span>
                        <span><i className="bi bi-clock me-1"></i>{topic.timestamp.toLocaleDateString()}</span>
                      </div>
                      <div className="topic-tags">
                        {topic.tags.map((tag, index) => (
                          <span key={index} className="topic-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setSelectedTopic(topic)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleVote(topic.id, true)}
                      >
                        <i className="bi bi-arrow-up"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-info text-white">
            <h6 className="mb-0">
              <i className="bi bi-star me-2"></i>
              Top Contributors
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <img src="https://via.placeholder.com/32" alt="Avatar" className="rounded-circle me-2" />
                <div className="flex-grow-1">
                  <div className="fw-medium">Dr. Sarah Chen</div>
                  <small className="text-muted">Expert • 156 posts</small>
                </div>
                <Badge bg="warning">Expert</Badge>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <img src="https://via.placeholder.com/32" alt="Avatar" className="rounded-circle me-2" />
                <div className="flex-grow-1">
                  <div className="fw-medium">Prof. David Wilson</div>
                  <small className="text-muted">Teacher • 89 posts</small>
                </div>
                <Badge bg="info">Teacher</Badge>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <img src="https://via.placeholder.com/32" alt="Avatar" className="rounded-circle me-2" />
                <div className="flex-grow-1">
                  <div className="fw-medium">Alex Johnson</div>
                  <small className="text-muted">Student • 45 posts</small>
                </div>
                <Badge bg="secondary">Student</Badge>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Topic Detail Modal */}
      <Modal show={!!selectedTopic} onHide={() => setSelectedTopic(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTopic?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTopic && (
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="mb-2">{selectedTopic.content}</p>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">By {selectedTopic.author}</span>
                    {getRoleBadge(selectedTopic.authorRole)}
                    <span className="text-muted">{selectedTopic.timestamp.toLocaleString()}</span>
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <Button variant="outline-success" size="sm" onClick={() => handleVote(selectedTopic.id, true)}>
                    <i className="bi bi-arrow-up"></i> {selectedTopic.votes}
                  </Button>
                  <Button variant="outline-primary" size="sm" onClick={() => setShowReply(true)}>
                    Reply
                  </Button>
                </div>
              </div>

              <hr />

              <h6>Replies ({topicReplies.length})</h6>
              {topicReplies.map((reply) => (
                <div key={reply.id} className="border rounded p-3 mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <p className="mb-2">{reply.content}</p>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted">{reply.author}</span>
                        {getRoleBadge(reply.authorRole)}
                        <span className="text-muted">{reply.timestamp.toLocaleString()}</span>
                        {reply.isAccepted && <Badge bg="success">Accepted</Badge>}
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <Button variant="outline-success" size="sm">
                        <i className="bi bi-arrow-up"></i> {reply.votes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* New Topic Modal */}
      <Modal show={showNewTopic} onHide={() => setShowNewTopic(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTopic.title}
                onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter topic title..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newTopic.category}
                onChange={(e) => setNewTopic(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="general">General</option>
                <option value="programming">Programming</option>
                <option value="academic">Academic</option>
                <option value="career">Career</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newTopic.content}
                onChange={(e) => setNewTopic(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter your topic content..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={newTopic.tags}
                onChange={(e) => setNewTopic(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="react, javascript, frontend"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewTopic(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateTopic}>
            Create Topic
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reply Modal */}
      <Modal show={showReply} onHide={() => setShowReply(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Your Reply</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Enter your reply..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReply(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateReply}>
            Post Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForumSystem;
