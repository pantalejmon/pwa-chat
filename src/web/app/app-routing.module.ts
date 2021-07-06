import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginViewComponent} from "./domain/user/login/login-view/login-view.component";
import {RegistrationViewComponent} from "./domain/user/registration/registration-view/registration-view.component";
import {HomeComponent} from "./domain/home/home.component";

const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'login', component: LoginViewComponent},
  {path: 'registration', component: RegistrationViewComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
