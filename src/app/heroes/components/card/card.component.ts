import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input() public hero !: Hero;

  constructor(
    private heroes: HeroesServices
  ) {

  }


  ngOnInit(): void {

    if(!this.hero) throw Error('Hero property is required')


  }



}
