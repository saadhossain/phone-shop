let phonesData;
const fetchData = async () => {
    const res = await fetch("../js/data.json");
    const data = await res.json();
    phonesData = data;
    displayPhones(data);
}
fetchData();
const displayPhones = (phones) => {
    const productContainer = document.getElementById('product-container');
    phones.forEach(phone => {
        const { id, price, img, name } = phone;
        const productSingle = document.createElement('div');
        productSingle.classList.add('card', 'card-compact', 'w-full', 'bg-base-100', 'shadow-xl');
        productSingle.innerHTML = `
            <figure class="py-3"><img src="${img}" alt="Phone" class="h-80 rounded-lg"/></figure>
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <h4 class="text-lg">Price: $${price}</h4>
                <div class="card-actions justify-between">
                    <label onclick="showDetails('${id}')" for="my-modal-6" class="btn modal-button">Details</label>
                    <button onclick="addToCart('${id}')" class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        productContainer.appendChild(productSingle);
    })
}

let cartCount = 0;
let productPrice = 0;
let tax = 0;

const addToCart = (phoneId) => {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    document.getElementById('cart-count-mobile').innerText = cartCount;
    const product = phonesData.find((phone) => phone.id === phoneId);
    const { price, img, name, id } = product;
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    const cartItem = document.createElement('div');
    cartItem.classList.add('flex', 'justify-between', 'items-center', 'item-single');
    cartItem.innerHTML = `
    <img src="${img}" class="w-[15%]"/>
    <h2>${name}</h2>
    <h4>${price}</h4>
    <h5 onclick="removeItem(${id})"><i class="fa-regular fa-square-minus text-red-500 cursor-pointer"></i></h5>
    `
    cartContainer.appendChild(cartItem);
    productPrice = productPrice + price;
    document.getElementById('product-price').innerText = productPrice.toFixed(2);
    tax = productPrice * 0.10;
    document.getElementById('tax').innerText = tax.toFixed(2);
    const totalPrice = productPrice + tax;
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    //Set Data To Local Storage
    setToLocal(product);
    displayfromLocalStorage()
}

const displayfromLocalStorage = () => {
    //Get data from the cartdata
    const cartData = getFromLocal();
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cartData.forEach(phone => {
        //Set cart count
        document.getElementById('cart-count').innerText = cartData.length;
        document.getElementById('cart-count-mobile').innerText = cartData.length;
        const { price, img, name, id } = phone;
        const cartItem = document.createElement('div');
        cartItem.classList.add('flex', 'justify-between', 'items-center', 'item-single');
        cartItem.innerHTML = `
        <img src="${img}" class="w-[15%]"/>
        <h2>${name}</h2>
        <h4>${price}</h4>
        <h5 onclick="removeItem(${id})"><i class="fa-regular fa-square-minus text-red-500 cursor-pointer"></i></h5>
        `
        cartContainer.appendChild(cartItem);
        productPrice = productPrice + price;
        document.getElementById('product-price').innerText = productPrice.toFixed(2);
        tax = productPrice * 0.10;
        document.getElementById('tax').innerText = tax.toFixed(2);
        const totalPrice = productPrice + tax;
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    })

}
displayfromLocalStorage();


//Remove item from local storage
const removeItem = (itemSingle) => {
    const cartData = getFromLocal();
    const remainingItem = cartData.filter(data => parseInt(data.id) !== itemSingle);
    localStorage.setItem('cart', JSON.stringify(remainingItem));

    cartData.forEach(cartItem => {
        productPrice = productPrice - cartItem.price;
        document.getElementById('product-price').innerText = productPrice.toFixed(2);
        tax = productPrice * 0.10;
        document.getElementById('tax').innerText = tax.toFixed(2);
        const totalPrice = productPrice - tax;
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    });
    displayfromLocalStorage();
}

const showDetails = (phoneDetails) => {
    const modalDetails = phonesData.find((details) => details.id === phoneDetails);
    // console.log(modalDetails);
    const { name, price, img, memory, camera, display, chipset, battery, network } = modalDetails;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = ` 
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <img src="${img}" class="w-2/5 h-1/3 flex justify-center"/>
            <div>
                <h3 class="font-bold text-lg">${name}</h3>
                <p class="py-4">Price: ${price}</p>
                <p class="py-4">Memory: ${memory}</p>
                <p class="py-4">Camera: Back - ${camera.back}, Front - ${camera.front}</p>
                <p class="py-4">Display: Size- ${display.size}, Resoulution- ${display.resolution}</p>
                <p class="py-4">Chipset: ${chipset}</p>
                <p class="py-4">Battery: ${battery}</p>
                <p class="py-4">Network: ${network}</p>
            </div>
            <div class="modal-action">
                <label for="my-modal-6" class="btn">Close!</label>
            </div>
        </div>
    </div>
    `
}