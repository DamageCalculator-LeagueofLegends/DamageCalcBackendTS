import { Item } from '../Item/Item';
import { RawChampion, Url } from '../RawChampion/RawChampion';
import { Stats } from '../RawChampion/Stats';
import { BasedOnLevelStats } from './stats/BasedOnLevelStats';
import { ChampionMissingHealthAmp } from './ChampionMissingHealthAmp';
import { ScalingValuesForChampAbilities } from './ScalingValuesForChampAbilities';
import { UtilInfo } from './UtilInfo';
import { BonusStats } from './stats/BonusStats';
import { TotalStats } from './stats/TotalStats';
import { StaticAbilities } from '../RawChampion/abilities/StaticAbilities';
import { AbilityDynamicData } from './AbilityDynamicData';
import { getBonusStatsFromItems } from './stats/setStatsFunctions/getBonusStatsFromItems';
import { getStatBasedOnLevel } from './stats/setStatsFunctions/getStatBasedOnLevel';
import { getTotalStatsBasedOnSpeicalItemEffects } from './stats/setStatsFunctions/getTotalStatsBasedOnSpeicalItemEffects';
import { getTotalStatsFromItems } from './stats/setStatsFunctions/getTotalStatsFromItems';
import { getTotalStatsFromLevelStatsAndBonusStats } from './stats/setStatsFunctions/getTotalStatsFromLevelStatsAndBonusStats';
import {
  setAttackSpeed,
  setAttackSpeedBasedOnLevel,
} from './stats/setStatsFunctions/helperFunctions';

export abstract class Champion {
  rawChampData: RawChampion;
  champID: number;
  champName: string;
  champIcon: Url;

  champLevel: number = 1;

  // weil attackspeed cringe
  attackSpeedRatio: number;


  champBasedOnLevelStats: BasedOnLevelStats;
  champBonusStats: BonusStats;
  champTotalStats: TotalStats;

  champItems: Item[];

  champUtilInfo: UtilInfo;
  champMissingHealthAmpInfo: ChampionMissingHealthAmp;

  champStaticAbilityData: StaticAbilities;
  champDynmicAbilityData: AbilityDynamicData;
  champScalingValues: ScalingValuesForChampAbilities;

  constructor(rawChampData: RawChampion) {
    this.rawChampData = rawChampData;
    this.champID = rawChampData.id;
    this.champName = rawChampData.name;
    this.champIcon = rawChampData.icon;
    this.attackSpeedRatio = rawChampData.stats.attackSpeedRatio.flat;
    this.champStaticAbilityData = rawChampData.abilities;
  }

  setChampBasedOnLevelStats(baseStats: Stats) {
    let stats: BasedOnLevelStats = {
      healthPoints: getStatBasedOnLevel(baseStats.health, this.champLevel),
      healthPointsRegen: getStatBasedOnLevel(
        baseStats.healthRegen,
        this.champLevel
      ),
      mana: getStatBasedOnLevel(baseStats.mana, this.champLevel),
      manaRegen: getStatBasedOnLevel(baseStats.manaRegen, this.champLevel),
      armor: getStatBasedOnLevel(baseStats.armor, this.champLevel),
      magicResistance: getStatBasedOnLevel(
        baseStats.magicResistance,
        this.champLevel
      ),
      attackDamage: getStatBasedOnLevel(
        baseStats.attackDamage,
        this.champLevel
      ),
    };
    this.champUtilInfo.baseHealthRegen = baseStats.healthRegen.flat;
    this.champUtilInfo.baseManaRegen = baseStats.manaRegen.flat;
    this.champBonusStats.attackSpeed = setAttackSpeedBasedOnLevel(
      baseStats.attackSpeed.perLevel,
      this.champLevel
    );
    this.champBasedOnLevelStats = stats;
  }

  setChampBonusStats() {
    // TODO items still need to be implemented and not be a string
    let stats = getBonusStatsFromItems(
      this.champItems,
      this.champBonusStats.attackSpeed
    );
    this.champBonusStats = stats;
  }

  setTotalStats() {
    let stats: TotalStats = getTotalStatsFromItems(
      this.champItems,
      this.champUtilInfo
    );
    stats = getTotalStatsFromLevelStatsAndBonusStats(
      this.champBasedOnLevelStats,
      this.champBonusStats,
      stats
    );
    stats.attackSpeed = setAttackSpeed(
      this.rawChampData.stats.attackSpeed.flat,
      this.attackSpeedRatio,
      this.champBonusStats.attackSpeed
    );
    this.champTotalStats = stats;
  }

  updateStatsBasedOnSpecialItems() {
    const updatedStats = getTotalStatsBasedOnSpeicalItemEffects(
      this.champItems,
      this.champBasedOnLevelStats,
      this.champBonusStats,
      this.champTotalStats
    );

    const hasUpdatedStats = updatedStats != null;

    if (hasUpdatedStats) {
      this.champBonusStats = updatedStats.bonusStats;
      this.champTotalStats = updatedStats.totalStats;
    }
  }

  configureChampionStatsBasedOnLevelAndItems() {
    this.setChampBasedOnLevelStats(this.rawChampData.stats);
    this.setChampBonusStats();
    this.setTotalStats();
    this.updateStatsBasedOnSpecialItems();
  }

  autoAttack(){

  }

  q_action(){

  }

  w_action(){

  }

  e_action(){

  }

  r_action(){

  }
  
}
