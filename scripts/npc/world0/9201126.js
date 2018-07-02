//Thief Statue by Wodian

var status = 0;  

function start() {  
    status = -1;  
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
       
    if (mode == -1) {  
        cm.dispose();  
		return;   
    }  
    else {   
        if (mode == 1) {  
            status++;  
        }      
        else {  
			cm.sendOk("Goodbye");   
            cm.dispose();   
            return;
        } 
		if (status == 0) { 
            cm.sendYesNo("你想去墮落城市嗎?");
        }
        else if (status == 1) {
            cm.warp(103000000,0);
            cm.dispose();
		}
	}
}  