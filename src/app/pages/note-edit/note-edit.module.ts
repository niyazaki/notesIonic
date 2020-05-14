import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteEditPageRoutingModule } from './note-edit-routing.module';

import { NoteEditPage } from './note-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteEditPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NoteEditPage]
})
export class NoteEditPageModule {}
