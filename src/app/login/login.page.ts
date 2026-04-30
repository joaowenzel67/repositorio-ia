import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  // Campos do formulário de login
  usuario: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Método para validar e realizar o login
  async login() {
    // Validação: ambos os campos devem estar preenchidos
    if (!this.usuario || !this.senha) {
      const alert = await this.alertController.create({
        header: 'Erro de Login',
        message: 'Por favor, preencha o usuário e a senha para acessar o sistema.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Se ambos preenchidos, navega para o menu principal
    this.router.navigate(['/menu']);
  }
}
