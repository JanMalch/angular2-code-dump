import { Component } from '@angular/core';
 
import { MessageService } from '../_services/index';
 
@Component({
    templateUrl: 'another.component.html'
})
 
export class AnotherComponent {
    constructor(private messageService: MessageService) {}
     
    sendMessage(): void {
        this.messageService.sendMessage({ text: "Message from Home Component to App Component!" });
    }
 
    clearMessage(): void {
        this.messageService.clearMessage();
    }
}
