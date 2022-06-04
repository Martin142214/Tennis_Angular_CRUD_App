import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TournamentService } from '../../services/tournament.services';
import { Tournament } from '../../models/tournament.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'um-category-edit-dialog',
    templateUrl: './tournament-create-edit-dialog.component.html',
    styleUrls: ['./tournament-create-edit-dialog.component.scss']
  })
  export class TournamentCreateEditDialogComponent implements OnInit {

    surfaceList: any = ['Clay', 'Hard', 'Grass'];  

    formGroup!: FormGroup;

    tournament!: Tournament;

    saved = new EventEmitter<Tournament>();

    
    constructor(
        public tournamentService: TournamentService,
        public bsModalRef: BsModalRef,
        public fb: FormBuilder
      ) { }
    
      ngOnInit(): void {
        this.buildForm();
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
            const tournament: Tournament = {
                ...this.tournament,
                ...this.formGroup.value
            }
            
            //console.log(tournament);
            this.tournamentService.save(tournament).subscribe({
                next: (response) => {
                    this.saved.emit(response);
                    //this.toastrService.success('Tournament data sucessfully saved!', 'Success')
                    this.hideDialog();
                    this.refresh();
                }
            })
        }
        
        buildForm() : void{
            
          if(!this.tournament){
              this.tournament = new Tournament();
          }
  
          //this.formGroup = this.fb.group({
            this.formGroup = this.fb.group({
              name: [this.tournament.name, [Validators.required, Validators.minLength(5)]],
              location: [this.tournament.location, [Validators.required, Validators.minLength(2)]],
              awardPoints: [this.tournament.awardPoints, [Validators.required, Validators.min(250), Validators.max(1500)]],
              surface: [this.tournament.surface, [Validators.required, Validators.minLength(3)]],
              prizeMoney: [this.tournament.prizeMoney, [Validators.required, Validators.min(50000), Validators.max(2000000)]],
              isGrandSlam: [this.tournament.isGrandSlam, [Validators.required]]
          });
        }
  }
  