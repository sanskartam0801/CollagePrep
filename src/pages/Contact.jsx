import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !year || !department || !query) {
      toast.error("⚠️ Please fill all the fields.");
      return;
    }

    // Simulated submission logic (replace with actual email-sending backend like EmailJS or custom API)
    toast.success("✅ Your query has been sent successfully!");

    // Clear form
    setFullName("");
    setEmail("");
    setYear("");
    setDepartment("");
    setQuery("");
  };

  return (
    <div className="pt-8 pb-20 space-y-24">
      <ToastContainer />

      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 min-h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 space-y-5"
        >
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>

          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <Label>Select Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose year" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((yr) => (
                  <SelectItem key={yr} value={yr.toString()}>
                    {yr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Department</Label>
            <Input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., CSE, ECE, Architecture"
              required
            />
          </div>

          <div>
            <Label>Your Query</Label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How can we help you?"
              required
              className="w-full p-2 border rounded-md resize-none min-h-[120px]"
            ></textarea>
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>

        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://illustrations.popsy.co/gray/customer-support.svg"
            alt="Contact Illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Additional Sections */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">We're Here to Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p>We respond to all queries within 24 hours via email at collageprepmanit@gmail.com</p>
          </div>
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feedback</h3>
            <p>Your feedback helps improve our platform. Don’t hesitate to let us know your thoughts.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p>Join a growing student community helping each other succeed. We’re stronger together!</p>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mt-16 mb-6">Still Have Questions?</h2>
        <p className="text-lg mb-4">
          Email us directly at <span className="font-semibold">collageprepmanit@gmail.com</span> and we’ll get back to you ASAP.
        </p>
        <p className="text-muted-foreground">Let’s make studying easier, together!</p>
      </section>
    </div>
  );
};

export default Contact;
