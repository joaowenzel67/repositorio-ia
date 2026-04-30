import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ChamadosService, Chamado } from '../services/chamados';

@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
  standalone: false,
})
export class CadastroChamadoPage implements OnInit {

  // Campos do formulário
  solicitante: string = '';
  setor: string = '';
  titulo: string = '';
  descricao: string = '';
  prioridade: string = '';
  dataAbertura: string = '';
  tecnico: string = '';

  // Lista de técnicos ativos para o select
  tecnicosAtivos: any[] = [];

  // Opções de prioridade
  prioridades: string[] = ['Baixa', 'Média', 'Alta', 'Urgente'];

  // Opções de setor
  setores: string[] = ['TI', 'Financeiro', 'RH', 'Comercial', 'Administrativo', 'Produção', 'Logística', 'Outro'];

  constructor(
    private chamadosService: ChamadosService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Carrega técnicos ativos para o select
    this.tecnicosAtivos = this.chamadosService.listarTecnicosAtivos();
    // Define a data de abertura como a data atual
    this.dataAbertura = new Date().toISOString().split('T')[0];
  }

  // Método para salvar o chamado
  async salvar() {
    // Validações obrigatórias
    if (!this.solicitante) {
      this.mostrarErro('O campo Solicitante é obrigatório.');
      return;
    }
    if (!this.titulo) {
      this.mostrarErro('O campo Título é obrigatório.');
      return;
    }
    if (!this.descricao) {
      this.mostrarErro('O campo Descrição é obrigatório.');
      return;
    }
    if (!this.prioridade) {
      this.mostrarErro('O campo Prioridade é obrigatório.');
      return;
    }
    if (!this.tecnico) {
      this.mostrarErro('O campo Técnico Responsável é obrigatório.');
      return;
    }

    // Cria o objeto chamado
    const novoChamado: Chamado = {
      id: 0, // será atribuído pelo service
      solicitante: this.solicitante,
      setor: this.setor,
      titulo: this.titulo,
      descricao: this.descricao,
      prioridade: this.prioridade,
      dataAbertura: this.dataAbertura,
      tecnico: this.tecnico,
      status: 'Aberto',
      observacao: ''
    };

    // Adiciona ao array via service
    this.chamadosService.adicionarChamado(novoChamado);

    // Exibe mensagem de sucesso
    const toast = await this.toastController.create({
      message: 'Chamado cadastrado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    // Navega para a lista de chamados
    this.router.navigate(['/lista-chamados']);
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
