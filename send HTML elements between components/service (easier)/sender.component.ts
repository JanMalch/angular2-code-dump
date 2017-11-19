@Component({...})
export class SenderComponent implements AfterViewInit {
	@ViewChild('sendThis')
	templateRef: TemplateRef;
	
	name: string = "maybe working";
	
	constructor(private templateRefService: TemplateRefService) {
	}
	
	ngAfterViewInit() {
		// viewchild-ref only exist from this lifecycle-hook on!
		this.templateRefService.send(this.templateRef);
	}
	
}