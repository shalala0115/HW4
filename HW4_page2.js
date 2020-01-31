const DIRECTION = {
            UP: 'up',
            DOWN: 'down'
            };

function typeAheadView(container, model){
    let input = document.createElement('input'),
    options = document.createElement('div');
    input.setAttribute('type', 'text');
    options.setAttribute('class', 'options');
    container.appendChild(input);
    container.appendChild(options);
    let cb = debouce(model.fetchData, 100);
    input.addEventListener('keyup', function(e){
        let inputText = e.target.value;
        cb(inputText);
    });

    container.addEventListener('keyup', function(e) {
    let keyCode = e.keyCode;
    if(keyCode === 38) {
        // UP
        model.arrowKey(DIRECTION.UP);
    } else if(keyCode === 40) {
        // DOWN
        model.arrowKey(DIRECTION.DOWN);
    }
    });
    
    options.addEventListener('click', function(e) {
        let selected = e.target.innerHTML;
        model.select(selected);
    });

    function render(data, selected, inputText){
        if(inputText){
            input.value = inputText;
        }
        if(!data || !data.length) {
            options.style.display = 'none';
        } else {
            options.innerHTML = '';
            for(let i=0;i<data.length;i++) {
                let item = data[i];
                let singleOption = document.createElement('div');
                singleOption.innerHTML = item;
                if(i === selected) {
                    singleOption.setAttribute('class', 'selected');
                }
                options.appendChild(singleOption);
            }
        options.style.display = 'block';
    }
}

model.subscribe(render);

}


function model(){
    let _subscriber, cache={}, data, selected = -1;
    function fetchData(text){
        if(cache[text]) {
        apiBack(cache[text]);
        } else {
            fetch('https://swapi.co/api/people/?search=' + text)
            .then(response => response.json())
            .then(function(json){
                cache[text] = json;
                apiBack(json);
            });
        }
    }

    function apiBack(json) {
        let names = json.results.map(function(item){
            return item.name;
        });
        data = names;
        subscriber(data, selected);
    }

    function arrowKey(direction){
    // update selected
        if(direction === DIRECTION.DOWN) {
            selected++;
            selected = selected > data.length-1 ? data.length-1 : selected;
        } else if (direction === DIRECTION.UP) {
            selected--;
            selected = selected < -1 ? -1 : selected;
        }
        subscriber(data, selected);
    }
    function select(selectedText) {
        selected = data.indexOf(selectedText);
        subscriber(data, selected, selectedText);
    }
    
    return {
        subscribe: function(cb) {
            if(!_subscriber) subscriber = cb;
        },
        fetchData: fetchData,
        arrowKey: arrowKey,
        select: select
    }
}
    
function debouce(fn, wait) {
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(null, args);
        }, wait);
    };
}

let typeAheadContainer = document.querySelector('.typeahead-container');
let typeAheadModel = model();
typeAheadView(typeAheadContainer, typeAheadModel);
