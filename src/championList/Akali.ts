import { Champion } from '../Champion/Champion';
import { Damage } from '../Damage/Damage';
import { RawChampion } from '../RawChampion/RawChampion';

export class Akali extends Champion {
  constructor(rawChampion: RawChampion) {
    super(rawChampion);
  }

  override autoAttack(): Damage[] {
    return [];
  }

  override passiveAction(): Damage[] {
    return [];
  }

  override qAction(): Damage[] {
    return [];
  }

  override wAction(): Damage[] {
    return [];
  }

  override eAction(): Damage[] {
    return [];
  }

  override rAction(): Damage[] {
    return [];
  }
}
