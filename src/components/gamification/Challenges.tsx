'use client';

import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Modal, ProgressBar, Row, Col } from 'react-bootstrap';
import { Challenge } from '@/types';

interface ChallengesProps {
  challenges: Challenge[];
}

const Challenges: React.FC<ChallengesProps> = ({ challenges }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'seasonal'>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seasonal': return 'danger';
      case 'monthly': return 'warning';
      case 'weekly': return 'info';
      case 'daily': return 'success';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'primary';
      case 'social': return 'success';
      case 'career': return 'warning';
      case 'skills': return 'info';
      case 'leadership': return 'danger';
      default: return 'secondary';
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Less than 1h';
  };

  const filteredChallenges = challenges.filter(challenge => 
    activeFilter === 'all' || challenge.type === activeFilter
  );

  const completedChallenges = filteredChallenges.filter(c => c.isCompleted);
  const activeChallenges = filteredChallenges.filter(c => !c.isCompleted);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <i className="bi bi-flag me-2"></i>
              Challenges
            </h5>
            <Badge bg="success">{completedChallenges.length} completed</Badge>
          </div>

          <div className="mb-3">
            <div className="btn-group btn-group-sm w-100">
              {[
                { key: 'all', name: 'All', icon: 'bi-collection' },
                { key: 'daily', name: 'Daily', icon: 'bi-calendar-day' },
                { key: 'weekly', name: 'Weekly', icon: 'bi-calendar-week' },
                { key: 'monthly', name: 'Monthly', icon: 'bi-calendar-month' },
                { key: 'seasonal', name: 'Seasonal', icon: 'bi-calendar-event' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as any)}
                  className="flex-fill"
                >
                  <i className={`${filter.icon} me-1`}></i>
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="challenges-container">
            {activeChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="challenge-item border rounded p-3 mb-3 cursor-pointer"
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{challenge.title}</h6>
                    <p className="text-muted small mb-2">{challenge.description}</p>
                  </div>
                  <div className="text-end">
                    <Badge bg={getTypeColor(challenge.type)} className="mb-1">
                      {challenge.type}
                    </Badge>
                    <div className="small text-muted">
                      {getTimeRemaining(challenge.expiresAt)}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1 me-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Progress</small>
                      <small className="text-muted">
                        {challenge.progress}/{challenge.maxProgress}
                      </small>
                    </div>
                    <ProgressBar 
                      now={(challenge.progress / challenge.maxProgress) * 100}
                      variant="primary"
                      size="sm"
                    />
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-primary">
                      {challenge.points} pts
                    </div>
                    <Badge bg={getCategoryColor(challenge.category)} size="sm">
                      {challenge.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}

            {completedChallenges.length > 0 && (
              <div className="mt-4">
                <h6 className="text-success mb-3">
                  <i className="bi bi-check-circle me-1"></i>
                  Completed Challenges
                </h6>
                {completedChallenges.map((challenge) => (
                  <div 
                    key={challenge.id} 
                    className="challenge-item completed border rounded p-3 mb-2 cursor-pointer opacity-75"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 text-success">
                          <i className="bi bi-check-circle me-1"></i>
                          {challenge.title}
                        </h6>
                        <p className="text-muted small mb-0">{challenge.description}</p>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">
                          +{challenge.points} pts
                        </div>
                        <Badge bg={getCategoryColor(challenge.category)} size="sm">
                          {challenge.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredChallenges.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="bi bi-flag display-4"></i>
                <p className="mt-2">No challenges available for this filter.</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Challenge Detail Modal */}
      <Modal show={!!selectedChallenge} onHide={() => setSelectedChallenge(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi bi-flag me-2 text-${getTypeColor(selectedChallenge?.type || 'daily')}`}></i>
            {selectedChallenge?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <p className="lead">{selectedChallenge?.description}</p>
            
            <Row className="mb-3">
              <Col md={6}>
                <div className="d-flex justify-content-between mb-1">
                  <small>Progress</small>
                  <small>
                    {selectedChallenge?.progress}/{selectedChallenge?.maxProgress}
                  </small>
                </div>
                <ProgressBar 
                  now={selectedChallenge ? (selectedChallenge.progress / selectedChallenge.maxProgress) * 100 : 0}
                  variant="primary"
                  className="mb-2"
                />
              </Col>
              <Col md={6}>
                <div className="text-end">
                  <div className="fw-bold text-primary fs-4">
                    {selectedChallenge?.points} points
                  </div>
                  <div className="small text-muted">Reward</div>
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg={getTypeColor(selectedChallenge?.type || 'daily')} className="me-2">
                    {selectedChallenge?.type}
                  </Badge>
                  <Badge bg={getCategoryColor(selectedChallenge?.category || 'academic')}>
                    {selectedChallenge?.category}
                  </Badge>
                </div>
              </Col>
              <Col md={6} className="text-end">
                <div className="small text-muted">
                  <i className="bi bi-clock me-1"></i>
                  Expires: {selectedChallenge?.expiresAt ? new Date(selectedChallenge.expiresAt).toLocaleDateString() : 'N/A'}
                </div>
                <div className="small text-muted">
                  Time remaining: {selectedChallenge?.expiresAt ? getTimeRemaining(selectedChallenge.expiresAt) : 'N/A'}
                </div>
              </Col>
            </Row>

            {selectedChallenge?.rewards && selectedChallenge.rewards.length > 0 && (
              <div className="mt-4">
                <h6>Rewards</h6>
                <Row>
                  {selectedChallenge.rewards.map((reward) => (
                    <Col key={reward.id} md={6}>
                      <div className="border rounded p-2 mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-bold">{reward.name}</div>
                            <div className="small text-muted">{reward.description}</div>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold text-success">{reward.value}</div>
                            <Badge bg={reward.isRedeemed ? 'secondary' : 'success'} size="sm">
                              {reward.isRedeemed ? 'Redeemed' : 'Available'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedChallenge(null)}>
            Close
          </Button>
          {selectedChallenge && !selectedChallenge.isCompleted && (
            <Button variant="primary">
              <i className="bi bi-play me-1"></i>
              Start Challenge
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Challenges;
