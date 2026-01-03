import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, employees, demoCredentials } from '@/lib/demoData';

interface AuthContextType {
  user: Employee | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (loginId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Employee | null>(null);

  const login = async (loginId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Demo authentication
    if (loginId === demoCredentials.admin.loginId && password === demoCredentials.admin.password) {
      const adminUser = employees.find((e) => e.loginId === loginId);
      if (adminUser) {
        setUser(adminUser);
        return { success: true };
      }
    }

    if (loginId === demoCredentials.employee.loginId && password === demoCredentials.employee.password) {
      const employeeUser = employees.find((e) => e.loginId === loginId);
      if (employeeUser) {
        setUser(employeeUser);
        return { success: true };
      }
    }

    // Check for any employee match
    const matchedEmployee = employees.find((e) => e.loginId === loginId);
    if (matchedEmployee) {
      // For demo, allow any password for other employees
      if (password.length >= 6) {
        setUser(matchedEmployee);
        return { success: true };
      }
      return { success: false, error: 'Invalid password. Password must be at least 6 characters.' };
    }

    return { success: false, error: 'Invalid login ID. Please check your credentials.' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
