//@ts-check
const alphabet = [..."'ABCDEFGHIJKLMNOPQRSTUVWXYZ (),.!"];

import fs from 'fs'
import { createTextMap } from './createTextMap.js';
import { initWorker } from './initWorker.js';
import { createRandomGenerator } from './createRandomGenerator.js';

let text = fs.readFileSync('./text.txt').toString();

const randomGenerator = createRandomGenerator(alphabet)

text = text.replaceAll('\n', '');
const textMap = createTextMap(text);

const activeWorkers = []

let current, last= randomGenerator.getRandomChar(), lastSecond= randomGenerator.getRandomChar(), lastThird= randomGenerator.getRandomChar()

const textFoundCounter = {};
let i = 0;
while(true){
    current = randomGenerator.getRandomChar()
    const textShard = (lastThird+lastSecond + last+ current).toLowerCase();
    const workersToRemove = []
    activeWorkers.forEach((worker, index)=>{
        const result = worker(current)
        if(result){
            result.forEach(res=>{
                const key = res.foundText + '#' + res.startingIndex;
                textFoundCounter[key] = (textFoundCounter[key] || 0) + 1; 
            });
            workersToRemove.push(index);
        }
    })
    workersToRemove.forEach(index=>activeWorkers.splice(index, 1)); 
    
    const indexArrays = textMap[textShard];
    if(indexArrays){
        const worker = initWorker(indexArrays, textShard, text)
        activeWorkers.push(worker);
    }
    lastThird = lastSecond;
    lastSecond = last;
    last = current;
    i++;
    if(i%1000000 === 0){
        console.log(textFoundCounter);
    }
}
