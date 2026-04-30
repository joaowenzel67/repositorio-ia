import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChamadosService, Chamado } from '../services/chamados';

@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.page.html',
  styleUrls: ['./detalhes-chamado.page.scss'],
  standalone: false,
})
export class DetalhesChamadoPage implements OnInit {

  // Chamado exibido nos detalhes
  chamado: Chamado | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chamadosService: ChamadosService
  ) {}

  ngOnInit() {
    // Obtém o ID do chamado a partir da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.chamadosService.buscarChamadoPorId(id);
  }

  // Atualiza os dados quando a página é reexibida
  ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.chamadosService.buscarChamadoPorId(id);
  }

  // Navega para a tela de atualização de status
  atualizarStatus() {
    if (this.chamado) {
      this.router.navigate(['/atualizar-status', this.chamado.id]);
    }
  }

  // Retorna a classe CSS da prioridade
  getClassePrioridade(prioridade: string): string {
    const map: any = {
      'Baixa': 'baixa',
      'Média': 'media',
      'Alta': 'alta',
      'Urgente': 'urgente'
    };
    return map[prioridade] || '';
  }

  // Retorna a classe CSS do status
  getClasseStatus(status: string): string {
    const map: any = {
      'Aberto': 'aberto',
      'Em atendimento': 'em-atendimento',
      'Concluído': 'concluido',
      'Cancelado': 'cancelado'
    };
    return map[status] || '';
  }
}
