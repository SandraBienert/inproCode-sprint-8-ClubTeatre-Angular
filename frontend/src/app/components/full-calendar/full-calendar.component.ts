import { Component } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/list';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarService } from '../../services/full-calendar.service';
import { ICalendar } from '../../interfaces/i-calendar';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [FullCalendarModule],
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
            start: new Date(event.data).toISOString(), // Transforma a ISO 8601
            backgroundColor: '#d9534f',
            borderColor: '#d9534f',
            textColor: 'black',
            display: 'block',
            className: 'event-text-center',
          }));
          console.log('🔍 Esdeveniments carregats:', formattedEvents);
          successCallback(formattedEvents);
        },
        error: (error) => {
          console.error('❌ Error carregant els esdeveniments:', error);
          failureCallback(error);
        },
      });
    },
  };

  constructor(private fullCalendarService: FullCalendarService) {}

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Eliminar "${clickInfo.event.title}"?`)) {
      const eventId = Number(clickInfo.event.id);
      this.fullCalendarService.deleteEvent(eventId).subscribe({
        next: () => {
          this.calendarOptions.events = []; // Força la recàrrega dels events
        },
        error: (err) => console.error('Error eliminant event:', err),
      });
    }
  }

  handleDateClick(arg: DateClickArg): void {
    const title = prompt('Introdueix el títol de l\'event:');
    if (title) {
      const newEvent: ICalendar = {
        id: 0, // Es generarà automàticament a la BBDD
        titol: title,
        lloc: '',
        data: arg.dateStr,
      };

      this.fullCalendarService.addEvent(newEvent).subscribe({
        next: () => {
          this.calendarOptions.events = []; // Força la recàrrega dels events
        },
        error: (err) => console.error('Error afegint event:', err),
      });
    }
  }
}
