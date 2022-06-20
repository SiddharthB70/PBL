class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    };
    dequeue() {
        return this.values.shift();
    };
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

function dijkstras() {
    graph.pathNodes = [];
    let start = graph.startNode["node"].coordinate;
    let finish = graph.endNode["node"].coordinate;
    if(start.toString() == "," && finish.toString()== ",")
        return "NSOE";
    else if (start.toString() == ",")
        return "NS";
    else if(finish.toString()== ",")
        return "NE";
    
    const distanceFromStart = {};
    const nextCheck = new PriorityQueue();
    const visited = {};

    let current;
    let result = [];
    for (let vert of graph.nodes) {
        if (vert.x==start[0] && vert.y==start[1]) {
            distanceFromStart[vert.coordinate] = 0;
            nextCheck.enqueue(vert.coordinate, 0);
        } 
        else {
            distanceFromStart[vert.coordinate] = Infinity;
        }
        visited[vert.coordinate] = null;
    }

   let searching = [];
    
    check:while (nextCheck.values.length) {
        current = nextCheck.dequeue().val;
        let blockedNode;
        for(blockedNode of graph.nodes){
            if(blockedNode.coordinate.toString() == current.toString() && blockedNode.blocked == true)
                continue check;
        }

        if(current[0]==finish[0]&&current[1]==finish[1])
        {
            graph.pathFound = true;
            while(visited[current]){
                result.push(current);
                current = visited[current];
            }
            break;
        }

        else{
            check1:for (let neighbor of graph.edges[current]) {
                
                
                
                if(!(searching.includes(neighbor.node)))
                    searching.push(neighbor.node);
                let distanceToNeighbor = distanceFromStart[current] + neighbor.weight;
               
                if(distanceToNeighbor < distanceFromStart[neighbor.node]){
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
                {graph.pathNodes.push(pathNode);}
        }
    } 

    let k = 0; 
    for(let searchNode of searching){
        for(let pathNode of graph.nodes){
        if(pathNode.x == searchNode[0] && pathNode.y == searchNode[1]){
            
            k++;
            setTimeout(searchingPath,k*10,pathNode);
            }
        } 
    }
    setTimeout(colorPath,k*10,graph.pathNodes);
    return k;
}