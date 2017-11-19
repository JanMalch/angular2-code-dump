@Directive({selector: '[receiver]'})
export class ReceiverDirective {

	constructor(templateRef: TemplateRef, private templateRefService: TemplateRefService) {
		// templateRef will be a ref to the element, which has the *receiver - Directive
		// send templateRef to Receiver
		this.templateRefService.send(templateRef);
		
	}
	
}