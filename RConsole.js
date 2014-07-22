/**
 * 
 * @module RConsole
*/
window.onbeforeunload = function(e) {
  //console.debug('Se fue de la pagina');
};
/**  
* Listener de eventos cuando cambia el foco, recolecta datos relacionados.
* @event eventoChange
*/

var eventoClick = function(event){
//alert('asdasd');

	//console.debug("Evento: "+event.currentTarget.nodeName+", "+event.detail.message);
	//console.debug("Evento: "+event.target.nodeName+", "+event.detail);

	//event.preventDefault();
	
	if(event.target.nodeName == 'A' ) {

	//console.debug('se va a otro lado, registro el evento/Tarea');
	
		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
	
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		////console.debug("no tiene id, saco el absoluto, uso el ejemplo de stack");
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		////console.debug(sxPath);
		}

	var o_task = new ClickLinkTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		

		//console.debug('guarda el json');
		//console.debug(o_task.toJson());
		localStorageManager.insert(o_task.toJson());
				
		Recorder.refresh();

	} 
}
var eventoChange = function(event){

    	////console.debug("Empieza a grabar registroEventoChange");
    
		//Temporal, para asignarle si es tarea automatica, deberia ir en la consola
		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		//Si tiene id le pongo el xPath //*[@id="THE_ID"]
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ //Si no tiene ID tengo que ver la manera de sacar el absoluto
		////console.debug("no tiene id, saco el absoluto, uso el ejemplo de stack");
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		////console.debug(sxPath);
		}

		//Guardo en el JSON compartido que sirve para el recorder.
		//Diferencio los tipos de nodos, ahi le envio el tipo de tarea que recolecto.
		switch(event.target.nodeName)
		{
		case 'SELECT':
		var o_task = new SelectOptionTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		
		//console.debug('guarda el json');
		//console.debug(o_task.toJson());
		localStorageManager.insert(o_task.toJson());
				
		Recorder.refresh();

	    break;
		case 'INPUT':
		var o_task;
		//temporal para ver si funciona
        ////console.debug('entra a input');
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
		//console.debug('guarda el json');
		//console.debug(o_task.toJson());
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

var addInputTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
//console.debug(event.target.nodeName);
	//event.target.nodeName
	if(event.target.nodeName == 'INPUT'){ 	
	
	var	o_task = new FillInputTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addInputTaskEvent, false); 


	}
}

var addTextAreaTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
//console.debug(event.target.nodeName);
	//event.target.nodeName
	if(event.target.nodeName == 'TEXTAREA'){ 	
	
	var	o_task = new TextAreaTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addTextAreaTaskEvent, false); 


	}
}
var addSelectOptionTaskEvent = function(event){

		var tipo = 0;
		var el_id = event.target.id;
		var el_value = event.target.value;
		
		if(el_id){
		var sxPath = '//*[@id="'+el_id+'"]';
		}else{ 
		var sxPath = Recorder.createXPathFromElement(event.target) ;
		}
//console.debug(event.target.nodeName);
	//event.target.nodeName
	if(event.target.nodeName == 'SELECT'){ 	
	
	var	o_task = new SelectOptionTask();
		o_task.xPath = sxPath;
		o_task.value = el_value;
		o_task.tipo = tipo;
		localStorageManager.insert(o_task.toJson());
		Recorder.refresh();
	document.removeEventListener("change", addSelectOptionTaskEvent, false); 


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
	* Muestra ventana para agregar una tarea primitiva y capturar ese evento
	* @method addPrimitiveTask    
	*/
	,addPrimitiveTask: function(event) {
		
		var id_selected = event.target.options[event.target.options.selectedIndex].value;
		if(id_selected == 2){
		Recorder.addAugmentedTask();
		return false;	
		}

	var el_add_inflate = document.getElementById("div_add_inflate");
		
	var that = this;

	var ok_task = document.createElement("input");
	ok_task.type = "button";
	ok_task.value = "Ok";
	ok_task.addEventListener('click',function(){
	
	that.firstChild.selected = true;	
	var el = document.getElementById("div_add_container");
	el.style.visibility = 'hidden';
	//Despues mejoro el codigo, lo hago para terminar las funcionalidades
	if(event_type == 1){
		document.addEventListener("change", addInputTaskEvent, false); 
	}else if(event_type == 2){
		document.addEventListener("change", addTextAreaTaskEvent, false); 
	}else if(event_type == 3){
				console.debug('eeehhhh');

		document.addEventListener("change", addSelectOptionTaskEvent, false); 
	}else if(event_type == 4){
		console.debug('eeehhhh');
		//document.addEventListener("change", addInputTaskEvent, false); 
	}
	});
		
	var el_container = document.getElementById("div_add_container");
	el_container.style.visibility = "visible";
	var event_type;
    //Traigo el select de las tareas y modifico el HTML segun el tipo de tarea
    var el_sel = document.getElementById("id_primitive_task");
	el_sel.addEventListener('change',function(x){
	console.debug('change');
	var task;
	console.debug(x.target.options.selectedIndex);
	if(x.target.options.selectedIndex == 1){ //Si Es FillInputTask
	console.debug('escucha evento indicado');
	event_type = 1;
	}else if(x.target.options.selectedIndex == 2){
	console.debug('escucha otro evento indicado');
	event_type = 2;
	}else if(x.target.options.selectedIndex == 3){
	console.debug('escucha otro evento indicado');
	event_type = 3;
	}else if(x.target.options.selectedIndex == 4){
	console.debug('escucha otro evento indicado');
	event_type = 4;
	}

	});


var close_task = document.createElement("input");
	close_task.type = "button";
	close_task.value = "Close";
	close_task.addEventListener('click',function(){
	
	that.firstChild.selected = true;

	var el = document.getElementById("div_add_container");
	el.style.visibility = 'hidden';
	//console.debug(el);
	});
	
 	var div_footer = document.getElementById("div_add_footer");
 	div_footer.innerHTML="";
	//Agrego al final los dos botones
	div_footer.appendChild(ok_task);
	div_footer.appendChild(close_task);
	 
	}
	/**  
	* Muestra ventana para agregar una tarea primitiva o un augmenter
	* @method addTask    
	*/
	,addAugmentedTask: function() {
	//===============================================//

function handleSelectxPath(){
		  var high = new Highlighter();

		high.stop();
	  	console.debug('clic clic clic');
	  	var el = document.getElementById('div_add_container');
	  	el.style.visibility = 'visible';
}
	//==============================================//

	var div_add_aug_inflate = document.getElementById("div_add_aug_inflate");

	var that = this;
	var save_task = document.createElement("input");
	save_task.type = "button";
	save_task.value = "Save";
	//save_task.setAttribute('class','class_button');

	save_task.onclick = function(x){ 
	//Que tipo de tarea tiene que guardar!?
	console.debug('guarda esto en el localStorage');
	el = document.getElementById("div_add_aug_inflate");
	
	var task = new LinkATask();
	var j = task.htmlToJson(el);
	console.debug('inserta esto!');
	console.debug(j);
	localStorageManager.insert(j);
	Recorder.refresh();

	};
		
	var el_container = document.getElementById("div_add_aug_container");
	el_container.style.visibility = "visible";
	
	
    //Traigo el select de las tareas y modifico el HTML segun el tipo de tarea
    var el_sel = document.getElementById("id_augmented_task");
	el_sel.addEventListener('change',function(x){
	console.debug('change');
	var task;
	//console.debug(x.target.options.selectedIndex);
	if(x.target.options.selectedIndex == 1){ //Si Es FillInputTask
	task = new LinkATask();
	}else if(x.target.options.selectedIndex == 2){
	task = new LinkATask();
	}

	view.render(div_add_aug_inflate, task.toHtml(task.emptyToJson()));	

	});

	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "Close";
	//close_edit.setAttribute('class','class_button');

	close_edit.onclick = function(){ 
  	  el = document.getElementById("div_add_aug_container");
 	  el.style.visibility = "hidden";
 	  that.firstChild.selected = true;
 	  document.removeEventListener('dblclick',handleSelectxPath,false);
 	};

 	var div_footer = document.getElementById("div_add_aug_footer");
 	div_footer.innerHTML="";
	//Agrego al final los dos botones
	div_footer.appendChild(save_task);
	div_footer.appendChild(close_edit);
	
	//el_container.appendChild(div_footer);
	
	// Podria ser que se oculte el 
  	var select_xpath = document.getElementById("input_xpath");

	/*	select_xpath.addEventListener('focus',function(){ var high = new Highlighter(); high.init();},true);
		select_xpath.addEventListener('blur',function(){ var high = new Highlighter(); high.stop();},true);*/
	var select_xpath = document.createElement("input");
		select_xpath.type = "button";
		select_xpath.id = "select_xpath";
		select_xpath.value = "X";
		//select_xpath.setAttribute('class','class_button');
	 	//el.appendChild(select_xpath);
		select_xpath.onclick = function(){ 
	  var high = new Highlighter();

	  var el = document.getElementById('div_add_aug_container');
	  el.style.visibility = 'hidden';
	  high.init();

	  document.addEventListener('dblclick',handleSelectxPath,false);
	  	//var select_xpath = document.getElementById("select_xpath");
	  	//Para ver que ande el highlighter
	 	var input_xpath = document.getElementById("input_xpath");
	 	
	 	////console.debug('trae input_xpath');
		
	
		if(select_xpath.value=='X'){
		 	    high.init();
		 	    select_xpath.value = "-"
		 	    	 //////console.debug(input_xpath);

		}else{
		 	    high.stop();
		 	    //select_xpath.value = "XPathEvaluator"
		 	    el.style.visibility = 'visible';
		}
		 
	 	};

	 var input_xpath = document.getElementById("input_xpath");
	// ////console.debug('nananana');
	// var temp = input_xpath.parentNode;
	div_footer.appendChild(select_xpath);
	 //temp.appendChild(select_xpath);
	 
	}
	/**  
	* si bien esto es repetir codigo, por ahora lo hago asi hasta que tenga un diseño mas copado, (Ver Imagen del Pizarron)
	* @method Consola.editRow    
	*/
	,editRow: function(x) {

    //Trae el objeto que corresponde, segun el tipo de Tarea y le delega a el la tarea de armar los parametros para armar
    //el HTML ( objeto JSON)
	el = document.getElementById("div_inflate");
	var edition_container = document.getElementById("div_editor_container");

	edition_container.style.visibility = (edition_container.style.visibility == "visible") ? "hidden" : "visible";
	  
	var table_row = x.parentNode.parentNode;  
	//JUNIO 21
	//VOy a usar el objeto de cada Tarea para 
    //Esto es lo que trae del registro seleccionado
	var edit_task = Object.create(inflater);
    var task = localStorageManager.getObject(table_row.id);
    if(task.type == 'FillInputTask'){
    	var iTask = new FillInputTask();
    	//console.debug('es un objeto FillInputTask');
    	//console.debug(task);		
		var x = iTask.toHtml(JSON.stringify(task));
		//console.debug(x);
    }else if(task.type == 'TextAreaTask'){

		var iTask = new TextAreaTask();
    	//console.debug('es un objeto TextAreaTask');
		var x = iTask.toHtml(JSON.stringify(task));
		////console.debug(x);
    }else if(task.type == 'SelectOptionTask'){

		var iTask = new SelectOptionTask();
    	//console.debug('es un objeto SelectOptionTask');
    	//console.debug(JSON.stringify(task));
		var x = iTask.toHtml(JSON.stringify(task));
		////console.debug(x);
    }else if(task.type == 'ClickLinkTask'){

		var iTask = new ClickLinkTask();
    	//console.debug('es un objeto SelectOptionTask');
    	//console.debug(JSON.stringify(task));
		var x = iTask.toHtml(JSON.stringify(task));
		////console.debug(x);
    }

	view.render(el, x);

	/*****/
	var close_edit = document.createElement("input");
	close_edit.type = "button";
	close_edit.value = "Close";
	
	close_edit.onclick = function(){ 
	   //var close_edit = document.getElementById("table_edit");
	   el = document.getElementById("div_editor_container");
	   el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	}
	/****/
	

	var edit_button = document.createElement('input');
	edit_button.type = "button";
	edit_button.value = "Edit";
	
	edit_button.onclick = function(){
    //JUNIO 21 - Aca deberia ser dependiendo el objeto
	//TEMP, Hasta que no guarde bien el JSON 
	//ACA tengo que usar el metodo de la tarea que instancie y no el editor, el editor que se encargue solamente de 
	//objetos json
	iTask.id = table_row.id; //--> Parche!!!! 
	localStorageManager.setObjectR(iTask.htmlToJson(el));

    el = document.getElementById("div_editor_container");
    el.style.visibility = "hidden";
  	
	};

    var div_footer = document.getElementById("div_editor_footer");
    div_footer.innerHTML="";
	var el_hr = document.createElement('hr');
	div_footer.appendChild(el_hr);
	div_footer.appendChild(edit_button); 
   	div_footer.appendChild(close_edit); 

	}
	/**  
	* Dispara el handler de record
	* @method clickRecord   
	*/
	,clickRecord: function(){
	
     var start_record = document.getElementById('start_record');
	 if(start_record.value == "Record"){
	 //////console.debug('empieza a grabar');
	 document.addEventListener("change", eventoChange , false);   
	 document.addEventListener("click", eventoClick , false);
	 //document.addEventListener("onbeforeunload", eventoClick , false);
	 start_record.value = "Stop";
	localStorage.setItem("BPMRECORDING",1);
	 }else if(start_record.value == "Stop"){
	 //////console.debug("termino de grabar");	
     start_record.value = "Record" ;
     document.removeEventListener("change", eventoChange, false); 
     document.removeEventListener("click", eventoClick , false);
     //document.removeEventListener("onbeforeunload", eventoClick , false);
	 
	 localStorage.setItem("BPMRECORDING",0);
	 }  
     
	}
	/**  
	* Para de grabar 
	* @method clickStop   
	*/
	,clickStop: function(){
	 
	//////console.debug("termino de grabar");
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

		//Parche!!! Le mando al localStorage el estado de ejecucion		
		localStorage.setItem("BPMEXECUTION",1);

//==================================================
//NO ME CIERRAAAAA!!!!
Manager.clearCurrentPrimitiveTasks();
var arr_ls = Manager.initCurrentPrimitiveTasks();
if( arr_ls.length == 0){
	//console.debug('no hay mas tareas');
	localStorage.setItem("BPMEXECUTION",0);
	return false;
}

//=================================================

  		var i;
        for (i=0;i < arr_ls.length ;i++){

//Hardcodeo para ver si funciona, creo que tengo que modificar la manera en que se instancian las tareas

        	if(arr_ls[i].type == 'LinkATask'){
			//alert('linkkkk');
			console.debug('arr_ls[i]');

			var aug_task = new LinkATask(arr_ls[i].id,arr_ls[i].type,xpath,valor,'',0,arr_ls[i].state);
			console.debug(aug_task);
			var c_t = Manager.getCurrentPrimitiveTasks();
			c_t.push(aug_task);

        	}

            try{
			//Esto tambien esta mal, hay que sacarlo de otra manera, se soluciona cuando tenga el objeto JSON correspondiente
            var xpath = arr_ls[i].atributos[1].value;
            var valor = arr_ls[i].atributos[2].value;
            }catch(err){
            //////console.debug('error atributos');
            }
            //Agrego la tarea y el objeto se encarga de ejecutar lo que sea, con la configuracion que sea

        	try{
            
            Manager.addPrimitiveTask(arr_ls[i].id,arr_ls[i].type,xpath,valor,'',0,arr_ls[i].state);
        
            }catch(err){
            	//////console.debug(err);
            }

        }
        
        console.debug(Manager.getCurrentPrimitiveTasks());
        
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
				//////console.debug(err);
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
			
			//localStorage.removeItem(id);
			//
			
			//iTask.htmlToJson(el)
			localStorageManager.removeElement(id);

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
	
	RConsole.init();
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
	* @method createAddAugContainer
	*/
	createAddAugContainer: function(){
	
	var div_add_aug_container = document.createElement("div");	
	div_add_aug_container.id = "div_add_aug_container";
	div_add_aug_container.style.cssText="visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	

	var div_add_aug_header = document.createElement("div");	
	div_add_aug_header.id = "div_add_aug_header";
	div_add_aug_header.style.cssText="";

    var header_aug_title = document.createTextNode('Add Task');
	div_add_aug_header.appendChild(header_aug_title);

	var div_select_aug_tasks = document.createElement('div');
	div_select_aug_tasks.id = 'div_select_aug_tasks';

	var div_add_aug_inflate = document.createElement("div");	
	div_add_aug_inflate.id = "div_add_aug_inflate";

	var div_add_aug_footer = document.createElement("div");	
	div_add_aug_footer.id = "div_add_aug_footer";
	div_add_aug_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_add_aug_container.appendChild(div_add_aug_header);
    div_add_aug_container.appendChild(div_select_aug_tasks);
    div_add_aug_container.appendChild(div_add_aug_inflate);
    div_add_aug_container.appendChild(div_add_aug_footer);
	//div_consola.appendChild(div_editor);

	//=========================Agrego el Container
	var el_select_aug_inflate = document.getElementById("div_select_aug_inflate");
    var elements = new Array();
    	
    var option_aug_el = Object.create(optionsElement);
    	option_aug_el.id = 'id_augmented_task';
        option_aug_el.label = "Augmented Task";
        option_aug_el.options[0] = ['Select Task',0]; //deberia ser disabled
        option_aug_el.options[1] = ['GoToLink ATask',1];
        option_aug_el.options[2] = ['Another Task',2];
        console.debug(option_aug_el);
        elements.push(option_aug_el);
      	view.render(div_select_aug_tasks, elements);	
	//==========================

	return div_add_aug_container;
	}
	/**
	* @method createEditionContainer
	*/
	,createAddContainer: function(){
	
	var div_add_container = document.createElement("div");	
	div_add_container.id = "div_add_container";
	div_add_container.style.cssText="visibility: hidden;position:absolute;width:200px;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	

	var div_add_header = document.createElement("div");	
	div_add_header.id = "div_add_header";
	div_add_header.style.cssText="";

    var header_title = document.createTextNode('Task Editor');
	div_add_header.appendChild(header_title);

	var div_select_tasks = document.createElement('div');
	div_select_tasks.id = 'div_select_tasks';

	var div_add_inflate = document.createElement("div");	
	div_add_inflate.id = "div_add_inflate";

	var div_add_footer = document.createElement("div");	
	div_add_footer.id = "div_add_footer";
	div_add_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_add_container.appendChild(div_add_header);
    div_add_container.appendChild(div_select_tasks);
    div_add_container.appendChild(div_add_inflate);
    div_add_container.appendChild(div_add_footer);
	//div_consola.appendChild(div_editor);

	//=========================Agrego el Container
	var el_select_inflate = document.getElementById("div_select_inflate");
    var elements = new Array();
    	
    var option_el = Object.create(optionsElement);
    	option_el.id = 'id_primitive_task';
        option_el.label = "Primitive Task";
        option_el.options[0] = ['Select Task',0]; //deberia ser disabled
        option_el.options[1] = ['FillInputTask',1];
        option_el.options[2] = ['TextAreaTask',2];
        option_el.options[3] = ['SelectOptionTask',3];
		option_el.options[4] = ['ClickLinkTask',4];
        
        elements.push(option_el);
      	view.render(div_select_tasks, elements);	
	//==========================

	return div_add_container;
	}
	/**
	* @method createEditionContainer
	*/
	 ,createEditionContainer: function(){
	
	var div_editor_container = document.createElement("div");	
	div_editor_container.id = "div_editor_container";
	div_editor_container.style.cssText="visibility: hidden;position:absolute;width:auto;height:auto;top:30%;left:50%;margin-top:-100px;margin-left:-100px;background-color:rgb(225, 218, 185);border: solid black;";
	//div_editor_container.style.cssText="position:absolute;width:200px;height:200px;top:20%;left:50%;margin-top:-100px;margin-left:-100px;background-color:red";
	

	var div_editor_header = document.createElement("div");	
	div_editor_header.id = "div_editor_header";
	div_editor_header.style.cssText="";

	var el_hr = document.createElement('hr');
	
    var header_title = document.createTextNode('Task Editor');
	div_editor_header.appendChild(header_title);	
	div_editor_header.appendChild(el_hr);
	
	var div_editor_preconditions = document.createElement("div");	
	div_editor_preconditions.id = "div_editor_preconditions";
	div_editor_preconditions.style.cssText="";
	var header_title_preconditions = document.createTextNode('Preconditions');
	var el_hr_preconditions = document.createElement('hr');
	div_editor_preconditions.appendChild(header_title_preconditions);	
	div_editor_preconditions.appendChild(el_hr_preconditions);



	var div_inflate = document.createElement("div");	
	div_inflate.id = "div_inflate";
	

	var div_editor_footer = document.createElement("div");	
	div_editor_footer.id = "div_editor_footer";
	div_editor_footer.style.cssText="";
    
    // div_consola.style.visibility = "hidden";
    div_editor_container.appendChild(div_editor_header);
    div_editor_container.appendChild(div_editor_preconditions);
    div_editor_container.appendChild(div_inflate);
    div_editor_container.appendChild(div_editor_footer);
	//div_consola.appendChild(div_editor);
	
	console.debug(div_editor_footer);
	return div_editor_container;
	}
	/**
	* 
	* @method createButton
	*/
	,createButton: function(aValue,anId,attributes){

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
		////console.debug('1. crea boton Stop');
		var attr_stop = {'disabled':true, 'hidden':false };
		var iStop_recorder = this.createButton('Stop','stop_record',attr_stop);
		iStop_recorder.addEventListener("click", Recorder.clickStop , false); 
		////console.debug(iStop_recorder.nodeName);
		return iStop_recorder;
	 }
	 ,createPlayButton: function(){
	 	////console.debug('2. crea boton Play');
		var iPlay_recorder = this.createButton('Play','play_procedure',null);
		iPlay_recorder.addEventListener("click", Recorder.clickPlay , false); 
		return iPlay_recorder;
	 }
	 ,createRecordButton: function(){

		////console.debug('3. crea boton Record');
		var iRecord_recorder = this.createButton('Record','start_record',null);
		iRecord_recorder.addEventListener("click",Recorder.clickRecord, false); 
		return iRecord_recorder;
	 }
	 ,createClearButton: function(){
	 	////console.debug('4. crea boton Clear');
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
		console.log(JSON.parse(localStorage.getItem("BPM")));
		console.log('ejecutando:');
		console.log(localStorage.getItem("BPMEXECUTION"));
		console.log('grabando:');
		console.log(localStorage.getItem("BPMRECORDING"));
		console.log(localStorage);

									////console.debug("Tamano:");////console.debug(localStorage.length);
								};
	     return load;
		 }
	 ,createaddTasksSelect: function(){

		////console.debug('5. crea Select Tasks');
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
		//sAddTask.addEventListener("change", Recorder.addTask , false); 
		sAddTask.addEventListener("change", Recorder.addPrimitiveTask , false); 

		return sAddTask;
	 }
	 ,createHeaderContainer: function(){
		////console.debug('7. Crea el div consola');		
		var div_consola = document.createElement("div");
			div_consola.id = "div_consola";		
			div_consola.style.cssText = "overflow:scroll;    z-index: 300;   position: fixed;        left: 0px;      width: auto;        height: 100%;       border: solid 1px #e1e1e1;      vertical-align: middle;         background: #ffdab9;  text-align: center;";
		return div_consola;

	 }
	 ,createHeader: function(){
	 	////console.debug('8. Crea el div consola header');
		var div_consola_header = document.createElement("div");
		div_consola_header.id = "consola_header"
		
		return div_consola_header;
	 }
	 ,createTableContainer: function(){
	 	////console.debug('9. Crea el div consola table');
		var div_table_consola = document.createElement("div");
		div_table_consola.id =  "div_table_consola";
		return div_table_consola;
	 }
	 ,createTable: function(){
		////console.debug('10. Crea la tabla contenedora de la consola');
		var table_consola = document.createElement("table")
		table_consola.id = "table_consola"
		return table_consola;
	 }
	 ,createShowHide: function(){

	////console.debug('14. crea el div para la solapa show/hide');
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
		var editor_container = this.createEditionContainer();
		var add_container = this.createAddContainer();
	 	var add_aug_container = this.createAddAugContainer();

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



		body.appendChild(editor_container);
		body.appendChild(add_container);
		body.appendChild(add_aug_container);
	 	////console.debug('15. Agrega la pestana show/hide');    	
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

  
