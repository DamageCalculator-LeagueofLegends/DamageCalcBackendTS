import { Url } from "../RawChampion/RawChampion"
import { ItemStats } from "../RawItem/ItemStats"
import { Passive } from "../RawItem/Passive"
import { RawItem } from "../RawItem/RawItem"

export abstract class Item {
    itemID: number
    itemName: string
    itemIcon: Url

    isLegendary: boolean
    isMythic: boolean

    itemStats: ItemStats
    mythicStats: ItemStats

    constructor(rawItem: RawItem){
        this.itemID = rawItem.id
        this.itemName = rawItem.name
        this.itemIcon = rawItem.icon

        this.itemStats = rawItem.stats
        
        this.setMythicStats(rawItem.passives)
    }

    setMythicStats(itemPassives: Passive[]){
        if (itemPassives?.length) {
            itemPassives.forEach(element => {
                if (element.mythic == true){
                    this.mythicStats = element.stats
                }
            });
        }
    }
}
