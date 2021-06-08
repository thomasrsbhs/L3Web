var items = [
    ['images/hat1.png', 29.99, 'Bedlam White Snapback'],
    ['images/hat4.png', 29.99, 'Bedlam Dark Blue Snapback'],
    ['images/hat3.png', 29.99, 'Bedlam Teal Snapback'],
    ['images/hat6.png', 29.99, 'Bedlam Rib Roll White'],
    ['images/hat5.png', 29.99, 'Bedlam Rib Roll Red'],
    ['images/hat2.png', 29.99, 'Bedlam Gizmo Cap Black']

];
//empty var for array
var cartItems = [];

//loads products for cart page


function run() {

    var main = document.getElementById('products');


//for loop
    for(var i = 0; i < items.length; i++) { 
      


        var ele = document.createElement('li');
        var pic = document.createElement('img');
        var price = document.createElement('h2');
        var desc = document.createElement('h1');
        var add = document.createElement('button');
        var typeBox = document.createElement('input');



        main.appendChild(ele);
        ele.appendChild(pic);
        ele.appendChild(price);
        ele.appendChild(desc);
        ele.appendChild(add);
        ele.appendChild(typeBox);


        //edit pushed elements info from array

        pic.src = items[i][0];
        price.innerHTML = '$' + items[i][1];
        desc.innerHTML = items[i][2];
        add.innerHTML = 'add';
        typeBox.type = 'number';

        typeBox.type = 'number';
        typeBox.setAttribute("id", "input" + i);
        typeBox.value = 1;
        typeBox.min = 1;

        add.dataset.cartIndex = i;
        add.addEventListener('click', adding, false);
    }

    function adding(event) { //cart adding increase event
        const NUM = event.currentTarget.dataset.cartIndex;

        cartItems.push([items[NUM]]);
        cartItems[cartItems.length - 1][1] = Number(document.getElementById('input' + NUM).value);


        updateCart();
    }

} //end func

function updateCart() { //cart items number tick up & session memory
    var itemCounter = document.getElementById('itemCount');

    totalItems = 0;
    
    for (var i = 0; i < cartItems.length; i++) {
        totalItems += cartItems[i][1];
    }
    
    //session memory for cart page products

    window.sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    itemCounter.innerHTML = totalItems;
    
} // end func

//loads products for shop page

function loadCart() {

    var main = document.getElementById('cartProducts');
    
    //session storage for cart page product and memory
    var data = sessionStorage.getItem('cartItems');
    data = JSON.parse(data);
    
    
    cartItems = data;
    
    updateCart();

    //add to ul

    for (var i = 0; i < cartItems.length; i++) { // for loop


        var ele = document.createElement('li');
        var pic = document.createElement('img');
        var price = document.createElement('h2');
        var desc = document.createElement('h3');
        var deleteItem = document.createElement('button');
        var amount = document.createElement('h3');
        var subtotal = document.createElement('h3');


        //push elements into html
        main.appendChild(ele);
        ele.appendChild(pic);
        ele.appendChild(price);
        ele.appendChild(desc);
        ele.appendChild(deleteItem);
        ele.appendChild(amount);
        ele.appendChild(subtotal);

        //edit pushed elements info from array

        pic.src = cartItems[i][0][0];
        price.innerHTML = '$' + cartItems[i][0][1];
        desc.innerHTML = cartItems[i][0][2];


        //button & cart tick up with add button onclick event

        deleteItem.innerHTML = 'Delete';
        deleteItem.dataset.cartIndex = i;
        deleteItem.addEventListener('click', deleteMe, false);

       
        amount.innerHTML = cartItems[i][1];
        subtotal.innerHTML = '$' + cartItems[i][1] * cartItems[i][0][1];



    }
} // end func
//func for deleting selected items in cart
    function deleteMe() {
//        alert('gone');
          const NUM = event.currentTarget.dataset.cartIndex;
        
        delete cartItems[NUM];
        
        cartItems = cartItems.filter(item => item !== undefined);
        
        updateCart();
        loadCart();
        window.location.reload(true);
    }




var totalItems = 0;

