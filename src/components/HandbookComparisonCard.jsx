// src/components/HandbookComparisonCard.jsx

import React, { useState } from 'react';

function ExpandableOption({ title, children, startOpen = true }) {
    const [open, setOpen] = useState(startOpen);
    return (
        <div className="border rounded-md p-4 shadow-sm my-2 bg-gray-800 border-gray-600">
            <div className="font-semibold cursor-pointer hover:underline text-yellow-300" onClick={() => setOpen(!open)}>
                {open ? '▼' : '▶'} {title}
            </div>
            {open && <div className="mt-2 space-y-2">{children}</div>}
        </div>
    );
}

export default function HandbookComparisonCard({ apiKey }) {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedLanguage, setSuggestedLanguage] = useState(null);

    const comparisonTopics = {
        socialMedia: {
            name: "Employee Social Media & Digital Conduct",
            ts: `8.3 Technology Acceptable Use Policy... Social networking websites (Myspace, Facebook, etc.) are also off limits unless it is for valid school purposes.`,
            h1: `Social Media Policy... Do not engage in online conversations or interactions with students on personal social media accounts...`,
            h2: `Social Networking... Employees may not "friend," "follow," or otherwise link to students currently enrolled at the School...`
        },
        harassment: {
            name: "Harassment Policy & Reporting Procedures",
            ts: `2.4 Non-Discrimination and Harassment... report it immediately to your supervisor... or the Head of School...`,
            h1: `Employee Policy against Harassment... Employees are encouraged to speak with their immediate supervisor or another administrator...`,
            h2: `Policy against Harassment... promptly contact someone at school to whom he/she or the offending party reports...`
        }
    };

    const handleAnalyze = () => {
        if (!selectedTopic) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setSuggestedLanguage(null);
        setTimeout(() => {
            const topicData = comparisonTopics[selectedTopic];
            setAnalysisResult({
                ...topicData,
                recommendation: `The TS Handbook is less specific than H1 and H2 regarding direct social media contact with students. It should be updated to explicitly prohibit "friending" or "following" current students on personal accounts to maintain professional boundaries, similar to the language used in H1 and H2.`
            });
            setIsAnalyzing(false);
        }, 1000);
    };
    
    const handleSuggestChange = () => {
        if (!analysisResult) return;
        setIsSuggesting(true);
        setTimeout(() => {
            setSuggestedLanguage(`To ensure professional boundaries are maintained, employees are prohibited from engaging in private online interactions with current students on personal social media platforms. This includes, but is not limited to, "friending," "following," or accepting connection requests from students. All school-related digital communication must be conducted through official school channels.`);
            setIsSuggesting(false);
        }, 1000);
    };

    const handleClose = () => {
        setAnalysisResult(null);
        setSelectedTopic("");
        setSuggestedLanguage(null);
    };

    return (
        <div className="shadow-2xl border-0 rounded-2xl mb-6 bg-gray-700">
            <div className="p-6 text-white">
                <h2 className="text-xl font-bold">IQ Handbook Comparison</h2>
                <div className="mt-4 space-y-2">
                    <p>Compare your current handbook to others based on specific queries.</p>
                    <div>
                        <label htmlFor="handbookQuery" className="block font-medium mb-1">Select a Topic to Analyze</label>
                        <select id="handbookQuery" className="w-full p-2 rounded-md text-black" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} disabled={!!analysisResult}>
                            <option value="">-- Select a Topic --</option>
                            {Object.entries(comparisonTopics).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-4">
                        {!analysisResult ? (
                            <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700" onClick={handleAnalyze} disabled={isAnalyzing || !selectedTopic}>
                                {isAnalyzing ? "Analyzing..." : "Analyze"}
                            </button>
                        ) : (
                            <button className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-700" onClick={handleClose}>
                                Close
                            </button>
                        )}
                    </div>
                </div>

                {analysisResult && (
                    <div className="mt-6 border-t border-gray-500 pt-4 space-y-4">
                        <ExpandableOption title="Your Current Handbook (TS)">
                             <p className="text-blue-200 p-3 rounded-md whitespace-pre-line bg-gray-900">{analysisResult.ts}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 1 (H1)">
                            <p className="text-black bg-white p-3 rounded-md whitespace-pre-line">{analysisResult.h1}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 2 (H2)">
                            <p className="text-black bg-white p-3 rounded-md whitespace-pre-line">{analysisResult.h2}</p>
                        </ExpandableOption>
                        <div className="p-4 rounded-md bg-green-900 bg-opacity-40 border border-green-500">
                             <h4 className="font-bold text-lg text-green-300 mb-2">Differences & Recommendations</h4>
                             <p className="text-white whitespace-pre-line">{analysisResult.recommendation}</p>
                             {!suggestedLanguage && (
                                <div className="mt-4">
                                    <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700" onClick={handleSuggestChange} disabled={isSuggesting}>
                                        {isSuggesting ? "Generating..." : "Suggest Changes"}
                                    </button>
                                </div>
                             )}
                        </div>
                        {suggestedLanguage && (
                            <div className="p-4 rounded-md bg-yellow-900 bg-opacity-40 border border-yellow-500">
                                <h4 className="font-bold text-lg text-yellow-300 mb-2">AI-Generated Language</h4>
                                <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-line italic">{suggestedLanguage}</div>
                                <div className="mt-4">
                                    <button className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-700" onClick={() => alert("This would add the language to the handbook in a live system.")}>
                                        Add to Handbook
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
