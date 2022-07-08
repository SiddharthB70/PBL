class Grid{
    constructor(){
      this.openSet = [];
      this.closedSet = [];
      this.path=[];
      this.nodes = [];
      this.start;
      this.end;
    }
    add(coordinate,f,g,h,parent){
      this.nodes.push({"coordinate":coordinate,"f":f,"g":g,"h":h,"parent":parent});
    }
}

const grid = new Grid();

function findNode(coordinate){
  return grid.nodes.find(node=>{
    if(node.coordinate.toString()==coordinate.toString())
      return node;
  })
}


function aStar(startNode,finishNode){
    for(let node of graph.nodes){
        grid.add(node.coordinate,0,0,0,undefined);
    }
    grid.start = findNode(startNode);
    grid.end = findNode(finishNode);
    grid.openSet.push(grid.start);
    search();
}


function search() {
    while (grid.openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < grid.openSet.length; i++) {
        if (grid.openSet[i].f < grid.openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
      let current = grid.openSet[lowestIndex];
  
      if (current.coordinate.toString() == grid.end.coordinate.toString()) {
        let temp = current;
        grid.path.push(temp);
        while (temp.parent) {
          grid.path.push(temp.parent);
          temp = temp.parent;
        }
        console.log("DONE!");
        // return the traced grid.path
        console.log(grid.path.reverse());
      }
  
      //remove current from grid.openSet
      grid.openSet.splice(lowestIndex, 1);
      //add current to grid.closedSet
      grid.closedSet.push(current);
    
      for (let neigh of graph.edges[current.coordinate]) {
        let neighbor = findNode(neigh.node);
        if (!grid.closedSet.includes(neighbor)) {
          let possibleG = current.g + 1;
  
          if (!grid.openSet.includes(neighbor)) {
            grid.openSet.push(neighbor);
          } else if (possibleG >= neighbor.g) {
            continue;
          }
  
          neighbor.g = possibleG;
          neighbor.h = heuristic(neighbor, grid.end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }
  
    //no solution by default
    return [];
  }
  

function heuristic(position0, position1) {
    let d1 = Math.abs(position1.coordinate[0] - position0.coordinate[0]);
    let d2 = Math.abs(position1.coordinate[1] - position0.coordinate[1]);
    return d1 + d2;
  }

