import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-grafics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafics.component.html',
  styleUrl: './grafics.component.css'
})
export class GraficsComponent implements OnInit {

  ngOnInit(): void {
    this.createChart();
  }
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (puede ser 'line', 'pie', 'doughnut', etc.)
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Etiquetas del eje X
        datasets: [{
          label: 'Ventas 2023', // Leyenda del dataset
          data: [65, 59, 80, 81, 56, 55], // Datos del gráfico
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Comienza el eje Y desde 0
        }
      }
      }
    });
  }
}

