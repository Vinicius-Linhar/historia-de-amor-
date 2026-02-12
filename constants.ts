import { TimelineEvent, GalleryImage, QuizQuestion, Song } from './types';

// CONFIGURATION
export const START_DATE = "2025-03-12T00:00:00"; // Início: 12 de Março de 2025
export const COUPLE_NAMES = "Vinny & Onny";
export const NEXT_MEETING_DATE = "2026-02-12T00:00:00"; // Próximo marco: 11 meses (12/02/26)

export const HERO_QUOTE = "A distância impede que eu te beije, mas não impede que eu te ame.";
export const LETTER_CONTENT = `
Meu amor,

Onze meses.
Quando eu paro pra pensar nisso, não parece só tempo passando — parece uma coleção de momentos que, aos poucos, foram mudando quem eu sou.

A gente começou sem saber até onde isso iria. Sem garantia, sem roteiro, só vontade de continuar conversando no dia seguinte. E, de alguma forma, foi exatamente aí que tudo começou a se tornar importante pra mim.

Namorar você à distância me ensinou coisas que eu não aprenderia de outro jeito. Me ensinou que presença não é só física, que cuidado pode atravessar telas e que saudade, quando é da pessoa certa, não enfraquece — só confirma.

Tem dias que são mais difíceis, eu não vou fingir que não.
Dias em que eu queria poder te abraçar em vez de só ouvir sua voz.
Mas até nesses dias existe uma certeza que nunca muda: é você.

Você se tornou meu lugar seguro mesmo estando longe.
Minha rotina favorita.
A pessoa que eu penso quando algo bom acontece — e também quando preciso de calma.

E talvez você nem perceba, mas foi me mudando em detalhes pequenos: na forma como eu penso no futuro, na forma como eu me importo mais, na forma como eu aprendi a ser mais paciente… porque nós valemos a espera.

Esses 11 meses não são só uma data pra mim.
São a prova de que o que a gente tem é forte o suficiente pra existir mesmo com quilômetros no meio.

E eu não penso só no que já vivemos — penso no que ainda vamos viver quando a distância deixar de ser cenário e virar lembrança.

Feliz 11 meses pra nós.
Obrigado por existir na minha vida do jeito que existe.

Com amor,
sempre seu.
`;

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 1,
    date: "12 de Março, 2025",
    title: "O Início de Tudo",
    description: "O dia oficial em que dissemos 'sim' um ao outro e nossa aventura começou.",
    image: "/images/chat-inicio.png"
  },
  {
    id: 2,
    date: "12 de Julho, 2025",
    title: "4 Meses de Namoro",
    description: "Nosso primeiro Dia dos Namorados juntos, mesmo com a distância. Cada videochamada diminuía a saudade e aumentava o amor.",
    // 👇 SUBSTITUA PELO LINK DA SUA FOTO DE COLAGEM DAS CALLS
    image: "/images/4-meses.jpg"
  },
  {
    id: 3,
    date: "12 de Setembro, 2025",
    title: "Meio Ano Juntos",
    description: "6 meses de parceria, risadas e muito amor. A certeza de que escolhi a pessoa certa.",
    image: "/images/6-meses.jpg"
  },
  {
    id: 4,
    date: "12 de Fevereiro, 2026",
    title: "11 Meses - Hoje!",
    description: "Quase completando um ano! Obrigado(a) por ser meu porto seguro todos esses dias.",
    image: "/images/11-meses.jpg"
  }
];

export const GALLERY_DATA: GalleryImage[] = [
  { id: 1, url: "/images/album-1.jpg", caption: "Nossa primeira selfie", category: 'memories' },
  { id: 2, url: "/images/careta.jpg", caption: "Você fazendo careta", category: 'funny' },
  { id: 3, url: "/images/momento-fofo.jpg", caption: "Momento fofo", category: 'memories' },
  { id: 4, url: "/images/garota-perfeita.jpg", caption: "Garota perfeita", category: 'calls' },
  { id: 5, url: "/images/hahaha.jpg", caption: "hahahahahaha", category: 'funny' },
  { id: 6, url: "/images/dormindo.jpg", caption: "Dormindo na call", category: 'funny' },
];

export const PLAYLIST_DATA: Song[] = [
  {
    id: 1,
    title: "Yellow",
    artist: "Coldplay",
    description: "A música que tocou quando nos vimos pela primeira vez.",
  },
  {
    id: 2,
    title: "Photograph",
    artist: "Ed Sheeran",
    description: "Porque guardamos nosso amor nesta fotografia.",
  },
  {
    id: 3,
    title: "Distance",
    artist: "Christina Perri",
    description: "Para os dias que a saudade aperta.",
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "Onde foi nosso primeiro beijo?",
    options: ["No aeroporto", "No parque", "No cinema", "Na porta de casa"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Qual minha comida favorita que você aprendeu a fazer?",
    options: ["Lasanha", "Strogonoff", "Hambúrguer", "Sushi"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Qual o nome do nosso futuro cachorro?",
    options: ["Rex", "Thor", "Pipoca", "Bolinha"],
    correctAnswer: 2
  }
];