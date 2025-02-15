import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Imembers } from '../../interfaces/imembers';
import { membersService } from '../../services/members.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-members',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './crud-members.component.html',
  styleUrl: './crud-members.component.css'
})
export class CrudMembersComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operation: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private membersService: membersService,
    private router: Router,
    private toastr : ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
        nom: ['', Validators.required],
        cognom: ['', Validators.required],
        rol:[ '', Validators.required],
        payroll: [0, Validators.required],
      });
      this.id = Number( aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id !== 0) {
      this.operation = 'Editar ';
      this.membersService.getMember(this.id).subscribe((data) => {
        this.form.patchValue({
          nom: data.nom,
          cognom: data.cognom,
          rol: data.rol,
          payroll: data.payroll
        });
      });
    } else {
      this.operation = 'Agregar ';
    }
  }

  getMember(id: number) {
    this.loading = true;
    this.membersService.getMember(id).subscribe((data: Imembers) => {
    console.log(data);
    this.loading = false;
    this.form.setValue({
      nom: data.nom,
      cognom: data.cognom,
      rol: data.rol,
      payroll: data.payroll
    });
  });
  }

  addMember() {
    const member : Imembers = {
      nom: this.form.get('nom')?.value,
      cognom: this.form.get('cognom')?.value,
      rol: this.form.get('rol')?.value,
      payroll: this.form.get('payroll')?.value,
      id: 0
    }

    this.loading = true;

    if(this.id !== 0) {
      member.id = this.id;
      this.membersService.updateMember(this.id, member).subscribe(() => {
      this.toastr.info(`El membre ${member.nom} ha estat actualitzat correctament`, `Membre actualitzat`);
      this.loading = false;
      this.router.navigate(['/members-list']);
});
    } else {
      this.membersService.saveMember(member).subscribe(() => {
      this.toastr.success(`El membre ${member.nom} ha estat registrat correctament`, `Membre registrat`);
      this.loading = false;
      this.router.navigate(['/members-list']);
    });

  }
}
}
