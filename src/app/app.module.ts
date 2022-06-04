import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxBootstrapModalComponent } from './ngx-bootstrap-modal/ngx-bootstrap-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentsListComponent } from './tournaments/components/list-of-tournaments/tournaments-list.component';
//import { ToastrService } from 'ngx-toastr';
import { TournamentCreateEditDialogComponent } from './tournaments/components/tournament-create-edit-dialog/tournament-create-edit-dialog.component';
import { TournamentDeleteDialogComponent } from './tournaments/components/tournament-delete-dialog/tournament-delete-dialog.component';
import { PlayersListComponent } from './players/components/list-of-players/players-list.component';
import { PlayerCreateEditDialogComponent } from './players/components/player-create-edit-dialog/player-create-edit-dialog.component';
import { PlayerDeleteDialogComponent } from './players/components/player-delete-dialog/player-delete-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NgxBootstrapModalComponent,
    TournamentsListComponent,
    TournamentCreateEditDialogComponent,
    TournamentDeleteDialogComponent,
    PlayersListComponent,
    PlayerCreateEditDialogComponent,
    PlayerDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //ToastrService,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
