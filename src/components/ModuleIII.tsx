import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleIII: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('security');
  const [inputs, setInputs] = useState({
    threatLevel: '',
    securityBudget: '',
    dataValue: '',
    userCount: '',
    attackType: '',
    encryptionLevel: '',
    vulnerabilities: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const definitions = [
    {
      term: "E-Commerce Security",
      definition: "Protection of e-commerce transactions, websites, and data from unauthorized access and cyber threats."
    },
    {
      term: "Security Threats",
      definition: "Malware, phishing, SQL injection, DDoS attacks, identity theft, and data breaches."
    },
    {
      term: "Authentication",
      definition: "Process of verifying the identity of users, systems, or applications accessing e-commerce platforms."
    },
    {
      term: "Encryption",
      definition: "Converting data into coded form to prevent unauthorized access during transmission or storage."
    },
    {
      term: "SSL/TLS",
      definition: "Secure Socket Layer/Transport Layer Security protocols that provide secure communication over networks."
    },
    {
      term: "Digital Certificates",
      definition: "Electronic credentials that verify the authenticity of websites and secure communications."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const simulateSecurity = () => {
    const { threatLevel, securityBudget, dataValue, userCount } = inputs;
    
    if (!threatLevel || !securityBudget || !dataValue || !userCount) {
      alert('Please fill in all fields');
      return;
    }

    const budget = parseFloat(securityBudget);
    const value = parseFloat(dataValue);
    const users = parseInt(userCount);
    
    let riskLevel = '';
    let protectionLevel = '';
    let securityScore = 0;
    
    // Calculate security score based on threat level and budget
    const threatMultiplier = threatLevel === 'High' ? 3 : threatLevel === 'Medium' ? 2 : 1;
    const budgetRatio = budget / value;
    securityScore = Math.min(100, (budgetRatio * 100) / threatMultiplier);
    
    if (securityScore >= 80) {
      protectionLevel = 'Excellent Protection';
      riskLevel = 'Low Risk';
    } else if (securityScore >= 60) {
      protectionLevel = 'Good Protection';
      riskLevel = 'Medium Risk';
    } else {
      protectionLevel = 'Basic Protection';
      riskLevel = 'High Risk';
    }

    const costPerUser = budget / users;
    const recommendedBudget = value * 0.05 * threatMultiplier; // 5% of data value times threat multiplier

    setResults({
      type: 'security',
      securityScore: securityScore.toFixed(1),
      protectionLevel,
      riskLevel,
      costPerUser: costPerUser.toFixed(2),
      recommendedBudget: recommendedBudget.toFixed(2),
      steps: [
        `Step 1: Assess threat level: ${threatLevel} (Multiplier: ${threatMultiplier})`,
        `Step 2: Calculate budget ratio: ₹${budget} ÷ ₹${value} = ${budgetRatio.toFixed(3)}`,
        `Step 3: Apply threat adjustment: ${budgetRatio.toFixed(3)} × 100 ÷ ${threatMultiplier} = ${securityScore.toFixed(1)}`,
        `Step 4: Determine protection level: ${protectionLevel}`,
        `Step 5: Calculate cost per user: ₹${budget} ÷ ${users} = ₹${costPerUser}`
      ]
    });
  };

  const simulateThreats = () => {
    const { attackType, encryptionLevel, vulnerabilities } = inputs;
    
    if (!attackType || !encryptionLevel || !vulnerabilities) {
      alert('Please fill in all fields');
      return;
    }

    let threatScore = 0;
    let countermeasures = [];
    let riskMitigation = '';

    // Attack type impact
    switch(attackType) {
      case 'Phishing':
        threatScore += 30;
        countermeasures.push('User education', 'Email filtering', 'Multi-factor authentication');
        break;
      case 'SQL Injection':
        threatScore += 40;
        countermeasures.push('Input validation', 'Parameterized queries', 'Web application firewall');
        break;
      case 'DDoS':
        threatScore += 35;
        countermeasures.push('Traffic filtering', 'Load balancing', 'CDN implementation');
        break;
      case 'Malware':
        threatScore += 45;
        countermeasures.push('Antivirus software', 'Regular updates', 'Sandboxing');
        break;
    }

    // Encryption level adjustment
    const encryptionReduction = encryptionLevel === 'AES-256' ? 20 : encryptionLevel === 'AES-128' ? 15 : 5;
    threatScore -= encryptionReduction;

    // Vulnerability count impact
    const vulnCount = parseInt(vulnerabilities);
    threatScore += vulnCount * 5;

    riskMitigation = (100 - Math.max(0, threatScore)).toFixed(1);

    setResults({
      type: 'threats',
      threatScore: Math.max(0, threatScore).toFixed(1),
      riskMitigation,
      countermeasures,
      encryptionReduction,
      steps: [
        `Step 1: Assess attack type impact: ${attackType} = ${attackType === 'Malware' ? 45 : attackType === 'SQL Injection' ? 40 : attackType === 'DDoS' ? 35 : 30} points`,
        `Step 2: Apply encryption protection: -${encryptionReduction} points for ${encryptionLevel}`,
        `Step 3: Add vulnerability impact: ${vulnCount} vulnerabilities × 5 = +${vulnCount * 5} points`,
        `Step 4: Calculate final threat score: ${Math.max(0, threatScore).toFixed(1)}/100`,
        `Step 5: Determine risk mitigation level: ${riskMitigation}%`
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Module III: E-Commerce Security</h2>
        <p className="text-gray-600">18 Hours • Security measures, threats, and protection strategies</p>
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
              onClick={() => setSelectedSimulator('security')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'security'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Security Investment Calculator
            </button>
            <button
              onClick={() => setSelectedSimulator('threats')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'threats'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Threat Assessment Tool
            </button>
          </div>
        </div>

        {/* Security Investment Simulator */}
        {selectedSimulator === 'security' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Security Investment & Risk Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Threat Level</label>
                  <select
                    value={inputs.threatLevel}
                    onChange={(e) => handleInputChange('threatLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select threat level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Security Budget (₹)</label>
                  <input
                    type="number"
                    value={inputs.securityBudget}
                    onChange={(e) => handleInputChange('securityBudget', e.target.value)}
                    placeholder="Enter security budget"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Value (₹)</label>
                  <input
                    type="number"
                    value={inputs.dataValue}
                    onChange={(e) => handleInputChange('dataValue', e.target.value)}
                    placeholder="Enter estimated data value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Users</label>
                  <input
                    type="number"
                    value={inputs.userCount}
                    onChange={(e) => handleInputChange('userCount', e.target.value)}
                    placeholder="Enter user count"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateSecurity}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Calculate Security Metrics
                </button>
              </div>

              {results && results.type === 'security' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Security Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Security Score: </span>
                      <span className={`font-bold ${parseFloat(results.securityScore) >= 80 ? 'text-green-600' : parseFloat(results.securityScore) >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.securityScore}/100
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Protection Level: </span>
                      <span className="text-blue-600 font-medium">{results.protectionLevel}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Risk Level: </span>
                      <span className={`font-medium ${results.riskLevel === 'Low Risk' ? 'text-green-600' : results.riskLevel === 'Medium Risk' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Cost Per User: </span>
                      <span className="text-gray-900">₹{results.costPerUser}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Recommended Budget: </span>
                      <span className="text-orange-600 font-medium">₹{results.recommendedBudget}</span>
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

        {/* Threat Assessment Simulator */}
        {selectedSimulator === 'threats' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Threat Assessment & Countermeasures</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Attack Type</label>
                  <select
                    value={inputs.attackType}
                    onChange={(e) => handleInputChange('attackType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select attack type</option>
                    <option value="Phishing">Phishing</option>
                    <option value="SQL Injection">SQL Injection</option>
                    <option value="DDoS">DDoS Attack</option>
                    <option value="Malware">Malware</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Level</label>
                  <select
                    value={inputs.encryptionLevel}
                    onChange={(e) => handleInputChange('encryptionLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select encryption</option>
                    <option value="None">No Encryption</option>
                    <option value="AES-128">AES-128</option>
                    <option value="AES-256">AES-256</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Known Vulnerabilities</label>
                  <input
                    type="number"
                    value={inputs.vulnerabilities}
                    onChange={(e) => handleInputChange('vulnerabilities', e.target.value)}
                    placeholder="Enter number of vulnerabilities"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateThreats}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Assess Threats & Countermeasures
                </button>
              </div>

              {results && results.type === 'threats' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Threat Assessment Results</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Threat Score: </span>
                      <span className={`font-bold ${parseFloat(results.threatScore) <= 30 ? 'text-green-600' : parseFloat(results.threatScore) <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {results.threatScore}/100
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Risk Mitigation: </span>
                      <span className="text-green-600 font-bold">{results.riskMitigation}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Encryption Reduction: </span>
                      <span className="text-blue-600">-{results.encryptionReduction} points</span>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium text-gray-700">Recommended Countermeasures:</span>
                      <ul className="mt-2 space-y-1">
                        {results.countermeasures.map((measure: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700 ml-4">• {measure}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Assessment Steps:</h6>
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

export default ModuleIII;