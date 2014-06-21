/**  
* Listener de eventos cuando cambia el foco, recolecta datos relacionados.
* @event eventoChange
*/
var eventoChange = function(event){

    	//console.debug("Empieza a grabar registroEventoChange");
    
		//Temporal, para asignarle si es tarea automatica, deberia ir en la consola
		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		//console.debug("no tiene id, saco el absoluto, uso el ejemplo de stack");
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		//console.debug(sxPath);
		}

		//Guardo en el JSON compartido que sirve para el recorder.
		//Diferencio los tipos de nodos, ahi le envio el tipo de tarea que recolecto.
		//Me parece que seria mejor que tome el nombre del elemento y no tengo que usar el switch
		switch(event.target.nodeName)
		{
		case 'SELECT':
		var o_task = new SelectOptionTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		
		localStorageManager.insert(o_task.toJson());
		
		//write_localStorage('FillInputTask',sxPath,el_value,0,0);
		Recorder.refresh();


	    break;
		case 'INPUT':
		var o_task;
		//temporal para ver si funciona
        //console.debug('entra a input');
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
		/*obj.type = "FillInputTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
*/
	var	o_task = new FillInputTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;

		}
		///se guarda una tarea nueva //JUNIO 21
		console.debug('guarda el json');
		console.debug(o_task.toJson());
		localStorageManager.insert(o_task.toJson());
		
		//write_localStorage('FillInputTask',sxPath,el_value,0,0);
		Recorder.refresh();
		break;
	 	case 'TEXTAREA':

		var obj = new Object();
		obj.type = "TextAreaTask";
		obj.xPath  = sxPath;
		obj.value = el_value;
		obj.tipo = tipo;
	

		o_task = new TextAreaTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
	
		Recorder.refresh();
        break;
		default:

		break;
		}
}

