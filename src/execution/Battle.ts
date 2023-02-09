import { OverallDamageData } from '../types/FrontendData/FrontendData';
import { Champion } from '../fighters/Champion/Champion';
import { Damage } from '../fighters/Damage/Damage';
import { Dummy } from '../fighters/Dummy/Dummy';
import { FighterStats, FighterUnit } from '../fighters/Fighter/Fighter';
import { AbilityNames } from '../types/FrontendData/FrontendData';

export class Battle {
  participants: Record<string, Champion | Dummy>;
  calcData: OverallDamageData = {
    totalDamge: 0,
    trueDamage: 0,
    physicalDamage: 0,
    magicDamage: 0,
    abilityDamage: [],
  };

  constructor() {}

  setParticipants(participants: Record<string, Champion | Dummy>) {
    this.participants = participants;
  }

  round(attacker: Champion, defender: FighterUnit, actionName: AbilityNames) {
    attacker.champUtilInfo.enemyMaxHealth = defender.combatStats.totalHealth;
    attacker.champUtilInfo.enemyCurrentHealth =
      defender.combatStats.currentHealth!;
    let damageList: Damage[] = [];
    if (actionName === 'AA') {
      damageList = calculateDmgBasedOnDefenderStats(
        defender.combatStats,
        attacker.autoAttack()
      );
    } else if (actionName === 'Q') {
      damageList = calculateDmgBasedOnDefenderStats(
        defender.combatStats,
        attacker.qAction()
      );
    } else if (actionName === 'W') {
      damageList = calculateDmgBasedOnDefenderStats(
        defender.combatStats,
        attacker.wAction()
      );
    } else if (actionName === 'E') {
      damageList = calculateDmgBasedOnDefenderStats(
        defender.combatStats,
        attacker.eAction()
      );
    } else if (actionName === 'R') {
      damageList = calculateDmgBasedOnDefenderStats(
        defender.combatStats,
        attacker.rAction()
      );
    }
    let entireActionDamage = 0;
    for (const damage of damageList) {
      entireActionDamage += damage.value;
      if (damage.type === 'TRUE_DAMAGE') {
        this.calcData.trueDamage += damage.value;
      } else if (damage.type === 'PHYSICAL_DAMAGE') {
        this.calcData.physicalDamage += damage.value;
      } else if (damage.type === 'MAGIC_DAMAGE') {
        this.calcData.magicDamage += damage.value;
      }
    }
    this.calcData.abilityDamage.push({
      type: actionName,
      value: entireActionDamage,
    });
    this.calcData.totalDamge += entireActionDamage;
    defender.combatStats.currentHealth! -= entireActionDamage;
  }
}

function calculateDmgBasedOnDefenderStats(
  combatStats: FighterStats,
  damages: Damage[]
): Damage[] {
  // this is a specific formel from LOL
  const physicalDamageMultiplier = 100 / (100 + combatStats.armor);
  const magicDamageMultiplier = 100 / (100 + combatStats.magicResistance);
  const damageList: Damage[] = [];
  for (const damage of damages) {
    if (damage.type === 'TRUE_DAMAGE') {
      damageList.push(new Damage(damage.type, damage.value));
    } else if (damage.type === 'PHYSICAL_DAMAGE') {
      damageList.push(
        new Damage(damage.type, damage.value * physicalDamageMultiplier)
      );
    } else if (damage.type === 'MAGIC_DAMAGE') {
      damageList.push(
        new Damage(damage.type, damage.value * magicDamageMultiplier)
      );
    }
  }
  return damageList;
}
