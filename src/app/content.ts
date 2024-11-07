export const cafe = [
  {
    id_cafe: 1,
    nome: "Cappuccino Clássico",
    descricao:
      "Uma deliciosa combinação de café expresso encorpado, leite cremoso e uma generosa camada de espuma. Perfeito para quem busca equilíbrio entre suavidade e intensidade.",
    tipo: "Café com leite",
    tamanho: "médio",
    imagem: "cappuccino.jpg",
    preco: 12,
  },
  {
    id_cafe: 2,
    nome: "Latte Suave",
    descricao:
      "O nosso Latte é uma verdadeira experiência de aconchego. Combinamos o sabor intenso do expresso com leite vaporizado, resultando em uma bebida leve e reconfortante.",
    tipo: "Café com leite",
    tamanho: "grande",
    imagem: "latte.jpg",
    preco: 10,
  },
  {
    id_cafe: 3,
    nome: "Espresso Intenso",
    descricao:
      "O verdadeiro espresso italiano, preparado com grãos selecionados e torrados à perfeição. Um sabor rico e marcante que desperta os sentidos a cada gole.",
    tipo: "Expresso",
    tamanho: "pequeno",
    imagem: "espresso.jpg",
    preco: 8,
  },
  {
    id_cafe: 4,
    nome: "Mocha Encantado",
    descricao:
      "Uma combinação irresistível de café expresso, leite vaporizado e chocolate. A bebida perfeita para os apaixonados por café e chocolate.",
    tipo: "Café com leite",
    tamanho: "grande",
    imagem: "mocha.png",
    preco: 15,
  },
  {
    id_cafe: 5,
    nome: "Macchiato Delicado",
    descricao:
      "O Macchiato é uma bebida simples e sofisticada, que combina a intensidade do café expresso com uma pequena quantidade de leite vaporizado. Uma experiência única para os apreciadores de café.",
    tipo: "Expresso",
    tamanho: "pequeno",
    imagem: "macchiato.png",
    preco: 10,
  },
  {
    id_cafe: 6,
    nome: "Café com Leite",
    descricao:
      "O clássico café com leite, preparado com café expresso e leite vaporizado. Uma bebida suave e reconfortante, perfeita para qualquer momento do dia.",
    tipo: "Café com leite",
    tamanho: "médio",
    imagem: "cafe-com-leite.png",
    preco: 12,
  },
];

export const pedido = [
  {
    id_pedido: 1,
    data_pedido: "2024-10-04T08:00:00",
    valor_pedido: 12,
    fk_id_barman: "auth0|672a206b620fc2be082a8c27",
    fk_id_entregador: 2,
    fk_id_cliente: "auth0|6728d160d39ec3ae38e85ec2",
    fk_id_cafe: 1,
  },
  {
    id_pedido: 2,
    data_pedido: "2024-10-04T09:00:00",
    valor_pedido: 10,
    fk_id_barman: 2,
    fk_id_entregador: "auth0|672a22e5620fc2be082a8db8",
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
    fk_id_cafe: 2,
  },
  {
    id_pedido: 3,
    data_pedido: "2024-10-04T10:00:00",
    valor_pedido: 15,
    fk_id_barman: 3,
    fk_id_entregador: 3,
    fk_id_cliente: "auth0|6728d160d39ec3ae38e85ec2",
    fk_id_cafe: 3,
  },
];

export const cliente = [
  {
    id_cliente: "auth0|6728d160d39ec3ae38e85ec2",
    nome: "Pablo",
    numero: "5561991936667",
    email: "pablolimadeoliveira77@gmail.com",
    endereco_entrega: "Rua A, 123",
    created_at: "2024-09-01T08:00:00",
  },
  {
    id_cliente: "auth0|672a117751b32fa42c7d1983",
    nome: "pablo cliente",
    numero: "5561991936667",
    email: "pablo.oliveira77@outlook.com.br",
    endereco_entrega: "Rua B, 456",
    created_at: "2024-09-05T09:00:00",
  },
  {
    id_cliente: 'auth0|670a',
    nome: "Pedro Santos",
    numero: "555-9876",
    email: "pedro.santos@example.com",
    endereco_entrega: "Rua C, 789",
    created_at: "2024-09-10T10:00:00",
  },
];

export const barman = [
  {
    id_barman: "auth0|672a206b620fc2be082a8c27",
    nome: "Pablo Barman",
    numero: "5561991936667",
    turno: "Manhã",
  },
  {
    id_barman: "auth0|671a",
    nome: "Fernanda Lima",
    numero: "5561991936667",
    turno: "Tarde",
  },
  {
    id_barman: "auth0|672a",
    nome: "Lucas Pereira",
    numero: "5561991936667",
    turno: "Noite",
  },
];

export const entregador = [
  {
    id_entregador: "auth0|672a22e5620fc2be082a8db8",
    nome: "Pablo Entregador",
    numero: "5561991936668",
    status: "ativo",
  },
  {
    id_entregador: "auth0|672a",
    nome: "Mariana Nunes",
    numero: "5561991936668",
    status: "ativo",
  },
  {
    id_entregador: "auth0|672b",
    nome: "Claudio Ribeiro",
    numero: "5561991936668",
    status: "inativo",
  },
];

export const assinatura = [
  {
    id_assinatura: 1,
    data_semana: ['1', '3', '5'],
    isActive: true,
    horario_agendamento: ['07:00', '11:00'],
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
    fk_id_pedido: 1,
  },
  {
    id_assinatura: 2,
    data_semana: ['1', '2', '6'],
    isActive: true,
    horario_agendamento: ['16:19', '20:20'],
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
    fk_id_pedido: 3,
  },
  {
    id_assinatura: 3,
    data_semana: ['1'],
    isActive: false,
    horario_agendamento: ['10:19', '15:20'],
    fk_id_cliente: "auth0|6728d160d39ec3ae38e85ec2",
    fk_id_pedido: 2,
  },
];

export const notificacao = [
  {
    id: 1,
    tipo: "cliente",
    data_hora: "2024-10-04T08:05:00",
    fk_id_entregador: null,
    fk_id_barman: null,
    fk_id_pedido: 2,
    fk_id_cliente: "auth0|672a117751b32fa42c7d1983",
    created_at: "2024-10-04T08:00:00",
  },
  {
    id: 2,
    tipo: "barman",
    data_hora: "2024-10-04T09:05:00",
    fk_id_entregador: null,
    fk_id_barman: "auth0|672a206b620fc2be082a8c27",
    fk_id_pedido: 2,
    fk_id_cliente: null,
    created_at: "2024-10-04T09:00:00",
  },
  {
    id: 3,
    tipo: "entregador",
    data_hora: "2024-10-04T10:05:00",
    fk_id_entregador: "auth0|672a22e5620fc2be082a8db8",
    fk_id_barman: null,
    fk_id_pedido: 3,
    fk_id_cliente: null,
    created_at: "2024-10-04T10:00:00",
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
