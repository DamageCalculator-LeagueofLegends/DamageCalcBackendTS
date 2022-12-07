import { Item } from '../Item/Item';
import { RawChampion, Url } from '../RawChampion/RawChampion';
import { Stats } from '../RawChampion/Stats';
import { BasedOnLevelStats } from './stats/BasedOnLevelStats';
import { ChampionMissingHealthAmp } from './ChampionMissingHealthAmp';
import { ScalingValuesForChampAbilities } from './ScalingValuesForChampAbilities';
import { UtilInfo } from './UtilInfo';
import { BonusStats } from './stats/BonusStats';
import { TotalStats } from './stats/TotalStats';
import { getBonusStatsFromItems } from './stats/setStatsFunctions/getBonusStatsFromItems';
import { getStatBasedOnLevel } from './stats/setStatsFunctions/getStatBasedOnLevel';
import { getTotalStatsBasedOnSpeicalItemEffects } from './stats/setStatsFunctions/getTotalStatsBasedOnSpeicalItemEffects';
import { getTotalStatsFromItems } from './stats/setStatsFunctions/getTotalStatsFromItems';
import { getTotalStatsFromLevelStatsAndBonusStats } from './stats/setStatsFunctions/getTotalStatsFromLevelStatsAndBonusStats';
import {
  setAttackSpeed,
  setAttackSpeedBasedOnLevel,
} from './stats/setStatsFunctions/helperFunctions';
import { ChampionAbilities } from '../Ability/ChampionAbilities';
import { Ability } from '../Ability/Ability';
import { BoundsList } from '../Ability/dynamicAbilityData/Bounds';
import { AbilityDynamicData } from '../Ability/dynamicAbilityData/AbilityDynamicData';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../RawChampion/abilities/staticDataEnums';

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

  private _champBounds: BoundsList;
  champScalingValues: ScalingValuesForChampAbilities;
  champAbilities: ChampionAbilities;

  constructor(rawChampData: RawChampion) {
    this.rawChampData = rawChampData;
    this.champID = rawChampData.id;
    this.champName = rawChampData.name;
    this.champIcon = rawChampData.icon;
    this.attackSpeedRatio = rawChampData.stats.attackSpeedRatio.flat;
    this.champAbilities = {
      Q: this.getStaticAbilityData('Q'),
      W: this.getStaticAbilityData('W'),
      E: this.getStaticAbilityData('E'),
      R: this.getStaticAbilityData('R'),
    };
    this.champBounds = {
      Q: { lower: 0, upper: 4 },
      W: { lower: 0, upper: 4 },
      E: { lower: 0, upper: 4 },
      R: { lower: 0, upper: 2 },
    };
    this.configureChampionStatsBasedOnLevelAndItems();
  }

  set champBounds(bounds: BoundsList) {
    const { champAbilities } = this;
    for (const ability in champAbilities) {
      champAbilities[ability]!.dynamicData.bounds = bounds[ability];
    }

    this._champBounds = bounds;
  }

  get champBounds() {
    return this._champBounds;
  }

  getStaticAbilityData(key: string): Ability {
    let ability: Ability = new Ability();
    const staticAbilityData = this.rawChampData.abilities[key];

    if (staticAbilityData) {
      ability.staticData = staticAbilityData;
    }
    return ability;
  }

  setChampBasedOnLevelStats(baseStats: Stats) {
    const {
      health,
      healthRegen,
      mana,
      manaRegen,
      armor,
      magicResistance,
      attackDamage,
      attackSpeed,
    } = baseStats;

    const { champLevel, champUtilInfo, champBonusStats } = this;

    const stats: BasedOnLevelStats = {
      healthPoints: getStatBasedOnLevel(health, champLevel),
      healthPointsRegen: getStatBasedOnLevel(healthRegen, champLevel),
      mana: getStatBasedOnLevel(mana, champLevel),
      manaRegen: getStatBasedOnLevel(manaRegen, champLevel),
      armor: getStatBasedOnLevel(armor, champLevel),
      magicResistance: getStatBasedOnLevel(magicResistance, champLevel),
      attackDamage: getStatBasedOnLevel(attackDamage, champLevel),
    };

    champUtilInfo.baseHealthRegen = healthRegen.flat;
    champUtilInfo.baseManaRegen = manaRegen.flat;
    champBonusStats.attackSpeed = setAttackSpeedBasedOnLevel(
      attackSpeed.perLevel,
      champLevel
    );
    this.champBasedOnLevelStats = stats;
  }

  setChampBonusStats() {
    this.champBonusStats = getBonusStatsFromItems(
      this.champItems,
      this.champBonusStats.attackSpeed
    );
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
    this.setChampScalingValues();
  }

  setChampScalingValues() {
    const { attackDamage, abilityPower } = this.champTotalStats;
    this.champScalingValues.AD = attackDamage;
    this.champScalingValues.AP = abilityPower;
    this.champScalingValues['bonus AD'] = this.champBonusStats.attackSpeed;

    this.champAbilities.Q.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.W.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.E.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.R.dynamicData.scalingValues = this.champScalingValues;
  }

  setDynamicAbilityData(dynamicData: AbilityDynamicData) {
    this.champAbilities.Q.dynamicData = dynamicData;
    this.champAbilities.W.dynamicData = dynamicData;
    this.champAbilities.E.dynamicData = dynamicData;
    this.champAbilities.R.dynamicData = dynamicData;
  }

  autoAttack(): Damage | null {
    return new Damage(
      DamageType.PHYSICAL_DAMAGE,
      this.champTotalStats.attackDamage
    );
  }

  passiveAction(): Damage | null {return null}

  qAction(): Damage | null {return null}

  wAction(): Damage | null {return null}

  eAction(): Damage | null {return null}

  rAction(): Damage | null {return null}
}
