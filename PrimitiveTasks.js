 /*
 * 
 * @module Tasks
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

console.debug('ejecuto esto');

    var iterator = document.evaluate(this.xPath,document,null,0,null);
    var node = iterator.iterateNext();
    console.debug(node);
    console.debug('esta?');
    if(node){
    if(this.tipo == 1){ //Si es Manual, pide valor
    node.focus();
    var value = prompt("Ingrese Valor","");
    node.value= value;
    }else{
        Manager.highlightElement(node)
        node.value= this.value;   
    }
    }else{
        return false;
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
            if( arr_tasks[i].id == id ){
                arr_tasks[i].state = 1;
            } 
    }
    localStorage.setItem("BPM",JSON.stringify(arr_tasks));  
}

/**
 * @method toHtml
 */
PrimitiveTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    
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


/**
 * 
 * FillInputTask
 * @class FillInputTask
 * @extends PrimitiveTask
 */
//aId,xPath,value,aMsg,aTipo,aState
function FillInputTask(id,xPath,value,msg,tipo,state){
console.debug('ejecuto tarea INput');
    console.debug('ejecutando:');
    console.debug(localStorage.getItem("BPMEXECUTION"));
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "FillInputTask";
    this.state = state;
}
FillInputTask.prototype = new PrimitiveTask();
/**
 * @method toJson
 */
FillInputTask.prototype.toJson = function(){
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'FillInputTask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 10;
    obj_id.id = 'id';

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_xpath = new Object();
    obj_xpath.label = 'xPath';
    obj_xpath.el_type = 'input';
    obj_xpath.value = this.xPath;
    obj_xpath.id = 'id_xpath';
    //{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}
    var obj_value = new Object();
    
    obj_value.label = 'Valor';
    obj_value.el_type = 'input';
    obj_value.value = this.value;
    obj_value.id = 'id_value';

    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    obj_task.atributos.push(obj_value);

    return JSON.stringify(obj_task);
}
/**
* override
* @method toHtml
*/
FillInputTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    
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
/**
* @method htmlToJson
*/
FillInputTask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "FillInputTask";
    obj_json.state = 0;
    obj_json.id = this.id;

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
                    ////console.debug(elements[j].textContent);
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

//Herencia --> PrimitiveTask
function SelectOptionTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "SelectOptionTask";
}
SelectOptionTask.prototype = new PrimitiveTask();

SelectOptionTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    //Hardcodeo
    //Traigo el xPath
       var xPath = obj_properties.atributos[1].value ;     
    
        for (var i = 0; i < obj_properties.atributos.length; i++) {

            var type_el = obj_properties.atributos[i].el_type;
            var el_inflator = null;
            switch(type_el){
            case 'input':
            el_inflator = Object.create(inputElement);
            break;
            
            case 'select':
        console.debug('es un select, le paso el xPath');
        console.debug(xPath);  
            el_inflator = Object.create(selectElement);

            el_inflator.specs = xPath;
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


SelectOptionTask.prototype.toJson = function(){
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'SelectOptionTask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

  var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 10;
    obj_id.id = 'id';

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_xpath = new Object();
    obj_xpath.label = 'xPath';
    obj_xpath.el_type = 'input';
    obj_xpath.value = this.xPath;
    obj_xpath.id = 'id_xpath';
    
    //{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}
    
    var obj_value = new Object();
    obj_value.label = 'Valor';
    obj_value.el_type = 'select';
    obj_value.value = this.value;
    obj_value.id = 'id_value';

    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    obj_task.atributos.push(obj_value);


return JSON.stringify(obj_task);
}

/**
* @method htmlToJson
*/
SelectOptionTask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "SelectOptionTask";
    obj_json.state = 0;
    obj_json.id = this.id;

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
                    ////console.debug(elements[j].textContent);
                    obj_atributo.label = elements[j].textContent;
                    }
                    if(elements[j].nodeName == "INPUT"){
                    obj_atributo.el_type = 'input';
                    obj_atributo.value = elements[j].value;
                    obj_atributo.id = elements[j].id;
                    }else if(elements[j].nodeName == "SELECT"){
                        
                        obj_atributo.el_type = 'select';
                        obj_atributo.value = elements[j].value;
                        obj_atributo.id = elements[j].id;
                    }
                    }
                obj_json.atributos.push(obj_atributo);
            }
        }

    return JSON.stringify(obj_json);
}

