import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {

    public posts: Subject<Post[]> = new Subject<Post[]>();

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
        this.http.get<{ [key: string]: Post }>(
            'https://ng-complete-guide-3a355-default-rtdb.firebaseio.com/posts.json'
            ).pipe(
              map(response => {
                const posts: Post[] = [];
      
                for (const key in response) {
                  if(response.hasOwnProperty(key)) {
                    posts.push({...response[key], id: key});
                  }
                }
      
                return posts;
              })
            )
            .subscribe(posts => {
                this.posts.next(posts);
            });
    }
}