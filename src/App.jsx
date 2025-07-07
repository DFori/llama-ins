// insurance-chat-app/src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Test from "./Test.jsx";

const fakePolicies = [
  {
    "Id": 3,
    "IsActive": true,
    "PolicyName": "Third Party Motor Insurance",
    "Description": "Third Party Motor Insurance",
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 2,
    "CategoryId": 1,
    "DateCreated": "2024-10-09T23:00:00.000Z",
    "LastUpdated": null
  },
  {
    "Id": 4,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 3,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T07:57:14.113Z",
    "LastUpdated": null
  },
  {
    "Id": 5,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 4,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T07:58:17.960Z",
    "LastUpdated": null
  },
  {
    "Id": 6,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 5,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T07:58:41.543Z",
    "LastUpdated": null
  },
  {
    "Id": 7,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 6,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T08:11:13.618Z",
    "LastUpdated": null
  },
  {
    "Id": 8,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 7,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T08:11:49.003Z",
    "LastUpdated": null
  },
  {
    "Id": 9,
    "IsActive": false,
    "PolicyName": "Third Party Motor Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 8,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T08:13:06.464Z",
    "LastUpdated": null
  },
  {
    "Id": 10,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 2,
    "PartnerId": 2,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T08:59:24.412Z",
    "LastUpdated": null
  },
  {
    "Id": 12,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 2,
    "PartnerId": 5,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:01:03.001Z",
    "LastUpdated": null
  },
  {
    "Id": 14,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 2,
    "PartnerId": 6,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:06:54.928Z",
    "LastUpdated": null
  },
  {
    "Id": 13,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": "Comprehensive Motor Insurance",
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 0,
    "PartnerId": 6,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:01:42.558Z",
    "LastUpdated": null
  },
  {
    "Id": 15,
    "IsActive": false,
    "PolicyName": "Her Private Motor Insurance",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 2,
    "PartnerId": 3,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:21:24.390Z",
    "LastUpdated": null
  },
  {
    "Id": 16,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.03,
    "PolicyType": 2,
    "PartnerId": 7,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:37:17.184Z",
    "LastUpdated": null
  },
  {
    "Id": 17,
    "IsActive": false,
    "PolicyName": "Third Party Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 8,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:44:03.884Z",
    "LastUpdated": null
  },
  {
    "Id": 18,
    "IsActive": false,
    "PolicyName": "Third Party Insurance",
    "Description": null,
    "PriceType": "Flat",
    "FlatPrice": 15000,
    "PolicyType": 1,
    "PartnerId": 7,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:44:44.455Z",
    "LastUpdated": null
  },
  {
    "Id": 11,
    "IsActive": false,
    "PolicyName": "Comprehensive Motor Insurance",
    "Description": "Comprehensive Motor Insurance",
    "PriceType": "Percentage",
    "FlatPrice": 0.05,
    "PolicyType": 2,
    "PartnerId": 3,
    "CategoryId": 1,
    "DateCreated": "2024-02-09T09:00:22.778Z",
    "LastUpdated": null
  },
  {
    "Id": 19,
    "IsActive": false,
    "PolicyName": "Heirs Endowment Assurance",
    "Description": "Heirs Endowment Assurance",
    "PriceType": "Percentage",
    "FlatPrice": 1,
    "PolicyType": 6,
    "PartnerId": 3,
    "CategoryId": 5,
    "DateCreated": "2024-02-13T08:18:38.335Z",
    "LastUpdated": null
  },
  {
    "Id": 20,
    "IsActive": false,
    "PolicyName": "Cornerstone I-SAVE",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 1,
    "PolicyType": 6,
    "PartnerId": 4,
    "CategoryId": 5,
    "DateCreated": "2024-02-13T08:26:27.698Z",
    "LastUpdated": null
  },
  {
    "Id": 21,
    "IsActive": false,
    "PolicyName": "Family Welfare 1,000",
    "Description": "Family Welfare 1,000",
    "PriceType": "Flat",
    "FlatPrice": 1000,
    "PolicyType": 4,
    "PartnerId": 5,
    "CategoryId": 5,
    "DateCreated": "2024-03-14T11:49:58.068Z",
    "LastUpdated": null
  },
  {
    "Id": 22,
    "IsActive": false,
    "PolicyName": "Family Welfare 2,500",
    "Description": "Family Welfare 2,500",
    "PriceType": "Flat",
    "FlatPrice": 2500,
    "PolicyType": 4,
    "PartnerId": 5,
    "CategoryId": 5,
    "DateCreated": "2024-03-14T11:51:06.068Z",
    "LastUpdated": null
  },
  {
    "Id": 23,
    "IsActive": false,
    "PolicyName": "Family Welfare 4000",
    "Description": "Family Welfare 4000",
    "PriceType": "Flat",
    "FlatPrice": 4000,
    "PolicyType": 4,
    "PartnerId": 5,
    "CategoryId": 5,
    "DateCreated": "2024-03-14T11:52:10.517Z",
    "LastUpdated": null
  },
  {
    "Id": 24,
    "IsActive": false,
    "PolicyName": "Family Welfare 8,000",
    "Description": "Family Welfare 8,000",
    "PriceType": "Flat",
    "FlatPrice": 8000,
    "PolicyType": 4,
    "PartnerId": 5,
    "CategoryId": 5,
    "DateCreated": "2024-03-14T11:53:39.180Z",
    "LastUpdated": null
  },
  {
    "Id": 25,
    "IsActive": false,
    "PolicyName": "Leadway Savings Plan",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.01,
    "PolicyType": 6,
    "PartnerId": 8,
    "CategoryId": 5,
    "DateCreated": "2024-03-19T09:27:08.064Z",
    "LastUpdated": null
  },
  {
    "Id": 26,
    "IsActive": false,
    "PolicyName": "Flexible Investment ",
    "Description": null,
    "PriceType": "Percentage",
    "FlatPrice": 0.01,
    "PolicyType": 6,
    "PartnerId": 6,
    "CategoryId": 5,
    "DateCreated": "2024-03-19T09:38:58.400Z",
    "LastUpdated": null
  }
];


