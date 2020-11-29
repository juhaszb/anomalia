import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { IsAuthenticated } from '../core.state/core.reducer';

@Injectable({
	providedIn: 'root',
})
export class UnauthGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!IsAuthenticated()) {
			this.router.navigateByUrl('/public/login');
			return false;
		} else {
			return true;
		}
	}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		return this.canActivate(childRoute, state);
	}
}
