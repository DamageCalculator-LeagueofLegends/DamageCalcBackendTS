import { listOfChampions } from './championList';

async function main() {
  const value = await listOfChampions;

  console.log(await value[0]);
  console.log(await value[1]);
  console.log(await value[2]);
  console.log(await value[3]);
}

main();
