// // alert("Hello world")

// // var age = 20;
// // console.log(age)
// // console.log(typeof(age))

// // var sname = "ali"
// // console.log(sname)
// // console.log(typeof(sname))

// // var isStudent = true;
// // console.log(isStudent)
// // console.log(typeof(isStudent))

// // null and undefined
// // var a;
// // console.log(typeof(a))

// // var b = null;
// // console.log(typeof(b))

// // var a = 10;
// // console.log(a);

// // a = "bootcamp";
// // console.log(a)

// // const uni = "COMSATS";
// // console.log(uni)


// // var a = 10;
// // var b = 20;

// // console.log(a)
// // console.log(b)

// // b = a;
// // console.log(b)

// // a = 30;
// // console.log(b)

// // var student = {
// //     sname : "Ali Asad",
// //     age : 19
// // }

// // console.log(student.age)
// // console.log(student["age"])

// // Destructring

// // var {age} = student;

// // console.log(age)
// // console.log(Object.keys(student))


// // Function

// var num1 = 2;
// var num2 = 3;
// console.log(num1 + num2);

// var num3 = 4;
// var num4 = 4;
// console.log(num3 + num4);

// function sum(num1,num2){
//     console.log(num1 + num2)
// }

// sum(5,5); // argument

// // named function

// var add = function(num1, num2){
//     console.log(num1 + num2)
// }

// add(2,2)

// // arrow functions

// var addition = (num1, num2)=>{
//     console.log(num1 + num2)
// }

// addition(4,4)



console.log(document.getElementById("con"))
console.log(document.getElementsByClassName("box")[0])
console.log(document.getElementsByTagName("button")[0])


var con = document.getElementById("con")
console.log(con.innerText)
console.log(con.innerHTML)


var btn = document.getElementsByTagName("button")[0]
console.log(btn)
btn.innerText = "Click Me"

btn.style.backgroundColor = "red"

var p = document.createElement("p")
p.innerText = "Bootcamp"
con.appendChild(p)

