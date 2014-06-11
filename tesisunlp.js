/**
 * Tesis Ing. Guillermo A. Caserotto
 * date: 11.06.2014
 * @module Recorder
 * @main recorder
 * Eventos que voy a tratar:
 * onChange: select, text, textarea
 * onClick: select, text, textarea
 * onFocus: select, text, textarea
 * onSelect: text, textarea
 */

var TESIS = TESIS || {};
TESIS.Manager = {};


//bpmanager.js
//var document = window.document;
document.addEventListener("taskFinished", executeNext, false);
// Metodo que selecciona tareas del array del Manager
// y las ejecuta secuencialmente
function executeNext(e) {
	//var taskId = e.detail.taskId;
	console.debug("Evento: "+e.currentTarget.nodeName+", "
	+e.detail.time.toLocaleString()+": "+e.detail.message);

            try{
            	console.debug(TESIS.Manager.getNextTask());
    				TESIS.Manager.getNextTask().execute();           
					}catch(err){
					 	console.debug("error"+err+"!!!");	
					}
               

    
}

TESIS.Manager = (function () {
	"use strict";
    var currentPrimitiveTasks = []; //Array de las tareas a realizar cuando se ejecuta el Manager
    var primitiveTasks = ['FillInputTask','SelectOptionTask','TextAreaTask','CheckBoxTask']; //Un array de tareas que puede realizar

        function subscribe(aPrimitiveTask){ //Este metodo por ahora solo agrega el objeto 
         currentPrimitiveTasks.push(aPrimitiveTask);
        }

        function createFillInputTask(aId,xPath,value,aMsg,aTipo){
        return  new FillInputTask(aId,xPath,value,aMsg,aTipo);
        }
        function createSelectOptionTask(aId,xPath,value,aMsg,aTipo){
        return new SelectOptionTask(aId,xPath,value,aMsg,aTipo);
        }

        function createTextAreaTask(aId,xPath,value,aMsg,aTipo){
        return new TextAreaTask(aId,xPath,value,aMsg,aTipo);
        }

        function createCheckBoxTask(aId,xPath,value,aMsg,aTipo){
        return new CheckBoxTask(aId,xPath,value,aMsg,aTipo);
        }

        function createRadioTask(aId,xPath,value,aMsg,aTipo){
        return new RadioTask(aId,xPath,value,aMsg,aTipo);
        }
        
    	return {
      
           	getNextTask : function(){ //Me trae la proxima tarea pendiente
           		console.debug("cantidad de tareas");
           		console.debug(currentPrimitiveTasks.length);
           		var i;
    	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
    		   
               
               if(currentPrimitiveTasks[i].getState() === 0 ) { 
						
        return currentPrimitiveTasks[i]; 
               }else{
               	console.debug("Esto esta mal");
						console.debug(i);
               }
    	}
        	}
        	,start: function(){
        if(currentPrimitiveTasks.length > 0){currentPrimitiveTasks[0].execute();}
        currentPrimitiveTasks[0].execute();
        	}       
        	,clearCurrentPrimitiveTasks: function(){
        currentPrimitiveTasks=[];
        	}
        	,addPrimitiveTask :  function(aId,aPrimitiveTaskType,xPath,value,msg,tipo){
    //Este metodo reemplaza al switch
	    	var lookup = 
	    	{ FillInputTask: createFillInputTask(aId,xPath,value,msg,tipo)
	    	, SelectOptionTask: createSelectOptionTask(aId,xPath,value,msg,tipo)
	    	, TextAreaTask: createTextAreaTask(aId,xPath,value,msg,tipo)
	    	, CheckBoxTask: createCheckBoxTask(aId,xPath,value,msg,tipo) } 
	    	, def = null ;

	    	lookup[aPrimitiveTaskType] ? subscribe(lookup[aPrimitiveTaskType]) : def();
		   
    } 
        	,getCurrentPrimitiveTasks: function(){
        	return currentPrimitiveTasks;
        	}	
        //===
    };
}());


 /**
 * 
 * PrimitiveTask
 * @class PrimitiveTask
 * @constructor
 */
