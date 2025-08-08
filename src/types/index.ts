// Core User Types
export enum UserRole {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  INSTITUTION = 'INSTITUTION',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}


export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

// Base User Interface
export interface BaseUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  profile: UserProfile;
  permissions: Permission[];
}

// User Profile
export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: Address;
  preferences: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections';
  dataSharing: boolean;
  analytics: boolean;
}

// Specific User Types
export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  studentProfile: StudentProfile;
  learningPath: LearningPath;
  achievements: Achievement[];
  connections: Connection[];
}

export interface StudentProfile {
  dateOfBirth: Date;
  grade: number;
  institution: string;
  major?: string;
  interests: string[];
  skills: Skill[];
  goals: LearningGoal[];
}

export interface Parent extends BaseUser {
  role: UserRole.PARENT;
  parentProfile: ParentProfile;
  children: string[]; // Student IDs
  familyPlan: FamilyPlan;
}

export interface ParentProfile {
  children: Student[];
  familyIncome?: number;
  educationLevel: string;
  occupation?: string;
}

export interface Institution extends BaseUser {
  role: UserRole.INSTITUTION;
  institutionProfile: InstitutionProfile;
  students: Student[];
  curriculum: Curriculum[];
  partnerships: Partnership[];
}

export interface InstitutionProfile {
  name: string;
  type: 'school' | 'university' | 'training_center';
  level: 'primary' | 'secondary' | 'higher' | 'vocational';
  accreditation: string[];
  location: Address;
  contactInfo: ContactInfo;
}

export interface Company extends BaseUser {
  role: UserRole.COMPANY;
  companyProfile: CompanyProfile;
  jobPostings: JobPosting[];
  partnerships: Partnership[];
  csrInitiatives: CSRInitiative[];
}

export interface CompanyProfile {
  name: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large';
  location: Address;
  description: string;
  website: string;
  logo?: string;
}

export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
  adminProfile: AdminProfile;
  systemAccess: SystemAccess;
}

export interface AdminProfile {
  department: string;
  accessLevel: 'super' | 'admin' | 'moderator';
  permissions: string[];
}

// Learning & Education Types
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  modules: LearningModule[];
  progress: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content: ModuleContent[];
  duration: number;
  prerequisites: string[];
  assessments: Assessment[];
  completion: ModuleCompletion;
}

export interface ModuleContent {
  type: 'video' | 'text' | 'interactive' | 'quiz';
  title: string;
  content: string;
  duration?: number;
  resources?: Resource[];
}

export interface Assessment {
  id: string;
  type: 'quiz' | 'project' | 'exam';
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'essay' | 'coding';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface ModuleCompletion {
  completed: boolean;
  score?: number;
  completedAt?: Date;
  certificate?: Certificate;
}

// Skills & Certifications
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified: boolean;
  verifiedBy?: string;
  microCredentials: MicroCredential[];
}

export interface MicroCredential {
  id: string;
  name: string;
  description: string;
  issuer: string;
  issuedAt: Date;
  expiresAt?: Date;
  verificationUrl: string;
  blockchainHash?: string;
}

export interface Certificate {
  id: string;
  name: string;
  description: string;
  issuer: string;
  issuedAt: Date;
  expiresAt?: Date;
  verificationUrl: string;
  skills: Skill[];
}

// Gamification
export interface Achievement {
  id: number;
  name: string;
  description: string;
  category: 'academic' | 'social' | 'career' | 'skills' | 'leadership';
  icon: string;
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  category: 'academic' | 'social' | 'career' | 'skills' | 'leadership';
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal';
  category: 'academic' | 'social' | 'career' | 'skills' | 'leadership';
  points: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  expiresAt: string;
  rewards: Reward[];
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  type: 'virtual' | 'real' | 'educational' | 'career' | 'social';
  value: number;
  isRedeemed: boolean;
  redeemedAt?: string;
  sponsor?: string;
}

export interface LeaderboardEntry {
  id: number;
  userId: number;
  username: string;
  avatar: string;
  points: number;
  rank: number;
  category: 'overall' | 'academic' | 'social' | 'career' | 'skills' | 'leadership';
}

