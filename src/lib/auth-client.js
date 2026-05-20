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

export const authClient = {
  useSession: () => {
    const [session, setSession] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const loadSession = async () => {
      setIsPending(true);
      const { data, error: sessionError } = await request("/api/auth/get-session", {
        method: "GET"
      });
      const normalizedSession = data ? { ...data.session, user: data.user } : null;
      setSession(normalizedSession);
      setError(sessionError);
      setIsPending(false);
    };

    useEffect(() => {
      loadSession();
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
      return request("/api/auth/sign-up/email", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ name, email, password, image })
      });
    }
  },

  signIn: {
    email: async ({ email, password }) => {
      return request("/api/auth/sign-in/email", {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ email, password })
      });
    },

    social: async ({ provider, callbackURL } = {}) => {
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
    const { error } = await request("/api/auth/sign-out", {
      method: "POST"
    });
    return { error };
  },

  updateUser: async ({ name, image }) => {
    return request("/api/auth/update-user", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ name, image })
    });
  }
};
