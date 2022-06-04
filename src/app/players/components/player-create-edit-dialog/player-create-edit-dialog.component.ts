import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Player } from "../../models/player.model";
import { PlayerService } from "../../services/player.services";
import { TournamentService } from "src/app/tournaments/services/tournament.services";
import { Tournament } from "src/app/tournaments/models/tournament.model";

@Component({
    selector: 'um-player-edit-dialog',
    templateUrl: './player-create-edit-dialog.component.html',
    styleUrls: ['./player-create-edit-dialog.component.scss']
  })
  export class PlayerCreateEditDialogComponent implements OnInit {

    formGroup!: FormGroup;

    player!: Player;

    tournaments!: Tournament[];

    saved = new EventEmitter<Player>();

    
    constructor(
        public playerService: PlayerService,
        public tournamentService: TournamentService,
        public bsModalRef: BsModalRef,
        public fb: FormBuilder
      ) { }
    
      ngOnInit(): void {
        this.buildForm();
        this.getTournaments();
      }

      //to add the refresh on the same view selected
      refresh(): void {
            window.location.reload();
      }
      
      /*get f(){
          return this.formGroup.controls;
        }*/
        
        hideDialog() : void {
            this.bsModalRef.hide();
        }
        
        onSubmit() : void {
            if(this.formGroup.invalid){
                this.formGroup.markAllAsTouched();
                return;
            }

            //this.formGroup.get('isGrandSlam')?.value == 'true'
            const player: Player = {
                ...this.player,
                ...this.formGroup.value
            }
            
            this.playerService.save(player).subscribe({
                next: (response) => {
                    this.saved.emit(response);
                    //this.toastrService.success('Tournament data sucessfully saved!', 'Success')
                    this.hideDialog();
                    this.refresh();
                }
            })
        }

        private getTournaments(): void {
            this.tournamentService.getAll().subscribe({
              next: (response) => {
                this.tournaments = response;
              }
            })
          }
        
        
        buildForm() : void{
            
          if(!this.player){
              this.player = new Player();
          }

            this.formGroup = this.fb.group({
                firstName: [this.player.firstName, [Validators.required, Validators.minLength(3)]],
                lastName: [this.player.lastName, [Validators.required, Validators.minLength(3)]],
                country: [this.player.country, [Validators.required, Validators.minLength(3)]],
                dateOfBirth: [this.player.dateOfBirth, [Validators.required]],
                careerTitles: [this.player.careerTitles, [Validators.required, Validators.min(0)]],
                currentRanking: [this.player.currentRanking, [Validators.required, Validators.min(1), Validators.max(500)]],
                tournamentId: [this.player.tournamentId, Validators.required],
          });
        }
  }