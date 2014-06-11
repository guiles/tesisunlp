TESIS.Manager = (function () {
	
    var currentPrimitiveTasks = []; 
    var primitiveTasks = ['FillInputTask','SelectOptionTask','TextAreaTask','CheckBoxTask']; 
    
        function subscribe(aPrimitiveTask){ 
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
      
           	getNextTask : function(){ 
           				
        return currentPrimitiveTasks[i]; 
            
        	}
        	,start: function(){
        	}       
        	,clearCurrentPrimitiveTasks: function(){
        	}
        	,addPrimitiveTask :  function(aId,aPrimitiveTaskType,xPath,value,msg,tipo){
    	   
            } 
        	,getCurrentPrimitiveTasks: function(){
        	return currentPrimitiveTasks;
        	}	
        
    };
}