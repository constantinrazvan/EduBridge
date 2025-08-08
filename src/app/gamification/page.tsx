'use client';

import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import PointsSystem from '@/components/gamification/PointsSystem';
import BadgesAchievements from '@/components/gamification/BadgesAchievements';
import Leaderboards from '@/components/gamification/Leaderboards';
import Challenges from '@/components/gamification/Challenges';
import RewardsStore from '@/components/gamification/RewardsStore';
import ProgressTracking from '@/components/gamification/ProgressTracking';
import { UserGamification } from '@/types';

// Mock data for gamification
const mockGamificationData: UserGamification = {
  stats: {
    totalPoints: 15420,
    level: 12,
    experience: 8420,
    experienceToNextLevel: 1580,
    streak: 15,
    achievementsCount: 8,
    badgesCount: 12,
    challengesCompleted: 5,
    rank: 3,
    totalUsers: 1250
  },
  achievements: [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first course",
      category: "academic",
      icon: "bi-mortarboard",
      points: 100,
      isUnlocked: true,
      unlockedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Social Butterfly",
      description: "Connect with 10 other students",
      category: "social",
      icon: "bi-people",
      points: 150,
      isUnlocked: true,
      unlockedAt: "2024-01-20T14:15:00Z"
    },
    {
      id: 3,
      name: "Career Explorer",
      description: "Apply to 5 job opportunities",
      category: "career",
      icon: "bi-briefcase",
      points: 200,
      isUnlocked: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: 4,
      name: "Skill Master",
      description: "Earn 5 skill certifications",
      category: "skills",
      icon: "bi-gear",
      points: 300,
      isUnlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 5,
      name: "Mentor Leader",
      description: "Help 5 other students",
      category: "leadership",
      icon: "bi-star",
      points: 250,
      isUnlocked: true,
      unlockedAt: "2024-02-01T09:45:00Z"
    }
  ],
  badges: [
    {
      id: 1,
      name: "Early Bird",
      description: "Login for 7 consecutive days",
      category: "social",
      icon: "bi-sunrise",
      rarity: "common",
      isUnlocked: true,
      unlockedAt: "2024-01-22T08:00:00Z"
    },
    {
      id: 2,
      name: "Knowledge Seeker",
      description: "Complete 10 courses",
      category: "academic",
      icon: "bi-book",
      rarity: "rare",
      isUnlocked: true,
      unlockedAt: "2024-02-05T16:20:00Z"
    },
    {
      id: 3,
      name: "Network Builder",
      description: "Connect with 50 people",
      category: "social",
      icon: "bi-diagram-3",
      rarity: "epic",
      isUnlocked: false,
      progress: 35,
      maxProgress: 50
    },
    {
      id: 4,
      name: "Interview Pro",
      description: "Complete 10 job interviews",
      category: "career",
      icon: "bi-camera-video",
      rarity: "legendary",
      isUnlocked: false,
      progress: 7,
      maxProgress: 10
    }
  ],
  challenges: [
    {
      id: 1,
      title: "Daily Learning",
      description: "Complete 2 lessons today",
      type: "daily",
      category: "academic",
      points: 50,
      isCompleted: false,
      progress: 1,
      maxProgress: 2,
      expiresAt: "2024-02-15T23:59:59Z",
      rewards: [
        {
          id: 1,
          name: "Learning Streak Bonus",
          description: "Extra points for consistency",
          type: "virtual",
          value: 25,
          isRedeemed: false
        }
      ]
    },
    {
      id: 2,
      title: "Weekly Networking",
      description: "Attend 3 networking events this week",
      type: "weekly",
      category: "social",
      points: 150,
      isCompleted: false,
      progress: 2,
      maxProgress: 3,
      expiresAt: "2024-02-18T23:59:59Z",
      rewards: [
        {
          id: 2,
          name: "Professional Network Badge",
          description: "Special badge for networking",
          type: "virtual",
          value: 100,
          isRedeemed: false
        }
      ]
    },
    {
      id: 3,
      title: "Monthly Skill Focus",
      description: "Master a new skill this month",
      type: "monthly",
      category: "skills",
      points: 500,
      isCompleted: true,
      progress: 1,
      maxProgress: 1,
      expiresAt: "2024-02-29T23:59:59Z",
      rewards: [
        {
          id: 3,
          name: "Skill Certification",
          description: "Official certification",
          type: "educational",
          value: 200,
          isRedeemed: true,
          redeemedAt: "2024-02-10T12:00:00Z"
        }
      ]
    }
  ],
  rewards: [
    {
      id: 1,
      name: "Profile Customization",
      description: "Unlock premium profile themes",
      type: "virtual",
      value: 500,
      isRedeemed: false
    },
    {
      id: 2,
      name: "Free Course Voucher",
      description: "Sponsored by TechCorp",
      type: "educational",
      value: 1000,
      isRedeemed: false,
      sponsor: "TechCorp"
    },
    {
      id: 3,
      name: "Priority Application",
      description: "Get priority in job applications",
      type: "career",
      value: 2000,
      isRedeemed: false
    },
    {
      id: 4,
      name: "Featured Profile",
      description: "Get featured on the platform",
      type: "social",
      value: 1500,
      isRedeemed: true,
      redeemedAt: "2024-01-25T10:30:00Z"
    }
  ],
  leaderboards: [
    {
      id: 1,
      userId: 1,
      username: "Alex Johnson",
      avatar: "https://via.placeholder.com/40",
      points: 15420,
      rank: 3,
      category: "overall"
    },
    {
      id: 2,
      userId: 2,
      username: "Sarah Chen",
      avatar: "https://via.placeholder.com/40",
      points: 18250,
      rank: 1,
      category: "overall"
    },
    {
      id: 3,
      userId: 3,
      username: "Mike Rodriguez",
      avatar: "https://via.placeholder.com/40",
      points: 16980,
      rank: 2,
      category: "overall"
    },
    {
      id: 4,
      userId: 4,
      username: "Emma Wilson",
      avatar: "https://via.placeholder.com/40",
      points: 14200,
      rank: 4,
      category: "overall"
    },
    {
      id: 5,
      userId: 5,
      username: "David Kim",
      avatar: "https://via.placeholder.com/40",
      points: 13850,
      rank: 5,
      category: "overall"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "achievement",
      title: "Mentor Leader Unlocked",
      description: "Helped 5 other students",
      points: 250,
      timestamp: "2024-02-01T09:45:00Z"
    },
    {
      id: 2,
      type: "badge",
      title: "Knowledge Seeker Badge",
      description: "Completed 10 courses",
      points: 100,
      timestamp: "2024-02-05T16:20:00Z"
    },
    {
      id: 3,
      type: "challenge",
      title: "Monthly Skill Focus Completed",
      description: "Mastered a new skill",
      points: 500,
      timestamp: "2024-02-10T12:00:00Z"
    },
    {
      id: 4,
      type: "reward",
      title: "Featured Profile Redeemed",
      description: "Profile featured on platform",
      points: -1500,
      timestamp: "2024-01-25T10:30:00Z"
    },
    {
      id: 5,
      type: "streak",
      title: "15 Day Streak",
      description: "Maintained daily activity",
      points: 150,
      timestamp: "2024-02-14T08:00:00Z"
    }
  ]
};

const GamificationPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Access Required</Alert.Heading>
          <p>Please log in to access the gamification system.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="text-center mb-3">
          <i className="bi bi-trophy text-warning me-3"></i>
          Gamification Hub
        </h2>
        <p className="text-center text-muted">
          Track your progress, earn rewards, and compete with others in your educational journey
        </p>
      </div>

      <Row className="g-4">
        {/* Points System */}
        <Col lg={4} md={6}>
          <PointsSystem stats={mockGamificationData.stats} />
        </Col>

        {/* Badges & Achievements */}
        <Col lg={4} md={6}>
          <BadgesAchievements 
            badges={mockGamificationData.badges}
            achievements={mockGamificationData.achievements}
          />
        </Col>

        {/* Leaderboards */}
        <Col lg={4} md={6}>
          <Leaderboards leaderboards={mockGamificationData.leaderboards} />
        </Col>

        {/* Challenges */}
        <Col lg={6} md={6}>
          <Challenges challenges={mockGamificationData.challenges} />
        </Col>

        {/* Rewards Store */}
        <Col lg={6} md={6}>
          <RewardsStore 
            rewards={mockGamificationData.rewards}
            userPoints={mockGamificationData.stats.totalPoints}
          />
        </Col>

        {/* Progress Tracking */}
        <Col lg={12}>
          <ProgressTracking gamification={mockGamificationData} />
        </Col>
      </Row>

      {/* Gamification Tips */}
      <Row className="mt-5">
        <Col>
          <Alert variant="info" className="text-center">
            <Alert.Heading>
              <i className="bi bi-lightbulb me-2"></i>
              Gamification Tips
            </Alert.Heading>
            <div className="row text-start">
              <div className="col-md-4">
                <h6>Daily Engagement</h6>
                <p className="small">Log in daily to maintain your streak and earn bonus points!</p>
              </div>
              <div className="col-md-4">
                <h6>Complete Challenges</h6>
                <p className="small">Take on daily and weekly challenges for extra rewards and experience.</p>
              </div>
              <div className="col-md-4">
                <h6>Social Interaction</h6>
                <p className="small">Help others and participate in community activities to earn social badges.</p>
              </div>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default GamificationPage;
