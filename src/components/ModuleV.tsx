import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleV: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('mcommerce');
  const [inputs, setInputs] = useState({
    deviceType: '',
    userBase: '',
    transactionVolume: '',
    fraudRate: '',
    privacyLevel: '',
    complianceCost: '',
    violationPenalty: '',
    consumerComplaints: '',
    resolutionTime: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const definitions = [
    {
      term: "Mobile Commerce (M-Commerce)",
      definition: "Commercial transactions conducted through mobile devices like smartphones and tablets."
    },
    {
      term: "Mobile Computing",
      definition: "The use of portable computing devices that can connect to networks wirelessly for data access and processing."
    },
    {
      term: "Pervasive Computing",
      definition: "Computing environment where computing capabilities are embedded in everyday objects and environments."
    },
    {
      term: "Privacy in E-Commerce",
      definition: "Protection of personal information and browsing behavior of users in electronic transactions."
    },
    {
      term: "Intellectual Property Rights",
      definition: "Legal rights protecting creations of the mind, including copyrights, trademarks, and patents in digital commerce."
    },
    {
      term: "Consumer Protection",
      definition: "Legal and regulatory measures ensuring fair treatment and rights of consumers in electronic transactions."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const simulateMCommerce = () => {
    const { deviceType, userBase, transactionVolume, fraudRate } = inputs;
    
    if (!deviceType || !userBase || !transactionVolume || !fraudRate) {
      alert('Please fill in all fields');
      return;
    }

    const users = parseInt(userBase);
    const volume = parseFloat(transactionVolume);
    const fraud = parseFloat(fraudRate);
    
    // Calculate metrics based on device type
    let conversionRate = 0;
    let securityRisk = 0;
    
    switch(deviceType) {
      case 'Smartphone':
        conversionRate = 2.8;
        securityRisk = 25;
        break;
      case 'Tablet':
        conversionRate = 4.2;
        securityRisk = 20;
        break;
      case 'Smartwatch':
        conversionRate = 1.5;
        securityRisk = 15;
        break;
      case 'IoT Device':
        conversionRate = 1.0;
        securityRisk = 35;
        break;
    }

    const expectedTransactions = (users * volume * conversionRate) / 100;
    const fraudLoss = (expectedTransactions * fraud) / 100;
    const netTransactions = expectedTransactions - fraudLoss;
    const fraudPreventionCost = fraudLoss * 0.3; // 30% of fraud loss for prevention

    setResults({
      type: 'mcommerce',
      conversionRate: conversionRate.toFixed(1),
      securityRisk: securityRisk.toFixed(1),
      expectedTransactions: expectedTransactions.toFixed(0),
      fraudLoss: fraudLoss.toFixed(0),
      netTransactions: netTransactions.toFixed(0),
      fraudPreventionCost: fraudPreventionCost.toFixed(2),
      steps: [
        `Step 1: Device type analysis: ${deviceType} (Conversion rate: ${conversionRate}%)`,
        `Step 2: Calculate expected transactions: ${users} users × ${volume}% × ${conversionRate}% = ${expectedTransactions.toFixed(0)}`,
        `Step 3: Calculate fraud loss: ${expectedTransactions.toFixed(0)} × ${fraud}% = ${fraudLoss.toFixed(0)} transactions`,
        `Step 4: Net transactions: ${expectedTransactions.toFixed(0)} - ${fraudLoss.toFixed(0)} = ${netTransactions.toFixed(0)}`,
        `Step 5: Fraud prevention cost: ${fraudLoss.toFixed(0)} × 30% = ₹${fraudPreventionCost}`
      ]
    });
  };

  const simulateCompliance = () => {
    const { privacyLevel, complianceCost, violationPenalty, consumerComplaints, resolutionTime } = inputs;
    
    if (!privacyLevel || !complianceCost || !violationPenalty || !consumerComplaints || !resolutionTime) {
      alert('Please fill in all fields');
      return;
    }

    const cost = parseFloat(complianceCost);
    const penalty = parseFloat(violationPenalty);
    const complaints = parseInt(consumerComplaints);
    const time = parseFloat(resolutionTime);
    
    let complianceScore = 0;
    let riskLevel = '';

    // Privacy level impact
    switch(privacyLevel) {
      case 'Basic':
        complianceScore = 40;
        break;
      case 'Standard':
        complianceScore = 70;
        break;
      case 'Advanced':
        complianceScore = 90;
        break;
      case 'Premium':
        complianceScore = 100;
        break;
    }

    // Adjust for resolution efficiency
    if (time <= 24) complianceScore += 10;
    else if (time <= 72) complianceScore += 5;
    else complianceScore -= 5;

    // Complaint impact
    if (complaints > 10) complianceScore -= 15;
    else if (complaints > 5) complianceScore -= 10;

    complianceScore = Math.max(0, Math.min(100, complianceScore));

    if (complianceScore >= 85) riskLevel = 'Low Risk';
    else if (complianceScore >= 65) riskLevel = 'Medium Risk';
    else riskLevel = 'High Risk';

    const potentialSavings = penalty * 0.8; // 80% of penalty can be avoided with good compliance
    const roi = ((potentialSavings - cost) / cost) * 100;

    setResults({
      type: 'compliance',
      complianceScore: complianceScore.toFixed(1),
      riskLevel,
      potentialSavings: potentialSavings.toFixed(2),
      roi: roi.toFixed(1),
      complaintRate: (complaints / 100).toFixed(1),
      steps: [
        `Step 1: Base compliance score: ${privacyLevel} privacy = ${privacyLevel === 'Premium' ? 100 : privacyLevel === 'Advanced' ? 90 : privacyLevel === 'Standard' ? 70 : 40} points`,
        `Step 2: Resolution time adjustment: ${time} hours = ${time <= 24 ? '+10' : time <= 72 ? '+5' : '-5'} points`,
        `Step 3: Complaint impact: ${complaints} complaints = ${complaints > 10 ? '-15' : complaints > 5 ? '-10' : '0'} points`,
        `Step 4: Final compliance score: ${complianceScore.toFixed(1)}/100`,
        `Step 5: Calculate ROI: ((₹${potentialSavings} - ₹${cost}) ÷ ₹${cost}) × 100 = ${roi.toFixed(1)}%`
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Module V: Mobile Commerce</h2>
        <p className="text-gray-600">18 Hours • Mobile computing, legal issues, and consumer protection</p>
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
              onClick={() => setSelectedSimulator('mcommerce')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'mcommerce'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              M-Commerce Performance Analyzer
            </button>
            <button
              onClick={() => setSelectedSimulator('compliance')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'compliance'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Legal Compliance Calculator
            </button>
          </div>
        </div>

        {/* M-Commerce Performance Simulator */}
        {selectedSimulator === 'mcommerce' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">M-Commerce Performance & Security Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Device Type</label>
                  <select
                    value={inputs.deviceType}
                    onChange={(e) => handleInputChange('deviceType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select device type</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Smartwatch">Smartwatch</option>
                    <option value="IoT Device">IoT Device</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Base</label>
                  <input
                    type="number"
                    value={inputs.userBase}
                    onChange={(e) => handleInputChange('userBase', e.target.value)}
                    placeholder="Enter number of users"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Transaction Volume (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.transactionVolume}
                    onChange={(e) => handleInputChange('transactionVolume', e.target.value)}
                    placeholder="Enter transaction volume percentage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fraud Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.fraudRate}
                    onChange={(e) => handleInputChange('fraudRate', e.target.value)}
                    placeholder="Enter fraud rate percentage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateMCommerce}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Analyze M-Commerce Performance
                </button>
              </div>

              {results && results.type === 'mcommerce' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">M-Commerce Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Conversion Rate: </span>
                      <span className="text-blue-600 font-bold">{results.conversionRate}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Security Risk Level: </span>
                      <span className={`font-medium ${parseFloat(results.securityRisk) <= 20 ? 'text-green-600' : parseFloat(results.securityRisk) <= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.securityRisk}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Expected Transactions: </span>
                      <span className="text-green-600 font-bold">{results.expectedTransactions}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fraud Loss: </span>
                      <span className="text-red-600 font-medium">{results.fraudLoss} transactions</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Net Valid Transactions: </span>
                      <span className="text-green-600 font-bold">{results.netTransactions}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Prevention Investment: </span>
                      <span className="text-orange-600">₹{results.fraudPreventionCost}</span>
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

        {/* Legal Compliance Simulator */}
        {selectedSimulator === 'compliance' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Legal Compliance & Consumer Protection</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Protection Level</label>
                  <select
                    value={inputs.privacyLevel}
                    onChange={(e) => handleInputChange('privacyLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select privacy level</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Compliance Cost (₹)</label>
                  <input
                    type="number"
                    value={inputs.complianceCost}
                    onChange={(e) => handleInputChange('complianceCost', e.target.value)}
                    placeholder="Enter compliance investment"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Potential Violation Penalty (₹)</label>
                  <input
                    type="number"
                    value={inputs.violationPenalty}
                    onChange={(e) => handleInputChange('violationPenalty', e.target.value)}
                    placeholder="Enter potential penalty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consumer Complaints (per month)</label>
                  <input
                    type="number"
                    value={inputs.consumerComplaints}
                    onChange={(e) => handleInputChange('consumerComplaints', e.target.value)}
                    placeholder="Enter complaint count"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average Resolution Time (hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.resolutionTime}
                    onChange={(e) => handleInputChange('resolutionTime', e.target.value)}
                    placeholder="Enter resolution time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateCompliance}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Calculate Compliance Metrics
                </button>
              </div>

              {results && results.type === 'compliance' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Compliance Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Compliance Score: </span>
                      <span className={`font-bold ${parseFloat(results.complianceScore) >= 85 ? 'text-green-600' : parseFloat(results.complianceScore) >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.complianceScore}/100
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Risk Level: </span>
                      <span className={`font-medium ${results.riskLevel === 'Low Risk' ? 'text-green-600' : results.riskLevel === 'Medium Risk' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Potential Savings: </span>
                      <span className="text-green-600 font-bold">₹{results.potentialSavings}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Compliance ROI: </span>
                      <span className={`font-bold ${parseFloat(results.roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.roi}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Complaint Rate: </span>
                      <span className="text-orange-600">{results.complaintRate}%</span>
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
      </div>
    </div>
  );
};

export default ModuleV;