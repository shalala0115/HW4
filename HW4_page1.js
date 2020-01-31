function progressView(container, model){
	function render(data){
	// render new HTML with data given
	// data -> 24
	let innerEle = container.querySelector('.inner');
	
	innerEle.style.width = data + '%';
	console.log(data)
};

container.innerHTML = '<div class="inner"></div>';

model.subscribe(render);

render();
}

function model(){

	let _subscriber,
	_data = 0,
	_SPEED = 100,
	_DURATION = 3000,
	_interval;

	function _updateData(){
        // keep updating _data;
        _data += (_SPEED/_DURATION)*100;
        
        _data = _data > 100 ? 100 : _data;
        _subscriber(_data);

        if(_data >= 100){
        	clearInterval(_interval);
        }
    }
    
    _interval = setInterval(_updateData, _SPEED);
    
    return {
    	subscribe: function(cb){
    		if(!_subscriber) _subscriber = cb;
    	}
    }
}

let progressBarContainer = document.querySelector('.progress-bar');

// let progressView = progressView(progressBarContainer, model());
progressView(progressBarContainer, model());
