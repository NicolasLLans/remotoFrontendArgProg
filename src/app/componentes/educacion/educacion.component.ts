import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/general.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { EducacionesService } from 'src/app/servicios/educaciones.service';
import { Educacion } from 'src/app/modelos/educacion';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  public formulario!: FormGroup;
  educacionList: any;
  educacionListDBJson:any;
  private educacionActualizada = new Subject<void>();

  constructor(public generalService: GeneralService, private formBuilder: FormBuilder, private educacionService: EducacionesService, private dataService: DataService) {}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      img: ['', Validators.required],
      titulo: ['', Validators.required],
      fechaIni: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.generalService.obtenerDbjson().subscribe(
      (response:any) => {
      this.educacionListDBJson = response[0].educacionList;
    });

    this.dataService.misEducaciones$.subscribe(data => {
      this.educacionList = data;
    });

    this.educacionActualizada.subscribe(() => {
      this.dataService.actualizarMisEducaciones(); // Actualizar los datos en el servicio
    });

    // Obtener el id de la educación seleccionada y buscar los datos en el formulario
    const idEducacionSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idEdu')).value
    );
    const educacionSeleccionada = this.buscarEducacionPorId(
      idEducacionSeleccionada
    );
    if (educacionSeleccionada) {
      this.formulario.setValue({
        id: educacionSeleccionada.id,
        img: educacionSeleccionada.img,
        titulo: educacionSeleccionada.titulo,
        fechaIni: educacionSeleccionada.fechaIni,
        fechaFin: educacionSeleccionada.fechaFin,
        descripcion: educacionSeleccionada.descripcion
      });
    }

  }

  buscarEducacionPorId(id: number): Educacion | null {
    if (this.educacionList) {
      const educacionEncontrada = this.educacionList.find((educacion: Educacion) => educacion.id === id);
      
      if (educacionEncontrada) {
        // Se encontró una educación con el ID especificado
        return educacionEncontrada;
      } else {
        // No se encontró ninguna educación con el ID especificado
        return null;
      }
    } else {
      // this.educacionList es null
      return null;
    }
  }
  

  mostrarDatos() {
    const idEducacionSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idEdu')).value
    );
    
    const educacionSeleccionada = this.buscarEducacionPorId(
      idEducacionSeleccionada
    );
    if (educacionSeleccionada) {
      this.formulario.setValue({
        id: educacionSeleccionada.id,
        img: educacionSeleccionada.img,
        titulo: educacionSeleccionada.titulo,
        fechaIni: educacionSeleccionada.fechaIni,
        fechaFin: educacionSeleccionada.fechaFin,
        descripcion: educacionSeleccionada.descripcion
      });
    }
  }

  editarEducacion() {
    const id = this.formulario.value.id;
    const educacion = this.formulario.value;
    this.educacionService.editarEducacion(id, educacion).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.educacionList = educacion;
        this.educacionActualizada.next();
        
        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  eliminarEducacion():void{
  const educacionId = this.formulario.value.id;
  console.log("eliminar EDU")
  this.educacionService.eliminarEducacion(educacionId).subscribe(
    () => {
      this.educacionActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }

  agregarEducacion(){
  const educacion = this.formulario.value;
  console.log(educacion)
  this.educacionService.crearEducacion(educacion).subscribe(
    (response: Educacion) => {
      console.log(response);
      this.educacionList = educacion;
      this.educacionActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }

}