// Get the client

// Create the connection to database
/**
 * 
 * @param {import('mysql2/promise').Connection} connection 
 * @returns 
 */
export const initDBService = (connection)=>{
  return {
    async saveToDb(textFragments) {
      try {
        const fragmentsBatches = Object.keys(textFragments).reduce((batches, textFragment)=>{
          const batch = batches[batches.length-1];
          batch.push(textFragment);
          if(batch.length>=1000){
            batches.push([]);
          }
          return batches;
        },[[]]);
        const foundInDb = [];
          for(let batches of fragmentsBatches){
              const [results] = await connection.query(
                  'SELECT * FROM `results` where text_fragment in (?)',
                  [batches]
                );
                foundInDb.push(...results);
            }
            for(let record of foundInDb){
              const {text_fragment, counter} = record;
              const newCounter = counter + textFragments[text_fragment];
              await connection.execute('UPDATE results SET counter=? where text_fragment=?', [newCounter, text_fragment]);
              delete textFragments[text_fragment];
            }
            console.log(`Rows updated: ${foundInDb.length}`)
            const newTextFragments = Object.keys(textFragments);
            for(let textFragment of newTextFragments){
              await connection.execute(`INSERT INTO results (text_fragment, counter) VALUES (?,?)`, [textFragment, textFragments[textFragment]]);
            }
            console.log(`Rows inserted: ${newTextFragments.length}`)
            
        } catch (err) {
          console.log(err);
        }
  }
  }

}


