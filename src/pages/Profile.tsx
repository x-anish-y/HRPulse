import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Lock,
  Edit,
  Save,
  DollarSign,
  Shield,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-card">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 ring-4 ring-primary/20">
              <AvatarImage src={user.avatar} alt={user.firstName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg text-muted-foreground">{user.position}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {user.department}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground font-mono">
                  {user.loginId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="resume" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="resume" className="gap-2">
              <User className="w-4 h-4" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="private" className="gap-2">
              <Lock className="w-4 h-4" />
              Private Info
            </TabsTrigger>
            <TabsTrigger value="salary" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Salary Info
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-card space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Work Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Department</Label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.department}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Position</Label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.position}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Join Date</Label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{user.joinDate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Role</Label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Private Info Tab */}
          <TabsContent value="private">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-card space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <Button
                  variant={isEditing ? 'hero' : 'outline'}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{user.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Salary Info Tab */}
          <TabsContent value="salary">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-card space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Salary Information</h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                  Read Only
                </span>
              </div>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Annual Wage</p>
                <p className="text-4xl font-bold text-primary">
                  {formatCurrency(user.salary.wage)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user.salary.wageType === 'monthly' ? 'Monthly' : 'Yearly'} Compensation
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Basic Salary', value: user.salary.basic, positive: true },
                  { label: 'HRA', value: user.salary.hra, positive: true },
                  { label: 'Standard Allowance', value: user.salary.allowance, positive: true },
                  { label: 'Performance Bonus', value: user.salary.bonus, positive: true },
                  { label: 'LTA', value: user.salary.lta, positive: true },
                  { label: 'PF Deduction', value: user.salary.pf, positive: false },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className={`text-lg font-semibold ${item.positive ? '' : 'text-destructive'}`}>
                      {item.positive ? '' : '-'}{formatCurrency(item.value)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-card space-y-6"
            >
              <h2 className="text-xl font-semibold">Security Settings</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
}
