import {  Component,  OnInit   } from '@angular/core';
import { ThemeService } from './servers/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    selectedDate: any;
    dateValue:Date | any;
    dateArray:any;
    dateNow: Date= new Date();
    currencyBool:boolean = true;
    dateBool:boolean = false;

    currency:any;
    currentCurrencyArray:any;
    value:string = '';
    valueCode:string = '';
    valueMid:any;
   

    loading: boolean = true;




    constructor(private themeService: ThemeService)  {}
    ngOnInit(): void {

        this.currentCurrencyArray =  this.themeService.getCurrency().subscribe(data =>{
            this.currency = Object(data)[0].rates;
            
            this.loading = false;
            
            if(!this.currency){
                this.currency.error('error')
            }
            
            }, err => console.log(err) )

        let mm:any = this.dateNow?.getMonth() + 1;
            if(mm < 10) mm = '0' + mm;

        let dd:any = this.dateNow?.getDate() ;
            if(dd < 10) dd = '0' + dd;
            
        }

    getDate(){
        let mm = this.selectedDate?.getMonth() + 1;
        if(mm < 10) mm = '0' + mm;

        let dd = this.selectedDate?.getDate() ;
        if(dd < 10) dd = '0' + dd;
        
        this.dateValue = `${this.selectedDate?.getFullYear() }-${mm}-${dd}`;

        this.dateArray = this.themeService.getDate(this.dateValue).subscribe(date =>{
        this.dateArray = Object(date)[0].rates;

        if(!this.dateArray){
            this.dateArray.error('error')
        }

        this.dateBool = true;
        this.currencyBool = false;

        }, err => console.log(err));
    }
    changeTheme(thema:string) {
        this.themeService.switchTheme(thema);
    }

    filter(){
        this.currentCurrencyArray =  this.themeService.getCurrency().subscribe(data =>{
            this.currency = Object(data)[0].rates.filter(((item:any) => item.currency.includes(this.value)))

            if(!this.currency){
                this.currency.error('error')
            }
        
        }, err => console.log(err));

        this.dateArray =  this.themeService.getCurrency().subscribe(data =>{
            this.dateArray = Object(data)[0].rates.filter(((item:any) => item.currency.includes(this.value)))

            if(!this.dateArray){
                this.dateArray.error('error')
            }
           
            } , err => console.log(err));
    }

    filterCode(){
        this.currentCurrencyArray =  this.themeService.getCurrency().subscribe(data =>{
            this.currency = Object(data)[0].rates.filter(((item:any) => item.code.includes(this.valueCode.toUpperCase())))
            } , err => console.log(err))
        this.dateArray =  this.themeService.getCurrency().subscribe(data =>{
            this.dateArray = Object(data)[0].rates.filter(((item:any) => item.code.includes(this.valueCode.toUpperCase())))
            }, err => console.log(err) )
    }

    clear(table: any) {
        table.clear();
    }

}
