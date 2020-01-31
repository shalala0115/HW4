let view = function(container, model) {
    let grid = document.createElement('div'),
    point = document.createElement('div');
    grid.setAttribute('class', 'grid');
    point.setAttribute('class', 'score');
    container.appendChild(grid);
    container.appendChild(point);
    
    function render(data){
        let {fills, score, count} = data;
        grid.innerHTML = '';
        
        if(count < 10) {
            grid.appendChild(createGrid(fills));
        }
        
        point.innerHTML = 'Final score ' + score;
    }
    grid.addEventListener('click', (e) => {
        if(e.target.tagName.toLowerCase() !== 'li') return;
        let val = e.target.innerHTML;
        model.click(val === 'M')
    });
    model.setSubscriber(render);
    render(model.getData());
}
let model = function() {
    let subscriber,
    _data = {
        fills: new Array(9),
        score: 0,
        count: 0
    };
    _data.fills = getRandom();
    function setSubscriber(fn) {
        _subscriber = fn;
    }
    function getData() {
        return _data;
    }
    function click(addScore) {
        _data.score += addScore ? 1 : 0;
        _data.count ++;
        _data.fills = getRandom();
        _subscriber(_data);
    }
    return {setSubscriber, getData, click};
}
function createGrid(arr) {
    let result = document.createElement('div');
    for(let i=0;i<3;i++) {
        let row = document.createElement('ul');
        for(let j=0;j<3;j++) {
            let cell = document.createElement('li');
            cell.setAttribute('class', 'cell');
            let index = i*3 + j;
            if(arr[index]) cell.innerHTML = 'M';
            row.append(cell);
        }
        result.appendChild(row);
    }
    return result;
}
function getRandom() {
    let result = new Array(9);
    let candidates = [0,1,2,3,4,5,6,7,8], count = 0;
    while(count < 3) {
        let index = getRandomByRange(0, candidates.length-1);
        result[candidates[index]] = true;
        candidates.splice(index, 1);
        count++;
    }
    return result;
}
function getRandomByRange(low, high) {
    let diff = high - low;
    return Math.floor(Math.random()*diff) + low;
}


let WhackAMoleContainer = document.querySelector('.game-container');
let WhackAMoleModel = model();
let WhackAMoleView = view(WhackAMoleContainer, model());