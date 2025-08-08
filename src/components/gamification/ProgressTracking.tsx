'use client';

import React, { useState } from 'react';
import { Card, CardBody, Badge, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import { UserGamification } from '@/types';

interface ProgressTrackingProps {
  gamification: UserGamification;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ gamification }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'activity' | 'trends'>('stats');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement': return 'bi-award';
      case 'badge': return 'bi-star';
      case 'challenge': return 'bi-flag';
      case 'reward': return 'bi-gift';
      case 'streak': return 'bi-fire';
      default: return 'bi-circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'success';
      case 'badge': return 'info';
      case 'challenge': return 'warning';
      case 'reward': return 'primary';
      case 'streak': return 'danger';
      default: return 'secondary';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="h-100 shadow-sm">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-graph-up me-2"></i>
            Progress Tracking
          </h5>
          <div className="btn-group btn-group-sm">
            <button
              className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </button>
            <button
              className={`btn ${activeTab === 'activity' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
            <button
              className={`btn ${activeTab === 'trends' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </button>
          </div>
        </div>

        {activeTab === 'stats' && (
          <div>
            <Row className="mb-4">
              <Col md={6}>
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold text-primary fs-4">
                    {gamification.stats.level}
                  </div>
                  <div className="text-muted small">Current Level</div>
                </div>
              </Col>
              <Col md={6}>
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold text-success fs-4">
                    {gamification.stats.streak}
                  </div>
                  <div className="text-muted small">Day Streak</div>
                </div>
              </Col>
            </Row>

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <small>Experience Progress</small>
                <small>
                  {gamification.stats.experience.toLocaleString()} / {(gamification.stats.experience + gamification.stats.experienceToNextLevel).toLocaleString()}
                </small>
              </div>
              <ProgressBar 
                now={(gamification.stats.experience / (gamification.stats.experience + gamification.stats.experienceToNextLevel)) * 100}
                variant="primary"
                className="mb-3"
              />
            </div>

            <Row className="mb-3">
              <Col md={4}>
                <div className="text-center">
                  <div className="fw-bold text-success">{gamification.stats.achievementsCount}</div>
                  <div className="small text-muted">Achievements</div>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <div className="fw-bold text-info">{gamification.stats.badgesCount}</div>
                  <div className="small text-muted">Badges</div>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <div className="fw-bold text-warning">{gamification.stats.challengesCompleted}</div>
                  <div className="small text-muted">Challenges</div>
                </div>
              </Col>
            </Row>

            <div className="border rounded p-3">
              <h6 className="mb-2">Ranking</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">#{gamification.stats.rank}</div>
                  <div className="small text-muted">Your Position</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">{gamification.stats.totalUsers}</div>
                  <div className="small text-muted">Total Users</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h6 className="mb-3">Recent Activity</h6>
            <ListGroup>
              {gamification.recentActivity.slice(0, 10).map((activity) => (
                <ListGroup.Item key={activity.id} className="d-flex align-items-center">
                  <div className="me-3">
                    <i className={`bi ${getActivityIcon(activity.type)} text-${getActivityColor(activity.type)} fs-5`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold">{activity.title}</div>
                    <div className="small text-muted">{activity.description}</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-primary">+{activity.points}</div>
                    <div className="small text-muted">{formatTimestamp(activity.timestamp)}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {gamification.recentActivity.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="bi bi-activity display-4"></i>
                <p className="mt-2">No recent activity to display.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <h6 className="mb-3">Performance Trends</h6>
            
            <div className="mb-4">
              <h6 className="text-primary">Points Growth</h6>
              <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="fw-bold">{gamification.stats.totalPoints.toLocaleString()}</div>
                    <div className="small text-muted">Total Points</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-success">+15%</div>
                    <div className="small text-muted">This Week</div>
                  </div>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            <Row className="mb-3">
              <Col md={6}>
                <div className="border rounded p-3">
                  <h6 className="text-success">Achievement Rate</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold">{Math.round((gamification.stats.achievementsCount / 20) * 100)}%</div>
                      <div className="small text-muted">Completion</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">{gamification.stats.achievementsCount}/20</div>
                      <div className="small text-muted">Achievements</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="border rounded p-3">
                  <h6 className="text-info">Badge Collection</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold">{Math.round((gamification.stats.badgesCount / 50) * 100)}%</div>
                      <div className="small text-muted">Collection</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">{gamification.stats.badgesCount}/50</div>
                      <div className="small text-muted">Badges</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="border rounded p-3">
              <h6 className="text-warning">Streak Analysis</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{gamification.stats.streak} days</div>
                  <div className="small text-muted">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-danger">30 days</div>
                  <div className="small text-muted">Best Streak</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-success">+5 days</div>
                  <div className="small text-muted">This Week</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ProgressTracking;
