import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personas } from '../modelos/personas';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  persona:Personas | undefined;
  public url=this.gservice.backUrl;
  constructor(private http:HttpClient, private gservice:GeneralService) { }

  public editarPersona(id:number, persona:Personas):Observable<Personas>{
    return this.http.put<Personas>(this.url+"/api/personas/"+ id, persona);
  }


  // public crearPersona(persona: Personas):Observable<Personas>{
  //   return this.http.post<Personas>("http://localhost:8080/api/personas", persona);
  // }

  
  // public eliminarPersona(id:number):Observable<void>{
  //   return this.http.delete<void>("http://localhost:8080/api/personas/"+ id);
  // }
}
