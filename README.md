# E-Commerce System (Node.js + OOP + ESM)
This CLI-based project simulates a real-time e-commerce system using Object-Oriented Programming,ES Modules, and Node.js.<br> 
It allows users to shop or manage products from the command line.

## Run the project with this command:
  npm run start
 
## How to use:
## Customer Mode
Choose C when prompted<br>
1. first section <br>
    &nbsp;🔘 Enter your name and available balance.<br>
    &nbsp;🔘 list of products will be displayed.<br>
    &nbsp;🔘 Select product numbers and quantities to add to cart.<br>
    &nbsp;&nbsp;After the selection Type:<br>
    &nbsp;&nbsp;&nbsp;🔘 'checkout' to finalize your purchase.<br>
    &nbsp;&nbsp;&nbsp;🔘 'exit' to leave the app without checking out.<br>
  
2. second section:<br>
      &nbsp;After checkout, you can:<br>
      &nbsp;&nbsp;🔘 Make another purchase by typing 'Y/y'.<br>
      &nbsp;&nbsp;🔘 Exit the app by typing 'N/n'.<br>

## Admin Mode
Choose A when prompted<br>
  1. Enter password: admin<br>
    &nbsp;Options:<br>
    &nbsp;&nbsp;🔘 list: display all products in pretty format.<br>
    &nbsp;&nbsp;🔘 add: walk through steps to add a new product, and at the end, will see a return to the original point after entering the password.<br>
    &nbsp;&nbsp;🔘 exit: quit admin mode.<br>

## covering all Error use cases:
1. Insufficient Balance<br>
  &nbsp;Set the customer's balance to less than the amount he is purchasing.

2. Expired Product<br>
  &nbsp;Set product expiry date in the past. 

3. Empty Cart<br>
  &nbsp;tippically use empty cart. 

4. Stock Too Low<br>
   &nbsp;Try adding more than available quantity in more than one operation also in the same card  in the same product.

5. Error handling<br> 
   &nbsp;data inputs and admin inputs.

and more so try and see...<br>
---
Add or edit `data.json` to edit the products expiry date.
 

