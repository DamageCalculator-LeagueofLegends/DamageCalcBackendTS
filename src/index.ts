import { runServer, testSimulation } from './api/api';
import { listOfChampions } from './championList';
import { listOfItems } from './itemList';
import { mock1, mock3 } from './Utility/mockData';

export let champWhitelist: string[] = [];
export function addToChampWhitelist(obj: any): any {
    for (let key in obj) {
        if (
            key !== 'rawChampData' &&
            key !== 'notes' &&
            key !== 'description' &&
            key !== 'blurb' &&
            key !== 'champItems' &&
            key !== 'hasPassive' &&
            key !== 'hasAssissinsMark' &&
            key !== 'echo' &&
            key !== 'noteStacks'
        ) {
            champWhitelist.push(key);
            if (typeof obj[key] === 'object') addToChampWhitelist(obj[key]);
        }
    }
}

export function emptyWhiteList() {
    champWhitelist = [];
}

async function main() {
    // const champions = await listOfChampions;
    // addToChampWhitelist(champions[0]);
    // //console.log(whitelist.find(element => element === "rawChampData"))
    // // console.log(JSON.stringify(champions[0], champWhitelist))
    // const items = await listOfItems;
    // console.log(JSON.stringify(items[0]));
    // console.log(value[0]);
    // console.log(value[1]);
    // console.log(value[2]);
    // console.log(value[3]);

    // console.log(JSON.stringify(mock1))
    type VisibilityOfDropdowns = {
        name: string
        visible: boolean
        created: boolean
    }

    const dropdownButtonContent: VisibilityOfDropdowns[] = [
        {
            name: "dropdownContentChamp",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemOne",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemTwo",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemThree",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemFour",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemFive",
            visible: false,
            created: false,
        },
        {
            name: "dropdownContentItemSix",
            visible: false,
            created: false,
        }
    ]

    const currentDropdown = dropdownButtonContent.find(dropdown => dropdown.name === "dropdownContentChamp")
    let {visible, created} = currentDropdown!
    let isVisable = currentDropdown!.visible
    let wasCreated = currentDropdown!.created
    console.log(isVisable)
    console.log(dropdownButtonContent[0]?.visible)
    isVisable = true
    visible = true
    console.log(isVisable)
    console.log(dropdownButtonContent[0]?.visible)
}

//(main()
runServer();
// testSimulation(mock3);
