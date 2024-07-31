export interface Costumer {
  id?: number;
  nome_razao?: string;
  email?: string;
  telefone?: string;
  data_cadastro?: Date;
  tipoPessoa?: number;
  cpf_cnpj?: string;
  inscricao_estadual?: string;
  genero?: number;
  data_nascimento?: Date;
  senha?: string;
  bloqueado?: boolean;
}