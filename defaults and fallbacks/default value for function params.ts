// with plain arguments
function sayName(firstName: string, lastName = 'smith') {
    var name = firstName + lastName;
    alert(name);
}

sayName('bob');

// with objects
function sayName({first,last='Smith'}: {first: string; last?: string}){
    var name = first + " " + last;
    alert(name);
}

sayName({firstName: 'Bob'});