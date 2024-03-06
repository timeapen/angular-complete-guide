import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {

   private postsDbUrl: string = 'https://ng-complete-guide-3a355-default-rtdb.firebaseio.com/posts.json';

    public posts: Subject<Post[]> = new Subject<Post[]>();
    public errors: Subject<any> = new Subject<any>();

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
            }),
            catchError(error => {
                console.debug('Caught Error from server: ', error);
                return throwError(error);
            })
        )
            .subscribe(
                posts => {
                    this.posts.next(posts);
                },
                error => {
                    console.debug('Broadcating Error to UI: ', error);
                    this.errors.next(error);
                });
    }

    deletePosts() {
        return this.http.delete(
            this.postsDbUrl
        );
    }
}