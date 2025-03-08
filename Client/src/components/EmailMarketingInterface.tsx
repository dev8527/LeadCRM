import React, { useState } from "react";
import OpenAIs from "openai";
import { Plus, Trash, Send, ClipboardList, Mail, Sparkles } from "lucide-react";

const SequenceManager = () => {
  const [activeTab, setActiveTab] = useState("sequence");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("sales");
  const [steps, setSteps] = useState([]);

  // Function to add a new step
  const addStep = async () => {
    const aiGeneratedStep = await generateEmailStepAI();
    setSteps([...steps, { id: Date.now(), ...aiGeneratedStep }]);
  };

  // Function to remove a step
  const removeStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  // Function to update step values
  const handleStepChange = (id, field, value) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  // Function to get AI-generated email content
  const generateEmailStepAI = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `
                Generate an engaging cold email for potential customers who have not responded to our initial outreach. 
                The email should include:
                - A compelling and curiosity-driven subject line (under 10 words).  
                - A personalized introduction that captures attention.  
                - A concise yet persuasive body focusing on a key pain point.  
                - A value proposition explaining how our [product/service] solves the problem.  
                - A strong call-to-action (e.g., scheduling a call, replying, or clicking a link).  
                - A friendly, natural tone that encourages engagement.  
                
                Format the response as:  
                [Your engaging subject line]  
                [Your engaging email body]  
              `
            }
          ],
          
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content.split("\n");

      return {
        subject: aiResponse?.[0] || "Follow-up Email",
        body: aiResponse?.slice(1).join("\n") || "Hello, just checking in...",
        delay: 1,
        delayUnit: "days",
      };
    } catch (error) {
      console.error("Error generating email step:", error);
      return { subject: "AI Error", body: "Could not generate content.", delay: 1, delayUnit: "days" };
    }
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-8 transition-all duration-300">
      {/* Tab Navigation */}
      <div className="flex border-b pb-3 mb-6 space-x-6">
        {[
          { key: "sequence", label: "Sequence Details", icon: <ClipboardList size={18} /> },
          { key: "steps", label: "Email Steps", icon: <Mail size={18} /> },
        ].map((tab) => (
          <div
            key={tab.key}
            className={`px-6 py-2 flex items-center space-x-2 cursor-pointer rounded-t-lg transition-all ${
              activeTab === tab.key
                ? "text-blue-600 border-b-4 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600 hover:border-b-4 hover:border-blue-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span className="font-semibold">{tab.label}</span>
          </div>
        ))}
      </div>

      {/* Sequence Details */}
      {activeTab === "sequence" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Email Sequence</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sequence Name</label>
              <input
                type="text"
                className="w-full border rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sequence name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="w-full border rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="sales">Sales Outreach</option>
                <option value="welcome">Welcome Series</option>
                <option value="nurture">Lead Nurturing</option>
                <option value="followup">Follow-up</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Email Steps */}
      {activeTab === "steps" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Email Steps</h2>
          {steps.length > 0 ? (
            steps.map((step, index) => (
              <div key={step.id} className="border p-5 rounded-xl shadow-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Step {index + 1}</h3>
                  <button
                    onClick={() => removeStep(step.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-md transition-all"
                  >
                    <Trash size={18} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                      value={step.subject}
                      onChange={(e) => handleStepChange(step.id, "subject", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Content</label>
                    <textarea
                      className="w-full border rounded-lg p-3 h-80 focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      value={step.body}
                      onChange={(e) => handleStepChange(step.id, "body", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No steps added yet. Click below to add one.</p>
          )}
          <button
            onClick={addStep}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-all shadow-md"
          >
            <Plus size={20} className="mr-2" /> Generate AI Step
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        {activeTab === "sequence" && (
          <button onClick={() => setActiveTab("steps")} className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md">
            Next Step
          </button>
        )}
        {activeTab === "steps" && (
          <button className="bg-green-600 text-white px-5 py-3 rounded-lg flex items-center hover:bg-green-700 transition-all shadow-md">
            <Send size={20} className="mr-2" /> Start Sequence
          </button>
        )}
      </div>
    </div>
  );
};

export default SequenceManager;
