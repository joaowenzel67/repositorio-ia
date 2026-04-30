import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ChamadosService, Tecnico } from '../services/chamados';

@Component({
  selector: 'app-cadastro-tecnico',
  templateUrl: './cadastro-tecnico.page.html',
  styleUrls: ['./cadastro-tecnico.page.scss'],
  standalone: false,
})
export class CadastroTecnicoPage {

  // Campos do formulário
  nome: string = '';
  especialidade: string = '';
  contato: string = '';
  situacao: string = 'Ativo';

  // Opções de especialidade
  especialidades: string[] = ['Hardware', 'Software', 'Rede', 'Impressora', 'Sistema interno', 'Outros'];

  // Opções de situação
  situacoes: string[] = ['Ativo', 'Inativo'];

  constructor(
    private chamadosService: ChamadosService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Método para salvar o técnico
  async salvar() {
    // Validações obrigatórias
    if (!this.nome) {
      this.mostrarErro('O campo Nome é obrigatório.');
      return;
    }
    if (!this.especialidade) {
      this.mostrarErro('O campo Especialidade é obrigatório.');
      return;
    }
    if (!this.contato) {
      this.mostrarErro('O campo Contato é obrigatório.');
      return;
    }

    // Cria o objeto técnico
    const novoTecnico: Tecnico = {
      id: 0, // será atribuído pelo service
      nome: this.nome,
      especialidade: this.especialidade,
      contato: this.contato,
      situacao: this.situacao
    };

    // Adiciona ao array via service
    this.chamadosService.adicionarTecnico(novoTecnico);

    // Exibe mensagem de sucesso
    const toast = await this.toastController.create({
      message: 'Técnico cadastrado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    // Navega para a lista de técnicos
    this.router.navigate(['/lista-tecnicos']);
  }

  // Exibe mensagem de erro
  async mostrarErro(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Campo Obrigatório',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
