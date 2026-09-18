import { prisma } from "../lib/prisma";
import { type Prisma } from "../generated/prisma/client";

// Criando os dados para os Filmes
const filmes: Prisma.FilmeCreateManyInput[] = [
    {
        titulo: "O Senhor dos Anéis",
        sinopse: "Frodo Bolseiro recebe a missão de destruir um poderoso anel que pode colocar toda a Terra-média sob o domínio de Sauron. Para cumprir essa tarefa, ele parte em uma perigosa jornada acompanhado por uma sociedade formada por representantes de diferentes povos. Enquanto enfrentam inimigos e perigos pelo caminho, o grupo precisa chegar à Montanha da Perdição antes que o poder do anel caia nas mãos de Sauron.",
        genero: "Fantasia",
        diretor: "Peter Jackson",
        ano: 2001,
        duracao: 178,
        preco: 15.90,
        poster: "https://www.tallengestore.com/cdn/shop/products/LordOfTheRings-TheFellowshipOfTheRing-HollywoodMovieGraphicArtPoster2_dafa2479-03f4-4549-8640-ae6453817e58.jpg?v=1630764702",
        banner: "https://images3.alphacoders.com/855/85585.jpg",
        destaque: true,
        avaliacoes: [91, 4.4, 8.9],
        elenco: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom", "Sean Bean"]
    },
    {
        titulo: "Interestelar",
        sinopse: "Em um futuro em que a Terra enfrenta uma grave crise ambiental e a humanidade corre risco de extinção, o ex-piloto e engenheiro Cooper é recrutado para participar de uma missão espacial. Ao lado de uma equipe de cientistas, ele atravessa um buraco de minhoca em busca de um novo planeta capaz de abrigar a humanidade. Enquanto enfrenta os mistérios do espaço e do tempo, Cooper precisa lidar com a distância e a saudade de",
        genero: "Ficção Científica",
        diretor: "Christopher Nolan",
        ano: 2014,
        duracao: 169,
        preco: 19.90,
        poster: "https://i.ebayimg.com/images/g/T9UAAOSw1m5bBU-5/s-l1200.jpg",
        banner: "https://wallpapers.com/images/featured/buraco-negro-interestelar-6kkuxfcpge3xyspm.jpg",
        destaque: true,
        avaliacoes: [73, 4.3, 8.7],
        elenco: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Mackenzie Foy"]
    },
    {
        titulo: "O Poderoso Chefão",
        sinopse: "Don Vito Corleone é o patriarca de uma poderosa família mafiosa de Nova York. Quando ele sofre um atentado, seu filho Michael, inicialmente distante dos negócios da família, acaba sendo envolvido no mundo do crime. A partir daí, Michael começa uma transformação que muda para sempre o destino da família Corleone.",
        genero: "Crime",
        diretor: "Francis Ford Coppola",
        ano: 1972,
        duracao: 175,
        preco: 12.50,
        poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
        banner: "https://cdn.wallpapersafari.com/1/43/BjRgZo.jpg",
        avaliacoes: [97, 4.6, 9.2],
        elenco: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall", "Diane Keaton"]
    },
    {
        titulo: "Matrix",
        sinopse: "Thomas Anderson, um programador conhecido pelo codinome Neo, vive uma vida aparentemente comum, mas sente que existe algo errado com a realidade. Após conhecer Morpheus, ele descobre que o mundo que conhece é, na verdade, uma realidade simulada chamada Matrix, criada por máquinas para controlar a humanidade.",
        genero: "Ficção Científica",
        diretor: "Lana e Lilly Wachowski",
        ano: 1999,
        duracao: 136,
        preco: 14.00,
        poster: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-00906-032cbaded0bdc1791917181354309475-1024-1024.webp",
        banner: "https://wallpaperaccess.com/full/683976.jpg",
        avaliacoes: [83, 4.2, 8.7],
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