function PrimitiveTask(id,xPath,value,tipo){ //Constructor

this.tipo = tipo;    
this.xPath = xPath;
this.value = value;
this.state = 0;
this.id = id;
this.msg = "PrimitiveTask"
}
/**
 * 
 * @method getState
 */
PrimitiveTask.prototype.getState = function(){ 
return this.state;
}
/**
 * 
 * @method setState
 */
PrimitiveTask.prototype.setState = function(aState){ 
this.state= aState;
}
/**
 * 
 * @method execute
 */
PrimitiveTask.prototype.execute = function(){

    var iterator = document.evaluate(this.xPath,document,null,0,null);
    var node = iterator.iterateNext();
    //Supongo que todas las tareas son manuales ( o sea, ingreso valor)
    console.debug(node);
   
    if(this.tipo == 1){ //Si es Manual, pide valor

    node.focus();
    var value = prompt("Ingrese Valor","");
    node.value= value;

    }else{

        node.value= this.value;    

    }

    
    this.finalizo();

    return node;
}

PrimitiveTask.prototype.finalizo = function(){

	this.setState(1);  // No se para que uso esto si lo saco del array o modifico el estado

	var event = new CustomEvent("taskFinished", {detail: {taskId: this.id , message: this.msg,
					time: new Date(),},bubbles: true,cancelable: true});

	document.dispatchEvent(event);
}

/**
 * 
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
function FillInputTask(id,xPath,value,tipo){
    PrimitiveTask.call(this,id,xPath,value,tipo);
    this.msg = "FillInputTask";
}
FillInputTask.prototype = new PrimitiveTask();

/**
 * 
 * CheckBoxTask
 * @class CheckBoxTask
 * @constructor
 */
function CheckBoxTask(id,xPath,value,tipo){
    PrimitiveTask.call(this,id,xPath,value,tipo);
    this.msg = "CheckBoxTask";

}
CheckBoxTask.prototype = new PrimitiveTask();

CheckBoxTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}

function RadioTask(id,xPath,value,tipo){
    PrimitiveTask.call(this,id,xPath,value,tipo);
    this.msg = "RadioTask";

}
RadioTask.prototype = new PrimitiveTask();

RadioTask.prototype.execute = function(){

var iterator = document.evaluate(this.xPath,document,null,0,null);
var node = iterator.iterateNext();
    node.checked= true;
  
    this.finalizo();

    return node;
}
//Herencia --> PrimitiveTask
function SelectOptionTask(id,xPath,value,tipo){
    PrimitiveTask.call(this,id,xPath,value,tipo);
    this.msg = "SelectOptionTask";
}
SelectOptionTask.prototype = new PrimitiveTask();
//Herencia --> PrimitiveTask
function TextAreaTask(id,xPath,value,tipo){
    PrimitiveTask.call(this,id,xPath,value,tipo);
    this.msg = "TextAreaTask";
}
TextAreaTask.prototype = new PrimitiveTask();



//=========================================================================

window.onload = function(){

var css_styles = {
	class_button:"background-color: #24890d;border: 0;border-radius: 2px;color: #fff;font-size: 12px;font-weight: 700;padding: 10px 30px 11px;text-transform: uppercase;vertical-align: bottom;"
};
//Agrego los estilos para el plugin
//@TODO: realizar una clase que maneje y englobe
var css = " .class_button { background-color: #24890d; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;}  ";
 var   head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);



