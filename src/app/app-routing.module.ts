import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'history-detail/:id',
    loadChildren: () => import('./history-detail/history-detail.module').then(m => m.HistoryDetailPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'tanggal',
    loadChildren: () => import('./reservasi/tanggal/tanggal.module').then(m => m.TanggalPageModule),
    canActivate: [AuthGuard],
    // data: { roles: ['Pelanggan'] }
  },
  {
    path: 'jam',
    loadChildren: () => import('./reservasi/jam/jam.module').then(m => m.JamPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'pilih-menu',
    loadChildren: () => import('./reservasi/pilih-menu/pilih-menu.module').then(m => m.PilihMenuPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'payment',
    loadChildren: () => import('./reservasi/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['Pelanggan'] }
  },
  {
    path: 'meja-pelayan',
    loadChildren: () => import('./meja-pelayan/meja-pelayan.module').then(m => m.MejaPelayanPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['pelayan'] }
  },
  {
    path: 'konfirmasi-meja/:id',
    loadChildren: () => import('./konfirmasi-meja/konfirmasi-meja.module').then(m => m.KonfirmasiMejaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'konfirmasi-reservasi',
    loadChildren: () => import('./konfirmasi-reservasi/konfirmasi-reservasi.module').then(m => m.KonfirmasiReservasiPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'status-meja',
    loadChildren: () => import('./status-meja/status-meja.module').then( m => m.StatusMejaPageModule)
  },
  {
    path: 'history-reservasi',
    loadChildren: () => import('./history-reservasi/history-reservasi.module').then( m => m.HistoryReservasiPageModule)

  },
  {
    path: 'pesann-langsung',
    loadChildren: () => import('./reservasi/pesann-langsung/pesann-langsung.module').then( m => m.PesannLangsungPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
