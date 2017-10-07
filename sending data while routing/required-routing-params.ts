// resulting URL
http://localhost:4200/foo/marek

// app-routing.module.ts (Configured)
{ path: 'foo/:id', component: FooComponent }

// Routing in HTML
<a [routerLink]="['/foo', 'Marek']">...</a>

// Routing in TS
this.router.navigate(['/foo', 'Marek']);

// Read
this.route.snapshot.params['id'];