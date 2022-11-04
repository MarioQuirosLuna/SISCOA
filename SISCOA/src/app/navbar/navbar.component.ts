import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceUserService } from '../service-user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: String = '';
  userData: any = null;
  @Input() datos: any;
  email: any = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public restUser: ServiceUserService
  ) {}

  ngOnInit(): void {
    this.rut();
    this.obtener_localStorage();
  }

  logout() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Signed out successfully',
    });

    this.router.navigate(['/']);
    this.email;
    this.role = '';
    this.auth.logout();
    this.auth.user = undefined;
    let idU = localStorage.getItem('idUsuario');
    idU = '';
  }

  rut() {
    let idU = localStorage.getItem('idUsuario');
    this.restUser.get(idU, idU).subscribe((data: {}) => {
      this.userData = data;
      this.email =
        this.userData.TC_Nombre + ' ' + this.userData.TC_PrimerApellido;
    });
  }

  obtener_localStorage() {
    let idU = localStorage.getItem('idUsuario');
    this.userData.ID = idU;
  }
}
