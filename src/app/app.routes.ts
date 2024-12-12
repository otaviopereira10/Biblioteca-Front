import { Routes } from '@angular/router';
import { FormComponent } from './form-livro/form-livro.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    { path: 'cadastro', component: FormComponent },
    { path: 'home', component: CardsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
