import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../../services/notes/notes.service';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { Note } from './Modals/CreateNotesMdl';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    NotesListComponent
  ]
})
export class NotesComponent {

  /* ---------- UI STATE ---------- */
  isExpanded = false;
  showColors = false;
  showMore = false;

  /* ---------- UNDO / REDO ---------- */
  undoStack: Note[] = [];
  redoStack: Note[] = [];

  /* ---------- COLORS ---------- */
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

colors = Object.keys(this.colorMap);




  /* ---------- NOTE MODEL ---------- */
  note: Note = this.getEmptyNote();

  constructor(private notesService: NotesService) {}

  /* ---------- GETTERS ---------- */
  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /* ---------- UI ACTIONS ---------- */
  expandNote() {
    this.isExpanded = true;
  }

  closeNote() {
    this.showColors = false;
    this.showMore = false;

    if (!this.note.title?.trim() && !this.note.description?.trim()) {
      this.resetNote();
      return;
    }

    this.createNote();
  }

  togglePin() {
    this.note.isPinned = !this.note.isPinned;
  }

  toggleArchive() {
    this.note.isArchived = !this.note.isArchived;
  }

  toggleColorPicker() {
    this.showColors = !this.showColors;
    this.showMore = false;
  }

  toggleMore() {
    this.showMore = !this.showMore;
    this.showColors = false;
  }

 setColor(colorName: string) {
  this.note.colour = colorName;   // store NAME
  this.showColors = false;
}
  /* ---------- UNDO / REDO ---------- */
  onChange() {
    this.saveState();
  }

  private saveState() {
    this.undoStack.push({ ...this.note });
    this.redoStack = [];
  }

  undo() {
    if (!this.canUndo) return;

    this.redoStack.push({ ...this.note });
    this.note = this.undoStack.pop()!;
  }

  redo() {
    if (!this.canRedo) return;

    this.undoStack.push({ ...this.note });
    this.note = this.redoStack.pop()!;
  }

  /* ---------- BACKEND ---------- */
  private createNote() {
    const formData = new FormData();

    formData.append('Title', this.note.title ?? '');
    formData.append('Description', this.note.description ?? '');
    formData.append('Colour', this.note.colour ?? 'White');
    formData.append('Reminder', this.note.reminder ?? '');
    formData.append('IsPinned', String(this.note.isPinned));
    formData.append('IsArchived', String(this.note.isArchived));
    formData.append('Labels', JSON.stringify(this.note.labels ?? []));

    if (this.note.image) {
      formData.append('Image', this.note.image);
    }

    this.notesService.createNotes(formData).subscribe(() => {
      this.notesService.refreshNotes();
      this.resetNote();
    });
  }

  /* ---------- RESET ---------- */
  private resetNote() {
    this.note = this.getEmptyNote();
    this.isExpanded = false;
    this.showColors = false;
    this.showMore = false;
    this.undoStack = [];
    this.redoStack = [];
  }

  private getEmptyNote(): Note {
    return {
      title: '',
      description: '',
      colour: '#ffffff',
      image: null,
      reminder: '',
      isPinned: false,
      isArchived: false,
      labels: []
    };
  }
}
