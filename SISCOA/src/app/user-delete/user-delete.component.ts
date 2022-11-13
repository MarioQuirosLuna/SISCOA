import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesRolService } from '../services-rol.service';
import { ServicesOfficeService } from '../services-office.service';
import { ServiceUserService } from '../service-user.service';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
})
export class UserDeleteComponent implements OnInit {
  userData: any;
  userData2: any;

  constructor(
    public restUser: ServiceUserService,
    public restRol: ServicesRolService,
    public restOffice: ServicesOfficeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  roleData: any;
  dataOffice: any;
  ngOnInit(): void {
    this.rut();
    this.obtener_localStorage();
  }

  rut() {
    let idU = localStorage.getItem('idUsuario');

    this.restUser
      .get(this.route.snapshot.params['ID'], idU)
      .subscribe((data: {}) => {
        this.userData = data;
      });

    this.restRol.rolList(idU).subscribe((pos) => {
      this.roleData = pos;
    });

    this.dataOffice = [];
    this.restOffice.officeList(idU).subscribe((data = {}) => {
      this.dataOffice = data;
    });
  }

  delete() {
    let idU = localStorage.getItem('idUsuario');

    this.restUser.delete(this.route.snapshot.params['ID'], idU).subscribe(
      (result) => {
        Swal.fire('Buen trabajo!', 'Usuario eliminado correctamente!', 'success');
        this.router.navigate(['/listUser']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al eliminar usuario!',
        });
      }
    );
  }

  obtener_localStorage() {
    let idU = localStorage.getItem('idUsuario');
    this.userData.ID = idU;
  }
}
