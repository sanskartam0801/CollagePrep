import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserState, clearLogoutFlag } from '@/redux/slices/Authslice'
import { getAuth, signOut } from "firebase/auth"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth()

  const studentName = useSelector((state) => state.auth.studentName)
  const image_url = useSelector((state) => state.auth.studentImage) || null
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const fullnameLocal = localStorage.getItem("fullname")

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const formatName = (name) => {
    if (!name || name.trim() === "") return null
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const fallbackAvatar = "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=80&h=80&fit=crop"

  const avatarUrl = image_url
    ? image_url
    : studentName
      ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studentName)}`
      : fallbackAvatar

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const Handlelogout = async () => {
    try {
      signOut(auth)
      dispatch(changeUserState(false))
      dispatch(clearLogoutFlag(true))
      navigate("/")
    } catch (e) {
      console.log(`some error occurred: ${e}`)
    }
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 transition-all"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-blue-600 flex items-center gap-2">
          🎓 <span className="text-gray-900 dark:text-white">College</span>
          <span className="text-yellow-500">Prep</span>
        </span>
      </Link>

      {/* Welcome Message */}
      <span className="hidden lg:block text-sm lg:text-base font-semibold tracking-wide max-w-[40%] truncate -ml-8">
        {isLargeScreen && isLoggedIn && (studentName || fullnameLocal) &&
          `Hey! ${formatName(studentName) || fullnameLocal} — You’re just one step away from mastering your semester`}
      </span>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm sm:text-base font-medium tracking-wide">
        <Link to="/main" className="hover:underline">Main</Link>
        <Link to="/upload" className="hover:underline">Upload</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>

        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-white  cursor-pointer"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={Handlelogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <Link to="/login">
            <Button size="lg" className="cursor-pointer font-semibold tracking-wide">Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-3/4 sm:w-1/2 p-6 flex flex-col justify-between"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          >
            <div className="space-y-6 text-base">
              <Link to="/main" className="block font-medium hover:underline" onClick={() => setOpen(false)}>Main</Link>
              <Link to="/upload" className="block font-medium hover:underline" onClick={() => setOpen(false)}>Upload</Link>
              <Link to="/contact" className="block font-medium hover:underline" onClick={() => setOpen(false)}>Contact</Link>
            </div>

            <div className="mt-auto pt-6 border-t">
              {!isLoggedIn ? (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full font-semibold tracking-wide">Login</Button>
                </Link>
              ) : (
                <Button
                  className="w-full font-semibold tracking-wide"
                  onClick={() => {
                    setOpen(false)
                    Handlelogout()
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
