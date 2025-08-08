'use client';

import React, { useState } from 'react';
import { Card, CardBody, Badge, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { LeaderboardEntry } from '@/types';

interface LeaderboardsProps {
  leaderboards: LeaderboardEntry[];
}

const Leaderboards: React.FC<LeaderboardsProps> = ({ leaderboards }) => {
  const [activeCategory, setActiveCategory] = useState<'overall' | 'academic' | 'social' | 'career' | 'skills' | 'leadership'>('overall');

  const categories = [
    { key: 'overall', name: 'Overall', icon: 'bi-trophy' },
    { key: 'academic', name: 'Academic', icon: 'bi-mortarboard' },
    { key: 'social', name: 'Social', icon: 'bi-people' },
    { key: 'career', name: 'Career', icon: 'bi-briefcase' },
    { key: 'skills', name: 'Skills', icon: 'bi-gear' },
    { key: 'leadership', name: 'Leadership', icon: 'bi-star' }
  ] as const;

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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return 'bi-trophy-fill text-warning';
    if (rank === 2) return 'bi-award-fill text-secondary';
    if (rank === 3) return 'bi-award-fill text-bronze';
    return 'bi-hash';
  };

  const filteredLeaderboard = leaderboards.filter(entry => entry.category === activeCategory);

  return (
    <Card className="h-100 shadow-sm">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-trophy me-2"></i>
            Leaderboards
          </h5>
        </div>

        <div className="mb-3">
          <div className="btn-group btn-group-sm w-100">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className="flex-fill"
              >
                <i className={`${category.icon} me-1`}></i>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="leaderboard-container">
          {filteredLeaderboard.slice(0, 10).map((entry, index) => (
            <div 
              key={entry.id} 
              className={`leaderboard-entry d-flex align-items-center p-2 rounded mb-2 ${
                index < 3 ? 'top-rank' : ''
              }`}
            >
              <div className="rank-position me-3 text-center" style={{ width: '40px' }}>
                <i className={`bi ${getRankIcon(entry.rank)} fs-5`}></i>
                <div className="small text-muted">#{entry.rank}</div>
              </div>

              <div className="user-avatar me-3">
                <img 
                  src={entry.avatar} 
                  alt={entry.username}
                  className="rounded-circle"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </div>

              <div className="user-info flex-grow-1">
                <div className="fw-bold">{entry.username}</div>
                <div className="small text-muted">
                  <Badge bg={getCategoryColor(entry.category)} className="fs-6">
                    {entry.category}
                  </Badge>
                </div>
              </div>

              <div className="points text-end">
                <div className="fw-bold text-primary">
                  {entry.points.toLocaleString()}
                </div>
                <div className="small text-muted">points</div>
              </div>
            </div>
          ))}
        </div>

        {filteredLeaderboard.length === 0 && (
          <div className="text-center text-muted py-4">
            <i className="bi bi-trophy display-4"></i>
            <p className="mt-2">No leaderboard data available for this category.</p>
          </div>
        )}

        <div className="mt-3 pt-3 border-top">
          <div className="row text-center">
            <div className="col">
              <div className="text-muted small">Your Rank</div>
              <div className="fw-bold text-primary">
                #{filteredLeaderboard.find(e => e.userId === 1)?.rank || 'N/A'}
              </div>
            </div>
            <div className="col">
              <div className="text-muted small">Total Players</div>
              <div className="fw-bold">{filteredLeaderboard.length}</div>
            </div>
            <div className="col">
              <div className="text-muted small">Top Score</div>
              <div className="fw-bold text-success">
                {filteredLeaderboard[0]?.points.toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Leaderboards;
