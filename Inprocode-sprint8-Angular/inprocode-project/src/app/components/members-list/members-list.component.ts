import { Component, OnInit } from '@angular/core';
import { Imembers } from '../../interfaces/imembers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { membersService } from '../../services/members.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent],
 providers: [membersService],
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})

export class MembersListComponent implements OnInit {
  members: Imembers[] = [];
  membersFiltered: any[] = [];
  loading: boolean = false;


  constructor(private membersService: membersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListMembers();
  }

  getListMembers() {
      this.loading = true;
      this.membersService.getListMembres().subscribe({
        next: (members) => {
          console.log('✅ Membres rebuts:', members);

          this.members = members;
          this.membersFiltered = members.filter(m => m.nom && m.cognom && m.rol && m.payroll);;

          console.log('✅ Membres filtrats:', this.membersFiltered);
          this.loading = false;
        },
        error: (err) => console.error('❌ Error carregant membres:', err)
      });
  }

  deleteMember(id: number) {
    this.loading = true;
    this.membersService.deleteMember(id).subscribe(() =>{
      this.getListMembers();
      this.toastr.warning('Membre esborrat amb èxit!', 'Membre esborrat');
    })
  }

 }

