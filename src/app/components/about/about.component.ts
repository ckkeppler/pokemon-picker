import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Pokemon, PokemonInfo } from 'src/app/models/pokemon.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private router: ActivatedRoute, private http: HttpClient) {}
  public pokemon$?: Observable<PokemonInfo>;
  private routeId: string = '';

  routeParam: string = '';

  ngOnInit() {
    this.routeId = this.router.snapshot.params.id;
    this.initPokemonData();
  }

  initPokemonData() {
    this.pokemon$ = this.http.get<PokemonInfo>(
      `https://pokeapi.co/api/v2/pokemon/${this.routeId}`
    );
  }
}
