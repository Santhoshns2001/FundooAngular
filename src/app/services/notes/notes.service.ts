import {  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor( private http: HttpService) { }

createNotes(data: FormData) {
  return this.http.postMethod(
    'https://localhost:7224/api/Notes/notes',
    data,
    true
  );
}



displayNotes() {
  const header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.http.getMethod(
    'https://localhost:7224/api/Notes/getNotes',true);
}

private refreshSource = new Subject<void>();
refreshNotes$ = this.refreshSource.asObservable();

refreshNotes() {
  this.refreshSource.next();
}

}
