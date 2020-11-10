import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CoreQuery } from 'src/app/core/core.state/core.selector';

import {
  AnimationBuyRequest,
  AnimationDeleteRequest,
  AnimationDownloadRequest,
  AnimationListRequest,
} from './+state/animation-list.actions';
import { AnimationListQuery } from './+state/animation-list.selector';
import { UploadAnimationComponent } from './upload-animation/upload-animation.component';
import { AnimationCommentsComponent } from './animation-comments/animation-comments.component';

@Component({
  selector: 'anomalia-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.scss'],
})
export class AnimationListComponent implements OnInit {
  isRequesting$;
  isDeletePostBuyRequesting$;
  animationList$;
  deleteOrBuyId$;
  currentUserType$;

  constructor(private store: Store, private modal: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new AnimationListRequest());
    this.isRequesting$ = this.store.pipe(
      select(AnimationListQuery.getAnimationListRequesting)
    );
    this.isDeletePostBuyRequesting$ = this.store.pipe(
      select(AnimationListQuery.getDeletePostBuyRequesting)
    );
    this.deleteOrBuyId$ = this.store.pipe(
      select(AnimationListQuery.getDeleteOrBuyId)
    );
    this.currentUserType$ = this.store.pipe(
      select(CoreQuery.getCurrentUserType)
    );
    this.animationList$ = this.store.pipe(
      select(AnimationListQuery.getAnimationList)
    );
  }

  delete(animationId: string) {
    this.store.dispatch(new AnimationDeleteRequest(animationId));
  }
  buy(animationId: string) {
    this.store.dispatch(new AnimationBuyRequest(animationId));
  }
  download(animationId: string) {
    this.store.dispatch(new AnimationDownloadRequest(animationId));
  }
  comments(animationId: string) {
    this.modal.open(AnimationCommentsComponent, {data: animationId});
  }
  createNew() {
    this.modal.open(UploadAnimationComponent);
  }
}
