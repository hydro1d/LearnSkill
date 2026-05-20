import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f7f4ef] border-t border-orange-500/10 text-stone-600 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-600/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900 font-sans">
                Skill<span className="gradient-text font-extrabold">Sphere</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Empowering learners worldwide by providing accessible, elite-grade courses from industry pioneers. Upgrade your skillset, pivot your career, and shape your destiny.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="hover:text-orange-600 transition-colors p-2.5 bg-orange-50 rounded-lg hover:bg-orange-100/60" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors p-2.5 bg-orange-50 rounded-lg hover:bg-orange-100/60" aria-label="Github">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors p-2.5 bg-orange-50 rounded-lg hover:bg-orange-100/60" aria-label="Linkedin">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors p-2.5 bg-orange-50 rounded-lg hover:bg-orange-100/60" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-900 font-bold text-sm tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-600 hover:underline transition-all">Home Page</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-orange-600 hover:underline transition-all">All Courses</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-orange-600 hover:underline transition-all">Student Profile</Link>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 hover:underline transition-all">Top Instructors</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-stone-900 font-bold text-sm tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-600" />
                <span>support@skillsphere.edu</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-600" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span>100 Innovation Way, Tech City, CA</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-4">
            <h3 className="text-stone-900 font-bold text-sm tracking-wider uppercase mb-4">Join Our Journey</h3>
            <p className="text-sm text-stone-500">Subscribe to receive exclusive learning tips, platform updates, and flash course discounts.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="input input-sm input-bordered bg-white border-orange-200 text-stone-800 rounded-xl focus:border-orange-500 focus:outline-none w-full"
              />
              <button className="btn btn-sm btn-primary bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl font-bold shadow-md shadow-orange-600/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-orange-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SkillSphere Academy Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
