import { Tournament } from '../../models/tournament.model';
import { TournamentService } from '../../services/tournament.services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'um-tournament-delete-dialog',
  templateUrl: './tournament-delete-dialog.component.html',
  styleUrls: ['./tournament-delete-dialog.component.scss']
})
export class TournamentDeleteDialogComponent {

    tournament!: Tournament;

    tournamentDeleted = new EventEmitter<void>();

  constructor(private tournamentService: TournamentService,
              private bsModalRef: BsModalRef) {
  }

  deleteTournament(): void {
    this.tournamentService.delete(this.tournament.id).subscribe({
      next: () => {
        this.hideDialog();
        this.tournamentDeleted.emit();
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
