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
  selector: "app-note-add",
  templateUrl: "./note-add.page.html",
  styleUrls: ["./note-add.page.scss"],
})
export class NoteAddPage implements OnInit {
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
    this.noteForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      category: [null, Validators.required],
    });
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

  async addNote() {
    // The category input is a map inside another map. The split method is a good way to avoid dealing with this.
    this.category = this.noteForm.value.category.split("|");
    this.noteForm.value.category = {
      id: Number(this.category[0]),
      name: this.category[1],
    };

    await this.api.postNote(this.noteForm.value).subscribe(
      () => {
        this.router.navigate(["/notes"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
