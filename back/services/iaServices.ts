import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Schema com os campos consultados
const schemaFilme = {
  type: 'OBJECT',
  properties: {
    genero: {
      type: 'STRING',
      description: 'Genero do filme',
    },
    sinopse: {
      type: 'STRING',
      description: 'Sinopse do filme',
    },
    duracao: {
      type: 'NUMBER',
      description: 'Duração do filme',
    },
    elenco: {
      type: 'ARRAY',
      items: { type: 'STRING' },
      description: 'Elenco principal do filme',
    },
    avaliacoes: {
      type: 'ARRAY',
      items: { type: 'NUMBER' },
      description: 'Avaliação nos principais sites de crítica',
    },
  },
  required: ['genero','sinopse', 'duracao', 'elenco', 'avaliacoes'],
};

export async function buscarDadosComGemini(titulo: string, diretor: string, ano: number) {
  const resposta = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Filme: ${titulo} ${diretor} (${ano}), Liste o genero do filme,  a sinopse oficial completa, a duração em minutos, os 5 principais atores/atrizes do elenco e a nota respectivamente dos sites Rotten Tomatoes, Letterboxd e IMDB`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schemaFilme,
    },
  })

  return JSON.parse(resposta.text || '{}')
}
