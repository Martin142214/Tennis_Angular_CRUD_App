import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HomePageComponent } from './generalComponent/home-page.component';
import { PlayersListComponent } from './players/components/list-of-players/players-list.component';
import { TournamentsListComponent } from './tournaments/components/list-of-tournaments/tournaments-list.component';
import { TournamentCreateEditDialogComponent } from './tournaments/components/tournament-create-edit-dialog/tournament-create-edit-dialog.component';

const routes: Routes = [
  {
    path: 'tournaments',
    component: TournamentsListComponent  
  },
  {
    path: 'players',
    component: PlayersListComponent
  },
  {
    path: '',
    component: HomePageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  /*tournamentRoute: string = routes.find(obj => obj.path == 'tournaments')?.path || '';
  playerRoute = routes.find(obj => obj.path == 'players')?.path || '';
  
  getTourPath() : string{
    return this.tournamentRoute;
  }

  getPlayerPath() : string {
    return this.playerRoute;
  }*/
}
