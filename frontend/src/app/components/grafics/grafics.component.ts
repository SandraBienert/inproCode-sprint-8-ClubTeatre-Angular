import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent implements OnInit {

  ngOnInit(): void {
  }

}

