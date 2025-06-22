export const generateContent = async (prompt) => {
    try {
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Managed by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const result = await response.json();
        if (result.candidates && result.candidates[0]?.content.parts[0]?.text) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Invalid response structure from Gemini API.");
        }
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return null;
    }
};
