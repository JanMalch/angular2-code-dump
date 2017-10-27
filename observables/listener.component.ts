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
            message => this.message = message.text // Observable contains object with a string-variable "text"
        );
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
