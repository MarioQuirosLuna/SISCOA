import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})


export class PermissionListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}


export interface PeriodicElement {
  name: string;
 
}


const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen'},
  { name: 'Hydrogen'},  
  { name: 'Hydrogen'},
  { name: 'Hydrogen'},
  { name: 'Hydrogen'},

];


