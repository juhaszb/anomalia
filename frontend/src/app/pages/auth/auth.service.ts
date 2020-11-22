import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
	AnimationInfo,
	CommentInfo,
} from './animation-list/+state/animation-list.reducer';
import { User } from './user-list/+state/user-list.reducer';

@Injectable()
export class AuthService {
	constructor(private httpClient: HttpClient) {}

	getUserList() {
		return this.httpClient.get<User[]>('user');
	}

	deleteUser(id: string) {
		return this.httpClient.delete('user/' + id);
	}

	getAnimationList() {
		//   return this.httpClient.get('/user');
		return new BehaviorSubject<AnimationInfo[]>([
			{
				id: '1',
				url:
					'https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg',
				bought: true,
			},
			{
				id: '2',
				url:
					'https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg',
				bought: true,
			},
			{
				id: '3',
				url:
					'https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg',
				bought: true,
			},
			{
				id: '4',
				url:
					'https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg',
				bought: false,
			},
			{
				id: '5',
				url:
					'https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg',
				bought: false,
			},
		])
			.asObservable()
			.pipe(delay(200));
	}

	deleteAnimation(id: string) {
		//   return this.httpClient.delete('/user/'+id);
		return new BehaviorSubject({}).asObservable().pipe(delay(200));
	}
	buyAnimation(id: string) {
		//   return this.httpClient.delete('/user/'+id);
		return new BehaviorSubject({}).asObservable().pipe(delay(200));
	}
	downloadAnimation(id: string): Observable<Blob> {
		//   return this.httpClient.get('/user/'+id);
		return new BehaviorSubject({} as Blob).asObservable().pipe(delay(200));
	}
	uploadAnimation(CAFF: Blob) {
		//   return this.httpClient.get('/user/'+id);
		return new BehaviorSubject({}).asObservable().pipe(delay(200));
	}

	getCommentList(id: string) {
		//   return this.httpClient.get('/user/'+id);
		return new BehaviorSubject<CommentInfo[]>([
			{ id: '2', comment: 'Comment Kisgága' },
			{ id: '3', comment: 'Comment Kiskutya' },
			{ id: '4', comment: 'Comment Kiszebra' },
			{ id: '5', comment: ' CommnetArkthar, The Destroyer' },
			{
				id: '6',
				comment: '<script>window.alert("You just got hacked");</script>',
			},
		])
			.asObservable()
			.pipe(delay(200));
	}
	postComment(param: { animationId: string; comment: string }) {
		//   return this.httpClient.get('/user/'+id);
		return new BehaviorSubject({}).asObservable().pipe(delay(200));
	}
}
