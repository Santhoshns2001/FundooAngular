export class Note {
  noteId?: number;
  title?: string;
  description?: string;
  colour?: string;
  image?: File | null;
  reminder?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  labels: string[] = [];
}


export interface Label {
  id: number;
  name: string;
}