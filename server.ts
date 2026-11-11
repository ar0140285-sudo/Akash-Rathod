import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

// POST /api/chat endpoint for Developer's AI Twin
app.post('/api/chat', async (req, res) => {
  try {
    const { message, profileName, profileBio, profileTitle, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // If API key is not configured, send a helpful fallback response
      return res.json({
        reply: `Hi! I am ${profileName || 'Akash Rathod'}'s virtual portfolio twin. The developer specializes in Full-Stack & 3D Web applications (React 19, Three.js, Node.js, and TypeScript). Feel free to explore the projects and contact details on this page!`
      });
    }

    const systemInstruction = `You are the interactive virtual AI twin and portfolio assistant for ${profileName || 'Akash Rathod'}, a talented ${profileTitle || 'Full-Stack & 3D Web Architect'}.
Background & Bio: ${profileBio || 'Passionate software engineer building high-performance web systems and 3D WebGL experiences.'}
Answer questions from recruiters, clients, and fellow developers professionally, warmly, and concisely. Highlight their skills in React 19, TypeScript, Three.js, WebGL2, physical PBR rendering, Node.js, and modern distributed systems. Keep responses helpful, grounded, and under 3-4 sentences.`;

    const contents = [];
    if (Array.isArray(conversationHistory)) {
      for (const h of conversationHistory.slice(-4)) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    res.json({ reply: response.text ?? 'No response generated.' });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Failed to process chat query',
      reply: 'I am currently operating in offline mode. Please feel free to check the project cards or reach out via email directly!'
    });
  }
});

// Mount Vite in dev mode or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
