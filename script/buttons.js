function createButtons(){
    const buttons = document.getElementsByClassName("button")
    for(let i = 1; i <= 9; i++){
        buttons[i-1].addEventListener('click',function(e){
            clearPath();
            operation(i);
        })
    }
}

function operation(i){
    removeAllEvents();
    switch(i){
        case 1: messageContent("Pick Start Node");
                graph.startNode["Event"] = true;
                findStartNode();
                break;
        case 2: messageContent("Pick End Node");
                graph.endNode["Event"] = true;
                findEndNode();
                break;
        case 3: messageContent("Left Click and Drag to Add Blocked Nodes");
                graph.addBlockEvent = true;
                findBlockNodes();
                break;
        case 4: messageContent("Left Click and Drag to Remove Blocked Nodes");
                graph.removeBlockEvent = true;
                findBlockNodes();
                break;
        case 5: messageContent("Cleared All Blocked Nodes");clearAllBlockNodes();
                break;
        case 6: messageContent("Grid Cleared");
                clearGrid();
                break;
        case 7: graphReady(1);
                break;
        case 8: graphReady(2);
                break;
        case 9: graphReady(3);
                break;
    }     
}

function removeAllEvents(){
    for(let node of graph.nodes){
        if(graph.startNode["Event"] == true)            
            node.cell.removeEventListener("click",pickNode);
        else if(graph.endNode["Event"] == true){
            node.cell.removeEventListener("click",pickNode);
        }
        else if(graph.addBlockEvent == true || graph.removeBlockEvent){
            node.cell.removeEventListener("mousedown",pickBlockNode);
        }
    }
    graph.startNode["Event"] = false;
    graph.endNode["Event"] = false;
    graph.addBlockEvent = false;
    graph.removeBlockEvent = false;
    const dijkstrasRow = document.getElementById("dijkstras");
    const astarRow = document.getElementById("astar");
    dijkstrasRow.removeEventListener("click",dijkstrasShow);
    astarRow.removeEventListener("click",aStarShow);
}


function messageContent(content = "No Operation"){
    const div = document.querySelector(".message_panel");
    div.textContent = content;
}

messageContent();
createButtons();
