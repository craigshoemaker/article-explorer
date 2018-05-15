import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ArticleService } from './services/article.service';
import { UserInfoService } from './services/user-info.service';

import { AppComponent } from './app.component';
//import { UserInfoComponent } from './components/user-info/user-info.component';
import { ArticlesComponent } from './components/articles/articles.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    providers:[
        ArticleService,
        UserInfoService
    ],
    declarations: [
        AppComponent,
        //UserInfoComponent
        ArticlesComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}