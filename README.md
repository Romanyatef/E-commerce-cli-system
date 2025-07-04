# E-Commerce System (Node.js + OOP + ESM)
This CLI-based project simulates a real-time e-commerce system using Object-Oriented Programming,ES Modules, and Node.js.<br> 
It allows users to shop or manage products from the command line.

## Run the project with this command:
  npm run start
 
## How to use:
## Customer Mode
Choose C when prompted<br>
1. first section <br>
    -🔘 Enter your name and available balance.<br>
    -🔘 list of products will be displayed.<br>
    -🔘 Select product numbers and quantities to add to cart.<br>
        -After the selection Type:<br>
    <bt><bt><bt>🔘 'checkout' to finalize your purchase.<br>
    <bt><bt><bt>🔘 'exit' to leave the app without checking out.<br>
  
2. second section:<br>
      <bt>After checkout, you can:<br>
      <bt><bt>🔘 Make another purchase by typing 'Y/y'.<br>
      <bt><bt>🔘 Exit the app by typing 'N/n'.<br>

## Admin Mode
Choose A when prompted<br>
  1. Enter password: admin<br>
    <bt>Options:<br>
    <bt><bt>🔘 list: display all products in pretty format.<br>
    <bt><bt>🔘 add: walk through steps to add a new product, and at the end, will see a return to the original point after entering the password.<br>
    <bt><bt>🔘 exit: quit admin mode.<br>

## covering all Error use cases:
1. Insufficient Balance<br>
  <bt>Set the customer's balance to less than the amount he is purchasing.

2. Expired Product<br>
  <bt>Set product expiry date in the past. 

3. Empty Cart<br>
  <bt>tippically use empty cart. 

4. Stock Too Low<br>
   <bt>Try adding more than available quantity in more than one operation also in the same card  in the same product.

5. Error handling<br> 
   <bt>data inputs and admin inputs.

and more so try and see...<br>
---
Add or edit `data.json` to edit the products expiry date.
 

