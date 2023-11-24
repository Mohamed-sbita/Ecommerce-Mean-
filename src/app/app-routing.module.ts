import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { GuardGuard } from './guard.guard';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dash',canActivate: [GuardGuard],
    component: DashboardComponent,
  },
  {
    path: 'edit',canActivate: [GuardGuard],
    component: UpdateComponent,
  },
  {
    path: 'myorders',
    component: MyordersComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
