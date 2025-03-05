import { Component, OnInit } from '@angular/core';
import L, { LayerGroup } from 'leaflet';
import { MapTeatres } from '../../interfaces/map-teatres';
import { MapTeatresService } from '../../services/map-teatres.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})

export class MapaComponent implements OnInit {
  private map!: L.Map;
  private teatresBarcelona: MapTeatres[] = [];
  grupTeatres: LayerGroup = L.layerGroup();


  constructor(private mapTeatresService: MapTeatresService) { L.layerGroup();}

  ngOnInit(): void {
    this.initMap();
    this.loadTeatres();
  }

  private initMap(): void {
    // Inicialitza el mapa
    this.map = L.map('map').setView([41.3851, 2.1734], 13);
    // Afegeix capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    // Afegeix el grup de marcadors al mapa
    this.grupTeatres.addTo(this.map);

  }

  private loadTeatres(): void {
    this.mapTeatresService.getMapTeatres().subscribe({
      next: (data: any) => {
        if (!data) { // Verifica que data existeix
          console.error('No s\'han rebut dades');
          return;
        }
        this.teatresBarcelona = data [0];
        console.log(this.teatresBarcelona)
        this.updateMarkers();
      },
      error: (error) => {
        console.error('Error carregant teatres:', error);
      }
    });
  }

  private updateMarkers(): void {
    if (!Array.isArray(this.teatresBarcelona)) {
      console.error('Dades no vàlides:', this.teatresBarcelona);
      return;
    }
      // Afegeix nous marcadors
      this.teatresBarcelona.forEach(teatre => {
        console.log(teatre)
        const marker = L.marker([teatre.latitud, teatre.longitud], {
          // Icono personalitzat
          icon: L.icon({
            iconUrl: '/assets/teatro.png', // Verifica que la ruta és correcta
            iconSize: [32, 32],
            iconAnchor: [12, 25],
            popupAnchor: [0, -50]
          })
        })
        .bindPopup(`<b>${teatre.nom}</b><br>${teatre.adreça}`)
        .openPopup();

        this.grupTeatres.addLayer(marker);
  });
// Actualitza el zoom
if (this.teatresBarcelona.length > 0) {
  const bounds = L.latLngBounds(
    this.teatresBarcelona.map(t => [t.latitud, t.longitud])
  );
  this.map.fitBounds(bounds);
}
  } ;

}
