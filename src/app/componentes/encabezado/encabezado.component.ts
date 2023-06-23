import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { GeneralService } from 'src/app/general.service';
import { Personas } from 'src/app/modelos/personas';
import { PersonasService } from 'src/app/servicios/personas.service';



@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  //atributos
  dataJson: any;
  miPorfolio: any;
  public formulario!: FormGroup;



  //constructor
  constructor(public generalService: GeneralService, private dataService: DataService, public personasService: PersonasService, public formBuilder: FormBuilder) {
  }

  //metodos o funciones
  ngOnInit(): void {

    this.generalService.obtenerDbjson().subscribe(
      (response: any) => {
        // Datos internos cargados
        this.dataJson = response[0];
        console.log(this.dataJson.nombre)
      },
      (error: any) => {
        console.error('Error al cargar los datos internos', error);
      }
    );

    this.dataService.miPorfolio$.subscribe(data => {
      this.miPorfolio = data;

      if (this.formulario !== undefined && this.formulario !== null) {
        this.formulario.setValue({
          id: this.miPorfolio?.id,
          nombre: this.miPorfolio?.nombre,
          apellido: this.miPorfolio?.apellido,
          titulo: this.miPorfolio?.titulo,
          localidad: this.miPorfolio?.localidad,
          fotoPerfil: this.miPorfolio?.fotoPerfil,
          fotoBanner: this.miPorfolio?.fotoBanner,
          descripcion: this.miPorfolio?.descripcion
        });
      }
    });


    this.formulario = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      titulo: new FormControl(''),
      localidad: new FormControl(''),
      descripcion: new FormControl(''),
      fotoPerfil: new FormControl(''),
      fotoBanner: new FormControl('')
    });



  }


  editarPerfil() {
    this.personasService.editarPersona(this.miPorfolio.id, this.formulario.value).subscribe(
      (response: Personas) => {
        console.log(response);
        this.miPorfolio = this.formulario.value; // Actualizar los datos locales con los datos del formulario
        //this.datosActualizados.next(); // Emitir el Subject para actualizar los datos
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}