import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType{
  all='',
  movie='movie',
  series='series',
  game = 'game'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = 'aec04381';

  constructor(private http: HttpClient) { }

  searchData(title: string, type: SearchType): Observable<any>{
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apiKey=${this.apiKey}`)
    .pipe(  // Le aplicamos filtros
      map(results => {  // map the result to the search
        console.log('RAW: ', results);
        return results['Search']
      })  
    );
  }

  getDetails(id){
    return this.http.get(`${this.url}?i=${id}&plot=full&apiKey=${this.apiKey}`);
  }
}
