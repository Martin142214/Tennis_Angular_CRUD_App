import { Tournament } from "src/app/tournaments/models/tournament.model";

export class Player{
    id!: number;
    firstName!: string;
    lastName!: string;
    country!: string;
    dateOfBirth!: Date;
    careerTitles!: number;
    currentRanking!: number;

    created!: Date;
    lastUpdated!: Date;

    tournamentId!: number;
    tournament!: Tournament;
}