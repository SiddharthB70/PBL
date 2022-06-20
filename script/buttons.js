function createButtons(){
    const buttons = document.createElement('div');
    buttons.classList.add("buttons");
    for(let i = 1; i <= 7; i++){
        const button = document.createElement('div');
        button.classList.add("button");
        button.textContent = buttonContent(i);
        button.addEventListener('click',function(e){
            clearPath();
            operation(i);
        })
        buttons.appendChild(button);
    }
    document.body.appendChild(buttons);
}

function buttonContent(i){
    switch(i){
        case 1: return "Start Node";
        case 2: return "End Node";
        case 3: return "Add Blocked Nodes";
        case 4: return "Remove Blocked Nodes";
        case 5: return "Clear Blocked Nodes";
        case 6: return "Dijkstra's Algorithm";
        case 7: return "Clear Grid"
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
        case 6:
                let time = dijkstras();
                if(time == "NSOE")
                    messageContent("No Start or End Node");
                else if(time == "NS")
                    messageContent("No Start Node");
                else if(time == "NE")
                    messageContent("No End Node");
                else{
                    messageContent("Searching...");
                    if(!graph.pathFound)
                        setTimeout(messageContent,time*10,"No Path Available");
                    else
                        setTimeout(messageContent,time*10,"Path Found!!!");
                }
                break;
        case 7: messageContent("Grid Cleared");
                clearGrid();
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
}

function createMessagePanel(){
    const div = document.createElement('div');
    div.classList.add("message_panel")
    document.body.appendChild(div);
}

function messageContent(content = "No Operation"){
    const div = document.querySelector(".message_panel");
    div.textContent = content;
}

createMessagePanel();
messageContent();
createButtons();