var write_localStorage = function(task,xPath,value,taskType){
console.debug('write_localStorage');


	 // var some_properties = '{"type": "FillInputTask","atributos": [{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
	 // ,{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}]}';
	var obj_task = new Object();
		obj_task.type = task;
		obj_task.atributos  = new Array();

	//@TEMP Creo objetos - y hardcodeo para ver como funciona
	//{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
	var obj_xpath = new Object();
	obj_xpath.label = 'xPath';
	obj_xpath.el_type = 'input';
	obj_xpath.value = xPath;
	obj_xpath.id = 'id_xpath';
	//{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}
	var obj_value = new Object();
	
	obj_value.label = 'Valor';
	obj_value.el_type = 'input';
	obj_value.value = value;
	obj_value.id = 'id_value';
	
	obj_task.atributos.push(obj_xpath);
	obj_task.atributos.push(obj_value);

	//Lo convierto en JSON
	var json_task = JSON.stringify(obj_task);

	var id = localStorage.length + 1;

	localStorage.setItem(id, json_task);
}
/**  
* Listener de eventos cuando cambia el foco, recolecta datos relacionados.
* @event eventoChange
*/
var eventoChange = function(event){

    	console.debug("Empieza a grabar registroEventoChange");
    
		//Temporal, para asignarle si es tarea automatica, deberia ir en la consola
		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		console.debug("no tiene id, saco el absoluto, uso el ejemplo de stack");
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		console.debug(sxPath);
		}

		//Guardo en el JSON compartido que sirve para el recorder.
		//Diferencio los tipos de nodos, ahi le envio el tipo de tarea que recolecto.
		//Me parece que seria mejor que tome el nombre del elemento y no tengo que usar el switch
		switch(event.target.nodeName)
		{
		case 'SELECT':
		var obj = new Object();
		obj.type = "SelectOptionTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;

		var id = localStorage.length + 1;

		localStorage.setItem(id, JSON.stringify(obj));
		Recorder.refresh();

	    break;
		case 'INPUT':

		//temporal para ver si funciona
        console.debug('entra a input');
		if(event.target.type=='radio'){ 
		var obj = new Object();
		obj.type = "RadioTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
		}else if(event.target.type=='checkbox'){
		var obj = new Object();
		obj.type = "CheckBoxTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
		}else{
		var obj = new Object();
		obj.type = "FillInputTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
		}
		
		//Podría instanciar el tipo de tarea y que la tarea escriba en el localStorage?

		write_localStorage('FillInputTask',sxPath,el_value,0);
		Recorder.refresh();
		break;
	 	case 'TEXTAREA':

		var obj = new Object();
		obj.type = "TextAreaTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
		var id = localStorage.length + 1;

		localStorage.setItem(id, JSON.stringify(obj));
		Recorder.refresh();
        break;
		default:

		break;
		}
}

/**
 * @class Recorder
 */

