import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginViewComponent} from "./domain/login-view/login-view.component";

const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'login', component: LoginViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
