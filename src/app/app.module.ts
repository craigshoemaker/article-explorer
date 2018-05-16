import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ArticleService } from './services/article.service';
import { UserInfoService } from './services/user-info.service';
import { MessageService } from './services/message.service';
import { PathService } from './services/path.service';

import { AppComponent } from './app.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PathSelectorComponent } from './components/path-selector/path-selector.component';
import { ArticleReader } from './modules/articleReader/articleReader';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
    ],
    providers:[
        ArticleService,
        UserInfoService,
        MessageService,
        PathService,
        ArticleReader
    ],
    declarations: [
        AppComponent,
        UserInfoComponent,
        ArticlesComponent,
        PathSelectorComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}