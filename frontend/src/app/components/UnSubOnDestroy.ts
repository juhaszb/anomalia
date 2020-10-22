import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class UnsubscribeOnDestroyBaseComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
