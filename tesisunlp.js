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
           		////console.debug("Trae la siguiente tarea");
           		//////console.debug(currentPrimitiveTasks.length);
           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                return currentPrimitiveTasks[i]; 
                       }else{
                       	//////console.debug("Esto esta mal");
        						//////console.debug(i);
                       }
            	}
        	}
        /**
        * @method getNextTaskTimer
        */    
        	,getNextTaskTimer : function(){ //Me trae la proxima tarea pendiente
           		////console.debug("Trae la siguiente tarea");
           		//////console.debug(currentPrimitiveTasks.length);

           		var i;
            	for (i = 0;i < currentPrimitiveTasks.length;i=i+1){
            		   
                       
                       if(currentPrimitiveTasks[i].getState() === 0 ) { 
                          return currentPrimitiveTasks[i]; 
                       }else{
                       	//////console.debug("Esto esta mal");
        			    //////console.debug(i);
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
                ////console.debug('estado de la tarea dentro de add');
                ////console.debug(aPrimitiveTaskType);
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
        //Que me devuelva las que estan en estado 0, para ejectuar
        	,getCurrentPrimitiveTasks: function(){
        	return currentPrimitiveTasks;
        	}
            
            ,initCurrentPrimitiveTasks: function(){
               this.currentPrimitiveTasks = [];
               var tasks = localStorageManager.getCurrentTasks();
               return tasks;
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
			   }, 1000);
			}
         
        ,hayTareas: function(){

            var a = localStorageManager.getCurrentTasks();
            //console.debug('hay tareas?');
            //console.debug(a);
            if(typeof a == "undefined"){
            //console.debug('no, no hay');    
            return false;
            }
            
            for (var i = 0; i < a.length; i++) {
                if(a[i].state == 0){
                    return true;    
                }
            }
            return false;
            }
        
        /**
        * @method executeNextTaskWithTimer
        */
			,executeNextTaskWithTimer: function(){

            //Tiene que traer las tareas del localStorage
            var arr_tareas =  Manager.getCurrentPrimitiveTasks();
            
            //Esto hay que modificarlo, no me gusta como esta
            //Si el indice es igual( ya llego a ejecutar todas las tareas)

                setTimeout(
                    function () {    

                        var indice = Manager.getIndice();           
                        
                        
                        if(typeof arr_tareas[indice] == "undefined") {
                            //Asumo que finalizo el procedimiento
                            //Fijate un metodo que trae la siguiente tarea 
                            //La finalizacion del procedimiento pone en cero el estado y sale.    
                            localStorage.setItem("BPMEXECUTION",0);
                            return false;
                        }
                        //siempre trae las tareas con estado 0, este if esta al pedo.
                     
                            var task = arr_tareas[indice]; 
                            task.execute();
                            
                            Manager.incrementIndice(); 
                            Manager.executeNextTaskWithTimer();                     

                    }

                , 1000);
            }
            ,init: function(){

             //Si esta ejecutando 
             //Este metodo es para inicializar el Manager y para que contemple todos los escenarios
            
            }
        };
}());

//PrimitiveTasks.js//========================================//

//===========================================================
/**
* Este Manager en algun momento tendria que generalizarse y persistir en otros servidores
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
           // ////console.debug(temp[i]);
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
        ////console.debug('esto es lo que guarda');
        var o = JSON.parse(json_task);
        ////console.debug(json_task);
        ////console.debug(o);
        var tasks = localStorage.getItem("BPM");
        var obj_tasks = JSON.parse(tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == o.id) {
                
                obj_tasks[i] = o; 
            }
        };
   // ////console.debug(JSON.stringify(obj_tasks));
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
    console.debug(o)
    o.id = id;
    o.atributos[0].value = id; //----> Parche
    arr_ls.push(o);
    //Lo convierto en JSON
    var json_task = JSON.stringify(arr_ls);
    localStorage.setItem("BPM",json_task);
    }
    ,getCurrentTasks: function(){
        var tasks = localStorage.getItem("BPM");
        //console.debug('Traogp esta tareas');
        //console.debug(tasks);
        var temp = JSON.parse(tasks);
        var currentTasks = new Array();
        var i;
        for (i = 0; i < temp.length; i = i + 1) {

            if(temp[i].state == 0) {
                currentTasks.push(temp[i]);
            }
        };

        /*if(currentTasks.length == 0){
            return false;
        }else{
            return currentTasks;
        }*/
    return currentTasks;
    }
    ,removeElement: function(id){
        
        //No me funciono el splice
        var tasks = localStorage.getItem("BPM");
        var array_temp = new Array();
        var obj_tasks = JSON.parse(tasks);
        console.debug('antes');
        console.debug(obj_tasks);
        var i;
        for (i = 0; i < obj_tasks.length; i = i + 1) {
       
            if(obj_tasks[i].id == id) {
                //console.debug(i);
                //array.splice(i,1,obj_tasks);
            }else{
                array_temp.push(obj_tasks[i]);
            }
        };
        //console.debug('despues');
        //console.debug(array_temp);
    localStorage.setItem("BPM",JSON.stringify(array_temp)); 
    return true;
    }
}


//=========================================================================

var write_localStorage = function(task,xPath,value,taskType,state){
//////console.debug('write_localStorage');


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
    if(Array.isArray(arr_ls)) ////console.debug('asdads');
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
var css = " .class_button { background-color: #24890d; border: 0; border-radius: 2px; color: #fff; font-size: 12px; font-weight: 700; padding: 10px 30px 11px; text-transform: uppercase;vertical-align: bottom;} .cssClass{ outline: 0.25em solid #FFFF00;} td{ border-bottom:2px solid #005000;} table{  background-color: #A2AFA0; border:2px solid #005000;border-radius:5px; min-width:323px;font-family: Helvetica,Arial;}";
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
//draggable('div_editor_container');

//1. Verifico si esta ejecutando
var ejecucion = localStorage.getItem("BPMEXECUTION")
console.log('ejecutando:');
console.log(localStorage.getItem("BPMEXECUTION"));

if(ejecucion == 1){
//console.debug('ejecuta');    
    //Parche!
    var el = document.getElementById('play_procedure').click();

}


//Guardo el contenedor de Tareas
var esta = localStorage.getItem("BPM");
if(!esta){
localStorage.setItem("BPM",JSON.stringify(new Array()));
localStorage.setItem("BPMRECORDING",0);
localStorage.setItem("BPMEXECUTION",0);
}else{

}

var grabando = localStorage.getItem("BPMRECORDING")
    if(grabando == 1){
    //Parche!
    var el = document.getElementById('start_record').click();
    }

    console.log("Contenido:");
    console.log(JSON.parse(localStorage.getItem("BPM")));        
    console.log('grabando:');
    console.log(localStorage.getItem("BPMRECORDING"));

//Manager.init();

//Hago draggable a los registros para ordenar

        var table = document.getElementById('table_consola');
        var tableDnD = new TableDnD();
        tableDnD.init(table);
        //console.debug(table);
};	