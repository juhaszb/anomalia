import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
		return this.httpClient.get<AnimationInfo[]>('animation');
	}

	deleteAnimation(id: string) {
		return this.httpClient.delete('animation/' + id);
	}
	buyAnimation(id: string) {
		return this.httpClient.post('animation/' + id + '/buy', {});
	}
	downloadAnimation(id: string) {
		return this.httpClient.get('animation/' + id + '/download', {
			responseType: 'blob',
			observe: 'response',
		});
	}
	uploadAnimation(CAFF: File) {
		const data = new FormData();
		data.append('file', CAFF);
		return this.httpClient.post('animation/', data);
	}

	getCommentList(id: string) {
		return this.httpClient.get<CommentInfo[]>('animation/' + id + '/comment');
	}
	postComment(param: { animationId: string; comment: string }) {
		return this.httpClient.post('animation/' + param.animationId + '/comment', {
			comment: param.comment,
		});
	}
}
