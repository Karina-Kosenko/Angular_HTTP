import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  storePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
      .post<{ name: string }>(
        'https://angular-http-c4e3a.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-c4e3a.firebaseio.com/posts.json',
      )
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }));
  }

  clearPosts() {
    return this.http
      .delete(
        'https://angular-http-c4e3a.firebaseio.com/posts.json',
      );
  }
}
