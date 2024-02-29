import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private count: Subscription;
  private alpha: Subscription;
  private beta: Subscription;

  constructor() { }

  ngOnInit() {

    try {
      this.throwError1();
    } catch(error) {
      console.log(error.stack);
    }

    this.count = interval(1000).subscribe(count => {
      console.log(count);
    });

  
    const alpha = Observable.create((observer) => {
      let count = 'a';
      setInterval(() => {
        observer.next(count);
        count = count + 1;
      }, 1000);
    })

    this.alpha = alpha.subscribe(data => console.log(data));

    const beta = new Observable(observer => {
      let count = 'b';
      setInterval(() => {
        observer.next(count);
        count = count + 1;
        this.throwError(observer);
      }, 1000)
    });

    this.beta = beta.subscribe(
      data => console.log(data),
      error => {
        console.log('Error name: ', error.name);
        console.log('Error message: ', error.message);
        console.log('Stack:')
        console.log(error.stack);        
      }
    );

  }

  private throwError(observer: Subscriber<any>): void {
    observer.error(new Error('boom'));
  }

  private throwError1() {
    throw new Error('bam!');
  }

  ngOnDestroy(): void {
    this.count.unsubscribe();
    this.alpha.unsubscribe();
    this.beta.unsubscribe();
  }

}
