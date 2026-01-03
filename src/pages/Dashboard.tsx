import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  CalendarDays,
  TrendingUp,
  UserCheck,
  UserX,
  Plane,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { employees, leaveRequests, attendanceRecords } from '@/lib/demoData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return <div className="w-3 h-3 rounded-full bg-success animate-pulse" />;
    case 'absent':
      return <div className="w-3 h-3 rounded-full bg-warning" />;
    case 'leave':
      return <Plane className="w-3 h-3 text-primary" />;
    default:
      return null;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'present':
      return 'Present';
    case 'absent':
      return 'Absent';
    case 'leave':
      return 'On Leave';
    default:
      return status;
  }
};

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  const presentCount = employees.filter((e) => e.status === 'present').length;
  const absentCount = employees.filter((e) => e.status === 'absent').length;
  const onLeaveCount = employees.filter((e) => e.status === 'leave').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending').length;

  const adminStats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Present Today',
      value: presentCount,
      icon: UserCheck,
      color: 'bg-success/10 text-success',
    },
    {
      title: 'Absent Today',
      value: absentCount,
      icon: UserX,
      color: 'bg-warning/10 text-warning',
    },
    {
      title: 'Pending Requests',
      value: pendingLeaves,
      icon: CalendarDays,
      color: 'bg-accent/10 text-accent',
    },
  ];

  const employeeActions = [
    {
      title: 'My Profile',
      description: 'View and update your information',
      icon: Users,
      href: '/profile',
      color: 'gradient-primary',
    },
    {
      title: 'Attendance',
      description: 'Check-in, check-out, and view history',
      icon: Clock,
      href: '/attendance',
      color: 'bg-success',
    },
    {
      title: 'Time Off',
      description: 'Apply for leave and view balance',
      icon: CalendarDays,
      href: '/time-off',
      color: 'bg-accent',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Here's an overview of your organization today."
              : "Here's your personal dashboard for today."}
          </p>
        </motion.div>

        {isAdmin ? (
          <>
            {/* Admin Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {adminStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Employee Grid */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Team Overview</h2>
                <Link to="/employees">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {employees.slice(0, 8).map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-4 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-border">
                          <AvatarImage src={employee.avatar} alt={employee.firstName} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-card border border-border">
                          {getStatusIcon(employee.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {employee.position}
                        </p>
                        <span
                          className={cn(
                            'inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                            employee.status === 'present' && 'status-present',
                            employee.status === 'absent' && 'status-absent',
                            employee.status === 'leave' && 'status-leave'
                          )}
                        >
                          {getStatusLabel(employee.status)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pending Leave Requests */}
            {pendingLeaves > 0 && (
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Pending Leave Requests</h2>
                  <Link to="/time-off">
                    <Button variant="outline">View All</Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  {leaveRequests
                    .filter((l) => l.status === 'pending')
                    .map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <p className="font-medium">{request.employeeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave • {request.startDate} to {request.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                          <Button size="sm" variant="success">
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            {/* Employee Quick Actions */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {employeeActions.map((action, index) => (
                <motion.div key={action.title} variants={itemVariants}>
                  <Link to={action.href}>
                    <div className="group p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-primary-foreground',
                          action.color
                        )}
                      >
                        <action.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Employee Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Leave Balance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Paid Time Off</span>
                    <span className="font-semibold">{user?.leaveBalance.paid} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sick Leave</span>
                    <span className="font-semibold">{user?.leaveBalance.sick} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Unpaid Leave</span>
                    <span className="font-semibold">{user?.leaveBalance.unpaid} days</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Days Worked</span>
                    <span className="font-semibold text-success">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overtime Hours</span>
                    <span className="font-semibold text-primary">12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Leaves Taken</span>
                    <span className="font-semibold">2</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Department</span>
                    <span className="font-semibold">{user?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Position</span>
                    <span className="font-semibold">{user?.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Employee ID</span>
                    <span className="font-mono text-sm">{user?.loginId}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
