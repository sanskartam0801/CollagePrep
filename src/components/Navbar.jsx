import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { changeUserState, clearLogoutFlag } from '@/redux/slices/Authslice'
import useApiHandler from '@/hooks/useapicall'
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";


const Navbar = () => {

// *********** name convertor**********
  const formatName = (name) => {
    if(name === null || name === undefined || name.trim() === "") 
      return null
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// dicebear image genrator
const student= localStorage.getItem("fullname") ;
console.log("Student Name:", student);

const image_url = useSelector((state) => state.auth.studentImage) || null;
  const studentName = useSelector((state) => state.auth.studentName)

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studentName)}`;
      




  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const apicaller = useApiHandler()
  const [userexist,setuserExist]= useState(false);
  const auth = getAuth();
  // const fullname = Cookies.get("fullname")
  // google image url from google firebase
  // const image_url= useSelector((state)=>state.auth.studentImage)
  
  console.log("Image URL:", image_url);
  
  // ******************* student name*******************

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // check user is logged in or not 
  // 


  

  // Detect large screen for showing welcome text
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const Handlelogout = async () => {
    try {
      // const response = await apicaller("/api/auth/logout", "POST")
      // if (response?.data?.success) {
      //   localStorage.removeItem("token")
     
      signOut(auth);
         dispatch(changeUserState(false))
         dispatch(clearLogoutFlag(true));
        navigate("/")
      }
     catch (e) {
      console.log("some error occured")
    }
  }

  // const isLoggedin = useSelector((state) => state.auth.isLoggedIn)
  // const token = localStorage.getItem("token")

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-primary tracking-wide">
        CollegePrep
      </Link>

      {/* Welcome message for large screen */}
      <span className="text-base font-semibold tracking-wide">
  {isLargeScreen && isLoggedIn && (studentName||student)
    ? `Hey! ${formatName(studentName) || student} You’re just one step away from mastering your semester`
    : ""}
</span>


      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 text-lg font-medium tracking-wide">
  <Link to="/main" className="hover:underline">
    Read
  </Link>
  <Link to="/upload" className="hover:underline">
    Upload
  </Link>
  <Link to="/contact" className="hover:underline">
    Contact Us
  </Link>

  {/* ✅ Image Avatar with Glow */}
  {
    
      isLoggedIn && (
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white shadow-md shadow-blue-400 animate-in">
    <img
      src={image_url || avatarUrl}
      alt="User Avatar"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
      )
    

  }
  

  {!isLoggedIn ? (
    <Link to="/login">
      <Button size="lg" className="cursor-pointer font-semibold tracking-wide">
        Login
      </Button>
    </Link>
  ) : (
    <Button
      size="lg"
      onClick={Handlelogout}
      className="cursor-pointer font-semibold tracking-wide"
    >
      Logout
    </Button>
  )}
</div>

      {/* Mobile hamburger */}
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
            {/* Menu items */}
            <div className="space-y-6">
              <Link
                to="/reading"
                className="block text-lg font-medium hover:underline"
                onClick={() => setOpen(false)}
              >
                Read
              </Link>
              <Link
                to="/upload"
                className="block text-lg font-medium hover:underline"
                onClick={() => setOpen(false)}
              >
                Upload
              </Link>
              <Link
                to="/contact"
                className="block text-lg font-medium hover:underline"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>

              

            



              {


                !isLoggedIn ? (
                  <Link to="/login"><Button className="cursor-pointer" size="lg">Login</Button></Link>
                ) : (<Button className="cursor-pointer" onClick={Handlelogout} size="lg">Logout</Button>)



              }
            </div>

            {/* Logout / Login button fixed at bottom */}
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
