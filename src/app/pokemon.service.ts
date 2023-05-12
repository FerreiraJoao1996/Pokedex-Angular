import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { PokemonData} from '../app/pokemonData'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  }

  getAllPokemons(): Observable<PokemonData[]> {
    const url = `${this.baseUrl}?limit=20`; // Defina o limite como necessário

    return this.http.get<any>(url).pipe(
      switchMap((response) => {
        const pokemonUrls: string[] = response.results.map(
          (pokemon: any) => pokemon.url
        );
        const pokemonRequests: Observable<PokemonData>[] = pokemonUrls.map(
          (url: string) => this.getPokemonDetails(url)
        );
        return forkJoin(pokemonRequests);
      })
    );
  }

  getPokemonDetails(url: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(url);
  }
}
