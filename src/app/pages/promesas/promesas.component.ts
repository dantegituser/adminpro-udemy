import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

  //funcion para escuchar el resolve de la promesa
  this.contarTres().then(
    mensaje=>console.log('terminó',mensaje)
  )
  .catch(error=> console.error('error en la promesa ',error));

   }

  ngOnInit() {
  }

  contarTres():Promise<boolean>{
     //tarea q notifique un intervalo de tiempo
    return new Promise((resolve,reject)=>{
      let contador=0;
      let intervalo=setInterval(()=>{
        console.log(contador);
        contador+=1;
        if(contador==3){
          //resolve('OK!');
          resolve(true);
          //reject('solo un errorcillo  ');
          clearInterval(intervalo);
        }
      },1000);
    });
  }


}
