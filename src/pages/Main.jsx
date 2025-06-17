import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import mainHero from "@/assets/hero-section-image2.jpg";

import useFormStore from "@/store/useFormStore";
import useRedirectStore from "@/store/useRedirectStore";
import { useAuth } from "@clerk/clerk-react";

const Main = () => {
  const navigate = useNavigate();
  const { getToken, isSignedIn } = useAuth();

  const {
    course,
    semester,
    branch,
    subject,
    setCourse,
    setSemester,
    setBranch,
    setSubject,
    setFormFilled,
    errorMessage,
    clearError,
  } = useFormStore();

  const { message, clearMessage } = useRedirectStore();
  const [_, setSubmitted] = useState(false);

  // Show redirect message immediately
  useEffect(() => {
    if (message) {
      toast.error(message);
      clearMessage();
    }
  }, [message, clearMessage]);

  // Show error messages from form store
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      clearError();
    }
  }, [errorMessage, clearError]);

  // Send Clerk token to backend
  useEffect(() => {
    const sendToken = async () => {
      if (!isSignedIn) return;

      const token = await getToken();
      try {
        await fetch("http://localhost:5000/api/secure", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: "Token from frontend" }),
        });
      } catch (err) {
        console.error("Failed to send token:", err);
      }
    };

    sendToken();
  }, [getToken, isSignedIn]);

  // Handle form submission
  const handleNext = () => {
    setSubmitted(true);

    if (!course || !semester || !branch.trim() || !subject.trim()) {
      toast.error("⚠️ All fields are required to proceed.");
      return;
    }

    setFormFilled(true);
    toast.success("✅ Form submitted successfully!");

    setTimeout(() => {
      navigate("/reading");
      setCourse("");
      setSemester("");
      setBranch("");
      setSubject("");
    }, 500);
  };

  return (
    <div className="pt-8 pb-24 space-y-24">
      {/* Hero Section with Form */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">Get Started with Resources</h2>
          <div className="space-y-4">
            <div>
              <Label>Select Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="barch">B.Arch</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Select Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Branch</Label>
              <Input
                type="text"
                placeholder="Enter branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <Button className="w-full mt-4" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src={mainHero}
            alt="Study Resources"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center">Why use CollagePrep?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">All-In-One Resources</h3>
            <p>
              Access books, PYQs, notes, and YouTube links — all structured and branch-wise.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
            <p>
              Skip the search. Find everything organized by semester and subject instantly.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Always Available</h3>
            <p>
              Study anytime, anywhere. Resources are available 24/7 on all devices.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Helping thousands of students like you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <p className="text-lg italic">
              "I cleared my backlogs just by using the materials from CollagePrep! It's a game changer."
            </p>
            <p className="text-right mt-4 font-semibold">– Ravi S, B.Tech 3rd Year</p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <p className="text-lg italic">
              "No more WhatsApp groups and confusion. Everything is clean and accessible here."
            </p>
            <p className="text-right mt-4 font-semibold">– Anjali M, MCA 1st Year</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
