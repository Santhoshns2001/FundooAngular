import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../../services/notes/notes.service';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { Label, Note } from './Modals/CreateNotesMdl';
import { LabelService } from '../../../services/label/label.service';
import { CollaboratorService } from '../../../services/collab/collaborator.service';

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

  ngOnInit() {
    this.getAllLabels();
  }

  getAllLabels() {
    this.labelService.getLabels().subscribe({
      next: (res: any) => {
        console.log(res);

        this.allLabels = res.data.map((label: any) => ({
          id: label.labelId,
          name: label.labelName
        }));

        this.filteredLabels = [...this.allLabels];
      }
    });
  }




  allLabels: Label[] = [];
  filteredLabels: Label[] = [];
  labelSearch = '';

  isExpanded = false;
  showColors = false;
  showMore = false;

  undoStack: Note[] = [];
  redoStack: Note[] = [];


  showLabelPopup = false;
  labelName = '';

  showCollaboratorPopup = false;
  collaboratorEmail = '';
  userEmail = localStorage.getItem('email'); // or from token

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

  note: Note = this.getEmptyNote();

  constructor(private notesService: NotesService, private labelService: LabelService
    , private collaboratorService: CollaboratorService
  ) { }




openCollaboratorPopup(event: MouseEvent) {
  event.stopPropagation();
  this.showCollaboratorPopup = true;
}

closeCollaboratorPopup() {
  this.showCollaboratorPopup = false;
  this.collaboratorEmail = '';
}

saveCollaborator() {
  if (!this.collaboratorEmail?.trim()) return;
  if (!this.note?.noteId) return;

  this.collaboratorService
    .addCollaborator(this.collaboratorEmail, this.note.noteId)
    .subscribe({
      next: (res: any) => {
        // OPTIONAL: update UI instantly
        // this.note.collaborators = this.note.collaborators || [];
        // this.note.collaborators.push(res.data);

        this.closeCollaboratorPopup();
      },
      error: err => {
        console.error(err);
      }
    });
}


  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  expandNote() {
    this.isExpanded = true;
  }

  closeNote() {
    this.showColors = false;
    this.showMore = false;
    this.showLabelPopup = false;

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
    this.note.colour = colorName;
    this.showColors = false;
  }
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

  openLabelPopup(event: MouseEvent) {
    event.stopPropagation();
    this.showMore = false;
    this.showLabelPopup = true;
    this.filteredLabels = this.allLabels;
  }




  onLabelSearch() {
    const value = this.labelSearch.toLowerCase();
    this.filteredLabels = this.allLabels.filter(label =>
      label.name.toLowerCase().includes(value)
    );
  }


  toggleLabel(labelName: string) {
    if (!this.note.labels) {
      this.note.labels = [];
    }

    const index = this.note.labels.indexOf(labelName);

    if (index > -1) {
      this.note.labels.splice(index, 1);
    } else {
      this.note.labels.push(labelName);
    }
  }


  addLabel() {
    const name = this.labelSearch.trim();
    if (!name) return;

    const existing = this.allLabels.find(
      l => l.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      this.toggleLabel(existing.name);
      return;
    }

    this.labelService.createLabel(name).subscribe(res => {
      const newLabel = {
        id: res.data.labelId,
        name: res.data.labelName
      };

      this.allLabels.push(newLabel);
      this.note.labels.push(newLabel.name); // UI only
    });
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


  labelExists(name: string): boolean {
    return this.allLabels.some(
      l => l.name.toLowerCase() === name.toLowerCase()
    );
  }





}
