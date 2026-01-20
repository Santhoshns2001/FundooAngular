import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  private createOptions(token: boolean, isFormData: boolean) {
    const headersObj: any = {};

    if (token) {
      const authToken = localStorage.getItem('token');
      headersObj['Authorization'] = `Bearer ${authToken}`;
    }

    // ✅ Only set JSON header when NOT FormData
    if (!isFormData) {
      headersObj['Content-Type'] = 'application/json';
    }

    return {
      headers: new HttpHeaders(headersObj)
    };
  }

  postMethod(url: string, reqData: any, token: boolean = false) {
    const isFormData = reqData instanceof FormData;
    return this.http.post(url, reqData, this.createOptions(token, isFormData));
  }

  getMethod(url: string, token: boolean = false) {
    return this.http.get(url, this.createOptions(token, false));
  }

  putMethod(url: string, reqData: any, token: boolean = true) {
    const isFormData = reqData instanceof FormData;
    return this.http.put(url, reqData, this.createOptions(token, isFormData));
  }

  deleteMethod(url: string, token: boolean = true) {
    return this.http.delete(url, this.createOptions(token, false));
  }
}
