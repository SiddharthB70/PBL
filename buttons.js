function createButtons(){
    const buttons = document.createElement('ul');
    buttons.classList.add("buttons");
    for(let i = 1; i <= 4; i++){
        const button = document.createElement('li');
        button.classList.add("button");
        button.textContent = buttonContent(i);
        button.addEventListener('click',function(e){
            operation(i);
        })
        buttons.appendChild(button);
    }
    document.body.appendChild(buttons);
}

function buttonContent(i){
    if(i == 1)
        return "Start Node";
    else if(i == 2)
        return "End Node";
    else if(i == 3)
        return "Weights";
    else 
        return "Dijkstras";
}

function operation(i){
    removeAllEvents();
    if(i == 1)
    {
        graph.startNode["Event"] = true;
        findStartNode();
    }
    else if(i == 2){
        graph.endNode["Event"] = true;
        findEndNode();
    }
    else if(i == 4){
        graph.Dijkstras();
    }
}

function removeAllEvents(){
    for(let node of graph.nodes){
        if(graph.startNode["Event"] == true)            
            node.cell.removeEventListener("click",pickNode);
        else if(graph.endNode["Event"] == true){
            node.cell.removeEventListener("click",pickNode);
        }
    }
    graph.startNode["Event"] = false;
    graph.endNode["Event"] = false;
}


createButtons();