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

  isExpanded = false;
  isSaving = false;

  note: Note = this.getEmptyNote();

  constructor(private notesService: NotesService) {}

  /* ---------- UI ---------- */

  expandNote() {
    this.isExpanded = true;
  }

  closeNote() {
    if (this.isSaving) return;

    const hasData =
      this.note.title?.trim() ||
      this.note.description?.trim();

    if (!hasData) {
      this.resetNote();
      return;
    }

    this.isSaving = true;
    this.createNote();
  }

  /* ---------- ACTIONS ---------- */

  togglePin() {
    this.note.isPinned = !this.note.isPinned;
  }

  toggleArchive() {
    this.note.isArchived = !this.note.isArchived;
  }

  setColor(color: string) {
    this.note.color = color;
  }

  setReminder(event: any) {
    this.note.reminder = event.target.value;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.note.image = file;
    }
  }

  /* ---------- BACKEND ---------- */

  private createNote() {
    const formData = new FormData();

    formData.append('Title', this.note.title || '');
    formData.append('Description', this.note.description || '');
    formData.append('Color', this.note.color || '#ffffff');
    formData.append('Reminder', this.note.reminder || '');
    formData.append('IsPinned', String(this.note.isPinned));
    formData.append('IsArchived', String(this.note.isArchived));

    if (this.note.image) {
      formData.append('Image', this.note.image);
    }

    this.notesService.createNotes(formData).subscribe({
      next: () => {
        this.notesService.refreshNotes(); // 🔁 refresh list
        this.resetNote();
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  /* ---------- RESET ---------- */

  private resetNote() {
    this.note = this.getEmptyNote();
    this.isExpanded = false;
    this.isSaving = false;
  }

  private getEmptyNote(): Note {
    return {
      title: '',
      description: '',
      color: '#ffffff',
      image: null,
      reminder: '',
      isPinned: false,
      isArchived: false
    };
  }
}
