import { FullCalendarComponent } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarService } from '../../services/full-calendar.service';
import { ICalendar } from '../../interfaces/i-calendar';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class AppFullCalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi: any;
  public events: any[] = [];
  public calendarOptions!: CalendarOptions;
  data: any[] = [];

  constructor(private fullCalendarService: FullCalendarService) {}

  ngOnInit(): void {
    this.carregarEvents();
    this.configurarCalendari();
  }

  ngAfterViewInit(): void {
    if (this.calendarComponent) {
      this.calendarApi = this.calendarComponent.getApi();
    }
  }

  carregarEvents(): void {
    this.fullCalendarService.getAgenda().subscribe({
      next: (events: ICalendar[]) => {
        this.events = events.map(event => ({
          id: event.id.toString(),
          title: event.titol, // FullCalendar espera "title"
          location: event.lloc,
          start: event.data,   // FullCalendar espera "start"
          backgroundColor: 'rgb(125, 28, 74)', // 🎨 Color de fons
          borderColor: 'rgb(100, 20, 50)',     // 🔲 Color de la vora (opcional)
          textColor: 'white',
          display: 'block'
        }));
        console.log('🔍 Esdeveniments carregats:', this.events);
      },
      error: (error) => {
        console.error('❌ Error carregant els esdeveniments:', error);
      }
    });
  }

  configurarCalendari(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      locale: esLocale,
      dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
      eventClick: (clickInfo: EventClickArg) => this.handleEventClick(clickInfo),

      events: (fetchInfo, successCallback, failureCallback) => {

        this.fullCalendarService.getAgenda().subscribe({
          next: (events: ICalendar[]) => {

        const formattedEvents = events
            .filter(event => event.id && event.titol && event.lloc && event.data) // Evitem que event.id sigui undefined
            .map(event => ({
              id: event.id.toString(), // Convertim id a string     // Si és undefined, posem '0'
              title: event.titol,
              location: event.lloc,
              start: event.data,
              backgroundColor: 'purple', // 🎨 Color de fons
              borderColor: 'rgb(100, 20, 50)',     // 🔲 Color de la vora (opcional)
              textColor: 'white',
              display: 'block'
            }));
            console.log('🔍 Esdeveniments carregats:', formattedEvents);
            successCallback(formattedEvents);
          },
          error: (error) => {
            console.error('❌ Error carregant els esdeveniments:', error);
            failureCallback(error);
          }
        });
      }
    };
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Eliminar "${clickInfo.event.title}"?`)) {
      const eventId = Number(clickInfo.event.id);
      this.fullCalendarService.deleteEvent(eventId).subscribe({
        next: () => {
          this.calendarApi().refetchEvents(); // ✅ S'actualitza correctament
        },
        error: (err) => console.error('Error eliminant event:', err)
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
        data: arg.dateStr
      };

      this.fullCalendarService.addEvent(newEvent).subscribe({
        next: () => {
          this.calendarApi().refetchEvents();
        },
        error: (err) => console.error('Error afegint event:', err)
      });
    }
  }
}
