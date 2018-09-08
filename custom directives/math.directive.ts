import {
    Directive,
    ViewContainerRef,
    TemplateRef,
    OnInit,
    Input,
    ChangeDetectorRef,
    EmbeddedViewRef,
    OnDestroy
} from '@angular/core';

export interface MathContext {
    $implicit: number;
    root: number;
    power: number;
    exponent: number;
    controller: { increment: () => void; };
}

@Directive({
    selector: '[math]' //tslint:disable-line:directive-selector
})
export class MathDirective implements OnInit, OnDestroy {

    @Input() math: number;
    @Input() mathExponent: number;

    constructor(private vcr: ViewContainerRef,
                private tmpl: TemplateRef<MathContext>) {
    }

    ngOnInit() {
        this.createView();
    }

    private createView() {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.tmpl, {
            $implicit: this.math,
            root: Math.pow(this.math, 1 / this.mathExponent),
            power: Math.pow(this.math, this.mathExponent),
            exponent: this.mathExponent,
            controller: {
                increment: () => this.increment()
            }
        });
    }

    private increment() {
        this.math++;
        this.createView();
    }

    ngOnDestroy() {
        this.vcr.clear();
    }
}

