import { GoogleGenAI, Type } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const schemaFilme = {
  type: Type.OBJECT,
  properties: {
    genero: {
      type: Type.STRING,
      description: 'Gênero principal do filme',
    },
    sinopse: {
      type: Type.STRING,
      description: 'Sinopse do filme',
    },
    duracao: {
      type: Type.NUMBER,
      description: 'Duração em minutos (apenas o número)',
    },
    elenco: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Nomes dos 5 principais atores/atrizes',
    },
    avaliacoes: {
      type: Type.ARRAY,
      items: { type: Type.NUMBER },
      description:
        'Array numérico exato com 3 notas nesta ordem: [RottenTomatoes em %, Letterboxd de 0.0 a 5.0, IMDb de 0.0 a 10.0]',
    },
  },
  required: ['genero', 'sinopse', 'duracao', 'elenco', 'avaliacoes'],
}

export async function buscarDadosComGemini(
  titulo: string,
  diretor: string,
  ano: number,
) {
  const resposta = await ai.models.generateContent({
    model: 'gemini-3.6-flash', // Utilize a versão estável mais recente
    contents: `Forneça as informações do filme: "${titulo}", dirigido por ${diretor} (${ano}).
    
Regras para o campo 'avaliacoes':
Retorne uma lista com exatamente 3 números do tipo float/number na seguinte ordem:
1. Rotten Tomatoes (apenas o número de 0 a 100, ex: 92)
2. Letterboxd (nota de 0 a 5 com 1 casa decimal, ex: 4.2)
3. IMDb (nota de 0 a 10 com 1 casa decimal, ex: 8.9)`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schemaFilme,
    },
  })

  return JSON.parse(resposta.text || '{}')
}