import { LoadingController } from "@ionic/angular";
import { NotesService } from "../../services/notes.service";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormArray,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-note-edit",
  templateUrl: "./note-edit.page.html",
  styleUrls: ["./note-edit.page.scss"],
})
export class NoteEditPage implements OnInit {
  note = {
    title: "Title",
    content: "Content",
    date: "Date",
    category: "Category",
  };
  noteForm: FormGroup;
  categories: any;
  category: any;

  constructor(
    public api: NotesService,
    public apiCat: CategoriesService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCategories();
    this.getNote(this.route.snapshot.paramMap.get("id"));
    this.noteForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  ionViewWillEnter() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }

  async getCategories() {
    await this.apiCat.getCategory().subscribe(
      (res) => {
        console.log(res);
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async getNote(id) {
    const loading = await this.loadingController.create({
      message: "Loading",
    });
    await loading.present();
    await this.api.getNoteById(id).subscribe(
      (data) => {
        this.note = {
          title: data.title,
          content: data.content,
          date: data.date,
          category: data.category,
        };
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async editNote() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.category = this.noteForm.value.category.split("|");
    this.noteForm.value.category = {
      id: Number(this.category[0]),
      name: this.category[1],
    };
    await this.api
      .updateNote(this.route.snapshot.paramMap.get("id"), this.noteForm.value)
      .subscribe(
        (data) => {
          loading.dismiss();
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      );
    this.redirect();
  }

  redirect() {
    this.router.navigate(["/notes"]);
  }
  ngOnInit() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }
}
