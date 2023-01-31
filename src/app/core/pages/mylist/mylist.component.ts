import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  hasCharacters: boolean = false;
  heroes: Heroe[] = [];

  constructor(private heroesService:HeroesService) {}

  ngOnInit(): void {
    this.heroes = JSON.parse(localStorage.getItem('listHeroes') || '[]');
    this.hasCharacters = !!this.heroes.length;
  }

  buscarHeroe(value: string) {

    let heroesFiltered: Heroe[] = [];
    value = value.toLowerCase();

    this.heroesService.getListHeroes()
      .subscribe({
        next: (response) => {
          for (let h of response.data.results) {
            let heroeName = h.name.toLowerCase();

            if(heroeName.indexOf(value) >= 0) {
              heroesFiltered.push(h);
            }
          }
          this.heroes = heroesFiltered;
        }
      });
  }
}