var Recorder = {
    /**
     * @method createButton
     */
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
	/**  
	* Crea elementos HTML para manejar el recorder
	* @method createHeaderConsole
	*/
	,createHeaderConsole: function(){
	
	console.debug('1. crea boton Stop');
	var attr_stop = {'disabled':true, 'hidden':true };
	var iStop_recorder = this.createButton('Stop','stop_record',attr_stop);
	iStop_recorder.addEventListener("click", this.clickStop , false); 
	
	console.debug('2. crea boton Play');
	var iPlay_recorder = this.createButton('Play','play_procedure',null);
	iPlay_recorder.addEventListener("click", this.clickPlay , false); 

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

	}
	/**  
	* Crea elementos HTML para manejar la edicion de las tareas
	* @method createEditionContaniner   
	*/
	,createEditionContainer: function(){
	
	var div_overlay = document.createElement("div");	
	div_overlay.id = "div_overlay";
	div_overlay.style.cssText="visibility: hidden;position:absolute;width:200px;height:200px;top:50%;left:50%;margin-top:-100px;margin-left:-100px;";
	var div_container = document.createElement("div");	
	div_container.id = "div_container";


    var div_consola = document.getElementById('div_consola');
    // div_consola.style.visibility = "hidden";
    div_overlay.appendChild(div_container);
	div_consola.appendChild(div_overlay);

	}
	/**  
	* Muestra ventana para agregar una tarea primitiva o un augmenter
	* @method addTask    
	*/
	,addTask: function() {
		//console.debug();
		var that = this;
				var save_task = document.createElement("input");
				save_task.type = "button";
				save_task.value = "Save";
				//save_task.setAttribute('class','class_button');

				save_task.onclick = function(){ 
				//Podria utilizar otro elemento y no el div overlay  <-- borrar 			  		
			    el = document.getElementById("div_overlay");
	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
				var temp =  document.getElementById("table_edit");
			    var array_nodes = temp.childNodes;
	        	id = localStorage.length + 1;

	        	var obj1 = new Object();
	        	obj1.type = array_nodes[0].childNodes[1].value;
	        	obj1.xPath  = array_nodes[1].childNodes[1].value;
	        	obj1.value = array_nodes[2].childNodes[1].value;
	        	obj1.tipo = 0; //Tengo que traducir el Yes/No
	        	var obj_value = JSON.stringify(obj1);
		       	localStorage.setItem(id,obj_value);
				that.firstChild.selected = true;
				Recorder.refresh();
				};
		//instancio la vista ... podria sacar de constantes los elementos basicos
		var add_task = Object.create(inflater);
		add_task.properties = [{type:'selectElement',specs:{label:"Type",choices: ['FillInputTask', 'TextAreaTask']}},
		{type:'inputElement',specs:{label:'xPath',valor:"an xPath",id:"input_xpath"}},
		{type:'inputElement',specs:{label:'Value',valor:"a value for xPath"}}
		,{type:'selectElement',specs:{label:"Auto",choices: ['Yes', 'No']}}];	
		
		//instancio la vista ... podria sacar de constantes los elementos basicos
		var add_augmenter = Object.create(inflater);
		add_augmenter.properties = [{type:'selectElement',specs:{label:"Type",choices: ['Augmenter 1', 'Augmenter 2']}},
		{type:'inputElement',specs:{label:'xPath',valor:"an xPath"}},
		{type:'inputElement',specs:{label:'Value',valor:"a value for xPath"}}
		,{type:'selectElement',specs:{label:"Auto",choices: ['Yes', 'No']}}];	
		
		//Agrego el augmenter aca, hacer un metodo nuevo y dividir responsabilidades
		el = document.getElementById("div_overlay");
        el.style.visibility = "visible";	   
        var table_edit = document.getElementById("table_edit");

		(this.value === "1") ? view.render(table_edit, add_task.inflate()) : view.render(table_edit, add_augmenter.inflate());

		var close_edit = document.createElement("input");
		close_edit.type = "button";
		close_edit.value = "Close";
		//close_edit.setAttribute('class','class_button');

		close_edit.onclick = function(){ 
	  
		   var close_edit = document.getElementById("table_edit");
	       
	 	  el = document.getElementById("div_overlay");
	 	  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	  	  that.firstChild.selected = true;
	 	};
	 	//Agrego al final los dos botones
		table_edit.appendChild(save_task);
		table_edit.appendChild(close_edit);

	  	var select_xpath = document.getElementById("input_xpath");

	/*	select_xpath.addEventListener('focus',function(){ var high = new Highlighter(); high.init();},true);
		select_xpath.addEventListener('blur',function(){ var high = new Highlighter(); high.stop();},true);*/
	var select_xpath = document.createElement("input");
		select_xpath.type = "button";
		select_xpath.id = "select_xpath";
		select_xpath.value = "X";
		//select_xpath.setAttribute('class','class_button');

		select_xpath.onclick = function(){ 
	  
	  
	  	//var select_xpath = document.getElementById("select_xpath");

	  		//Para ver que ande el highlighter
	 	 var input_xpath = document.getElementById("input_xpath");
	 	 // //console.debug(input_xpath.parentNode);

	 	 console.debug('trae input_xpath');
		 var high = new Highlighter();
	
		
		 if(select_xpath.value=='X'){
		 	    	 high.init();
		 	    	 select_xpath.value = "-"
		 	    	 //console.debug(input_xpath);

		 }else{
		 	    	 high.stop();
		 	    	 select_xpath.value = "XPathEvaluator"
		 }
		 
	 	};

	 var input_xpath = document.getElementById("input_xpath");
	// console.debug('nananana');
	 var temp = input_xpath.parentNode;

	 temp.appendChild(select_xpath);
	 //console.debug(temp);

	//	table_edit.appendChild(select_xpath);

		//view.render(div_add, add_task.inflate());
		//div_add.appendChild(save_task);
		//div_add.appendChild(close_edit);
		
	}
	/**  
	* si bien esto es repetir codigo, por ahora lo hago asi hasta que tenga un diseño mas copado, (Ver Imagen del Pizarron)
	* @method Consola.editRow    
	*/
	,editRow: function(x) {

    //Trae el objeto que corresponde, segun el tipo de Tarea y le delega a el la tarea de armar los parametros para armar
    //el HTML ( objeto JSON)

	el = document.getElementById("div_overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	  
	var table_row = x.parentNode.parentNode;  
	  
	var json_task = localStorage.getItem(table_row.id);
	var obj_task = JSON.parse(json_task);
	//console.debug("Tipo de tarea:");
	//console.debug(obj_task.type);
	var fill_input_task = new FillInputTask();
	//console.debug(fill_input_task);
	//Esto es lo que trae del registro seleccionado
	
	var edit_task = Object.create(inflater);
	edit_task.properties = json_task;
	
	view.render(el, edit_task.inflate());
	/*****/
	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "X";
	
	close_edit.onclick = function(){ 
	   var close_edit = document.getElementById("table_edit");
	   el = document.getElementById("div_overlay");
	   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	   }
	/****/
	  el.appendChild(close_edit); 

	var edit_button = document.createElement('input');
	edit_button.type = "button";
	edit_button.value = "E";
	//edit_button.setAttribute('class','class_button');
	edit_button.onclick = function(){
	
	var ed = Object.create(editor);  
	var json_string = ed.htmlToJson(el);
	//console.debug(json_string);
  	
  	localStorage.setItem(table_row.id,json_string);
	};

	el.appendChild(edit_button); 

	   
	}
	/**  
	* Dispara el handler de record
	* @method clickRecord   
	*/
	,clickRecord: function(){
	
     var start_record = document.getElementById('start_record');
	 if(start_record.value == "Record"){
	 //console.debug('empieza a grabar');
	 document.addEventListener("change", eventoChange , false);   
	 start_record.value = "Stop";
	 	
	 }else if(start_record.value == "Stop"){
	 //console.debug("termino de grabar");	
     start_record.value = "Record" ;
     document.removeEventListener("change", eventoChange, false); 
	 }  
     
	}
	/**  
	* Para de grabar 
	* @method clickStop   
	*/
	,clickStop: function(){
	 
	//console.debug("termino de grabar");
    document.removeEventListener("change", eventoChange, false); 
    // document.removeEventListener("click", TESIS.registroEventoClic , false); 
     var start_record = document.getElementById('start_record');
	 start_record.disabled = false;
     var stop_record = document.getElementById('stop_record');
     stop_record.disabled = true;
	}
	/**  
	* Reproduce 
	* @method clickPlay 
	*/
	,clickPlay: function(){

    //console.log("Ejecuta estas tareas");


          //Aca hay un error porque el wirter_localstorage es diferente al edit
    //console.debug(localStorage);
    var i;
    for (i=0;i < localStorage.length ;i++){

    var key = localStorage.key(i);
    var value = localStorage[key];
    var tasks = JSON.parse(value);

try{
    var xpath = tasks.atributos[0].value;
    var valor = tasks.atributos[1].value;
}catch(err){
//console.debug('error atributos');
}
    //Agrego la tarea y el objeto se encarga de ejecutar lo que sea, con la configuracion que sea
    if(tasks.type){
    	//console.debug('---');
    //console.debug(tasks.type); 
        	//console.debug('---');

    	try{
    //Tengo que saber que tipo de elemento para saber que agregar
    TESIS.Manager.addPrimitiveTask(i,tasks.type,xpath,
    valor,0);
        }catch(err){
        	//console.debug(err);
        }
    }

          }

          TESIS.Manager.start();
	}
	/**  
	* Actualiza la consola con el localStorage 
	* @method refresh   
	*/
	,refresh: function(){

		  var table_consola = document.getElementById("table_consola");
  
		  while(table_consola.hasChildNodes())
		  {
		    table_consola.removeChild(table_consola.firstChild);
		  }

		  for (var i=0;i < localStorage.length;i++){
		  
		    var key = localStorage.key(i);
		    var value = localStorage[key];
		    //Saco solamente el tipo, despues lo puedo sacar por el localStorage <-- borrar
			//console.debug(localStorage[i]);
			try{
			var concept = JSON.parse(value).type;	
			}catch(err){
				//console.debug(err);
			}
			

		    //this.writer(key,value,-1);
		    this.writer(key,concept,-1);
		  }

	}
	/**  
	* Escribe en la consola
	* @method writer 
	*/
	,writer: function(id,text,index){

		var table_consola = document.getElementById("table_consola");

		//Inserto registro
		var tr = document.getElementById('table_consola').insertRow(index);
        tr.id= id;
	    var td1 = document.createElement('td');
	    var td2 = document.createElement('td');
	    var td3 = document.createElement('td');
	    var td4 = document.createElement('td');
	    var td5 = document.createElement('td');

	 	var text1 = document.createTextNode(text);
	    var delete_button = document.createElement('input');
		delete_button.type = "button";
		delete_button.value = "X";
		//delete_button.setAttribute('class','class_button');

		delete_button.onclick = function(x){ 

			if(confirm('Desea borrar el regitro?')){
			var id = this.parentNode.parentNode.id;
			var row = this.parentNode.parentNode.sectionRowIndex;
			document.getElementById('table_consola').deleteRow(row);
			localStorage.removeItem(id);
			}
		};

		var edit_button = document.createElement('input');
		edit_button.type = "button";
		edit_button.value = "E";
		//edit_button.setAttribute('class','class_button');
		edit_button.onclick = function(){
		Recorder.editRow(this);
		};


		var id_text = document.createTextNode(id);

		td1.appendChild(id_text);
		td2.appendChild(text1);
		//td3.appendChild(add_button);
		td4.appendChild(edit_button);
		td5.appendChild(delete_button);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		}	
	/**
	* @method lookupElementByXPath
	*/
	,lookupElementByXPath: function (path) { 
	   var evaluator = new XPathEvaluator(); 
	   var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
	   return  result.singleNodeValue; 
	}
	/**
	* @method createXPathFromElement	
	*/
	,createXPathFromElement: function(elm) { 
	   var allNodes = document.getElementsByTagName('*'); 
	   for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
	   { 
	       if (elm.hasAttribute('id')) { 
	       var uniqueIdCount = 0; 
	       for (var n=0;n < allNodes.length;n++) { 
	           if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
	           if (uniqueIdCount > 1) break; 
	       }; 
	       if ( uniqueIdCount == 1) { 
	           segs.unshift('id("' + elm.getAttribute('id') + '")'); 
	           return segs.join('/'); 
	       } else { 
	           segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
	       } 
	       } else if (elm.hasAttribute('class')) { 
	           segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
	       } else { 
	           for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
	       if (sib.localName == elm.localName)  i++; }; 
	       segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
	       }; 
	   }; 
	   return segs.length ? '/' + segs.join('/') : null; 
	} 
	,init: function(){
	

	this.createHeaderConsole(); 
	this.createEditionContainer();
	Recorder.refresh();

	}
  }

