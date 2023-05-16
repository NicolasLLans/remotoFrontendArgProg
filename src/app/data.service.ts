import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private miPorfolioSource = new BehaviorSubject<any>(null);
  miPorfolio$ = this.miPorfolioSource.asObservable();

  private misEducacionesSource = new BehaviorSubject<any>(null);
  misEducaciones$ = this.misEducacionesSource.asObservable();

  private misProyectosSource = new BehaviorSubject<any>(null);
  misProyectos$ = this.misProyectosSource.asObservable();

  private misSkillsSource = new BehaviorSubject<any>(null);
  misSkills$ = this.misSkillsSource.asObservable();

  private misExperienciasSource = new BehaviorSubject<any>(null);
  misExperiencias$ = this.misExperienciasSource.asObservable();

  constructor(private http:HttpClient, private generalService:GeneralService) {}

  setMiPorfolio(data: any) {
    this.miPorfolioSource.next(data);
  }

  setMisEducaciones(data: any) {
    this.misEducacionesSource.next(data);
  }

  setMisProyectos(data: any) {
    this.misProyectosSource.next(data);
  }

  setMisSkills(data: any) {
    this.misSkillsSource.next(data);
  }

  setMisExperiencias(data: any) {
    this.misExperienciasSource.next(data);
  }

  actualizarMisEducaciones(){
    this.generalService.obtenerInfoEdu().subscribe(data => {
      this.misEducacionesSource.next(data);
    });
  }

  actualizarMisExperiencias(){
    this.generalService.obtenerInfoExp().subscribe(data => {
      this.misExperienciasSource.next(data);
    });
  }

  actualizarMisSkills(){
    this.generalService.obtenerInfoSkills().subscribe(data => {
      this.misSkillsSource.next(data);
    });
  }

  actualizarMisProyectos(){
    this.generalService.obtenerInfoProy().subscribe(data => {
      this.misProyectosSource.next(data);
    });
  }
}