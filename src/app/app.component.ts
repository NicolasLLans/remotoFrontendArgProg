import { Component } from '@angular/core';
import { GeneralService } from './general.service';
import { DataService } from './data.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'porfolio';
  miPorfolio:any;
  misEdu:any;
  misProy:any;
  misSkills:any;
  misExp:any;
  

  constructor(public generalService: GeneralService, private dataService: DataService, private router: Router){
    const navEndEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    navEndEvents$.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag("config", "G-8ZZ916EZL6", {
          'page_path': event.urlAfterRedirects
        });
      }
    });
  }

  ngOnInit(){
    this.cargarDatosDelPorfolio();
    this.cargarDatosDeEducaciones();
    this.cargarDatosDeProyectos();
    this.cargarDatosDeExperiencias();
    this.cargarDatosDeSkills();
  }

  public cargarDatosDelPorfolio(){
    this.generalService.obtenerInfo().subscribe(data => {
      this.miPorfolio = data[0];
      this.dataService.setMiPorfolio(this.miPorfolio); // Almacenar los datos en el servicio
    });
  }

  public cargarDatosDeEducaciones(){
    this.generalService.obtenerInfoEdu().subscribe(data => {
      this.misEdu = data;
      this.dataService.setMisEducaciones(this.misEdu); // Almacenar los datos en el servicio
    });
  }

  public cargarDatosDeProyectos(){
    this.generalService.obtenerInfoProy().subscribe(data => {
      this.misProy = data;
      this.dataService.setMisProyectos(this.misProy); // Almacenar los datos en el servicio
    });
  }

  public cargarDatosDeSkills(){
    this.generalService.obtenerInfoSkills().subscribe(data => {
      this.misSkills = data;
      this.dataService.setMisSkills(this.misSkills); // Almacenar los datos en el servicio
    });
  }

  public cargarDatosDeExperiencias(){
    this.generalService.obtenerInfoExp().subscribe(data => {
      this.misExp = data;
      this.dataService.setMisExperiencias(this.misExp); // Almacenar los datos en el servicio
    });
  }
}