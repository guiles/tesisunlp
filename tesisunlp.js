/**
 * Tesis Ing. Guillermo A. Caserotto
 * @module BPMA
*/
/*
 * Eventos que voy a tratar:
 * onChange: select, text, textarea
 * onClick: select, text, textarea --> en los botones de submit?
 * onFocus: select, text, textarea
 * onSelect: text, textarea
 */
 /**
 * @class Manager
 * @extends BPMA
 */
var Manager = (function () {
	"use strict";
    var currentPrimitiveTasks = []; //Array de las tareas a realizar cuando se ejecuta el Manager
    var primitiveTasks = ['FillInputTask','SelectOptionTask','TextAreaTask','CheckBoxTask']; //Un array de tareas que puede realizar
    var indice;
    var arr_tareas;
        /**
        * @method Subscribe
        */
        function subscribe(aPrimitiveTask){ //Este metodo por ahora solo agrega el objeto 
         currentPrimitiveTasks.push(aPrimitiveTask);
        }
        /**
        * @method createFillInputTask
        */
        function createFillInputTask(aId,xPath,value,aMsg,aTipo,aState){
        return  new FillInputTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createSelectOptionTask
        */

        function createSelectOptionTask(aId,xPath,value,aMsg,aTipo,aState){
        return new SelectOptionTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createTextAreaTask
        */
        function createTextAreaTask(aId,xPath,value,aMsg,aTipo,aState){
        return new TextAreaTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createCheckBoxTask
        */
        function createCheckBoxTask(aId,xPath,value,aMsg,aTipo,aState){
        return new CheckBoxTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createRadioTask
        */
        function createRadioTask(aId,xPath,value,aMsg,aTipo,aState){
        return new RadioTask(aId,xPath,value,aMsg,aTipo,aState);
        }
        /**
        * @method createClickLinkTask
        */
        function createClickLinkTask(aId,xPath,value,aMsg,aTipo,aState){
        return new ClickLinkTask(aId,xPath,value,aMsg,aTipo,aState);
        }
    	return {
        /**
        * @method incrementIndice
        */
		     incrementIndice: function(){
				this.indice = this.indice + 1;
		     }
        /**
        * @method getIndice
        */
		     ,getIndice: function(){
				return this.indice;
		     }
        /**
        * @method setIndice
        */     
		     ,setIndice:function(val){
		     	this.indice = val;	
		      }
        /**
        * @method getNextTask
        */       
           	,getNextTask : function(){ //Me trae la proxima tarea pendiente
           		console.debug("Trae la siguiente tarea");
           		//console.debug(currentPrimitiveTasks.length);
           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                return currentPrimitiveTasks[i]; 
                       }else{
                       	//console.debug("Esto esta mal");
        						//console.debug(i);
                       }
            	}
        	}
        /**
        * @method getNextTaskTimer
        */    
        	,getNextTaskTimer : function(){ //Me trae la proxima tarea pendiente
           		console.debug("Trae la siguiente tarea");
           		//console.debug(currentPrimitiveTasks.length);
           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                return currentPrimitiveTasks[i]; 
                       }else{
                       	//console.debug("Esto esta mal");
        			    //console.debug(i);
                       }
            	}
        	}
        /**
        * @method start
        */  
        	,start: function(){

		          Manager.setIndice(0);
		          Manager.executeNextTaskWithTimer();
        	}
        /**
        * @method clearCurrentPrimitiveTasks
        */       
        	,clearCurrentPrimitiveTasks: function(){
            currentPrimitiveTasks=[];
        	}
        /**
        * @method addPrimitiveTask
        */    
        	,addPrimitiveTask : function(aId,aPrimitiveTaskType,xPath,value,msg,tipo,state){
                console.debug('estado de la tarea dentro de add');
                console.debug(aPrimitiveTaskType);
    		//Este metodo reemplaza al switch
	    	var lookup = 
	    	{ FillInputTask: createFillInputTask(aId,xPath,value,msg,tipo,state)
	    	, SelectOptionTask: createSelectOptionTask(aId,xPath,value,msg,tipo,state)
	    	, TextAreaTask: createTextAreaTask(aId,xPath,value,msg,tipo,state)
	    	, CheckBoxTask: createCheckBoxTask(aId,xPath,value,msg,tipo,state)
            , ClickLinkTask: createClickLinkTask(aId,xPath,value,msg,tipo,state) } 
	    	, def = null ;

	    	lookup[aPrimitiveTaskType] ? subscribe(lookup[aPrimitiveTaskType]) : def();
		   
    		}
        /**
        * @method getCurrentPrimitiveTasks
        */  
        	,getCurrentPrimitiveTasks: function(){
        	return currentPrimitiveTasks;
        	}
        /**
        * @method highlightElement
        */ 
        	,highlightElement: function(obj){
			   var orig = obj.style.outline;
			   //obj.style.outline = "0.25em solid #FFFF00";
			   obj.classList.add("cssClass");
			   setTimeout(function(){
			   		obj.classList.remove("cssClass");
			   }, 1500);
			}
        /**
        * @method executeNextTaskWithTimer
        */ 
			,executeNextTaskWithTimer: function(){

            var arr_tareas =  Manager.getCurrentPrimitiveTasks();

                setTimeout(function () {    

                var indice = Manager.getIndice();	
              //  console.debug("estado de la tarea");
              //  console.debug(arr_tareas[indice]);	

                if(arr_tareas[indice].state == 0)
                arr_tareas[indice].execute();
                
                    if (indice < arr_tareas.length) { 
                    Manager.incrementIndice(); 
                    Manager.executeNextTaskWithTimer();                     
                    
                    }else{
                    return false;
                    }                        
                }, 500);
            }
        };
}());

