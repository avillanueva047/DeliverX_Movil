import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { LoginPage } from '../auth/login/login.page';
import { RegisterPage } from '../auth/register/register.page';
import { ResetPage } from '../auth/password/reset/reset.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandingPage, LoginPage, RegisterPage, ResetPage],
  entryComponents: [LoginPage, RegisterPage, ResetPage]
})
export class LandingPageModule {}