function Home({
  messages,
  input,
  loading,
  userProfile,
  sendMessage,
  handleKeyPress,
  setInput,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-blue-200">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          🛡️ Fori Insurance AI Agent
        </h1>

        <div className="h-96 overflow-y-auto border rounded-lg bg-blue-50 p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm px-4 py-2 rounded-xl w-fit max-w-[80%] whitespace-pre-wrap shadow-sm ${
                msg.role === "user"
                  ? "ml-auto bg-blue-200 text-right"
                  : "mr-auto bg-green-100 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500 italic">
              AI is thinking...
            </div>
          )}
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

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:11434/v1/chat/completions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "ALIENTELLIGENCE/insuranceservices",
            messages: [
              {
                role: "system",
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
${newMessages
  .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
  .join("\n")}

User profile (so far):
${JSON.stringify(userProfile)}

Instructions:
Only recommend policies when confident. Otherwise, ask more.`,
              },
              ...newMessages,
            ],
            max_tokens: 512,
          }),
        }
      );

      const data = await response.json();
      const aiMessage = data.choices[0].message;
      setMessages([...newMessages, aiMessage]);

      // Simple profile extraction example (can be replaced with LLM JSON parser)
      const content = aiMessage.content.toLowerCase();
      const updates = { ...userProfile };
      if (content.includes("how old are you") && !updates.age)
        updates.age = null;
      if (content.includes("own") && content.includes("house"))
        updates.owns_house = null;
      if (content.includes("kids")) updates.has_kids = null;
      if (content.includes("smoke")) updates.smoker = null;
      if (content.includes("job") || content.includes("employ"))
        updates.job_type = null;
      if (content.includes("income")) updates.income_range = null;
      setUserProfile(updates);
    } catch (err) {
      console.error("Error communicating with AI:", err);
      alert("Error communicating with AI. Check server log.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 text-white font-semibold flex justify-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              messages={messages}
              input={input}
              loading={loading}
              userProfile={userProfile}
              sendMessage={sendMessage}
              handleKeyPress={handleKeyPress}
              setInput={setInput}
            />
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
