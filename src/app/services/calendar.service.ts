import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events: any[] = [];

  addEvent(event: any) {
    this.events.push(event);
  }

  getEvents() {
    return this.events;
  }
}