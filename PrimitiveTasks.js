 /*
 * 
 * @submodule Tasks
 */
 /**
 * 
 * PrimitiveTask
 * @class PrimitiveTask
 * @constructor
 */
function PrimitiveTask(id,xPath,value,tipo,state){ //Constructor

this.tipo = tipo;    
this.xPath = xPath;
this.value = value;
this.state = state;
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

    if(this.tipo == 1){ //Si es Manual, pide valor
    node.focus();
    var value = prompt("Ingrese Valor","");
    node.value= value;
    }else{
        Manager.highlightElement(node)
        node.value= this.value;   
    }

    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);

    return node;
}

PrimitiveTask.prototype.finalizo = function(id){
	
    var bpm = localStorage.getItem("BPM");
    var arr_tasks = JSON.parse(bpm);
    //recorro los objetos para buscar la tarea a editar
    var i;
    for(i = 0; i < arr_tasks.length; i = i + 1){
            //console.debug(arr_tasks[i].id);
            if( arr_tasks[i].id == id ){
               // console.debug(arr_tasks[i]);
                arr_tasks[i].state = 1;

            } 
    }
    localStorage.setItem("BPM",JSON.stringify(arr_tasks));  


/*	var event = new CustomEvent("taskFinished", {detail: {taskId: this.id , message: this.msg,
					time: new Date(),},bubbles: true,cancelable: true});
				
	document.dispatchEvent(event);
*/}

/**
 * 
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
 //aId,xPath,value,aMsg,aTipo,aState
function FillInputTask(id,xPath,value,msg,tipo,state){
    console.debug('dentro de la creacion del objeto');
    console.debug(xPath);
    console.debug(state);

    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "FillInputTask";
    this.state = state;
}
FillInputTask.prototype = new PrimitiveTask();

/**
 * 
 * CheckBoxTask
 * @class CheckBoxTask
 * @constructor
 */
function CheckBoxTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
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

function RadioTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
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
function SelectOptionTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "SelectOptionTask";
}
SelectOptionTask.prototype = new PrimitiveTask();
//Herencia --> PrimitiveTask
function TextAreaTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "TextAreaTask";
}
TextAreaTask.prototype = new PrimitiveTask();
