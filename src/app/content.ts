export const pessoas = [
  {
    id_pessoa: "auth0|672a117751b32fa42c7d1983",
    nome: "Pablo",
    numero: "5561991936667",
    email: "pablo.oliveira77@outlook.com.br",
    tipo: "cliente",
  },
  {
    id_pessoa: "auth0|672a206b620fc2be082a8c27",
    nome: "Pablo Barman",
    numero: "5561991936667",
    email: "pablolimadeoliveira055@gmail.com",
    tipo: "barista",
  },
  {
    id_pessoa: "auth0|672a22e5620fc2be082a8db8",
    nome: "Pablo Entregador",
    numero: "5561991936668",
    email: "pablo@plenitudex.com",
    tipo: "entregador",
  },
];

export const cliente = [
  {
    id_cliente: "auth0|672a117751b32fa42c7d1983",
    fk_id_pessoa: "auth0|672a117751b32fa42c7d1983",
  },
];

export const barista = [
  {
    id_barista: "auth0|672a206b620fc2be082a8c27",
    fk_id_pessoa: "auth0|672a206b620fc2be082a8c27",
  },
];

export const entregador = [
  {
    id_entregador: "auth0|672a22e5620fc2be082a8db8",
    fk_id_pessoa: "auth0|672a22e5620fc2be082a8db8",
  },
];

export const catalogo = [
  {
    id_catalogo: 1,
    nome: "Cappuccino Clássico",
    descricao:
      "Uma deliciosa combinação de café expresso encorpado, leite cremoso e uma generosa camada de espuma. Perfeito para quem busca equilíbrio entre suavidade e intensidade.",
    tipo: "Café com leite",
    tamanho: "médio",
    imagem: "cappuccino.jpg",
    preco: 12,
  },
  {
    id_catalogo: 2,
    nome: "Latte Suave",
    descricao:
      "O nosso Latte é uma verdadeira experiência de aconchego. Combinamos o sabor intenso do expresso com leite vaporizado, resultando em uma bebida leve e reconfortante.",
    tipo: "Café com leite",
    tamanho: "grande",
    imagem: "latte.jpg",
    preco: 10,
  },
  {
    id_catalogo: 3,
    nome: "Espresso Intenso",
    descricao:
      "O verdadeiro espresso italiano, preparado com grãos selecionados e torrados à perfeição. Um sabor rico e marcante que desperta os sentidos a cada gole.",
    tipo: "Expresso",
    tamanho: "pequeno",
    imagem: "espresso.jpg",
    preco: 8,
  },
  {
    id_catalogo: 4,
    nome: "Mocha Encantado",
    descricao:
      "Uma combinação irresistível de café expresso, leite vaporizado e chocolate. A bebida perfeita para os apaixonados por café e chocolate.",
    tipo: "Café com leite",
    tamanho: "grande",
    imagem: "mocha.png",
    preco: 15,
  },
  {
    id_catalogo: 5,
    nome: "Macchiato Delicado",
    descricao:
      "O Macchiato é uma bebida simples e sofisticada, que combina a intensidade do café expresso com uma pequena quantidade de leite vaporizado. Uma experiência única para os apreciadores de café.",
    tipo: "Expresso",
    tamanho: "pequeno",
    imagem: "macchiato.png",
    preco: 10,
  },
  {
    id_catalogo: 6,
    nome: "Café com Leite",
    descricao:
      "O clássico café com leite, preparado com café expresso e leite vaporizado. Uma bebida suave e reconfortante, perfeita para qualquer momento do dia.",
    tipo: "Café com leite",
    tamanho: "médio",
    imagem: "cafe-com-leite.png",
    preco: 12,
  },
];

export const pedidos = [
  {
    id_pedido: 1,
    data_pedido: "2024-11-08T16:06:55.902Z",
    valor_pedido: 15,
    endereco_entrega: "Rua A, 100",
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
  },
  {
    id_pedido: 2,
    data_pedido: "2024-11-08T16:06:55.902Z",
    valor_pedido: 25,
    endereco_entrega: "Rua B, 200",
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
  },
  {
    id_pedido: 3,
    data_pedido: '2024-11-08T16:06:55.902Z',
    valor_pedido: 30,
    endereco_entrega: "Rua C, 300",
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
  },
];

export const pedidoCatalogo = [
  { id: 1, fk_id_pedido: 1, fk_id_catalogo: 1 },
  { id: 2, fk_id_pedido: 2, fk_id_catalogo: 2 },
  { id: 3, fk_id_pedido: 3, fk_id_catalogo: 3 },
];

export const notificacao = [
  {
    id_notificacao: 1,
    tipo: "cliente",
    data_hora: "2024-10-04T08:05:00",
    fk_id_pessoa: "auth0|672a117751b32fa42c7d1983",
    fk_id_pedido: 2,
    created_at: "2024-10-04T08:00:00",
  },
  {
    id_notificacao: 2,
    tipo: "barman",
    data_hora: "2024-10-04T09:05:00",
    fk_id_pessoa: "auth0|672a206b620fc2be082a8c27",
    fk_id_pedido: 2,
    created_at: "2024-10-04T09:00:00",
  },
  {
    id_notificacao: 3,
    tipo: "entregador",
    data_hora: "2024-10-04T10:05:00",
    fk_id_pessoa: "auth0|672a22e5620fc2be082a8db8",
    fk_id_pedido: 3,
    created_at: "2024-10-04T10:00:00",
  },
];

export const recorrencias = [
  {
    id_recorrencia: 1,
    data_semana: ["1", "3"],
    horario_agendamento: ["10:00", "14:00"],
    data_limite: new Date("2023-12-01"),
    fk_id_pedido: 1,
    fk_id_notificacao: 1,
  },
  {
    id_recorrencia: 2,
    data_semana: ["2", "4"],
    horario_agendamento: ["11:00", "15:00"],
    data_limite: new Date("2023-12-02"),
    fk_id_pedido: 2,
    fk_id_notificacao: 2,
  },
  {
    id_recorrencia: 3,
    data_semana: ["3", "5"],
    horario_agendamento: ["12:00", "16:00"],
    data_limite: new Date("2023-12-03"),
    fk_id_pedido: 3,
    fk_id_notificacao: 3,
  },
];

export const pagamento = [
  {
    id: 1,
    metodo_pagamento: "Pix",
    status_pagamento: "aprovado",
    valor: 12,
    fk_id_pedido: 1,
    created_at: "2024-10-04T08:10:00",
  },
  {
    id: 2,
    metodo_pagamento: "cartão de credito",
    status_pagamento: "pendente",
    valor: 10,
    fk_id_pedido: 2,
    created_at: "2024-10-04T09:10:00",
  },
  {
    id: 3,
    metodo_pagamento: "Pix",
    status_pagamento: "aprovado",
    valor: 15,
    fk_id_pedido: 3,
    created_at: "2024-10-04T10:10:00",
  },
];
