import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  postsSubscription: Subscription;
  errorsSubscription: Subscription;
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: any = null;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.setupPostsSubscriptionAndFetchPosts();

    // this.fetchPostsFromObservable();
  }

  private setupPostsSubscriptionAndFetchPosts() {
    // Examples of different ways to subscribe to an Observable below:  https://rxjs.dev/guide/observer

    // this.postService.posts.subscribe(posts => {
    //   setTimeout(() => {
    //     this.loadedPosts = posts;
    //     this.isFetching = false;
    //   }, 3000);
    // });

    this.postsSubscription = this.postService.posts.subscribe({
      next: (posts: Post[]) => {
        setTimeout(() => {
          this.loadedPosts = posts;
          this.isFetching = false;
        }, 1000);
      },
      error: (error: any) => {
        setTimeout(() => {
          this.error = error;
          this.isFetching = false;
        }, 1000)
      }
    });

    this.errorsSubscription = this.postService.errors.subscribe(error => {
      setTimeout(() => {
        this.error = error;
        this.isFetching = false;
      }, 1000);
    })

    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData).subscribe(response => {
      console.debug('Created post: ', response);
      this.fetchPosts();

      // this.fetchPostsFromObservable();
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();

    // this.fetchPostsFromObservable();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(response => {
      console.debug('Deleted posts: ', response);
      this.fetchPosts();
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.error = null;
    this.postService.fetchPosts();
  }

  private fetchPostsFromObservable() {
    this.isFetching = true;
    this.postService.fetchPostsObservable().subscribe(
      posts => {
        console.debug('Fetched posts via subscription to observable: ', posts);
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;
      })
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
