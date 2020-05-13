import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NotesService } from "../../services/notes.service";
@Component({
  selector: "app-notes",
  templateUrl: "./notes.page.html",
  styleUrls: ["./notes.page.scss"],
})
export class NotesPage implements OnInit {
  constructor(
    public api: NotesService,
    public loadingController: LoadingController
  ) {}

  notes: any;
  deletedMessage: any;

  async getNotes() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.getNotes().subscribe(
      (res) => {
        console.log(res);
        this.notes = res;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async deleteNote(id) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.deleteNote(id).subscribe(
      (res) => {
        console.log(res);
        this.deletedMessage = res;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
    this.getNotes();
  }
  ionViewWillEnter(){
    this.getNotes();
  }
  ngOnInit() {
    this.getNotes();
  }
}