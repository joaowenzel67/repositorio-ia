import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage {

  // Itens do menu com ícone, título, descrição e rota
  menuItems = [
    {
      icon: 'add-circle-outline',
      title: 'Cadastrar Chamado',
      description: 'Registrar novo chamado técnico',
      route: '/cadastro-chamado',
      color: '#3880ff'
    },
    {
      icon: 'list-outline',
      title: 'Lista de Chamados',
      description: 'Visualizar chamados cadastrados',
      route: '/lista-chamados',
      color: '#5260ff'
    },
    {
      icon: 'person-add-outline',
      title: 'Cadastrar Técnico',
      description: 'Registrar novo técnico',
      route: '/cadastro-tecnico',
      color: '#2dd36f'
    },
    {
      icon: 'people-outline',
      title: 'Lista de Técnicos',
      description: 'Visualizar técnicos cadastrados',
      route: '/lista-tecnicos',
      color: '#ffc409'
    },
    {
      icon: 'bar-chart-outline',
      title: 'Resumo',
      description: 'Resumo dos chamados',
      route: '/resumo',
      color: '#eb445a'
    },
    {
      icon: 'information-circle-outline',
      title: 'Sobre',
      description: 'Informações do aplicativo',
      route: '/sobre',
      color: '#92949c'
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Navega para a rota do item selecionado
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Confirma saída do sistema e volta para a tela de login
  async sair() {
    const alert = await this.alertController.create({
      header: 'Sair do Sistema',
      message: 'Deseja realmente sair do sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
