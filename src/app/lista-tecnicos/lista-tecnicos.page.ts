import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ChamadosService, Tecnico } from '../services/chamados';

@Component({
  selector: 'app-lista-tecnicos',
  templateUrl: './lista-tecnicos.page.html',
  styleUrls: ['./lista-tecnicos.page.scss'],
  standalone: false,
})
export class ListaTecnicosPage {

  // Array de técnicos exibidos na lista
  tecnicos: Tecnico[] = [];

  constructor(
    private chamadosService: ChamadosService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Atualiza a lista sempre que a página é exibida
  ionViewWillEnter() {
    this.tecnicos = this.chamadosService.listarTecnicos();
  }

  // Confirma e exclui um técnico
  async excluirTecnico(id: number) {
    const alert = await this.alertController.create({
      header: 'Excluir Técnico',
      message: 'Deseja realmente excluir este técnico?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            this.chamadosService.excluirTecnico(id);
            this.tecnicos = this.chamadosService.listarTecnicos();
            const toast = await this.toastController.create({
              message: 'Técnico excluído com sucesso!',
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
}
