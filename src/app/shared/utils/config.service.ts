import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    private _apiURI : string;
 
    constructor() {
        this._apiURI = 'http://localhost:8080/trophy/rest';
     }
 
     getApiURI() {
         return this._apiURI;
     }
 
     getApiHost() {
         return this._apiURI.replace('trophy/rest','');
     }
}