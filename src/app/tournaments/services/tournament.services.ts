import { Injectable } from "@angular/core";
import { HttpClient, JsonpClientBackend } from "@angular/common/http";
import { observable, Observable } from "rxjs";

import { Tournament } from "../models/tournament.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class TournamentService {

    private mainApiUrl = 'http://localhost:3000/tournaments';

    searchedTour!: Tournament;

    constructor(public httpClient: HttpClient){ 
        //this.mainApiUrl = 'http://localhost:3000/tournaments';
    }

    getAll() : Observable<Tournament[]>{
        return this.httpClient.get<Tournament[]>(this.mainApiUrl);
    }

    getById(id: number) : Observable<Tournament> {
        
        const url = this.mainApiUrl + '/' + id;
        return this.httpClient.get<Tournament>(url);
    }

    create(tournament: Tournament) : Observable<Tournament>{

        tournament.created = new Date();
        tournament.lastUpdated = new Date();

        return this.httpClient.post<Tournament>(this.mainApiUrl, tournament);
    }

    update(tournament: Tournament) : Observable<Tournament>{
        
        tournament.lastUpdated = new Date();

        let url = this.mainApiUrl + '/' + tournament.id;

        return this.httpClient.put<Tournament>(url, tournament);
    }

    delete(id: number) : Observable<void>{

        let url = this.mainApiUrl + '/' + id;
        return this.httpClient.delete<void>(url);
    }

    save(tournament: Tournament): Observable<Tournament> {
        if (tournament.id) {
          return this.update(tournament);
        } else {
          return this.create(tournament);
        }
      }    
}