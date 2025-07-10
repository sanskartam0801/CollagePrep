import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineBookOpen } from "react-icons/hi";

import useFormStore from "@/store/useFormStore";
import useRedirectStore from "@/store/useRedirectStore";
import useApiHandler from "@/hooks/useapicall";

const Main = () => {
  const resetform = useFormStore((state) => state.resetForm);
  const navigate = useNavigate();
  const apicaller = useApiHandler();
  const [subjectarr, setSubjectarr] = useState([]);
  const [searchval, setSearchval] = useState("");

  useEffect(() => {
    const getavaialblesubjects = async () => {
      const response = await apicaller("/api/auth/getuploadedsibject", "GET");
      if (response?.data?.success) {
        setSubjectarr(response?.data?.subjectarray);
      }
    };
    getavaialblesubjects();
  }, []);

  useEffect(() => {
    resetform();
  }, []);

  const {
    subject,
    setSubject,
    setFormFilled,
    errorMessage,
    clearError,
  } = useFormStore();

  const { message, clearMessage } = useRedirectStore();
  const [_, setSubmitted] = useState(false);

  useEffect(() => {
    if (message) {
      toast.error(message);
      clearMessage();
    }
  }, [message, clearMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      clearError();
    }
  }, [errorMessage, clearError]);

  const handleNext = (selectedSubject = subject) => {
    setSubmitted(true);
    if (!selectedSubject.trim()) {
      toast.error("⚠️ Subject is required.");
      return;
    }
    setSubject(selectedSubject);
    setFormFilled(true);
    // toast.success("✅ Form submitted successfully!");
    setTimeout(() => {
      navigate("/reading");
    }, 500);
  };

  const filteredSubjects = subjectarr.filter((subject) =>
    subject.toLowerCase().includes(searchval.toLowerCase())
  );

  return (
    <div className="pt-8 pb-24 space-y-24">
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 max-w-5xl mx-auto min-h-[80vh] py-8">
        <div className="w-full bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 space-y-6 transition-all">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              📘 Explore Subjects with Ease
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Tap on a subject to dive into detailed resources instantly
            </p>
          </div>

          <div className="mt-6">
            <input
              type="search"
              value={searchval}
              onChange={(e) => setSearchval(e.target.value)}
              placeholder="Search subjects..."
              className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-100 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-800">
            {(searchval.trim() === '' ? subjectarr : filteredSubjects).map(
              (subject, index) => (
                <li
                  key={index}
                  onClick={() => handleNext(subject)}
                  className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-gray-800 dark:text-white rounded-xl shadow-sm hover:bg-blue-100 dark:hover:bg-zinc-700 transition-all duration-200 cursor-pointer"
                >
                  <HiOutlineBookOpen className="text-lg text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-sm sm:text-base">
                    {subject}
                  </span>
                </li>
              )
            )}
            {searchval.trim() !== '' && filteredSubjects.length === 0 && (
              <li className="px-4 py-2 italic text-gray-500 dark:text-gray-400">
                No subjects found.
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center">Why use CollagePrep?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">All-In-One Resources</h3>
            <p>
              Access books, PYQs, notes, and YouTube links — all structured and
              branch-wise.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
            <p>
              Skip the search. Find everything organized by semester and subject
              instantly.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Always Available</h3>
            <p>
              Study anytime, anywhere. Resources are available 24/7 on all
              devices.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Helping thousands of students like you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <p className="text-lg italic">
              "I cleared my backlogs just by using the materials from
              CollagePrep! It's a game changer."
            </p>
            <p className="text-right mt-4 font-semibold">
              – Ravi S, B.Tech 3rd Year
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <p className="text-lg italic">
              "No more WhatsApp groups and confusion. Everything is clean and
              accessible here."
            </p>
            <p className="text-right mt-4 font-semibold">
              – Anjali M, MCA 1st Year
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;

