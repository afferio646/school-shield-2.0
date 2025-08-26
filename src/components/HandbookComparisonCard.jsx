// --- PASTE THIS ENTIRE CODE BLOCK INTO src/components/HandbookComparisonCard.js ---

import React, { useState } from 'react';
import { ExternalLink } from "lucide-react";

// This is a helper component used inside the main card.
function ExpandableOption({ title, children, customBg, customBorder, startOpen = false }) {
    const [open, setOpen] = useState(startOpen);
    return (
        <div
            className="border rounded-md p-4 shadow-sm my-2"
            style={{ 
                background: customBg || "rgba(0,0,0,0.1)", 
                borderColor: customBorder || "rgba(255,255,255,0.2)" 
            }}
        >
            <div
                className="font-semibold cursor-pointer hover:underline"
                style={{ color: "#faecc4" }}
                onClick={() => setOpen(!open)}
            >
                {open ? '▼' : '▶'} {title}
            </div>
            {open && <div className="mt-2 space-y-2">{children}</div>}
        </div>
    );
}

// --- UPDATED: Handbook Comparison Card with Close Button and AI Language Suggestion ---
export default function HandbookComparisonCard({ apiKey }) {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);
    // NEW state for language suggestion
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedLanguage, setSuggestedLanguage] = useState(null);

    const comparisonTopics = {
        atWillEmployment: {
            name: "At-Will Employment & Termination",
            ts: `1.2 Purpose of Employee Handbook\n...Except for those faculty and administrators employed pursuant to individual written employment contracts, employment at TS is “at-will,” which means that employment is not for a fixed term and may be terminated by TS or the employee at any time for any reason with or without notice.\n\n3.1 Employment Contracts\n...Any employee employed by TS who is not a party to such a written contract is employed ‘at will’.\n\n4.3 Separation from Employment\nTermination of employment is an inevitable part of personnel activity within any organization... Below are examples of some of the most common circumstances under which employment is terminated: RESIGNATION, DISCHARGE, RETIREMENT... Contract employees may be terminated as outlined in his/her contract... Contract employees have no right to renewal of a contract, and renewal decisions are within the sole discretion of the Head of School.`,
            h1: `Employment Termination\nTermination of employment is an inevitable part of personnel activity within any organization, and many of the reasons for termination are routine. Below are examples of some of the most common circumstances under which employment is terminated:\nResignation - Voluntary termination initiated by the employee.\nDischarge - Involuntary termination initiated by the organization.\nLayoff-Involuntary employment initiated by the organization for non-disciplinary reasons.\nRetirement - Voluntary termination initiated by the employee meeting age, length of service, or other criteria for retirement.\nAs part of the at-will letter process, employment with CWS is based on mutual consent, and both the employee and school have the right to terminate employment at will, with or without cause, at any time, consistent with all applicable laws.`,
            h2: `Section VII Compensation\nEmployment Agreements\nAll employment agreements (faculty contracts) are issued by the Head of School. Annual compensation when shared on the employment agreement may be rounded.`
        },
        socialMedia: {
            name: "Employee Social Media & Digital Conduct",
            ts: `8.3 Technology Acceptable Use Policy\nThis Technology Acceptable Use Policy for The Stanley Clark School (“SCS”) is enacted by the school to provide the parents, students, and staff of The Stanley Clark School community with a statement of purpose and explanation of the use of technology within the SCS learning community... The Stanley Clark School uses systems designed to block access to certain sites and filter content to protect students from viewing inappropriate sites and/or images on the internet... Social networking websites (Myspace, Facebook, etc.) are also off limits unless it is for valid school purposes.`,
            h1: `Social Media Policy\nThis policy is designed to guide employees in the appropriate use of social media in relation to their professional responsibilities, ensuring that both their personal and professional online presence reflect the values and standards expected within CWS.\nProfessional Conduct Online: Teachers and school employees are role models, and their online presence should align with the professional expectations of the education sector. When engaging in online activities, employees should:\nMaintain professional boundaries: Do not engage in online conversations or interactions with students on personal social media accounts, including never being friends/following/etc. current students.`,
            h2: `Section X Technology Acceptable Use Policy for Employees\nAs a member of the Canterbury community, each employee must adhere to the School's Technology Acceptable Use Policy. The digital world is one aspect of each employee's experience, and conduct in this domain should mirror basic expectations of professionalism and good judgment.\nSocial Networking\n• Employees may not "friend," "follow," or otherwise link to students currently enrolled at the School via the employees' personal social networking outlets. This is an instance of mixing one's professional and personal digital footprints, mentioned above.`
        },
        harassment: {
            name: "Harassment Policy & Reporting Procedures",
            ts: `2.4 Non-Discrimination and Harassment\nSCS is committed to providing a school environment that is free from all forms of discrimination and harassment... Sexual harassment is defined as unwanted sexual advances, or visual, verbal, or physical conduct of a sexual nature... Complaint Procedure: If you experience or witness sexual or other unlawful harassment at Stanley Clark, report it immediately to your supervisor. If your supervisor is unavailable or if you are uncomfortable contacting that person, you should immediately report this harassment to the Head of School, or any school administrator. All allegations of sexual harassment and other unlawful harassment will be quickly and discreetly investigated.`,
            h1: `Employee Policy against Harassment\nChicago Waldorf School is committed to maintaining a work environment that is free from harassment, discrimination, and retaliation... For the purposes of this policy, harassment includes, but is not limited to: Verbal Harassment, Physical Harassment, Visual Harassment, Sexual Harassment, Cyber Harassment, Bullying... Reporting Harassment: Any employee who believes they have experienced or witnessed harassment is encouraged to report the incident promptly. Employees are encouraged to speak with their immediate supervisor or another administrator they feel comfortable with. If the supervisor or administrator is the subject of the complaint, employees may report the issue to an alternative person, such as the Faculty or Administrative Director.`,
            h2: `Policy against Harassment\nIn order to provide an environment of mutual respect, tolerance, and sensitivity, it is important that every member of the community recognize certain guidelines for appropriate behavior... If an employee believes that he/she has been subject to harassment or discrimination, the following procedure should be followed... If the employee feels comfortable, he/she should let the offending person or people know that he/she wants the behavior to stop... If the employee does not feel comfortable confronting the person, he/she should promptly contact someone at school to whom he/she or the offending party reports, either directly or indirectly. This may include the Head of School, Division Heads, the Business Manager, or Department Chairs.`
        },
        fmla: {
            name: "Family and Medical Leave (FMLA)",
            ts: `5.9 Family and Medical Leave Act\nAny employee who has been employed by SCS for at least one year and has worked at least 1,250 hours during the past twelve (12) months is eligible for benefits under the Family and Medical Leave Act based on a rolling twelve (12) month period. Essentially, eligible employees are entitled to a maximum of twelve (12) weeks of unpaid leave to: To care for the employee’s child after the birth of that child or to care for a child placed with the employee for adoption or foster care... To care for the employee’s spouse, child or parent who has a “serious health condition”... To care for the employee’s own “serious health condition” which renders the employee unable to perform his or her job.`,
            h1: `Family and Medical Leave (FMLA)\nChicago Waldorf School complies with the federal Family and Medical Leave Act (FMLA), which requires employers to grant unpaid leaves of absence to qualified workers for certain medical and family-related reasons. The school abides by any state-regulated leave laws. The more generous of the two laws will apply to the employee if the employee is eligible under both federal and state laws.`,
            h2: `Family and Medical Leave (FMLA)\nCanterbury School complies with the federal Family and Medical Leave Act (FMLA), which requires employers to grant unpaid leaves of absence to qualified workers for certain medical and family-related reasons... Paid Family and Medical Leave (PFML): ...it is our policy to provide 10 work weeks of paid family and medical leave in a rolling 12-month period to eligible benefitted employees.`
        },
        grievance: {
            name: "Employee Grievance Procedures",
            ts: `3.5 Open Door Policy\nIt is the desire of SCS to provide good working conditions and maintain harmonious working relationships among employees, as well as between employees and management. In order to correct any work-related problems, management must be informed about them. Therefore, SCS has an “open door” problem solving policy. Employees are encouraged to discuss concerns or suggestions with their supervisor. Employees who believe that the supervisor has not or cannot adequately address the situation are encouraged to discuss the problem with the Director of Finance or Head of School.`,
            h1: `Employee Grievances\nMost often, we believe that the best way to manage a concern with a colleague or school policy is to directly deal with the individual involved... 1. In the event that you have a grievance, bring that grievance first to your immediate supervisor... 2. That supervisor will work with the appropriate members of the Leadership Team and/or Teacher Development Committee (for faculty) to investigate and address your concern... 3. If that response does not fully address your concern or you are unsatisfied with the outcome, you may escalate the issue to the appropriate Director... 4. That Director will work with the appropriate members of the School Executive Committee to investigate and address your concern... This is the final stage of appeal in the process.`,
            h2: `Relationships with School Constituencies\nFaculty\nRespect for all colleagues as professionals is essential for an atmosphere of mutual support that promotes a cooperative spirit and sincere desire to work diligently as members of a total team... As a matter of course, faculty are encouraged to bring any questions or concerns directly to their supervisors, or to the Head of School.`
        }
    };

    const handleAnalyze = async () => {
        if (!selectedTopic) return;
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setError(null);
        setSuggestedLanguage(null); // Reset suggestion on new analysis

        const topicData = comparisonTopics[selectedTopic];

        const prompt = `
            Role: You are an expert K-12 policy analyst. Your task is to compare three employee handbooks on a specific topic and provide a confidential analysis.

            CRITICAL RULES:
            1. Refer to the handbooks ONLY as "H1", "H2", and "TS Handbook". Do not use any other names.
            2. Your entire response MUST be a single JSON object. No other text.
            3. The 'recommendation' must be a concise summary of the key differences between the policies. The primary goal is to strengthen the TS Handbook. Your recommendation should analyze how H1 and H2's language compares to the TS Handbook and suggest specific ways the TS Handbook could be improved, potentially by adopting or adapting language from H1 or H2.

            TOPIC FOR ANALYSIS: "${topicData.name}"

            --- H1 HANDBOOK TEXT ---
            ${topicData.h1}
            --- END H1 HANDBOOK TEXT ---

            --- H2 HANDBOOK TEXT ---
            ${topicData.h2}
            --- END H2 HANDBOOK TEXT ---

            --- TS HANDBOOK TEXT ---
            ${topicData.ts}
            --- END TS HANDBOOK TEXT ---
        `;

        const responseSchema = {
            type: "OBJECT",
            properties: {
                "recommendation": { "type": "STRING", "description": "A summary of differences and a recommendation focused on strengthening the TS Handbook." }
            },
            required: ["recommendation"]
        };

        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 0.1
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API request failed: ${response.status} - ${errorBody?.error?.message || 'Unknown error'}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates[0].content?.parts?.[0]?.text) {
                const jsonText = result.candidates[0].content.parts[0].text;
                setAnalysisResult({
                    ...topicData,
                    recommendation: JSON.parse(jsonText).recommendation
                });
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (err) {
            console.error("Error during handbook analysis:", err);
            setError(`Failed to analyze handbooks. ${err.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    // NEW: Function to generate suggested language
    const handleSuggestChange = async () => {
        if (!analysisResult) return;
        setIsSuggesting(true);
        setError(null);

        const prompt = `
            Role: You are an expert K-12 policy writer. Your task is to revise a section of an employee handbook based on a comparative analysis.
            
            CRITICAL RULES:
            1. Your entire response MUST be a single JSON object.
            2. The output should be a single, complete, revised paragraph for the "TS Handbook".
            3. The new language should be clear, professional, and legally sound, incorporating the strengths identified in the 'recommendation'.
            4. Do not include section numbers or titles, only the body text of the revised policy.

            TOPIC FOR REVISION: "${analysisResult.name}"

            --- INITIAL RECOMMENDATION ---
            ${analysisResult.recommendation}
            --- END INITIAL RECOMMENDATION ---

            --- ORIGINAL TS HANDBOOK TEXT ---
            ${analysisResult.ts}
            --- END ORIGINAL TS HANDBOOK TEXT ---
        `;

        const responseSchema = {
            type: "OBJECT",
            properties: {
                "suggestedLanguage": { "type": "STRING", "description": "The revised, complete paragraph for the TS Handbook." }
            },
            required: ["suggestedLanguage"]
        };

        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 0.2
                }
            };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("API request for suggestion failed.");
            
            const result = await response.json();
            if (result.candidates && result.candidates[0].content?.parts?.[0]?.text) {
                const jsonText = result.candidates[0].content.parts[0].text;
                setSuggestedLanguage(JSON.parse(jsonText).suggestedLanguage);
            } else {
                throw new Error("Invalid response structure for suggestion.");
            }
        } catch (err) {
            console.error("Error generating suggestion:", err);
            setError(`Failed to generate suggestion. ${err.message}`);
        } finally {
            setIsSuggesting(false);
        }
    };

    // NEW: Function to close and reset the component
    const handleClose = () => {
        setAnalysisResult(null);
        setSelectedTopic("");
        setError(null);
        setSuggestedLanguage(null);
    };

    return (
        <div className="shadow-2xl border-0 rounded-2xl mb-6" style={{ background: "#4B5C64" }}>
            <div className="p-6" style={{ color: "#fff" }}>
                <h2 className="text-xl font-bold" style={{ color: "#fff" }}>IQ Handbook Comparison</h2>
                <div className="mt-4 text-white space-y-2">
                    <p>Compare your current handbook to others based on specific queries.</p>
                    <div>
                        <label htmlFor="handbookQuery" className="block font-medium mb-1">Select a Topic to Analyze</label>
                        <select
                            id="handbookQuery"
                            className="w-full p-2 rounded-md text-black"
                            style={{ background: "#fff", border: "2px solid #faecc4" }}
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            disabled={!!analysisResult} // Disable when results are shown
                        >
                            <option value="">-- Select a Topic --</option>
                            {Object.entries(comparisonTopics).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* --- UPDATED: Button logic --- */}
                    <div className="flex gap-4">
                        {!analysisResult ? (
                            <button
                                className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800"
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !selectedTopic}
                            >
                                {isAnalyzing ? "Analyzing..." : "Handbook Analysis"}
                            </button>
                        ) : (
                            <button
                                className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-red-700"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {analysisResult && (
                    <div className="mt-6 border-t border-gray-500 pt-4 space-y-4">
                        <ExpandableOption title="Handbook Comparison 1 (H1)" customBg="rgba(255,255,255,0.1)" customBorder="rgba(255,255,255,0.3)" startOpen={true}>
                            <p className="text-black bg-white p-3 rounded-md whitespace-pre-line">{analysisResult.h1 || "No relevant section found."}</p>
                        </ExpandableOption>
                        <ExpandableOption title="Handbook Comparison 2 (H2)" customBg="rgba(255,255,255,0.1)" customBorder="rgba(255,255,255,0.3)" startOpen={true}>
                            <p className="text-black bg-white p-3 rounded-md whitespace-pre-line">{analysisResult.h2 || "No relevant section found."}</p>
                        </ExpandableOption>
                        
                        <div className="p-4 rounded-md" style={{ background: "rgba(100, 150, 255, 0.1)", border: "1px solid rgba(100, 150, 255, 0.5)" }}>
                             <h4 className="font-bold text-lg text-blue-300 mb-2">Your Current Handbook (TS)</h4>
                             <p className="text-blue-200 p-3 rounded-md whitespace-pre-line bg-gray-800">{analysisResult.ts || "No relevant section found."}</p>
                        </div>

                        <div className="p-4 rounded-md" style={{ background: "rgba(100, 255, 150, 0.1)", border: "1px solid rgba(100, 255, 150, 0.5)" }}>
                             <h4 className="font-bold text-lg text-green-300 mb-2">Differences & Recommendations</h4>
                             <p className="text-white whitespace-pre-line">{analysisResult.recommendation}</p>
                             {/* --- NEW: Suggestion Button --- */}
                             {!suggestedLanguage && (
                                <div className="mt-4">
                                    <button
                                        className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-800"
                                        onClick={handleSuggestChange}
                                        disabled={isSuggesting}
                                    >
                                        {isSuggesting ? "Generating..." : "Suggested Handbook Changes"}
                                    </button>
                                </div>
                             )}
                        </div>
                        
                        {/* --- NEW: Suggested Language Display --- */}
                        {suggestedLanguage && (
                            <div className="p-4 rounded-md" style={{ background: "rgba(255, 215, 100, 0.1)", border: "1px solid rgba(255, 215, 100, 0.5)" }}>
                                <h4 className="font-bold text-lg text-yellow-300 mb-2">AI-Generated Policy Language</h4>
                                <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-line italic">
                                    {suggestedLanguage}
                                </div>
                                <div className="mt-4">
                                    <button
                                        className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-700"
                                        onClick={() => alert("This would add the language to the handbook in a live system.")}
                                    >
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