//Herencia --> PrimitiveTask
function TextAreaTask(id,xPath,value,tipo,state){
    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "TextAreaTask";
}
TextAreaTask.prototype = new PrimitiveTask();

TextAreaTask.prototype.toJson = function(){
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'TextAreaTask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_xpath = new Object();
    obj_xpath.label = 'xPath';
    obj_xpath.el_type = 'input';
    obj_xpath.value = this.xPath;
    obj_xpath.id = 'id_xpath';
    //{"label": "valor","el_type": "input","value": "un valor","id": "id_value"}
    var obj_value = new Object();
    
    obj_value.label = 'Valor';
    obj_value.el_type = 'input';
    obj_value.value = this.value;
    obj_value.id = 'id_value';
    
    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 0;
    obj_id.id = 'id';
  
  var aobj_id = new Object();
    aobj_id.label = 'Otro campo';
    aobj_id.el_type = 'input';
    aobj_id.value = 'un valor';
    aobj_id.id = 'un_id';

    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    obj_task.atributos.push(obj_value);
    obj_task.atributos.push(aobj_id);


return JSON.stringify(obj_task);
}

TextAreaTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    
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

TextAreaTask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "TextAreaTask";
    obj_json.state = 0;
    obj_json.id = this.id;

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
                    ////console.debug(elements[j].textContent);
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


//==========================================================================//
// Tareas de carga de Pagina //



function ClickLinkTask(id,xPath,value,msg,tipo,state){
    console.debug('ejecuto tarea click Link');
    console.debug('ejecutando:');
    console.debug(localStorage.getItem("BPMEXECUTION"));

    PrimitiveTask.call(this,id,xPath,value,tipo,state);
    this.msg = "ClickLinkTask";
    this.state = state;
}
ClickLinkTask.prototype = new PrimitiveTask();
/**
 * @method toJson
 */
ClickLinkTask.prototype.toJson = function(){
//Aqui armo el objeto JSON segun especifcaciones, que por ahora es igual que JUNIO 20 
   var obj_task = new Object();
    obj_task.id = 0 ;    
    obj_task.type = 'ClickLinkTask';
    obj_task.state = 0;
    obj_task.atributos  = new Array();

    var obj_id = new Object();
    obj_id.label = 'ID';
    obj_id.el_type = 'input';
    obj_id.value = 10;
    obj_id.id = 'id';

    //@TEMP Creo objetos - y hardcodeo para ver como funciona
    //{"label": "xPath","el_type": "input","value": "/html/","id": "id_xpath"}
    var obj_xpath = new Object();
    obj_xpath.label = 'xPath';
    obj_xpath.el_type = 'input';
    obj_xpath.value = this.xPath;
    obj_xpath.id = 'id_xpath';
    
    obj_task.atributos.push(obj_id);
    obj_task.atributos.push(obj_xpath);
    

    return JSON.stringify(obj_task);
}
/**
* override
* @method toHtml
*/
ClickLinkTask.prototype.toHtml = function(properties){
    //Por ahora le paso las propiedades para inflar, pero la misma tarea tiene que saber que elementos HTML tiene
    var obj_properties = JSON.parse(properties);
    this.elements = [];
    
    // @TODO: refactor con lookup
    
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
/**
* @method htmlToJson
*/
ClickLinkTask.prototype.htmlToJson = function(el_div){

    var obj_json = new Object();
    obj_json.type = "ClickLinkTask";
    obj_json.state = 0;
    obj_json.id = this.id;

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
                    ////console.debug(elements[j].textContent);
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

ClickLinkTask.prototype.execute = function(){

    var iterator = document.evaluate(this.xPath,document,null,0,null);
    var node = iterator.iterateNext();
    //Como es un clic, hago clic en el nodo.

    node.click();
    
    //si salio todo ok modifico el estado de la tarea ( por ahora asumo que sale ok)
    this.finalizo(this.id);

    return true;

}
