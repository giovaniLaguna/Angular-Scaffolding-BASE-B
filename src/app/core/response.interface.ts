/**
 * - Padrão de respostas da api
 * - recebe o model como type parameter
 */
export interface response<T> {
  /** numero total de itens encontrados sem contar com os filtros de paginação */
  count?: number;
  /** determina se houve algum erro ou não na request */
  isSucceed: boolean;
  /** dados da response */
  data: T;
  /** array contendo as messagens de erro / warnings */
  messages: Message[];
}

export enum MessagesTypes {
  default = 0,
  error = 1,
  warning = 2,
  info = 3,
  success = 4,
}

export interface Message {
  type: MessagesTypes;
  description: string;
}

export function isMessage(message): message is Message {
  return message
      && typeof message['type'] == 'number'
      && typeof message['description'] == 'string';
}
