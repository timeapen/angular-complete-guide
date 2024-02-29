import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{ name: string }>(
      'https://ng-complete-guide-3a355-default-rtdb.firebaseio.com/posts.json', 
      postData
      ).subscribe(response => {
        console.debug('Response: ', response);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
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
        setTimeout(() => {
          console.debug('Posts: ', posts);
          this.loadedPosts = posts;
          this.isFetching = false;
        }, 5000);
      });
    }
}
