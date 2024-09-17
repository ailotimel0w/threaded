const tablet = 990;
const mobile = 767;
document.addEventListener("DOMContentLoaded", function() {
    let navbar = document.querySelector('.navbar');
    let burger = document.querySelector('.burger');
    let navLeft = document.querySelector('nav .nav-left');
    let navRight = document.querySelector('nav .nav-right');
    let cart = document.getElementById('cart');
    let cartBox = document.querySelector('.shopping-cart');
    burger.addEventListener('click', function(){
        if (burger.classList.contains('open')) {
            navbar.classList.remove('drop-height');
            burger.classList.remove('open');
            navLeft.classList.remove('opaque');
            navRight.classList.remove('opaque');
            navLeft.classList.remove('flex');
            navRight.classList.remove('flex');
        } else {
            navbar.classList.add('drop-height');
            burger.classList.add('open');
            navLeft.classList.add('flex');
            navRight.classList.add('flex');
            setTimeout(() => {
                navLeft.classList.add('opaque');
                navRight.classList.add('opaque');
            }, 250);
        }
    });

    cart.addEventListener('click', function(){
        cartBox.classList.toggle('open');
        // if (burger.classList.contains('open')) {
        //     navbar.classList.remove('drop-height');
        //     burger.classList.remove('open');
        //     navLeft.classList.remove('opaque');
        //     navRight.classList.remove('opaque');
        //     navLeft.classList.remove('flex');
        //     navRight.classList.remove('flex');
        // } else {
        //     navbar.classList.add('drop-height');
        //     burger.classList.add('open');
        //     navLeft.classList.add('flex');
        //     navRight.classList.add('flex');
        //     setTimeout(() => {
        //         navLeft.classList.add('opaque');
        //         navRight.classList.add('opaque');
        //     }, 250);
        // }
    });

    let product = '';
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].name);
        if (data[i].discounted == '') {
            product += `<div class="recent">
                <img src="` + data[i].img + `" alt="">
                <p class="name">` + data[i].name + `</p>
                <p class="amount">$` + data[i].price + `</p>
                <a href="javascript:void(0);"><button class="btn-black" onclick="SaveDataToLocalStorage('` + data[i].id + `');">BUY</button></a>
                </div>`;
        } else {
            product += `<div class="recent">
                <img src="` + data[i].img + `" alt="">
                <p class="name">` + data[i].name + `</p>
                <p class="amount discounted"><span>$` + data[i].discounted + `</span>$` + data[i].price + `</p>
                <a href="javascript:void(0);"><button class="btn-black" onclick="SaveDataToLocalStorage('` + data[i].id + `');">BUY</button></a>
                </div>`;
        }
    }
    document.querySelector('.recently .recents').insertAdjacentHTML('beforeend', product);

    
    initCart();
});


orders = JSON.parse(localStorage.getItem('session')) || [];

function SaveDataToLocalStorage(idNum){
    let added = '';
    for (let index in data){
        curObj = data[index];
        if(curObj['id'] === idNum){
            added = curObj;
        }
    }
    orders.push(added);
    console.log(orders);

    localStorage.setItem('session', JSON.stringify(orders.sort()));
    // window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    document.getElementById('added').classList.add('shown');
    setTimeout(() => {
        document.getElementById('added').classList.remove('shown');
    }, 2000);
    initCart();
}

function AddDataToLocalStorage(idNum){
    let added = '';
    for (let index in data){
        curObj = data[index];
        if(curObj['id'] === idNum){
            added = curObj;
        }
    }
    orders.push(added);
    console.log(orders);

    localStorage.setItem('session', JSON.stringify(orders.sort()));
    initCart();
}

function RemoveDataToLocalStorage(idNum){
    console.log(orders)
    const findIndex = orders.findIndex(a => a.id === idNum)
    findIndex !== -1 && orders.splice(findIndex , 1)
    console.log(orders)
    localStorage.setItem('session', JSON.stringify(orders));
    initCart();
}

// SaveDataToLocalStorage('aaaaadddddd');

function initCart() {
    const output = orders.reduce((acc, curr) => {
        curr.count = 1;
        const exists = acc.find(o => o.id === curr.id);
        
        exists ? exists.count++ : acc.push(({ id, count } = curr));
        
        return acc;
      }, []);
      
    console.log(output);
    document.querySelector('.shopping-cart  .products').innerHTML = '';
    document.querySelector('#cart span').innerHTML = orders.length;
    document.querySelector('#bagNum').innerHTML = orders.length;
    let order = '';
    if (output.length < 1) {
        document.querySelector('.shopping-cart  .products').innerHTML = '<p class="empty-cart">No products to show.</p>';
    } else {
        for (let i = 0; i < output.length; i++) {
            // console.log(data[i].name);
            if (output[i].discounted == '') {
                order += `<div class="product">
                        <img src="` + output[i].img + `" alt="">
                        <div class="details">
                            <p class="name">` + output[i].name + `</p>
                            <p class="quantity"><span class="change-cart" onclick="RemoveDataToLocalStorage('` + output[i].id + `');">-</span> <span>` + output[i].count + `</span> <span class="change-cart" onclick="AddDataToLocalStorage('` + output[i].id + `');">+</span></p>
                            <p class="price">
                                <span class="prev-price">$<span id="prev-price">` + output[i].price + `</span></span>
                            </p>
                        </div>
                    </div>`;
            } else {
                order += `<div class="product">
                        <img src="` + output[i].img + `" alt="">
                        <div class="details">
                            <p class="name">` + output[i].name + `</p>
                            <p class="quantity"><span class="change-cart" onclick="RemoveDataToLocalStorage('` + output[i].id + `');">-</span> <span>` + output[i].count + `</span> <span class="change-cart" onclick="AddDataToLocalStorage('` + output[i].id + `');">+</span></p>
                            <p class="price">
                                <span class="discounted-price">$<span id="discounted-price">` + output[i].discounted + `</span></span>
                                <span class="prev-price line-through">$<span id="prev-price">` + output[i].price + `</span></span>
                            </p>
                        </div>
                    </div>`;
            }
        }
        document.querySelector('.shopping-cart .products').insertAdjacentHTML('beforeend', order);
    }
    
    
}