import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'anomalia-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.scss'],
})
export class AnimationListComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {}
}
