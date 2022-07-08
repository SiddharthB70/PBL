class Grid{
    constructor(){
      this.openSet = [];
      this.closedSet = [];
      this.path = [];
      this.nodes = [];
      this.start;
      this.end;
    }
    add(coordinate,f,g,h,parent){
      this.nodes.push({"coordinate":coordinate,"f":f,"g":g,"h":h,"parent":parent});
    }
}

function findNode(coordinate,grid){
  return grid.nodes.find(node=>{
    if(node.coordinate.toString()==coordinate.toString())
      return node;
  })
}

function findGraphNode(coordinate){
  return graph.nodes.find(node=>{
    if(node.coordinate.toString()==coordinate.toString())
      return node;
  })
}

function aStar(startNode,finishNode){
  const grid = new Grid();
  graph.pathFound = false;
  graph.pathNodesAStar = [];
  for(let node of graph.nodes){
      grid.add(node.coordinate,0,0,0,undefined);
  }
  grid.start = findNode(startNode,grid);
  grid.end = findNode(finishNode,grid);
  grid.openSet.push(grid.start);
  return search(grid);
}


function search(grid) {
  let searching = [];
  let comparisons = 0;
  while (grid.openSet.length > 0) {
    comparisons++;
    let lowestIndex = 0;
    for (let i = 0; i < grid.openSet.length; i++) {
      comparisons++
      if (grid.openSet[i].f < grid.openSet[lowestIndex].f) {
        comparisons++;
        lowestIndex = i;
      }
    }
    let current = grid.openSet[lowestIndex];

    if (current.coordinate.toString() == grid.end.coordinate.toString()) {
      comparisons++;
      graph.pathFound = true;
      let temp = current;
      grid.path.push(temp);
      while (temp.parent) {
        comparisons++;
        grid.path.push(temp.parent);
        temp = temp.parent;
      }
      for(let pathNode of grid.path){
        for(let node of graph.nodes){
          if(node.coordinate.toString() == pathNode.coordinate.toString())
            graph.pathNodesAStar.push(node);
        }
      }
      graph.pathNodesAStar = graph.pathNodesAStar.reverse();
      return {"searching":searching,"path":graph.pathNodesAStar,"comparisons":comparisons};
    }

    //remove current from grid.openSet
    grid.openSet.splice(lowestIndex, 1);
    //add current to grid.closedSet
    grid.closedSet.push(current);
  
    for (let neigh of graph.edges[current.coordinate]) {
      comparisons++;
      let presentNode = findGraphNode(neigh.node);
      if(presentNode.blocked == true){
        continue;
      }
      let neighbor = findNode(neigh.node,grid);
      if(!searching.includes(neighbor.coordinate)){
        searching.push(neighbor.coordinate);
        comparisons++;
      }
        
      if (!grid.closedSet.includes(neighbor)) {
        let possibleG = current.g + 1;
        comparisons++;
        if (!grid.openSet.includes(neighbor)) {
          grid.openSet.push(neighbor);
          comparisons++;
        } else if (possibleG >= neighbor.g) {
          comparisons++;
          continue;
        }

        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, grid.end);
        comparisons++;
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }
  }
  return {"searching":searching,"path":graph.pathNodesAStar,"comparisons":comparisons};
}
  

function heuristic(position0, position1) {
    let d1 = Math.abs(position1.coordinate[0] - position0.coordinate[0]);
    let d2 = Math.abs(position1.coordinate[1] - position0.coordinate[1]);
    return d1 + d2;
}
