# E-Commerce System (Node.js + OOP + ESM)
This CLI-based project simulates a real-time e-commerce system using Object-Oriented Programming,ES Modules, and Node.js. 
It allows users to shop or manage products from the command line.

## Run the project with this command:
  npm run start
 
## How to use:
## Customer Mode
  Choose C when prompted
  A.first section 
    1. Enter your name and available balance.
    2. list of products will be displayed.
    3. Select product numbers and quantities to add to cart.
      After the selection Type:
        a.'checkout' to finalize your purchase.
        b.'exit' to leave the app without checking out.
  
  B. second section:
      After checkout, you can:
        a.Make another purchase by typing 'Y/y'.
        b.Exit the app by typing 'N/n'.

## Admin Mode
  Choose A when prompted
  1. Enter password: admin
      Options:
        a.list: display all products in pretty format.
        b.add: walk through steps to add a new product, and at the end, will see a return to the original point after entering the password.
        c.exit: quit admin mode.

## covering all Error use cases:
1. Insufficient Balance
    Set the customer's balance to less than the amount he is purchasing.

2. Expired Product
    Set product expiry date in the past. 

3. Empty Cart
tippically use empty cart. 

4. Stock Too Low
Try adding more than available quantity in more than one operation also in the same card  in the same product.

5. Error handling 
data inputs and admin inputs.

and more so try and see...
---
Add or edit `data.json` to edit the products expiry date.
 

