// resulting URL
http://localhost:4200/foo?person=Yoco&friend=true

// app-routing.module.ts (Not Configured)
{ path: 'foo', component: FooComponent }

// Routing in HTML
<a [routerLink]="['/foo']" [queryParams]="{person: 'Yoco', friend: true}">...</a>

// Routing in TS
this.router.navigate(['/foo', { 
	queryParams: { person: 'Yoco', friend: true } 
}]);

// Read
this.route.snapshot.queryParams['person'];