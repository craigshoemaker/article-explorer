import { Component, OnInit } from '@angular/core';
import * as openInEditor from 'open-in-editor';
import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../../modules/articleReader/article.model';
import { ArticleService } from '../../services/article.service';

const mapFilterFromNow = (fromNow: Date) =>
  pipe(
    map((articles: Article[]) =>
      articles.filter(article => article.metadata.refreshDate < fromNow)
    )
  );

@Component({
  selector: 'app-articles',
  templateUrl: require('./articles.component.html'),
  styleUrls: [require('./articles.component.scss')]
})
export class ArticlesComponent implements OnInit {
  olderThan30Days$: Observable<Article[]>;
  olderThan90Days$: Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  isLoading$: BehaviorSubject<boolean>;

  // Now get an array of Articles
  articles$ = this.articleService.articles$;

  // const thirtyDaysFromNow = moment()
  //   .add(30, 'd')
  //   .toDate();
  // const ninetyDaysFromNow = moment()
  //   .add(90, 'd')
  //   .toDate();

  // this.olderThan30Days$ = this.articles$.pipe(
  //   mapFilterFromNow(thirtyDaysFromNow)
  //   // map(articles =>
  //   //   articles.filter(
  //   //     article => article.metadata.refreshDate < thirtyDaysFromNow
  //   //   )
  //   // )
  // );

  // this.olderThan90Days$ = this.articles$.pipe(
  //   mapFilterFromNow(ninetyDaysFromNow)
  //   // map(articles =>
  //   //   articles.filter(
  //   //     article => article.metadata.refreshDate < ninetyDaysFromNow
  //   //   )
  //   // )
  // );

  ngOnInit() {
    setTimeout((() => this.isLoading$ = this.articleService.isLoading$), 0);
  }

  articleClick(e) {
    const filePath = e.currentTarget.getAttribute('data-path');
    const editor = openInEditor.configure(
      {
        editor: 'code' // todo: fallback if vscode is not installed
      },
      err => alert(err)
    );
    editor.open(filePath + ':10:5'); // todo: move to config
  }
}