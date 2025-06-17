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

const Upload = () => {
  const [contributor, setContributor] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [file, setFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !course || !semester || !branch || !subject || !uploadType) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    if (
      (uploadType === "notes" || uploadType === "books" || uploadType === "papers") &&
      !file
    ) {
      toast.error("⚠️ Please upload the required file.");
      return;
    }

    if (uploadType === "youtube" && !youtubeLink) {
      toast.error("⚠️ Please provide the YouTube link.");
      return;
    }

    toast.success("✅ Files uploaded successfully. Thank you for your contribution!");

    // Clear form
    setContributor("");
    setTitle("");
    setCourse("");
    setSemester("");
    setBranch("");
    setSubject("");
    setUploadType("");
    setFile(null);
    setYoutubeLink("");
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
          <h2 className="text-3xl font-bold mb-4">Contribute Your Study Material</h2>

          <div>
            <Label>Full Name of Contributor</Label>
            <Input
              type="text"
              value={contributor}
              onChange={(e) => setContributor(e.target.value)}
              placeholder="Enter your name (optional)"
            />
          </div>

          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter material title"
              required
            />
          </div>

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
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Enter branch name"
              required
            />
          </div>

          <div>
            <Label>Subject</Label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
              required
            />
          </div>

          <div>
            <Label>What are you uploading?</Label>
            <Select value={uploadType} onValueChange={setUploadType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="papers">Papers</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="youtube">YouTube Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(uploadType === "notes" || uploadType === "books" || uploadType === "papers") && (
            <div>
              <Label>Upload File</Label>
              <Input
                type="file"
                accept={uploadType === "papers" ? "image/*" : "application/pdf"}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}

          {uploadType === "youtube" && (
            <div>
              <Label>YouTube Link</Label>
              <Input
                type="url"
                placeholder="Enter YouTube URL"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>

        <div className="hidden md:block w-full md:w-1/2">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Upload Illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Additional Sections */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Contribute?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Help Others</h3>
            <p>Your notes or links might help someone pass a tough exam or understand a hard topic.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Be Recognized</h3>
            <p>Get credited for your contributions — optional name fields allow anonymous uploads too.</p>
          </div>
          <div className="bg-muted p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Grow the Community</h3>
            <p>CollagePrep is built for students by students. Every upload makes the platform stronger.</p>
          </div>
        </div>
      </section>

      <section className="px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mt-16 mb-6">Have a Question?</h2>
        <p className="text-lg mb-4">
          Reach out to us on our <span className="font-semibold">Contact</span> page or email us at
          <span className="font-semibold"> support@collageprep.com</span>.
        </p>
        <p className="text-muted-foreground">We're always happy to help you!</p>
      </section>
    </div>
  );
};

export default Upload;
