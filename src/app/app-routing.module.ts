import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'cadastro-chamado',
    loadChildren: () => import('./cadastro-chamado/cadastro-chamado.module').then(m => m.CadastroChamadoPageModule)
  },
  {
    path: 'lista-chamados',
    loadChildren: () => import('./lista-chamados/lista-chamados.module').then(m => m.ListaChamadosPageModule)
  },
  {
    path: 'detalhes-chamado/:id',
    loadChildren: () => import('./detalhes-chamado/detalhes-chamado.module').then(m => m.DetalhesChamadoPageModule)
  },
  {
    path: 'atualizar-status/:id',
    loadChildren: () => import('./atualizar-status/atualizar-status.module').then(m => m.AtualizarStatusPageModule)
  },
  {
    path: 'cadastro-tecnico',
    loadChildren: () => import('./cadastro-tecnico/cadastro-tecnico.module').then(m => m.CadastroTecnicoPageModule)
  },
  {
    path: 'lista-tecnicos',
    loadChildren: () => import('./lista-tecnicos/lista-tecnicos.module').then(m => m.ListaTecnicosPageModule)
  },
  {
    path: 'resumo',
    loadChildren: () => import('./resumo/resumo.module').then(m => m.ResumoPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then(m => m.SobrePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
