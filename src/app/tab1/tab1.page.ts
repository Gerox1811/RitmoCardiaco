import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService  } from '../services/database.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {
  items$: Observable<any[]> | null = null;

  constructor(private firebaseService: DatabaseService) {}
   // this.items$ = this.db.list('ritmo_cardiaco').valueChanges();

   ngOnInit() {
    this.getItems();
   }

   getItems() {
    const limitToLast = 10; // Obtener los últimos 10 valores
    this.items$ = this.firebaseService.getItems(limitToLast);
  }

  formatTime(timestamp: any): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  }

  //leerMediciones(){
  //  const path = 'ritmo_cardiaco/';
  //  this.database.list(path).valueChanges().subscribe( res =>{
  //    console.log('Ritmo Crdiaco->', res);
  //  })
  //

}
