import { Component, EventEmitter, Output } from '@angular/core';
import { ICalendar } from '../../interfaces/i-calendar';
import { FullCalendarService } from '../../services/full-calendar.service';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event-calendar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event-calendar.component.html',
  styleUrl: './add-event-calendar.component.css'
})
export class AddEventCalendarComponent {
  newEventTitle: string = ''; // Títol del nou event
  newEventDate: string = ''; // Data del nou event

  @Output() eventAdded = new EventEmitter<ICalendar>(); // Emet un event quan s'afegeix un nou event

  // Funció per afegir un event
  addEvent(): void {
    if (this.newEventTitle && this.newEventDate) {
      const newEvent: ICalendar = {
        id: 0, // L'ID es generarà automàticament al backend
        titol: this.newEventTitle,
        lloc: '', // Pots afegir més camps si és necessari
        data: this.newEventDate,
      };

      this.eventAdded.emit(newEvent); // Emet el nou event
      this.newEventTitle = ''; // Neteja el camp del títol
      this.newEventDate = ''; // Neteja el camp de la data
    } else {
      alert('Si us plau, omple tots els camps.');
    }
  }
}

