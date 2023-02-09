import { Damage } from '../fighters/Damage/Damage';
import { Item } from './Item';
import { DamageType } from '../types/RawChampion/abilities/staticDataEnums';
import { RawItem } from '../types/RawItem/RawItem';

export class LudensTempest extends Item {
  constructor(rawItem: RawItem) {
    super(rawItem);
    this.isMythic = true;
    this.isUnique = true;
  }

  override passiveDmg(): Damage[] {
    let value = 0;
    const { scalingValues } = this.dynamicData;

    value = 100 + scalingValues?.['% AP']! * 0.1;

    return [new Damage(DamageType.MAGIC_DAMAGE, value)];
  }
}
