import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { GeneralService } from 'src/app/general.service';
import { Skills } from 'src/app/modelos/skills';
import { SkillsService } from 'src/app/servicios/skills.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  public formulario!: FormGroup;
  skillsList:any;
  skillsListDBJson:any;
  private skillsActualizada = new Subject<void>();
  
  constructor( public generalService: GeneralService, private formBuilder: FormBuilder, private dataService:DataService, private skillsService:SkillsService){
  }

  ngOnInit(): void{
      this.formulario = this.formBuilder.group({
      id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      porcentaje: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      img: ['', [Validators.required]]
    });

    this.generalService.obtenerDbjson().subscribe(
      (response:any) => {
      this.skillsListDBJson = response[0].skillsList;
      console.log(response[0].skillsList)
    });

    this.dataService.misSkills$.subscribe(data => {
      this.skillsList = data;
    });

    this.skillsActualizada.subscribe(() => {
      this.dataService.actualizarMisSkills(); // Actualizar los datos en el servicio
    });

    // Obtener el id de la educación seleccionada y buscar los datos en el formulario
    const idSkillsSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-id')).value
    );
    const skillsSeleccionada = this.buscarSkillsPorId(
      idSkillsSeleccionada
    );
    if (skillsSeleccionada) {
      this.formulario.setValue({
        id: skillsSeleccionada.id,
        img: skillsSeleccionada.img,
        titulo: skillsSeleccionada.titulo,
        porcentaje: skillsSeleccionada.porcentaje,
        descripcion:skillsSeleccionada.descripcion
      });
    }

  }
  
  editarSkills() {
    const id = this.formulario.value.id;
    const skills = this.formulario.value;
    this.skillsService.editarSkills(id, skills).subscribe(
      (response: Skills) => {
        console.log(response);
        this.skillsList = skills;
        this.skillsActualizada.next(); // Emitir el Subject para actualizar los datos

        this.formulario.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  eliminarSkills(){
    const skillsId = this.formulario.value.id;
  console.log("eliminar Exp")
  this.skillsService.eliminarSkills(skillsId).subscribe(
    () => {
      this.skillsActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }

  agregarSkills(){
    const skills = this.formulario.value;
  console.log(skills)
  this.skillsService.crearSkills(skills).subscribe(
    (response: Skills[]) => {
      console.log(response);
      this.skillsList = skills;
      this.skillsActualizada.next(); // Emitir el Subject para actualizar los datos

      this.formulario.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
  }

  buscarSkillsPorId(id: number): Skills | null {
    if(this.skillsList){
      return this.skillsList.find((skills: Skills) => skills.id === id);
    }else{
      return null;
    }
  }

  mostrarDatos() {
    const idSkillsSeleccionada = Number(
      (<HTMLSelectElement>document.getElementById('select-id')).value
    );
    
    const skillsSeleccionada = this.buscarSkillsPorId(
      idSkillsSeleccionada
    );
    if (skillsSeleccionada) {
      this.formulario.setValue({
        id: skillsSeleccionada.id,
        img: skillsSeleccionada.img,
        titulo: skillsSeleccionada.titulo,
        porcentaje:skillsSeleccionada.porcentaje,
        descripcion:skillsSeleccionada.descripcion
      });
    }
  }

}
