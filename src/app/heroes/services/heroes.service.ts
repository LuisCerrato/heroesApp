import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesServices {


  private baseUrl : string = environments.baseUrl;




  constructor(private http: HttpClient) { }


  getHeroes() : Observable<Hero[]>{


    return  this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);

  }


  getHeroesById( id:  string ) :Observable< Hero | undefined> {

    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined))
    );

  }


}
