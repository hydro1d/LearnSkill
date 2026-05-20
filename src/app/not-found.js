"use client";


import Link from "next/link";
import { Compass, GraduationCap, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";


export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#0b0f19] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-500"></div>


      <div className="text-center z-10 space-y-6 max-w-md">
       
        {/* Animated Compass Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="bg-indigo-600/10 p-5 rounded-full border border-indigo-500/20 text-indigo-400 w-fit mx-auto shadow-inner"
        >
          <Compass className="h-14 w-14" />
        </motion.div>


        {/* Brand */}
        <div className="inline-flex items-center space-x-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-wider uppercase font-sans">
            SkillSphere Gateway
          </span>
        </div>


        {/* Headings */}
        <div>
          <h1 className="text-6xl font-black text-white">404</h1>
          <h2 className="text-xl font-bold text-slate-200 mt-2">Pathway Lost in Space</h2>
          <p className="text-slate-400 text-xs mt-3 leading-relaxed">
            The page or curriculum module you are trying to access doesn't exist, has been archived, or moved to another learning orbit.
          </p>
        </div>


        {/* Actions */}
        <div className="pt-4">
          <Link
            href="/"
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-500 border-none text-white rounded-2xl px-6 py-3 font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 w-fit mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home Orbit
          </Link>
        </div>


      </div>
    </div>
  );
}


