let cart = [];

const setToLocal = (product) => {
    //Conditionaly Set dat to local Storage
    const cartOld = JSON.parse(localStorage.getItem('cart'));
    if (!cartOld) {
        //If there is no data in the cart, we will push our product object to the empty cart
        cart.push(product);
        //Then we will set it to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
        //If cart already exists, then we will copy the existing cart and add product object to it
        const newCart = [...cartOld, product];
        //then we will set updated cart to the local storage
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
}

const getFromLocal = () =>{
    const cartData = JSON.parse(localStorage.getItem('cart'));
    return cartData;
}