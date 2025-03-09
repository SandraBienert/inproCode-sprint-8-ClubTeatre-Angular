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
  newEventDate: string = ''; // Data del nou event

  constructor(
    public dialogRef: MatDialogRef<AddEventCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string } // Rep la data seleccionada
  ) {
    this.newEventDate = data.date; // Assigna la data seleccionada al camp del formulari
  }

  // Funció per afegir un event
  addEvent(): void {
    if (this.newEventTitle && this.newEventDate) {
      const newEvent: ICalendar = {
        id: 0, // L'ID es generarà automàticament al backend
        titol: this.newEventTitle,
        lloc: '', // Pots afegir més camps si és necessari
        data: this.newEventDate,
      };
      this.dialogRef.close(newEvent); // Tanca el modal i retorna l'event
    } else {
      alert('Si us plau, omple tots els camps.');
    }
  }

  // Funció per cancel·lar
  onCancel(): void {
    this.dialogRef.close(); // Tanca el modal sense fer res
  }
}

