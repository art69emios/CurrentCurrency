import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 
import { catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    errorMessage: String = "No currency found.";


  constructor(@Inject(DOCUMENT) private document: Document, private http:HttpClient) {  }
    
    
 

    switchTheme(theme:string) {
        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        if(themeLink){
            themeLink.href = theme

        }
         
    }
    
    
  
        getCurrency(){
           return this.http.get('https://api.nbp.pl/api/exchangerates/tables/A/?format=json').pipe(
            catchError(err => {  
                console.log(err); 
                this.errorMessage = err.message;
                return err;
            })
           )

        }

        getDate(date:any){
            return this.http.get(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`).pipe(
                catchError(err => {  
                    console.log(err); 
                    this.errorMessage = err.message;
                    return err;
                })
               )
        }

}