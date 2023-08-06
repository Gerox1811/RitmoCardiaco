import { Component } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public database: AngularFireDatabaseModule) {
    this.leerMediciones();
  }

  leerMediciones(){
    const path = 'ritmo_cardiaco/';
    this.database.list(path).valueChanges().subscribe( res =>{
      console.log('Ritmo Crdiaco->', res);
    })
  }

}
