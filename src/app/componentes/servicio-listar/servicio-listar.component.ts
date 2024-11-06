import {Component, inject, ViewChild} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Servicio} from '../../model/servicio';
import {DatePipe} from '@angular/common';
import {ServicioService} from '../../services/servicio.service';

@Component({
  selector: 'app-servicio-listar',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './servicio-listar.component.html',
  styleUrl: './servicio-listar.component.css'
})
export class ServicioListarComponent {
  lista: Servicio[] = [];
  displayedColumns = ['id', 'nombreServicio', 'objetivoServicio', 'precioServicio', 'fechaServicio', 'tipoServicio', 'formaEntrega'];
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource<Servicio>();
  servicioService: ServicioService = inject(ServicioService);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  route: Router = inject(Router);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    // Suscribirse al observable de la lista de proveedores
    this.servicioService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.servicioService.list().subscribe({
      next: (data) => {
        this.servicioService.setList(data); //enviar la nueva lista a los suscriptores
      },
      error: (err) => console.error("Error en consulta", err)
    })
  }
}
