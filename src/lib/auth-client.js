"use client";

import { useState, useEffect } from "react";

const jsonHeaders = { "Content-Type": "application/json" };

const parseResponse = async (response) => {
  let body = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    body = await response.json();
  }
  if (!response.ok) {
    return {
      data: null,
      error: { message: body?.message || body?.error || response.statusText || "Request failed" }
    };
  }
  return {
    data: body,
    error: null
  };
};

const request = async (path, options = {}) => {
  const response = await fetch(path, {
    credentials: "include",
    ...options
  });
  return parseResponse(response);
};

// --- Mock LocalStorage Auth Implementation ---
const getUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem("skillsphere_users");
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("skillsphere_users", JSON.stringify(users));
};

const getSession = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("skillsphere_session");
  return session ? JSON.parse(session) : null;
};

const saveSession = (session) => {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem("skillsphere_session", JSON.stringify(session));
  } else {
    localStorage.removeItem("skillsphere_session");
  }
  listeners.forEach((l) => l(session));
};

const listeners = new Set();

const checkMockAuth = async () => {
  if (typeof window === "undefined") return false;

  if (window.__USE_MOCK_AUTH__ !== undefined) {
    return window.__USE_MOCK_AUTH__;
  }

  const cachedDecision = sessionStorage.getItem("skillsphere_use_mock_auth");
  if (cachedDecision !== null) {
    window.__USE_MOCK_AUTH__ = cachedDecision === "true";
    return window.__USE_MOCK_AUTH__;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch("/api/auth/get-session", {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const useMock = response.status === 500;
    window.__USE_MOCK_AUTH__ = useMock;
    sessionStorage.setItem("skillsphere_use_mock_auth", String(useMock));
    return useMock;
  } catch (e) {
    window.__USE_MOCK_AUTH__ = true;
    sessionStorage.setItem("skillsphere_use_mock_auth", "true");
    return true;
  }
};

export const authClient = {
  useSession: () => {
    const [session, setSession] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const loadSession = async () => {
      setIsPending(true);
      const useMock = await checkMockAuth();

      if (useMock) {
        setSession(getSession());
        setError(null);
        setIsPending(false);
        return;
      }

      const { data, error: sessionError } = await request("/api/auth/get-session", {
        method: "GET"
      });

      if (sessionError) {
        window.__USE_MOCK_AUTH__ = true;
        sessionStorage.setItem("skillsphere_use_mock_auth", "true");
        setSession(getSession());
        setError(null);
        setIsPending(false);
        return;
      }

      const normalizedSession = data ? { ...data.session, user: data.user } : null;
      setSession(normalizedSession);
      setError(sessionError);
      setIsPending(false);
    };

    useEffect(() => {
      loadSession();

      const handleSessionChange = (newSession) => {
        if (typeof window !== "undefined" && window.__USE_MOCK_AUTH__) {
          setSession(newSession);
        }
      };

      listeners.add(handleSessionChange);
      return () => {
        listeners.delete(handleSessionChange);
      };
    }, []);

    return {
      data: session,
      isPending,
      error,
      refetch: loadSession
    };
  },

  signUp: {
    email: async ({ name, email, password, image }) => {
      const useMock = await checkMockAuth();
      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
          password,
          image: image || defaultAvatar,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        const session = {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image
          },
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        saveSession(session);

        return {
          data: session,
          error: null
        };
      }

      return request("/api/auth/sign-up/email", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ name, email, password, image })
      });
    }
  },

  signIn: {
    email: async ({ email, password }) => {
      const useMock = await checkMockAuth();
      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 500));
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
      }

      return request("/api/auth/sign-in/email", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ email, password })
      });
    },

    social: async ({ provider, callbackURL } = {}) => {
      const useMock = await checkMockAuth();
      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (provider !== "google") {
          return {
            data: null,
            error: { message: "Unsupported provider" }
          };
        }

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

        if (callbackURL) {
          window.location.assign(callbackURL);
        } else {
          window.location.assign("/");
        }

        return { data: session, error: null };
      }

      const { data, error } = await request("/api/auth/sign-in/social", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ provider, disableRedirect: true, callbackURL: callbackURL || "/" })
      });

      if (error) return { data: null, error };
      if (data?.url) {
        window.location.assign(data.url);
        return { data, error: null };
      }

      return { data, error: null };
    }
  },

  signOut: async () => {
    const useMock = await checkMockAuth();
    if (useMock) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      saveSession(null);
      return { error: null };
    }

    const { error } = await request("/api/auth/sign-out", {
      method: "POST"
    });
    return { error };
  },

  updateUser: async ({ name, image }) => {
    const useMock = await checkMockAuth();
    if (useMock) {
      await new Promise((resolve) => setTimeout(resolve, 300));
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

    return request("/api/auth/update-user", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ name, image })
    });
  }
};
