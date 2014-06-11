window.onload = function(){
var RConsole = {
	createButton: function(aValue,anId,attributes){

		var aButton = document.createElement("input");	
	    aButton.setAttribute('type','button');
	    aButton.setAttribute('value',aValue);
	    aButton.setAttribute('id',anId);

	      for (var attr in attributes) { 
	      aButton.setAttribute(attr,attributes[attr]);  
	      }

	return aButton;
	}
	,createStopButton: function(){
		console.debug('1. crea boton Stop');
		var attr_stop = {'disabled':true, 'hidden':false };
		var iStop_recorder = this.createButton('Stop','stop_record',attr_stop);
		iStop_recorder.addEventListener("click", this.clickStop , false); 
		return iStop_recorder;
	 }
	 ,createPlayButton: function(){
	 	console.debug('2. crea boton Play');
		var iPlay_recorder = this.createButton('Play','play_procedure',null);
		iPlay_recorder.addEventListener("click", this.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createHeaderContainer: function(){
		
		var div_consola = document.createElement("div");
		
		return div_consola;
	 }
	 ,init: function(){

	 	var stopButton = this.createStopButton();
	 	var playButton = this.createPlayButton();
		var container = this.createHeaderContainer();
	 	container.appendChild(playButton);
	 	container.appendChild(stopButton);

	 	var body   = document.body || document.getElementsByTagName('body')[0];
	 	
	 	body.appendChild(container);
	 }
}
RConsole.init();
console.debug(RConsole);
}


/*
	,createHeaderConsole: function(){
	
	
	
	

	console.debug('3. crea boton Recorder');
	var iRecord_recorder = this.createButton('Record','start_record',null);
	iRecord_recorder.addEventListener("click",this.clickRecord, false); 

	console.debug('4. crea boton Clear');
	var clear = this.createButton('Clear','clear',null);
	clear.onclick = function(){
	localStorage.clear();
	document.getElementById("table_consola").innerHTML = "";
	}; 
	console.debug('5. crea Select Tasks');
	var sAddTask = document.createElement('select');
	sAddTask.setAttribute('id','add_task');
 	var j;
 	var aOptions=['Add Task','Primitive Task','Augmented Task'];
	for (j = 0; j < aOptions.length; j = j + 1) {
		opt = document.createElement('option');
		opt.value = j;
		if(j===0){opt.disabled = true;opt.selected = true;} 
		opt.innerHTML = aOptions[j];
		sAddTask.appendChild(opt);
	}
	sAddTask.addEventListener("change", this.addTask , false); 

	

	var load = document.createElement('input');
	load.type = "button";
	load.value = "LS";
	load.id = "load";

	load.onclick = function(){  
								//console.log("Contenido:");
								//console.debug(localStorage);
								//console.debug("Tamano:");
								//console.debug(localStorage.length);
							};
     
    

	
console.debug('6. trae el elemento body');
var body   = document.body || document.getElementsByTagName('body')[0];
var div_consola = document.createElement("div");

if (document.body.firstChild){
      document.body.insertBefore(div_consola, document.body.firstChild);
    }else{
      document.body.appendChild(div_consola);
}
console.debug('7. Crea el div consola');
div_consola.id = "div_consola";
div_consola.style.cssText = "overflow:scroll;    z-index: 300;   position: fixed;        left: 0px;      width: auto;        height: 100%;       border: solid 1px #e1e1e1;      vertical-align: middle;         background: #ffdab9;  text-align: center;";

    var b = document.getElementsByTagName("body");
    //console.debug(b[0].childNodes);
    console.debug('8. Crea el div consola header');
	var div_consola_header = document.createElement("div");
	div_consola_header.id = "consola_header"
	
	console.debug('9. Crea el div consola table');
	var div_table_consola = document.createElement("div");
	div_table_consola.id =  "div_table_consola";
	
	
	console.debug('10. Crea la tabla contenedora de la consola');
	var table_consola = document.createElement("table")
	table_consola.id = "table_consola"
	
	console.debug('11. agrega botones a consola header');
	div_consola_header.appendChild(iRecord_recorder);	
	div_consola_header.appendChild(iStop_recorder);
	div_consola_header.appendChild(iPlay_recorder);	
	div_consola_header.appendChild(load);
	div_consola_header.appendChild(clear);
	div_consola_header.appendChild(sAddTask);

	console.debug('12. Agrega consola header y table consola al div de la consola');
	div_consola.appendChild(div_consola_header); 
	div_consola.appendChild(div_table_consola);

	console.debug('13. Agrega tabla contenedora al div table consola');
	div_table_consola.appendChild(table_consola);

  	console.debug('14. crea el div para la solapa show/hide');
	//Agrego la solapa para mostrar/ocultar
	var div_pestana = document.createElement("div");
	div_pestana.id =  "div_pestana"; 
	div_pestana.style.cssText = "display: inline-block;background: #37abc8;opacity: 0.67;position: fixed;right: 0;bottom: 3.2em;z-index: 100;font-size: 14px;font-family: Helvetica, arial, freesans, clean, sans-serif;" ;
	
	var input_label = document.createElement("input");
	input_label.type = "button";
	input_label.style.cssText = "background-color: #24890d; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;";
	input_label.value ="show/hide";
	input_label.id ="toc-label";
	input_label.onclick = function(){ 

	var div_consola = document.getElementById('div_consola');
	
	   if(div_consola.style.visibility=='visible'){

		div_consola.style.visibility = "hidden";
		body.style.marginLeft = "";
		}else{

		div_consola.style.visibility = "visible";
		body.style.marginLeft = "400px";
		}
	};

	div_pestana.appendChild(input_label);

	console.debug('15. Agrega la pestana show/hide');
    var body = document.getElementsByTagName('body')[0];
	body.appendChild(div_pestana); 
    body.style.marginLeft = "400px";

	}*/