
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };


  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100/20 px-6 py-2 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold">AboutWebsite</span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Reviews</a>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Dashboard</button>
                <button onClick={() => router.push('/dashboard')} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <button onClick={handleGetStarted} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Login</button>
                <button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-8 border border-purple-200">
                🚀 India's Simplest AI Website Builder
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                Your story. Your website.
                <span className="block text-red-600">In minutes. Made simple.</span>
              </h1>
              <p className="text-2xl text-gray-600 max-w-2xl mb-10 leading-relaxed text-center mx-auto">
                If you're a Doc/CA/Influencer/Student/Store owner or anyone, we believe you need one page - all about you. 
                Own your aboutwebsite.in or connect your domain.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
                <button onClick={handleGetStarted} className="bg-blue-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {isAuthenticated ? 'Go to Dashboard' : 'Start Building Free'}
                </button>
                <button className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 group justify-center">
                  <span className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-all duration-200">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-lg font-medium">Watch Demo</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 justify-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-yellow-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-gray-500">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2">2,847 makers building faster</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              Our Promise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've removed all the complexity from website building
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Coding</h3>
              <p className="text-gray-600">Zero technical knowledge required</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Design Skills</h3>
              <p className="text-gray-600">AI handles all the design work</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Server Handling</h3>
              <p className="text-gray-600">We manage everything for you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Complexity</h3>
              <p className="text-gray-600">Simple and straightforward process</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Just Enter Details - AI Makes Your "About Me" Site</h3>
              <p className="text-xl text-gray-600">Tell us about yourself, and our AI creates your perfect website</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">AI-Powered Creation</h4>
                <p className="text-gray-600">Our AI analyzes your details and creates a personalized website</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Design Themes</h4>
                <p className="text-gray-600">Choose from beautiful pre-designed themes that match your style</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Drag & Drop</h4>
                <p className="text-gray-600">Add sections and customize everything with simple drag and drop</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-lg">
                <span className="text-2xl mr-3">✨</span>
                We Made It Easy and Simple
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Easy and Simple Means Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              What "Easy and Simple" Means
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've eliminated all the technical headaches so you can focus on what matters - your story
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left Side - Technical Problems Solved */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                No More Technical Headaches
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">No Frontend/Backend Giggling</h4>
                    <p className="text-gray-600">No more wrestling with complex code, databases, or technical architecture</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">No Server Cost Worries</h4>
                    <p className="text-gray-600">We handle all hosting, maintenance, and scaling - no surprise bills</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">No Security Issues</h4>
                    <p className="text-gray-600">We take care of all security updates, SSL certificates, and protection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Just Drag and Drop</h4>
                    <p className="text-gray-600">Simple, intuitive interface that anyone can use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                What You Get Instead
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="text-xl font-bold mb-3 text-purple-600">One Page = All You Need</h4>
                  <p className="text-gray-600">"A clean personal page instead of a messy blog or LinkedIn clutter."</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="text-xl font-bold mb-3 text-blue-600">Works in Hinglish, Hindi & English</h4>
                  <p className="text-gray-600">"Your website, your language."</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="text-xl font-bold mb-3 text-green-600">Mobile First</h4>
                  <p className="text-gray-600">"Your About page looks perfect on every phone."</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="text-xl font-bold mb-3 text-orange-600">Instant Shareable Link</h4>
                  <p className="text-gray-600">"Perfect for resumes, Instagram bio, WhatsApp, or business card."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <button onClick={handleGetStarted} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <span className="text-2xl mr-3">🚀</span>
              Start Building Your Simple Website Today
            </button>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              For Whom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Perfect for every professional who wants to make a great first impression online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Students</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Get internships faster. Share your projects and resume with one simple link."
              </p>
            </div>

            {/* Doctors */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">Doctors</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Build trust online. Share your credentials, specializations, and clinic details."
              </p>
            </div>

            {/* Influencers */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Influencers</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Look professional. Share your collabs, stats, and media kit in one link."
              </p>
            </div>

            {/* Professionals */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Professionals</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Showcase your portfolio and services. Impress clients in seconds."
              </p>
            </div>

            {/* Businesses */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-red-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">Businesses</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Display products and services. Convert your leads directly."
              </p>
            </div>

            {/* CAs */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 transition-all duration-200 group shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">CAs</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                "Build credibility. Share your expertise, services, and client testimonials professionally."
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button onClick={handleGetStarted} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <span className="text-2xl mr-3">✨</span>
              Build My Website Now
            </button>
          </div>
        </div>
      </section>

      {/* AI-Powered Process Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to create your perfect "About Me" website
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1: Generate Bio with AI */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Generate My Bio with AI</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Tell us about yourself in simple words. Our AI analyzes your details and creates a professional bio that represents you perfectly.
              </p>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-700 font-medium">
                  "I'm a doctor from Mumbai, specializing in cardiology with 10 years of experience..."
                </p>
              </div>
            </div>

            {/* Step 2: Pick a Template */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Pick a Template</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Choose from our collection of beautiful, professional templates designed specifically for different professions and styles.
              </p>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-blue-200 rounded"></div>
                  <div className="h-8 bg-blue-300 rounded"></div>
                  <div className="h-8 bg-blue-200 rounded"></div>
                </div>
                <p className="text-xs text-blue-600 mt-2">Professional Templates</p>
              </div>
            </div>

            {/* Step 3: Preview My Page */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">Preview My Page</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                See your website come to life instantly. Make adjustments, add sections, and customize until it's perfect for you.
              </p>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="h-16 bg-gradient-to-r from-green-200 to-green-300 rounded mb-2"></div>
                <div className="h-4 bg-green-200 rounded mb-1"></div>
                <div className="h-4 bg-green-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Interactive Demo CTA */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 text-center">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to See It in Action?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Try our AI-powered website builder without any commitment. See how easy it is to create your perfect "About Me" page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Building Free
              </a>
              <a href="#demo" className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-purple-500 hover:text-white transition-all duration-200">
                Preview My Page
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Control Section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              🛠️ Dashboard Control
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your website doesn't end when it goes live - that's when the real value begins
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left Side - Features */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                Central Hub for Complete Control
              </h3>
              
              <div className="space-y-8">
                {/* Live Editor / CMS */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-blue-600">Live Editor / CMS</h4>
                      <p className="text-gray-600 mb-3">
                        User logs into <span className="font-semibold text-blue-600">.aboutwebsite.in</span>
                      </p>
                      <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          See all sections (Hero, About, Services, Contact, etc.) in drag-and-drop list
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          Reorder, edit text, replace images anytime
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          Complete control over your content
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Preview Before Publish */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-green-600">Preview Before Publish</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          See live preview of all your changes
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Hit Publish → changes instantly pushed to subdomain/custom domain
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          No technical knowledge required
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Dashboard Mockup */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900">Your Dashboard</h4>
                <p className="text-gray-600">aboutwebsite.in/dashboard</p>
              </div>
              
              {/* Dashboard Mockup */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-semibold text-gray-700">My Website Sections</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  {/* Sections List */}
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-white rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-blue-600">1</span>
                      </div>
                      <span className="text-sm font-medium">Hero Section</span>
                      <div className="ml-auto flex space-x-2">
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">✏️</button>
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">👁️</button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-gray-600">2</span>
                      </div>
                      <span className="text-sm font-medium">About Me</span>
                      <div className="ml-auto flex space-x-2">
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">✏️</button>
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">👁️</button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-gray-600">3</span>
                      </div>
                      <span className="text-sm font-medium">Services</span>
                      <div className="ml-auto flex space-x-2">
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">✏️</button>
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">👁️</button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-lg border">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <span className="text-xs text-gray-600">4</span>
                      </div>
                      <span className="text-sm font-medium">Contact</span>
                      <div className="ml-auto flex space-x-2">
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">✏️</button>
                        <button className="w-6 h-6 bg-gray-100 rounded text-xs">👁️</button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Publish Button */}
                  <div className="pt-4">
                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                      🚀 Publish Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Value Proposition */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8 rounded-2xl text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              ✅ So in Simple Terms:
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-3">Your job ends when the site is live?</h4>
                <p className="text-2xl font-bold text-yellow-300">No.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-3">Your real value =</h4>
                <p className="text-lg">Letting our users update, regenerate, and control content anytime from their dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Badge Section */}
  

      {/* Interactive Demo Section */}
      {/* <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how easy it is to build your website
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Live Website Builder</h3>
                <p className="text-gray-600 mb-6">
                  Experience our intuitive drag-and-drop interface. Build your website in real-time with instant preview.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Real-time preview</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Mobile responsive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">SEO optimized</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
                <div className="text-center text-gray-500 mb-4">Website Preview</div>
                <div className="bg-white rounded-lg p-4 text-black">
                  <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-8 bg-purple-500 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Handwritten Text Section */}


      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold">AboutWebsite</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Helping professionals tell their story with simple, beautiful one-page websites.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xl mb-6">Product</h4>
                <ul className="space-y-3 text-gray-400 text-lg">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sections</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Elements</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-xl mb-6">Support</h4>
                <ul className="space-y-3 text-gray-400 text-lg">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 AboutWebsite. Made with ❤️ in India for professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
