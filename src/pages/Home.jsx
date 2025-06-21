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

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Home = () => {
  const token= localStorage.getItem("token");
  return (
    <div className="pt-8 pb-24 space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Ace your college exams by accessing all the resources in one place.
          </h1>
          <p className="text-lg text-muted-foreground">
            No more searching in different groups or websites. Everything is structured for you.
          </p>
        
         

          {/* Conditional Button */}
          {!token ? (
            <Link to="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          ) : (
            <Link to="/main">
              <Button size="lg">Go to MainPage</Button>
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <img src={heroImage} alt="Hero Illustration" className="w-full h-auto" />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Login</CardTitle>
            </CardHeader>
            <CardContent>
              Sign in using your email, Google, or Facebook in just one click.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Select Branch & Semester</CardTitle>
            </CardHeader>
            <CardContent>
              Choose your branch and semester to get personalized resources.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Access Everything</CardTitle>
            </CardHeader>
            <CardContent>
              Books, previous year papers, YouTube links—all in a structured format.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </section>

      {/* FAQ / Problems Solved Section */}
      <section className="px-6 max-w-4xl mx-auto">
        <Carousel plugins={[AutoPlay({ delay: 5000 })]} className="w-full">
          <CarouselContent>
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i} className="p-6 text-center">
                <div className="bg-muted p-6 rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">
                    {i === 1 && "Tired of searching resources everywhere?"}
                    {i === 2 && "Not sure what to study for internals?"}
                    {i === 3 && "Wasting time organizing materials?"}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {i === 1 &&
                      "Collageprep brings books, videos, notes, and past papers in one place."}
                    {i === 2 &&
                      "Get curated content specific to your semester and branch to prepare fast."}
                    {i === 3 &&
                      "Our structured format saves you hours by organizing everything for you."}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-4">
            <CarouselPrevious className="bg-primary text-white rounded-full w-10 h-10" />
            <CarouselNext className="bg-primary text-white rounded-full w-10 h-10" />
          </div>
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
