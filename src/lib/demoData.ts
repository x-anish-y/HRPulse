// Demo data for DayFlow HRMS

export interface Employee {
  id: string;
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  role: 'admin' | 'employee';
  avatar: string;
  joinDate: string;
  status: 'present' | 'absent' | 'leave';
  salary: {
    wageType: 'monthly' | 'yearly';
    wage: number;
    basic: number;
    hra: number;
    allowance: number;
    bonus: number;
    lta: number;
    pf: number;
    professionalTax: number;
  };
  leaveBalance: {
    paid: number;
    sick: number;
    unpaid: number;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'leave' | 'half-day';
  workHours: number;
  extraHours: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'paid' | 'sick' | 'unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  document?: string;
  createdAt: string;
}

export const employees: Employee[] = [
  {
    id: '1',
    loginId: 'DFJD20230001',
    firstName: 'James',
    lastName: 'Davidson',
    email: 'james.davidson@dayflow.com',
    phone: '+1 (555) 123-4567',
    department: 'Human Resources',
    position: 'HR Director',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-15',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 120000,
      basic: 60000,
      hra: 24000,
      allowance: 12000,
      bonus: 10000,
      lta: 8000,
      pf: 7200,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 15, sick: 10, unpaid: 5 },
  },
  {
    id: '2',
    loginId: 'DFSE20230002',
    firstName: 'Sarah',
    lastName: 'Ellis',
    email: 'sarah.ellis@dayflow.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    position: 'Senior Developer',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-03-20',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 95000,
      basic: 47500,
      hra: 19000,
      allowance: 9500,
      bonus: 8000,
      lta: 6000,
      pf: 5700,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 12, sick: 8, unpaid: 3 },
  },
  {
    id: '3',
    loginId: 'DFMC20230003',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@dayflow.com',
    phone: '+1 (555) 345-6789',
    department: 'Design',
    position: 'UI/UX Lead',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-02-10',
    status: 'leave',
    salary: {
      wageType: 'yearly',
      wage: 88000,
      basic: 44000,
      hra: 17600,
      allowance: 8800,
      bonus: 7000,
      lta: 5600,
      pf: 5280,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 10, sick: 7, unpaid: 2 },
  },
  {
    id: '4',
    loginId: 'DFEP20230004',
    firstName: 'Emily',
    lastName: 'Patel',
    email: 'emily.patel@dayflow.com',
    phone: '+1 (555) 456-7890',
    department: 'Marketing',
    position: 'Marketing Manager',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-04-05',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 78000,
      basic: 39000,
      hra: 15600,
      allowance: 7800,
      bonus: 6000,
      lta: 5000,
      pf: 4680,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 14, sick: 9, unpaid: 4 },
  },
  {
    id: '5',
    loginId: 'DFDR20230005',
    firstName: 'David',
    lastName: 'Rodriguez',
    email: 'david.rodriguez@dayflow.com',
    phone: '+1 (555) 567-8901',
    department: 'Finance',
    position: 'Financial Analyst',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-05-12',
    status: 'absent',
    salary: {
      wageType: 'yearly',
      wage: 72000,
      basic: 36000,
      hra: 14400,
      allowance: 7200,
      bonus: 5500,
      lta: 4400,
      pf: 4320,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 11, sick: 6, unpaid: 3 },
  },
  {
    id: '6',
    loginId: 'DFAW20230006',
    firstName: 'Amanda',
    lastName: 'Williams',
    email: 'amanda.williams@dayflow.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    position: 'Backend Developer',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-06-18',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 85000,
      basic: 42500,
      hra: 17000,
      allowance: 8500,
      bonus: 7000,
      lta: 5500,
      pf: 5100,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 13, sick: 8, unpaid: 2 },
  },
  {
    id: '7',
    loginId: 'DFRK20230007',
    firstName: 'Robert',
    lastName: 'Kim',
    email: 'robert.kim@dayflow.com',
    phone: '+1 (555) 789-0123',
    department: 'Operations',
    position: 'Operations Lead',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-07-22',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 82000,
      basic: 41000,
      hra: 16400,
      allowance: 8200,
      bonus: 6500,
      lta: 5200,
      pf: 4920,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 12, sick: 7, unpaid: 3 },
  },
  {
    id: '8',
    loginId: 'DFJO20230008',
    firstName: 'Jennifer',
    lastName: 'O\'Brien',
    email: 'jennifer.obrien@dayflow.com',
    phone: '+1 (555) 890-1234',
    department: 'Customer Success',
    position: 'CS Manager',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-08-30',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 75000,
      basic: 37500,
      hra: 15000,
      allowance: 7500,
      bonus: 6000,
      lta: 4800,
      pf: 4500,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 14, sick: 9, unpaid: 4 },
  },
  {
    id: '9',
    loginId: 'DFTA20240009',
    firstName: 'Thomas',
    lastName: 'Anderson',
    email: 'thomas.anderson@dayflow.com',
    phone: '+1 (555) 901-2345',
    department: 'Engineering',
    position: 'Frontend Developer',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-08',
    status: 'leave',
    salary: {
      wageType: 'yearly',
      wage: 70000,
      basic: 35000,
      hra: 14000,
      allowance: 7000,
      bonus: 5500,
      lta: 4200,
      pf: 4200,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 15, sick: 10, unpaid: 5 },
  },
  {
    id: '10',
    loginId: 'DFNG20240010',
    firstName: 'Nicole',
    lastName: 'Garcia',
    email: 'nicole.garcia@dayflow.com',
    phone: '+1 (555) 012-3456',
    department: 'Design',
    position: 'Product Designer',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-02-14',
    status: 'present',
    salary: {
      wageType: 'yearly',
      wage: 68000,
      basic: 34000,
      hra: 13600,
      allowance: 6800,
      bonus: 5000,
      lta: 4000,
      pf: 4080,
      professionalTax: 2400,
    },
    leaveBalance: { paid: 15, sick: 10, unpaid: 5 },
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: '2', date: '2026-01-03', checkIn: '09:00', checkOut: '18:30', status: 'present', workHours: 9.5, extraHours: 1.5 },
  { id: '2', employeeId: '2', date: '2026-01-02', checkIn: '08:45', checkOut: '17:45', status: 'present', workHours: 9, extraHours: 1 },
  { id: '3', employeeId: '2', date: '2026-01-01', checkIn: null, checkOut: null, status: 'absent', workHours: 0, extraHours: 0 },
  { id: '4', employeeId: '4', date: '2026-01-03', checkIn: '09:15', checkOut: '18:00', status: 'present', workHours: 8.75, extraHours: 0.75 },
  { id: '5', employeeId: '6', date: '2026-01-03', checkIn: '08:30', checkOut: '17:30', status: 'present', workHours: 9, extraHours: 1 },
  { id: '6', employeeId: '7', date: '2026-01-03', checkIn: '09:00', checkOut: '18:15', status: 'present', workHours: 9.25, extraHours: 1.25 },
  { id: '7', employeeId: '8', date: '2026-01-03', checkIn: '08:50', checkOut: '17:50', status: 'present', workHours: 9, extraHours: 1 },
  { id: '8', employeeId: '10', date: '2026-01-03', checkIn: '09:05', checkOut: '18:05', status: 'present', workHours: 9, extraHours: 1 },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'Michael Chen',
    type: 'paid',
    startDate: '2026-01-02',
    endDate: '2026-01-05',
    reason: 'Family vacation',
    status: 'approved',
    createdAt: '2025-12-28',
  },
  {
    id: '2',
    employeeId: '9',
    employeeName: 'Thomas Anderson',
    type: 'sick',
    startDate: '2026-01-03',
    endDate: '2026-01-04',
    reason: 'Flu symptoms',
    status: 'approved',
    document: 'medical-certificate.pdf',
    createdAt: '2026-01-02',
  },
  {
    id: '3',
    employeeId: '5',
    employeeName: 'David Rodriguez',
    type: 'unpaid',
    startDate: '2026-01-06',
    endDate: '2026-01-07',
    reason: 'Personal emergency',
    status: 'pending',
    createdAt: '2026-01-03',
  },
  {
    id: '4',
    employeeId: '2',
    employeeName: 'Sarah Ellis',
    type: 'paid',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    reason: 'Wedding anniversary trip',
    status: 'pending',
    createdAt: '2026-01-02',
  },
];

export const demoCredentials = {
  admin: {
    loginId: 'DFJD20230001',
    password: 'admin123',
    name: 'James Davidson',
  },
  employee: {
    loginId: 'DFSE20230002',
    password: 'employee123',
    name: 'Sarah Ellis',
  },
};
