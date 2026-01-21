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

  colorMap: Record<string, string> = {
    White: '#ffffff',
    Red: '#f28b82',
    Orange: '#fbbc04',
    Yellow: '#fff475',
    Green: '#ccff90',
    Teal: '#a7ffeb',
    Blue: '#cbf0f8',
    DarkBlue: '#aecbfa',
    Purple: '#d7aefb',
    Pink: '#fdcfe8',
    Brown: '#e6c9a8',
    Gray: '#e8eaed'
  };

  constructor(
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any
  ) {}

  getBgColor(): string {
    return this.colorMap[this.note.colour || 'White'] || '#fff';
  }

  close() {
    this.dialogRef.close(this.note);
  }
}
