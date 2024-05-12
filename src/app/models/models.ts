export interface Player {
    id: number;
    name: string;
    money:number;
}

export interface Card {
    id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    cost: number;
    imageUrl: string;
    cardPowers:CardPower[];
    rarityId: number;
    rarity: Rarity;
}

export interface MatchData {
    match:Match;
    playerA: Player;
    playerB: Player;
    winningPlayerId:number;
}

export interface Match {
    id: number;
    isMatchCompleted: boolean;
    isPlayerATurn: boolean;
    playerDataA: PlayerData;
    playerDataB: PlayerData;
}

export interface PlayableCard {
    id: number;
    card: Card;
    health: number;
}

export interface PlayerData {
    id:number;
	health: number;
    maxhealth: number;
    mana: number;
    playerId: number;
    playerName: string;
    cardsPile: PlayableCard[];
    hand: PlayableCard[];
    battleField: PlayableCard[];
    graveyard: PlayableCard[];
}

export interface Deck {
    id:number;
    name:string;
    playerId:number;
    player:Player;
    cards:OwnedCard[];
    isActive:boolean;
}

export interface DeckCard {
    id:number;
    cardId:number;
    deckId:number;
    card:Card;
    deck:Deck;
}

export interface Paquet {
    id:number;
    type:string;
    cout:number;
    urlImage:string;
    nombreCarte:number;
}

export interface Power {
    FIRST_STRIKE_ID: 1;
    THORNS_ID: 2;
    HEAL_ID: 3;

    id:number;
    name:string;
    description:string;
    icon:string;
}

export interface Rarity {
    id:number;
    name:string;
    couleur:number;
}

export interface CardPower {
    id:number;
    value:number;
    card:Card;
    power:Power;
}

export interface PaquetRarity {
    id:number;
    rarityId:number;
    paquetId:number;
    odds:number;
    minimum:number;
    rarity:Rarity;
    paquet:Paquet;
}

export interface OwnedCard{
  id:number;
  card:Card;
}

export interface MatchInfo{
  matchId:number;
  playerAUsername:string;
  playerBUsername:string;
}

export interface Message{
  playerName:string;
  message:string;
}
