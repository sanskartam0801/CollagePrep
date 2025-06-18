import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white text-gray-800 pb-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Form Area */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent>
              <h2 className="text-2xl font-bold text-center mb-4">
                {isLogin ? 'Login to CollagePrep' : 'Sign Up for CollagePrep'}
              </h2>
              <form className="space-y-4">
                {!isLogin && (
                  <div>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Your name" required />
                  </div>
                )}
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" required />
                </div>
                {!isLogin && (
                  <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="••••••••" required />
                  </div>
                )}
                <Button className="w-full" type="submit">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                <button
                  className="text-indigo-600 hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
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
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Extra Sections */}
      <section className="bg-indigo-50 py-12 text-center px-4">
        <h2 className="text-3xl font-bold mb-2 text-indigo-700">Everything a MANITian Needs</h2>
        <p className="max-w-xl mx-auto text-gray-700">
          Get access to curated notes, previous year papers, useful YouTube playlists, and recommended books — all in one place. CollagePrep is built by students, for students.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-6 py-10 max-w-6xl mx-auto">
        <Card className="p-4 text-center">
          <h3 className="text-xl font-semibold text-indigo-700">Notes</h3>
          <p className="text-gray-600 mt-2">Download handwritten and digital notes from toppers and professors.</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-xl font-semibold text-indigo-700">Previous Year Papers</h3>
          <p className="text-gray-600 mt-2">Prepare efficiently using solved and unsolved past papers by subject.</p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="text-xl font-semibold text-indigo-700">Video Resources</h3>
          <p className="text-gray-600 mt-2">Access curated YouTube playlists and concept explanation videos.</p>
        </Card>
      </section>
    </div>
  );
};

export default LoginSignupPage;
