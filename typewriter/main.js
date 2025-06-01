//@ts-check
const alphabet = [..."'ABCDEFGHIJKLMNOPQRSTUVWXYZ (),.!"];

import fs from 'fs'
import { createTextMap } from './createTextMap.js';
import { initWorker } from './initWorker.js';
import { createRandomGenerator } from './createRandomGenerator.js';
import { saveResults } from './saveResults.js';
import { initDBService } from './saveToDb.js';
import mysql from 'mysql2/promise';

function createConnection() {
    return mysql.createConnection({
      host: 'mysql-db',
      user: 'root',
      password: 'rootpassword',
      database: 'monkey'
    });
  }
const connection = await createConnection();
const dbService = initDBService(connection);
let text = fs.readFileSync('./text.txt').toString();

const randomGenerator = createRandomGenerator(alphabet)

text = text.replaceAll('\n', '');
const textMap = createTextMap(text);

const activeWorkers = []

let current, last= randomGenerator.getRandomChar(), lastSecond= randomGenerator.getRandomChar(), lastThird= randomGenerator.getRandomChar()

const startMainLoop = ()=>{}
while(true){
    current = randomGenerator.getRandomChar()
    const textShard = (lastThird+lastSecond + last+ current).toLowerCase();
    const workersToRemove = []
    for(const [index, worker] of activeWorkers.entries()){
        const result = worker(current)
        if(result){
            await saveResults(result, dbService.saveToDb);
            workersToRemove.push(index);
        }
    }
    workersToRemove.forEach(index=>activeWorkers.splice(index, 1)); 
    
    const indexArrays = textMap[textShard];
    if(indexArrays){
        const worker = initWorker(indexArrays, textShard, text)
        activeWorkers.push(worker);
    }
    lastThird = lastSecond;
    lastSecond = last;
    last = current;
}


