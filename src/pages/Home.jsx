import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import heroImage from "@/assets/hero-section-image1.jpg";

import gallery1 from '@/assets/gallery1.jpg';
import gallery2 from '@/assets/gallery2.jpg';
import gallery3 from '@/assets/gallery3.jpg';
import gallery4 from '@/assets/gallery4.jpg';
import gallery5 from '@/assets/gallery5.jpg';
import gallery6 from '@/assets/gallery6.jpg';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Home = () => {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  const faqItems = [
    {
      question: "Tired of searching resources everywhere?",
      answer: "Collageprep brings books, videos, notes, and past papers in one place.",
    },
    {
      question: "Not sure what to study for internals?",
      answer: "Get curated content specific to your semester and branch to prepare fast.",
    },
    {
      question: "Wasting time organizing materials?",
      answer: "Our structured format saves you hours by organizing everything for you.",
    },
    {
      question: "Need quick revision before exams?",
      answer: "Access quick notes and summaries tailored to your syllabus.",
    },
    {
      question: "Confused which books to refer?",
      answer: "We shortlist the best books and resources trusted by toppers.",
    },
    {
      question: "Want to contribute study materials?",
      answer: "Upload and share your notes to help peers and build community trust.",
    },
  ];

  return (
    <div className="pt-8 pb-24 space-y-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Ace your college exams by accessing all the resources in one place.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            No more searching in different groups or websites. Everything is structured for you.
          </p>
          {!isLoggedIn ? (
            <Link to="/login">
              <Button size="lg" className="text-base sm:text-lg">
                Get Started
              </Button>
            </Link>
          ) : (
            <Link to="/main">
              <Button size="lg" className="text-base sm:text-lg">
                Go to MainPage
              </Button>
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={heroImage}
            alt="Hero Illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Login", "Select Branch & Semester", "Access Everything"].map((step, i) => (
            <Card key={i} className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Step {i + 1}: {step}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base text-muted-foreground">
                {i === 0 && "Sign in using your email, Google, or Facebook in just one click."}
                {i === 1 && "Choose your branch and semester to get personalized resources."}
                {i === 2 && "Books, previous year papers, YouTube links—all in a structured format."}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Student Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>

      {/* FAQ Section (Carousel) */}
      <section className="px-6 max-w-4xl mx-auto relative">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
          Solving Real Student Problems
        </h2>
        <div className="relative">
          <Carousel
            plugins={[AutoPlay({ delay: 5000 })]}
            className="w-full"
          >
            {/* Buttons on Left/Right (absolute) */}
            <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-black" />
            <CarouselNext className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white w-10 h-10 rounded-full hover:bg-black" />

            <CarouselContent>
              {faqItems.map((item, i) => (
                <CarouselItem key={i} className="p-6 text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg sm:text-2xl font-semibold mb-4">
                      {item.question}
                    </h3>
                    <p className="text-sm sm:text-lg text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Home;
