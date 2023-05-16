import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  public rutaImagen="../../../assets/img/usuario.png";
  fotoPerfil:any;


  constructor(private ruta : Router, public generalService: GeneralService, private dataService: DataService,private location: Location){
    
  }

  ngOnInit(): void{
    this.dataService.miPorfolio$.subscribe(data => {
      this.fotoPerfil = data;
    });
  }

  cerrarSesion(){
    this.generalService.vistabtn = false;
    this.generalService.btnLog=true;
    (document.getElementById("iniciar") as HTMLElement).style.display = "block"; 
    this.location.back;
  }

}

