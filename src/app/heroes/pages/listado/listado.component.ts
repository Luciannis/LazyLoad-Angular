import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  heroes: Heroe[] = [];
  constructor(private heroesService:HeroesService){}
    ngOnInit(): void {
      this.heroesService.getHores()
      .subscribe( r => {
        this.heroes = r;
      })
    }
  
}
