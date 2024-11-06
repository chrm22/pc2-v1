import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {ServicioService} from '../../services/servicio.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {Servicio} from '../../model/servicio';

@Component({
  selector: 'app-servicio-registrar',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatLabel, MatHint, //add
    MatDatepickerModule,//add
    MatNativeDateModule, //add
    MatInputModule, MatSelect, MatOption, NgForOf, NgIf, //add
  ],
  templateUrl: './servicio-registrar.component.html',
  styleUrl: './servicio-registrar.component.css'
})
export class ServicioRegistrarComponent {
  servicioForm: FormGroup;
  servicioService: ServicioService = inject(ServicioService);
  fb = inject(FormBuilder);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute)
  listaTipos = [
    { value: 'Luz', viewValue: 'Luz' },
    { value: 'Telefonía', viewValue: 'Telefonía' },
    { value: 'Gas', viewValue: 'Gas' },
    { value: 'Agua', viewValue: 'Agua' },
  ];
  listaFormas = [
    { value: 'Recojo en tienda', viewValue: 'Recojo en tienda' },
    { value: 'Entrega en puerta', viewValue: 'Entrega en puerta' },
  ];

  constructor() {
    console.log("Constructor RegistrarServicio");
    this.servicioForm = this.fb.group({
      nombreServicio: ['', Validators.required],
      objetivoServicio: ['', Validators.required],
      fechaServicio: ['',
        [
          Validators.required,
          (control: { value: string | number | Date; }) => {
            const fechaIngresada = new Date(control.value);
            const fechaHoy = new Date();
            fechaHoy.setHours(0, 0, 0, 0); // Aseguramos que solo se compare la fecha sin la hora
            if (fechaIngresada > fechaHoy) {
              return { fechaFutura: true };
            }
            return null;
          }
        ]
      ],
      tipoServicio: ['', Validators.required],
      precioServicio: ['',
        [Validators.required,
          Validators.min(70),
          Validators.max(500),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      ],
      formaEntrega: ['', Validators.required],

    })
  }

  onSubmit() {

    if (this.servicioForm.valid) {
      const servicio: Servicio = new Servicio();

      servicio.nombreServicio = this.servicioForm.value.nombreServicio;
      servicio.objetivoServicio = this.servicioForm.value.objetivoServicio;
      servicio.fechaServicio = this.servicioForm.value.fechaServicio;
      servicio.precioServicio = this.servicioForm.value.precioServicio;
      servicio.tipoServicio = this.servicioForm.value.tipoServicio;
      servicio.formaEntrega = this.servicioForm.value.formaEntrega;

      console.log("Datos registrados:", servicio);
      this.servicioService.insert(servicio).subscribe((data: Object): void => {
        console.log("Datos insertados:", data);
      });

      this.router.navigate(['']);

    } else {
      console.log("Formulario no valido");
    }
  }
}
