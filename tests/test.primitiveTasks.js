/**
 * @venus-library jasmine
 * @venus-code ../PrimitiveTasks.js
 */

//PrimitiveTasksSpec.js
describe("Primitive Tasks", function() {
 
    var fillInputTask;
    //var selectOptionTask;
    //var textAreaTask;
    
    beforeEach(function() {

        fillInputTask = new FillInputTask();
     	fillInputTask.setState(1);
      //  selectOptionTask = new SelectOptionTask();
    	//textAreaTask = new TextAreaTask();;    
    });
 
    it("Verifico que se instancio el objeto FillInputTask", function() {
		
	    	expect( fillInputTask ).toBeDefined();
	        
    });

    /*it("Verifico que sea Herencia", function() {
        
        expect( fillInputTask.msg ).toBe('FillInputTask');
    });

    it("Verifico getState()", function() {
        
        expect(fillInputTask.getState()).toBe(1);
    });
   it("Verifico setState()", function() {
        
        expect(fillInputTask.setState(0)).toBeDefined();
    });

       it("Verifico execute()", function() {
        
        expect(fillInputTask.execute()).toBeDefined();
    });
*/
    /*
    it("Verifico que se instancio el objeto SelectOptionTask", function() {
		
	    	expect( selectOptionTask ).toBeDefined();
	        
    });

    it("Verifico que sea Herencia", function() {
        
        expect( selectOptionTask.msg ).toBe('SelectOptionTask');
    });

	it("Verifico que se instancio el objeto TextAreaTask", function() {
		
	    	expect( textAreaTask ).toBeDefined();
	        
    });

    it("Verifico que sea Herencia", function() {
        
        expect( textAreaTask.msg ).toBe('TextAreaTask');
    });
*/

});