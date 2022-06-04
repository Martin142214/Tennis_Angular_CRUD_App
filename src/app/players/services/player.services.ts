import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, JsonpClientBackend } from "@angular/common/http";
import { observable, Observable } from "rxjs";

import { Player } from "../models/player.model";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class PlayerService {

    private mainApiPlayersUrl = 'http://localhost:3000/players';

    constructor(private httpClient: HttpClient){ }

    getById(id: Number) : Observable<Player> {
        
        const url = this.mainApiPlayersUrl + '/' + id;
        return this.httpClient.get<Player>(url);
    }

    getAll() : Observable<Player[]> {
        let httpParams = new HttpParams({
            fromObject: {
                _expand: 'tournament'
            }
        });
        
        return this.httpClient.get<Player[]>(this.mainApiPlayersUrl,{
            params: httpParams
        });
    }

    create(player: Player): Observable<Player> {
    
        player.created = new Date();
        player.lastUpdated = new Date();
    
        return this.httpClient.post<Player>(this.mainApiPlayersUrl, player);
    }

    update(player: Player): Observable<Player> {
        
        const url = this.mainApiPlayersUrl + '/' + player.id;
        player.lastUpdated = new Date();
    
        return this.httpClient.patch<Player>(url, player);
    }

    save(player: Player) : Observable<Player> {

        if(player.id){
            return this.update(player);
        }
        else{
            return this.create(player);
        }
    }
    
    delete(id: Number) : Observable<void> {

        const url = this.mainApiPlayersUrl + '/' + id;

        return this.httpClient.delete<void>(url);
    }

}