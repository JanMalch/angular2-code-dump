// initializing variable with fallback for null
let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

// default value for function params - plain arguments
function sayName(firstName: string, lastName = 'smith') {
    var name = firstName + lastName;
    alert(name);
}

sayName('bob');

// default value for function params - with objects
function sayName({first,last='Smith'}: {first: string; last?: string}){
    var name = first + " " + last;
    alert(name);
}

sayName({firstName: 'Bob'});