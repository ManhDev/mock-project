import { CommentsService } from './../../../services/comments.service';
import { Article } from './../../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  articleDetails = {} as Article;
  comments = []
  constructor(private articlesService: ArticlesService, private route: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res =>
      this.articlesService.getDetailsAriticle(res.id).subscribe((data: { article: Article }) => {
        this.articleDetails = data.article;
        this.commentsService.getCommentBySlug(this.articleDetails.slug).subscribe(res => {
          this.comments = res['comments']
        })
      }))
  }

  addNewComment($event) {
    this.commentsService.getCommentBySlug(this.articleDetails.slug).subscribe(res => {
      this.comments = res['comments']
    })
  }

  onComment() { }

}
