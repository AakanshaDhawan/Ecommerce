var updateBtns = document.getElementsByClassName('update-cart')

for(var i=0;i<updateBtns.length;i++){

    updateBtns[i].addEventListener('click',function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log("p",productId,"a",action)

        console.log(user)
        if(user === 'AnonymousUser'){
            addCookieItem(productId,action)
        }
        else{
            updateUserOrder(productId,action)
        }
    })
}

function addCookieItem(productId,action){
    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {quantity : 1}
        }
        else{
            cart[productId]['quantity'] += 1
        }
    }
    if (action == 'remove'){
        cart[productId]['quantity'] -= 1
        if(cart[productId]['quantity'] <= 0){
            console.log('deleted', cart[productId])
            delete cart[productId]
        }
    }
    console.log('here',cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()

}

function updateUserOrder(productId,action){
    console.log("yes")
    console.log(csrftoken)
    var url='/update_item/'
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({
            'productId':productId,
            'action':action
        })
    })
    .then((resp)=>{
        return resp.json()
    })
    .then((data)=>{
        console.log('d:',data)
        location.reload()
    })
    
}