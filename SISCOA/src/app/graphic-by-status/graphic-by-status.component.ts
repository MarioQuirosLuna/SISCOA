import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceUserService } from '../service-user.service';
import { OfficeControlServicesService } from '../office-control-services.service';
import { map } from 'rxjs/operators'; // do not forget !
@Component({
  selector: 'app-graphic-by-status',
  templateUrl: './graphic-by-status.component.html',
  styleUrls: ['./graphic-by-status.component.css']
})
export class GraphicByStatusComponent implements OnInit {

  view: [number, number] = [500, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFC300', '#000000', '#0ff'],
  };

  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public restUser: ServiceUserService,
    public officeControl: OfficeControlServicesService,
  
  ) {
    
  }

  ngOnInit(): void {
    this.rut();  
  }

datosprueba:any;
dataWithDay:any;
dataWithSlopes:any;
  rut() {
    let idU =  localStorage.getItem("idUsuario") ;

      this.officeControl
        .List(idU)
        .subscribe((data: {}) => {
         // this.userData = data;
         this.datosprueba=data
        });
    
  }
}
