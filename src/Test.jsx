// insurance-chat-app/src/App.jsx
import React, { useEffect, useState } from 'react';

function Test() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [policyData, setPolicyData] = useState('');

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/policies');
        const data = await res.json();
        setPolicyData(JSON.stringify(data));
      } catch (err) {
        console.error('Failed to fetch policies:', err);
      }
    };
    fetchPolicies();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !policyData) return;
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
              content: `You are an AI insurance advisor. Ask the user few questions (because this is a test) to understand their life situation before recommending any insurance policy.
              use only the available policies and conditions to answer questions.
              Available policies and conditions: ${policyData} these are the only policies you can recommend.

If you already have answers, use them. If not, ask them for the information you need. Be conversational.

Here are the questions you can ask to build the user profile:
- age
- owns_house
- has_kids
 
Available policies and conditions:
${policyData}

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
        <h1 className="text-2xl font-bold text-center text-blue-700">🛡️ Test Insurance AI Agent</h1>

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

export default Test;
