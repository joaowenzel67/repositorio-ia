import { Component } from '@angular/core';
import { ChamadosService } from '../services/chamados';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  standalone: false,
})
export class ResumoPage {

  // Totais por status
  totalAberto: number = 0;
  totalEmAtendimento: number = 0;
  totalConcluido: number = 0;
  totalCancelado: number = 0;

  // Totais por prioridade
  totalBaixa: number = 0;
  totalMedia: number = 0;
  totalAlta: number = 0;
  totalUrgente: number = 0;

  // Total geral
  totalChamados: number = 0;

  constructor(private chamadosService: ChamadosService) {}

  // Recalcula os totais sempre que a página é exibida
  ionViewWillEnter() {
    this.calcularTotais();
  }

  // Calcula todos os totais com base no array de chamados
  calcularTotais() {
    this.totalChamados = this.chamadosService.listarChamados().length;

    // Por status
    this.totalAberto = this.chamadosService.contarPorStatus('Aberto');
    this.totalEmAtendimento = this.chamadosService.contarPorStatus('Em atendimento');
    this.totalConcluido = this.chamadosService.contarPorStatus('Concluído');
    this.totalCancelado = this.chamadosService.contarPorStatus('Cancelado');

    // Por prioridade
    this.totalBaixa = this.chamadosService.contarPorPrioridade('Baixa');
    this.totalMedia = this.chamadosService.contarPorPrioridade('Média');
    this.totalAlta = this.chamadosService.contarPorPrioridade('Alta');
    this.totalUrgente = this.chamadosService.contarPorPrioridade('Urgente');
  }
}
