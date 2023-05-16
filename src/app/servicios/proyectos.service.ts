import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  public url=this.gservice.backUrl;
  constructor(private http:HttpClient,private gservice:GeneralService) { }

  public editarProyectos(id:number, proyectos:any):Observable<any>{
    return this.http.put<any>(this.url+"/api/proyectos/"+ id, proyectos);
  }


  public crearProyectos(proyectos: any):Observable<any>{
    return this.http.post<any>(this.url+"/api/proyectos", proyectos);
  }

  
  public eliminarProyectos(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"/api/proyectos/"+ id);
  }
}
