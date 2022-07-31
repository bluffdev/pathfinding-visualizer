import Grid from './grid.js'
import BFS from './pathfindingAlgos/bfs.js'
import './styles/grid.css'

(function main() {
  const width = Math.trunc(window.innerWidth / 26)
  const height = Math.trunc(window.innerHeight / 27) 

  let grid: Grid = new Grid(width, height)
  grid.drawGrid()
  let bfs: BFS = new BFS(grid.getCells(), grid.getWidth(), grid.getHeight(), grid.getStartCellIndex(), grid.getEndCellIndex())

  let start = document.querySelector('#visualize-btn') as HTMLButtonElement
  start.addEventListener('click', (e: Event) => {
    e.preventDefault();
    start.disabled = true
    reset.disabled = true
    bfs.solve()
    grid.animateVisitedNodes(bfs.getVisitedNodes(), bfs.getShortestPath())
  })

  let reset = document.querySelector('#reset-btn') as HTMLButtonElement
  reset.addEventListener('click', (e: Event) => {
    e.preventDefault()
    grid.resetGrid()
    bfs.resetBFS(grid.getCells())
  })
})()