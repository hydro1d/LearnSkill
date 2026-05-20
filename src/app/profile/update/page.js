"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { User, Image, Save, ArrowLeft, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  // Populate form with existing user data when session is loaded
  useEffect(() => {
    if (session && session.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  // Protected Route Check
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to update your profile.");
      router.push("/login?redirectTo=/profile/update");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setUpdating(true);
    try {
      // Invokes exact BetterAuth pattern: authClient.updateUser({ name, image })
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || undefined
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Profile information updated successfully!");
        router.push("/profile");
      }
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        <p className="text-slate-400 mt-4 text-sm font-semibold">Loading current record...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center px-4">
        <div className="glass-panel border-white/5 p-8 rounded-3xl text-center max-w-sm">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-white">Access Denied</h3>
          <p className="text-slate-400 text-xs mt-2">
            Please log in to edit your account. Redirecting you to the login gateway...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center px-4 relative py-20">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] animate-pulse delay-500"></div>

      <div className="w-full max-w-md p-8 glass-panel border-white/5 rounded-3xl shadow-2xl relative overflow-hidden z-10">
        
        {/* Back navigation */}
        <Link 
          href="/profile" 
          className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
        </Link>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Update Information</h2>
          <p className="text-slate-400 text-xs mt-1">Modify your student credentials and visual avatar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Name input */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-slate-300 text-xs font-semibold">Profile Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full pl-10 bg-slate-900/60 border-white/10 text-white text-sm rounded-2xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          {/* Photo Image URL input */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-slate-300 text-xs font-semibold">Avatar Image URL</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Image className="h-4 w-4" />
              </div>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input input-bordered w-full pl-10 bg-slate-900/60 border-white/10 text-white text-sm rounded-2xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Live Preview section */}
          {imageUrl && (
            <div className="border border-white/5 bg-slate-950/40 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/15">
                <img 
                  src={imageUrl} 
                  alt="Avatar preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/initials/svg?seed=Err";
                  }}
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Live Avatar Preview</span>
                <span className="text-slate-300 text-xs truncate max-w-[200px] block">{imageUrl}</span>
              </div>
            </div>
          )}

          {/* Update button */}
          <button
            type="submit"
            disabled={updating}
            className="w-full btn btn-primary bg-indigo-600 hover:bg-indigo-500 border-none text-white rounded-2xl font-bold py-3 mt-4 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {updating ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Information
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
