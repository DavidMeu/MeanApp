import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ValidateService } from "./services/validate.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";

import { BookComponent } from "./book/book.component";
import { BookCreateComponent } from "./book-create/book-create.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { SearchComponent } from './search/search.component';

//import {MatIconModule} from '@angular/material/icon';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher} from '@angular/material';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  {
    path: "search/:id/:id2",
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard/:id/:id2",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "books",
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    //path: "book-details/:id",
    path: "book-details",
    component: BookDetailComponent,
    data: { title: "Book Details" }
  },
  {
    path: "book-create",
    component: BookCreateComponent,
    data: { title: "Create Book" }
  },
  {
    //path: "book-edit/:id",
    path: "book-edit",
    component: BookEditComponent,
    data: { title: "Edit Book" }
  }
];

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    BookComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,

    FlashMessagesModule.forRoot(),
    HttpModule,
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:3001"],
        blacklistedRoutes: ["localhost:3001/auth/"]
      }
    })
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
