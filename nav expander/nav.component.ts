
export class NavComponent {
  @HostBinding('class')
  get _class() {
	// this overwrites all classes on the element
    return this.expanded ? "expanded" : "";
  }
  
  boolean expanded = true;

}
