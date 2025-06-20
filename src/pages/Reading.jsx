import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormStore from "@/store/useFormStore";
import useApiHandler from "@/hooks/useapicall";
import { useForm } from "react-hook-form";

const Reading = () => {
  const resetform= useFormStore((state)=>state.resetform);
  const navigate = useNavigate();
  const {
    year,
    semester,
    branch,
    subject,
    formFilled,
    setError,
  } = useFormStore();
  const apicaller = useApiHandler();

  const [notefileurl, setNotefileurl] = useState([]);
  const [paperfileurl, setPaperfileurl] = useState([]);
  const [booksfileUrl, setBookfileurl] = useState([]);
  const [youtubeLink, setYoutubelink] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  console.log("year",year,"semester",semester);
  console.log("formfilled",formFilled);
  


  useEffect(() => {
    if (!formFilled) {
      setError("Please fill the form before accessing resources.");
       resetform();
      navigate("/main");
       
      return ;
      
    }
  },[]);



 useEffect(() => {


  const getalldata = async () => {
    try {
      console.log("Calling API with:", { semester, year, branch, subject });

      const response = await apicaller(
        `/api/auth/getsubjectdetails?semester=${semester}&year=${year}&department=${branch}&subjects=${subject}`,
        "GET"
      );
      console.log("response",response);
      

      const material = response?.data?.material || [];

      const notes = [];
      const books = [];
      const papers = [];
      const youtube = [];

      material.forEach((item) => {
        if (item.type === "notes") {
          item.notesfileUrls?.forEach((url) => notes.push({ title: item.title, fileUrl: url }));
        }
        if (item.type === "books") {
          item.booksfileUrls?.forEach((url) => books.push({ title: item.title, fileUrl: url }));
        }
        if (item.type === "papers") {
          item.paperfileUrls?.forEach((url) => papers.push({ title: item.title, fileUrl: url }));
        }
        if (item.type === "youtube") {
          youtube.push({ topic: item.title, links: item.youtubeLinks || [] });
        }
      });

      setNotefileurl(notes);
      setBookfileurl(books);
      setPaperfileurl(papers);
      setYoutubelink(youtube);
       resetform();
     
    } catch (e) {
      console.error("Error fetching resources:", e.message);
    }
  };

  getalldata();
}, []);


  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const renderViewButton = (url) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
    >
      View
    </a>
  );

  const renderYouTubeLinks = (links) =>
    links.map((link, idx) => (
      <li key={idx}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-words"
        >
          {link}
        </a>
      </li>
    ));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Heading */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Reading Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All resources are curated to help you succeed — whether it’s notes, past year papers,
          video lectures, or reference books.
        </p>
      </section>

      {/* Resource Dropdowns */}
      <section className="space-y-6">
        {[
          {
            name: "notes",
            title: "Notes",
            count: notefileurl.length,
            content: notefileurl,
          },
          {
            name: "youtubeLinks",
            title: "YouTube Links (Topic Wise)",
            count: youtubeLink.reduce((acc, topic) => acc + topic.links.length, 0),
            content: youtubeLink,
          },
          {
            name: "pastYearPapers",
            title: "Past Year Papers",
            count: paperfileurl.length,
            content: paperfileurl,
          },
          {
            name: "books",
            title: "Books",
            count: booksfileUrl.length,
            content: booksfileUrl,
          },
        ].map(({ name, title, count, content }) => (
          <div key={name} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleDropdown(name)}
              className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition"
            >
              <span className="text-xl font-medium text-gray-800">{title}</span>
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 font-semibold">{count}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                    openDropdown === name ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {openDropdown === name && (
              <div className="px-6 pb-6">
                {!count ? (
                  <p className="text-gray-500 italic py-4 text-center">
                    Nothing uploaded yet for {title.toLowerCase()}. It will be added soon.
                  </p>
                ) : name === "youtubeLinks" ? (
                  <div className="space-y-5">
                    {content.map((topic, idx) => (
                      <div key={idx} className="bg-gray-100 rounded p-4">
                        <p className="font-semibold mb-2">{topic.topic}</p>
                        <ul className="list-disc list-inside space-y-1">
                          {renderYouTubeLinks(topic.links)}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3 mt-3">
                    {content.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center bg-gray-100 rounded px-4 py-2"
                      >
                        <span className="text-gray-800">{item.title}</span>
                        {renderViewButton(item.fileUrl)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Extra Help */}
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-sm text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Struggling to find something?</h2>
        <p className="text-gray-600">
          If your subject or topic isn’t listed yet, don’t worry — more resources are being added
          regularly. You can also check other departments or similar courses in the meantime.
        </p>
        <p className="text-sm text-gray-500">Stay curious. Stay ahead.</p>
      </section>

      {/* Tips */}
      <section className="bg-white border border-gray-100 rounded-lg p-6 shadow text-left space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Exam Tips for MANITians</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Always solve past year papers – they’re often repeated.</li>
          <li>Study in blocks with breaks — Pomodoro method works great.</li>
          <li>Use the YouTube resources to clarify complex concepts visually.</li>
          <li>Keep your notes concise and handwritten for revision.</li>
          <li>Don’t panic — the exam is just a checkpoint, not the destination.</li>
        </ul>
      </section>

      {/* Quote */}
      <section className="text-center pt-8 pb-6">
        <blockquote className="italic text-xl text-gray-700 font-medium max-w-xl mx-auto">
          "Don't watch the clock; do what it does. Keep going."
        </blockquote>
        <p className="text-gray-500 mt-2">– Sam Levenson</p>
      </section>
    </div>
  );
};

export default Reading;
