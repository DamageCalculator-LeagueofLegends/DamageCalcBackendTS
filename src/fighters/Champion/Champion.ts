import { Item } from '../../items/Item/Item';
import { RawChampion, Url } from '../../types/RawChampion/RawChampion';
import { Stats } from '../../types/RawChampion/Stats';
import { BasedOnLevelStats } from './stats/types/BasedOnLevelStats';
import { ChampionMissingHealthAmp } from './types/ChampionMissingHealthAmp';
import { ScalingValuesForChampAbilities } from './types/ScalingValuesForChampAbilities';
import { UtilInfo } from './types/UtilInfo';
import { BonusStats } from './stats/types/BonusStats';
import { TotalStats } from './stats/types/TotalStats';
import { getBonusStatsFromItems } from './stats/getBonusStatsFromItems';
import { getStatBasedOnLevel } from './stats/getStatBasedOnLevel';
import { getTotalStatsBasedOnSpeicalItemEffects } from './stats/getTotalStatsBasedOnSpeicalItemEffects';
import { getTotalStatsFromItems } from './stats/getTotalStatsFromItems';
import { getTotalStatsFromLevelStatsAndBonusStats } from './stats/getTotalStatsFromLevelStatsAndBonusStats';
import {
  setAttackSpeed,
  setAttackSpeedBasedOnLevel,
} from './stats/helperFunctions';
import { ChampionAbilities } from '../Ability/types/ChampionAbilities';
import { Ability } from '../Ability/Ability';
import { BoundsList } from '../Ability/types/Bounds';
import { AbilityDynamicData } from '../Ability/types/AbilityDynamicData';
import { Damage } from '../Damage/Damage';
import { DamageType } from '../../types/RawChampion/abilities/staticDataEnums';
import { FighterUnit } from '../Fighter/Fighter';
import { ActionConditions } from '../Ability/types/ActionConditions';

export class Champion extends FighterUnit {
  rawChampData: RawChampion;
  champID: number;
  champName: string;
  champIcon: Url;

  champLevel: number = 1;

  // weil attackspeed cringe
  attackSpeedRatio: number;

  champBasedOnLevelStats: BasedOnLevelStats | null = null;
  champBonusStats: BonusStats = {
    healthPoints: 0,
    mana: 0,
    armor: 0,
    magicResistance: 0,
    attackDamage: 0,
    attackSpeed: 0,
  };
  champTotalStats: TotalStats;

  champItems: Item[] = [];

  champUtilInfo: UtilInfo = {
    hasMythic: false,

    enemyMaxHealth: 0,
    enemyCurrentHealth: 0,

    baseHealthRegen: 0,
    baseManaRegen: 0,
  };
  champMissingHealthAmpInfo: ChampionMissingHealthAmp = {
    damageAmplifier: 0,
    perPercentage: 0,
    cappedAt: 0,
  };

  private _champBounds: BoundsList;
  champScalingValues: ScalingValuesForChampAbilities = {
    '% AD': 0,
    '% bonus AD': 0,
    '% AP': 0,
  };
  champAbilities: ChampionAbilities;

  constructor(rawChampData: RawChampion) {
    super('CHAMPION', true);
    this.rawChampData = rawChampData;
    this.champID = rawChampData.id;
    this.champName = rawChampData.name;
    this.champIcon = 'https://' + rawChampData.icon.substring(7);
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
    for (const ability in this.champAbilities) {
      this.champAbilities[ability]!.dynamicData.bounds = bounds[ability];
    }
    this._champBounds = bounds;
  }

  get champBounds() {
    return this._champBounds;
  }

  getStaticAbilityData(key: string): Ability {
    let ability: Ability = new Ability();
    const dynmaicData: AbilityDynamicData = {
      actionConditions: null,
      skillLevel: null,
      attributeIndicies: null,
      scalingValues: null,
    };
    const staticAbilityData = this.rawChampData.abilities[key];

    if (staticAbilityData) {
      ability.staticData = staticAbilityData;
    }
    ability.dynamicData = dynmaicData;
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

    this.champUtilInfo.baseHealthRegen = healthRegen.flat;
    this.champUtilInfo.baseManaRegen = manaRegen.flat;
    this.champBonusStats.attackSpeed = setAttackSpeedBasedOnLevel(
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
      this.champBonusStats!.attackSpeed
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

  setFightingStats() {
    this.combatStats = {
      totalHealth: this.champTotalStats.healthPoints,
      currentHealth: this.champTotalStats.healthPoints,
      armor: this.champTotalStats.armor,
      magicResistance: this.champTotalStats.magicResistance,
    };
  }

  configureChampionStatsBasedOnLevelAndItems() {
    this.setChampBasedOnLevelStats(this.rawChampData.stats);
    this.setChampBonusStats();
    this.setTotalStats();
    this.updateStatsBasedOnSpecialItems();
    this.setFightingStats();
    this.setChampScalingValues();
  }

  setChampScalingValues() {
    const { attackDamage, abilityPower } = this.champTotalStats;
    this.champScalingValues['% AD'] = attackDamage;
    this.champScalingValues['% AP'] = abilityPower;
    this.champScalingValues['% bonus AD'] = this.champBonusStats.attackDamage;

    this.champAbilities.Q.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.W.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.E.dynamicData.scalingValues = this.champScalingValues;
    this.champAbilities.R.dynamicData.scalingValues = this.champScalingValues;
  }

  setActionConditionsQ(actionConditions: ActionConditions) {
    this.champAbilities.Q.dynamicData.actionConditions = actionConditions;
  }

  setSkillLevelQ(skillLevel: number) {
    this.champAbilities.Q.dynamicData.skillLevel = skillLevel;
  }

  setActionConditionsW(actionConditions: ActionConditions) {
    this.champAbilities.W.dynamicData.actionConditions = actionConditions;
  }

  setSkillLevelW(skillLevel: number) {
    this.champAbilities.W.dynamicData.skillLevel = skillLevel;
  }

  setActionConditionsE(actionConditions: ActionConditions) {
    this.champAbilities.E.dynamicData.actionConditions = actionConditions;
  }

  setSkillLevelE(skillLevel: number) {
    this.champAbilities.E.dynamicData.skillLevel = skillLevel;
  }

  setActionConditionsR(actionConditions: ActionConditions) {
    this.champAbilities.R.dynamicData.actionConditions = actionConditions;
  }

  setSkillLevelR(skillLevel: number) {
    this.champAbilities.R.dynamicData.skillLevel = skillLevel;
  }

  autoAttack(): Damage[] {
    return [
      new Damage(DamageType.PHYSICAL_DAMAGE, this.champTotalStats.attackDamage),
    ];
  }

  passiveAction(): Damage[] {
    return [];
  }

  qAction(): Damage[] {
    return [];
  }

  wAction(): Damage[] {
    return [];
  }

  eAction(): Damage[] {
    return [];
  }

  rAction(): Damage[] {
    return [];
  }

  updateTotalBonusAndScalingValuesBasedOnANewValue(
    value: number,
    statName: string
  ) {
    this.champBonusStats[statName] += value;
    this.champTotalStats[statName] += value;
    this.setChampScalingValues();
  }
}
