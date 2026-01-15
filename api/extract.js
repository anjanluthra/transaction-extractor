export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { image, mediaType } = await req.json();

    if (!process.env.CLAUDE_API_KEY) {
      throw new Error('Server missing API Key');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: image,
                },
              },
              {
                type: 'text',
                text: `Extract transaction data into a JSON list.
                For each transaction, extract:
                - date (DD Month YYYY)
                - description
                - amount (number only, negative for money out)
                
                Return ONLY raw JSON.`
              }
            ]
          }
        ]
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}