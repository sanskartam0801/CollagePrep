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
import useApiHandler from "@/hooks/useapicall";
import { showErrorToast } from "@/utilities/toastutils";

const Upload = () => {
  const apicaller = useApiHandler();

  const [contributor, setContributor] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState();
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState();
  const [examyear, setExamyear] = useState();

  const [notesFiles, setNotesFiles] = useState([]);
  const [paperImages, setPaperImages] = useState([]);
  const [booksFiles, setBooksFiles] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([""]);

  const handleFileChange = (setter) => (e) => {
    setter([...e.target.files]);
  };

  const handleYoutubeChange = (index, value) => {
    const updated = [...youtubeLinks];
    updated[index] = value;
    setYoutubeLinks(updated);
  };

  const addYoutubeField = () => setYoutubeLinks([...youtubeLinks, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !course || !semester || !branch || !subject || !year || !examyear) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contributor", contributor);
    formData.append("course", course);
    formData.append("semester", semester);
    formData.append("department", branch);
    formData.append("subject", subject);
    formData.append("year", year);
    formData.append("examyear", examyear);

    notesFiles.forEach((file) => formData.append("notes", file));
    paperImages.forEach((file) => formData.append("papers", file));
    booksFiles.forEach((file) => formData.append("books", file));
    youtubeLinks
      .filter((link) => link.trim() !== "")
      .forEach((link) => formData.append("youtubeLinks", link));

    try {
      const response = await apicaller("/api/auth/upload", "POST", formData);
      if (!response.data.success) {
        showErrorToast("File Already exists or failed to upload.");
      } else {
        toast.success("✅ Upload successful!");
        setContributor("");
        setTitle("");
        setCourse("");
        setSemester("");
        setBranch("");
        setSubject("");
        setYear("");
        setExamyear("");
        setNotesFiles([]);
        setPaperImages([]);
        setBooksFiles([]);
        setYoutubeLinks([""]);
      }
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="pt-10 pb-24 space-y-24">
      <ToastContainer />
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold mb-4">Contribute Study Materials</h2>

          <div>
            <Label>Contributor Name (optional)</Label>
            <Input value={contributor} onChange={(e) => setContributor(e.target.value)} />
          </div>

          <div>
            <Label>Material Title</Label>
            <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <Label>Course</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btech">B.Tech</SelectItem>
                <SelectItem value="barch">B.Arch</SelectItem>
                <SelectItem value="mca">MCA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Year</Label>
              <Select value={year?.toString()} onValueChange={(val) => setYear(Number(val))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((yr) => (
                    <SelectItem key={yr} value={yr.toString()}>{yr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Semester</Label>
              <Select value={semester?.toString()} onValueChange={(val) => setSemester(Number(val))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Input required value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" />
          <Input required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
          <Input required value={examyear} onChange={(e) => setExamyear(e.target.value)} placeholder="Exam Year (e.g., 2025)" type="number" />

          <div className="space-y-2">
            <Label>Upload Notes (PDF)</Label>
            <Input type="file" accept="application/pdf" multiple onChange={handleFileChange(setNotesFiles)} />
          </div>

          <div className="space-y-2">
            <Label>Upload Papers (Images)</Label>
            <Input type="file" accept="image/*" multiple onChange={handleFileChange(setPaperImages)} />
          </div>

          <div className="space-y-2">
            <Label>Upload Books (PDF)</Label>
            <Input type="file" accept="application/pdf" multiple onChange={handleFileChange(setBooksFiles)} />
          </div>

          <div className="space-y-2">
            <Label>YouTube Links</Label>
            {youtubeLinks.map((link, idx) => (
              <Input
                key={idx}
                type="url"
                placeholder={`YouTube Link ${idx + 1}`}
                value={link}
                onChange={(e) => handleYoutubeChange(idx, e.target.value)}
              />
            ))}
            <Button type="button" variant="outline" onClick={addYoutubeField}>
              + Add Another YouTube Link
            </Button>
          </div>

          <Button type="submit" className="w-full mt-6">
            Upload All
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

      {/* 💡 Why Contribute Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Contribute?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Help Others",
              desc: "Your notes or links might help someone pass a tough exam or understand a hard topic.",
            },
            {
              title: "Be Recognized",
              desc: "Get credited for your contributions — or upload anonymously if you prefer.",
            },
            {
              title: "Grow the Community",
              desc: "CollegePrep is built for students by students. Every upload strengthens us.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mt-16 mb-6">Have a Question?</h2>
        <p className="text-lg mb-4">
          Reach out to us on the <strong>Contact</strong> page or email us at{" "}
          <strong>support@collegeprep.com</strong>.
        </p>
        <p className="text-muted-foreground">We're always happy to help!</p>
      </section>
    </div>
  );
};

export default Upload;
