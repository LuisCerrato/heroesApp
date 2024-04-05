import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHeroes?: Hero;

  constructor(
    private heroesServices: HeroesServices
  ) {
  }

  searchHero() {

    const value: string = this.searchInput.value || '';

    this.heroesServices.getSuggestions(value)
      .subscribe(heroe => this.heroes = heroe);

  }

  onSelectedOption( event : MatAutocompleteSelectedEvent ) : void{


    if(!event.option.value){
      this.selectedHeroes = undefined;
      return;

    }


    const hero : Hero = event.option.value;

    this.searchInput.setValue(hero.superhero);

    this.selectedHeroes = hero
  }

}
