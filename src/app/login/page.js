"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Mail, Lock, LogIn, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const redirectTo = searchParams.get("redirectTo") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all credentials."); return; }
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error) toast.error(error.message);
      else { toast.success("Successfully logged in!"); router.push(redirectTo); }
    } catch { toast.error("An unexpected error occurred."); }
    finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({ provider: "google" });
      if (error) toast.error(error.message);
      else { toast.success("Authenticated with Google!"); router.push(redirectTo); }
    } catch { toast.error("Google authentication failed."); }
    finally { setSocialLoading(false); }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-5 group">
            <div className="bg-orange-600 p-2 rounded-xl text-white group-hover:bg-orange-500 transition-colors shadow-md shadow-orange-600/10">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-stone-900">Skill<span className="gradient-text font-black">Sphere</span></span>
          </Link>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">Welcome Back</h2>
          <p className="text-stone-500 text-xs mt-1 font-medium">Sign in to unlock your learning paths.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label py-1"><span className="label-text text-stone-700 text-xs font-bold">Email Address</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400"><Mail className="h-4 w-4" /></div>
              <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full pl-10 bg-stone-50 border-stone-200 text-stone-900 text-sm rounded-2xl focus:border-orange-500 focus:outline-none transition-all placeholder:text-stone-400" required />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1"><span className="label-text text-stone-700 text-xs font-bold">Password</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400"><Lock className="h-4 w-4" /></div>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pl-10 bg-stone-50 border-stone-200 text-stone-900 text-sm rounded-2xl focus:border-orange-500 focus:outline-none transition-all placeholder:text-stone-400" required />
            </div>
          </div>

          <button type="submit" disabled={loading || socialLoading}
            className="w-full btn bg-orange-600 hover:bg-orange-500 border-none text-white rounded-2xl font-bold py-3 mt-2 shadow-md shadow-orange-600/10 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              : <><LogIn className="w-4 h-4" /> Login to Account</>}
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-stone-100"></div>
          <span className="flex-shrink mx-4 text-stone-400 text-xs font-medium">or continue with</span>
          <div className="flex-grow border-t border-stone-100"></div>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading || socialLoading}
          className="w-full btn btn-outline border-stone-200 hover:border-orange-300 hover:bg-orange-50 text-stone-700 rounded-2xl font-bold flex items-center justify-center gap-2.5">
          {socialLoading ? <span className="w-5 h-5 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></span>
            : <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign in with Google
            </>}
        </button>

        <div className="text-center mt-6 text-stone-500 text-xs font-medium">
          Don't have an account?{" "}
          <Link href="/register" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 to-[#fcfaf6] flex items-center justify-center px-4 py-16">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white border border-stone-100 rounded-3xl flex justify-center py-20 shadow-sm">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
