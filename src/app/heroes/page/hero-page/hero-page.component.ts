import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {



  public heroes ?: Hero;

  constructor(

    private  heroesServices : HeroesServices,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {

  }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesServices.getHeroesById(id))

    ).subscribe(
      heroe => {
      if(!heroe) return this.router.navigate(['/heroes.list']);

      this.heroes = heroe;

      console.log(this.heroes);
      return;

    }
    )

  }

}
