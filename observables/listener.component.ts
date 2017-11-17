import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MessageService } from './_services/index';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnDestroy {
    message: string;
    subscription: Subscription;

    constructor(private messageService: MessageService) {
        this.subscription = this.messageService.getMessage().subscribe(
            message => this.message = message.text // Messages of the Observable contain objects with a string-variable "text"
        );
        
        // !!! code for pure string-message-service !!!
        this.subscription = this.messageService.getMessage().subscribe(
            text => this.message = text // Messages of the Observable is the desired string
        );
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
