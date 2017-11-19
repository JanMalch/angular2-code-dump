@Component({...})
export class ReceiverComponent implements AfterViewInit {
	@ViewChild('insertHere', {read: ViewContainerRef})
	vcr: ViewContainerRef;
	
	constructor(private templateRefService: TemplateRefService) {
		// multiple components could subscribe to this service, so the template-block can be rendered in multiple positions! Yay!
	}
	
	ngAfterViewInit() {
		// viewchild-ref only exist from this lifecycle-hook on!
		this.templateRefService.get().subscribe(template => this.vcr.createEmbeddedView(template));
		
		// #createEmbeddedView returns a reference. You might want to call ref.destroy() when leaving the component.
	}
	

	
}