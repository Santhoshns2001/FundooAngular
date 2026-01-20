import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  success(message: string, title = 'Success') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#2e7d32'
    });
  }

  error(message: string, title = 'Error') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#c62828'
    });
  }

  info(message: string, title = 'Info') {
    Swal.fire({
      icon: 'info',
      title,
      text: message
    });
  }
}
