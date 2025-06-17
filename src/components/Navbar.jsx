import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useUser()

  // 🔄 1. Auto‑redirect: if someone is on '/' AND signs in, push them to '/main'
  const navigate   = useNavigate()
  const location   = useLocation()
  useEffect(() => {
    if (isSignedIn && location.pathname === '/') {
      navigate('/main', { replace: true })
    }
  }, [isSignedIn, location.pathname, navigate])

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      {/* Logo — goes to Home if logged out, Main if logged in */}
      <Link
        to={isSignedIn ? '/main' : '/'}
        className="text-2xl font-bold text-primary"
      >
        CollagePrep
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/reading" className="text-sm font-medium hover:underline">
          Read
        </Link>
        <Link to="/upload" className="text-sm font-medium hover:underline">
          Upload
        </Link>
        <Link to="/contact" className="text-sm font-medium hover:underline">
          Contact
        </Link>

        {/* Login / profile */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal" afterSignInUrl="/main">
            <Button>Login</Button>
          </SignInButton>
        )}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-3/4 sm:w-1/2 p-6 flex flex-col justify-between"
          >
            {/* Menu items */}
            <div className="space-y-6">
              <Link to="/reading" className="block text-lg font-medium" onClick={() => setOpen(false)}>
                Read
              </Link>
              <Link to="/upload" className="block text-lg font-medium" onClick={() => setOpen(false)}>
                Upload
              </Link>
              <Link to="/contact" className="block text-lg font-medium" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </div>

            {/* Login / profile (bottom) */}
            <div className="mt-auto pt-6 border-t">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal" afterSignInUrl="/main">
                  <Button className="w-full">Login</Button>
                </SignInButton>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
