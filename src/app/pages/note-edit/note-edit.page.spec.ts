import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteEditPage } from './note-edit.page';

describe('NoteEditPage', () => {
  let component: NoteEditPage;
  let fixture: ComponentFixture<NoteEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
