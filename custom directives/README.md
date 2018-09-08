# Writing your own structural directives with context variables

> Complete code in [`math.directive.ts`](https://github.com/JanMalch/ngx-code-dump/blob/master/custom%20directives/math.directive.ts)

After reading this you will be able to create a [structural directive](https://angular.io/guide/structural-directives) with inputs and context variables and use it like this:

```html
<div *math="10; exponent: 3; let input; 
            let exponent = exponent; let r = root;
            let p = power; let ctrl = controller">
    input: {{ input }}, exponent = {{ exponent }}<br/>
    root = {{ input }}<sup>1/{{ exponent }}</sup> = {{ r }}<br/>
    power = {{ input }}<sup>{{ exponent }}</sup> = {{ p }}<br/><br/>
    <button (click)="ctrl.increment()">increment input</button>
</div>
```

## Table of contents

* [Basics](#basics)
* [Using variables in the template](#using-variables-in-the-template)
* * [`$implicit`](#implicit)
* * [excursus: microsyntax and `*ngFor`](#excursus-microsyntax-and-ngfor)
* [Implementing logic](#implementing-logic)
* [Add more functionality](#add-more-functionality)
* [Practice time](#practice-time)
* [Credits & Learn more](#credits--learn-more)

## Basics

First create a new directive with `ng g d math`. You change the selector to `"math"` like this:
```typescript
@Directive({
  selector: '[math]' //tslint:disable-line:directive-selector
})
```

To get the HTML template you defined (the `div` container) and a view container to render this template in, we have to change the constructor to this:

```typescript
constructor(private vcr: ViewContainerRef,
            private tmpl: TemplateRef<MathContext>) { }
```

To create the default input (`10` in the example above), you add a `@Input()` and give it the same name as the directive selector:

```typescript
@Input() math: number;
```

>Inputs will be availabe in the `ngOnInit` lifecycle hook.

To add the `exponent` input you add another `Input()`. The name has to start with the directive selector and then the actual variable name.

```typescript
@Input() mathExponent: number;
// or: @Input("mathExponent") exponent: number;
```

To set inputs you use a `:`. The default input is first and doesn't need a label.

```html
<div *math="10; exponent: 3">Test</div>
```

The `div` won't be rendered at this point. To do this we have to render the `TemplateRef` in the `ViewContainerRef`.

To do this we create a new private function.

```typescript
private createView() {
  this.vcr.clear();
  this.vcr.createEmbeddedView(this.tmpl);
}
```

and call it in `ngOnInit`.

```typescript
ngOnInit() {
  this.createView();
}
```

## Using variables in the template

You cannot use the `math` or `mathExponent` variables in your HTML just yet. To do this you have to provide a context object. A context object can be any plain object literal.

First define an interface for our directive

```typescript
export interface MathContext {
  $implicit: number;
  root: number;
  power: number;
  exponent: number;
}
```

These variables will be availabe in your directive / HTML. To get these values you have to use the `let x = ...` syntax. Where `x` can be any variable name you want. To connect `x` with the value of `root` you would write `let x = root`. Then you can use your `x` variable in the template like this:

```html
<div *math="10; exponent: 3; let x = root;">
    root = {{ x }}
</div>
```

### `$implicit`

The `$implicit` variable is sugared syntax as you can omit it when connecting to a variable. So `let input = $implicit;` is the same as `let input`. With this we can already get all our variables in the template:

```html
<div *math="10; exponent: 3; let input; 
            let exponent = exponent; let r = root;
            let p = power; let ctrl = controller">
    input: {{ input }}, exponent = {{ exponent }}<br/>
    root = {{ input }}<sup>1/{{ exponent }}</sup> = {{ r }}<br/>
    power = {{ input }}<sup>{{ exponent }}</sup> = {{ p }}<br/><br/>
    <button (click)="ctrl.increment()">increment input</button>
</div>
```

### excursus: microsyntax and `*ngFor`

What we are writing here is called [microsyntax](https://angular.io/guide/structural-directives#microsyntax). While it's advantageous for readability, you could also omit the `:`, `;` or `=`.

Everyone has used `*ngFor` in their applications like this:

```html
<div *ngFor="let val of values"></div>
```

You may have thought, well, that's just a JavaScript for-loop, but it's actually microsyntax with some sugar.
You can reduce the sugar step by step:

```html
<div *ngFor="let val of values"></div> <!-- normally -->
<div *ngFor="let val; of: values"></div> <!-- with ; and : -->
<div *ngFor="let val = $implicit; of values"></div> <!-- using $implicit -->
```

## Implementing logic

You are almost done. The only thing missing is filling our context variables like `power` and `root` with data.

To pass in the context we simply add it as an argument in `createEmbeddedView`

```typescript
this.vcr.createEmbeddedView(this.tmpl, {
    $implicit: this.math, // the value from our @Input()
    root: Math.pow(this.math, 1 / this.mathExponent),
    power: Math.pow(this.math, this.mathExponent),
    exponent: this.mathExponent // the value from our @Input()
});
```

To ensure correct typing you set the context interface `MathContext` as the generic type of your `TemplateRef`.

```typescript
constructor(private vcr: ViewContainerRef,
            private tmpl: TemplateRef<MathContext>) {
}
```

Also make sure you clean up after yourself in `ngOnDestroy`.

```typescript
export class MathDirective implements OnInit, OnDestroy {
    // ...
    ngOnDestroy() {
        this.vcr.clear();
    }
}
```

You now have a fully functioning `*math` directive!

## Add more functionality

The last thing missing is the ability to increment the input value and update the output.
First we create a private function called `increment`, which increases our `math` variable and renders the template again.

```typescript
private increment() {
    this.math++;
    this.createView();
}
```

To use this method we add a `controller` to our context, which exposes a `increment()` function. This function simply calls our `private increment()` function.

```typescript
this.vcr.createEmbeddedView(this.tmpl, {
    // ...
    controller: {
        increment: () => this.increment()
    }
});
```

Get the `controller` property, add a button and you are done:

```html
<div *math="10; exponent: 3; let input; 
            let exponent = exponent; let r = root;
            let p = power; let ctrl = controller">
    <!-- ... -->
    <button (click)="ctrl.increment()">increment input</button>
</div>
```

You now have a fully functional and dynamic structural directive.

## Practice time

As practice you can now implement an **image carousel** directive, that takes an array of objects and exposes a controller, that allows you to move to the next or previous image.

Here is some code that might get you on the right track:

#### app.component.ts
```typescript
images = [
    {
        source: "https://angular.io/assets/images/logos/angular/logo-nav@2x.png"
        title: "Angular logo"
    },
    {
        source: "https://angular.io/generated/images/marketing/home/code-icon.svg"
        title: "Angular code icon"
    },
    {
        source: "https://angular.io/generated/images/marketing/home/angular-connect.png"
        title: "Angular Connect"
    }
]
```

```html
<div *carousel="let source of images; let title = title; let ctrl = controller">
    <button (click)="ctrl.previous()">Previous</button>
    <img [src]="source" [title]="title">
    <button (click)="ctrl.next()">Next</button>
</div>
```

The biggest advantage is it's entirely up to the developer how he wants so style his carousel, but you provide him a nice and simple API with all the functionality he needs.

## Credits & Learn more

This guide is heavily inspired by Alex Rickabaugh's talk **Advanced Angular Concepts** on [YouTube](https://www.youtube.com/watch?v=rKbY1t39dHU) and [Google Presentations](https://docs.google.com/presentation/d/1o1zbqxe-Fn4IdGRYeVGFNQb1PSiOpjXvIsNHRC7Bk1w/mobilepresent). 
>In the second part he shows how to implement the `*carousel` directive.