//PrimitiveTasks.js//========================================//

//===========================================================
/**
* @class localStorageManager
*/
localStorageManager = {
    
    /**
    * Trae la tarea del localStorage
    * @method
    */
    getObject: function(id){
        var tasks = localStorage.getItem("BPM");
        var temp = JSON.parse(tasks);
        var i;
        for (i = 0; i < temp.length; i = i + 1) {
           // console.debug(temp[i]);
            if(temp[i].id == id) return temp[i];
        };

    return false;
    }
 
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    */
    ,setObject: function(id,json_task){
        
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == id) {
                
                var task = JSON.parse(json_task);
                obj_tasks[i].atributos = task.atributos; 
            }
        };
    
    localStorage.setItem("BPM",JSON.stringify(obj_tasks)); 
    return true;
    }
    /**
    * Reemplaza atributos de la tarea en el localStorage
    * @method
    * @params: json_tasks (un objeto JSON)
    */
    ,setObjectR: function(json_task){
        console.debug('esto es lo que guarda');
        var o = JSON.parse(json_task);
        console.debug(json_task);
        console.debug(o);
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == o.id) {
                
                obj_tasks[i] = o; 
            }
        };
   // console.debug(JSON.stringify(obj_tasks));
    localStorage.setItem("BPM",JSON.stringify(obj_tasks)); 
    return true;
    }
    ,insert: function(json_object){ //Esto es como un insert en el localStorage, arriba esta el set y se puede reutilizar(?)
    //PARCHE--> Cuando modifique el JSON ya no va a estar mas
    //Traigo el array
    var ls = localStorage.getItem("BPM");
    var arr_ls = JSON.parse(ls);
    var id = arr_ls.length;
    var o = JSON.parse(json_object);
    o.id = id;
    o.atributos[0].value = id; //----> Parche
    arr_ls.push(o);
    //Lo convierto en JSON
    var json_task = JSON.stringify(arr_ls);
    localStorage.setItem("BPM",json_task);
    

    }
}


//=========================================================================

var write_localStorage = function(task,xPath,value,taskType,state){
//console.debug('write_localStorage');


     // var some_properties = '{"type": "FillInputTask","atributos": [{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
     // ,{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}]}';
    var obj_task = new Object();
        obj_task.id = 0 ;    
        obj_task.type = task;
        obj_task.state = state;
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

    //Traigo el array
    var ls = localStorage.getItem("BPM");
    var arr_ls = JSON.parse(ls);
    if(Array.isArray(arr_ls)) console.debug('asdads');
    var id = arr_ls.length;
    obj_task.id = id;
        arr_ls.push(obj_task);
    //Lo convierto en JSON
    var json_task = JSON.stringify(arr_ls);
    localStorage.setItem("BPM",json_task);
    
    //var id = localStorage.length + 1;

    //localStorage.setItem(id, json_task);
}

window.onload = function(){

var css_styles = {
	class_button:"background-color: #24890d;border: 0;border-radius: 2px;color: #fff;font-size: 12px;font-weight: 700;padding: 10px 30px 11px;text-transform: uppercase;vertical-align: bottom;"
};
//Agrego los estilos para el plugin
//@TODO: realizar una clase que maneje y englobe
var css = " .class_button { background-color: #24890d; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;} .cssClass{ outline: 0.25em solid #FFFF00;} ";
 var   head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);


//EventoChange.js//RConsole.js===========================//
//Recorder.js//RConsole.js======================//

//RConsole.js//===============================//
//edit.js//===============================//

//localStorage.setItem("BPM",JSON.stringify(new Array()));

//Inicia el Recorder
Recorder.init();
draggable('div_editor');

//Guardo el contenedor de Tareas
var esta = localStorage.getItem("BPM");
if(!esta){
localStorage.setItem("BPM",JSON.stringify(new Array()));
//localStorage.setItem("BPMEXECUTION",0);
console.debug(localStorage);
}else{

console.debug('Ya existe la variable BPM, verifico la ejecucion'); 
console.debug(localStorage.getItem("BPMEXECUTION"));
var grabando = localStorage.getItem("BPMRECORDING")
    if(grabando == 1){
    //Parche!
    var el = document.getElementById('start_record').click();
    }
var ejecucion = localStorage.getItem("BPMEXECUTION")
if(ejecucion == 1){
    //Parche!
    var el = document.getElementById('play_procedure').click();
    }

}



console.debug(localStorage);
};	