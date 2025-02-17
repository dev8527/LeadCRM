export async function fetchAIResponse(emailContent: string) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        prompt: `Improve this email content:\n${emailContent}`,
        max_tokens: 100,
      }),
    });
  
    const data = await response.json();
    return data.choices[0].text.trim();
  }
  