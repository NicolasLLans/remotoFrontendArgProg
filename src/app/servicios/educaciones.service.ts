import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class EducacionesService {

  public url=this.gservice.backUrl;
  constructor(private http:HttpClient,  private gservice:GeneralService) { }

  public editarEducacion(id:number, educacion:any):Observable<any>{
    return this.http.put<any>(this.url+"/api/educacion/"+ id, educacion);
  }


  public crearEducacion(educacion: any):Observable<any>{
    return this.http.post<any>(this.url+"/api/educacion", educacion);
  }

  
  public eliminarEducacion(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"/api/educacion/"+ id);
  }
}
