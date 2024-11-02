export async function post({ request }) {
  const { url } = await request.json();
  const apiKey = import.meta.env.RAPIDAPI_KEY || '4dd7a616abmshe432066db06c437p1cea1fjsnb7af23cf2dcf';

  console.log('Received request for URL:', url);

  try {
    const response = await fetch(`https://ahrefs1.p.rapidapi.com/v1/backlink-checker?url=${url}&mode=subdomains`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'ahrefs1.p.rapidapi.com'
      }
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response data:', JSON.stringify(data, null, 2));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error in backlinks API:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
