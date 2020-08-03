import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  upload( file: File, token: string ) {

    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Fallo en la subida');
            reject( new Error( JSON.parse(xhr.response).err ) );
          }
        }
      };
      
      let url = URL_SERVICES + '/content/upload';
      xhr.open( 'PUT', url, true );
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send( formData );
    } );

  }
}
