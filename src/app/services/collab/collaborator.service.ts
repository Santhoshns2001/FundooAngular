import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor( private http: HttpService) { }

addCollaborator(email: string,noteId: number) {
    const data = { email, noteId };
    return this.http.postMethod(
      'https://localhost:7224/api/Collaborator/AddCollaborator',
      data,true
    );
  }
}
