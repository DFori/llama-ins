// insurance-chat-app/src/App.jsx
import React, { useState } from 'react';

const fakePolicies = [
  {
    id: 1,
    name: 'Fori Home Protect',
    description: 'Covers damage and theft for renters and homeowners.',
    price: 25000,
    percentage: 10,
    duration: '1 year',
    type: 'Home',
    eligibility: 'Homeowners or renters over 21',
    benefits: ['Fire damage', 'Theft protection', 'Flood coverage']
  },
  {
    id: 2,
    name: 'Fori Family Shield',
    description: 'Complete life and health coverage for families.',
    price: 45000,
    percentage: 12,
    duration: '1 year',
    type: 'Family',
    eligibility: 'Married individuals or guardians with children',
    benefits: ['Hospital bills', 'Life coverage', 'Child education support']
  },
  {
    id: 3,
    name: 'Fori Auto Secure',
    description: 'Comprehensive vehicle insurance for private car owners.',
    price: 30000,
    percentage: 8,
    duration: '1 year',
    type: 'Auto',
    eligibility: 'Valid driver\'s license and registered vehicle',
    benefits: ['Accident repair', 'Third-party liability', 'Towing service']
  },
  {
    id: 4,
    name: 'Fori Senior Life Plan',
    description: 'Affordable life and medical cover for seniors.',
    price: 20000,
    percentage: 9,
    duration: '1 year',
    type: 'Senior',
    eligibility: 'Ages 60 and above',
    benefits: ['Life insurance', 'Hospital care', 'Chronic illness support']
  }
];

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:11434/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'ALIENTELLIGENCE/insuranceservices',
          messages: [
            {
              role: 'system',
              content: `You are an AI insurance advisor. Ask the user relevant questions to understand their life situation before recommending any insurance policy.

If you already have answers, use them. If not, ask one question at a time. Be conversational.

Here is the database schema:
- age
- owns_house
- has_kids
- kids_biological
- smoker
- job_type
- income_range

Available policies and conditions:
${JSON.stringify(fakePolicies)}

Conversation:
${newMessages.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n')}

User profile (so far):
${JSON.stringify(userProfile)}

Instructions:
Only recommend policies when confident. Otherwise, ask more.`
            },
            ...newMessages
          ],
          max_tokens: 512
        })
      });

      const data = await response.json();
      const aiMessage = data.choices[0].message;
      setMessages([...newMessages, aiMessage]);

      // Simple profile extraction example (can be replaced with LLM JSON parser)
      const content = aiMessage.content.toLowerCase();
      const updates = { ...userProfile };
      if (content.includes('how old are you') && !updates.age) updates.age = null;
      if (content.includes('own') && content.includes('house')) updates.owns_house = null;
      if (content.includes('kids')) updates.has_kids = null;
      if (content.includes('smoke')) updates.smoker = null;
      if (content.includes('job') || content.includes('employ')) updates.job_type = null;
      if (content.includes('income')) updates.income_range = null;
      setUserProfile(updates);

    } catch (err) {
      console.error('Error communicating with AI:', err);
      alert('Error communicating with AI. Check server log.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-blue-200">
        <h1 className="text-2xl font-bold text-center text-blue-700">🛡️ Fori Insurance AI Agent</h1>

        <div className="h-96 overflow-y-auto border rounded-lg bg-blue-50 p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm px-4 py-2 rounded-xl w-fit max-w-[80%] whitespace-pre-wrap shadow-sm ${msg.role === 'user' ? 'ml-auto bg-blue-200 text-right' : 'mr-auto bg-green-100 text-left'}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-center text-gray-500 italic">AI is thinking...</div>}
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ask about Fori insurance policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;