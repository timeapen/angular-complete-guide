import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(postData: Post) {        
        // Send Http request
        this.http.post<{ name: string }>(
            'https://ng-complete-guide-3a355-default-rtdb.firebaseio.com/posts.json',
            postData
        ).subscribe(response => {
            console.debug('Response: ', response);
        });
    }

    fetchPosts() {

    }

}