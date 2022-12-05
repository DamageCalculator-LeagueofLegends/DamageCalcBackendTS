import { DamageType } from "../RawChampion/abilities/staticDataEnums";

export class Damage {

    type: DamageType
    damage: number
    constructor(type: DamageType) {
        this.type = type
        this.damage = 0
    }

    calculateDamge() {
        let totalDamage: number = 0
        const basicDamage: number = getBasicDamage()
        const scaledDamage: number = getScaledDamage()

    }

}

function getBasicDamage(): number {
    return 0
}

function getScaledDamage(): number {
    return 0
}