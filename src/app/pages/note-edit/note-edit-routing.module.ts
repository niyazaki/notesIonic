import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteEditPage } from './note-edit.page';

const routes: Routes = [
  {
    path: '',
    component: NoteEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteEditPageRoutingModule {}
