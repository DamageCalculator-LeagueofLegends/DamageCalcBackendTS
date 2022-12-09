import { Champion } from "../Champion/Champion";
import { Damage } from "../Damage/Damage";
import { RawChampion } from "../RawChampion/RawChampion";

export class Ahri extends Champion {
    constructor(rawChampion: RawChampion){
        super(rawChampion)
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
