import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes/lista', pathMatch: 'full' },
  { path: 'clientes', redirectTo: 'clientes/lista' },
  {
    path: 'clientes',
    loadComponent: () => import('./components/clientes/clientes.component').then(m => m.ClientesComponent),
    children: [
      { path: 'lista', loadComponent: () => import('./components/clientes/lista-clientes/lista-clientes.component').then(c => c.ListaClientesComponent) },
      { path: ':id', loadComponent: () => import('./components/clientes/detalhe-cliente/detalhe-cliente.component').then(c => c.DetalheClienteComponent) },
      { path: 'novo', loadComponent: () => import('./components/clientes/detalhe-cliente/detalhe-cliente.component').then(c => c.DetalheClienteComponent) },
    ]
  },
  { path: '**', redirectTo: 'clientes/lista', pathMatch: 'full' }
];
