"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: () => {},
  otpLoginSend: async () => ({ success: false }),
  otpLoginVerify: async () => ({ success: false }),
  otpLoginResend: async () => ({ success: false }),
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    try {
      supabase.auth.getSession().then((res) => {
        const session = res?.data?.session;
        if (session?.user) {
          enrichUser(session.user).then(setUser);
        }
        setLoading(false);
      }).catch(err => {
        console.error("Failed to get session:", err);
        setLoading(false);
      });
    } catch (err) {
      console.error("Failed to invoke getSession:", err);
      setLoading(false);
    }

    // Listen for auth state changes (login, logout, token refresh)
    let subscription;
    try {
      const authListener = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            const enriched = await enrichUser(session.user);
            setUser(enriched);
          } else {
            setUser(null);
          }
        }
      );
      subscription = authListener?.data?.subscription;
    } catch (err) {
      console.error("Failed to subscribe to auth state changes:", err);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  /**
   * Fetch the user's profile row using the admin client (bypasses broken RLS).
   * Falls back to user_metadata if the DB query fails.
   */
  const enrichUser = async (authUser) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      return {
        ...authUser,
        name:   profile?.name   || authUser.user_metadata?.name  || '',
        phone:  profile?.phone  || authUser.user_metadata?.phone || '',
        role:   profile?.role   || authUser.user_metadata?.role  || 'user',
        status: profile?.status || 'active'
      };
    } catch (err) {
      console.warn("Failed to enrich user profile:", err?.message || err);
      // Fallback: read role from JWT metadata so admin login still works
      return {
        ...authUser,
        name:   authUser.user_metadata?.name  || '',
        phone:  authUser.user_metadata?.phone || '',
        role:   authUser.user_metadata?.role  || 'user',
        status: 'active'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, message: error.message };
      const enriched = await enrichUser(data.user);
      setUser(enriched);
      return { success: true, user: enriched };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone || ''
          }
        }
      });
      if (error) return { success: false, message: error.message };

      // The DB trigger auto-creates the profile row.
      // If user already confirmed (email confirmation disabled), session is available immediately.
      if (data.session) {
        const enriched = await enrichUser(data.user);
        setUser(enriched);
        return { success: true, user: enriched };
      }

      // Email confirmation required — inform the caller
      return {
        success: true,
        user: data.user,
        requiresConfirmation: true,
        message: 'Please check your email to confirm your account before logging in.'
      };
    } catch (err) {
      return { success: false, message: err.message || 'Signup failed. Please try again.' };
    }
  };

  const otpLoginSend = async (identifier) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error.' };
    }
  };

  const otpLoginVerify = async (identifier, otp) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, otp })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Network error.' };
    }
  };

  const otpLoginResend = async (identifier) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: 'Network error.' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, otpLoginSend, otpLoginVerify, otpLoginResend }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
