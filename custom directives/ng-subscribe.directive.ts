import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class NgSubscribeContext {
  public ngSubscribe: any = null;
}

// ALL CREDIT TO Netanel Basal
// https://netbasal.com/diy-subscription-handling-directive-in-angular-c8f6e762697f
// Don't forget to add NgSubscribeDirective to your module's declarations!
// Usage: <div *ngSubscribe="foo$ as foo">{{ foo }}</div>

@Directive({
  selector: '[ngSubscribe]'
})
export class NgSubscribeDirective implements OnInit, OnDestroy {
  private observable: Observable<any>;
  private context: NgSubscribeContext = new NgSubscribeContext();
  private subscription: Subscription;

  @Input()
  set ngSubscribe(inputObservable: Observable<any>) {
    if (this.observable !== inputObservable) {
      this.observable = inputObservable;
      this.subscription && this.subscription.unsubscribe();
      this.subscription = this.observable.subscribe(value => {
        this.context.ngSubscribe = value;
        this.cdr.markForCheck();
      });
    }
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
