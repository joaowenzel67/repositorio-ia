import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ChamadosService, Chamado } from '../services/chamados';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
  standalone: false,
})
export class ListaChamadosPage {

  // Array de chamados exibidos na lista
  chamados: Chamado[] = [];

  constructor(
    private chamadosService: ChamadosService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Atualiza a lista sempre que a página é exibida
  ionViewWillEnter() {
    this.chamados = this.chamadosService.listarChamados();
  }

  // Navega para os detalhes do chamado selecionado
  verDetalhes(id: number) {
    this.router.navigate(['/detalhes-chamado', id]);
  }

  // Confirma e exclui um chamado
  async excluirChamado(id: number) {
    const alert = await this.alertController.create({
      header: 'Excluir Chamado',
      message: 'Deseja realmente excluir este chamado?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            this.chamadosService.excluirChamado(id);
            this.chamados = this.chamadosService.listarChamados();
            const toast = await this.toastController.create({
              message: 'Chamado excluído com sucesso!',
              duration: 2000,
              position: 'bottom',
              color: 'danger',
              icon: 'trash-outline'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  // Retorna a classe CSS correspondente à prioridade
  getClassePrioridade(prioridade: string): string {
    const map: any = {
      'Baixa': 'baixa',
      'Média': 'media',
      'Alta': 'alta',
      'Urgente': 'urgente'
    };
    return map[prioridade] || '';
  }

  // Retorna a classe CSS correspondente ao status
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
