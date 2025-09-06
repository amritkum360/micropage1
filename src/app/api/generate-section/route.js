import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { description, sectionTitle } = await request.json();

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Description is required' },
        { status: 400 }
      );
    }

    // ChatGPT API configuration
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }
    
    const prompt = `
Create a modern and beautiful responsive HTML hero/about section using Tailwind CSS only. 
The section should include:

- A stylish gradient or background image
- A bold section title: "${sectionTitle || 'AI About Section'}"
- A short description: "${description}"
- A primary button (e.g., "More Info") with hover effects
- Make it look professional and visually appealing
- Use flexbox or grid for layout
- Responsive design for mobile, tablet, and desktop
- Add spacing, typography, shadows, rounded corners for elegance
- Only return complete <section> HTML code, no markdown
-show your creativity

Return only the complete HTML code with Tailwind classes and JavaScript, no explanations or no markdown formatting.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional web developer who creates beautiful, modern HTML sections with embedded CSS and JavaScript. Always return complete, working code.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json(
        { success: false, error: 'Failed to generate section with AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedCode = data.choices[0]?.message?.content?.trim();

    if (!generatedCode) {
      return NextResponse.json(
        { success: false, error: 'No code generated' },
        { status: 500 }
      );
    }

    // Clean up the generated code (remove markdown formatting if present)
    const cleanCode = generatedCode
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```css\n?/g, '')
      .replace(/```js\n?/g, '')
      .trim();

    return NextResponse.json({
      success: true,
      code: cleanCode,
      description: description,
      sectionTitle: sectionTitle
    });

  } catch (error) {
    console.error('Generate Section Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
