
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
		console.debug(iStop_recorder.nodeName);
		return iStop_recorder;
	 }
	 ,createPlayButton: function(){
	 	console.debug('2. crea boton Play');
		var iPlay_recorder = this.createButton('Play','play_procedure',null);
		iPlay_recorder.addEventListener("click", this.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createRecordButton: function(){

		console.debug('3. crea boton Record');
		var iRecord_recorder = this.createButton('Record','start_record',null);
		iRecord_recorder.addEventListener("click",this.clickRecord, false); 
		return iRecord_recorder;
	 }
	 ,createClearButton: function(){
	 	console.debug('4. crea boton Clear');
		var clear = this.createButton('Clear','clear',null);
		clear.onclick = function(){
		localStorage.clear();
		document.getElementById("table_consola").innerHTML = "";
		}; 
		return clear;
	 }
	 ,createShowLocalStorageButton: function(){
		var load = document.createElement('input');
		load.type = "button";
		load.value = "LS";
		load.id = "load";

		load.onclick = function(){	console.log("Contenido:");console.debug(localStorage);
									console.debug("Tamano:");console.debug(localStorage.length);
								};
	     return load;
		 }
	 ,createaddTasksSelect: function(){

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

		return sAddTask;
	 }
	 ,createHeaderContainer: function(){
		console.debug('7. Crea el div consola');		
		var div_consola = document.createElement("div");
			div_consola.id = "div_consola";		
			div_consola.style.cssText = "overflow:scroll;    z-index: 300;   position: fixed;        left: 0px;      width: auto;        height: 100%;       border: solid 1px #e1e1e1;      vertical-align: middle;         background: #ffdab9;  text-align: center;";
		return div_consola;

	 }
	 ,createHeader: function(){
	 	console.debug('8. Crea el div consola header');
		var div_consola_header = document.createElement("div");
		div_consola_header.id = "consola_header"
		return div_consola_header;
	 }
	 ,createTableContainer: function(){
	 	console.debug('9. Crea el div consola table');
		var div_table_consola = document.createElement("div");
		div_table_consola.id =  "div_table_consola";
		return div_table_consola;
	 }
	 ,createTable: function(){
		console.debug('10. Crea la tabla contenedora de la consola');
		var table_consola = document.createElement("table")
		table_consola.id = "table_consola"
		return table_consola;
	 }
	 ,createShowHide: function(){

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

	return div_pestana;
	 }
	 ,init: function(){

	 	var stopButton = this.createStopButton();
	 	var playButton = this.createPlayButton();
	 	var recordButton = this.createRecordButton();
	 	var clearButton = this.createClearButton(); 
	 	var addTaksSelect = this.createaddTasksSelect();
	 	var loadButton = this.createShowLocalStorageButton();
		
		var container = this.createHeaderContainer();
		var show_hide = this.createShowHide();
		var container_header = this.createHeader();
		var table_console_container = this.createTableContainer();
		var table_console = this.createTable();

	 	container_header.appendChild(playButton);
	 	container_header.appendChild(stopButton);
	 	container_header.appendChild(recordButton);
	 	container_header.appendChild(clearButton);
	 	container_header.appendChild(loadButton);
	 	container_header.appendChild(addTaksSelect);
		
		table_console_container.appendChild(table_console);
		container.appendChild(container_header);
		container.appendChild(table_console_container);
		

	 	var body   = document.body || document.getElementsByTagName('body')[0];
	 	
	 	body.appendChild(container);
	 	console.debug('15. Agrega la pestana show/hide');    	
		body.appendChild(show_hide); 
    	body.style.marginLeft = "400px";
	 }
}
//RConsole.init();
//console.debug(RConsole);
window.onload = function(){
	//var rconsole = Object.create(RConsole);
	//rconsole.init();
	RConsole.init();
}


/*
	,createHeaderConsole: function(){

	
console.debug('6. trae el elemento body');
var body   = document.body || document.getElementsByTagName('body')[0];
var div_consola = document.createElement("div");

if (document.body.firstChild){
      document.body.insertBefore(div_consola, document.body.firstChild);
    }else{
      document.body.appendChild(div_consola);
}


}*/

//===============================

/**
* @class selectElement
*/
var selectElement = {
	specs:{}
	,render: function(){

		var div_select = document.createElement('div');
		var label = document.createTextNode(this.specs.label);
		    div_select.appendChild(label);
		var input = document.createElement('select');
		var len = this.specs.choices.length;
		
		for (var i = 0; i < len; i++) {
		var option = document.createElement('option');
		    option.text = this.specs.choices[i];
		    option.value = this.specs.choices[i];
		    input.appendChild(option);
		}
		    div_select.appendChild(input);

	return div_select;
	}
}

/**
* @class inputElement
*/

var inputElement = {
	specs:{}
	,label:''
	,id:''
	,value:''
	,render: function(){

		var div_input = document.createElement('div');
		var label = document.createTextNode(this.label);
		    div_input.appendChild(label);
		var input = document.createElement('input');
		    input.type = 'text';
		    input.id = this.id;
		    input.value = this.value;
		    div_input.appendChild(input);

    return div_input;
	}
}
/**
* @class view
*/
var view = {
      render: function(target, elements) {
      
      target.firstChild.innerHTML="";
      target.innerHTML = "";
          for (var i = 0; i < elements.length; i++) {
	      target.appendChild(elements[i].render());
          }
      }
};

/**
* @class inflater
*/
var inflater = {
	properties:[]
	,elements:[]
	,inflate: function(){
	var obj_properties = JSON.parse(this.properties);
	// @TODO: refactor con lookup
	this.elements = [];
		for (var i = 0; i < obj_properties.atributos.length; i++) {
		    var type_el = obj_properties.atributos[i].el_type;
		    var el_inflator = null;
		    switch(type_el){
	   	    case 'input':
			el_inflator = Object.create(inputElement);
		    break;
		    
		    case 'select':
		    el_inflator = Object.create(selectElement);
		    break;
		    
		    default:
		    return false;
		    break;
		    }

		el_inflator.label = obj_properties.atributos[i].label;
		el_inflator.value = obj_properties.atributos[i].value;
		el_inflator.id =  obj_properties.atributos[i].id;
		this.elements.push(el_inflator);  

		}

	return this.elements;
	}
}


var editor = {
	properties: []
	,htmlToJson: function(el_div){

	var obj_json = new Object();
	obj_json.type = "FillInputTask";
	obj_json.atributos = new Array();
	var i ;
	var childnodes = el.childNodes;
		for (i = 0; i < childnodes.length ; i = i + 1){
	    //mientras que sea un div ( Tiene atributos - elementos HTML)

			if(childnodes[i].nodeName == 'DIV'){ 
			  var obj_atributo = new Object();
			  var j;
			  var elements = childnodes[i].childNodes;
				for (j = 0; j < elements.length ; j = j + 1){
					//recorro otra vez el dom y armo el objeto
					if(elements[j].nodeName == "#text"){
					//console.debug(elements[j].textContent);
					obj_atributo.label = elements[j].textContent;
					}
					if(elements[j].nodeName == "INPUT"){
					obj_atributo.el_type = 'input';
					obj_atributo.value = elements[j].value;
					obj_atributo.id = elements[j].id;
					}
					}
				obj_json.atributos.push(obj_atributo);
			}
		}

	return JSON.stringify(obj_json);
	}
}
