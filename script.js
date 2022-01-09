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

    Dijkstras(start, finish) {
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

function FindStartNode(node){
    let reqNode = graph.returnNode(node);
    reqNode.cell.style.backgroundColor = "crimson";
}

function FindEndNode(node){
    let reqNode = graph.returnNode(node);
    reqNode.cell.style.backgroundColor = "blue";
}

function colorPath(result){
    for (let node of result){
        let reqNode = graph.returnNode(node);
        reqNode.cell.style.backgroundColor = "cyan";
    }
}

const graph = new Graph();
createGrid();
graph.Dijkstras([14,12],[1,3]);
FindStartNode([14,12]);
FindEndNode([1,3]);

