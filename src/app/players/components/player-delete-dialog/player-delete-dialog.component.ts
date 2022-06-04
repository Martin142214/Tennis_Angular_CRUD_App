import { Component, EventEmitter } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Player } from "../../models/player.model";
import { PlayerService } from "../../services/player.services";

@Component({
    selector: 'um-player-delete-dialog',
    templateUrl: './player-delete-dialog.component.html',
    styleUrls: ['./player-delete-dialog.component.scss']
  })
  export class PlayerDeleteDialogComponent {
  
    player!: Player;
  
    playerDeleted = new EventEmitter<void>();
  
    constructor(private playerService: PlayerService,
                private bsModalRef: BsModalRef) { }
  

      deleteTournament(): void {
        this.playerService.delete(this.player.id).subscribe({
        next: () => {
          this.hideDialog();
          this.playerDeleted.emit();
        }
      })
    }
                
      hideDialog(): void {
        this.bsModalRef.hide();
      }          
    }