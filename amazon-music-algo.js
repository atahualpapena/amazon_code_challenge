'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const rideDuration = 90
const songDurations = [1, 10, 25, 35, 60]

function findSongs(rideDuration, songDurations) {
    const songList = []
    const maxDuration = rideDuration - 30
    for (let i = 0; i < songDurations.length; i++) {
        for (let j = 0; j < songDurations.length; j++) {
            if (i == j) {
                continue
            }
            const sum = songDurations[i] + songDurations[j]
            const pair = [i, j]
            if (sum == maxDuration) {
                if (songList.find((p) => {
                    return (p.durations.includes(songDurations[pair[0]]))
                })) break
                songList.push({ pair: pair, longestSong: Math.max(songDurations[i], songDurations[j]), durations: [songDurations[i], songDurations[j]] })
            }
        }
    }
    if (songList.length == 0) {
        return [-1, -1]
    }
    return songList.reduce((previous, current) => previous.longestSong > current.longestSong ? previous : current).pair
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const rideDuration = parseInt(readLine().trim(), 10);
    const songDurationsCount = parseInt(readLine().trim(), 10);
    let songDurations = [];
    for (let i = 0; i < songDurationsCount; i++) {
        const songDurationsItem = parseInt(readLine().trim(), 10);
        songDurations.push(songDurationsItem);
    }
    const result = findSongs(rideDuration, songDurations);
    ws.write(result.join('\n') + '\n');
    ws.end();
}
