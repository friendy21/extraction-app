// src/lib/api-server.ts
/**
 * This module provides a simple in-memory database with mock data
 * to replace Prisma while keeping the same API structure.
 */

import { hash, compare } from 'bcrypt';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  position: string;
  imageUrl: string | null;
  joinDate: Date;
  lastActive: Date;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface RiskAlert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: string;
  timestamp: Date;
  isResolved: boolean;
  resolvedAt: Date | null;
  employeeId: string;
}

interface Message {
  id: string;
  content: string;
  sentAt: Date;
  sentimentScore: number;
  isNegative: boolean;
  isPositive: boolean;
  isNeutral: boolean;
  channel: string;
  senderId: string;
  receiverId: string;
}

interface RetentionData {
  id: string;
  retentionRisk: number;
  complaintCount: number;
  calendarOverload: boolean;
  positiveLanguage: number;
  negativeLanguage: number;
  meetingLoad: number;
  userId: string;
}

interface PerformanceData {
  id: string;
  respondTime: number;
  taskCompletionRate: number;
  communicationVolume: number;
  negativityScore: number;
  meetingAttendance: number;
  overdueTasks: number;
  userId: string;
}

interface CalendarItem {
  id: string;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  isOptional: boolean;
  isFocusTime: boolean;
  userId: string;
}

interface GlynacScore {
  id: string;
  date: Date;
  overallScore: number;
  communicationScore: number;
  workloadScore: number;
  wellbeingScore: number;
}

interface FileActivity {
  id: string;
  action: string;
  timestamp: Date;
  fileId: string;
  userId: string;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  createdAt: Date;
  lastModified: Date;
  creatorId: string;
}

// Mock database
const db = {
  users: [] as User[],
  riskAlerts: [] as RiskAlert[],
  messages: [] as Message[],
  retentionData: [] as RetentionData[],
  performanceData: [] as PerformanceData[],
  calendarItems: [] as CalendarItem[],
  glynacScores: [] as GlynacScore[],
  fileActivities: [] as FileActivity[],
  files: [] as File[],
};

