import { Injectable } from '@angular/core';

// Interface para tipagem dos chamados
export interface Chamado {
  id: number;
  solicitante: string;
  setor: string;
  titulo: string;
  descricao: string;
  prioridade: string;
  dataAbertura: string;
  tecnico: string;
  status: string;
  observacao: string;
}

// Interface para tipagem dos técnicos
export interface Tecnico {
  id: number;
  nome: string;
  especialidade: string;
  contato: string;
  situacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  // Arrays para armazenamento dos dados em memória
  chamados: Chamado[] = [];
  tecnicos: Tecnico[] = [];

  // Contador para gerar IDs únicos
  private proximoIdChamado: number = 1;
  private proximoIdTecnico: number = 1;

  constructor() {
    // Dados iniciais de exemplo para demonstração
    this.tecnicos = [
      { id: 1, nome: 'Carlos Técnico', especialidade: 'Hardware', contato: 'carlos@email.com', situacao: 'Ativo' },
      { id: 2, nome: 'Ana Suporte', especialidade: 'Software', contato: 'ana@email.com', situacao: 'Ativo' },
      { id: 3, nome: 'Roberto Redes', especialidade: 'Rede', contato: 'roberto@email.com', situacao: 'Ativo' }
    ];
    this.proximoIdTecnico = 4;

    this.chamados = [
      {
        id: 1,
        solicitante: 'João Silva',
        setor: 'Financeiro',
        titulo: 'Computador não liga',
        descricao: 'O computador do setor financeiro não está ligando.',
        prioridade: 'Alta',
        dataAbertura: '2026-04-30',
        tecnico: 'Carlos Técnico',
        status: 'Aberto',
        observacao: ''
      },
      {
        id: 2,
        solicitante: 'Maria Santos',
        setor: 'RH',
        titulo: 'Sistema travando',
        descricao: 'O sistema de folha de pagamento está travando ao gerar relatórios.',
        prioridade: 'Urgente',
        dataAbertura: '2026-04-29',
        tecnico: 'Ana Suporte',
        status: 'Em atendimento',
        observacao: 'Verificando versão do sistema.'
      },
      {
        id: 3,
        solicitante: 'Pedro Oliveira',
        setor: 'TI',
        titulo: 'Impressora sem funcionar',
        descricao: 'A impressora do andar 2 não está imprimindo.',
        prioridade: 'Média',
        dataAbertura: '2026-04-28',
        tecnico: 'Roberto Redes',
        status: 'Concluído',
        observacao: 'Toner substituído com sucesso.'
      }
    ];
    this.proximoIdChamado = 4;
  }

  // ====== Métodos para Chamados ======

  // Adiciona um novo chamado ao array
  adicionarChamado(chamado: Chamado): void {
    chamado.id = this.proximoIdChamado++;
    this.chamados.push(chamado);
  }

  // Retorna todos os chamados
  listarChamados(): Chamado[] {
    return this.chamados;
  }

  // Busca um chamado pelo ID
  buscarChamadoPorId(id: number): Chamado | undefined {
    return this.chamados.find(c => c.id === id);
  }

  // Exclui um chamado pelo ID
  excluirChamado(id: number): void {
    this.chamados = this.chamados.filter(c => c.id !== id);
  }

  // Atualiza o status e a observação de um chamado
  atualizarStatus(id: number, status: string, observacao: string): void {
    const chamado = this.chamados.find(c => c.id === id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
    }
  }

  // ====== Métodos para Técnicos ======

  // Adiciona um novo técnico ao array
  adicionarTecnico(tecnico: Tecnico): void {
    tecnico.id = this.proximoIdTecnico++;
    this.tecnicos.push(tecnico);
  }

  // Retorna todos os técnicos
  listarTecnicos(): Tecnico[] {
    return this.tecnicos;
  }

  // Retorna apenas técnicos com situação 'Ativo'
  listarTecnicosAtivos(): Tecnico[] {
    return this.tecnicos.filter(t => t.situacao === 'Ativo');
  }

  // Exclui um técnico pelo ID
  excluirTecnico(id: number): void {
    this.tecnicos = this.tecnicos.filter(t => t.id !== id);
  }

  // ====== Métodos para Resumo ======

  // Conta chamados por status
  contarPorStatus(status: string): number {
    return this.chamados.filter(c => c.status === status).length;
  }

  // Conta chamados por prioridade
  contarPorPrioridade(prioridade: string): number {
    return this.chamados.filter(c => c.prioridade === prioridade).length;
  }
}
