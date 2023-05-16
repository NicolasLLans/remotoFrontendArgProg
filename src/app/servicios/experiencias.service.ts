import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienciasService {

  
  public url=this.gservice.backUrl;
  constructor(private http:HttpClient,  private gservice:GeneralService) { }

  public editarExperiencia(id:number, experiencia:any):Observable<any>{
    return this.http.put<any>(this.url+"/api/experiencia/"+ id, experiencia);
  }


  public crearExperiencia(experiencia: any):Observable<any>{
    return this.http.post<any>(this.url+"/api/experiencia", experiencia);
  }

  
  public eliminarExperiencia(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"/api/experiencia/"+ id);
  }
}
