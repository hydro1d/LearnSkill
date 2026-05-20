"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Mail, Calendar, Edit3, Award, BookOpen, ShieldAlert } from "lucide-react";
import coursesData from "@/data/courses.json";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view your profile.");
      router.push("/login?redirectTo=/profile");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) setEnrolledCourses(coursesData.slice(0, 2));
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        <p className="text-stone-500 mt-4 text-sm font-semibold">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-stone-100 p-8 rounded-3xl text-center max-w-sm shadow-sm">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-stone-900">Access Denied</h3>
          <p className="text-stone-500 text-xs mt-2 leading-relaxed">Please log in to view your student portfolio.</p>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#fcfaf6] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Banner */}
        <div className="bg-white border border-stone-100 p-8 rounded-3xl mb-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-orange-500/30 ring-offset-4 ring-offset-white">
              <img src={user.image} alt={user.name} className="w-full h-full object-cover"
                onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`; }} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-orange-600 p-2 rounded-full border-2 border-white text-white shadow-md">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow text-center md:text-left space-y-3">
            <div>
              <span className="badge bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider">
                Elite Student
              </span>
              <h1 className="text-3xl font-black text-stone-900 mt-2 tracking-tight">{user.name}</h1>
              <p className="text-stone-500 text-sm flex items-center justify-center md:justify-start gap-1.5 mt-1 font-medium">
                <Mail className="w-4 h-4 text-stone-400" /> {user.email}
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-5 text-stone-500 text-xs pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-orange-500" /> Joined: May 2026
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-orange-500" /> 2 Active Courses
              </span>
            </div>
          </div>

          {/* Update CTA */}
          <Link href="/profile/update"
            className="w-full md:w-auto btn btn-outline border-stone-200 hover:border-orange-400 hover:bg-orange-50 text-stone-700 hover:text-orange-700 px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group flex-shrink-0">
            <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Update Profile
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Enrolled Programs
            </h3>
            {enrolledCourses.map((course) => (
              <div key={course.id}
                className="bg-white border border-stone-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5 hover:border-orange-200/60 hover:shadow-sm transition-all shadow-sm">
                <img src={course.image} alt={course.title} className="w-24 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-grow text-center sm:text-left">
                  <span className="text-[10px] uppercase font-black text-orange-600 tracking-wider">{course.category}</span>
                  <h4 className="font-black text-stone-900 text-base mt-0.5">{course.title}</h4>
                  <p className="text-stone-500 text-xs mt-1 font-medium">Instructor: {course.instructor}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-grow bg-stone-100 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full transition-all" style={{ width: course.id === 1 ? "45%" : "20%" }}></div>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold whitespace-nowrap">
                      {course.id === 1 ? "45%" : "20%"} Complete
                    </span>
                  </div>
                </div>
                <Link href={`/courses/${course.id}`}
                  className="w-full sm:w-auto btn btn-sm bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl font-bold shadow-sm">
                  Resume
                </Link>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="bg-white border border-stone-100 p-6 rounded-3xl space-y-5 shadow-sm">
            <h3 className="text-lg font-black text-stone-900">Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-orange-50/60 p-3 rounded-2xl border border-orange-100/50">
                <div className="p-3 bg-amber-100 rounded-xl text-amber-600"><Award className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-stone-800 text-xs">Beta Pioneer Badge</h4>
                  <p className="text-stone-500 text-[10px] font-medium">Granted for early registration.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-stone-50 p-3 rounded-2xl border border-stone-100 opacity-50">
                <div className="p-3 bg-stone-100 rounded-xl text-stone-400"><Award className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-stone-600 text-xs">First Course Completed</h4>
                  <p className="text-stone-400 text-[10px] font-medium">Complete any program course.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-4 space-y-1 text-xs text-stone-500 leading-relaxed">
              <span className="font-black text-stone-800 block text-sm">Learning Insights</span>
              <p className="font-medium">Your top category is <span className="text-orange-600 font-black">Development</span>. You excel using the <span className="text-emerald-600 font-black">Pomodoro Technique</span>. Keep it up!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
