'use client';

import React, { useState } from 'react';
import { Card, CardBody, Badge, Row, Col, Modal, Button, ProgressBar } from 'react-bootstrap';
import { Badge as BadgeType, Achievement } from '@/types';

interface BadgesAchievementsProps {
  badges: BadgeType[];
  achievements: Achievement[];
}

const BadgesAchievements: React.FC<BadgesAchievementsProps> = ({ badges, achievements }) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState<'badges' | 'achievements'>('badges');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'danger';
      case 'epic': return 'purple';
      case 'rare': return 'info';
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

  const unlockedBadges = badges.filter(b => b.isUnlocked);
  const lockedBadges = badges.filter(b => !b.isUnlocked);
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <i className="bi bi-award me-2"></i>
              Badges & Achievements
            </h5>
            <div className="btn-group btn-group-sm">
              <Button
                variant={activeTab === 'badges' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setActiveTab('badges')}
              >
                Badges ({badges.length})
              </Button>
              <Button
                variant={activeTab === 'achievements' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setActiveTab('achievements')}
              >
                Achievements ({achievements.length})
              </Button>
            </div>
          </div>

          {activeTab === 'badges' && (
            <div>
              <div className="mb-3">
                <h6 className="text-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Unlocked ({unlockedBadges.length})
                </h6>
                <Row className="g-2">
                  {unlockedBadges.slice(0, 6).map((badge) => (
                    <Col key={badge.id} xs={4} sm={3} md={2}>
                      <div 
                        className="badge-item unlocked text-center p-2 rounded cursor-pointer"
                        onClick={() => setSelectedBadge(badge)}
                      >
                        <div className="badge-icon mb-1">
                          <i className={`bi ${badge.icon} fs-4 text-${getRarityColor(badge.rarity)}`}></i>
                        </div>
                        <div className="badge-name small fw-bold">{badge.name}</div>
                        <Badge bg={getRarityColor(badge.rarity)} size="sm">{badge.rarity}</Badge>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <div>
                <h6 className="text-muted">
                  <i className="bi bi-lock me-1"></i>
                  Locked ({lockedBadges.length})
                </h6>
                <Row className="g-2">
                  {lockedBadges.slice(0, 6).map((badge) => (
                    <Col key={badge.id} xs={4} sm={3} md={2}>
                      <div 
                        className="badge-item locked text-center p-2 rounded cursor-pointer"
                        onClick={() => setSelectedBadge(badge)}
                      >
                        <div className="badge-icon mb-1 opacity-50">
                          <i className={`bi ${badge.icon} fs-4 text-muted`}></i>
                        </div>
                        <div className="badge-name small text-muted">{badge.name}</div>
                        {badge.progress !== undefined && (
                          <ProgressBar 
                            now={(badge.progress / (badge.maxProgress || 1)) * 100} 
                            size="sm"
                            className="mt-1"
                          />
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <div className="mb-3">
                <h6 className="text-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Unlocked ({unlockedAchievements.length})
                </h6>
                <Row className="g-2">
                  {unlockedAchievements.slice(0, 6).map((achievement) => (
                    <Col key={achievement.id} xs={4} sm={3} md={2}>
                      <div 
                        className="achievement-item unlocked text-center p-2 rounded cursor-pointer"
                        onClick={() => setSelectedAchievement(achievement)}
                      >
                        <div className="achievement-icon mb-1">
                          <i className={`bi ${achievement.icon} fs-4 text-${getCategoryColor(achievement.category)}`}></i>
                        </div>
                        <div className="achievement-name small fw-bold">{achievement.name}</div>
                        <Badge bg={getCategoryColor(achievement.category)} size="sm">{achievement.points} pts</Badge>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <div>
                <h6 className="text-muted">
                  <i className="bi bi-lock me-1"></i>
                  Locked ({lockedAchievements.length})
                </h6>
                <Row className="g-2">
                  {lockedAchievements.slice(0, 6).map((achievement) => (
                    <Col key={achievement.id} xs={4} sm={3} md={2}>
                      <div 
                        className="achievement-item locked text-center p-2 rounded cursor-pointer"
                        onClick={() => setSelectedAchievement(achievement)}
                      >
                        <div className="achievement-icon mb-1 opacity-50">
                          <i className={`bi ${achievement.icon} fs-4 text-muted`}></i>
                        </div>
                        <div className="achievement-name small text-muted">{achievement.name}</div>
                        {achievement.progress !== undefined && (
                          <ProgressBar 
                            now={(achievement.progress / (achievement.maxProgress || 1)) * 100} 
                            size="sm"
                            className="mt-1"
                          />
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Badge Detail Modal */}
      <Modal show={!!selectedBadge} onHide={() => setSelectedBadge(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${selectedBadge?.icon} me-2 text-${getRarityColor(selectedBadge?.rarity || 'common')}`}></i>
            {selectedBadge?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <div className={`badge-icon-large mb-3 ${selectedBadge?.isUnlocked ? 'unlocked' : 'locked'}`}>
              <i className={`bi ${selectedBadge?.icon} display-1 ${selectedBadge?.isUnlocked ? `text-${getRarityColor(selectedBadge?.rarity || 'common')}` : 'text-muted'}`}></i>
            </div>
            <h5>{selectedBadge?.name}</h5>
            <p className="text-muted">{selectedBadge?.description}</p>
            <div className="d-flex justify-content-center gap-2">
              <Badge bg={getRarityColor(selectedBadge?.rarity || 'common')}>
                {selectedBadge?.rarity}
              </Badge>
              <Badge bg={getCategoryColor(selectedBadge?.category || 'academic')}>
                {selectedBadge?.category}
              </Badge>
            </div>
            {selectedBadge?.unlockedAt && (
              <div className="mt-3 text-muted small">
                Unlocked on {new Date(selectedBadge.unlockedAt).toLocaleDateString()}
              </div>
            )}
            {selectedBadge?.progress !== undefined && !selectedBadge.isUnlocked && (
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Progress</small>
                  <small>{selectedBadge.progress}/{selectedBadge.maxProgress}</small>
                </div>
                <ProgressBar 
                  now={(selectedBadge.progress / (selectedBadge.maxProgress || 1)) * 100}
                  variant="primary"
                />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* Achievement Detail Modal */}
      <Modal show={!!selectedAchievement} onHide={() => setSelectedAchievement(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${selectedAchievement?.icon} me-2 text-${getCategoryColor(selectedAchievement?.category || 'academic')}`}></i>
            {selectedAchievement?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <div className={`achievement-icon-large mb-3 ${selectedAchievement?.isUnlocked ? 'unlocked' : 'locked'}`}>
              <i className={`bi ${selectedAchievement?.icon} display-1 ${selectedAchievement?.isUnlocked ? `text-${getCategoryColor(selectedAchievement?.category || 'academic')}` : 'text-muted'}`}></i>
            </div>
            <h5>{selectedAchievement?.name}</h5>
            <p className="text-muted">{selectedAchievement?.description}</p>
            <div className="d-flex justify-content-center gap-2">
              <Badge bg={getCategoryColor(selectedAchievement?.category || 'academic')}>
                {selectedAchievement?.category}
              </Badge>
              <Badge bg="success">
                {selectedAchievement?.points} points
              </Badge>
            </div>
            {selectedAchievement?.unlockedAt && (
              <div className="mt-3 text-muted small">
                Unlocked on {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
            {selectedAchievement?.progress !== undefined && !selectedAchievement.isUnlocked && (
              <div className="mt-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Progress</small>
                  <small>{selectedAchievement.progress}/{selectedAchievement.maxProgress}</small>
                </div>
                <ProgressBar 
                  now={(selectedAchievement.progress / (selectedAchievement.maxProgress || 1)) * 100}
                  variant="primary"
                />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BadgesAchievements;
