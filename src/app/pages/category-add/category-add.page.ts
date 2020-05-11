import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormArray,
} from "@angular/forms";

import { CategoriesService } from "../../services/categories.service";
@Component({
  selector: "app-category-add",
  templateUrl: "./category-add.page.html",
  styleUrls: ["./category-add.page.scss"],
})
export class CategoryAddPage implements OnInit {
  categoryForm: FormGroup;
  constructor(
    public api: CategoriesService,
    public loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  async newCategory() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.postCategory(this.categoryForm.value).subscribe(
      (res) => {
        this.router.navigate(["/categories"]);
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
