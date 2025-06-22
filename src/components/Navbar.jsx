import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Cookie, Menu } from 'lucide-react'
;
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { changeUserState } from '@/redux/slices/Authslice';
import useApiHandler from '@/hooks/useapicall';
// import { UserButton, SignInButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const apicaller= useApiHandler();
 const fullname= Cookies.get("fullname")
 console.log("navbarfull",fullname);

//  windows screen size for span
 const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  
  
  

  const Handlelogout=  async()=>{

    try{
        const response= await apicaller("/api/auth/logout","POST");
        console.log("responselogout",response);
        if(response?.data?.success)
        {
             console.log("logout here");
         localStorage.removeItem("token");

        dispatch(changeUserState(false));
            navigate("/");
        }
        
    }
    catch(e)
    {
      console.log("some error occured");

    }
   
       

    
  };
  
  // const { isSignedIn } = useUser();
  const isLoggedin= useSelector((state)=>state.auth.isLoggedIn)
  const token= localStorage.getItem("token");
  console.log("navbartoken",token);
  
  console.log("ll",isLoggedin);
  


  // 🔄 1. Auto‑redirect: if someone is on '/' AND signs in, push them to '/main'
  
  const location   = useLocation()
  // useEffect(() => {
  //   if (isSignedIn && location.pathname === '/') {
  //     navigate('/main', { replace: true })
  //   }
  // }, [isSignedIn, location.pathname, navigate])

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      {/* Logo — goes to Home if logged out, Main if logged in */}
      
      <Link
        // to={isSignedIn ? '/main' : '/'}
        to="/"
        className="text-2xl font-bold text-primary"
      >
        CollagePrep
      </Link>

        <span className="text-base font-semibold">
      {isLargeScreen && token 
        ? `Hey! ${fullname} You’re just one step away from mastering your semester`
        : ""}
    </span>
      


      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/main" className="text-lg font-medium hover:underline">
          Read
        </Link>
        <Link to="/upload" className="text-lg font-medium hover:underline">
          Upload
        </Link>
        <Link to="/contact" className="text-lg font-medium hover:underline ">
          Contact Us
        </Link>
        {
          token==null ?(
            <Link  to ="/login"><Button className="cursor-pointer" size="lg">Login</Button></Link>
          ):(<Button className="cursor-pointer" onClick={Handlelogout}  size="lg">Logout</Button>)

          

        }
        
         

        {/* Login / profile */}
        {/* {isSignedIn ? (
          <UserButton aftersignoutrrl="/" />
        ) : (
          <SignInButton mode="modal" afterSignInUrl="/main">
            <Button>Login</Button>
          </SignInButton>
        )} */}
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
               {
          token==null ?(
            <Link  to ="/login"><Button className="cursor-pointer" size="lg">Login</Button></Link>
          ):(<Button className="cursor-pointer" onClick={Handlelogout}  size="lg">Logout</Button>)

          

        }
            </div>

            {/* Login / profile (bottom) */}
            {/* <div className="mt-auto pt-6 border-t">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal" afterSignInUrl="/main">
                  <Button className="w-full">Login</Button>
                </SignInButton>
              )}
            </div> */}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
