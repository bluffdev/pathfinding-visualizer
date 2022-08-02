import Grid from './grid.js';
import BFS from './pathfinding/bfs.js';
import DFS from './pathfinding/dfs.js';
import './styles/grid.css';

(function main() {
  const width = Math.trunc(window.innerWidth / 26);
  const height = Math.trunc(window.innerHeight / 28);

  let grid: Grid = new Grid(width, height);
  grid.drawGrid();
  let bfs = new BFS(
    grid.getCells(),
    grid.getWidth(),
    grid.getHeight(),
    grid.getStartCellIndex(),
    grid.getEndCellIndex()
  );

  let dfs = new DFS(
    grid.getCells(),
    grid.getWidth(),
    grid.getHeight(),
    grid.getStartCellIndex(),
    grid.getEndCellIndex()
  );

  let algos = document.querySelectorAll(
    '.dropdown-item'
  ) as NodeListOf<HTMLButtonElement>;

  let cur = '';

  let algoDropDown = document.querySelector(
    '.dropdown-toggle'
  ) as HTMLButtonElement;

  algos.forEach((algo, index) => {
    algo.addEventListener('click', (e: Event) => {
      e.preventDefault();
      console.log(index);
      if (index === 0) {
        cur = 'bfs';
        algoDropDown.innerHTML = 'Breadth-First Search';
      } else if (index === 1) {
        cur = 'dfs';
        algoDropDown.innerHTML = 'Depth-First Search';
      }
    });
  });

  let start = document.querySelector('#visualize-btn') as HTMLButtonElement;
  start.addEventListener('click', (e: Event) => {
    e.preventDefault();
    if (cur !== '') {
      start.disabled = true;
      reset.disabled = true;
    }
    if (cur === 'bfs') {
      bfs.solve();
      grid.animateVisitedNodes(bfs.getVisitedNodes(), bfs.getShortestPath());
    } else if (cur === 'dfs') {
      dfs.solve();
      grid.animateVisitedNodes(dfs.getVisitedNodes(), dfs.getShortestPath());
    } else {
      alert('Please select an algorithm');
    }
  });

  let reset = document.querySelector('#reset-btn') as HTMLButtonElement;
  reset.addEventListener('click', (e: Event) => {
    e.preventDefault();
    grid.resetGrid();
    if (cur === 'bfs') {
      bfs.resetBFS(grid.getCells());
    } else if (cur === 'dfs') {
      dfs.resetDFS(grid.getCells());
    }
    start.disabled = false;
    cur = '';
    algoDropDown.innerHTML = 'Select an Algorithm';
  });
})();
