require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// CORRECTED LINE: Use process.env to access environment variables
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error('Missing OPENAI_API_KEY in server/.env or environment');
  // CORRECTED LINE: Use process.exit to stop the server on critical error
  process.exit(1);
}

app.post('/api/ai/keywords', async (req, res) => {
  const { query } = req.body;
  console.log("Received query from frontend:", query); // Good for debugging
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are an assistant that extracts concise search keywords and genres from a user query. Output a single line of comma-separated keywords (3-6 words) with no explanation.' },
        { role: 'user', content: `${query}` }
      ],
      max_tokens: 60,
      temperature: 0.2
    };

    const r = await axios.post('https://api.openai.com/v1/chat/completions', body, {
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const text = r.data?.choices?.[0]?.message?.content?.trim() || '';
    console.log("AI returned keywords:", text); // Good for debugging
    res.json({ keywords: text });
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI request failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AI proxy server listening on ${PORT}`));