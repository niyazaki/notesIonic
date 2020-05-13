import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
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

@Component({
  selector: "app-category-edit",
  templateUrl: "./category-edit.page.html",
  styleUrls: ["./category-edit.page.scss"],
})
export class CategoryEditPage implements OnInit {
  categoryForm: FormGroup;

  constructor(
    public api: CategoriesService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  async editCategory() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api
      .updateCategory(
        this.route.snapshot.paramMap.get("id"),
        this.categoryForm.value
      )
      .subscribe(
        () => {
          loading.dismiss();
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      );
  }
  ngOnInit() {}
}
