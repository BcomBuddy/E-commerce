import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleII: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('etailing');
  const [inputs, setInputs] = useState({
    products: '',
    targetAudience: '',
    advertisingBudget: '',
    conversionRate: '',
    orderValue: '',
    buyerCount: '',
    sellerCount: '',
    auctionType: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const definitions = [
    {
      term: "Internet Marketing",
      definition: "The practice of using internet-based digital technologies to promote and sell products or services."
    },
    {
      term: "E-Tailing (Electronic Retailing)",
      definition: "The sale of retail goods on the Internet, also known as online retail or e-commerce retail."
    },
    {
      term: "E-Tailing Models",
      definition: "Direct-to-consumer, marketplace model, subscription model, and drop-shipping model."
    },
    {
      term: "Web Advertising",
      definition: "Online advertising that uses the World Wide Web to deliver promotional messages to consumers."
    },
    {
      term: "B2B E-Commerce",
      definition: "Business-to-business electronic commerce involving transactions between businesses."
    },
    {
      term: "Auction Models",
      definition: "Forward auctions (sellers compete), reverse auctions (buyers compete), and double auctions."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const simulateETailing = () => {
    const { products, targetAudience, advertisingBudget, conversionRate, orderValue } = inputs;
    
    if (!products || !targetAudience || !advertisingBudget || !conversionRate || !orderValue) {
      alert('Please fill in all fields');
      return;
    }

    const budget = parseFloat(advertisingBudget);
    const conversion = parseFloat(conversionRate) / 100;
    const avgOrder = parseFloat(orderValue);
    
    const estimatedTraffic = budget * 10; // Assume $1 brings 10 visitors
    const expectedConversions = estimatedTraffic * conversion;
    const projectedRevenue = expectedConversions * avgOrder;
    const roi = ((projectedRevenue - budget) / budget) * 100;
    
    let strategy = '';
    if (targetAudience === 'Young Adults') {
      strategy = 'Social Media Marketing, Influencer Partnerships';
    } else if (targetAudience === 'Professionals') {
      strategy = 'LinkedIn Ads, Content Marketing';
    } else {
      strategy = 'Search Engine Marketing, Display Advertising';
    }

    setResults({
      type: 'etailing',
      strategy,
      estimatedTraffic: estimatedTraffic.toFixed(0),
      expectedConversions: expectedConversions.toFixed(0),
      projectedRevenue: projectedRevenue.toFixed(2),
      roi: roi.toFixed(1),
      steps: [
        `Step 1: Set advertising budget: ₹${budget}`,
        `Step 2: Calculate estimated traffic: ₹${budget} × 10 visitors/₹1 = ${estimatedTraffic.toFixed(0)} visitors`,
        `Step 3: Apply conversion rate: ${estimatedTraffic.toFixed(0)} × ${(conversion * 100).toFixed(1)}% = ${expectedConversions.toFixed(0)} conversions`,
        `Step 4: Calculate revenue: ${expectedConversions.toFixed(0)} × ₹${avgOrder} = ₹${projectedRevenue}`,
        `Step 5: Calculate ROI: ((₹${projectedRevenue} - ₹${budget}) ÷ ₹${budget}) × 100 = ${roi.toFixed(1)}%`
      ]
    });
  };

  const simulateB2B = () => {
    const { buyerCount, sellerCount, auctionType } = inputs;
    
    if (!buyerCount || !sellerCount || !auctionType) {
      alert('Please fill in all fields');
      return;
    }

    const buyers = parseInt(buyerCount);
    const sellers = parseInt(sellerCount);
    
    let model = '';
    let efficiency = '';
    let costReduction = '';

    if (auctionType === 'Forward') {
      model = 'Sell-side B2B Model';
      efficiency = ((sellers / buyers) * 100).toFixed(1);
      costReduction = (15 + (sellers * 2)).toFixed(1);
    } else if (auctionType === 'Reverse') {
      model = 'Buy-side B2B Model';
      efficiency = ((buyers / sellers) * 100).toFixed(1);
      costReduction = (20 + (buyers * 1.5)).toFixed(1);
    } else {
      model = 'Exchange B2B Model';
      efficiency = ((buyers + sellers) / 2 * 10).toFixed(1);
      costReduction = (25 + ((buyers + sellers) * 1)).toFixed(1);
    }

    setResults({
      type: 'b2b',
      model,
      efficiency,
      costReduction,
      totalParticipants: buyers + sellers,
      steps: [
        `Step 1: Identify participants: ${buyers} buyers, ${sellers} sellers`,
        `Step 2: Determine auction type: ${auctionType} Auction`,
        `Step 3: Select B2B model: ${model}`,
        `Step 4: Calculate efficiency score: ${efficiency}%`,
        `Step 5: Estimate cost reduction: ${costReduction}%`
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Module II: E-Retailing and B2B E-Commerce</h2>
        <p className="text-gray-600">18 Hours • Online retail strategies and business-to-business commerce</p>
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
              onClick={() => setSelectedSimulator('etailing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'etailing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              E-Tailing Strategy Simulator
            </button>
            <button
              onClick={() => setSelectedSimulator('b2b')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'b2b'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              B2B Model Simulator
            </button>
          </div>
        </div>

        {/* E-Tailing Simulator */}
        {selectedSimulator === 'etailing' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">E-Tailing Strategy & ROI Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
                  <select
                    value={inputs.products}
                    onChange={(e) => handleInputChange('products', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select product category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Home & Garden">Home & Garden</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={inputs.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select target audience</option>
                    <option value="Young Adults">Young Adults (18-25)</option>
                    <option value="Professionals">Professionals (26-45)</option>
                    <option value="Seniors">Seniors (45+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Advertising Budget (₹)</label>
                  <input
                    type="number"
                    value={inputs.advertisingBudget}
                    onChange={(e) => handleInputChange('advertisingBudget', e.target.value)}
                    placeholder="Enter advertising budget"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Conversion Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                    placeholder="Enter conversion rate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average Order Value (₹)</label>
                  <input
                    type="number"
                    value={inputs.orderValue}
                    onChange={(e) => handleInputChange('orderValue', e.target.value)}
                    placeholder="Enter average order value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateETailing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Calculate E-Tailing Performance
                </button>
              </div>

              {results && results.type === 'etailing' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Performance Projection</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Marketing Strategy: </span>
                      <span className="text-blue-600 font-medium">{results.strategy}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Estimated Traffic: </span>
                      <span className="text-gray-900">{results.estimatedTraffic} visitors</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Expected Conversions: </span>
                      <span className="text-purple-600 font-medium">{results.expectedConversions}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Projected Revenue: </span>
                      <span className="text-green-600 font-bold">₹{results.projectedRevenue}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">ROI: </span>
                      <span className={`font-bold ${parseFloat(results.roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.roi}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Calculation Steps:</h6>
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

        {/* B2B Simulator */}
        {selectedSimulator === 'b2b' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">B2B Model Efficiency Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Buyers</label>
                  <input
                    type="number"
                    value={inputs.buyerCount}
                    onChange={(e) => handleInputChange('buyerCount', e.target.value)}
                    placeholder="Enter number of buyers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Sellers</label>
                  <input
                    type="number"
                    value={inputs.sellerCount}
                    onChange={(e) => handleInputChange('sellerCount', e.target.value)}
                    placeholder="Enter number of sellers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auction Type</label>
                  <select
                    value={inputs.auctionType}
                    onChange={(e) => handleInputChange('auctionType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select auction type</option>
                    <option value="Forward">Forward Auction</option>
                    <option value="Reverse">Reverse Auction</option>
                    <option value="Double">Double Auction</option>
                  </select>
                </div>

                <button
                  onClick={simulateB2B}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Analyze B2B Model
                </button>
              </div>

              {results && results.type === 'b2b' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">B2B Analysis Results</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">B2B Model: </span>
                      <span className="text-teal-600 font-medium">{results.model}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Market Efficiency: </span>
                      <span className="text-purple-600 font-medium">{results.efficiency}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Cost Reduction: </span>
                      <span className="text-green-600 font-bold">{results.costReduction}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Total Participants: </span>
                      <span className="text-gray-900">{results.totalParticipants}</span>
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

export default ModuleII;