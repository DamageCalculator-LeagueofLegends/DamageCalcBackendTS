import { addToChampWhitelist } from '..';
import { OverallDamageData } from '../types/FrontendData/FrontendData';
import { Battle } from './Battle';
import { Champion } from '../fighters/Champion/Champion';
import { listOfChampions } from '../fighters/championList';
import { Dummy } from '../fighters/Dummy/Dummy';
import { FighterStats } from '../fighters/Fighter/Fighter';
import {
  AbilityNames,
  ActionAndConditions,
  FrontendData,
} from '../types/FrontendData/FrontendData';
import { Item } from '../items/Item';
import { listOfItems } from '../items/itemList';

export class Simulation {
  frontendInput: FrontendData;
  participants: Record<number, Champion | Dummy> = {};
  champAbilityUsage: ActionAndConditions[];
  uniqueKey = 0;
  battleground = new Battle();

  constructor(input: FrontendData) {
    this.frontendInput = input;
  }

  setData(input: FrontendData) {
    this.frontendInput = input;
  }

  async addParticipants() {
    const champions = await listOfChampions;
    const items = await listOfItems;
    for (const participant of this.frontendInput.participants) {
      if (participant.type === 'CHAMPION') {
        const champion = champions.find(
          (champion) => champion.champID === participant.championID
        )!;
        const tempItemList: Item[] = [];
        for (const item of participant.listOfItemIDs) {
          if (item !== 0) {
            tempItemList.push(
              items.find((currItem) => currItem.itemID === item)!
            );
          }
        }
        champion.champItems = tempItemList;
        champion.champLevel = participant.championLevel;
        champion.setSkillLevelQ(participant.abilityLevel.Q);
        champion.setSkillLevelW(participant.abilityLevel.W);
        champion.setSkillLevelE(participant.abilityLevel.E);
        champion.setSkillLevelR(participant.abilityLevel.R);
        champion.configureChampionStatsBasedOnLevelAndItems();
        this.champAbilityUsage = participant.listOfActions;

        this.participants[this.uniqueKey] = champion;
      } else if (participant.type === 'DUMMY') {
        const tempDummyStats: FighterStats = {
          totalHealth: participant.health,
          armor: participant.armor,
          magicResistance: participant.magicResistance,
        };
        this.participants[this.uniqueKey] = new Dummy(tempDummyStats);
      }
      this.uniqueKey++;
    }
  }

  executeBatlle(): OverallDamageData {
    let champion: Champion | null = null;
    let dummy: Dummy | null = null;
    this.battleground.setParticipants(this.participants);
    for (const [key, participant] of Object.entries(this.participants)) {
      if (participant.tpye === 'CHAMPION') {
        champion = participant as Champion;
      } else if (participant.tpye === 'DUMMY') {
        dummy = participant as Dummy;
      }
    }
    if (champion && dummy) {
      for (const ability of this.champAbilityUsage) {
        if (ability.ability === 'AA') {
          this.battleground.round(champion, dummy, AbilityNames.AA);
        } else if (ability.ability === 'Q') {
          if (ability.conditions) {
            champion.setActionConditionsQ(ability.conditions);
            addToChampWhitelist(champion);
          }
          this.battleground.round(champion, dummy, AbilityNames.Q);
        } else if (ability.ability === 'W') {
          if (ability.conditions) {
            champion.setActionConditionsW(ability.conditions);
          }
          this.battleground.round(champion, dummy, AbilityNames.W);
        } else if (ability.ability === 'E') {
          if (ability.conditions) {
            champion.setActionConditionsE(ability.conditions);
          }
          this.battleground.round(champion, dummy, AbilityNames.E);
        } else if (ability.ability === 'R') {
          if (ability.conditions) {
            champion.setActionConditionsR(ability.conditions);
          }
          this.battleground.round(champion, dummy, AbilityNames.R);
        }
      }
    }
    return this.battleground.calcData;
  }
}
