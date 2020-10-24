import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AnimationUploadRequest } from '../+state/animation-list.actions';
import { AnimationListState } from '../+state/animation-list.reducer';

@Component({
  templateUrl: './upload-animation.component.html',
  styleUrls: ['./upload-animation.component.scss'],
})
export class UploadAnimationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UploadAnimationComponent>,
    private store: Store<AnimationListState>
  ) {}
  file;
  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
  onSave() {
    this.store.dispatch(new AnimationUploadRequest(this.file));
    this.dialogRef.close();
  }
  onChoose(file: File) {
    this.file = file;
  }
}
