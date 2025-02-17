import { StarshipsListComponent } from './../starships-list/starships-list.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})


export class StarshipDetailComponent implements OnInit {

  starship: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.loadStarshipDetails(id);
    }
  }


  loadStarshipDetails(id: string): void{
    this.apiService.getStarshipById(id).subscribe((data)=>{
      this.starship = data;
    })
  }

  getStarshipImage(): string {
    const id= this.apiService.extractIdFromUrl(this.starship.url);
    return this.apiService.getStarshipImageUrl(id);
}

}
