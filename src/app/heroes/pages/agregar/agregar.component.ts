import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }`] 
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]
  
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  
  constructor(private heroesService:HeroesService
              ,private activatedRoute:ActivatedRoute
              ,private router:Router
              ,private snackBar:MatSnackBar
              ,public dialog:MatDialog){}

  ngOnInit(): void{

     if(!this.router.url.includes('editar')){
      return;
     }
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroesService.getHeroesPorId(id))
    )
    .subscribe(hero => this.heroe = hero);    
  }
  guardar(){
    
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => {
        console.log("actualizando",heroe)
        this.mostrarSnackbar('Registro actualizado');
      })
    }else{
      //Crear
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id ]);
        this.mostrarSnackbar('Registro creado');
      })
    }
  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(r => {
      if(r){
        this.router.navigate(['/heroes']);
      }
  })

    // this.heroesService.borrarHeroe(this.heroe.id!)
    // .subscribe( r => {
    // this.router.navigate(['/heroes']);
    // })
  }

  mostrarSnackbar(msj:string){
    this.snackBar.open(msj,'OK!',{
      duration:2500
    })

  }
}
