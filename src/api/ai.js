// src/api/ai.js
export const getSmartSearchKeywords = async (rawQuery) => {
  if (!rawQuery) return '';

  try {
    const res = await fetch('/api/ai/keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: rawQuery }),
    });

    const data = await res.json();
    console.log('AI keywords received:', data.keywords); // frontend log
    return data.keywords || rawQuery; // fallback to original query
  } catch (err) {
    console.error('AI request failed:', err);
    return rawQuery; // fallback if AI fails
  }
};
