let dijkstrasResult,aStarResult;

function compare(start,finish){
    let startTime,finishTime;
    startTime = performance.now();
    dijkstrasResult = dijkstras(start,finish);
    finishTime = performance.now();
    let dijkstrasTime = finishTime - startTime;
    const dijkstrasEle = document.getElementById("dijkstras-content");
    dijkstrasEle.textContent = dijkstrasTime;
    startTime = performance.now();
    aStarResult = aStar(start,finish);
    finishTime = performance.now();
    let aStarTime = finishTime - startTime;
    const aStarEle = document.getElementById("astar-content");
    aStarEle.textContent = aStarTime;
    const dijkstrasComp = document.getElementById("dcomparisons");
    dijkstrasComp.textContent = dijkstrasResult.comparisons;
    const astarComp = document.getElementById("acomparisons");
    astarComp.textContent = aStarResult.comparisons;
    const dijkstrasRow = document.getElementById("dijkstras");
    const astarRow = document.getElementById("astar");
    dijkstrasRow.addEventListener("click",dijkstrasShow);
    astarRow.addEventListener("click",aStarShow);

}

function dijkstrasShow(){
    clearPath();
    colorPath(dijkstrasResult.path);
}

function aStarShow(){
    clearPath();
    colorPath(aStarResult.path);
}