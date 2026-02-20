export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ask = searchParams.get("ask");

  if (!ask) {
    return new Response(
      JSON.stringify({ error: "Missing ?ask=" }),
      { status: 400 }
    );
  }

  const SYSTEM = `
You are an analytical intelligence.
Provide complete answers.
`;

  const finalPrompt = SYSTEM + "\n\nUser: " + ask;

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: finalPrompt }]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response";

    return new Response(
      JSON.stringify({ response: text }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
