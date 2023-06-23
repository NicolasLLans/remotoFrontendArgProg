import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { GeneralService } from 'src/app/general.service';
import { Experiencia } from 'src/app/modelos/experiencia';
import { ExperienciasService } from 'src/app/servicios/experiencias.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent {
  experienciaList: any;
  experienciaListDBJson:any;
  private experienciaActualizada = new Subject<void>();
  public formulario!: FormGroup;


  constructor(public generalService: GeneralService,private dataService:DataService, private formBuilder: FormBuilder,private experienciaService: ExperienciasService){
    

  }

  ngOnInit(): void{
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      fechaIni: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      img: ['', [Validators.required]]
    });

    this.generalService.obtenerDbjson().subscribe(
      (response:any) => {
      this.experienciaListDBJson = response[0].experienciaList;
      console.log(response[0].experienciaList);
    });
    
    this.dataService.misExperiencias$.subscribe(data => {
      this.experienciaList = data;
    });

    this.experienciaActualizada.subscribe(() => {
      this.dataService.actualizarMisExperiencias(); // Actualizar los datos en el servicio
    });

    // Obtener el id de la educación seleccionada y buscar los datos en el formulario
    const idExperienciaSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idExp')).value
    );
    const experienciaSeleccionada = this.buscarExperienciaPorId(
      idExperienciaSeleccionada
    );
    if (experienciaSeleccionada) {
      this.formulario.setValue({
        id: experienciaSeleccionada.id,
        img: experienciaSeleccionada.img,
        titulo: experienciaSeleccionada.titulo,
        fechaIni: experienciaSeleccionada.fechaIni,
        fechaFin: experienciaSeleccionada.fechaFin,
        descripcion: experienciaSeleccionada.descripcion,
      });
    }


    
  }

  buscarExperienciaPorId(id: number): Experiencia | null{
    if(this.experienciaList){
      return this.experienciaList.find((experiencia: Experiencia) => experiencia.id === id);
    }else{
      return null;
    }
  }
  

  mostrarDatos() {
    const idExperienciaSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idExp')).value
    );
    
    const experienciaSeleccionada = this.buscarExperienciaPorId(
      idExperienciaSeleccionada
    );
    if (experienciaSeleccionada) {
      this.formulario.setValue({
        id: experienciaSeleccionada.id,
        img: experienciaSeleccionada.img,
        titulo: experienciaSeleccionada.titulo,
        fechaIni: experienciaSeleccionada.fechaIni,
        fechaFin: experienciaSeleccionada.fechaFin,
        descripcion: experienciaSeleccionada.descripcion
      });
    }
  }

  editarExperiencia() {
    const id = this.formulario.value.id;
    const experiencia = this.formulario.value;
    this.experienciaService.editarExperiencia(id, experiencia).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.experienciaList = experiencia;
        this.experienciaActualizada.next(); // Emitir el Subject para actualizar los datos

        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  eliminarExperiencia(){
    const experienciaId = this.formulario.value.id;
  console.log("eliminar Exp")
  this.experienciaService.eliminarExperiencia(experienciaId).subscribe(
    () => {
      this.experienciaActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }

  agregarExperiencia(){
    const experiencia = this.formulario.value;
  console.log(experiencia)
  this.experienciaService.crearExperiencia(experiencia).subscribe(
    (response: Experiencia) => {
      console.log(response);
      this.experienciaList = experiencia;
      this.experienciaActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }
}
