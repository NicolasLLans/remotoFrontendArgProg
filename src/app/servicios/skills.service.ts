import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills:any;
  public url=this.gservice.backUrl;
  constructor(private http:HttpClient, private gservice:GeneralService) { }

  public editarSkills(id:number, skills:any):Observable<any>{
    return this.http.put<any>(this.url+"/api/skills/"+ id, skills);
  }


  public crearSkills(skills: any[]):Observable<any[]>{
    return this.http.post<any[]>(this.url+"/api/skills", skills);
  }

  
  public eliminarSkills(id:number):Observable<void>{
    return this.http.delete<void>(this.url+"/api/skills/"+ id);
  }
}
