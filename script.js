class Node{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.blocked = false;
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
        this.blockEvent = false;
        this.pathNodes = [];
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
        graph.pathNodes = [];
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
                while(visited[current]){
                    result.push(current);
                    current = visited[current];
                }
                break;
            }

            else{
                check1:for (let neighbor of this.edges[current]) {
                    
                    
                    
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
        
        for(let pathCoordinate of result.reverse()){
            for(let pathNode of graph.nodes){
                if(pathNode.x == pathCoordinate[0] && pathNode.y == pathCoordinate[1])
                    {this.pathNodes.push(pathNode);}
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
        setTimeout(colorPath,k*10,this.pathNodes); 
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
    for (i = 1; i <= graph.row; i++){
        const row = document.createElement('div');
        row.classList.add("grid_row");
        for(j = 1; j <= graph.column; j++){
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
    if(presentNode.blocked == true){
        presentNode.cell.classList.remove("blocked");
        presentNode.blocked = false;
    }

    if(presentNode != prevNode){
        if(graph.startNode["Event"] == true){
            presentNode.cell.classList.add("start_node");
            graph.startNode["node"] = presentNode;
        }
        else if(graph.endNode["Event"] == true){
            presentNode.cell.classList.add("end_node");
            graph.endNode["node"] = presentNode;
        }
    }

    if(graph.startNode["node"] == graph.endNode["node"]){
        if(graph.startNode["Event"]){
            graph.startNode["node"].cell.classList.remove("end_node");
            graph.endNode["node"] = new Node();
        }
        else if(graph.endNode["Event"]){
            graph.endNode["node"].cell.classList.remove("start_node");
            graph.startNode["node"] = new Node();
        }
     }
   
}

function removePreviousNode(){
    let reqNode;
    if(graph.startNode["Event"] == true){
        reqNode = graph.startNode["node"];
        graph.startNode["node"].cell.classList.remove("start_node");
        graph.startNode["node"] = new Node();
    }  
    if(graph.endNode["Event"] == true){
        reqNode = graph.endNode["node"];
        graph.endNode["node"].cell.classList.remove("end_node");
        graph.endNode["node"] = new Node();
    }
    return reqNode;
}

function colorPath(pathNodes){
    let k = 0;
    for(let pathNode of pathNodes){
        k++;
        setTimeout(colorNode,k*35,pathNode);
    }

}

function colorNode(node){
    node.cell.classList.remove("searching");
    node.cell.classList.add("path");
}

function clearPath(){
    let node;
    for(node of graph.nodes){
        node.cell.classList.remove("searching")
        node.cell.classList.remove("path");
    }
}

function findBlockNodes(){
    graph.nodes.forEach(function(node){
        node.cell.addEventListener('mousedown',pickBlockNode);
    })
}

function pickBlockNode(Event){
    if(Event.buttons == 1){
        for (node of graph.nodes){
            if(node.cell == this){
                if(node.blocked == false ){
                    node.cell.classList.add("blocked");
                    node.blocked = true;
                }
                else{
                    node.cell.classList.remove("blocked");
                    node.blocked = false;
                    return;
                }
            }
        }
        for(node of graph.nodes){
            node.cell.removeEventListener('mousedown',pickBlockNode);
            node.cell.addEventListener('mouseover',dragBlockNode);
        }
    }
}

function dragBlockNode(Event){

    if(Event.buttons == 1)
        for(node of graph.nodes){
            if(node.cell == this){
                if(!node.blocked){
            
                    node.cell.classList.add("blocked");
                    node.blocked = true;
                }                
            }
        }
    else
        lastBlockNode();
        
}

function lastBlockNode(){
    for(node of graph.nodes){
        node.cell.removeEventListener('mouseover',dragBlockNode);
        node.cell.addEventListener('mousedown',pickBlockNode);
    }
}

function searchingPath(searchNode){
    if(searchNode!=graph.startNode["node"] && searchNode!=graph.endNode["node"])
        searchNode.cell.classList.add("searching");
}

const graph = new Graph();
createGrid();