import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  subscription:Subscription;
  constructor() {

    this.subscription=this.regresaObservable().pipe(
      retry(2)
    ).subscribe(
     numero => console.log('Subs ', numero),
     error => console.error('Error en el obs', error),
     () => console.log('El observador terminó')
    );
  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any>{
    let contador = 0;
    const obs = new Observable ( (observer: Subscriber<any>) => {
      const intervalo = setInterval(()=>{
        contador++;
        const salida={
          valor:contador
        }
        observer.next(salida);
        
        //if(contador === 3){
        //  clearInterval(intervalo);
        //  observer.complete();
        //}
        //if(contador === 2){
        //clearInterval(intervalo);
       // throw new Error();
        //observer.error('auxiliooo');
        //}


      },1000);
    }).pipe(
      map(resp=>resp.valor),
      filter((valor,index)=>{
        //iompares
        if((valor % 2)==1){
          //impar
          return true;
        }else{
          return false;
        }
      })
    )
    return obs;
  }

  ngOnDestroy(){
    console.log("se va a cerrar la pagina");
    this.subscription.unsubscribe();
  }

}
