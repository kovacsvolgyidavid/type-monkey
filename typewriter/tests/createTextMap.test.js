import { createTextMap } from "../createTextMap"

test('4 letter word', ()=>{
    const text = 'aBcD';
    const result = createTextMap(text);
    expect(Object.keys(result).length).toBe(1)
    expect(result).toMatchObject({'abcd': [4]})
})

test('text without repeat', ()=>{
    const text = 'abcdefgh "';
    const result = createTextMap(text);
    expect(Object.keys(result).length).toBe(7)
    expect(result).toMatchObject({
        'abcd': [4],
        'bcde': [5],
        'cdef': [6],
        'defg': [7],
        'efgh': [8],        
        'fgh ': [9],
        'gh "': [10],
    })
})

test('multiple shards', ()=>{
    const text = 'abcdabcd';
    const result = createTextMap(text);
    expect(Object.keys(result).length).toBe(4)
    expect(result).toMatchObject({
        'abcd': [4, 8],
        'bcda': [5],
        'cdab': [6],
        'dabc': [7],
    })
})