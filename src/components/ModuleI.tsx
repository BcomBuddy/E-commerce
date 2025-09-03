import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleI: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('framework');
  const [inputs, setInputs] = useState({
    businessType: '',
    customerSegment: '',
    transactionValue: '',
    participants: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const definitions = [
    {
      term: "Electronic Commerce (E-Commerce)",
      definition: "The buying and selling of goods and services over electronic networks, primarily the internet."
    },
    {
      term: "EC Framework",
      definition: "A structured approach that includes people, public policies, marketing/advertising, support services, and business partnerships."
    },
    {
      term: "EC Business Models",
      definition: "B2B (Business-to-Business), B2C (Business-to-Consumer), C2C (Consumer-to-Consumer), C2B (Consumer-to-Business)."
    },
    {
      term: "E-Marketplace",
      definition: "A virtual marketplace where buyers and sellers come together to conduct transactions electronically."
    },
    {
      term: "Electronic Catalog",
      definition: "A digital presentation of products or services with descriptions, images, and pricing information."
    },
    {
      term: "Electronic Auctions",
      definition: "Online bidding mechanisms where buyers compete to purchase goods or services."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const simulateFramework = () => {
    const { businessType, customerSegment, transactionValue } = inputs;
    
    if (!businessType || !customerSegment || !transactionValue) {
      alert('Please fill in all fields');
      return;
    }

    let model = '';
    let framework = '';
    
    // Determine EC Model
    if (businessType === 'Business' && customerSegment === 'Business') {
      model = 'B2B (Business-to-Business)';
      framework = 'Supply Chain Management, Procurement Systems, Electronic Data Interchange (EDI)';
    } else if (businessType === 'Business' && customerSegment === 'Consumer') {
      model = 'B2C (Business-to-Consumer)';
      framework = 'Online Retail, Digital Marketing, Customer Service Systems';
    } else if (businessType === 'Consumer' && customerSegment === 'Consumer') {
      model = 'C2C (Consumer-to-Consumer)';
      framework = 'Online Marketplaces, Peer-to-Peer Platforms, Trust Systems';
    } else {
      model = 'C2B (Consumer-to-Business)';
      framework = 'Reverse Auctions, Freelance Platforms, Review Systems';
    }

    const transactionSize = parseFloat(transactionValue);
    let recommendedPlatform = '';
    
    if (transactionSize < 1000) {
      recommendedPlatform = 'Micropayment Systems';
    } else if (transactionSize < 10000) {
      recommendedPlatform = 'Standard E-Commerce Platform';
    } else {
      recommendedPlatform = 'Enterprise B2B Platform';
    }

    setResults({
      type: 'framework',
      model,
      framework,
      recommendedPlatform,
      transactionSize,
      steps: [
        `Step 1: Identify business participants: ${businessType} → ${customerSegment}`,
        `Step 2: Determine EC Model: ${model}`,
        `Step 3: Analyze transaction value: $${transactionValue}`,
        `Step 4: Select appropriate framework: ${framework}`,
        `Step 5: Recommend platform: ${recommendedPlatform}`
      ]
    });
  };

  const simulateMarketplace = () => {
    const { participants } = inputs;
    
    if (!participants) {
      alert('Please enter number of participants');
      return;
    }

    const numParticipants = parseInt(participants);
    let marketplaceType = '';
    let intermediationLevel = '';
    let benefits = '';

    if (numParticipants < 10) {
      marketplaceType = 'Niche Marketplace';
      intermediationLevel = 'High Touch - Personal Service';
      benefits = 'Specialized expertise, personalized service';
    } else if (numParticipants < 100) {
      marketplaceType = 'Regional Marketplace';
      intermediationLevel = 'Medium - Automated + Human';
      benefits = 'Local market knowledge, moderate scale';
    } else {
      marketplaceType = 'Global Marketplace';
      intermediationLevel = 'Low Touch - Highly Automated';
      benefits = 'Large scale, cost efficiency, broad reach';
    }

    setResults({
      type: 'marketplace',
      marketplaceType,
      intermediationLevel,
      benefits,
      networkEffect: Math.pow(numParticipants, 1.5).toFixed(0),
      steps: [
        `Step 1: Analyze participant count: ${participants} participants`,
        `Step 2: Determine marketplace type: ${marketplaceType}`,
        `Step 3: Calculate network effect: ${participants}^1.5 = ${Math.pow(numParticipants, 1.5).toFixed(0)}`,
        `Step 4: Define intermediation level: ${intermediationLevel}`,
        `Step 5: Identify key benefits: ${benefits}`
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Module I: Introduction to E-Commerce</h2>
        <p className="text-gray-600">18 Hours • Fundamental concepts and frameworks of electronic commerce</p>
      </div>

      {/* Definition Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Definition Section</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {definitions.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">{item.term}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-900">Interactive Simulator</h3>
        </div>

        {/* Simulator Selection */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedSimulator('framework')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'framework'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              EC Framework Simulator
            </button>
            <button
              onClick={() => setSelectedSimulator('marketplace')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'marketplace'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              E-Marketplace Simulator
            </button>
          </div>
        </div>

        {/* Framework Simulator */}
        {selectedSimulator === 'framework' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">EC Framework & Business Model Analyzer</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    value={inputs.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select business type</option>
                    <option value="Business">Business</option>
                    <option value="Consumer">Consumer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Segment</label>
                  <select
                    value={inputs.customerSegment}
                    onChange={(e) => handleInputChange('customerSegment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select customer segment</option>
                    <option value="Business">Business</option>
                    <option value="Consumer">Consumer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average Transaction Value (₹)</label>
                  <input
                    type="number"
                    value={inputs.transactionValue}
                    onChange={(e) => handleInputChange('transactionValue', e.target.value)}
                    placeholder="Enter transaction value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateFramework}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Analyze EC Framework
                </button>
              </div>

              {results && results.type === 'framework' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Analysis Results</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">EC Model: </span>
                      <span className="text-blue-600 font-medium">{results.model}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Framework: </span>
                      <span className="text-gray-900">{results.framework}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Recommended Platform: </span>
                      <span className="text-green-600 font-medium">{results.recommendedPlatform}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Solution Steps:</h6>
                    <ol className="space-y-1">
                      {results.steps.map((step: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marketplace Simulator */}
        {selectedSimulator === 'marketplace' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">E-Marketplace Analysis Tool</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Market Participants</label>
                  <input
                    type="number"
                    value={inputs.participants}
                    onChange={(e) => handleInputChange('participants', e.target.value)}
                    placeholder="Enter number of participants"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateMarketplace}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Analyze Marketplace
                </button>
              </div>

              {results && results.type === 'marketplace' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Marketplace Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Marketplace Type: </span>
                      <span className="text-teal-600 font-medium">{results.marketplaceType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Intermediation Level: </span>
                      <span className="text-gray-900">{results.intermediationLevel}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Network Effect Score: </span>
                      <span className="text-purple-600 font-medium">{results.networkEffect}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Key Benefits: </span>
                      <span className="text-green-600">{results.benefits}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Analysis Steps:</h6>
                    <ol className="space-y-1">
                      {results.steps.map((step: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleI;