export interface Pessoa {
  id_pessoa: string;
  nome: string;
  numero: string;
  email: string;
  tipo: string;
}

export interface Cliente {
  id_cliente: string;
  fk_id_pessoa: string;
}

export interface Pedido {
  id_pedido: number;
  data_pedido: string;
  valor_pedido: number;
  endereco_entrega: string;
  fk_id_cliente: string;
}

export interface PedidoCatalogo {
  id: number;
  fk_id_pedido: number;
  fk_id_catalogo: number;
}

export interface Catalogo {
  id_catalogo: number;
  nome: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  imagem: string;
  preco: number;
}

export interface Recorrencia {
  id_recorrencia: number;
  data_semana: [string];
  horario_agendamento: [string];
  data_limite: string;
  fk_id_pedido: number;
}

export interface Notificacao {
  id_notificacao: number;
  tipo: string;
  data_hora: string;
  fk_id_pessoa: string;
  fk_id_recorrencia: number;
  created_at: string;
}
