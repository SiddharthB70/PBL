class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.Sort();
    };
    dequeue() {
        return this.values.shift();
    };
    Sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

function dijkstras(start,finish) {
    graph.pathFound = false;
    graph.pathNodesDijkstras = [];  
    const distanceFromStart = {};
    const nextCheck = new PriorityQueue();
    const visited = {};

    let current;
    let result = [];
    let comparisons = 0;
    for (let vert of graph.nodes) {
        comparisons++;
        if (vert.x==start[0] && vert.y==start[1]) {
            comparisons++
            distanceFromStart[vert.coordinate] = 0;
            nextCheck.enqueue(vert.coordinate, 0);
        } 
        else {
            comparisons++;
            distanceFromStart[vert.coordinate] = Infinity;
        }
        visited[vert.coordinate] = null;
    }

   let searching = [];
    
    check:while (nextCheck.values.length) {
        current = nextCheck.dequeue().val;
        comparisons++;
        let blockedNode;
        for(blockedNode of graph.nodes){
            if(blockedNode.coordinate.toString() == current.toString() && blockedNode.blocked == true)
                continue check;
        }

        if(current[0]==finish[0]&&current[1]==finish[1])
        {
            graph.pathFound = true;
            comparisons++;
            while(visited[current]){
                comparisons++;
                result.push(current);
                current = visited[current];
            }
            break;
        }

        else{
            for (let neighbor of graph.edges[current]) {
                comparisons++;
                if(!(searching.includes(neighbor.node)))
                {
                    searching.push(neighbor.node);
                    comparisons++;
                }
                    
                let distanceToNeighbor = distanceFromStart[current] + neighbor.weight;
               
                if(distanceToNeighbor < distanceFromStart[neighbor.node]){
                    comparisons++
                    distanceFromStart[neighbor.node] = distanceToNeighbor;
                    visited[neighbor.node] = current;
                    nextCheck.enqueue(neighbor.node, distanceFromStart);
                }
            }
        }
    }
    result = result.reverse();
    for(let pathCoordinate of result){
        for(let pathNode of graph.nodes){
            if(pathNode.x == pathCoordinate[0] && pathNode.y == pathCoordinate[1])
                {graph.pathNodesDijkstras.push(pathNode);}
        }
    } 

    return {"searching":searching,"path":graph.pathNodesDijkstras,"comparisons":comparisons};
}