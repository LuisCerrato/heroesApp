import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';
import { HeroesModule } from '../../heroes.module';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/Dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get CurrentHeroe(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.CurrentHeroe.id) {
      this.heroesService.updateHero(this.CurrentHeroe).subscribe((hero) => {
        this.showSnackBar(`${hero.superhero}, uptaded!`);
      });

      return;
    }

    this.heroesService.addHero(this.CurrentHeroe).subscribe((hero) => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackBar(`${hero.superhero}, created!`);
    });
  }

  onDeleteHero() {
    if (!this.CurrentHeroe.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>
          this.heroesService.deleteHeroById(this.CurrentHeroe.id)
        ),
        filter((wasdeleted: boolean) => wasdeleted)
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });

    /* dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.heroesService
        .deleteHeroById(this.CurrentHeroe.id)
        .subscribe((wasDeleted) => {
          if (wasDeleted) this.router.navigate(['/heroes']);
        });
      console.log('deleteado');
      /* this.animal = result; 
    }); */
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
