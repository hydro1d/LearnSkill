"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import coursesData from "@/data/courses.json";
import { Search, Star, Clock, Filter, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(coursesData);
      setLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Development", "Design", "Marketing"];

  const getCategoryCount = (category) => {
    if (category === "All") return coursesData.length;
    return coursesData.filter((c) => c.category === category).length;
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Browse Programs</span>
          <h1 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight mt-2">
            Explore Our <span className="gradient-text">Elite Curriculums</span>
          </h1>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm md:text-base font-medium">
            Search and filter expert-led courses across multiple modern digital disciplines.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white border border-stone-100 p-5 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">

          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search courses by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10 bg-stone-50 border-stone-200 text-stone-900 rounded-xl focus:border-orange-500 focus:outline-none transition-all placeholder:text-stone-400 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-orange-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            <span className="text-stone-400 text-xs font-bold mr-1 hidden md:flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/10"
                    : "bg-stone-50 text-stone-600 border border-stone-200 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {category}
                <span className={`badge badge-sm py-0 px-1.5 rounded-md border-none font-bold text-[10px] ${
                  selectedCategory === category
                    ? "bg-white/20 text-white"
                    : "bg-stone-200 text-stone-600"
                }`}>
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-white border border-stone-100 rounded-2xl overflow-hidden flex flex-col h-full animate-pulse shadow-sm">
                <div className="h-48 w-full bg-stone-100" />
                <div className="p-6 flex-grow flex flex-col space-y-4">
                  <div className="h-3 bg-stone-100 rounded-md w-1/4" />
                  <div className="h-5 bg-stone-100 rounded-md w-3/4" />
                  <div className="h-14 bg-stone-100 rounded-md w-full" />
                  <div className="flex justify-between items-center border-t border-stone-50 pt-4">
                    <div className="h-4 bg-stone-100 rounded-md w-1/5" />
                    <div className="h-4 bg-stone-100 rounded-md w-1/5" />
                  </div>
                  <div className="h-9 bg-stone-100 rounded-md w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredCourses.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <motion.div
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
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
                      <h2 className="card-title text-lg font-bold text-stone-900 leading-snug hover:text-orange-600 transition-colors">
                        {course.title}
                      </h2>
                      <p className="text-stone-500 text-xs mt-1">
                        By <span className="text-stone-800 font-bold">{course.instructor}</span>
                      </p>

                      <p className="text-stone-600 text-sm mt-3 line-clamp-2 flex-grow leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4">
                        <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center text-stone-500 gap-1 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5" />
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-white border border-stone-100 rounded-3xl max-w-md mx-auto shadow-sm"
              >
                <AlertCircle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-stone-900">No courses found</h3>
                <p className="text-stone-500 text-xs mt-2 px-6 leading-relaxed">
                  We couldn't find any courses matching "{searchQuery}" in category "{selectedCategory}". Try adjusting your filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="btn btn-xs btn-outline border-orange-300 hover:bg-orange-50 text-orange-700 rounded-lg mt-6 font-bold"
                >
                  Reset all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}