//console.debug(Recorder);
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
		//console.debug(this.specs);
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
	    for (i = 0; i < childnodes.length ; i = i + 1)
  		{
  			//mientras que sea un div ( Tiene atributos - elementos HTML)
    	
	    if(childnodes[i].nodeName == 'DIV')
	      { 	
	      		var obj_atributo = new Object();
	      		var j;
	      	 	var elements = childnodes[i].childNodes;
	      		for (j = 0; j < elements.length ; j = j + 1)
  				{
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


//Highlighting


function Highlighter(){
//Create a variable that reminds the background color of the trigger element.
this.reminder = '';
}
//Highlight the trigger element on the page.
Highlighter.prototype.highlight = function(event)
{
    this.reminder = event.target.style.backgroundColor;
    event.target.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
    event.target.style.outline = "0.25em solid #FFFF00";
}

//Create the tooltip.
Highlighter.prototype.createTooltip = function (event){
    //console.log("createTooltip() starts.");

    //console.log("The tooltip is generate.");

    var tooltip = document.createElement("div");
    
    //console.log("The tooltip styles are defined.");
    
    tooltip.id = "Tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.top = "0em";
    tooltip.style.right = "0em";
    tooltip.style.padding = "10px";
    tooltip.style.fontFamily = "Arial";
    tooltip.style.fontSize = "large";
    tooltip.style.fontWeight = "bold";
    tooltip.style.color = "#FCFCFC";
    tooltip.style.textAlign = "center";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.50)";
    tooltip.style.zIndex = "100";
    
    //console.log("The tooltip text is set.");
    
    tooltip.innerHTML = event.target.tagName.toLowerCase().toString();
    
    if(event.target.id != "")
    {
        tooltip.innerHTML = tooltip.innerHTML + "#" + event.target.id;
    }
    
    //Get an error when trying to retrieve all elements of a same class.
    if(event.target.className != "")
    {
        var classes = event.target.className.split(" ");
    
        classes.forEach(
    function (aclass)
    {     
        //Error: The node list of getElementsByClassName() is always undefined.
        tooltip.innerHTML = tooltip.innerHTML + "." + aclass + "(" + document.getElementsByClassName(aclass).lenght + ")";
    }
        );
    }
    
    //console.log("The tooltip is returned.");
    
    return tooltip;
}



//Remove the highlight on the previous selected element.
Highlighter.prototype.init = function ()
{
//Setup a global event for onmouseover.
//console.log("Global handlers are set.");

document.onmouseover = mouseoverHandler;
document.onmouseout = mouseoutHandler;
document.onclick = onClickHandler;

//console.log("Script ends.");
}
//Remove the highlight on the previous selected element.
Highlighter.prototype.stop = function ()
{
//Setup a global event for onmouseover.
//console.log("Global handlers are set.");
document.onmouseover = null;
document.onmouseout = null;
document.onclick = null;

//console.log("Script ends.");
}

//Creates a function to handle the global event.
var mouseoverHandler = function (event)
{
    //console.log("mouseover event is trigger.");

    //console.log("highlight() is called.");    
    var high = new Highlighter();
   high.highlight(event);
    
    //console.log("createTooltip() is called and the callback is append to the event target.");
    
    event.target.appendChild(high.createTooltip(event));
}
//Remove the highlight on the previous selected element.
var mouseoutHandler = function (event)
{
    //console.log("mouseout event is trigger.");
    var high = new Highlighter();
    var tooltip = document.getElementById("Tooltip");

    event.target.removeChild(tooltip);

    event.target.style.backgroundColor = high.reminder;
    event.target.style.outline = "none";
}
   

//Remove the highlight on the previous selected element.
var onClickHandler = function (event)
{
    console.log("onClick event is trigger.");
    var xPath = Recorder.createXPathFromElement(event.target) ;
    var el = document.getElementById("input_xpath");
    el.value = xPath;

    //console.debug(xPath);
}




//Inicia el Recorder
  Recorder.init();
};