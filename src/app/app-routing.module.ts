import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "categories",
    pathMatch: "full",
  },
  {
    path: "categories",
    loadChildren: () =>
      import("./pages/categories/categories.module").then(
        (m) => m.CategoriesPageModule
      ),
  },
  {
    path: "categories/add",
    loadChildren: () =>
      import("./pages/category-add/category-add.module").then(
        (m) => m.CategoryAddPageModule
      ),
  },
  {
    path: "categories/:id",
    loadChildren: () =>
      import("./pages/category-edit/category-edit.module").then(
        (m) => m.CategoryEditPageModule
      ),
  },
  {
    path: "notes",
    loadChildren: () =>
      import("./pages/notes/notes.module").then((m) => m.NotesPageModule),
  },
  {
    path: "notes/:id/edit",
    loadChildren: () =>
      import("./pages/note-edit/note-edit.module").then(
        (m) => m.NoteEditPageModule
      ),
  },
  {
    path: "notes/add",
    loadChildren: () =>
      import("./pages/note-add/note-add.module").then(
        (m) => m.NoteAddPageModule
      ),
  },
  {
    path: "notes/:id",
    loadChildren: () =>
      import("./pages/note-details/note-details.module").then(
        (m) => m.NoteDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
