export async function generateMCQs(config) {
    const { topics, questionCount, difficulty, type } = config;
    console.log("🔧 generateMCQs called with config:", config);

    const prompt = `
Generate a JSON array of ${questionCount} MCQs about the following topics: ${topics}.
Difficulty level: ${difficulty}.
Question type: ${type === "single" ? "Single correct" : "Multiple correct"} answer.

Each question object should have:
- "questionText" (string)
- "options" (array of strings)
- "correctAnswers" (array of strings)

Respond ONLY with valid JSON.
`;

    // 🛑 IMPORTANT: Use your Google API Key, which you already have
    // Make sure this is loaded from your .env file as REACT_APP_GOOGLE_API_KEY or similar
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY; // <--- CHANGE ENV VAR NAME

    console.log("📤 Sending fetch request to Gemini API...");
    console.log("🔐 Using API key:", googleApiKey ? "✅ present" : "❌ missing");
    console.log("📦 Request body:", JSON.stringify({
        // For Gemini API, 'model' goes inside the URL or is inferred
        // 'contents' is the key for the input message
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json" // Very important for JSON output
        }
    }));

    try {
        // 🛑 CHANGE THE ENDPOINT TO GOOGLE'S GEMINI API
        // Use gemini-1.5-flash for speed/cost, or gemini-1.5-pro for more complex needs
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleApiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // For direct fetch with Gemini, the API key is usually a query param
                // or in the x-goog-api-key header, but not 'Bearer'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json"
                }
            }),
        });

        console.log("📶 Status Code:", res.status);

        if (res.status === 429) { // Rate limit for Gemini is different, but this check is fine
            console.warn("🚫 Gemini API rate limit hit! Returning fallback dummy questions.");
            return JSON.stringify(getDummyQuestions());
        }

        if (!res.ok) {
            const errorData = await res.json(); // Gemini often returns JSON errors
            console.error("❌ Gemini API Error:", errorData);
            throw new Error("Gemini API request failed: " + JSON.stringify(errorData));
        }

        const data = await res.json();
        // Gemini API response structure is different
        // Access the text from the candidates array
        const content = data.candidates[0].content.parts[0].text.trim();
        console.log("📥 Gemini returned content:", content);
        return content;

    } catch (err) {
        console.error("❌ generateMCQs failed:", err);
        return JSON.stringify(getDummyQuestions());
    }
}

function getDummyQuestions() {
    return [
        
    ];
}