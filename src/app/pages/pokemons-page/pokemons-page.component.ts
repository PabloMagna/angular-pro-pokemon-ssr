import {  ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default  class PokemonsPageComponent implements OnInit {

  #pokemonService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #title = inject(Title);

  public currentPage = toSignal<number>(
    this.#activatedRoute.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )

  ngOnInit(): void {
    this.loadPokemons(this.currentPage());
  }

  public loadPokemons(page = 0){
    const pageToLoad = this.currentPage()! + page;

    this.#pokemonService.loadPage(pageToLoad)
    .pipe(
      tap(() =>{
        this.#router.navigate([], {
          queryParams: { page: pageToLoad },
          queryParamsHandling: 'merge',
        });
      })
      , tap(() => {
        this.#title.setTitle(`Pokemons - Page ${pageToLoad}`);
      })
    )
    .subscribe(pokemons =>{
      this.pokemons.set(pokemons);
    });
  }
}
