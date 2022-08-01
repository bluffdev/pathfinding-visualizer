import Cell from '../cell.js';
import { GridIndex } from '../types/GridIndex.js';

export default class DFS {
  private readonly rows: number;
  private readonly cols: number;
  private stack: Array<Array<number>>;
  private directions: Array<Array<number>>;
  private grid: Array<Array<Cell>>;
  private visitedNodes: Array<Cell>;
  private shortestPath: Array<Cell>;
  private prev: Map<Cell, Cell>;
  private startCellIndex: GridIndex;
  private endCellIndex: GridIndex;

  constructor(
    grid: Array<Array<Cell>>,
    width: number,
    height: number,
    startCellIndex: GridIndex,
    endCellIndex: GridIndex
  ) {
    this.rows = height;
    this.cols = width;
    this.directions = [
      [-1, 0], // up
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
    ];
    this.grid = grid;
    this.visitedNodes = [];
    this.shortestPath = [];
    this.prev = new Map();
    this.startCellIndex = startCellIndex;
    this.endCellIndex = endCellIndex;
    this.stack = [[this.startCellIndex.row, this.startCellIndex.col]];
  }

  public solve(): boolean {
    let foundEndNode = false;

    while (this.stack.length > 0) {
      const [r, c] = this.stack.pop()!;
      this.grid[r][c].setHasBeenVisited(true);
      this.visitedNodes.push(this.grid[r][c]);

      // checks if the current node is the end node
      if (this.grid[r][c].getIsEndCell() === true) {
        foundEndNode = true;
        break;
      }

      this.exploreNeighbors(r, c);
    }

    if (foundEndNode) {
      this.reconstructPath();
    }

    return true;
  }

  private exploreNeighbors(r: number, c: number) {
    let nr: number; // current neighbor row
    let nc: number; // current neighbor col

    for (const [dr, dc] of this.directions) {
      nr = r + dr;
      nc = c + dc;

      if (nr < 0 || nc < 0) continue;
      if (nr >= this.rows || nc >= this.cols) continue;

      if (this.grid[nr][nc].getHasBeenVisited() === true) continue;
      if (this.grid[nr][nc].getIsAWall() === true) continue;

      this.stack.push([nr, nc]);

      if (r == this.startCellIndex.row && c == this.endCellIndex.col) {
        this.prev.set(this.grid[nr][nc], this.grid[23][25]);
      } else {
        this.prev.set(this.grid[nr][nc], this.grid[r][c]);
      }
    }
  }

  private reconstructPath(): void {
    let er = this.endCellIndex.row; // end node row number
    let ec = this.endCellIndex.col; // end node col number

    let curr = this.prev.get(this.grid[er][ec]);

    if (curr === undefined) return;

    while (curr.getIsStartCell() !== true) {
      this.shortestPath.push(curr);
      curr = this.prev.get(curr);
      if (curr === undefined) {
        console.error('Visited Node is Undefined');
        return;
      }
    }

    this.shortestPath = this.shortestPath.reverse();
  }

  public resetDFS(grid: Array<Array<Cell>>) {
    this.stack = [[this.startCellIndex.row, this.startCellIndex.col]];
    this.grid = grid;
    this.visitedNodes = [];
    this.shortestPath = [];
    this.prev.clear();
  }

  public getVisitedNodes() {
    return this.visitedNodes;
  }

  public getShortestPath() {
    return this.shortestPath;
  }
}
