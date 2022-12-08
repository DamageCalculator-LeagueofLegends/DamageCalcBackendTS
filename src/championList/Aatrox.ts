import { Champion } from "../Champion/Champion";
import { Damage } from "../Damage/Damage";
import { RawChampion } from "../RawChampion/RawChampion";

export class Aatrox extends Champion {
    hasPassive = true
    constructor(rawChampion: RawChampion){
        super(rawChampion)
    }
    override autoAttack(): Damage | Damage[] | null {
        return null
    }

    override passiveAction(): Damage | Damage[] | null {
        return null
    }

    override qAction(): Damage | Damage[] | null {
        return null
    }

    override wAction(): Damage | Damage[] | null {
        return null
    }

    override eAction(): Damage | Damage[] | null {
        return null
    }

    override rAction(): Damage | Damage[] | null {
        return null
    }
}