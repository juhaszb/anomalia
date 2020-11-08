import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import {
  AnimationGetCommentRequest
} from '../+state/animation-list.actions';
import { AnimationListQuery } from '../+state/animation-list.selector';
import { Inject } from '@angular/core';

@Component({
  selector: 'anomalia-animation-comments',
  templateUrl: './animation-comments.component.html',
  styleUrls: ['./animation-comments.component.scss']
})
export class AnimationCommentsComponent implements OnInit {
  commentList$;

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.store.dispatch(new AnimationGetCommentRequest(this.data));
    this.commentList$ = this.store.pipe(
      select(AnimationListQuery.getCommentList)
    );

    console.log(this.commentList$);
  }
}
