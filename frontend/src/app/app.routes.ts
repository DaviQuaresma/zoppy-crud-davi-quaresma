import { Routes } from '@angular/router';
import { ClientsListComponent } from './pages/clients/clients-list/clients-list.component';
import { ClientsFormComponent } from './pages/clients/clients-form/clients-form.component';

export const appRoutes: Routes = [
  { path: '', component: ClientsListComponent },
  { path: 'novo', component: ClientsFormComponent },
  { path: 'editar/:id', component: ClientsFormComponent }
];
