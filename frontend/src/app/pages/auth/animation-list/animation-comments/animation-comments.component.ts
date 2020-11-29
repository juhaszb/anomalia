import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/components/UnSubOnDestroy';

import {
	AnimationGetCommentRequest,
	AnimationPostCommentChange,
	AnimationPostCommentRequest,
} from '../+state/animation-list.actions';
import { AnimationListQuery } from '../+state/animation-list.selector';

@Component({
	selector: 'anomalia-animation-comments',
	templateUrl: './animation-comments.component.html',
	styleUrls: ['./animation-comments.component.scss'],
})
export class AnimationCommentsComponent
	extends UnsubscribeOnDestroyBaseComponent
	implements OnInit {
	commentList$;
	postComment = new FormControl('', [Validators.required]);
	constructor(
		private store: Store,
		@Inject(MAT_DIALOG_DATA) public animationId
	) {
		super();
	}

	ngOnInit() {
		this.store.dispatch(new AnimationGetCommentRequest(this.animationId));
		this.commentList$ = this.store.pipe(
			select(AnimationListQuery.getCommentList)
		);
		this.subscriptions.push(
			this.postComment.valueChanges.subscribe((x) =>
				this.store.dispatch(new AnimationPostCommentChange(x))
			),
			this.store
				.pipe(select(AnimationListQuery.getPostCommentText))
				.subscribe((s) => this.postComment.patchValue(s, { emitEvent: false }))
		);
	}

	addNewComment() {
		this.store.dispatch(
			new AnimationPostCommentRequest({
				animationId: this.animationId,
				comment: this.postComment.value,
			})
		);
	}
}
