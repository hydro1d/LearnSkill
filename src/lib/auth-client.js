"use client";


import { useState, useEffect } from "react";


const USERS_KEY = "skillsphere_users";
const SESSION_KEY = "skillsphere_session";




const getUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};


const saveUsers = (users) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};




const getSession = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};




const listeners = new Set();




const saveSession = (session) => {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  // Notify all active useSession hooks
  listeners.forEach((l) => l(session));
};


export const authClient = {
  // 1. Reactive Hook for checking and using sessions
  useSession: () => {
    const [session, setSession] = useState(null);
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
      // Set initial session once on mount (client-side)
      setSession(getSession());
      setIsPending(false);


      const handleSessionChange = (newSession) => {
        setSession(newSession);
      };


      listeners.add(handleSessionChange);
      return () => {
        listeners.delete(handleSessionChange);
      };
    }, []);


    return {
      data: session,
      isPending,
      error: null,
      refetch: () => {
        setSession(getSession());
      }
    };
  },


  // 2. Email sign up
  signUp: {
    email: async ({ email, password, name, image }) => {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 600));


      const users = getUsers();
      const userExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());


      if (userExists) {
        return {
          data: null,
          error: { message: "An account with this email already exists." }
        };
      }


      const defaultAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name || email)}`;
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || "Learner",
        email: email.toLowerCase(),
        password, // stored plain for mock authentication validation
        image: image || defaultAvatar,
        createdAt: new Date().toISOString()
      };


      users.push(newUser);
      saveUsers(users);


      return {
        data: {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image
          }
        },
        error: null
      };
    }
  },


  // 3. Email sign in
  signIn: {
    email: async ({ email, password }) => {
      await new Promise((resolve) => setTimeout(resolve, 600));


      const users = getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );


      if (!user) {
        return {
          data: null,
          error: { message: "Invalid email or password. Please try again." }
        };
      }


      const session = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };


      saveSession(session);


      return {
        data: session,
        error: null
      };
    },


    // 4. Social Login (Google only)
    social: async ({ provider }) => {
      await new Promise((resolve) => setTimeout(resolve, 600));


      if (provider !== "google") {
        return {
          data: null,
          error: { message: "Unsupported provider" }
        };
      }


      // Pre-create or retrieve a mock Google user
      const mockGoogleEmail = "google.student@skillsphere.edu";
      const users = getUsers();
      let user = users.find((u) => u.email === mockGoogleEmail);


      if (!user) {
        user = {
          id: "google-12345",
          name: "Alex Mercer",
          email: mockGoogleEmail,
          password: "google-oauth-pass",
          image: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
          createdAt: new Date().toISOString()
        };
        users.push(user);
        saveUsers(users);
      }


      const session = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };


      saveSession(session);


      return {
        data: session,
        error: null
      };
    }
  },


  // 5. Sign out
  signOut: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    saveSession(null);
    return { error: null };
  },


  // 6. Update user info (name, image)
  // Follows documentation: authClient.updateUser({ name: "...", image: "..." })
  updateUser: async ({ name, image }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));


    const currentSession = getSession();
    if (!currentSession || !currentSession.user) {
      return {
        data: null,
        error: { message: "No active session found. Please log in first." }
      };
    }


    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === currentSession.user.id);


    if (userIndex === -1) {
      // Also check if it's the social mock user
      if (currentSession.user.id === "google-12345") {
        const mockUser = {
          id: "google-12345",
          name: name || currentSession.user.name,
          email: currentSession.user.email,
          image: image || currentSession.user.image,
          createdAt: new Date().toISOString()
        };
        users.push(mockUser);
        saveUsers(users);
      } else {
        return {
          data: null,
          error: { message: "User not found in registry." }
        };
      }
    } else {
      if (name) users[userIndex].name = name;
      if (image) users[userIndex].image = image;
      saveUsers(users);
    }


    // Update session user info
    const updatedSession = {
      ...currentSession,
      user: {
        ...currentSession.user,
        ...(name && { name }),
        ...(image && { image })
      }
    };


    saveSession(updatedSession);


    return {
      data: updatedSession.user,
      error: null
    };
  }
};
