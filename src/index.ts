import flatMap = require('lodash.flatmap');
import uniqby = require('lodash.uniqby');
import uniq = require('lodash.uniq');


const isValid = (value: number) => {
    return value !== INVALID;
}

const INVALID = -1;

interface GridPosition {
    row: number;
    col: number;
}

interface Grid {
    value: number;
    position: GridPosition;
}

/**
 * @example
 * // return [est]
 * simsilarSubstring("testing", "eat")
 * @param text {String} The text/paragraph input you want to perform the searching
 * @param pattern {String} The string pattern you are looking for in the text
 */
const similarSubstring = (text: string, pattern: string) => {
    var dp: number[][] = [];
    const numOfRow = pattern.length + 1;
    const numOfCol = text.length + 1;
    for (let row = 0; row < numOfRow; row++) {
        dp[row] = new Array(numOfCol);
        for(let col =0; col < numOfCol; col++){
            if(row == 0){
                dp[row][col] = 0;
                continue;
            }
            if(col == 0){
                dp[row][col] = row;
                continue;
            }
            const top: number = dp[row-1][col];
            const left: number = dp[row][col-1];
            const topLeft: number = dp[row-1][col-1];
            const base = Math.min(top, left, topLeft);
            const current = (text.charAt(col) === pattern.charAt(row-1)) ? 0 : 1;
            dp[row][col] = base + current;
        }
    }

    const minDistance: number = Math.min(...dp[numOfRow - 1]);
    const minDistanceCols = dp[numOfRow - 1].reduce((acc: number[], distance: number, index: number) => {
        if(distance === minDistance){
            acc.push(index);
        }
        return acc;
    }, []);

    const traceResult: GridPosition[][] = flatMap(minDistanceCols, (col) => {
        return _trace(dp, numOfRow -1, col)
    });

    const paths = traceResult.map((path: GridPosition[]) => {
        return path.map(position => position.col);
    });

    const clearPaths = paths.map(path => uniq(path));
    const uniqPaths = uniqby(clearPaths, (path) => {return path.toString()});

    const words = uniqPaths.map((path) => {
        let word = "";
        path.forEach((col) => {
            word = word.concat(text.charAt(col))
        });
        return word;
    });
    return words;
}

const _trace = (dp: number[][], row: number, col: number): GridPosition[][] => {
    if(row == 0) {
        return [[]];
    }
    const top: Grid = {value: dp[row-1][col], position: {row: row-1, col: col}};
    const left: Grid = {value: (col > 0) ? dp[row][col-1]: INVALID, position: {row: row, col: col-1}};
    const topLeft: Grid = {value: (row > 0 && col > 0) ? dp[row-1][col-1] : INVALID, position: {row: row-1, col: col-1}};
    const factors: Grid[] = [top, left, topLeft].filter(factor => isValid(factor.value));
    const min = Math.min(...factors.map(factor => factor.value));
    const minFactors: Grid[] = factors.filter(factor => factor.value === min);

    const result: GridPosition[][] = flatMap(minFactors, (factor: Grid) => {
        const paths: GridPosition[][] = _trace(dp, factor.position.row, factor.position.col);
        return paths.map((path: GridPosition[]) => {
            return [...path, {row, col}]
        });
    });

    return result;

}

console.log(similarSubstring("Lorem Ipsum is simply dummy text of the printing and typesetting industry", "io"));