//======================================================================//
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
	* Crea elementos HTML para manejar la edicion de las tareas
	* @method createEditionContaniner   
	*/
	,createEditionContainer: function(){
	
	var div_editor = document.createElement("div");	
	div_editor.id = "div_editor";
	div_editor.style.cssText="visibility: hidden;position:absolute;width:200px;height:200px;top:50%;left:50%;margin-top:-100px;margin-left:-100px;background-color:white";
	var div_container = document.createElement("div");	
	div_container.id = "div_container";


    var div_consola = document.getElementById('div_consola');
    // div_consola.style.visibility = "hidden";
    div_editor.appendChild(div_container);
	div_consola.appendChild(div_editor);

	}
	/**  
	* Muestra ventana para agregar una tarea primitiva o un augmenter
	* @method addTask    
	*/
	,addTask: function() {

		var that = this;
				var save_task = document.createElement("input");
				save_task.type = "button";
				save_task.value = "Save";
				//save_task.setAttribute('class','class_button');

				save_task.onclick = function(){ 
				//Podria utilizar otro elemento y no el div overlay  <-- borrar 			  		
			    el = document.getElementById("div_editor");
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
		add_task.properties = '{"type":"FillInputTask","atributos":[{"label":"xPath","el_type":"input","value":"/html[1]/body[1]/div[2]/form[1]/input[2]","id":"id_xpath"},{"label":"Valor","el_type":"input","value":"333","id":"id_value"}]}';
		
		//Agrego el augmenter aca, hacer un metodo nuevo y dividir responsabilidades
		el = document.getElementById("div_editor");
        el.style.visibility = "visible";	   
        
		(this.value === "1") ? view.render(el, add_task.inflate()) : view.render(el, add_augmenter.inflate());

		var close_edit = document.createElement("input");
		close_edit.type = "button";
		close_edit.value = "Close";
		//close_edit.setAttribute('class','class_button');

		close_edit.onclick = function(){ 
	  
		   var close_edit = document.getElementById("table_edit");
	       
	 	  el = document.getElementById("div_editor");
	 	  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	  	  that.firstChild.selected = true;
	 	};

	 	//Agrego al final los dos botones
		el.appendChild(save_task);
		el.appendChild(close_edit);

	  	var select_xpath = document.getElementById("input_xpath");

	/*	select_xpath.addEventListener('focus',function(){ var high = new Highlighter(); high.init();},true);
		select_xpath.addEventListener('blur',function(){ var high = new Highlighter(); high.stop();},true);*/
	var select_xpath = document.createElement("input");
		select_xpath.type = "button";
		select_xpath.id = "select_xpath";
		select_xpath.value = "X";
		//select_xpath.setAttribute('class','class_button');
	 	el.appendChild(select_xpath);
		select_xpath.onclick = function(){ 
	  
	  
	  	//var select_xpath = document.getElementById("select_xpath");

	  		//Para ver que ande el highlighter
	 	 var input_xpath = document.getElementById("input_xpath");
	 	 // ////console.debug(input_xpath.parentNode);

	 	 //console.debug('trae input_xpath');
		 var high = new Highlighter();
	
		
		 if(select_xpath.value=='X'){
		 	    	 high.init();
		 	    	 select_xpath.value = "-"
		 	    	 ////console.debug(input_xpath);

		 }else{
		 	    	 high.stop();
		 	    	 select_xpath.value = "XPathEvaluator"
		 }
		 
	 	};

	 var input_xpath = document.getElementById("input_xpath");
	// //console.debug('nananana');
	 var temp = input_xpath.parentNode;

	 temp.appendChild(select_xpath);
	 ////console.debug(temp);

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

	el = document.getElementById("div_editor");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	  
	var table_row = x.parentNode.parentNode;  
	//JUNIO 21
	//VOy a usar el objeto de cada Tarea para 
    //Esto es lo que trae del registro seleccionado
	var edit_task = Object.create(inflater);
    var task = localStorageManager.getObject(table_row.id);
    if(task.type == 'FillInputTask'){
    	var iTask = new FillInputTask();
    	console.debug('es un objeto FillInputTask');
    	console.debug(task);		
		var x = iTask.toHtml(JSON.stringify(task));
		console.debug(x);
    }else if(task.type == 'TextAreaTask'){

		var iTask = new TextAreaTask();
    	console.debug('es un objeto TextAreaTask');
		var x = iTask.toHtml(JSON.stringify(task));
		//console.debug(x);
    }
	view.render(el, x);

	/*****/
	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "X";
	
	close_edit.onclick = function(){ 
	   var close_edit = document.getElementById("table_edit");
	   el = document.getElementById("div_editor");
	   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	   }
	/****/
	  el.appendChild(close_edit); 

	var edit_button = document.createElement('input');
	edit_button.type = "button";
	edit_button.value = "E";
	edit_button.onclick = function(){
    //JUNIO 21 - Aca deberia ser dependiendo el objeto
	//TEMP, Hasta que no guarde bien el JSON 
	//ACA tengo que usar el metodo de la tarea que instancie y no el editor, el editor que se encargue solamente de 
	//objetos json
	iTask.id = table_row.id; //--> Parche!!!! 
	console.debug(iTask.htmlToJson(el));
	localStorageManager.setObjectR(iTask.htmlToJson(el));

    el = document.getElementById("div_editor");
    el.style.visibility = "hidden";
  	
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
	 ////console.debug('empieza a grabar');
	 document.addEventListener("change", eventoChange , false);   
	 start_record.value = "Stop";
	 	
	 }else if(start_record.value == "Stop"){
	 ////console.debug("termino de grabar");	
     start_record.value = "Record" ;
     document.removeEventListener("change", eventoChange, false); 
	 }  
     
	}
	/**  
	* Para de grabar 
	* @method clickStop   
	*/
	,clickStop: function(){
	 
	////console.debug("termino de grabar");
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
    ////console.debug(localStorage);
    Manager.clearCurrentPrimitiveTasks();
    //Trae el localStorage
    var ls = localStorage.getItem("BPM");
    var arr_ls = JSON.parse(ls);
    var i;
        for (i=0;i < arr_ls.length ;i++){

            try{
//Esto tambien esta mal, hay que sacarlo de otra manera, se soluciona cuando tenga el objeto JSON correspondiente
            var xpath = arr_ls[i].atributos[1].value;
            var valor = arr_ls[i].atributos[2].value;
            }catch(err){
            ////console.debug('error atributos');
            }
            //Agrego la tarea y el objeto se encarga de ejecutar lo que sea, con la configuracion que sea

        	try{
            console.debug('agrega essssto');
            console.debug(arr_ls[i].state);

            Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xpath,valor,'',0,arr_ls[i].state);
        
            }catch(err){
            	////console.debug(err);
            }

        }
        console.debug('start');
        var temp = Manager.getCurrentPrimitiveTasks();
        console.debug(temp);
        console.debug('start');

          Manager.start();
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

          //1. Traigo del localStorage el array
          var ls_tasks = localStorage.getItem("BPM");
          var arr_tasks = JSON.parse(ls_tasks);

          for (var i=0;i < arr_tasks.length;i++){

			try{
			var concept = JSON.parse(value).type;	
			}catch(err){
				////console.debug(err);
			}
			
             this.writer(arr_tasks[i].id,arr_tasks[i].type,-1);
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
	

	//this.createHeaderConsole(); 
	RConsole.init();
	this.createEditionContainer();
	Recorder.refresh();

	}
  }
