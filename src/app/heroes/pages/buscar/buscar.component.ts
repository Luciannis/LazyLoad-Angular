import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  constructor(private heroesService: HeroesService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  termino:string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  buscando(){
   this.heroesService.getSugerencias(this.termino.trim())
   .subscribe(heroes => this.heroes = heroes) 
  }
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe:Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesPorId(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe);
    
  }
}
