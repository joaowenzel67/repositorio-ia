import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  standalone: false,
})
export class SobrePage {

  // Informações do aplicativo
  appInfo = {
    nome: 'Chamados Técnicos',
    versao: '1.0.0',
    aluno: 'Aluno / Grupo',
    disciplina: 'Desenvolvimento Mobile',
    objetivo: 'Aplicativo para controle de chamados técnicos, permitindo o cadastro, listagem, acompanhamento e atualização de chamados, utilizando arrays para armazenamento temporário dos dados.',
    tecnologias: [
      { nome: 'Ionic Framework', icone: 'logo-ionic' },
      { nome: 'Angular', icone: 'logo-angular' },
      { nome: 'TypeScript', icone: 'code-slash-outline' },
      { nome: 'SCSS', icone: 'color-palette-outline' }
    ]
  };

  constructor() {}
}
