import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { demoCredentials } from '@/lib/demoData';
export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(loginId, password);
    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.'
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Authentication Failed',
        description: result.error || 'Invalid credentials. Please try again.',
        variant: 'destructive'
      });
    }
    setIsLoading(false);
  };
  const fillDemoCredentials = (type: 'admin' | 'employee') => {
    if (type === 'admin') {
      setLoginId(demoCredentials.admin.loginId);
      setPassword(demoCredentials.admin.password);
    } else {
      setLoginId(demoCredentials.employee.loginId);
      setPassword(demoCredentials.employee.password);
    }
  };
  return <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <Link to="/" className="flex items-center gap-3 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }}>
                <div className="w-24 h-24 rounded-3xl bg-primary-foreground/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <span className="text-5xl font-bold text-primary-foreground">D</span>
                </div>
                <h1 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to HRPulse</h1>
                <p className="text-lg text-primary-foreground/80 max-w-sm">
                  Your next-generation HR management platform designed for modern teams.
                </p>
              </motion.div>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60 text-center">
            © 2026 DayFlow. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.6
      }} className="w-full max-w-md">
          {/* Mobile Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-2xl">DayFlow</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Sign In</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loginId">Login ID</Label>
              <Input id="loginId" type="text" placeholder="Enter your login ID" value={loginId} onChange={e => setLoginId(e.target.value)} className="h-12" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </> : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={() => fillDemoCredentials('admin')} className="flex flex-col items-center py-4 h-auto">
                <span className="text-xs text-muted-foreground mb-1">Admin</span>
                <span className="font-medium">HR Officer</span>
              </Button>
              <Button type="button" variant="outline" onClick={() => fillDemoCredentials('employee')} className="flex flex-col items-center py-4 h-auto">
                <span className="text-xs text-muted-foreground mb-1">Employee</span>
                <span className="font-medium">Staff Member</span>
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-8">
            Employees cannot self-register. Contact HR for access.
          </p>
        </motion.div>
      </div>
    </div>;
}