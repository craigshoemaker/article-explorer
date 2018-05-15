import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as openInEditor from 'open-in-editor';

import { ArticleService } from '../../services/article.service';
import { ArticleInfo } from '../../modules/articleInfo';
import { ArticleReader } from '../../modules/articleReader/articleReader';

@Component({
  selector: 'app-articles',
  templateUrl: require('./articles.component.html'),
  styleUrls: [require('./articles.component.scss')]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: ArticleReader[] = [];
  subscription: Subscription;
  isLoading: boolean = true;
  
  constructor(private articleService: ArticleService) {}

  toggleLoader() {
    this.isLoading = !this.isLoading;
  }

  articleClick(e) {
    const filePath = e.currentTarget.getAttribute('data-path');
    const editor = openInEditor.configure({
      editor: 'code'
    }, err => alert(err));
    editor.open(filePath + ':10:5');
  }

  ngOnInit() {
      const filePath = 'C:\\Users\\cshoe\\Documents\\data\\docs\\azure-docs-pr\\articles\\storage';
      const name = 'craigshoemaker';
      const component = this;
      this.subscription = this.articleService.getArticles(name, filePath).subscribe({
        next: article => this.articles.push(article),
        error: err => alert(err),
        complete: () => component.toggleLoader()
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}