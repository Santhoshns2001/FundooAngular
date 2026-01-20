import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { }

 login(data: any) {
  const header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.httpService.postMethod(
    'https://localhost:7224/api/User/login',data,false);
}


register(data:any){
   const header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.httpService.postMethod('https://localhost:7224/api/User/register',data,false)
}



  
}
