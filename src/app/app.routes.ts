import { Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register/register.page.component';
import { AdminLoginPageComponent } from './admin/admin-login.page.component';
import { AdminPanelPageComponent } from './admin/admin-panel.page.component';
import { HomePageComponent } from './home/home.page.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  // Existing marketing homepage is rendered by AppComponent; keep it as default route.
  // /home will show AppComponent.
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'admin', component: AdminLoginPageComponent },
  { path: 'admin/panel', component: AdminPanelPageComponent }
];