export interface GamificationStats {
  totalPoints: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  streak: number;
  achievementsCount: number;
  badgesCount: number;
  challengesCompleted: number;
  rank: number;
  totalUsers: number;
}

export interface UserGamification {
  stats: GamificationStats;
  achievements: Achievement[];
  badges: Badge[];
  challenges: Challenge[];
  rewards: Reward[];
  leaderboards: LeaderboardEntry[];
  recentActivity: {
    id: number;
    type: 'achievement' | 'badge' | 'challenge' | 'reward' | 'streak';
    title: string;
    description: string;
    points: number;
    timestamp: string;
  }[];
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  completed: boolean;
  relatedSkills: string[];
}

// Connections & Networking
export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  type: 'mentor' | 'peer' | 'instructor' | 'employer';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  mutualInterests: string[];
}

// Job & Career
export interface JobPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: Skill[];
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'freelance';
  salary?: SalaryRange;
  postedAt: Date;
  deadline?: Date;
  applications: JobApplication[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  status: 'applied' | 'reviewing' | 'interviewing' | 'offered' | 'rejected';
  appliedAt: Date;
  coverLetter?: string;
  resume?: string;
  skills: Skill[];
}

// Partnerships & CSR
export interface Partnership {
  id: string;
  type: 'education' | 'employment' | 'research' | 'community';
  partners: string[];
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'pending' | 'completed' | 'terminated';
  benefits: string[];
}

export interface CSRInitiative {
  id: string;
  title: string;
  description: string;
  category: 'education' | 'environment' | 'social' | 'health';
  targetAudience: string[];
  startDate: Date;
  endDate?: Date;
  impact: string;
  participants: string[];
}

// System & Security
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  conditions?: Record<string, any>;
}

export interface SystemAccess {
  modules: string[];
  features: string[];
  dataAccess: string[];
  auditLog: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  socialMedia?: Record<string, string>;
}

export interface FamilyPlan {
  id: string;
  type: 'basic' | 'premium' | 'enterprise';
  features: string[];
  price: number;
  billingCycle: 'monthly' | 'yearly';
  children: number;
}

