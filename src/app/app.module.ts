import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavLeftComponent } from './components/nav-left/nav-left.component';
import { NavCenterComponent } from './components/nav-center/nav-center.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { ArticleContentComponent } from './pages/article-content/article-content.component';
import { CpanelComponent } from './pages/cpanel/cpanel.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { LoginPanelComponent } from './pages/cpanel/login-panel/login-panel.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './pages/sign-in/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/sign-in/reset-password/reset-password.component';
import {AuthServiceService} from './services/auth-service.service';
import { NavPanelComponent } from './components/nav-panel/nav-panel.component';
import { CategoriesComponent } from './pages/cpanel/categories/categories.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavProfileComponent } from './components/nav-profile/nav-profile.component';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from './services/api.service';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ContentService} from './services/content.service';
import {EditorModule} from '@tinymce/tinymce-angular';
import { CarretLoaderComponent } from './components/carret-loader/carret-loader.component';
import { GridContentComponent } from './components/grid-content/grid-content.component';
import { ContentComponent } from './pages/content/content.component';
import { ContentEditComponent } from './pages/content/content-edit/content-edit.component';
import { ToolsMusicComponent } from './components/tools-music/tools-music.component';
import { ToolsTextComponent } from './components/tools-text/tools-text.component';

const appRoutes: Routes = [
  { path: 'article', component: ArticleContentComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'new-password/:token', component: ResetPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'content', component: ContentComponent },
  { path: 'content/:id', component: ContentEditComponent },
  { path: 'cpanel', component: CpanelComponent },
  { path: 'cpanel/categories', component: CategoriesComponent },
  { path: 'cpanel/login', component: LoginPanelComponent },
  { path: '', redirectTo: '/article', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavLeftComponent,
    NavCenterComponent,
    NoContentComponent,
    ArticleContentComponent,
    CpanelComponent,
    LoginPanelComponent,
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    NavPanelComponent,
    CategoriesComponent,
    ProfileComponent,
    NavProfileComponent,
    ProfileInformationComponent,
    ContentComponent,
    CarretLoaderComponent,
    GridContentComponent,
    ContentEditComponent,
    ToolsMusicComponent,
    ToolsTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule, NgbModalModule,
    EditorModule,
  ],
  providers: [
    AuthServiceService,
    CookieService,
    ApiService,
    ContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
