document.getElementById('order-btn').addEventListener('click', function(){
    //Get cart from local storage
    const cartItems = getFromLocal();
    //Set the ordered data to local storage
    localStorage.setItem('orderHistory', JSON.stringify(cartItems));
    //Remove cart data after order
    localStorage.removeItem('cart');
    //Fetch/display data from local storage to live update
    displayfromLocalStorage();
});

const displayOrderHistory = () =>{
    const orderItems = JSON.parse(localStorage.getItem('orderHistory'));
    const orderHistoryContainer = document.getElementById('order-container');
    orderItems.forEach(singleItem => {
        const {price, img, name, memory, camera, display, battery, network } = singleItem;
        const orderSingle = document.createElement('div');
        orderSingle.classList.add('card', 'card-compact', 'w-full', 'bg-base-100', 'shadow-xl');
        orderSingle.innerHTML = `
            <div class="md:flex">
                <figure class="py-3"><img src="${img}" alt="Phone" class="h-80 rounded-lg"/></figure>
                <div class="card-body">
                    <h2 class="card-title">${name}</h2>
                    <h4 class="text-lg">Memory: ${memory}</h4>
                    <h4 class="text-lg">Back Camera: ${camera.back}</h4>
                    <h4 class="text-lg">Front Camera: ${camera.front}</h4>
                    <h4 class="text-lg">Display: Resolution # ${display.resolution} , Size # ${display.size}</h4>
                    <h4 class="text-lg">Battery: ${battery}</h4>
                    <h4 class="text-lg">Network: ${network}</h4>
                    <h4 class="text-lg">Price: $${price}</h4>
                </div>
            </div>
        `
        orderHistoryContainer.appendChild(orderSingle);
    })
}
displayOrderHistory();

