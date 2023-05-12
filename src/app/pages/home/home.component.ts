import { Component, OnInit, ElementRef } from '@angular/core';

import { PokemonService } from 'src/app/pokemon.service';
import { PokemonData } from 'src/app/pokemonData';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  pokemons: PokemonData[] = []; // Array para armazenar a lista de Pokémons
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private service: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.service.getAllPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        console.log(this.pokemons);
      },
      error: (err) => console.log('404'),
    });
  }
}