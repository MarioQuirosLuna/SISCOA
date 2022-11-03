import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesOfficeService } from '../services-office.service';
import Swal from 'sweetalert2';
import { getLocaleDateFormat } from '@angular/common';
import { ServiceUserService } from '../service-user.service';
@Component({
  selector: 'app-office-update',
  templateUrl: './office-update.component.html',
  styleUrls: ['./office-update.component.css'],
})
export class OfficeUpdateComponent implements OnInit {
  constructor(
    public restUser: ServiceUserService,
    private fb: FormBuilder,
    public rest: ServicesOfficeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
userData:any
  ngOnInit(): void {
    this.rut();
    this.obtener_localStorage()
  }
  @Input() officeDataupdate: any;
  rut() {
    let idU =  localStorage.getItem("idUsuario") ;
      console.log(idU)
      this.restUser.get(idU,idU).subscribe((data: {}) => {
        console.log(data);
        this.userData = data;
        
      });

    this.rest.get(this.route.snapshot.params['ID'],idU).subscribe((data: {}) => {
      console.log(data);
      this.officeDataupdate = data;
    });

  
      
  }

  update() {
    let idU =  localStorage.getItem("idUsuario") ;
    this.rest
      .update(this.officeDataupdate, this.route.snapshot.params['ID'],idU)
      .subscribe(
        (result) => {
          Swal.fire('Good job!', 'estado sucessfully updated!', 'success');
          this.router.navigate(['/officeList']);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
          console.log(err);
        }
      );
  }



  obtener_localStorage(){
    let idU =  localStorage.getItem("idUsuario") ;
    this.userData.ID=idU
    }
}
