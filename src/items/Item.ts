import { ActionConditions } from '../types/ability/ActionConditions';
import { ScalingValuesForChampAbilities } from '../types/champion/ScalingValuesForChampAbilities';
import { Damage } from '../fighters/Damage/Damage';
import { Url } from '../types/RawChampion/RawChampion';
import { ItemStats } from '../types/RawItem/ItemStats';
import { Passive } from '../types/RawItem/Passive';
import { RawItem } from '../types/RawItem/RawItem';
import { ItemDynamicData } from '../types/item/ItemDynamicData';

export abstract class Item {
  itemID: number;
  itemName: string;
  itemIcon: Url;

  isLegendary: boolean = false;
  isMythic: boolean = false;
  hasActive: boolean = false;
  isUnique: boolean = false;

  itemStats: ItemStats;
  mythicStats: ItemStats;

  dynamicData: ItemDynamicData;

  constructor(rawItem: RawItem) {
    this.itemID = rawItem.id;
    this.itemName = rawItem.name;
    this.itemIcon = rawItem.icon;

    this.itemStats = rawItem.stats;

    this.setMythicStats(rawItem.passives);
  }

  setDynamicData(dynamicData: ItemDynamicData) {
    this.dynamicData = dynamicData;
  }

  setMythicStats(itemPassives: Passive[]) {
    if (itemPassives?.length) {
      for (const passive of itemPassives) {
        if (passive.mythic === true) {
          this.mythicStats = passive.stats;
        }
      }
    }
  }

  updateScalingValues(scalingValues: ScalingValuesForChampAbilities) {
    this.dynamicData.scalingValues = scalingValues;
  }

  updateActionConditions(actionConditions: ActionConditions) {
    this.dynamicData.actionConditions = actionConditions;
  }

  updateEnemyMaxHealth(enemyMaxHealth: number) {
    this.dynamicData.enemyMaxHealth = enemyMaxHealth;
  }

  passiveDmg(): Damage[] {
    return [];
  }
}
