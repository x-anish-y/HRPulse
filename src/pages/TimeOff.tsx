import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Plane,
  Thermometer,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { leaveRequests, LeaveRequest } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const leaveTypeIcons = {
  paid: Plane,
  sick: Thermometer,
  unpaid: Calendar,
};

const leaveTypeColors = {
  paid: 'bg-primary/10 text-primary border-primary/20',
  sick: 'bg-destructive/10 text-destructive border-destructive/20',
  unpaid: 'bg-muted text-muted-foreground border-muted-foreground/20',
};

export default function TimeOff() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requests, setRequests] = useState<LeaveRequest[]>(leaveRequests);

  const [newRequest, setNewRequest] = useState({
    type: 'paid' as 'paid' | 'sick' | 'unpaid',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmitRequest = () => {
    if (!newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const request: LeaveRequest = {
      id: String(requests.length + 1),
      employeeId: user?.id || '',
      employeeName: `${user?.firstName} ${user?.lastName}`,
      type: newRequest.type,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      reason: newRequest.reason,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRequests([request, ...requests]);
    setIsDialogOpen(false);
    setNewRequest({ type: 'paid', startDate: '', endDate: '', reason: '' });

    toast({
      title: 'Request Submitted!',
      description: 'Your leave request has been submitted for approval.',
    });
  };

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
    toast({
      title: 'Request Approved',
      description: 'The leave request has been approved.',
    });
  };

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
    toast({
      title: 'Request Rejected',
      description: 'The leave request has been rejected.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const filteredRequests = isAdmin
    ? requests
    : requests.filter((r) => r.employeeId === user?.id || r.employeeName === `${user?.firstName} ${user?.lastName}`);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Time Off</h1>
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage leave requests from your team' : 'Apply for leave and track your balance'}
            </p>
          </div>
          {!isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Request Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>New Leave Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Leave Type</Label>
                    <Select
                      value={newRequest.type}
                      onValueChange={(v) => setNewRequest({ ...newRequest, type: v as 'paid' | 'sick' | 'unpaid' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid Time Off</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={newRequest.startDate}
                        onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={newRequest.endDate}
                        onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Textarea
                      placeholder="Please provide a reason for your leave request..."
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {newRequest.type === 'sick' && (
                    <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                      <p className="text-sm text-warning flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Medical certificate required for sick leave
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="hero" className="flex-1" onClick={handleSubmitRequest}>
                      Submit Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Leave Balance for Employees */}
        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries({ paid: 'Paid Time Off', sick: 'Sick Leave', unpaid: 'Unpaid Leave' }).map(
              ([key, label]) => {
                const Icon = leaveTypeIcons[key as keyof typeof leaveTypeIcons];
                const balance = user?.leaveBalance[key as keyof typeof user.leaveBalance] || 0;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 shadow-card"
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      leaveTypeColors[key as keyof typeof leaveTypeColors]
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{label}</p>
                    <p className="text-3xl font-bold">
                      {balance} <span className="text-base font-normal text-muted-foreground">days</span>
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>
        )}

        {/* Leave Requests Table */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
          <h2 className="text-xl font-semibold mb-6">
            {isAdmin ? 'All Leave Requests' : 'My Requests'}
          </h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {isAdmin && <TableHead>Employee</TableHead>}
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  {isAdmin && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const Icon = leaveTypeIcons[request.type];
                  return (
                    <TableRow key={request.id}>
                      {isAdmin && (
                        <TableCell className="font-medium">{request.employeeName}</TableCell>
                      )}
                      <TableCell>
                        <span className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
                          leaveTypeColors[request.type]
                        )}>
                          <Icon className="w-3 h-3" />
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{request.startDate}</p>
                          <p className="text-muted-foreground">to {request.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No leave requests found</p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
