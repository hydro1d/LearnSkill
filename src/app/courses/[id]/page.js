"use client";

import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import coursesData from "@/data/courses.json";
import { Star, Clock, BookOpen, ChevronRight, Play, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const courseId = parseInt(params.id);
    const foundCourse = coursesData.find((c) => c.id === courseId);
    setCourse(foundCourse);
  }, [params.id]);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to access course details!");
      router.push(`/login?redirectTo=/courses/${params.id}`);
    }
  }, [session, isPending, router, params.id]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        <p className="text-stone-500 mt-4 text-sm font-semibold">Validating session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-stone-100 p-8 rounded-3xl text-center max-w-sm shadow-sm">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-stone-900">Access Denied</h3>
          <p className="text-stone-500 text-xs mt-2 leading-relaxed">
            This module requires authentication. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-stone-100 p-8 rounded-3xl text-center max-w-sm shadow-sm">
          <h3 className="text-xl font-bold text-stone-900">Course Not Found</h3>
          <p className="text-stone-500 text-xs mt-2 mb-6">The requested course does not exist in our catalog.</p>
          <Link href="/courses" className="btn btn-sm bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl font-bold">
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success(`Enrolled in: ${course.title}!`);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-orange-600 mb-8 transition-colors font-bold uppercase tracking-wider">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="badge bg-orange-100 text-orange-700 border border-orange-200 py-2 px-3.5 text-xs font-bold rounded-lg">
                {course.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-stone-900 leading-tight">{course.title}</h1>
              <p className="text-stone-600 text-base leading-relaxed font-medium">{course.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Instructor", value: course.instructor, plain: true },
                { label: "Rating", value: `${course.rating.toFixed(1)} / 5.0`, star: true },
                { label: "Duration", value: course.duration, clock: true },
                { label: "Difficulty", value: course.level, orange: true },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-stone-100 p-4 rounded-2xl shadow-sm">
                  <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
                  {item.star ? (
                    <div className="flex items-center text-amber-500 gap-1 mt-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-500" /><span>{item.value}</span>
                    </div>
                  ) : item.clock ? (
                    <div className="flex items-center text-stone-900 gap-1 mt-1 text-sm font-bold">
                      <Clock className="w-4 h-4 text-orange-500" /><span>{item.value}</span>
                    </div>
                  ) : (
                    <p className={`text-sm font-bold mt-1 ${item.orange ? "text-orange-600 uppercase tracking-wide" : "text-stone-900"}`}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Curriculum */}
            <div className="bg-white border border-stone-100 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" /> Course Curriculum
                </h2>
                <p className="text-stone-400 text-xs mt-1">A step-by-step master plan designed for this program.</p>
              </div>
              <div className="space-y-3">
                {course.curriculum && course.curriculum.map((topic, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-stone-50 hover:bg-orange-50/50 border border-stone-100 hover:border-orange-200/50 rounded-2xl transition-all group cursor-pointer">
                    <div className="bg-orange-100 group-hover:bg-orange-200/70 text-orange-700 p-2.5 rounded-xl text-xs font-black min-w-[36px] text-center">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-stone-800 group-hover:text-stone-950 transition-colors">{topic}</h4>
                      <p className="text-stone-400 text-xs mt-0.5">Estimated 3–4 hours of video lessons & labs</p>
                    </div>
                    <Play className="w-4 h-4 text-stone-400 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enroll Card */}
          <div className="bg-white border border-stone-100 p-6 rounded-3xl sticky top-24 shadow-sm">
            <figure className="relative h-44 w-full rounded-2xl overflow-hidden mb-6">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-stone-950/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-105">
                  <Play className="w-5 h-5 fill-stone-900 ml-0.5" />
                </div>
              </div>
            </figure>

            <div className="space-y-2 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900">Free Access</span>
                <span className="text-stone-400 line-through text-sm font-medium">$199.99</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Sponsored by SkillSphere Global Access initiative.</p>
            </div>

            <div className="space-y-3">
              {enrolled ? (
                <button disabled className="w-full btn btn-disabled bg-emerald-50 text-emerald-700 border border-emerald-200 py-3 rounded-2xl font-bold">
                  ✓ Already Enrolled & Active
                </button>
              ) : (
                <button onClick={handleEnroll} className="w-full btn bg-orange-600 hover:bg-orange-500 border-none text-white py-3 rounded-2xl font-bold shadow-lg shadow-orange-600/10">
                  Enroll Now
                </button>
              )}
              <div className="text-[10px] text-stone-400 text-center uppercase tracking-wider font-bold">
                Lifetime Access · Certificate of Completion
              </div>
            </div>

            <div className="border-t border-stone-100 pt-5 mt-5 space-y-2.5 text-xs">
              <span className="font-bold text-stone-900 block mb-2">This course includes:</span>
              {["Full HD On-demand video resources", "12 downloadable curriculum articles", "Interactive coding/design challenges", "Professional Verified Certificate"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-stone-600 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
