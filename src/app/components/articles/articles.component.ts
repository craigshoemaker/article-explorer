import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
      const filePath = 'C:\\Users\\cshoe\\Documents\\data\\docs\\azure-docs-pr\\articles\\storage\\blobs';
      const name = 'craigshoemaker';

      this.subscription = this.articleService.getArticles(name, filePath).subscribe({
        next: article => this.articles.push(article),
        error: err => alert(err)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}