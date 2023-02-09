import { app } from './server/api/app';

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

const runServer = () => {
  const PORT = 5050

  app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
  });
}

runServer()