import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document, private http:HttpClient) {  }
    
    
 

    switchTheme(theme:string) {
        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        if(themeLink){
            themeLink.href = theme

        }
         
    }
    
    
  
        getCurrency(){
           return this.http.get('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')

        }

        getDate(date:any){
            return this.http.get(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`)
        }

}