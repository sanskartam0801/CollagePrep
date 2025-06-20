import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApiHandler from "@/hooks/useapicall";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { changeUserState } from "@/redux/slices/Authslice";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/utilities/toastutils";
import { Eye, EyeOff } from "lucide-react";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const apicaller = useApiHandler();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    if (!isLogin && formData.password !== formData.confirmpassword) {
      return showErrorToast("Passwords do not match");
    }

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
        };

    const url = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await apicaller(url, "POST", payload);
      console.log("res", response);

      const token = response?.data?.token;
      console.log("token", token);

      localStorage.setItem("token", token);

      dispatch(changeUserState(true));
      navigate("/main");
    } catch (e) {
      showErrorToast(e.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white text-gray-800 pb-24 overflow-y-hidden">
      <section className="flex flex-col md:flex-row min-h-screen">
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
                      type="text"
                      {...register("fullname", {
                        required: "Full name is required",
                      })}
                      placeholder="Your name"
                    />
                    {errors.fullname && (
                      <span className="text-red-500 text-sm">
                        {errors.fullname.message}
                      </span>
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
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
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
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="••••••••"
                  />
                  <span
                    className="absolute right-3 top-1/2 transform  cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>

                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
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
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      placeholder="••••••••"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform cursor-pointer text-gray-500"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </span>

                    {errors.confirmpassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confirmpassword.message}
                      </span>
                    )}
                  </div>
                )}

                <Button className="w-full" type="submit">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
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

        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src="https://illustrations.popsy.co/gray/studying.svg"
            alt="Student Illustration"
            className="w-full h-full rounded-xl shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default LoginSignupPage;
