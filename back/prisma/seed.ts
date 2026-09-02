import { prisma } from "../lib/prisma";
import { type Prisma } from "../generated/prisma/client";

// Criando os dados para os Filmes
const filmes: Prisma.FilmeCreateManyInput[] = [
    {
        titulo: "O Senhor dos Anéis",
        sinopse: "Um hobbit recebe a tarefa de destruir um anel mágico para salvar a Terra Média.",
        genero: "Fantasia",
        diretor: "Peter Jackson",
        ano: 2001,
        duracao: 178,
        preco: 15.90,
        poster: "https://www.tallengestore.com/cdn/shop/products/LordOfTheRings-TheFellowshipOfTheRing-HollywoodMovieGraphicArtPoster2_dafa2479-03f4-4549-8640-ae6453817e58.jpg?v=1630764702",
        avaliacoes: [91, 4.4, 8.9],
        elenco: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom", "Sean Bean"]
    },
    {
        titulo: "Interestelar",
        sinopse: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço.",
        genero: "Ficção Científica",
        diretor: "Christopher Nolan",
        ano: 2014,
        duracao: 169,
        preco: 19.90,
        poster: "https://i.ebayimg.com/images/g/T9UAAOSw1m5bBU-5/s-l1200.jpg",
        avaliacoes: [73, 8.7, 4.3],
        elenco: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Mackenzie Foy"]
    },
    {
        titulo: "O Poderoso Chefão",
        sinopse: "O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho.",
        genero: "Crime",
        diretor: "Francis Ford Coppola",
        ano: 1972,
        duracao: 175,
        preco: 12.50,
        poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
        avaliacoes: [97, 9.2, 4.6],
        elenco: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall", "Diane Keaton"]
    },
    {
        titulo: "Matrix",
        sinopse: "Um hacker descobre a verdadeira natureza de sua realidade e seu papel na guerra contra os controladores dela.",
        genero: "Ficção Científica",
        diretor: "Lana e Lilly Wachowski",
        ano: 1999,
        duracao: 136,
        preco: 14.00,
        poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-00906-032cbaded0bdc1791917181354309475-1024-1024.webp",
        avaliacoes: [83, 8.7, 4.2],
        elenco: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"]
    }
];

async function main() {
    try {
        await prisma.filme.createMany({ data: filmes });
        console.log(`${filmes.length} Filmes Cadastrados...`);

    } catch (error) {
        console.error("Erro nas Inclusões (Seeds):", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

await main();