import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { canGuard } from './guards/can.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: mapToCanActivate([])
                    .concat(canGuard),
  }, {
    path: 'clasic',
    loadComponent: () => import('./pages/clasic/clasic.component'),
    canActivate: mapToCanActivate([])
                    .concat(canGuard),
  }, {
    path: 'current',
    loadComponent: () => import('./pages/current/current.component'),
    canActivate: mapToCanActivate([])
                    .concat(canGuard),
  }, {
    path: 'forms',
    loadComponent: () => import('./pages/forms/forms.component'),
    canActivate: mapToCanActivate([])
                    .concat(canGuard),
  }, {
    path: '**',
    loadComponent: () => import('./pages/errors/errors.component'),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
