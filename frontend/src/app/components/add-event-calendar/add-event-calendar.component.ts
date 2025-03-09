import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ICalendar } from '../../interfaces/i-calendar';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-event-calendar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-event-calendar.component.html',
  styleUrl: './add-event-calendar.component.css'
})
export class AddEventCalendarComponent {

  newEventTitle: string = ''; // Títol del nou event
  newEventLocation: string = ''; // Lloc del nou event
  newEventDate: string = ''; // Data del nou event
  isEditMode: boolean = false; // Per distingir entre afegir i editar
  eventId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddEventCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data && data.id) {
      this.isEditMode = true;
      this.eventId = data.id;
      this.newEventTitle = data.titol;
      this.newEventDate = data.data;
      this.newEventLocation = data.lloc;}}

  // Funció per afegir un event
  addEvent(): void {
    if (this.newEventTitle && this.newEventDate) {
      const newEvent: ICalendar = {
        id: 0, // L'ID es generarà automàticament al backend
        titol: this.newEventTitle,
        lloc: this.newEventLocation,
        data: this.newEventDate,
      };
      this.dialogRef.close(newEvent); // Tanca el modal i retorna l'event
    } else {
      alert('Si us plau, omple tots els camps.');
    }
  }
  // Funció per editar l'esdeveniment
  saveEvent(): void {
    const newEvent = {
      id: this.eventId || undefined,
      titol: this.newEventTitle,
      data: this.newEventDate,
      lloc: this.newEventLocation,
    };
    this.dialogRef.close(newEvent);
  }
  // Funció per eliminar l'esdeveniment
  deleteEvent(): void {
    if (this.eventId) {
      this.dialogRef.close({ delete: true, id: this.eventId });
    }
  }
  // Funció per cancel·lar
  onCancel(): void {
    this.dialogRef.close(); // Tanca el modal sense fer res
  }
}

