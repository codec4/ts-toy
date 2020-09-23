// Infix expression:The expression of the form a op b. When an operator is in-between every pair of operands.
// Postfix expression:The expression of the form a b op. When an operator is followed for every pair of operands.
// Why postfix representation of the expression?
// The compiler scans the expression either from left to right or from right to left.
// Consider the below expression: a op1 b op2 c op3 d
// If op1 = +, op2 = *, op3 = +
// The compiler first scans the expression to evaluate the expression b * c, then again scan the expression to add a to it. The result is then added to d after another scan.
// The repeated scanning makes it very in-efficient. It is better to convert the expression to postfix(or prefix) form before evaluation.
// The corresponding expression in postfix form is: abc*+d+. The postfix expressions can be evaluated easily using a stack. We will cover postfix expression evaluation in a separate post.
// Algorithm
// 1. Scan the infix expression from left to right.
// 2. If the scanned character is an operand, output it.
// 3. Else,
//       1 If the precedence of the scanned operator is greater than the precedence of the operator in the stack(or the stack is empty           or the stack contains a ‘(‘ ), push it.
//       2 Else, Pop all the operators from the stack which are greater than or equal to in precedence than that of the scanned operator. After doing that Push the scanned operator to the stack. (If you encounter parenthesis while popping then stop there and push the scanned operator in the stack.)
// 4. If the scanned character is an ‘(‘, push it to the stack.
// 5. If the scanned character is an ‘)’, pop the stack and and output it until a ‘(‘ is encountered, and discard both the parenthesis.
// 6. Repeat steps 2-6 until infix expression is scanned.
// 7. Print the output
// 8. Pop and output from the stack until it is not empty.

import Stack from '../../data-structures/stack';

function isOperand(ch: string) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function getPrecedenceOfOperator(ch: string) {
  return { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }[ch] || -1;
}

export function infixToPostfix(expression: string) {
  let result = '';
  const stack = new Stack<string>();

  for (const ch of expression) {
    if (isOperand(ch)) {
      result += ch;
    } else if (ch === '(') {
      stack.push(ch);
    } else if (ch === ')') {
      while (!stack.isEmpty() && stack.peek() !== '(') {
        result += stack.pop();
      }

      stack.pop();
    } else {
      while (
        !stack.isEmpty() &&
        getPrecedenceOfOperator(ch) <= getPrecedenceOfOperator(stack.peek())
      ) {
        result += stack.pop();
      }

      stack.push(ch);
    }
  }

  // pop all the operators from the stack
  while (!stack.isEmpty()) {
    if (stack.peek() === '(') {
      return -1;
    }

    result += stack.pop();
  }

  return result;
}

// Usage
// infixToPostfix('a+b*(c^d-e)^(f+g*h)-i')
// infixToPostfix('a+b*(c^d-e)^(f+g*h)-i') === 'abcd^e-fgh*+^*+i-'
