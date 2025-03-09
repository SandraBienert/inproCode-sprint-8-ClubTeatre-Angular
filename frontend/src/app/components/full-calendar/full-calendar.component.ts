import { Component } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/list';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarService } from '../../services/full-calendar.service';
import { ICalendar } from '../../interfaces/i-calendar';
import { AddEventCalendarComponent } from '../add-event-calendar/add-event-calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule  } from '@angular/common';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class AppFullCalendarComponent  {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin, listPlugin],
    themeSystem: 'bootstrap5',
    dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
    eventClick: (clickInfo: EventClickArg) => this.handleEventClick(clickInfo),
    events: (fetchInfo, successCallback, failureCallback) => {
      this.fullCalendarService.getAgenda().subscribe({
        next: (events: ICalendar[]) => {
          const formattedEvents = events.map(event => ({
            id: event.id.toString(),
            title: event.titol,
            start: new Date(event.data).toISOString(),
            backgroundColor: 'rgba(220, 53, 69, 1)',
            borderColor: '#d9534f',
            textColor: 'black',
            display: 'block',
            className: 'event-text-center',
          }));
          successCallback(formattedEvents);
        },
        error: (error) => {
          console.error('❌ Error carregant els esdeveniments:', error);
          failureCallback(error);
        },
      });
    },
  };

  constructor(private fullCalendarService: FullCalendarService, private dialog: MatDialog) {}


  // Funció per gestionar el clic a un dia
  handleDateClick(arg: DateClickArg): void {
    const dialogRef = this.dialog.open(AddEventCalendarComponent, {
      width: '400px',
      data: { date: arg.dateStr }, // Passa la data seleccionada al modal
    });

    dialogRef.afterClosed().subscribe((result: ICalendar) => {
      if (result) {
        this.fullCalendarService.addEvent(result).subscribe({
          next: () => {
            console.log('✅ Event afegit correctament');
            this.calendarOptions.events = []; // Força la recàrrega dels events
          },
          error: (err) => console.error('❌ Error afegint event:', err),
        });
      }
    });
  }

  // Funció per eliminar un event
  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Eliminar "${clickInfo.event.title}"?`)) {
      const eventId = Number(clickInfo.event.id);
      this.fullCalendarService.deleteEvent(eventId).subscribe({
        next: () => {
          console.log('✅ Event eliminat correctament');
          this.calendarOptions.events = []; // Força la recàrrega dels events
        },
        error: (err) => console.error('❌ Error eliminant event:', err),
      });
    }
  }

  // Obrir el diàleg per afegir un esdeveniment nou
openAddEventDialog(date: string): void {
  const dialogRef = this.dialog.open(AddEventCalendarComponent, {
    width: '400px',
    data: { date }, // Passa la data seleccionada
  });

  dialogRef.afterClosed().subscribe((result: ICalendar) => {
    if (result) {
      this.fullCalendarService.addEvent(result).subscribe({
        next: () => {
          console.log('✅ Event afegit correctament');
          this.refreshEvents();
        },
        error: (err) => console.error('❌ Error afegint event:', err),
      });
    }
  });
}
  refreshEvents() {
    throw new Error('Method not implemented.');
  }

// Obrir el diàleg per editar un esdeveniment existent
openEditEventDialog(event: ICalendar): void {
  const dialogRef = this.dialog.open(AddEventCalendarComponent, {
    width: '400px',
    data: event, // Passa l'esdeveniment existent
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result && result.delete) {
      // Eliminar l'esdeveniment
      this.fullCalendarService.deleteEvent(result.id).subscribe({
        next: () => {
          console.log('✅ Event eliminat correctament');
          this.refreshEvents();
        },
        error: (err) => console.error('❌ Error eliminant event:', err),
      });
    } else if (result) {
      // Editar l'esdeveniment
      this.fullCalendarService.addEvent(result).subscribe({
        next: () => {
          console.log('✅ Event actualitzat correctament');
          this.refreshEvents();
        },
        error: (err) => console.error('❌ Error actualitzant event:', err),
      });
    }
  });
}
}
