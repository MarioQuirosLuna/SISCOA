import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesOfficeService } from '../services-office.service';
import { ServicesControllersService } from '../services-controllers.service';
import { OfficeControlServicesService } from '../office-control-services.service';
import Swal from 'sweetalert2';
import { ServiceUserService } from '../service-user.service';
import { ServicesPeriodService } from '../services-period.service';
import { ServiceConditionService } from '../service-condition.service';
@Component({
  selector: 'app-add-controls-offices',
  templateUrl: './add-controls-offices.component.html',
  styleUrls: ['./add-controls-offices.component.css'],
})
export class AddControlsOfficesComponent implements OnInit, AfterViewInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  form = {
    "name": ''
  }

  displayedColumns: string[] = ['name', 'code', 'institution', 'action'];
  displayedxColumns: string[] = [
    'name',
    'Descripcion',
    'action',
  ];
  displayedColumnsOfice: string[] = [
    'name',
    'Descripcion',
    'period',
    'date1',
    'date2',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource();
  dataSourceControl = new MatTableDataSource();
  dataSourceControlOffice = new MatTableDataSource();
  control: any;
  office: any;
  name = {
    nameOff: '',
    indication: 'Controles',
  };
  @ViewChild('paginator') paginator: any = MatPaginator;
  @ViewChild('paginator2') paginator2: any = MatPaginator;
  @ViewChild('paginator3') paginator3: any = MatPaginator;
  constructor(
    public restUser: ServiceUserService,
    public restOfficeControl: OfficeControlServicesService,
    public rest: ServicesOfficeService,
    public rest2: ServicesControllersService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    public restPeriod: ServicesPeriodService,
    public restConditional: ServiceConditionService,
    

  ) { }
  dataPeriod: any
  dataConditional: any
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceControl.paginator = this.paginator2;
    this.dataSourceControlOffice.paginator = this.paginator3;
  }
  ngOnInit(): void {
    this.rut();
    this.obtener_localStorage();
  }
  obtener_localStorage() {
    let idU = localStorage.getItem("idUsuario");

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  officeControl = {
    "ID": 0,
    "FK_TN_CONTROL_SISCOA_OficinaControl": 0,
    "FK_TN_OFICINA_SISCOA_OficinaControl": 0,
    "FK_TN_ESTADO_SISCOA_OficinaControl": 1,
    "TC_Comentario": "",
    "FK_TN_PERIODO_SISCOA_OficinaControl": 0,
    "TF_FechaInicio": "0001-01-01T00:00:00.000Z",
    "TF_FechaFin": "2022-11-20T18:20:39.549Z",
    "TF_FechaFin_DiasExtra":"0001-01-01T00:00:00.000Z",
    "TN_DiasExtra": 0,
    "Archivos":null,
    "TSISCOA_Control": null,
    "TSISCOA_Oficina": null, 
    "TSISCOA_Estado": null,
    "TSISCOA_Periodo": null
  };

  darOfice(id: any, name: any) {
    let idU = localStorage.getItem("idUsuario");

    this.office = id;
    this.rest2.getControl(this.office, idU).subscribe((pos) => {
      this.dataSourceControlOffice.data = pos;
    });
    this.control = id;
    this.name.nameOff = name;
  }

  addControlOffice() {
    let idU = localStorage.getItem("idUsuario");

    this.officeControl.FK_TN_OFICINA_SISCOA_OficinaControl = this.office;
    this.officeControl.FK_TN_CONTROL_SISCOA_OficinaControl = this.control;

    this.restOfficeControl.add(this.officeControl, idU).subscribe(
      (result) => {
        Swal.fire('Buen trabajo!', 'Control agregado!', 'success');
        this.back()
      }
      ,
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo agregar el control!',
        });
      }
    );
  }
  dar(id: any, name2: any) {
    let idU = localStorage.getItem("idUsuario");

    this.control = id;
    this.form.name = name2;
    //this.addControlOffice();
    this.ngOnInit();

    this.restPeriod.periodList(idU).subscribe((pos) => {
      this.dataPeriod = pos;
    });
    this.restConditional.conditionalList(idU).subscribe((pos) => {
      this.dataConditional = pos;
    });
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
        this.restOfficeControl.deleteOfficeControl(id, idU).subscribe((data) => {
          this.router.navigate(['/controlMenu']);
        });
        Swal.fire('Eliminado!', 'Control eliminada correctamente.', 'success');
      }
    });
  }

  back() {
    this.router.navigate(['/controlMenu']);
  }

  rut() {
    let idU = localStorage.getItem("idUsuario");
    this.rest.officeList(idU).subscribe((pos) => {
      this.dataSource.data = pos;
    });
    this.rest2.listControl(idU).subscribe((pos) => {
      this.dataSourceControl.data = pos;
    });
  }
}
