import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Player } from "../../models/player.model";
import { PlayerService } from "../../services/player.services";
import { PlayerCreateEditDialogComponent } from "../player-create-edit-dialog/player-create-edit-dialog.component";
import { PlayerDeleteDialogComponent } from "../player-delete-dialog/player-delete-dialog.component";

@Component({
    selector: 'um-players-list',
    templateUrl: './players-list.component.html',
    styleUrls: ['./players-list.component.scss']
  })
  export class PlayersListComponent implements OnInit {
  
    isGridView: boolean = false;
  
    players: Player[] = [];
  
    modalRef!: BsModalRef;
    
    constructor(
        public playerService: PlayerService,
        public bsModalService: BsModalService	
    ) { }
  
    ngOnInit(): void {
        this.getAll();
    }
  
    onEditClick(player?: Player): void {
      this.modalRef = this.bsModalService.show(PlayerCreateEditDialogComponent, {
        initialState: {
          player: player
        }
      });
  
      if (this.modalRef.content) {
        this.modalRef.content.saved.subscribe({
          next: () => {
            this.playerService.getAll();
          }
        });
      }
    }
  
    
    changeView(){
      this.isGridView = !this.isGridView;
    }
  
    onCreateClick() : void {
        //this.onEditClick();
        this.bsModalService.show(PlayerCreateEditDialogComponent);
    }
  
    onDeleteClick(player: Player) : void {
  
      const ref = this.bsModalService.show(PlayerDeleteDialogComponent, {
          initialState: {
              player: player
          }
      })
  
      if(ref.content){
          ref.content.playerDeleted.subscribe({
              next: () => {
                  this.getAll();
              }
          })
      }
    }
  
    getAll() : void {
        this.playerService.getAll().subscribe({
            next: (response) => {
                this.players = response;
            }
        })
    }
  }