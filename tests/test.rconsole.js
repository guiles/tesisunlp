/**
 * @venus-library jasmine
 * @venus-code ../RConsole.js
 */


describe("RConsole", function() {
 
    var rConsola;
    
    beforeEach(function() {

        rConsola = Object.create(RConsole);
     	 
    });
 
    it("Verifico que se instancio el objeto ", function() {
		
	    	expect( rConsola ).toBeDefined();
	        
    });

    it("Verifico que agregue el boton Stop ", function() {
        
        var stopButton = rConsola.createStopButton();
        console.log(stopButton.nodeName);
            expect( stopButton.nodeName ).toBe('INPUT');
            
    });

    it("Verifico que agregue el boton Play ", function() {
        
        var playButton = rConsola.createPlayButton();
        
            expect( playButton.nodeName ).toBe('INPUT');
            
    });

    it("Verifico que agregue el boton Record ", function() {
        
        var recordButton = rConsola.createRecordButton();
        
            expect( recordButton.nodeName ).toBe('INPUT');
            
    });

});