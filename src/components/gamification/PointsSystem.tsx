'use client';

import React from 'react';
import { Card, CardBody, ProgressBar, Badge, Row, Col } from 'react-bootstrap';
import { GamificationStats } from '@/types';

interface PointsSystemProps {
  stats: GamificationStats;
}

const PointsSystem: React.FC<PointsSystemProps> = ({ stats }) => {
  const getLevelColor = (level: number) => {
    if (level >= 50) return 'danger';
    if (level >= 30) return 'warning';
    if (level >= 15) return 'info';
    return 'success';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'danger';
    if (streak >= 15) return 'warning';
    if (streak >= 7) return 'info';
    return 'success';
  };

  return (
    <Card className="h-100 shadow-sm">
      <CardBody className="text-center">
        <div className="mb-3">
          <h4 className="text-primary mb-2">
            <i className="bi bi-star-fill me-2"></i>
            {stats.totalPoints.toLocaleString()} Points
          </h4>
          <Badge bg={getLevelColor(stats.level)} className="fs-6">
            Level {stats.level}
          </Badge>
        </div>

        <Row className="mb-3">
          <Col>
            <div className="text-muted small">Experience</div>
            <div className="fw-bold">{stats.experience.toLocaleString()}</div>
          </Col>
          <Col>
            <div className="text-muted small">To Next Level</div>
            <div className="fw-bold">{stats.experienceToNextLevel.toLocaleString()}</div>
          </Col>
        </Row>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">Progress to Level {stats.level + 1}</small>
            <small className="text-muted">
              {Math.round((stats.experience / (stats.experience + stats.experienceToNextLevel)) * 100)}%
            </small>
          </div>
          <ProgressBar 
            now={(stats.experience / (stats.experience + stats.experienceToNextLevel)) * 100}
            variant="primary"
            className="mb-2"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Badge bg={getStreakColor(stats.streak)} className="me-2">
              <i className="bi bi-fire me-1"></i>
              {stats.streak} Day Streak
            </Badge>
          </div>
          <div className="text-end">
            <div className="text-muted small">Rank</div>
            <div className="fw-bold">#{stats.rank} of {stats.totalUsers}</div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-top">
          <Row>
            <Col>
              <div className="text-muted small">Achievements</div>
              <div className="fw-bold text-success">{stats.achievementsCount}</div>
            </Col>
            <Col>
              <div className="text-muted small">Badges</div>
              <div className="fw-bold text-info">{stats.badgesCount}</div>
            </Col>
            <Col>
              <div className="text-muted small">Challenges</div>
              <div className="fw-bold text-warning">{stats.challengesCompleted}</div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default PointsSystem;
