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

const graph = new Graph();
createGrid();

