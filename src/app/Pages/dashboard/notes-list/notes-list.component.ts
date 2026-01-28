import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotesService } from '../../../services/notes/notes.service';
import { Label, Note } from '../notes/Modals/CreateNotesMdl';
import { NoteEditDialogComponent } from '../../note-edit-dialog/note-edit-dialog.component';
import { LabelService } from '../../../services/label/label.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, FormsModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  activeNoteId: number | null = null;
  showLabelPopup = false;

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
  hoveredNoteId: number | null | undefined = null;
  // activeNoteId: number | null |undefined = null;



  note: Note = this.getEmptyNote();


  // showLabelPopup = false;
  labelName = '';
  allLabels: Label[] = [];
  filteredLabels: Label[] = [];
  labelSearch = '';
  isExpanded = false;
  showColors = false;
  showMore = false;

  currentLabelNote: Note | null = null;



  constructor(
    private notesService: NotesService,
    private dialog: MatDialog,
    private labelService: LabelService
  ) { }

 ngOnInit(): void {
  this.getNotes();
  this.getAllLabels();

  this.notesService.refreshNotes$.subscribe(() => {
    this.getNotes();
  });
}

getAllLabels() {
  this.labelService.getLabels().subscribe({
    next: (res: any) => {
      this.allLabels = res.data.map((l: any) => ({
        id: l.labelId,
        name: l.labelName
      }));
      this.filteredLabels = [...this.allLabels];
    }
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

  attachLabelToNote(label: Label) {

    if (!this.note.labels) {
      this.note.labels = [];
    }

    // Avoid duplicates
    if (this.note.labels.includes(label.name)) return;

    this.note.labels.push(label.name);

    // If note already exists → persist relation
    if (this.note.noteId) {
      this.labelService.addLabelToNote(this.note.noteId, label.id).subscribe();
    }
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

  toggleMore() {
    this.showMore = !this.showMore;
    this.showColors = false;
  }

openLabelPopup(note: Note, event: MouseEvent) {
  event.stopPropagation();
  this.activeNoteId = note.noteId!;
  this.currentLabelNote = note;
  this.showLabelPopup = true;
  this.filteredLabels = [...this.allLabels];
  this.labelName = '';
}

  
onLabelSearch() {
  const search = this.labelName.toLowerCase().trim();

  this.filteredLabels = this.allLabels.filter(label =>
    label.name.toLowerCase().includes(search)
  );
}




 toggleLabel(note: any, label: Label) {

  if (!note.labels) {
    note.labels = [];
  }

  const index = note.labels.indexOf(label.name);

  if (index === -1) {
    note.labels.push(label.name);

    if (note.noteId) {
      this.labelService
        .addLabelToNote(note.noteId, label.id)
        .subscribe();
    }
  } else {
    note.labels.splice(index, 1);

    if (note.noteId) {
      this.labelService
        .removeLabelFromNote(note.noteId, label.id)
        .subscribe();
    }
  }
}


  toggleMenu(note: any, event: MouseEvent) {
    event.stopPropagation();
    this.showLabelPopup = false;

    this.activeNoteId =
      this.activeNoteId === note.noteId ? null : note.noteId;
  }

addLabel() {
  debugger
  if (!this.currentLabelNote) return;

  const name = this.labelName.trim();
  if (!name) return;

  const existing = this.allLabels.find(
    l => l.name.toLowerCase() === name.toLowerCase()
  );

  if (existing) {
    this.toggleLabel(this.currentLabelNote, existing);
    return;
  }

  this.labelService.createLabel(name).subscribe(res => {
    const newLabel = {
      id: res.data.labelId,
      name: res.data.labelName
    };

    this.allLabels.push(newLabel);

    // 🔥 MUST persist immediately
    this.labelService
      .addLabelToNote(this.currentLabelNote!.noteId!, newLabel.id)
      .subscribe();

    this.currentLabelNote!.labels.push(newLabel.name);
  });
}



labelExists(name: string): boolean {
  return this.allLabels.some(
    l => l.name.toLowerCase() === name.toLowerCase()
  );
}


}
