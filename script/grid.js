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
        this.addBlockEvent = false;
        this.removeBlockEvent = false;
        this.pathNodes = [];
        this.pathFound = false;
    }

    addNode(node){
        this.nodes.push(node);
        this.edges[node.coordinate] = [];
        
    }

    addEdge(node1,node2,weight = 1){
        this.edges[node1.coordinate].push({node:node2.coordinate,weight: weight});        
    }
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
        if(node.y < graph.column){  //right
            required = graph.nodes[k+1];
            graph.addEdge(graph.nodes[k],required);
        }
        if(node.y > 1){  //left  
            required = graph.nodes[k-1];
            graph.addEdge(graph.nodes[k],required);
        }
        if(node.x < graph.row){    //down
            required = graph.nodes[k+graph.column];
            graph.addEdge(graph.nodes[k],required);
        }
        if(node.x > 1){  //up
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
                if(node.blocked == false && graph.addBlockEvent){
                    node.cell.classList.add("blocked");
                    node.blocked = true;
                }
                else if(graph.removeBlockEvent){
                    node.cell.classList.remove("blocked");
                    node.blocked = false;
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
                if(!node.blocked && graph.addBlockEvent){
                    node.cell.classList.add("blocked");
                    node.blocked = true;
                }    
                else if(graph.removeBlockEvent){
                    node.cell.classList.remove("blocked");
                    node.blocked = false;
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

function clearAllBlockNodes(){
    for(let node of graph.nodes){
        if(node.blocked){
            node.cell.classList.remove("blocked");
            node.blocked = false;
        }
    }
}

function searching(){

}
function searchingPath(searchNode){
    if(searchNode!=graph.startNode["node"] && searchNode!=graph.endNode["node"])
        searchNode.cell.classList.add("searching");
}

function clearGrid(){
    graph.startNode["node"] = new Node();
    graph.endNode["node"] = new Node();
    graph.pathNodes = [];
    for(node of graph.nodes){
        node.blocked = false;
        node.cell.classList.remove("start_node");
        node.cell.classList.remove("end_node");
        node.cell.classList.remove("blocked");
    }
    
}

function graphReady(algorithm){
    let start = graph.startNode["node"].coordinate;
    let finish = graph.endNode["node"].coordinate;
    if(start.toString() == "," && finish.toString()== ",")
        messageContent("No Start or End Node");
    else if (start.toString() == ",")
        messageContent("No Start Node");
    else if(finish.toString()== ",")
        messageContent("No End Node");
    else{
        messageContent("Searching...");
        let time;
        switch(algorithm){
            case 1: time = dijkstras(start,finish);
                    break;
        }
        if(!graph.pathFound)
                        setTimeout(messageContent,time*10,"No Path Available");
                    else
                        setTimeout(messageContent,time*10,"Path Found!!!");
    }
}

const graph = new Graph();
createGrid();
