import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) {}

  getItems(limitToLast: number): Observable<any[]> {
    return this.db.list<any>('ritmo_cardiaco', ref => ref.orderByChild('timestamp').limitToLast(limitToLast)).valueChanges();
  }

}
