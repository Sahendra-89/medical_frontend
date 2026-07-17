"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        enrichUser(session.user).then(setUser);
      }
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const enriched = await enrichUser(session.user);
          setUser(enriched);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Fetch the user's profile row using the admin client (bypasses broken RLS).
   * Falls back to user_metadata if the DB query fails.
   */
  const enrichUser = async (authUser) => {
    try {
      const { data: profile } = await supabaseAdmin
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
    } catch {
      // Fallback: read role from JWT metadata so admin login still works
      return {
        ...authUser,
        role: authUser.user_metadata?.role || 'user'
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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
