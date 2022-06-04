import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tournament } from '../../models/tournament.model';
import { TournamentService } from '../../services/tournament.services';
import { TournamentCreateEditDialogComponent } from '../tournament-create-edit-dialog/tournament-create-edit-dialog.component';
import { TournamentDeleteDialogComponent } from '../tournament-delete-dialog/tournament-delete-dialog.component';
import { NgxBootstrapModalComponent } from 'src/app/ngx-bootstrap-modal/ngx-bootstrap-modal.component';
import { Player } from 'src/app/players/models/player.model';
import { PlayerService } from 'src/app/players/services/player.services';

@Component({
  selector: 'um-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  isGridView: boolean = false;

  tournaments: Tournament[] = [];

  players: Player[] = [];

  modalRef!: BsModalRef;
  constructor(
      public tournamentService: TournamentService,
      public bsModalService: BsModalService,
      public playerService: PlayerService	
  ) { }

  ngOnInit(): void {
      this.getAll();
      this.getAllPlayersForTour();
  }

  onEditClick(tournament?: Tournament): void {
    this.modalRef = this.bsModalService.show(TournamentCreateEditDialogComponent, {
      initialState: {
        tournament: tournament
      }
    });

    if (this.modalRef.content) {
      this.modalRef.content.saved.subscribe({
        next: () => {
          this.tournamentService.getAll();
        }
      });
    }
  }

  
  changeView(){
    this.isGridView = !this.isGridView;
  }

  onCreateClick() : void {
      //this.onEditClick();
      this.bsModalService.show(TournamentCreateEditDialogComponent);
  }

  onDeleteClick(tournament: Tournament) : void {

    console.log("Tour to delete:");
    console.log(tournament);

    const ref = this.bsModalService.show(TournamentDeleteDialogComponent, {
        initialState: {
            tournament: tournament
        }
    })

    if(ref.content){
        ref.content.tournamentDeleted.subscribe({
            next: () => {
                this.getAll();
            }
        })
    }
  }

  getAll() : void {
      this.tournamentService.getAll().subscribe({
          next: (response) => {
              this.tournaments = response;
          }
      })
  }

  getAllPlayersForTour(){
      this.playerService.getAll().subscribe({
          next: (response) => {
              this.players = response;
          }
      })
  }
}
