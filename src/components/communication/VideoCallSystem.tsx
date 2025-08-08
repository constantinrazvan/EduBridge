'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Form, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface Participant {
  id: string;
  name: string;
  role: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isSpeaking: boolean;
}

interface VideoCall {
  id: string;
  title: string;
  participants: Participant[];
  isRecording: boolean;
  duration: number;
  startTime: Date;
}

const VideoCallSystem: React.FC = () => {
  const [currentCall, setCurrentCall] = useState<VideoCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [callTitle, setCallTitle] = useState('');
  const [callLink, setCallLink] = useState('');

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Mentor',
      isMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
      isSpeaking: true
    },
    {
      id: '2',
      name: 'Alex Johnson',
      role: 'Student',
      isMuted: true,
      isVideoOff: false,
      isScreenSharing: false,
      isSpeaking: false
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      role: 'Student',
      isMuted: false,
      isVideoOff: true,
      isScreenSharing: false,
      isSpeaking: false
    }
  ]);

  useEffect(() => {
    if (currentCall) {
      const interval = setInterval(() => {
        setCurrentCall(prev => prev ? {
          ...prev,
          duration: prev.duration + 1
        } : null);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentCall]);

  const startCall = () => {
    if (!callTitle.trim()) {
      toast.error('Please enter a call title');
      return;
    }

    const newCall: VideoCall = {
      id: Date.now().toString(),
      title: callTitle,
      participants: participants,
      isRecording: false,
      duration: 0,
      startTime: new Date()
    };

    setCurrentCall(newCall);
    setShowCreateModal(false);
    setCallTitle('');
    toast.success('Call started!');
  };

  const joinCall = () => {
    if (!callLink.trim()) {
      toast.error('Please enter a call link');
      return;
    }

    // Simulate joining a call
    const joinedCall: VideoCall = {
      id: 'joined-call',
      title: 'Mentorship Session',
      participants: participants,
      isRecording: false,
      duration: 300, // 5 minutes
      startTime: new Date(Date.now() - 300000)
    };

    setCurrentCall(joinedCall);
    setShowJoinModal(false);
    setCallLink('');
    toast.success('Joined call successfully!');
  };

  const endCall = () => {
    setCurrentCall(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsScreenSharing(false);
    setIsRecording(false);
    toast.info('Call ended');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Microphone enabled' : 'Microphone muted');
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast.info(isVideoOff ? 'Camera enabled' : 'Camera disabled');
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    setCurrentCall(prev => prev ? { ...prev, isRecording: !isRecording } : null);
    toast.info(isRecording ? 'Recording stopped' : 'Recording started');
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-camera-video me-2"></i>
                Video Call
              </h5>
              <div className="d-flex gap-2">
                <Button variant="light" size="sm" onClick={() => setShowCreateModal(true)}>
                  <i className="bi bi-plus me-1"></i>
                  New Call
                </Button>
                <Button variant="light" size="sm" onClick={() => setShowJoinModal(true)}>
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Join Call
                </Button>
              </div>
            </div>
          </Card.Header>
          
          <Card.Body className="p-0">
            {currentCall ? (
              <div>
                <div className="video-container">
                  <div className="video-main">
                    <div className="text-center">
                      <i className="bi bi-camera-video-off fs-1 mb-3"></i>
                      <h4>Mentorship Session</h4>
                      <p className="mb-0">Dr. Sarah Chen is sharing their screen</p>
                    </div>
                  </div>
                  
                  <div className="video-controls">
                    <Button 
                      className={`video-control-btn ${isMuted ? 'mute' : ''}`}
                      onClick={toggleMute}
                    >
                      <i className={`bi ${isMuted ? 'bi-mic-mute' : 'bi-mic'}`}></i>
                    </Button>
                    
                    <Button 
                      className={`video-control-btn ${isVideoOff ? 'video-off' : ''}`}
                      onClick={toggleVideo}
                    >
                      <i className={`bi ${isVideoOff ? 'bi-camera-video-off' : 'bi-camera-video'}`}></i>
                    </Button>
                    
                    <Button 
                      className={`video-control-btn ${isScreenSharing ? 'bg-success' : ''}`}
                      onClick={toggleScreenShare}
                    >
                      <i className="bi bi-display"></i>
                    </Button>
                    
                    <Button 
                      className={`video-control-btn ${isRecording ? 'bg-danger' : ''}`}
                      onClick={toggleRecording}
                    >
                      <i className="bi bi-record-circle"></i>
                    </Button>
                    
                    <Button 
                      className="video-control-btn end-call"
                      onClick={endCall}
                    >
                      <i className="bi bi-telephone-x"></i>
                    </Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-1">{currentCall.title}</h6>
                      <small className="text-muted">
                        Duration: {formatDuration(currentCall.duration)}
                        {currentCall.isRecording && (
                          <Badge bg="danger" className="ms-2">
                            <i className="bi bi-record-circle me-1"></i>
                            Recording
                          </Badge>
                        )}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-people me-1"></i>
                        {participants.length} Participants
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-chat me-1"></i>
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-5">
                <i className="bi bi-camera-video-off fs-1 text-muted mb-3"></i>
                <h5>No Active Call</h5>
                <p className="text-muted">Start or join a video call to begin</p>
                <div className="d-flex justify-content-center gap-2">
                  <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                    <i className="bi bi-plus me-1"></i>
                    Start Call
                  </Button>
                  <Button variant="outline-primary" onClick={() => setShowJoinModal(true)}>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Join Call
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-gradient-info text-white">
            <h6 className="mb-0">
              <i className="bi bi-people me-2"></i>
              Participants
            </h6>
          </Card.Header>
          <Card.Body>
            {participants.map((participant) => (
              <div key={participant.id} className="d-flex align-items-center mb-3">
                <div className="position-relative me-3">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Avatar" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                  {participant.isSpeaking && (
                    <div className="position-absolute bottom-0 end-0 bg-success rounded-circle" 
                         style={{ width: '12px', height: '12px' }}></div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium">{participant.name}</div>
                  <small className="text-muted">{participant.role}</small>
                </div>
                <div className="d-flex gap-1">
                  {participant.isMuted && (
                    <i className="bi bi-mic-mute text-danger"></i>
                  )}
                  {participant.isVideoOff && (
                    <i className="bi bi-camera-video-off text-muted"></i>
                  )}
                  {participant.isScreenSharing && (
                    <i className="bi bi-display text-success"></i>
                  )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm mt-3">
          <Card.Header className="bg-gradient-warning text-white">
            <h6 className="mb-0">
              <i className="bi bi-calendar me-2"></i>
              Upcoming Calls
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">React Study Session</h6>
                  <small className="text-muted">Today, 3:00 PM</small>
                </div>
                <Badge bg="primary">30 min</Badge>
              </div>
              <small className="text-muted">With Dr. Sarah Chen</small>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">Career Guidance</h6>
                  <small className="text-muted">Tomorrow, 2:00 PM</small>
                </div>
                <Badge bg="success">45 min</Badge>
              </div>
              <small className="text-muted">With Career Services</small>
            </div>
            <Button variant="outline-primary" size="sm" className="w-100">
              View All
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* Create Call Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start New Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Call Title</Form.Label>
            <Form.Control
              type="text"
              value={callTitle}
              onChange={(e) => setCallTitle(e.target.value)}
              placeholder="Enter call title..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Participants</Form.Label>
            <Form.Select>
              <option>Select participants...</option>
              <option>Dr. Sarah Chen (Mentor)</option>
              <option>Alex Johnson (Student)</option>
              <option>Mike Rodriguez (Student)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Select>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={startCall}>
            Start Call
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Join Call Modal */}
      <Modal show={showJoinModal} onHide={() => setShowJoinModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Call Link</Form.Label>
            <Form.Control
              type="text"
              value={callLink}
              onChange={(e) => setCallLink(e.target.value)}
              placeholder="Enter call link or code..."
            />
          </Form.Group>
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            You can join calls using a link shared by the host or a call code.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJoinModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={joinCall}>
            Join Call
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoCallSystem;
