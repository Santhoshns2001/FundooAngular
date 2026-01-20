import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotesService } from '../../../services/notes/notes.service';
import { Note } from '../notes/Modals/CreateNotesMdl';
import { NoteEditDialogComponent } from '../../note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = [];
hoveredNoteId: number | undefined;

  constructor(
    private notesService: NotesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getNotes();

    // 🔁 refresh list after create/update
    this.notesService.refreshNotes$.subscribe(() => {
      this.getNotes();
    });
  }

  /* ---------- API ---------- */

  getNotes() {
    this.notesService.displayNotes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.notes = res.data;
      }
    });
  }

  /* ---------- UI ---------- */

 openNote(note: any) {
  this.dialog.open(NoteEditDialogComponent, {
    data: { ...note },
    panelClass: 'keep-dialog-panel',
    autoFocus: false,
    maxWidth: '600px'
  });
}


setHover(noteId: number | undefined) {
  this.hoveredNoteId = noteId;
}
}
