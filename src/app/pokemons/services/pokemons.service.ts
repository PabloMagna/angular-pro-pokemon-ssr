import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  #http = inject(HttpClient);


  public loadPage(page: number): Observable<SimplePokemon[]> {
    if(page !== 0) {
      --page;
    }

    page = Math.max(0,page);

    return this.#http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
    ).pipe(
      map(resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => {
          const id = pokemon.url.split('/').at(-2) ?? '';
          return {
            name: pokemon.name,
            id: id,
          };
        });
        return simplePokemons;
      })
    )

  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.#http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    )
  }


}
