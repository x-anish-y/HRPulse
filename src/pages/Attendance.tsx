import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  LogIn,
  LogOut,
  Calendar,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Timer,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { attendanceRecords, employees } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Attendance() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-01-03');

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(time);
    setIsCheckedIn(true);
    toast({
      title: 'Checked In Successfully!',
      description: `You checked in at ${time}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(false);
    toast({
      title: 'Checked Out Successfully!',
      description: `You checked out at ${time}. Have a great day!`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
            <CheckCircle2 className="w-3 h-3" />
            Present
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
            <XCircle className="w-3 h-3" />
            Absent
          </span>
        );
      case 'leave':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <Calendar className="w-3 h-3" />
            Leave
          </span>
        );
      case 'half-day':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            <Timer className="w-3 h-3" />
            Half Day
          </span>
        );
      default:
        return null;
    }
  };

  const getEmployeeById = (id: string) => employees.find((e) => e.id === id);

  // Employee attendance stats
  const employeeStats = {
    thisMonth: {
      present: 18,
      absent: 1,
      leave: 2,
      workHours: 162,
      extraHours: 14,
    },
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Monitor team attendance in real-time' : 'Track your daily attendance'}
          </p>
        </div>

        {/* Employee Check-in Section */}
        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-card border border-border/50 shadow-card"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center',
                  isCheckedIn ? 'bg-success/10' : 'bg-muted'
                )}>
                  <Clock className={cn('w-8 h-8', isCheckedIn ? 'text-success' : 'text-muted-foreground')} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {isCheckedIn ? "You're Checked In" : 'Ready to Start?'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isCheckedIn
                      ? `Since ${checkInTime} • Working hard!`
                      : 'Check in to start tracking your work hours'}
                  </p>
                </div>
              </div>

              {isCheckedIn ? (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleCheckOut}
                  className="min-w-[160px]"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Check Out
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleCheckIn}
                  className="min-w-[160px]"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Check In
                </Button>
              )}
            </div>

            {/* Stats for Employee */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-border/50">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-success">{employeeStats.thisMonth.present}</p>
                <p className="text-sm text-muted-foreground">Days Present</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-warning">{employeeStats.thisMonth.absent}</p>
                <p className="text-sm text-muted-foreground">Days Absent</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-primary">{employeeStats.thisMonth.leave}</p>
                <p className="text-sm text-muted-foreground">Days Leave</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold">{employeeStats.thisMonth.workHours}h</p>
                <p className="text-sm text-muted-foreground">Work Hours</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-accent">{employeeStats.thisMonth.extraHours}h</p>
                <p className="text-sm text-muted-foreground">Extra Hours</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Attendance Table */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">
              {isAdmin ? 'Team Attendance' : 'My Attendance History'}
            </h2>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026-01-03">Jan 3, 2026</SelectItem>
                <SelectItem value="2026-01-02">Jan 2, 2026</SelectItem>
                <SelectItem value="2026-01-01">Jan 1, 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {isAdmin && <TableHead>Employee</TableHead>}
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Extra Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isAdmin ? attendanceRecords : attendanceRecords.filter((r) => r.employeeId === '2'))
                  .filter((record) => record.date === selectedDate || !isAdmin)
                  .map((record) => {
                    const employee = getEmployeeById(record.employeeId);
                    return (
                      <TableRow key={record.id}>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={employee?.avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {employee?.firstName[0]}{employee?.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {employee?.firstName} {employee?.lastName}
                              </span>
                            </div>
                          </TableCell>
                        )}
                        <TableCell className="font-mono text-sm">{record.date}</TableCell>
                        <TableCell>
                          {record.checkIn ? (
                            <span className="inline-flex items-center gap-1.5 text-success">
                              <LogIn className="w-3 h-3" />
                              {record.checkIn}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.checkOut ? (
                            <span className="inline-flex items-center gap-1.5 text-accent">
                              <LogOut className="w-3 h-3" />
                              {record.checkOut}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{record.workHours}h</span>
                        </TableCell>
                        <TableCell>
                          {record.extraHours > 0 ? (
                            <span className="text-accent font-medium">+{record.extraHours}h</span>
                          ) : (
                            <span className="text-muted-foreground">0h</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
