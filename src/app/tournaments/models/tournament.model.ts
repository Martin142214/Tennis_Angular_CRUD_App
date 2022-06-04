import { Player } from "src/app/players/models/player.model";

export class Tournament{
    id!: number;
    name!: string;
    location!: string;
    //startDate!: Date;
    //endDate!: Date;
    awardPoints!: number;
    surface!: string;
    prizeMoney!: number;
    isGrandSlam!: boolean;
    isCurrentlyTakingPlace!: boolean;
    
    created!: Date;
    lastUpdated!: Date;

    players!: Player[];
}