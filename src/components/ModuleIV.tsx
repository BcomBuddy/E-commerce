import React, { useState } from 'react';
import { Calculator, BookOpen } from 'lucide-react';

const ModuleIV: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('payment');
  const [inputs, setInputs] = useState({
    paymentMethod: '',
    transactionAmount: '',
    currency: '',
    processingFee: '',
    cardType: '',
    micropaymentCount: '',
    micropaymentValue: '',
    checkAmount: '',
    processingTime: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const definitions = [
    {
      term: "Electronic Payment Systems",
      definition: "Digital methods for conducting financial transactions over electronic networks."
    },
    {
      term: "Payment Cards",
      definition: "Credit cards, debit cards, and prepaid cards used for online transactions with magnetic stripe or chip technology."
    },
    {
      term: "Smart Cards",
      definition: "Payment cards with embedded microprocessors that can store and process data securely."
    },
    {
      term: "E-Micropayments",
      definition: "Small-value electronic transactions, typically under $10, used for digital content purchases."
    },
    {
      term: "E-Checking",
      definition: "Electronic version of traditional paper checks using digital signatures and online processing."
    },
    {
      term: "Electronic Bill Payment",
      definition: "Automated system for paying bills electronically through online banking or payment services."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const simulatePayment = () => {
    const { paymentMethod, transactionAmount, currency, processingFee } = inputs;
    
    if (!paymentMethod || !transactionAmount || !currency || !processingFee) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(transactionAmount);
    const fee = parseFloat(processingFee);
    
    const totalCost = amount + fee;
    const feePercentage = (fee / amount) * 100;
    
    let securityLevel = '';
    let processingSpeed = '';
    let riskFactor = '';

    switch(paymentMethod) {
      case 'Credit Card':
        securityLevel = 'High (PCI DSS Compliance)';
        processingSpeed = '2-3 seconds';
        riskFactor = 'Medium (Chargeback risk)';
        break;
      case 'Smart Card':
        securityLevel = 'Very High (Chip + PIN)';
        processingSpeed = '1-2 seconds';
        riskFactor = 'Low (Enhanced authentication)';
        break;
      case 'E-Check':
        securityLevel = 'Medium (Digital signature)';
        processingSpeed = '1-3 business days';
        riskFactor = 'Low (Bank verification)';
        break;
      case 'Digital Wallet':
        securityLevel = 'High (Tokenization)';
        processingSpeed = '1-2 seconds';
        riskFactor = 'Medium (Account security dependent)';
        break;
    }

    setResults({
      type: 'payment',
      totalCost: totalCost.toFixed(2),
      feePercentage: feePercentage.toFixed(2),
      securityLevel,
      processingSpeed,
      riskFactor,
      steps: [
        `Step 1: Transaction amount: ₹${amount}`,
        `Step 2: Processing fee: ₹${fee}`,
        `Step 3: Calculate total cost: ₹${amount} + ₹${fee} = ₹${totalCost.toFixed(2)}`,
        `Step 4: Calculate fee percentage: (₹${fee} ÷ ₹${amount}) × 100 = ${feePercentage.toFixed(2)}%`,
        `Step 5: Assess payment method: ${paymentMethod} - ${securityLevel}`
      ]
    });
  };

  const simulateMicropayment = () => {
    const { micropaymentCount, micropaymentValue } = inputs;
    
    if (!micropaymentCount || !micropaymentValue) {
      alert('Please fill in all fields');
      return;
    }

    const count = parseInt(micropaymentCount);
    const value = parseFloat(micropaymentValue);
    
    const totalValue = count * value;
    const standardFee = totalValue * 0.029 + (count * 25); // Standard payment processing (₹25 per transaction)
    const micropaymentFee = totalValue * 0.05; // Micropayment processing
    const savings = standardFee - micropaymentFee;
    const savingsPercentage = (savings / standardFee) * 100;

    let recommendation = '';
    if (value <= 80) {
      recommendation = 'Use aggregated micropayment system';
    } else if (value <= 400) {
      recommendation = 'Standard micropayment processing';
    } else {
      recommendation = 'Consider regular payment processing';
    }

    setResults({
      type: 'micropayment',
      totalValue: totalValue.toFixed(2),
      standardFee: standardFee.toFixed(2),
      micropaymentFee: micropaymentFee.toFixed(2),
      savings: savings.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(1),
      recommendation,
      steps: [
        `Step 1: Calculate total value: ${count} × ₹${value} = ₹${totalValue.toFixed(2)}`,
        `Step 2: Standard processing fee: ₹${totalValue.toFixed(2)} × 2.9% + ${count} × ₹25 = ₹${standardFee.toFixed(2)}`,
        `Step 3: Micropayment processing fee: ₹${totalValue.toFixed(2)} × 5% = ₹${micropaymentFee.toFixed(2)}`,
        `Step 4: Calculate savings: ₹${standardFee.toFixed(2)} - ₹${micropaymentFee.toFixed(2)} = ₹${savings.toFixed(2)}`,
        `Step 5: Savings percentage: (₹${savings.toFixed(2)} ÷ ₹${standardFee.toFixed(2)}) × 100 = ${savingsPercentage.toFixed(1)}%`
      ]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Module IV: Electronic Payment Systems</h2>
        <p className="text-gray-600">18 Hours • Digital payment methods and transaction processing</p>
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
              onClick={() => setSelectedSimulator('payment')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'payment'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Payment Transaction Simulator
            </button>
            <button
              onClick={() => setSelectedSimulator('micropayment')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSimulator === 'micropayment'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Micropayment Analyzer
            </button>
          </div>
        </div>

        {/* Payment Transaction Simulator */}
        {selectedSimulator === 'payment' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Transaction Cost Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={inputs.paymentMethod}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select payment method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Smart Card">Smart Card</option>
                    <option value="E-Check">E-Check</option>
                    <option value="Digital Wallet">Digital Wallet</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.transactionAmount}
                    onChange={(e) => handleInputChange('transactionAmount', e.target.value)}
                    placeholder="Enter transaction amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={inputs.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select currency</option>
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.processingFee}
                    onChange={(e) => handleInputChange('processingFee', e.target.value)}
                    placeholder="Enter processing fee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulatePayment}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Process Payment Transaction
                </button>
              </div>

              {results && results.type === 'payment' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Transaction Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Total Cost: </span>
                      <span className="text-green-600 font-bold">₹{results.totalCost}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fee Percentage: </span>
                      <span className="text-orange-600 font-medium">{results.feePercentage}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Security Level: </span>
                      <span className="text-blue-600">{results.securityLevel}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Processing Speed: </span>
                      <span className="text-purple-600">{results.processingSpeed}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Risk Factor: </span>
                      <span className={`${results.riskFactor.includes('Low') ? 'text-green-600' : 'text-yellow-600'}`}>
                        {results.riskFactor}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900 mb-2">Transaction Steps:</h6>
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

        {/* Micropayment Simulator */}
        {selectedSimulator === 'micropayment' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Micropayment Economics Calculator</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Micropayments</label>
                  <input
                    type="number"
                    value={inputs.micropaymentCount}
                    onChange={(e) => handleInputChange('micropaymentCount', e.target.value)}
                    placeholder="Enter number of transactions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value per Micropayment (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.micropaymentValue}
                    onChange={(e) => handleInputChange('micropaymentValue', e.target.value)}
                    placeholder="Enter value per transaction"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={simulateMicropayment}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Analyze Micropayment Economics
                </button>
              </div>

              {results && results.type === 'micropayment' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3">Micropayment Analysis</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Total Transaction Value: </span>
                      <span className="text-green-600 font-bold">₹{results.totalValue}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Standard Processing Fee: </span>
                      <span className="text-red-600">₹{results.standardFee}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Micropayment Fee: </span>
                      <span className="text-orange-600">₹{results.micropaymentFee}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Cost Savings: </span>
                      <span className="text-green-600 font-bold">₹{results.savings}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Savings Percentage: </span>
                      <span className="text-blue-600 font-bold">{results.savingsPercentage}%</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Recommendation: </span>
                      <span className="text-purple-600">{results.recommendation}</span>
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

export default ModuleIV;