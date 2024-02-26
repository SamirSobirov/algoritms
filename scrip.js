// function fcl() {
//   document.all.info.innerHTML = "Протокол работы стека";
//   document.all.txt2.value = "";
//   // Очистить поле результата
//   s.count = 0; // Обнулить стек
// }

// function f() {
//   fcl();
//   document.all.txt1.value =
//     document.all.sel1.options[document.all.sel1.selectedIndex].value;
// }

// function stack() {
//   // Конструктор стека
//   this.store = new Object(); // Объект для хранения элементов в стеке
//   this.count = 0; // Число элементов в стеке
// }

// function push(value) {
//   // Добавляем элемент в стек
//   this.count++;
//   this.store[this.count] = value;
// }
// stack.prototype.push = push; // Определяем метод push для класса stack

// function pop() {
//   // Извлекаем элемент из стека
//   if (this.count > 0) {
//     var value = this.store[this.count];
//     this.count--;
//     return value;
//   } else return "";
// }
// stack.prototype.pop = pop; // Определяем метод pop для класса stack

// function getcount(value) {
//   // Число элементов в стеке
//   return this.count;
// }
// stack.prototype.getcount = getcount;
// // Определяем метод getcount для класса stack

// function f_view() {
//   // Отображаем содержимое стека в виде таблицы
//   var i, t;
//   t =
//     "<table border=1 cellspacing='0' cellpadding='2' bgcolor='ffffcc' class='s1'>";
//   for (i = s.count; i > 0; i--)
//     t += "<tr><td><b>" + s.store[i] + "</b></td></tr>";

//   t += "</table>";
//   document.all.info.innerHTML += "<hr width=30% align=left>" + t;
// }
// var s = new stack(); // Объявляем стек
// fcl();
// function prec(c) {
//   switch (c) {
//     case "^":
//       return 4;
//     case "*":
//       return 3;
//     case "/":
//       return 3;
//     case "-":
//       return 2;
//     case "+":
//       return 2;
//     case "(":
//       return 1;
//   }
// }
// function g() {
//   var i, n, ti, t, z, sg, sg0;
//   fcl();
//   sg = "+-*/:^()";
//   sg0 = "+-*/:^";
//   t = document.all.txt1.value;
//   n = t.length;
//   x = "";
//   for (i = 0; i < n; i++) {
//     ti = t.charAt(i);
//     if (ti != " ") {
//       // Пропускаем пробелы
//       if (sg.indexOf(ti) < 0) x += ti;
//       if (ti == "(") s.push(ti);
//       if (ti == ")") {
//         while (s.store[s.count] != "(") x += s.pop();
//         ti = s.pop();
//       }
//       if (sg0.indexOf(ti) >= 0) {
//         do {
//           exit = true;
//           if (s.count > 0)
//             if (prec(ti) <= prec(s.store[s.count])) {
//               x += s.pop();
//               exit = false;
//             }
//         } while (!exit);
//         s.push(ti);
//       }
//     }
//     f_view();
//   }
//   while (s.count > 0) x += s.pop();
//   document.all.txt2.value = x;
// }



function infixToPostfix(infixExpression) {
    const precedence = {
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2,
        '(': 1,
    };

    const isOperator = (char) => ['+', '-', '*', '/', '^'].includes(char);

    let postfixExpression = '';
    const operatorStack = [];

    for (let i = 0; i < infixExpression.length; i++) {
        const token = infixExpression[i];

        if (/[a-zA-Z0-9]/.test(token)) {
            postfixExpression += token;
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                postfixExpression += operatorStack.pop();
            }
            operatorStack.pop(); // Pop '('
        } else if (isOperator(token)) {
            while (
                operatorStack.length &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                postfixExpression += operatorStack.pop();
            }
            operatorStack.push(token);
        }
    }

    while (operatorStack.length) {
        postfixExpression += operatorStack.pop();
    }

    return postfixExpression;
}

// Пример использования
const infixExpression = "a+b*(c^d-e)^(f+g*h)-i";
const postfixExpression = infixToPostfix(infixExpression);
console.log(postfixExpression);
