import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesOfficeService } from '../services-office.service';
import { ServicesControllersService } from '../services-controllers.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ServicesPeriodService } from '../services-period.service';
import { ServiceUserService } from '../service-user.service';
import * as moment from 'moment';
import { OfficeControlServicesService } from '../office-control-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-office-control-management',
  templateUrl: './office-control-management.component.html',
  styleUrls: ['./office-control-management.component.css'],
})
export class OfficeControlManagementComponent implements OnInit, AfterViewInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  date: any;
  hour: any;
  date2: any;
  hour2: any;
  startDate: any;
  enddate: any;
  dataSource = new MatTableDataSource();
  dataSourceControl = new MatTableDataSource();
  dataSourcePeriod: any;
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild('paginator2') paginator2: any = MatPaginator;
  displayedColumns: string[] = ['name', 'code', 'institution', 'action'];
  displayedxColumns: string[] = [
    'name',
    'Descripcion',
    'Period',
    'date1',
    'date2',
    'date3',
    'status',
    'action',
  ];
  controlDataupdate: any;
  name = {
    nameOff: '',
    indication: 'Controles',
  };

  constructor(
    public restUser: ServiceUserService,
    public restPeriodic: ServicesPeriodService,
    public rest: ServicesOfficeService,
    public rest2: ServicesControllersService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    public officeControl: OfficeControlServicesService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceControl.paginator = this.paginator2;
  }
  ngOnInit(): void {
    this.rut();
  }
  update(id: number) {
    let idU = localStorage.getItem("idUsuario");

    this.rest2.getControlFull(id, idU).subscribe((data: {}) => {
      this.controlDataupdate = data;
    });
  }
  office: any;
  dar(id: any, name: any) {
    let idU = localStorage.getItem("idUsuario");

    this.office = id;
    this.rest2.getControl(this.office, idU).subscribe((pos) => {
      this.dataSourceControl.data = pos;
    });
    this.name.nameOff = name;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue2 = (event.target as HTMLInputElement).value;
    this.dataSourceControl.filter = filterValue2.trim().toLowerCase();
  }
  back() {
    this.router.navigate(['/controlMenu']);
  }
  day = {
    num: 0
  }
  extraDay() {
    let idU = localStorage.getItem("idUsuario");
    //console.log(this.controlDataupdate.TN_DiasExtra)
    //this.controlDataupdate.TN_DiasExtra=7;
    this.officeControl.update(this.controlDataupdate.ID, this.controlDataupdate, idU).subscribe(
      (result) => {
        Swal.fire('Buen trabajo!', 'El proceso fue exitoso!', 'success');
        this.router.navigate(['/controlMenu']);
      }

      ,
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cambiar controles de oficina!',
        });
      }
    );
  }
  rut() {
    let idU = localStorage.getItem("idUsuario");

    this.rest.officeList(idU).subscribe((pos) => {
      this.dataSource.data = pos;
    });

    this.restPeriodic.periodList(idU).subscribe((pos) => {
      this.dataSourcePeriod = pos;
    });
  }
  download(id: any) {
    let idU = localStorage.getItem("idUsuario");
    this.officeControl.getBiId(id, idU).subscribe((data: any) => {
      if (data.Archivos[0]) {
        let base64String = data.Archivos[0].TC_Datos;
        this.downloadPdf(base64String, data.Archivos[0].TC_Nombre);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay archivos para descargar!',
        });
      }
    });
  }

  downloadPdf(base64String: any, fileName: any) {
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  delete(id: any) {
    let idU = localStorage.getItem("idUsuario");

    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.officeControl.deleteOfficeControl(id, idU).subscribe((data) => {
          this.router.navigate(['/controlMenu']);
        });
        Swal.fire('Eliminado!', 'Control eliminada correctamente.', 'success');
      }
    });
  }
  controlRestored: any;
  control: any;
  restore(id: any) {
    let idU = localStorage.getItem("idUsuario");

    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, restauralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rest2.getControlFull(id, idU).subscribe((data) => {
          this.officeControl.restoreControl({
            "ID": data.ID,
            "FK_TN_CONTROL_SISCOA_OficinaControl": data.FK_TN_CONTROL_SISCOA_OficinaControl,
            "FK_TN_OFICINA_SISCOA_OficinaControl": data.FK_TN_OFICINA_SISCOA_OficinaControl,
            "FK_TN_ESTADO_SISCOA_OficinaControl": 1,
            "TC_Comentario": "",
            "FK_TN_PERIODO_SISCOA_OficinaControl": data.FK_TN_PERIODO_SISCOA_OficinaControl,
            "TF_FechaInicio": "0001-01-01T00:00:00.000Z",
            "TF_FechaFin": "0001-01-01T00:00:00.000Z",
            "TF_FechaFin_DiasExtra": "0001-01-01T00:00:00.000Z",
            "TN_DiasExtra": 0,
            "Archivos": null,
            "TSISCOA_Control": null,
            "TSISCOA_Oficina": null,
            "TSISCOA_Estado": null,
            "TSISCOA_Periodo": null
          }, id, idU).subscribe((data) => {
            this.router.navigate(['/controlMenu']);
          })
        });
        Swal.fire('Restaurado!', 'Control se a restaurado correctamente.', 'success');
      }
    });
  }
}
