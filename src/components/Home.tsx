import React, { useState } from 'react';
import { BookOpen, Target, Users, Award } from 'lucide-react';

const Home: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const videoOptions = [
    { value: 'english', label: 'English', url: 'https://www.youtube.com/embed/ue4sy8oLqi8?rel=0&modestbranding=1' },
    { value: 'hindi-urdu', label: 'Hindi/Urdu', url: 'https://www.youtube.com/embed/l9L2djc46JA?rel=0&modestbranding=1' },
    { value: 'telugu', label: 'Telugu', url: 'https://www.youtube.com/embed/ROZ5I_u6r7M?rel=0&modestbranding=1' }
  ];

  const selectedVideo = videoOptions.find(option => option.value === selectedLanguage) || videoOptions[0];
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Coverage',
      description: 'All five modules covering complete E-Commerce syllabus'
    },
    {
      icon: Target,
      title: 'Interactive Learning',
      description: 'Step-by-step problem solving with real-world scenarios'
    },
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Designed specifically for B.Com 3rd year students'
    },
    {
      icon: Award,
      title: 'Practical Skills',
      description: 'Hands-on experience with E-Commerce concepts'
    }
  ];

  const modules = [
    {
      title: 'Module I: Introduction to E-Commerce',
      topics: ['EC Framework & Classification', 'Business Models', 'E-Marketplace', 'Electronic Catalog & Auctions'],
      color: 'bg-blue-500'
    },
    {
      title: 'Module II: E-Retailing & B2B',
      topics: ['Internet Marketing', 'E-Tailing Models', 'Web Advertising', 'B2B Concepts & Models'],
      color: 'bg-teal-500'
    },
    {
      title: 'Module III: E-Commerce Security',
      topics: ['Security Issues', 'Threats & Attacks', 'Security Management', 'Communications Security'],
      color: 'bg-orange-500'
    },
    {
      title: 'Module IV: Electronic Payment Systems',
      topics: ['Payment Cards', 'Smart Cards', 'E-Micropayments', 'E-Checking & Bill Payment'],
      color: 'bg-purple-500'
    },
    {
      title: 'Module V: Mobile Commerce',
      topics: ['Mobile Computing', 'M-Commerce', 'Legal & Ethical Issues', 'Privacy & Consumer Protection'],
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col items-center justify-center text-center py-10 mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          E-Commerce Learning Platform
        </h1>
        <p className="text-lg text-white mt-2 max-w-2xl leading-relaxed">
          Master E-Commerce concepts through interactive simulations and hands-on practice.
        </p>
      </div>

      {/* Video Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎥 Learn about this simulator</h2>
        
        {/* Language Dropdown */}
        <div className="w-full max-w-4xl mx-auto mb-6 flex flex-col items-center">
          <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Select Video Language
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-colors duration-200"
          >
            {videoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Video Player */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative w-full h-96 rounded-xl shadow-lg overflow-hidden">
            <iframe
              src={selectedVideo.url}
              title="E-Commerce Simulator Introduction"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Modules Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Course Modules</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className={`h-2 ${module.color}`}></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{module.title}</h3>
                <div className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Click on any module in the sidebar to begin your interactive E-Commerce learning journey. 
          Each module contains definitions and hands-on simulators to help you understand the concepts better.
        </p>
        <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
          <BookOpen className="w-5 h-5" />
          <span>Select a module from the sidebar to get started</span>
        </div>
      </div>
    </div>
  );
};

export default Home;