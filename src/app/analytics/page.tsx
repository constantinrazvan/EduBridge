'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import StudentAnalyticsComponent from '../../components/analytics/StudentAnalytics';
import ParentAnalyticsComponent from '../../components/analytics/ParentAnalytics';
import InstitutionAnalyticsComponent from '../../components/analytics/InstitutionAnalytics';
import CompanyAnalyticsComponent from '../../components/analytics/CompanyAnalytics';
import PlatformAnalyticsComponent from '../../components/analytics/PlatformAnalytics';
import { 
  StudentAnalytics, 
  ParentAnalytics, 
  InstitutionAnalytics, 
  CompanyAnalytics, 
  PlatformAnalytics 
} from '../../types';

// Mock data for analytics
const mockStudentAnalytics: StudentAnalytics = {
  learningVelocity: {
    id: 'learning_velocity',
    name: 'Learning Velocity',
    value: 85,
    unit: '%',
    change: 12,
    changeType: 'increase',
    trend: 'up',
    period: 'monthly'
  },
  completionRates: {
    id: 'completion_rates',
    name: 'Completion Rates',
    value: 92,
    unit: '%',
    change: 8,
    changeType: 'increase',
    trend: 'up',
    period: 'monthly'
  },
  skillGapAnalysis: {
    currentSkills: [
      { skill: 'JavaScript', level: 75 },
      { skill: 'React', level: 60 },
      { skill: 'Python', level: 45 },
      { skill: 'Data Analysis', level: 30 }
    ],
    marketDemand: [
      { skill: 'JavaScript', demand: 85 },
      { skill: 'React', demand: 90 },
      { skill: 'Python', demand: 95 },
      { skill: 'Data Analysis', demand: 88 }
    ],
    gaps: [
      { skill: 'Python', gap: 50 },
      { skill: 'Data Analysis', gap: 58 },
      { skill: 'React', gap: 30 }
    ]
  },
  careerRecommendations: {
    paths: [
      { title: 'Frontend Developer', probability: 0.85, skills: ['JavaScript', 'React', 'HTML', 'CSS'] },
      { title: 'Data Scientist', probability: 0.65, skills: ['Python', 'Data Analysis', 'Machine Learning'] },
      { title: 'Full Stack Developer', probability: 0.75, skills: ['JavaScript', 'Python', 'React', 'Node.js'] }
    ],
    nextSteps: [
      'Complete Python fundamentals course',
      'Build a data analysis project',
      'Practice React advanced concepts'
    ]
  },
  engagementTrends: {
    timeSpent: {
      id: 'time_spent',
      name: 'Time Spent',
      value: 45,
      unit: 'hrs',
      change: 15,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    activeDays: {
      id: 'active_days',
      name: 'Active Days',
      value: 18,
      unit: 'days',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    courseParticipation: {
      id: 'course_participation',
      name: 'Course Participation',
      value: 78,
      unit: '%',
      change: 10,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  }
};

const mockParentAnalytics: ParentAnalytics = {
  childProgress: {
    overall: {
      id: 'overall_progress',
      name: 'Overall Progress',
      value: 87,
      unit: '%',
      change: 12,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    bySubject: [
      { subject: 'Mathematics', progress: 92 },
      { subject: 'Science', progress: 85 },
      { subject: 'English', progress: 78 },
      { subject: 'History', progress: 88 }
    ],
    vsPeers: [
      { metric: 'Mathematics', child: 92, average: 85 },
      { metric: 'Science', child: 85, average: 82 },
      { metric: 'English', child: 78, average: 80 }
    ]
  },
  careerProbability: {
    careers: [
      { title: 'Software Engineer', probability: 0.75, factors: ['Strong math skills', 'Problem solving', 'Technology interest'] },
      { title: 'Data Scientist', probability: 0.65, factors: ['Analytical thinking', 'Science background', 'Curiosity'] },
      { title: 'Business Analyst', probability: 0.55, factors: ['Communication skills', 'Logical thinking', 'Organization'] }
    ],
    recommendations: [
      'Encourage participation in coding clubs',
      'Support science fair projects',
      'Develop communication skills through debate'
    ]
  },
  financialProjections: {
    educationCosts: [
      { year: 2024, cost: 15000 },
      { year: 2025, cost: 18000 },
      { year: 2026, cost: 22000 }
    ],
    scholarshipOpportunities: [
      { name: 'Academic Excellence', amount: 5000, probability: 0.8 },
      { name: 'STEM Scholarship', amount: 3000, probability: 0.6 },
      { name: 'Community Service', amount: 2000, probability: 0.7 }
    ],
    savingsNeeded: {
      id: 'savings_needed',
      name: 'Monthly Savings Needed',
      value: 1200,
      unit: '$',
      change: 15,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  },
  interventionRecommendations: {
    alerts: [
      { type: 'Academic', message: 'English grades below class average', priority: 'medium' },
      { type: 'Attendance', message: 'Missed 3 classes this month', priority: 'low' },
      { type: 'Engagement', message: 'Participation in group activities declining', priority: 'medium' }
    ],
    actions: [
      'Schedule meeting with English teacher',
      'Encourage reading at home',
      'Support group project participation'
    ]
  }
};

const mockInstitutionAnalytics: InstitutionAnalytics = {
  studentRetention: {
    overall: {
      id: 'retention_rate',
      name: 'Student Retention',
      value: 94,
      unit: '%',
      change: 2,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    byDepartment: [
      { department: 'Computer Science', rate: 96 },
      { department: 'Engineering', rate: 92 },
      { department: 'Business', rate: 89 },
      { department: 'Arts', rate: 91 }
    ],
    riskFactors: [
      { factor: 'Low attendance', impact: 25 },
      { factor: 'Poor academic performance', impact: 30 },
      { factor: 'Financial difficulties', impact: 15 }
    ]
  },
  graduationRates: {
    overall: {
      id: 'graduation_rate',
      name: 'Graduation Rate',
      value: 88,
      unit: '%',
      change: 3,
      changeType: 'increase',
      trend: 'up',
      period: 'yearly'
    },
    byProgram: [
      { program: 'Computer Science', rate: 92 },
      { program: 'Engineering', rate: 85 },
      { program: 'Business', rate: 88 },
      { program: 'Arts', rate: 90 }
    ],
    trends: [
      { year: 2020, rate: 85 },
      { year: 2021, rate: 86 },
      { year: 2022, rate: 87 },
      { year: 2023, rate: 88 }
    ]
  },
  partnershipEffectiveness: {
    totalPartnerships: {
      id: 'total_partnerships',
      name: 'Total Partnerships',
      value: 45,
      unit: '',
      change: 8,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    activePartnerships: {
      id: 'active_partnerships',
      name: 'Active Partnerships',
      value: 38,
      unit: '',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    studentPlacements: {
      id: 'student_placements',
      name: 'Student Placements',
      value: 156,
      unit: '',
      change: 12,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    roi: {
      id: 'partnership_roi',
      name: 'Partnership ROI',
      value: 320,
      unit: '%',
      change: 15,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  },
  teacherPerformance: {
    averageRating: {
      id: 'avg_rating',
      name: 'Average Rating',
      value: 4.2,
      unit: '/5',
      change: 0.1,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    studentSatisfaction: {
      id: 'satisfaction',
      name: 'Student Satisfaction',
      value: 87,
      unit: '%',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    courseCompletion: {
      id: 'completion_rate',
      name: 'Course Completion',
      value: 92,
      unit: '%',
      change: 3,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    byTeacher: [
      { name: 'Dr. Smith', metrics: { rating: 4.5, satisfaction: 92, completion: 95 } },
      { name: 'Prof. Johnson', metrics: { rating: 4.2, satisfaction: 88, completion: 90 } },
      { name: 'Dr. Williams', metrics: { rating: 4.0, satisfaction: 85, completion: 88 } }
    ]
  },
  resourceUtilization: {
    classroomUsage: {
      id: 'classroom_usage',
      name: 'Classroom Usage',
      value: 78,
      unit: '%',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    equipmentUtilization: {
      id: 'equipment_usage',
      name: 'Equipment Utilization',
      value: 65,
      unit: '%',
      change: 8,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    staffEfficiency: {
      id: 'staff_efficiency',
      name: 'Staff Efficiency',
      value: 82,
      unit: '%',
      change: 3,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  }
};

const mockCompanyAnalytics: CompanyAnalytics = {
  candidateQuality: {
    overallScore: {
      id: 'quality_score',
      name: 'Overall Quality Score',
      value: 7.8,
      unit: '/10',
      change: 0.5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    bySource: [
      { source: 'EduBridge', score: 8.2 },
      { source: 'LinkedIn', score: 7.5 },
      { source: 'Indeed', score: 6.8 },
      { source: 'Referrals', score: 8.0 }
    ],
    byPosition: [
      { position: 'Software Engineer', score: 8.5 },
      { position: 'Data Scientist', score: 7.8 },
      { position: 'Product Manager', score: 7.2 }
    ]
  },
  timeToHire: {
    average: {
      id: 'avg_time_to_hire',
      name: 'Average Time to Hire',
      value: 28,
      unit: 'days',
      change: -3,
      changeType: 'decrease',
      trend: 'down',
      period: 'monthly'
    },
    byPosition: [
      { position: 'Software Engineer', days: 25 },
      { position: 'Data Scientist', days: 32 },
      { position: 'Product Manager', days: 35 }
    ],
    bottlenecks: [
      { stage: 'Technical Interview', delay: 5 },
      { stage: 'Reference Check', delay: 3 },
      { stage: 'Offer Negotiation', delay: 2 }
    ]
  },
  conversionRates: {
    applicationToInterview: {
      id: 'app_to_interview',
      name: 'Application to Interview',
      value: 15,
      unit: '%',
      change: 2,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    interviewToOffer: {
      id: 'interview_to_offer',
      name: 'Interview to Offer',
      value: 25,
      unit: '%',
      change: 3,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    offerToAcceptance: {
      id: 'offer_to_acceptance',
      name: 'Offer to Acceptance',
      value: 85,
      unit: '%',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    bySource: [
      { source: 'EduBridge', rate: 20 },
      { source: 'LinkedIn', rate: 12 },
      { source: 'Indeed', rate: 8 },
      { source: 'Referrals', rate: 18 }
    ]
  },
  sourceEffectiveness: {
    topSources: [
      { source: 'EduBridge', effectiveness: 85 },
      { source: 'Referrals', effectiveness: 78 },
      { source: 'LinkedIn', effectiveness: 65 },
      { source: 'Indeed', effectiveness: 45 }
    ],
    costPerHire: [
      { source: 'EduBridge', cost: 2500 },
      { source: 'LinkedIn', cost: 3500 },
      { source: 'Indeed', cost: 2800 },
      { source: 'Referrals', cost: 1500 }
    ],
    qualityBySource: [
      { source: 'EduBridge', quality: 8.2 },
      { source: 'Referrals', quality: 8.0 },
      { source: 'LinkedIn', quality: 7.5 },
      { source: 'Indeed', quality: 6.8 }
    ]
  },
  diversityMetrics: {
    overallDiversity: {
      id: 'overall_diversity',
      name: 'Overall Diversity',
      value: 68,
      unit: '%',
      change: 5,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    byDepartment: [
      { department: 'Engineering', diversity: 65 },
      { department: 'Marketing', diversity: 75 },
      { department: 'Sales', diversity: 70 },
      { department: 'HR', diversity: 80 }
    ],
    byPosition: [
      { position: 'Software Engineer', diversity: 60 },
      { position: 'Data Scientist', diversity: 55 },
      { position: 'Product Manager', diversity: 70 }
    ],
    goals: [
      { metric: 'Gender Diversity', current: 65, target: 70 },
      { metric: 'Racial Diversity', current: 45, target: 50 },
      { metric: 'Age Diversity', current: 75, target: 80 }
    ]
  }
};

const mockPlatformAnalytics: PlatformAnalytics = {
  userEngagement: {
    activeUsers: {
      id: 'active_users',
      name: 'Active Users',
      value: 15420,
      unit: '',
      change: 12,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    sessionDuration: {
      id: 'session_duration',
      name: 'Session Duration',
      value: 25,
      unit: 'min',
      change: 8,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    featureUsage: [
      { feature: 'Learning Paths', usage: 85 },
      { feature: 'Opportunities', usage: 72 },
      { feature: 'Communication', usage: 68 },
      { feature: 'Gamification', usage: 78 }
    ]
  },
  systemPerformance: {
    responseTime: {
      id: 'response_time',
      name: 'Response Time',
      value: 245,
      unit: 'ms',
      change: -15,
      changeType: 'decrease',
      trend: 'down',
      period: 'monthly'
    },
    uptime: {
      id: 'uptime',
      name: 'Uptime',
      value: 99.8,
      unit: '%',
      change: 0.1,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    errorRate: {
      id: 'error_rate',
      name: 'Error Rate',
      value: 0.2,
      unit: '%',
      change: -0.1,
      changeType: 'decrease',
      trend: 'down',
      period: 'monthly'
    }
  },
  revenueMetrics: {
    totalRevenue: {
      id: 'total_revenue',
      name: 'Total Revenue',
      value: 1250000,
      unit: '$',
      change: 18,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    revenueByRole: [
      { role: 'Institutions', revenue: 450000 },
      { role: 'Companies', revenue: 380000 },
      { role: 'Students', revenue: 220000 },
      { role: 'Parents', revenue: 200000 }
    ],
    growthRate: {
      id: 'growth_rate',
      name: 'Growth Rate',
      value: 18,
      unit: '%',
      change: 3,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  },
  globalMetrics: {
    totalUsers: {
      id: 'total_users',
      name: 'Total Users',
      value: 45680,
      unit: '',
      change: 15,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    totalInstitutions: {
      id: 'total_institutions',
      name: 'Total Institutions',
      value: 156,
      unit: '',
      change: 8,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    totalCompanies: {
      id: 'total_companies',
      name: 'Total Companies',
      value: 234,
      unit: '',
      change: 12,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    },
    totalPartnerships: {
      id: 'total_partnerships',
      name: 'Total Partnerships',
      value: 892,
      unit: '',
      change: 25,
      changeType: 'increase',
      trend: 'up',
      period: 'monthly'
    }
  }
};

const AnalyticsPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeChild, setActiveChild] = useState(1);
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [activePosition, setActivePosition] = useState(0);

  // Mock data for dropdowns
  const mockChildren = [
    { id: 1, name: 'Alex Johnson', grade: '10th' },
    { id: 2, name: 'Sarah Johnson', grade: '8th' }
  ];

  const mockDepartments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Arts' }
  ];

  const mockPositions = [
    { id: 1, title: 'Software Engineer', department: 'Engineering' },
    { id: 2, title: 'Data Scientist', department: 'Analytics' },
    { id: 3, title: 'Product Manager', department: 'Product' }
  ];

  if (isLoading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You need to be logged in to view analytics.</p>
        </Alert>
      </Container>
    );
  }

  const renderAnalyticsByRole = () => {
    switch (user.role) {
      case 'STUDENT':
        return <StudentAnalyticsComponent analytics={mockStudentAnalytics} />;
      
      case 'PARENT':
        return (
          <ParentAnalyticsComponent 
            analytics={mockParentAnalytics}
            children={mockChildren}
            activeChild={activeChild}
            onChildChange={setActiveChild}
          />
        );
      
      case 'INSTITUTION':
        return (
          <InstitutionAnalyticsComponent 
            analytics={mockInstitutionAnalytics}
            departments={mockDepartments}
            activeDepartment={activeDepartment}
            onDepartmentChange={setActiveDepartment}
          />
        );
      
      case 'COMPANY':
        return (
          <CompanyAnalyticsComponent 
            analytics={mockCompanyAnalytics}
            positions={mockPositions}
            activePosition={activePosition}
            onPositionChange={setActivePosition}
          />
        );
      
      case 'ADMIN':
        return <PlatformAnalyticsComponent analytics={mockPlatformAnalytics} />;
      
      default:
        return (
          <Alert variant="info">
            <Alert.Heading>Analytics Not Available</Alert.Heading>
            <p>Analytics are not available for your current role.</p>
          </Alert>
        );
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-primary mb-2">
                <i className="bi bi-graph-up me-2"></i>
                Analytics Dashboard
              </h2>
              <p className="text-muted mb-0">
                {user.role === 'STUDENT' && 'Track your learning progress and career development'}
                {user.role === 'PARENT' && 'Monitor your child\'s academic performance and future prospects'}
                {user.role === 'INSTITUTION' && 'Analyze student success and institutional effectiveness'}
                {user.role === 'COMPANY' && 'Optimize recruitment and talent acquisition strategies'}
                {user.role === 'ADMIN' && 'Monitor platform performance and global metrics'}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm">
                <i className="bi bi-download me-1"></i>
                Export Report
              </Button>
              <Button variant="outline-secondary" size="sm">
                <i className="bi bi-gear me-1"></i>
                Settings
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {renderAnalyticsByRole()}

      <Row className="mt-4">
        <Col>
          <Alert variant="info">
            <Alert.Heading>
              <i className="bi bi-info-circle me-2"></i>
              Analytics Information
            </Alert.Heading>
            <p className="mb-0">
              All data is updated in real-time and reflects the most recent activity on the platform. 
              Use the export functionality to download detailed reports for further analysis.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
