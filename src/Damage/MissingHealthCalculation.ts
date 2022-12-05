import { ChampionMissingHealthAmp } from '../Champion/ChampionMissingHealthAmp';

export class MissingHealthCalculation {
  enemyTotalHealth: number;
  enemyMissingHealth: number;
  missingHealthData: ChampionMissingHealthAmp;
  damageAmplifier: number;
  private _enemyCurrentHealth: number;

  constructor(
    enemyTotalHealth: number,
    enemyCurrentHealth: number,
    missingHealthData: ChampionMissingHealthAmp
  ) {
    this.enemyTotalHealth = enemyTotalHealth;
    this.missingHealthData = {
      damageAmplifier: missingHealthData.damageAmplifier / 2500,
      perPercentage: missingHealthData.perPercentage / 2500,
      cappedAt: missingHealthData.cappedAt,
    };
    this.enemyMissingHealth = enemyCurrentHealth;
  }

  set enemyCurrentHealth(enemyCurrentHealth: number) {
    this.enemyMissingHealth = calculateMissingHealth(
      this.enemyTotalHealth,
      enemyCurrentHealth
    );
    this.damageAmplifier = calculateAmplifierBasedOnMissingHealth(
      this.enemyMissingHealth,
      this.missingHealthData
    );
    this._enemyCurrentHealth = enemyCurrentHealth;
  }

  // set enemyMissingHealth(enemyCurrentHealth: number){
  //     this._enemyMissingHealth = calculateMissingHealth(this.enemyTotalHealth, enemyCurrentHealth)
  // }

  // get enemyMissingHealth() {
  //     return this._enemyMissingHealth
  // }
}

function calculateMissingHealth(totalHealth: number, currentHealth: number) {
  return (totalHealth - currentHealth) / totalHealth;
}

function calculateAmplifierBasedOnMissingHealth(
  missingHealth: number,
  missingHealthData: ChampionMissingHealthAmp
) {
  let amplifier: number = missingHealthData.damageAmplifier;
  let missingHealthIterator: number = missingHealthData.perPercentage;
  for (
    let i = 0;
    i >= Math.round(missingHealthData.cappedAt / missingHealthIterator);
    i++
  ) {
    if (missingHealth < missingHealthData.perPercentage) {
      amplifier = 0;
      break;
    } else if (
      (missingHealthData.perPercentage < missingHealth &&
        missingHealth <
          missingHealthIterator + missingHealthData.perPercentage) ||
      missingHealth === missingHealthIterator
    ) {
      break;
    }
    missingHealthIterator += missingHealthData.perPercentage;
    amplifier += missingHealthData.damageAmplifier;
  }
  return amplifier;
}
