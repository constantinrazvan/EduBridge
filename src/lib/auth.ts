import { UserRole, Permission, BaseUser } from '@/types';

// RBAC Permission System
export class RBACManager {
  private static permissions: Map<string, Permission[]> = new Map();

  static initializePermissions() {
    // Student permissions
    this.permissions.set(UserRole.STUDENT, [
      { id: '1', name: 'view_own_profile', resource: 'profile', action: 'read' },
      { id: '2', name: 'edit_own_profile', resource: 'profile', action: 'update' },
      { id: '3', name: 'view_learning_path', resource: 'learning', action: 'read' },
      { id: '4', name: 'take_assessments', resource: 'assessments', action: 'create' },
      { id: '5', name: 'view_achievements', resource: 'achievements', action: 'read' },
      { id: '6', name: 'connect_with_users', resource: 'connections', action: 'create' },
      { id: '7', name: 'apply_for_jobs', resource: 'jobs', action: 'create' },
      { id: '8', name: 'view_opportunities', resource: 'opportunities', action: 'read' },
    ]);

    // Parent permissions
    this.permissions.set(UserRole.PARENT, [
      { id: '9', name: 'view_children_progress', resource: 'children', action: 'read' },
      { id: '10', name: 'communicate_with_institution', resource: 'communication', action: 'create' },
      { id: '11', name: 'view_family_plan', resource: 'billing', action: 'read' },
      { id: '12', name: 'manage_family_settings', resource: 'family', action: 'update' },
    ]);

    // Institution permissions
    this.permissions.set(UserRole.INSTITUTION, [
      { id: '13', name: 'manage_students', resource: 'students', action: 'create' },
      { id: '14', name: 'manage_curriculum', resource: 'curriculum', action: 'create' },
      { id: '15', name: 'view_analytics', resource: 'analytics', action: 'read' },
      { id: '16', name: 'manage_partnerships', resource: 'partnerships', action: 'create' },
      { id: '17', name: 'issue_certificates', resource: 'certificates', action: 'create' },
    ]);

    // Company permissions
    this.permissions.set(UserRole.COMPANY, [
      { id: '18', name: 'post_jobs', resource: 'jobs', action: 'create' },
      { id: '19', name: 'view_applications', resource: 'applications', action: 'read' },
      { id: '20', name: 'manage_csr_initiatives', resource: 'csr', action: 'create' },
      { id: '21', name: 'validate_skills', resource: 'skills', action: 'update' },
      { id: '22', name: 'view_talent_pool', resource: 'talent', action: 'read' },
    ]);

    // Admin permissions
    this.permissions.set(UserRole.ADMIN, [
      { id: '23', name: 'manage_all_users', resource: 'users', action: 'create' },
      { id: '24', name: 'view_system_analytics', resource: 'system', action: 'read' },
      { id: '25', name: 'manage_security', resource: 'security', action: 'update' },
      { id: '26', name: 'configure_system', resource: 'system', action: 'update' },
      { id: '27', name: 'view_audit_logs', resource: 'audit', action: 'read' },
    ]);
  }

  static hasPermission(user: BaseUser, resource: string, action: string): boolean {
    const userPermissions = this.permissions.get(user.role) || [];
    return userPermissions.some(permission => 
      permission.resource === resource && permission.action === action
    );
  }

  static getUserPermissions(role: UserRole): Permission[] {
    return this.permissions.get(role) || [];
  }
}

// Authentication Context
export interface AuthContextType {
  user: BaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isLoading: boolean;
}

// Mock Authentication Service
export class AuthService {
  private static currentUser: BaseUser | null = null;

  static async login(email: string, password: string): Promise<BaseUser | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    const mockUsers: Record<string, BaseUser> = {
      'student@edubridge.com': {
        id: '1',
        email: 'student@edubridge.com',
        role: UserRole.STUDENT,
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: 'Alex',
          lastName: 'Student',
          preferences: {
            language: 'en',
            theme: 'light',
            notifications: { email: true, push: true, inApp: true, marketing: false },
            privacy: { profileVisibility: 'public', dataSharing: true, analytics: true }
          }
        },
        permissions: RBACManager.getUserPermissions(UserRole.STUDENT)
      },
      'parent@edubridge.com': {
        id: '2',
        email: 'parent@edubridge.com',
        role: UserRole.PARENT,
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: 'Maria',
          lastName: 'Parent',
          preferences: {
            language: 'en',
            theme: 'light',
            notifications: { email: true, push: true, inApp: true, marketing: false },
            privacy: { profileVisibility: 'private', dataSharing: false, analytics: true }
          }
        },
        permissions: RBACManager.getUserPermissions(UserRole.PARENT)
      },
      'institution@edubridge.com': {
        id: '3',
        email: 'institution@edubridge.com',
        role: UserRole.INSTITUTION,
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: 'Edu',
          lastName: 'Institution',
          preferences: {
            language: 'en',
            theme: 'light',
            notifications: { email: true, push: false, inApp: true, marketing: false },
            privacy: { profileVisibility: 'public', dataSharing: true, analytics: true }
          }
        },
        permissions: RBACManager.getUserPermissions(UserRole.INSTITUTION)
      },
      'company@edubridge.com': {
        id: '4',
        email: 'company@edubridge.com',
        role: UserRole.COMPANY,
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: 'Tech',
          lastName: 'Company',
          preferences: {
            language: 'en',
            theme: 'dark',
            notifications: { email: true, push: true, inApp: true, marketing: true },
            privacy: { profileVisibility: 'public', dataSharing: true, analytics: true }
          }
        },
        permissions: RBACManager.getUserPermissions(UserRole.COMPANY)
      },
      'admin@edubridge.com': {
        id: '5',
        email: 'admin@edubridge.com',
        role: UserRole.ADMIN,
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: 'System',
          lastName: 'Admin',
          preferences: {
            language: 'en',
            theme: 'dark',
            notifications: { email: true, push: true, inApp: true, marketing: false },
            privacy: { profileVisibility: 'private', dataSharing: false, analytics: true }
          }
        },
        permissions: RBACManager.getUserPermissions(UserRole.ADMIN)
      }
    };

    const user = mockUsers[email];
    if (user && password === 'password') {
      this.currentUser = user;
      return user;
    }
    
    return null;
  }

  static logout(): void {
    this.currentUser = null;
  }

  static getCurrentUser(): BaseUser | null {
    return this.currentUser;
  }

  static setCurrentUser(user: BaseUser | null): void {
    this.currentUser = user;
  }

  static isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

// Initialize RBAC
RBACManager.initializePermissions();
