import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as openInEditor from 'open-in-editor';

import { ArticleService } from '../../services/article.service';
import { ArticleReader } from '../../modules/articleReader/articleReader';
import { MessageService } from '../../services/message.service';
import { MessageEventTypes } from '../../services/messageEventTypes';
import { UserInfoService } from '../../services/user-info.service';
import { PathService } from '../../services/path.service';

@Component({
  selector: 'app-articles',
  templateUrl: require('./articles.component.html'),
  styleUrls: [require('./articles.component.scss')]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: ArticleReader[] = [];
  isLoading: boolean = true;

  articlesSubscription: Subscription;
  pathSubscription: Subscription;
  userSubscription: Subscription;
  
  constructor(private articleService: ArticleService,
              private messageService: MessageService,
              private userInfoService: UserInfoService,
              private pathService: PathService) {}

  articleClick(e) {
    const filePath = e.currentTarget.getAttribute('data-path');
    const editor = openInEditor.configure({
      editor: 'code' // todo: fallback if code is not installed
    }, err => alert(err));
    editor.open(filePath + ':10:5'); // todo: move to config
  }

  getArticles(name:string, filePath: string) {
    this.isLoading = true;
    this.articles = [];
    const component = this;
    
    this.articlesSubscription = this.articleService.getArticles(name, filePath).subscribe({
      next: article => this.articles.push(article),
      error: err => alert(err),
      complete: () =>  { 
        component.isLoading = false;
      }
    });
  }

  ngOnInit() {
    const filePath = this.pathService.getPath();
    const name = this.userInfoService.getLogin();

    if(filePath && filePath.length > 0) {
      this.getArticles(name, filePath);
    }

    this.userSubscription = this.messageService.subscribe(MessageEventTypes.UserChanged, value => {
      const path = this.pathService.getPath();
      this.getArticles(value.name, path);
    });

    this.pathSubscription = this.messageService.subscribe(MessageEventTypes.PathChanged, value => {
      const name = this.userInfoService.getLogin();
      this.getArticles(name, value.path);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.pathSubscription.unsubscribe();
    this.articlesSubscription.unsubscribe();
  }

}