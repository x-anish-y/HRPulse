import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Building,
  Plane,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { employees, Employee } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

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

const departments = ['All', 'Human Resources', 'Engineering', 'Design', 'Marketing', 'Finance', 'Operations', 'Customer Success'];

export default function Employees() {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.loginId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'All' || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Manage your team members</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="group p-5 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEmployee(employee)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <Avatar className="w-14 h-14 ring-2 ring-border">
                    <AvatarImage src={employee.avatar} alt={employee.firstName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {employee.firstName[0]}{employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-card border border-border shadow-sm">
                    {getStatusIcon(employee.status)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{employee.position}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building className="w-3 h-3" />
                  {employee.department}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
                    employee.status === 'present' && 'status-present',
                    employee.status === 'absent' && 'status-absent',
                    employee.status === 'leave' && 'status-leave'
                  )}
                >
                  {getStatusIcon(employee.status)}
                  {getStatusLabel(employee.status)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employee Count */}
        <p className="text-sm text-muted-foreground text-center">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>

        {/* Employee Profile Dialog */}
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Employee Profile</DialogTitle>
            </DialogHeader>

            {selectedEmployee && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 ring-4 ring-primary/20">
                    <AvatarImage src={selectedEmployee.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h2>
                    <p className="text-muted-foreground">{selectedEmployee.position}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedEmployee.loginId}
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="resume" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="resume" className="flex-1">Resume</TabsTrigger>
                    <TabsTrigger value="private" className="flex-1">Private Info</TabsTrigger>
                    {isAdmin && (
                      <TabsTrigger value="salary" className="flex-1">Salary</TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="resume" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Department</p>
                        <p className="font-medium">{selectedEmployee.department}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Position</p>
                        <p className="font-medium">{selectedEmployee.position}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Join Date</p>
                        <p className="font-medium">{selectedEmployee.joinDate}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-1">Role</p>
                        <p className="font-medium capitalize">{selectedEmployee.role}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="private" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedEmployee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{selectedEmployee.phone}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {isAdmin && (
                    <TabsContent value="salary" className="space-y-4 mt-4">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-muted-foreground">Annual Wage</p>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(selectedEmployee.salary.wage)}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Basic</span>
                            <span>{formatCurrency(selectedEmployee.salary.basic)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">HRA</span>
                            <span>{formatCurrency(selectedEmployee.salary.hra)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Allowance</span>
                            <span>{formatCurrency(selectedEmployee.salary.allowance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bonus</span>
                            <span>{formatCurrency(selectedEmployee.salary.bonus)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">LTA</span>
                            <span>{formatCurrency(selectedEmployee.salary.lta)}</span>
                          </div>
                          <div className="flex justify-between text-destructive">
                            <span>PF Deduction</span>
                            <span>-{formatCurrency(selectedEmployee.salary.pf)}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
}
