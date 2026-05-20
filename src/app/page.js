"use client";


import Link from "next/link";
import coursesData from "@/data/courses.json";
import { Star, Clock, Award, Users, BookOpenCheck, ArrowRight, ShieldCheck, Flame, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";


export default function Home() {
  // Sort courses by rating descending and take top 3
  const popularCourses = [...coursesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);


  // Trending / New Releases
  const trendingCourses = [...coursesData]
    .filter(course => !popularCourses.some(pop => pop.id === course.id))
    .slice(0, 3);


  const learningTips = [
    {
      title: "The Pomodoro Technique",
      desc: "Study for 25 minutes with intense focus, followed by a 5-minute breather. This keeps your brain fresh and prevents cognitive fatigue.",
      icon: Clock,
      color: "from-orange-50 to-amber-50/50",
      border: "border-orange-200/40",
      iconColor: "text-orange-600 bg-orange-100"
    },
    {
      title: "Active Recall & Spaced Repetition",
      desc: "Test yourself instead of passively re-reading. Review the concepts after 1 day, 3 days, and a week to lock them into long-term memory.",
      icon: BookOpenCheck,
      color: "from-amber-50 to-yellow-50/50",
      border: "border-amber-200/40",
      iconColor: "text-amber-600 bg-amber-100"
    },
    {
      title: "The Feynman Technique",
      desc: "Explain complex subjects in simple terms. If you struggle to explain it to a child, you've identified gaps in your understanding.",
      icon: Award,
      color: "from-rose-50 to-orange-50/40",
      border: "border-rose-200/40",
      iconColor: "text-rose-600 bg-rose-100"
    }
  ];


  const instructors = [
    {
      name: "Dr. Angela Yu",
      role: "Lead Development Expert",
      courses: 14,
      students: "2.4M+",
      image: "https://api.dicebear.com/7.x/micah/svg?seed=Angela",
      badge: "Best Seller"
    },
    {
      name: "Sarah Connor",
      role: "UI/UX Principal Designer",
      courses: 8,
      students: "680K+",
      image: "https://api.dicebear.com/7.x/micah/svg?seed=Sarah",
      badge: "Top Rated"
    },
    {
      name: "Alex Mercer",
      role: "AI & Machine Learning Specialist",
      courses: 11,
      students: "840K+",
      image: "https://api.dicebear.com/7.x/micah/svg?seed=Alex",
      badge: "Community Choice"
    }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-[#fcfaf6]">
      {/* 🎥 Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 bg-gradient-to-b from-orange-50/60 via-[#fcfaf6] to-[#fcfaf6] border-b border-orange-200/10">
       
        {/* Glow Spheres */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse delay-700" />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/50 text-xs font-bold text-orange-700 mb-6 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Elite-Grade Curriculums
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-stone-900 mb-6 font-sans leading-tight"
          >
            Upgrade Your Skills Today <span className="inline-block animate-bounce">🚀</span> <br />
            <span className="gradient-text">Learn from Industry Experts</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-stone-600 mb-10 leading-relaxed font-medium"
          >
            Master web development, premium interface design, and cutting-edge digital marketing. Dive into live-coded workflows and jumpstart your career pivot.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto sm:max-w-none"
          >
            <Link
              href="/courses"
              className="w-full sm:w-auto btn btn-primary bg-orange-600 hover:bg-orange-500 text-white border-none px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-600/10 text-base font-bold group flex items-center justify-center gap-2"
            >
              Explore All Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#learning-tips"
              className="w-full sm:w-auto btn btn-outline border-stone-200 hover:border-orange-500/30 text-stone-700 hover:bg-orange-50/50 hover:text-orange-700 px-8 py-3.5 rounded-2xl text-base font-bold transition-all"
            >
              How it works
            </a>
          </motion.div>
        </div>
      </section>


      {/* 🔥 Popular Courses Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Graduates Favorites</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight font-sans">
              🔥 Popular Courses
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm font-medium">
              Our highest-rated educational paths chosen by thousands of successful graduates.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card bg-white border border-stone-100 rounded-2xl overflow-hidden glass-panel-hover flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <figure className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 badge bg-orange-600/90 text-white border-none py-2 px-3 text-xs font-bold rounded-lg shadow-sm">
                    {course.category}
                  </div>
                </figure>
               
                <div className="card-body p-6 flex flex-col flex-grow">
                  <h3 className="card-title text-lg font-bold text-stone-900 leading-snug hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-stone-500 text-xs mt-1">
                    By <span className="text-stone-800 font-bold">{course.instructor}</span>
                  </p>
                 
                  <p className="text-stone-600 text-sm mt-3 line-clamp-2 flex-grow leading-relaxed">
                    {course.description}
                  </p>


                  <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4 text-stone-600">
                    <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="badge badge-outline border-stone-200 text-stone-600 text-xs py-2 px-2.5 rounded-lg font-bold">
                      {course.level}
                    </div>
                  </div>


                  <div className="card-actions mt-6">
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full btn btn-primary btn-sm bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl shadow-md shadow-orange-600/10 font-bold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 👉 Trending Courses / New Releases (Extra Section) */}
      <section className="py-20 bg-[#fbf9f6] border-y border-orange-200/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-orange-600 font-bold mb-2 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                Hot off the press
              </div>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">
                New & Trending Releases
              </h2>
            </div>
            <Link
              href="/courses"
              className="mt-4 md:mt-0 text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 text-sm font-bold hover:underline"
            >
              See All Releases
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card bg-white border border-stone-100 rounded-2xl overflow-hidden glass-panel-hover flex flex-col h-full shadow-sm hover:shadow-md"
              >
                <figure className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 badge bg-orange-500/90 text-white border-none py-2 px-3 text-xs font-bold rounded-lg shadow-sm">
                    {course.category}
                  </div>
                </figure>
               
                <div className="card-body p-6 flex flex-col flex-grow">
                  <h3 className="card-title text-lg font-bold text-stone-900 leading-snug hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-stone-500 text-xs mt-1">
                    By <span className="text-stone-800 font-bold">{course.instructor}</span>
                  </p>
                 
                  <p className="text-stone-600 text-sm mt-3 line-clamp-2 flex-grow leading-relaxed">
                    {course.description}
                  </p>


                  <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4 text-stone-600">
                    <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="badge badge-outline border-stone-200 text-stone-600 text-xs py-2 px-2.5 rounded-lg font-bold">
                      {course.level}
                    </div>
                  </div>


                  <div className="card-actions mt-6">
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full btn btn-primary btn-sm bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl shadow-md shadow-orange-600/10 font-bold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 📌 Learning Tips Section */}
      <section id="learning-tips" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Smart Learning Systems</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight font-sans">
              📌 Accelerate Your Study Efficiency
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm font-medium">
              Use science-backed techniques to absorb knowledge 3x faster and retain it indefinitely.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningTips.map((tip, idx) => {
              const IconComponent = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`p-8 bg-gradient-to-br ${tip.color} border ${tip.border} rounded-3xl flex flex-col justify-between shadow-sm`}
                >
                  <div>
                    <div className={`p-3.5 rounded-2xl w-fit mb-6 shadow-sm border border-stone-200/20 ${tip.iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">{tip.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                  <div className="mt-8 text-xs text-stone-400 flex items-center gap-1 font-bold uppercase tracking-wider">
                    Learning Strategy #{idx + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 🏆 Top Instructors Section */}
      <section className="py-20 bg-[#fbf9f6] border-t border-orange-200/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Global Educators</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight font-sans">
              🏆 Learn From the Experts
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
            <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm font-medium">
              Our world-class instructors represent leading tech organizations and are dedicated to your learning progress.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((ins, idx) => (
              <motion.div
                key={ins.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-stone-100 p-6 rounded-3xl text-center glass-panel-hover flex flex-col items-center shadow-sm"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-500/10 ring-offset-4 ring-offset-white">
                    <img
                      src={ins.image}
                      alt={ins.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
                    {ins.badge}
                  </span>
                </div>


                <h3 className="text-lg font-bold text-stone-950">{ins.name}</h3>
                <p className="text-orange-600 text-xs font-bold mt-1">{ins.role}</p>


                <div className="grid grid-cols-2 gap-4 w-full border-t border-stone-100 pt-4 mt-6">
                  <div className="text-center border-r border-stone-100">
                    <div className="text-base font-black text-stone-900">{ins.courses}</div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-black text-stone-900">{ins.students}</div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Students</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Wrap-up */}
      <section className="py-20 bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-t border-orange-200/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight">
            Ready to Begin Your Skill Journey?
          </h2>
          <p className="text-stone-600 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Gain certified credentials and lifetime access to curated project modules. There's no better time than now.
          </p>
          <Link
            href="/register"
            className="btn btn-primary bg-orange-600 hover:bg-orange-500 border-none text-white rounded-2xl px-10 py-3.5 shadow-lg shadow-orange-600/10 text-base font-bold"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