export interface Curriculum {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
  grade: number;
  academicYear: string;
  status: 'active' | 'draft' | 'archived';
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  modules: LearningModule[];
  credits: number;
  instructor: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'document' | 'video' | 'link' | 'tool';
  url: string;
  description: string;
  tags: string[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

// Analytics & Reporting
export interface Analytics {
  userId: string;
  metrics: Record<string, number>;
  insights: Insight[];
  recommendations: Recommendation[];
  lastUpdated: Date;
}

export interface Insight {
  id: string;
  type: 'performance' | 'engagement' | 'progress' | 'opportunity';
  title: string;
  description: string;
  data: Record<string, any>;
  actionable: boolean;
}

export interface Recommendation {
  id: string;
  type: 'course' | 'skill' | 'opportunity' | 'connection';
  title: string;
  description: string;
  confidence: number;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

// Analytics System Types
export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: 'up' | 'down' | 'stable';
  target?: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface AnalyticsReport {
  id: string;
  title: string;
  description: string;
  type: 'student' | 'parent' | 'institution' | 'company' | 'platform';
  metrics: AnalyticsMetric[];
  charts: {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar';
    data: ChartData;
  }[];
  insights: string[];
  recommendations: string[];
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
}

export interface StudentAnalytics {
  learningVelocity: AnalyticsMetric;
  completionRates: AnalyticsMetric;
  skillGapAnalysis: {
    currentSkills: { skill: string; level: number }[];
    marketDemand: { skill: string; demand: number }[];
    gaps: { skill: string; gap: number }[];
  };
  careerRecommendations: {
    paths: { title: string; probability: number; skills: string[] }[];
    nextSteps: string[];
  };
  engagementTrends: {
    timeSpent: AnalyticsMetric;
    activeDays: AnalyticsMetric;
    courseParticipation: AnalyticsMetric;
  };
}

export interface ParentAnalytics {
  childProgress: {
    overall: AnalyticsMetric;
    bySubject: { subject: string; progress: number }[];
    vsPeers: { metric: string; child: number; average: number }[];
  };
  careerProbability: {
    careers: { title: string; probability: number; factors: string[] }[];
    recommendations: string[];
  };
  financialProjections: {
    educationCosts: { year: number; cost: number }[];
    scholarshipOpportunities: { name: string; amount: number; probability: number }[];
    savingsNeeded: AnalyticsMetric;
  };
  interventionRecommendations: {
    alerts: { type: string; message: string; priority: 'high' | 'medium' | 'low' }[];
    actions: string[];
  };
}

export interface InstitutionAnalytics {
  studentRetention: {
    overall: AnalyticsMetric;
    byDepartment: { department: string; rate: number }[];
    riskFactors: { factor: string; impact: number }[];
  };
  graduationRates: {
    overall: AnalyticsMetric;
    byProgram: { program: string; rate: number }[];
    trends: { year: number; rate: number }[];
  };
  partnershipEffectiveness: {
    totalPartnerships: AnalyticsMetric;
    activePartnerships: AnalyticsMetric;
    studentPlacements: AnalyticsMetric;
    roi: AnalyticsMetric;
  };
  teacherPerformance: {
    averageRating: AnalyticsMetric;
    studentSatisfaction: AnalyticsMetric;
    courseCompletion: AnalyticsMetric;
    byTeacher: { name: string; metrics: { rating: number; satisfaction: number; completion: number } }[];
  };
  resourceUtilization: {
    classroomUsage: AnalyticsMetric;
    equipmentUtilization: AnalyticsMetric;
    staffEfficiency: AnalyticsMetric;
  };
}

export interface CompanyAnalytics {
  candidateQuality: {
    overallScore: AnalyticsMetric;
    bySource: { source: string; score: number }[];
    byPosition: { position: string; score: number }[];
  };
  timeToHire: {
    average: AnalyticsMetric;
    byPosition: { position: string; days: number }[];
    bottlenecks: { stage: string; delay: number }[];
  };
  conversionRates: {
    applicationToInterview: AnalyticsMetric;
    interviewToOffer: AnalyticsMetric;
    offerToAcceptance: AnalyticsMetric;
    bySource: { source: string; rate: number }[];
  };
  sourceEffectiveness: {
    topSources: { source: string; effectiveness: number }[];
    costPerHire: { source: string; cost: number }[];
    qualityBySource: { source: string; quality: number }[];
  };
  diversityMetrics: {
    overallDiversity: AnalyticsMetric;
    byDepartment: { department: string; diversity: number }[];
    byPosition: { position: string; diversity: number }[];
    goals: { metric: string; current: number; target: number }[];
  };
}

export interface PlatformAnalytics {
  userEngagement: {
    activeUsers: AnalyticsMetric;
    sessionDuration: AnalyticsMetric;
    featureUsage: { feature: string; usage: number }[];
  };
  systemPerformance: {
    responseTime: AnalyticsMetric;
    uptime: AnalyticsMetric;
    errorRate: AnalyticsMetric;
  };
  revenueMetrics: {
    totalRevenue: AnalyticsMetric;
    revenueByRole: { role: string; revenue: number }[];
    growthRate: AnalyticsMetric;
  };
  globalMetrics: {
    totalUsers: AnalyticsMetric;
    totalInstitutions: AnalyticsMetric;
    totalCompanies: AnalyticsMetric;
    totalPartnerships: AnalyticsMetric;
  };
}

export interface AnalyticsDashboard {
  id: string;
  title: string;
  role: UserRole;
  metrics: AnalyticsMetric[];
  charts: {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar';
    data: ChartData;
  }[];
  insights: string[];
  lastUpdated: string;
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  includeInsights: boolean;
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  frequency: 'immediate' | 'daily' | 'weekly';
  recipients: string[];
  enabled: boolean;
}

export interface ScheduledReport {
  id: string;
  name: string;
  dashboardId: string;
  schedule: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: 'pdf' | 'excel';
  enabled: boolean;
  lastSent?: string;
  nextSend?: string;
}
