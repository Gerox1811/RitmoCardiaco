import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  ritmoCardiacoRef: AngularFireObject<number>;
  constructor(private db: AngularFireDatabase) {
    this.ritmoCardiacoRef = this.db.object('ritmo_cardiaco');
  }

  
  getDatosFueraDeRango(): Observable<any[]> {
    const datosFueraDeRangoRef = this.db.list('datosFueraDeRango');
    return datosFueraDeRangoRef.valueChanges();
  }
  

  
}