//=========================RConsole====================
/**
* Crea todos los elementos de la consola
* @class RConsole
*/
var RConsole = {
	/**
	* 
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
	,createStopButton: function(){
		//console.debug('1. crea boton Stop');
		var attr_stop = {'disabled':true, 'hidden':false };
		var iStop_recorder = this.createButton('Stop','stop_record',attr_stop);
		iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
		//console.debug(iStop_recorder.nodeName);
		return iStop_recorder;
	 }
	 ,createPlayButton: function(){
	 	//console.debug('2. crea boton Play');
		var iPlay_recorder = this.createButton('Play','play_procedure',null);
		iPlay_recorder.addEventListener("click", Recorder.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createRecordButton: function(){

		//console.debug('3. crea boton Record');
		var iRecord_recorder = this.createButton('Record','start_record',null);
		iRecord_recorder.addEventListener("click",Recorder.clickRecord, false); 
		return iRecord_recorder;
	 }
	 ,createClearButton: function(){
	 	//console.debug('4. crea boton Clear');
		var clear = this.createButton('Clear','clear',null);
		clear.onclick = function(){

		//localStorage.clear();
		localStorage.setItem("BPM",JSON.stringify(new Array()));
        document.getElementById("table_consola").innerHTML = "";
		}; 
		return clear;
	 }
	 ,createShowLocalStorageButton: function(){
		var load = document.createElement('input');
		load.type = "button";
		load.value = "LS";
		load.id = "load";

		load.onclick = function(){	
			console.log("Contenido:");
console.debug(JSON.parse(localStorage.getItem("BPM")));
			//console.debug(localStorage);

									//console.debug("Tamano:");//console.debug(localStorage.length);
								};
	     return load;
		 }
	 ,createaddTasksSelect: function(){

		//console.debug('5. crea Select Tasks');
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
		sAddTask.addEventListener("change", Recorder.addTask , false); 

		return sAddTask;
	 }
	 ,createHeaderContainer: function(){
		//console.debug('7. Crea el div consola');		
		var div_consola = document.createElement("div");
			div_consola.id = "div_consola";		
			div_consola.style.cssText = "overflow:scroll;    z-index: 300;   position: fixed;        left: 0px;      width: auto;        height: 100%;       border: solid 1px #e1e1e1;      vertical-align: middle;         background: #ffdab9;  text-align: center;";
		return div_consola;

	 }
	 ,createHeader: function(){
	 	//console.debug('8. Crea el div consola header');
		var div_consola_header = document.createElement("div");
		div_consola_header.id = "consola_header"
		return div_consola_header;
	 }
	 ,createTableContainer: function(){
	 	//console.debug('9. Crea el div consola table');
		var div_table_consola = document.createElement("div");
		div_table_consola.id =  "div_table_consola";
		return div_table_consola;
	 }
	 ,createTable: function(){
		//console.debug('10. Crea la tabla contenedora de la consola');
		var table_consola = document.createElement("table")
		table_consola.id = "table_consola"
		return table_consola;
	 }
	 ,createShowHide: function(){

	//console.debug('14. crea el div para la solapa show/hide');
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
	var body   = document.body || document.getElementsByTagName('body')[0];

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

	 	
	 	container_header.appendChild(stopButton);
	 	container_header.appendChild(recordButton);
		container_header.appendChild(playButton);
	 	container_header.appendChild(clearButton);
	 	container_header.appendChild(loadButton);
	 	container_header.appendChild(addTaksSelect);
		
		table_console_container.appendChild(table_console);
		container.appendChild(container_header);
		container.appendChild(table_console_container);
		

	 	var body   = document.body || document.getElementsByTagName('body')[0];
	 	
		if (document.body.firstChild){
		      document.body.insertBefore(container, document.body.firstChild);
		    }else{
		      document.body.appendChild(container);
		}
	 	//console.debug('15. Agrega la pestana show/hide');    	
		body.appendChild(show_hide); 
    	body.style.marginLeft = "400px";
	 }
}


//Draggable Edit Window //===============================================//
var dragObj = null;
function draggable(id)
{
    var obj = document.getElementById(id);
    obj.style.position = "absolute";
    obj.onmousedown = function(){
            dragObj = obj;
    }
}
 
document.onmouseup = function(e){
    dragObj = null;
};

document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;

    if(dragObj == null)
        return;

    dragObj.style.left = x +"px";
    dragObj.style.top= y +"px";
};

  
