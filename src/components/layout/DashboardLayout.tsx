import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, CalendarDays, LayoutDashboard, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
interface DashboardLayoutProps {
  children: ReactNode;
}
const navItems = [{
  name: 'Dashboard',
  href: '/dashboard',
  icon: LayoutDashboard
}, {
  name: 'Employees',
  href: '/employees',
  icon: Users
}, {
  name: 'Attendance',
  href: '/attendance',
  icon: Clock
}, {
  name: 'Time Off',
  href: '/time-off',
  icon: CalendarDays
}];
export function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const {
    user,
    logout,
    isAdmin
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  return <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-lg">HP</span>
              </div>
              <span className="font-bold text-xl text-foreground">HRPulse</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              // Hide Employees tab for non-admin users
              if (item.href === '/employees' && !isAdmin) return null;
              return <Link key={item.name} to={item.href} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200', isActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}>
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>;
            })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} alt={user?.firstName} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user ? getInitials(user.firstName, user.lastName) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm font-medium">
                      {user?.firstName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {user?.role === 'admin' ? 'HR Admin' : 'Employee'}
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/50 md:hidden">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map(item => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            if (item.href === '/employees' && !isAdmin) return null;
            return <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)} className={cn('flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all', isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}>
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>;
          })}
            </nav>
          </motion.div>}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>;
}