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

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [ FullCalendarModule, AddEventCalendarComponent],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class AppFullCalendarComponent  {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin, listPlugin],
    themeSystem: 'bootstrap5',
    eventClick: (clickInfo: EventClickArg) => this.handleEventClick(clickInfo),
    events: (fetchInfo, successCallback, failureCallback) => {
      this.fullCalendarService.getAgenda().subscribe({
        next: (events: ICalendar[]) => {
          const formattedEvents = events.map(event => ({
            id: event.id.toString(),
            title: event.titol,
            start: new Date(event.data).toISOString(),
            backgroundColor: 'purple',
            borderColor: 'rgb(100, 20, 50)',
            textColor: 'white',
            display: 'block',
            className: 'event-text-center', // Assigna una classe personalitzada
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

  // Funció per gestionar l'event emès per AddEventCalendarComponent
  onEventAdded(newEvent: ICalendar): void {
    this.fullCalendarService.addEvent(newEvent).subscribe({
      next: () => {
        console.log('✅ Event afegit correctament');
        this.calendarOptions.events = []; // Força la recàrrega dels events
      },
      error: (err) => console.error('❌ Error afegint event:', err),
    });
  }

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
}
