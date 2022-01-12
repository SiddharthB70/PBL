class Node{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.coordinate = [this.x,this.y];
        this.cell = document.createElement('div');
    }
}

class Graph{
    constructor(){
        this.nodes = [];
        this.edges = {};
        this.row = 15;
        this.column = 30;
        this.startNode = {"Event": false, "node": new Node()};
        this.endNode = {"Event": false, "node": new Node()};
    }

    addNode(node){
        this.nodes.push(node);
        this.edges[node.coordinate] = [];
        
    }

    addEdge(node1,node2,weight = 1){
        this.edges[node1.coordinate].push({node:node2.coordinate,weight: weight});        
    }

    returnNode(node){
        for(let reqNode of this.nodes){
            if(node[0] == reqNode.x && node[1] == reqNode.y)
                return reqNode;
        }
    }

    Dijkstras() {
        let start = graph.startNode["node"].coordinate;
        let finish = graph.endNode["node"].coordinate;
        const distanceFromStart = {};
        const nextCheck = new PriorityQueue();
        const visited = {};

        let current;
        let result = [];
        for (let vert of this.nodes) {
            if (vert.x==start[0] && vert.y==start[1]) {
                distanceFromStart[vert.coordinate] = 0;
                nextCheck.enqueue(vert.coordinate, 0);
            } 
            else {
                distanceFromStart[vert.coordinate] = Infinity;
            }
            visited[vert.coordinate] = null;
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

function createGrid(){
    const main = document.createElement('div');
    main.classList.add("main_grid");
    let i,j;
    for (i = 1; i <= 15; i++){
        const row = document.createElement('div');
        row.classList.add("grid_row");
        for(j = 1; j <= 30; j++){
            const node = new Node(i,j);
            node.cell.classList.add("row_cell");
            graph.addNode(node);
            row.appendChild(node.cell);
        }
        main.appendChild(row);
    }
    addEdges();
    document.body.appendChild(main);
      
}

function addEdges(){
    let k = 0;
    while(k < graph.nodes.length){
        let node = graph.nodes[k], required;
        right:if(node.y < graph.column){
            required = graph.nodes[k+1];
            graph.addEdge(graph.nodes[k],required);
        }
        left:if(node.y > 1){
            required = graph.nodes[k-1];
            graph.addEdge(graph.nodes[k],required);
        }
        down:if(node.x < graph.row){
            required = graph.nodes[k+graph.column];
            graph.addEdge(graph.nodes[k],required);
        }
        up:if(node.x > 1){
            required = graph.nodes[k-graph.column];
            graph.addEdge(graph.nodes[k],required);
        }

        k++;
    }
}



function findStartNode(){
    graph.nodes.forEach(function(node){
        node.cell.addEventListener('click',pickNode);
    })
}

function findEndNode(){
    graph.nodes.forEach(function(node){
        node.cell.addEventListener('click',pickNode);
    })
}

function pickNode(){
    let prevNode = removePreviousNode();
    let presentNode;
    for(presentNode of graph.nodes){
        if(presentNode.cell == this)
            break;
    }
    if(presentNode != prevNode){
        if(graph.startNode["Event"] == true){
            presentNode.cell.style.backgroundColor = "red";
            graph.startNode["node"] = presentNode;
        }
        else if(graph.endNode["Event"] == true){
            presentNode.cell.style.backgroundColor = "blue";
            graph.endNode["node"] = presentNode;
        }
    }
    else
        presentNode.cell.style.backgroundColor = "white";
}

function removePreviousNode(){
    let reqNode;
    if(graph.startNode["Event"] == true){
        reqNode = graph.startNode["node"];
        graph.startNode["node"].cell.style.backgroundColor = "white";
        graph.startNode["node"] = new Node();
    }  
    if(graph.endNode["Event"] == true){
        reqNode = graph.endNode["node"];
        graph.endNode["node"].cell.style.backgroundColor = "white";
        graph.endNode["node"] = new Node();
    }
    return reqNode;
}

function colorPath(result){
    result.pop();
    for(pathNode of result){
        for(node of graph.nodes){
            if(pathNode[0]==node.x && pathNode[1] == node.y){
                node.cell.style.backgroundColor = "cyan";
            }
        }
    }
}

function clearPath(){
    let node;
    for(node of graph.nodes){
        if(node != graph.startNode["node"] && node!=graph.endNode["node"])
            node.cell.style.backgroundColor = "white";
    }
}

const graph = new Graph();
createGrid();
