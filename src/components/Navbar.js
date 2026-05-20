"use client";


import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { BookOpen, LogOut, User, Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "Logout failed. Please try again.");
        return;
      }
      toast.success("Successfully logged out!");
      window.location.href = "/";
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "My Profile", href: "/profile" },
  ];


  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };


  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-orange-500/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-orange-600 p-2 rounded-xl group-hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900 font-sans">
                Skill<span className="gradient-text font-black">Sphere</span>
              </span>
            </Link>
          </div>


          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-700 shadow-sm border border-orange-100"
                    : "text-stone-600 hover:text-orange-600 hover:bg-orange-50/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>


          {/* Right-side Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-2 group">
                  <div className="avatar ring-2 ring-orange-500 ring-offset-2 ring-offset-white rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105">
                    <div className="w-8 h-8 relative">
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = "https://api.dicebear.com/7.x/initials/svg?seed=" + session.user.name;
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-stone-700 group-hover:text-orange-600 transition-colors max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-ghost hover:bg-rose-50 hover:text-rose-600 text-stone-500 gap-1.5 rounded-xl border border-stone-200/60"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="btn btn-sm btn-ghost text-stone-600 hover:text-orange-600 rounded-xl font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm btn-primary bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl shadow-md shadow-orange-600/10 font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-stone-500 hover:text-orange-600 hover:bg-orange-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-orange-100 shadow-lg animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-700 border border-orange-100"
                    : "text-stone-600 hover:text-orange-600 hover:bg-orange-50/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-orange-50 px-4">
            {isPending ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
              </div>
            ) : session ? (
              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-orange-50/50"
                >
                  <img
                    className="h-10 w-10 rounded-full ring-2 ring-orange-500 ring-offset-2 ring-offset-white object-cover"
                    src={session.user.image}
                    alt={session.user.name}
                    onError={(e) => {
                      e.target.src = "https://api.dicebear.com/7.x/initials/svg?seed=" + session.user.name;
                    }}
                  />
                  <div>
                    <div className="text-base font-bold text-stone-800">{session.user.name}</div>
                    <div className="text-sm font-medium text-stone-500">{session.user.email}</div>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full btn btn-sm btn-ghost hover:bg-rose-50 hover:text-rose-600 text-stone-500 justify-start gap-2 rounded-xl border border-stone-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm btn-ghost text-stone-600 border border-stone-200 rounded-xl justify-center font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-sm btn-primary bg-orange-600 hover:bg-orange-500 border-none text-white rounded-xl justify-center shadow-md shadow-orange-600/10 font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


