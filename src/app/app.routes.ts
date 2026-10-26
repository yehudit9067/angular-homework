import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GradesTableComponent } from './grades-table/grades-table.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'grades', component: GradesTableComponent },
  { path: '**', redirectTo: '' }
];

