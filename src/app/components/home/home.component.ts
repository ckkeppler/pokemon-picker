import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Pokemon, PokemonResult } from 'src/app/models/pokemon.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public urlIdLookup: any;
  public pokemons: PokemonResult[] = [];
  public text: string = '';
  public filteredPokemon: PokemonResult[] = [];
  public results: PokemonResult[] = [];

  subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subscription = this.initPokemonData().subscribe((res) => {
      this.pokemons = this.filteredPokemon = res;
    });
  }

  private initPokemonData(): Observable<any> {
    return this.http
      .get<Pokemon>('https://pokeapi.co/api/v2/pokemon?offset=0')
      .pipe(
        pluck('results'),
        tap((results: PokemonResult[]) => {
          this.urlIdLookup = results.reduce(
            (accumulator, currentValue, index) =>
              (accumulator = { ...accumulator, [currentValue.name]: index + 1 })
          );
        })
      );
  }

  public onChange(updatedValue: string): void {
    console.log(this.filteredPokemon);

    this.filteredPokemon = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(updatedValue)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
