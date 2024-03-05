import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {

   private postsDbUrl: string = 'https://ng-complete-guide-3a355-default-rtdb.firebaseio.com/posts.json';

    public posts: Subject<Post[]> = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    createAndStorePost(postData: Post) {        
        // Send Http request
        return this.http.post<{ name: string }>(
            this.postsDbUrl,
            postData
        );
    }

    fetchPostsObservable(): Observable<Post[]> {
        return this.http.get<{ [key: string]: Post }>(
            this.postsDbUrl
        ).pipe(
            map(response => {
                const posts: Post[] = [];

                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        posts.push({ ...response[key], id: key });
                    }
                }

                return posts;
            })
        );
    }

    fetchPosts() {
        this.http.get<{ [key: string]: Post }>(
            this.postsDbUrl
        ).pipe(
            map(response => {
                const posts: Post[] = [];

                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        posts.push({ ...response[key], id: key });
                    }
                }

                return posts;
            })
        )
            .subscribe(
                posts => {
                    this.posts.next(posts);
                },
                error => {
                    console.debug('Error: ', error);
                    this.posts.error(error)
                });
    }

    deletePosts() {
        return this.http.delete(
            this.postsDbUrl
        );
    }
}