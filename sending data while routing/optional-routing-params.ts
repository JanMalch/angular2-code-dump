// resulting URL
http://localhost:4200/foo;person=Bernie;friend=true

// app-routing.module.ts (Not Configured)
{ path: 'foo', component: FooComponent }

// Routing in HTML
<a [routerLink]="['/foo', {person: 'Bernie', friend: true}]">...</a>

// Routing in TS
this.router.navigate(['/foo', 
	{ person: 'Bernie', friend: true } 
]);

// Read
constructor(private route: ActivatedRoute) { //...
this.route.snapshot.params['person'];
