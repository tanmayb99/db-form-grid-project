import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DivisionFormComponent } from './division-form/division-form.component';
import { TableAgGridComponent } from './table-ag-grid/table-ag-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'division-form', component: DivisionFormComponent },
  { path: 'table-ag-grid', component: TableAgGridComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