// Initialize with default data
const initializeDb = async () => {
  // Create admin user if not exists
  if (db.users.length === 0) {
    const adminPassword = await hash('admin123', 10);
    
    db.users.push({
      id: '1',
      name: 'Admin User',
      email: 'admin@company.com',
      password: adminPassword,
      department: 'HR',
      position: 'HR Director',
      imageUrl: null,
      joinDate: new Date(),
      lastActive: new Date(),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Add more test users
    const regularPassword = await hash('password123', 10);
    
    db.users.push({
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      password: regularPassword,
      department: 'Marketing',
      position: 'Marketing Manager',
      imageUrl: null,
      joinDate: new Date('2023-01-15'),
      lastActive: new Date(),
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    db.users.push({
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      password: regularPassword,
      department: 'Engineering',
      position: 'Software Engineer',
      imageUrl: null,
      joinDate: new Date('2023-02-22'),
      lastActive: new Date(),
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Add Glynac score
    db.glynacScores.push({
      id: '1',
      date: new Date(),
      overallScore: 84,
      communicationScore: 82,
      workloadScore: 79,
      wellbeingScore: 87,
    });
    
    // Add previous months score for trend
    db.glynacScores.push({
      id: '2',
      date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      overallScore: 82,
      communicationScore: 79,
      workloadScore: 80,
      wellbeingScore: 85,
    });
    
    // Add risk alerts
    db.riskAlerts.push({
      id: '1',
      type: 'harassment',
      title: 'Potential Harassment Incident',
      description: 'Multiple concerning messages detected in communications',
      severity: 'high',
      timestamp: new Date(),
      isResolved: false,
      resolvedAt: null,
      employeeId: '2', // Sarah Johnson
    });
    
    db.riskAlerts.push({
      id: '2',
      type: 'burnout',
      title: 'Burnout Risk Detected',
      description: 'Working consistently after hours for past 14 days',
      severity: 'medium',
      timestamp: new Date(),
      isResolved: false,
      resolvedAt: null,
      employeeId: '3', // Michael Chen
    });
    
    // Add performance data
    db.performanceData.push({
      id: '1',
      respondTime: 4.2,
      taskCompletionRate: 82,
      communicationVolume: 65,
      negativityScore: 0.35,
      meetingAttendance: 95,
      overdueTasks: 3,
      userId: '2', // Sarah Johnson
    });
    
    db.performanceData.push({
      id: '2',
      respondTime: 2.1,
      taskCompletionRate: 90,
      communicationVolume: 45,
      negativityScore: 0.15,
      meetingAttendance: 98,
      overdueTasks: 1,
      userId: '3', // Michael Chen
    });
    
    // Add retention data
    db.retentionData.push({
      id: '1',
      retentionRisk: 75,
      complaintCount: 2,
      calendarOverload: true,
      positiveLanguage: 55,
      negativeLanguage: 15,
      meetingLoad: 35,
      userId: '2', // Sarah Johnson
    });
    
    db.retentionData.push({
      id: '2',
      retentionRisk: 35,
      complaintCount: 1,
      calendarOverload: false,
      positiveLanguage: 75,
      negativeLanguage: 5,
      meetingLoad: 20,
      userId: '3', // Michael Chen
    });
    
    // Add messages
    db.messages.push({
      id: '1',
      content: 'Can you get me that report by end of day?',
      sentAt: new Date(),
      sentimentScore: 0.2,
      isNegative: false,
      isPositive: false,
      isNeutral: true,
      channel: 'email',
      senderId: '2', // Sarah Johnson
      receiverId: '3', // Michael Chen
    });
    
    db.messages.push({
      id: '2',
      content: 'Yes, I\'ll have it done by 5pm.',
      sentAt: new Date(),
      sentimentScore: 0.5,
      isNegative: false,
      isPositive: true,
      isNeutral: false,
      channel: 'email',
      senderId: '3', // Michael Chen
      receiverId: '2', // Sarah Johnson
    });
    
    // Add some calendar items
    db.calendarItems.push({
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      isRecurring: true,
      isOptional: false,
      isFocusTime: false,
      userId: '2', // Sarah Johnson
    });
    
    db.calendarItems.push({
      id: '2',
      title: 'Focus Time',
      description: 'Coding session',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(16, 0, 0, 0)),
      isRecurring: false,
      isOptional: false,
      isFocusTime: true,
      userId: '3', // Michael Chen
    });
    
    // Add some files
    db.files.push({
      id: '1',
      name: 'Q1_Report.xlsx',
      type: 'xlsx',
      size: 2500000,
      path: '/documents/Q1_Report.xlsx',
      createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
      lastModified: new Date(new Date().setDate(new Date().getDate() - 5)),
      creatorId: '2', // Sarah Johnson
    });
    
    db.files.push({
      id: '2',
      name: 'Project_Plan.docx',
      type: 'docx',
      size: 1500000,
      path: '/documents/Project_Plan.docx',
      createdAt: new Date(new Date().setDate(new Date().getDate() - 45)),
      lastModified: new Date(new Date().setDate(new Date().getDate() - 15)),
      creatorId: '3', // Michael Chen
    });
    
    // Add file activities
    db.fileActivities.push({
      id: '1',
      action: 'view',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
      fileId: '1',
      userId: '3', // Michael Chen
    });
    
    db.fileActivities.push({
      id: '2',
      action: 'edit',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
      fileId: '2',
      userId: '2', // Sarah Johnson
    });
  }
};

// API endpoints that mimic Prisma's API
export const apiServer = {
  // Initialize
  init: async () => {
    await initializeDb();
  },
  
  // User operations
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return db.users.find(user => user.email === where.email) || null;
      }
      if (where.id) {
        return db.users.find(user => user.id === where.id) || null;
      }
      return null;
    },
    
    findMany: async ({ where, include }: any = {}) => {
      // Filter users based on criteria
      let filteredUsers = [...db.users];
      
      if (where) {
        if (where.isAdmin !== undefined) {
          filteredUsers = filteredUsers.filter(user => user.isAdmin === where.isAdmin);
        }
      }
      
      // Handle includes
      if (include) {
        return filteredUsers.map(user => {
          const result = { ...user, password: undefined }; // Remove password from result
          
          if (include.retentionData) {
            result.retentionData = db.retentionData.find(data => data.userId === user.id) || null;
          }
          
          if (include.performanceData) {
            result.performanceData = db.performanceData.find(data => data.userId === user.id) || null;
          }
          
          if (include.sentMessages) {
            result.sentMessages = db.messages.filter(message => message.senderId === user.id);
            
            if (include.sentMessages.orderBy?.sentAt === 'desc') {
              result.sentMessages.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
            }
            
            if (include.sentMessages.take) {
              result.sentMessages = result.sentMessages.slice(0, include.sentMessages.take);
            }
          }
          
          if (include.riskAlerts) {
            result.riskAlerts = db.riskAlerts.filter(alert => alert.employeeId === user.id);
            
            if (include.riskAlerts.where?.isResolved !== undefined) {
              result.riskAlerts = result.riskAlerts.filter(alert => 
                alert.isResolved === include.riskAlerts.where.isResolved
              );
            }
          }
          
          if (include.scheduleItems || include.calendarItems) {
            result.scheduleItems = db.calendarItems.filter(item => item.userId === user.id);
            
            if (include.scheduleItems?.where?.startTime) {
              const { startTime } = include.scheduleItems.where;
              if (startTime.gte) {
                result.scheduleItems = result.scheduleItems.filter(item => 
                  item.startTime >= new Date(startTime.gte)
                );
              }
            }
          }
          
          if (include.fileActivities) {
            result.fileActivities = db.fileActivities.filter(activity => activity.userId === user.id);
            
            if (include.fileActivities.orderBy?.timestamp === 'desc') {
              result.fileActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            }
            
            if (include.fileActivities.take) {
              result.fileActivities = result.fileActivities.slice(0, include.fileActivities.take);
            }
            
            if (include.fileActivities.include?.file) {
              result.fileActivities = result.fileActivities.map(activity => ({
                ...activity,
                file: db.files.find(file => file.id === activity.fileId)
              }));
            }
          }
          
          return result;
        });
      }
      
      return filteredUsers.map(user => ({ ...user, password: undefined }));
    },
    
    count: async ({ where }: any = {}) => {
      let count = db.users.length;
      
      if (where?.isAdmin !== undefined) {
        count = db.users.filter(user => user.isAdmin === where.isAdmin).length;
      }
      
      return count;
    },
  },
  
  // Risk alert operations
  riskAlert: {
    findMany: async ({ where, include, orderBy, take }: any = {}) => {
      let filteredAlerts = [...db.riskAlerts];
      
      if (where) {
        if (where.isResolved !== undefined) {
          filteredAlerts = filteredAlerts.filter(alert => alert.isResolved === where.isResolved);
        }
        
        if (where.type) {
          filteredAlerts = filteredAlerts.filter(alert => alert.type === where.type);
        }
      }
      
      if (orderBy) {
        if (orderBy.timestamp === 'desc') {
          filteredAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        } else if (orderBy.timestamp === 'asc') {
          filteredAlerts.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        }
      }
      
      if (take) {
        filteredAlerts = filteredAlerts.slice(0, take);
      }
      
      if (include?.employee) {
        filteredAlerts = filteredAlerts.map(alert => ({
          ...alert,
          employee: db.users.find(user => user.id === alert.employeeId)
        }));
      }
      
      return filteredAlerts;
    },
    
    findUnique: async ({ where, include }: any = {}) => {
      let alert = db.riskAlerts.find(alert => alert.id === where.id);
      
      if (!alert) return null;
      
      if (include?.employee) {
        return {
          ...alert,
          employee: db.users.find(user => user.id === alert.employeeId)
        };
      }
      
      if (include?.flaggedMessages) {
        // In this mock API, we'll just return some related messages
        const flaggedMessages = db.messages.filter(message => 
          (message.senderId === alert.employeeId || message.receiverId === alert.employeeId) &&
          message.sentimentScore < 0
        ).slice(0, 5);
        
        if (include.flaggedMessages.include?.sender) {
          return {
            ...alert,
            flaggedMessages: flaggedMessages.map(message => ({
              ...message,
              sender: db.users.find(user => user.id === message.senderId),
              receiver: db.users.find(user => user.id === message.receiverId),
            }))
          };
        }
        
        return {
          ...alert,
          flaggedMessages
        };
      }
      
      return alert;
    },
  },
  
  // Message operations
  message: {
    findMany: async ({ where, orderBy, take }: any = {}) => {
      let filteredMessages = [...db.messages];
      
      if (where) {
        if (where.sentAt?.gte) {
          filteredMessages = filteredMessages.filter(message => 
            message.sentAt >= new Date(where.sentAt.gte)
          );
        }
        
        if (where.isNegative !== undefined) {
          filteredMessages = filteredMessages.filter(message => 
            message.isNegative === where.isNegative
          );
        }
        
        if (where.isPositive !== undefined) {
          filteredMessages = filteredMessages.filter(message => 
            message.isPositive === where.isPositive
          );
        }
        
        if (where.isNeutral !== undefined) {
          filteredMessages = filteredMessages.filter(message => 
            message.isNeutral === where.isNeutral
          );
        }
        
        if (where.OR) {
          filteredMessages = filteredMessages.filter(message => 
            where.OR.some((condition: any) => {
              if (condition.isNegative !== undefined) {
                return message.isNegative === condition.isNegative;
              }
              if (condition.sentimentScore?.lt !== undefined) {
                return message.sentimentScore < condition.sentimentScore.lt;
              }
              return false;
            })
          );
        }
      }
      
      if (orderBy) {
        if (orderBy.sentAt === 'desc') {
          filteredMessages.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
        } else if (orderBy.sentAt === 'asc') {
          filteredMessages.sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime());
        }
      }
      
      if (take) {
        filteredMessages = filteredMessages.slice(0, take);
      }
      
      return filteredMessages;
    },
  },
  
  // GlynacScore operations
  glynacScore: {
    findFirst: async ({ orderBy }: any = {}) => {
      if (orderBy?.date === 'desc') {
        return [...db.glynacScores].sort((a, b) => b.date.getTime() - a.date.getTime())[0] || null;
      }
      return db.glynacScores[0] || null;
    },
  },
  
  // File operations
  file: {
    findMany: async ({ orderBy, include, take }: any = {}) => {
      let files = [...db.files];
      
      if (orderBy) {
        if (orderBy.lastModified === 'asc') {
          files.sort((a, b) => a.lastModified.getTime() - b.lastModified.getTime());
        }
      }
      
      if (include?.activities) {
        return files.map(file => ({
          ...file,
          activities: db.fileActivities.filter(activity => activity.fileId === file.id)
        }));
      }
      
      if (take) {
        files = files.slice(0, take);
      }
      
      return files;
    },
  },
  
  // PerformanceData operations
  performanceData: {
    findMany: async () => {
      return db.performanceData;
    },
  },
  
  // Authentication helpers
  auth: {
    comparePasswords: async (password: string, hash: string) => {
      return compare(password, hash);
    },
    
    hashPassword: async (password: string) => {
      return hash(password, 10);
    },
  },
};