function createGrid(){
    const main = document.createElement('div');
    main.id = "main_grid";
    let i,j;
    for (i = 1; i <= 15; i++){
        const row = document.createElement('div');
        row.id = "grid_row";
        for(j = 1; j <= 30; j++){
            const column = document.createElement('div');
            column.id = "grid_column";
            column.setAttribute("data-coordinate",`${[i,j]}`);
            row.appendChild(column);
        }
        main.appendChild(row);
    }

    document.body.appendChild(main);
      
}

// function addButtons(){
//     const main = document.createElement('div');
//     main.style.cssText = "position: relative; margin:40px auto;display: flex; border-style: solid;border-width: 0.2px; width: 800px; height: 50px;";
//     const startNodeButton = document.createElement('div');
//     startNodeButton.style.cssText = "flex: 1 0 0;border-style: solid;border-width: 0.2px; background-color: crimson;";
//     startNodeButton.addEventListener('click',addStartNode());
//     const endNodeButton = document.createElement('div');
//     endNodeButton.style.cssText = "flex: 1 0 0;border-style: solid;border-width: 0.2px; background-color: blue;";
//     const dikjstraButton = document.createElement('div');
//     dikjstraButton.style.cssText = "flex: 1 0 0;border-style: solid;border-width: 0.2px; background-color: cyan;";
//     const maze = document.createElement('div');
//     maze.style.cssText = "flex: 1 0 0;border-style: solid;border-width: 0.2px; background-color: brown;";
//     main.appendChild(startNodeButton);
//     main.appendChild(endNodeButton);
//     main.appendChild(dikjstraButton);
//     main.appendChild(maze);
//     document.body.appendChild(main);
// }

createGrid();
// addButtons();


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

// function cellEventListeners(){
//     let click;
//     for(let i = 1; i <= 15; i++){
//         for(let j = 1; j <= 30; j++){
//             let cell = document.querySelector(`div[data-coordinate = "${i},${j}"`);
//             click = cell.addEventListener("click",function(e){
//                 console.log(e);
//             })
//         }
//     }
    
//     return click;
// }

// function addStartNode(){
//    cellEventListeners();
// }   

class Node{
    constructor(){
        this.x;
        this.y;
        this.cell = document.createElement('div');
    }
}

class Graph{
    constructor(){
        this.nodes = [];
        this.edges = {};
        this.row = 15;
        this.column = 30;
    }

    addNode(node){
        this.nodes.push(node);
        this.edges[node] = [];
        
    }

    addEdge(node1,node2,weight = 1){
        this.edges[node1].push({node:node2,weight: weight});        
    }

    Dijkstras(start, finish) {
        const distanceFromStart = {};
        const nextCheck = new PriorityQueue();
        const visited = {};

        let current;
        let result = [];
        for (let vert of this.nodes) {
            if (vert[0]==start[0] &&vert[1]==start[1]) {
                distanceFromStart[vert] = 0;
                nextCheck.enqueue(vert, 0);
            } 
            else {
                distanceFromStart[vert] = Infinity;
            }
            visited[vert] = null;
        }

       
        
        while (nextCheck.values.length) {
            current = nextCheck.dequeue().val;
            if(current[0]==finish[0]&&current[1]==finish[1])
            {
                while(visited[current]){
                    result.push(current);
                    current = visited[current];
                }
                break;
            }
            else{
                for (let neighbor of this.edges[current]) {
                    
                    let distanceToNeighbor = distanceFromStart[current] + neighbor.weight;
                   
                    if(distanceToNeighbor < distanceFromStart[neighbor.node]){
                        distanceFromStart[neighbor.node] = distanceToNeighbor;
                        visited[neighbor.node] = current;
                        nextCheck.enqueue(neighbor.node, distanceFromStart);
                    }
                }
            }
        }
        colorPath(result.reverse());  
    }
}

const graph = new Graph();

function createGraph(){
    for(let i = 1; i <= 15; i++){
        for(let j = 1; j <= 30; j++){
            graph.addNode([i,j]);
        }
    }
    addEdges();
}

function addEdges(){
    let k = 0;
    while(k < graph.nodes.length){
        let coordinate = graph.nodes[k], next;
        right:if(coordinate[1]< graph.column){
            next = graph.nodes[k+1];
            graph.addEdge(coordinate,next);
        }
        left:if(coordinate[1]>1){
            next = graph.nodes[k-1];
            graph.addEdge(coordinate,next);
        }
        down:if(coordinate[0] < graph.row){
            next = graph.nodes[k+graph.column];
            graph.addEdge(coordinate,next);
        }
        up:if(coordinate[0] > 1){
            next = graph.nodes[k-graph.column];
            graph.addEdge(coordinate,next);
        }

        k++;
    }
}

createGraph();

function startNode(node){
    const startNode = document.querySelector(`div[data-coordinate = "${node[0]},${node[1]}"`);
    startNode.style.backgroundColor = "red";
}

function endNode(node){
    const endNode = document.querySelector(`div[data-coordinate = "${node[0]},${node[1]}"`);
    endNode.style.backgroundColor = "blue";
}

function colorPath(result){
    for (node of result){
        const endNode = document.querySelector(`div[data-coordinate = "${node[0]},${node[1]}"`);
        endNode.style.backgroundColor = "cyan";
    }
}

graph.Dijkstras([14,12],[1,3]);
startNode([14,12]);
endNode([1,3]);



