import { Injectable } from '@angular/core';
import { Slide } from '../models/slide';
import { URL_SERVICES } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  public saved: Boolean = true;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  createSlide( slide: Slide ) {
    let url = URL_SERVICES + '/slide/create';
    
    return this.http.put( url, slide )
            .pipe(map( (res: any) => {
              return res;
            }));
  }

  getSlide( id: String ) {
    let url = URL_SERVICES + '/slide/' + id;
    
    return this.http.get( url )
            .pipe(map( (res: any) => {
              return res.slide;
            }));
  }

  updateSlide( slide: Slide ) {
    let url = URL_SERVICES + '/slide/update';
    
    return this.http.post( url, slide )
            .pipe(map( (res: any) => {
              return res;
            }));
  }
}
