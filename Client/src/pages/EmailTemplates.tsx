import { useState } from "react";
import TemplateList from "../components/TemplateList";
import CustomEditor from "../components/CustomEditor";
import { fetchAIResponse } from "../hooks/fetchAIResponse";
import DashboardLayout from "../components/MainLayout";

export default function EmailTemplates() {
    const [emailContent, setEmailContent] = useState("");

    const handleAIEnhance = async () => {
        const improvedContent = await fetchAIResponse(emailContent);
        setEmailContent(improvedContent);
    };

    return (
        <DashboardLayout>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <TemplateList onSelect={setEmailContent} />
                    </div>
                    <div className="w-full md:w-2/3">
                        <CustomEditor content={emailContent} onChange={setEmailContent} />
                        <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleAIEnhance}>
                            Enhance with AI
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
