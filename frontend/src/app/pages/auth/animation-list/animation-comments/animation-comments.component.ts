import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import {
  AnimationGetCommentRequest,
  AnimationPostCommentRequest,
} from '../+state/animation-list.actions';
import { AnimationListQuery } from '../+state/animation-list.selector';
import { Inject } from '@angular/core';

@Component({
  selector: 'anomalia-animation-comments',
  templateUrl: './animation-comments.component.html',
  styleUrls: ['./animation-comments.component.scss'],
})
export class AnimationCommentsComponent implements OnInit {
  commentList$;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public animationId
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AnimationGetCommentRequest(this.animationId));
    this.commentList$ = this.store.pipe(
      select(AnimationListQuery.getCommentList)
    );
  }

  addNewComment(newComment: string) {
    this.store.dispatch(
      new AnimationPostCommentRequest({
        animationId: this.animationId,
        comment: newComment,
      })
    );
  }
}
