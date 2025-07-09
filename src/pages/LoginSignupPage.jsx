import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/utilities/toastutils";
import { changeUserState, setStudentImage, setStudentName } from "@/redux/slices/Authslice";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 🔐 Email/password submit
  const onSubmit = async (formData) => {
    if (!isLogin && formData.password !== formData.confirmpassword) {
      return showErrorToast("Passwords do not match");
    }

    try {
      if (isLogin) {
        showLoadingToast("Logging in...");
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        dispatch(changeUserState(true));
        dispatch(setStudentName(userCredential.user.displayName || "Student"));
        console.log("userCredential", userCredential);

        localStorage.setItem("fullname", userCredential.user.displayName || "Student");
        showSuccessToast("Login successful");
        navigate("/main");
      } else {
        showLoadingToast("Signing up...");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(userCredential.user, {
          displayName: formData.fullname,
        });

        dispatch(changeUserState(true));
        dispatch(setStudentName(formData.fullname));
        showSuccessToast("Signup successful");
        navigate("/main");
      }
    } catch (error) {
      showErrorToast(error.message || "Something went wrong");
    }
  };

  // 🔐 Google Auth handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken(); // if needed for backend auth
      dispatch(setStudentName(user.displayName));
      dispatch(setStudentImage(user.photoURL));
      dispatch(changeUserState(true));
      showSuccessToast("Logged in with Google");
      navigate("/main");
    } catch (error) {
      showErrorToast(error.message || "Google Sign-in failed");
    }
  };

  return (
    <div className="bg-white text-gray-800 pb-24">
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* ✅ Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent>
              <h2 className="text-2xl font-bold text-center mb-4">
                {isLogin ? "Login to CollagePrep" : "Sign Up for CollagePrep"}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {!isLogin && (
                  <div className="flex flex-col gap-1.5">
                    <Label>Student Name</Label>
                    <Input
                      {...register("fullname", { required: "Name is required" })}
                      placeholder="Your full name"
                    />
                    {errors.fullname && (
                      <p className="text-sm text-red-500">{errors.fullname.message}</p>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <Label>Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    placeholder="••••••••"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="flex flex-col gap-1.5 relative">
                    <Label>Confirm Password</Label>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmpassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}
                      placeholder="••••••••"
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                    {errors.confirmpassword && (
                      <p className="text-sm text-red-500">{errors.confirmpassword.message}</p>
                    )}
                  </div>
                )}

                <Button className="w-full" type="submit">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </form>

              <Button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 mt-5 w-full text-base font-medium"
              >
                <FcGoogle className="text-xl" />
                {isLogin ? "Login with Google" : "Sign up with Google"}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  className="text-indigo-600 hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://illustrations.popsy.co/gray/studying.svg"
            alt="Student Illustration"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default LoginSignupPage;
