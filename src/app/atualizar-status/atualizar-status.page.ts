import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChamadosService, Chamado } from '../services/chamados';

@Component({
  selector: 'app-atualizar-status',
  templateUrl: './atualizar-status.page.html',
  styleUrls: ['./atualizar-status.page.scss'],
  standalone: false,
})
export class AtualizarStatusPage implements OnInit {

  // Chamado sendo atualizado
  chamado: Chamado | undefined;

  // Campos do formulário
  novoStatus: string = '';
  observacao: string = '';

  // Opções de status
  statusOptions: string[] = ['Aberto', 'Em atendimento', 'Concluído', 'Cancelado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chamadosService: ChamadosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Obtém o chamado pelo ID da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.chamadosService.buscarChamadoPorId(id);
    if (this.chamado) {
      this.novoStatus = this.chamado.status;
      this.observacao = this.chamado.observacao;
    }
  }

  // Salva a atualização de status
  async salvar() {
    if (this.chamado) {
      this.chamadosService.atualizarStatus(this.chamado.id, this.novoStatus, this.observacao);

      const toast = await this.toastController.create({
        message: 'Status atualizado com sucesso!',
        duration: 2000,
        position: 'bottom',
        color: 'success',
        icon: 'checkmark-circle-outline'
      });
      await toast.present();

      // Volta para os detalhes do chamado
      this.router.navigate(['/detalhes-chamado', this.chamado.id]);
    }
  }
}
