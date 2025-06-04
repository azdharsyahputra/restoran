import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'regist',
    loadChildren: () => import('./auth/regist/regist.module').then(m => m.RegistPageModule)
  },  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'history-detail',
    loadChildren: () => import('./history-detail/history-detail.module').then( m => m.HistoryDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'tanggal',
    loadChildren: () => import('./reservasi/tanggal/tanggal.module').then( m => m.TanggalPageModule)
  },
  {
    path: 'jam',
    loadChildren: () => import('./reservasi/jam/jam.module').then( m => m.JamPageModule)
  },
  {
    path: 'pilih-menu',
    loadChildren: () => import('./reservasi/pilih-menu/pilih-menu.module').then( m => m.PilihMenuPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./reservasi/payment/payment.module').then( m => m.PaymentPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
