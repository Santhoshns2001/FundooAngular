import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.css'],
  imports: [MatIconModule,FormsModule]
})
export class NoteEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any
  ) {}

  close() {
    this.dialogRef.close(this.note);
  }
}
