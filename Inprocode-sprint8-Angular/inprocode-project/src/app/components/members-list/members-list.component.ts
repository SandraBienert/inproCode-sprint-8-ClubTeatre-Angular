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
  membersList: Imembers[] = [];
  loading: boolean = false;
  members: Imembers[] | undefined;

  constructor(private membersService: membersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListMembers();
  }

  getListMembers() {
      this.loading = true;
      this.membersService.getListMembres().subscribe({
        next: (members) => {
          console.log('✅ Membres rebuts:', members);

          // ❌ Excloem els membres que tenen totes les propietats null
          this.members = members.filter(member => member.nom && member.cognom && member.rol && member.payroll);

          console.log('✅ Membres filtrats:', this.members);
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

