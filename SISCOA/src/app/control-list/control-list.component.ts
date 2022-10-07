import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServicesControllersService } from '../services-controllers.service';

@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})



export class ControlListComponent implements AfterViewInit ,OnInit{
  displayedColumns: string[] = ['name', 'Descripcion','Period','status','notification', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  constructor(public rest:ServicesControllersService,private route:ActivatedRoute,private router:Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.rest.officeList().subscribe((pos)=>{
      console.log(pos);
      this.dataSource.data=pos
      });
  }

  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }}
