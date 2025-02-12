
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarService } from '../../services/full-calendar.service';
import { ICalendar } from '../../interfaces/i-calendar';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.css'
})
export class AppFullCalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi: any;


  constructor(private fullCalendarService: FullCalendarService ){}

   // Opciones de configuración del calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Vista inicial: mes
    plugins: [dayGridPlugin, interactionPlugin, listPlugin], // Usa el plugin de vista de cuadrícula per dies
    weekends: true,
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (clickInfo) => this.handleEventClick(clickInfo),
    events: (fetchInfo, successCallback, failureCallback) => {
      console.log('🔍 Fetching events for range:', fetchInfo.start, 'to', fetchInfo.end);

      this.fullCalendarService.getAgenda(fetchInfo.startStr).subscribe({
        next: (events: ICalendar[]) => {
          const formattedEvents = events.map(event => ({
            id: event.id.toString(),
            title: event.titol,
            start: event.data
          }));

          successCallback(formattedEvents);
        },
        error: (error) => {
          console.error('❌ Error carregant els esdeveniments:', error);
          failureCallback(error);
        }
      });
    }
  };


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Eliminar "${clickInfo.event.title}"?`)) {
      const eventId = Number(clickInfo.event.id); // C, fetchInfo.endStronvertim a number
      this.fullCalendarService.deleteEvent(eventId).subscribe({
        next: () => this.calendarApi.refetchEvents(),
        error: (err) => console.error('Error eliminant event:', err)
      });
    }
  }

    handleDateClick(arg: DateClickArg) {
      const title = prompt('Introdueix el títol de l\'event:');
      if (title) {
        const newEvent: ICalendar = { // Usa la interfície correctament
          id: 0, // Valor temporal (la BBDD l'auto-incrementarà)
          titol: title, // Camp correcte segons ICalendar
          data: arg.dateStr,
          lloc: '' // Omple amb dades reals si cal
        };

        this.fullCalendarService.addEvent(newEvent).subscribe({
          next: () => this.calendarApi.refetchEvents(),
          error: (err) => console.error('Error afegint event:', err)
        });
      }
    }
    ngAfterViewInit() {
      setTimeout(() => {
        this.calendarApi = this.calendarComponent.getApi();
      });
    }



}
