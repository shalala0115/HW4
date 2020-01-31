function model(state) {
    let _subscriber;
    let staoptions = state.options || [];

    function filterO(key){
        let res = [];
        let _key = key.toUpperCase();
        if(_key != ''){
            for(let option of staoptions){
                if(option.indexOf(_key)> -1){
                    res.push(option);
                }
            }
        }
        _subscriber(res);
    }
    return {
        subscribe: function(fn){
            if(!_subscriber)
                _subscriber=fn;
        },
        filterO: filterO
    }
}

function view(container, model) {
    let _input = document.querySelector('.Auto');
    let _options = document.querySelector('.options');
    _input.addEventListener('keyup', function(e) {
        let text = e.target.value;
        model.filterO(text);
    })
    function render(data) {
        if(!data){
            _options.style.display = 'none';
        }
        else{
            _options.innerHTML = '';
            for(let option of data){
                let singlestate = document.createElement('div');
                singlestate.innerHTML = option;
                _options.addEventListener('click',function(e){
                    _input.value = e.target.innerHTML;
                    _options.style.display = 'none';
                })
                _options.appendChild(singlestate);
            }
            options.style.display='block';
        }
    }
    model.subscribe(render);
}
let state = {
    options:[
    'CA',
    'AZ',
    'WA',
    'NY',
    'OR',
    'TX',
    'TS',
    'ML',
    'MX'
    ]

}
let container = document.querySelector('.Autocpmplete');
let automodel = model(state);
let autoview = view(container,automodel);
