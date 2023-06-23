import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from './modelos/personas';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
 public vistabtn: boolean = false;
 public iniciar:boolean = false;
 public btnLog:boolean=true;

 public backUrl:string = "https://porfoliobackend-bm5y.onrender.com";

  constructor(private http:HttpClient) { }


public obtenerInfo(): Observable<Personas[]>{
  return this.http.get<Personas[]>(this.backUrl+"/api/personas");
}

public obtenerInfoEdu(): Observable<any>{
  return this.http.get<any>(this.backUrl+"/api/educacion");
}

public obtenerInfoExp(): Observable<any>{
  return this.http.get<any>(this.backUrl+"/api/experiencia");
}

public obtenerInfoSkills(): Observable<any>{
  return this.http.get<any>(this.backUrl+"/api/skills");
}

public obtenerInfoProy(): Observable<any>{
  return this.http.get<any>(this.backUrl+"/api/proyectos");
}


/* Solución temporal al problema del servidor: Cargar datos desde el dbJson hasta que lleguen los del servidor */

public obtenerDbjson(): Observable<[0]>{
  return this.http.get<[0]>('assets/db.json');
}

}