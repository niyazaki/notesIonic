import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})

export class CategoriesPage implements OnInit {
  constructor(
    public route : ActivatedRoute,
    public api: CategoriesService,
    public loadingController: LoadingController
  ) {
    route.params.subscribe(val => {
      this.getCategories;
    })
  }

  categories: any;
  category : any;

  async getCategories() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.getCategory().subscribe(
      (res) => {
        console.log(res);
        this.categories = res;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async deleteCategory(id) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.deleteCategory(id).subscribe(
      (res) => {
        console.log(res);
        this.category = res;
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
    this.getCategories();
  }
  ngOnInit() {
    this.getCategories();
  }
}
