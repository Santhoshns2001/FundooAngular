export class Note {
  noteId?: number;
  title?: string;
  description?: string;
  color?: string;
  image?: File | null;
  reminder?: string;
  isPinned?: boolean;
  isArchived?: boolean;
}