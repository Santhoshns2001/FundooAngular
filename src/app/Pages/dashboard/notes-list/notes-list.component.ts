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


  notes: Note[] = [];
  hoveredNoteId: number | undefined;

  constructor(
    private notesService: NotesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getNotes();

    this.notesService.refreshNotes$.subscribe(() => {
      this.getNotes();
    });
  }


  getNotes() {
    this.notesService.displayNotes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.notes = res.data;
      }
    });
  }


  openNote(note: any) {
    debugger
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      data: { ...note },          
      panelClass: 'keep-dialog-panel',
      autoFocus: false,
      width: '600px',       
      maxHeight: '90vh'     
    });

    dialogRef.afterClosed().subscribe((updatedNote) => {
      if (!updatedNote) return; 

      this.notesService.updateNotes(updatedNote, updatedNote.id).subscribe({
        next: () => {
          this.getNotes();
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    });
  }


  setHover(noteId: number | undefined) {
    this.hoveredNoteId = noteId;
  }
}
