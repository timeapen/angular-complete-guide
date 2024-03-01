import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {

    // Examples of different ways to subscribe to an Observable below:  https://rxjs.dev/guide/observer

    // this.postService.posts.subscribe(posts => {
    //   setTimeout(() => {
    //     this.loadedPosts = posts;
    //     this.isFetching = false;
    //   }, 3000);
    // });

    this.postService.posts.subscribe({
      next: (posts: Post[]) => {
        setTimeout(() => {
          this.loadedPosts = posts;
          this.isFetching = false;
        }, 3000);
      }
    });

    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData);
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
    this.postService.fetchPosts();
  }
}
