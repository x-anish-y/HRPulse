import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, CalendarDays, DollarSign, Shield, Zap, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
const features = [{
  icon: Users,
  title: 'Employee Management',
  description: 'Complete employee lifecycle management from onboarding to offboarding.'
}, {
  icon: Clock,
  title: 'Real-time Attendance',
  description: 'Track check-ins, work hours, and overtime with precision.'
}, {
  icon: CalendarDays,
  title: 'Leave Management',
  description: 'Streamlined leave requests with approval workflows.'
}, {
  icon: DollarSign,
  title: 'Payroll Integration',
  description: 'Automatic salary calculations based on attendance and leaves.'
}, {
  icon: Shield,
  title: 'Role-based Security',
  description: 'Enterprise-grade access control for data protection.'
}, {
  icon: Zap,
  title: 'Lightning Fast',
  description: 'Built for performance with modern architecture.'
}];
const stats = [{
  value: '10K+',
  label: 'Companies Trust Us'
}, {
  value: '500K+',
  label: 'Employees Managed'
}, {
  value: '99.9%',
  label: 'Uptime SLA'
}, {
  value: '4.9★',
  label: 'Customer Rating'
}];
export default function Landing() {
  return <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" style={{
        animationDelay: '2s'
      }} />
      </div>

      {/* Navigation */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-xl">HP</span>
              </div>
              <span className="font-bold text-2xl text-foreground">HRPulse</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hero" size="lg">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">Next-Gen HR Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Empower</span> Your
              <br />
              Workforce Today
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">HRPulse is the all-in-one HRMS that automates employee lifecycle, tracks attendance in real-time, and transforms data into payroll seamlessly.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>

            {/* Demo Credentials */}
            
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }} viewport={{
            once: true
          }} className="text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <br />
              <span className="gradient-text">Manage HR</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From employee onboarding to payroll processing, HRPulse handles it all with enterprise-grade security and beautiful design.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }} viewport={{
            once: true
          }} className="group p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="relative rounded-3xl gradient-primary p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Transform Your HR?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Join thousands of companies that trust HRPulse for their HR management. Get started in minutes, not months.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login">
                  <Button variant="glass" size="xl">
                    Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">HR</span>
              </div>
              <span className="font-bold text-xl">HRPulse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 DayFlow. Built for the future of HR.
            </p>
          </div>
        </div>
      </footer>
    </div>;
}