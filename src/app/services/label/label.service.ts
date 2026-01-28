import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpService) { }

  createLabel(labelName: string) {
    return this.http.postMethod<{
      isSuccuss: boolean;
      data: {
        labelId: number;
        labelName: string;
      };
      message: string;
    }>(
      'https://localhost:7224/api/Label/addLabel',
      { labelName },
      true
    );
  }





  getLabels() {
    return this.http.getMethod(
      'https://localhost:7224/api/Label/GetAllLabels',
      true
    );
  }

  addLabelToNote(labelId: number, noteId: number) {
    return this.http.postMethod(
      `https://localhost:7224/api/Label/AddLabelToNote?labelId=${labelId}&noteId=${noteId}`,
      {},
      true
    );
  }

  removeLabelFromNote(labelId: number, noteId: number) {
    return this.http.deleteMethod(
      `https://localhost:7224/api/Label/RemoveLabel?labelId=${labelId}&noteId=${noteId}`,
      true
    );
  }


}
