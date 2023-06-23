import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { GeneralService } from 'src/app/general.service';
import { Proyectos } from 'src/app/modelos/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectoListDBJson:any;
  proyectoList: any;
  private proyectoActualizada = new Subject<void>();
  formulario!: FormGroup;

  constructor(public generalService: GeneralService, private dataService: DataService, private formBuilder: FormBuilder, private proyectosService: ProyectosService) {  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      fechaIni: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      img: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });

    this.generalService.obtenerDbjson().subscribe(
      (response:any) => {
      this.proyectoListDBJson = response[0].proyectosList;
      console.log(response[0].proyectosList);
    });

    this.dataService.misProyectos$.subscribe(data => {
      this.proyectoList = data;
    });

    this.proyectoActualizada.subscribe(() => {
      this.dataService.actualizarMisProyectos(); // Actualizar los datos en el servicio
    });

    // Obtener el id de la educación seleccionada y buscar los datos en el formulario
    const idProyectoSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idProy')).value
    );
    const proyectoSeleccionada = this.buscarProyectoPorId(
      idProyectoSeleccionada
    );
    if (proyectoSeleccionada) {
      this.formulario.setValue({
        id: proyectoSeleccionada.id,
        img: proyectoSeleccionada.img,
        titulo: proyectoSeleccionada.titulo,
        fechaIni: proyectoSeleccionada.fechaIni,
        fechaFin: proyectoSeleccionada.fechaFin,
        descripcion: proyectoSeleccionada.descripcion,
        link:proyectoSeleccionada.link
      });
    }
  }

  buscarProyectoPorId(id: number): Proyectos | null {
    if(this.proyectoList){
      return this.proyectoList.find((proyecto: Proyectos) => proyecto.id === id);
    }else{
      return null;
    }
  }
  

  mostrarDatos() {
    const idProyectoSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-idProy')).value
    );
    
    const proyectoSeleccionada = this.buscarProyectoPorId(
      idProyectoSeleccionada
    );
    if (proyectoSeleccionada) {
      this.formulario.setValue({
        id: proyectoSeleccionada.id,
        img: proyectoSeleccionada.img,
        titulo: proyectoSeleccionada.titulo,
        fechaIni: proyectoSeleccionada.fechaIni,
        fechaFin: proyectoSeleccionada.fechaFin,
        descripcion: proyectoSeleccionada.descripcion,
        link: proyectoSeleccionada.link
      });
    }
  }

  editarProyectos() {
    const id = this.formulario.value.id;
    const proyecto = this.formulario.value;
    this.proyectosService.editarProyectos(id, proyecto).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.proyectoList = proyecto;
        this.proyectoActualizada.next(); // Emitir el Subject para actualizar los datos

        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  eliminarProyectos() {
    const proyectoId = this.formulario.value.id;
    console.log("eliminar Exp")
    this.proyectosService.eliminarProyectos(proyectoId).subscribe(
      () => {
        this.proyectoActualizada.next(); // Emitir el Subject para actualizar los datos

        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  agregarProyectos() {
    const proyecto = this.formulario.value;
    console.log(proyecto)
    this.proyectosService.crearProyectos(proyecto).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.proyectoList = proyecto;
        this.proyectoActualizada.next(); // Emitir el Subject para actualizar los datos

        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}


