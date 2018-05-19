function addItemToCart(item){
    setCookie(item)
    console.log(getCart());
}

function getCart(){
    return getCookie('item');
}

$(document).ready(()=>{
    console.log("flijoiefjo")
    $('#cart-list').text (getCookie());
})

function setCookie(item){
    var date = new Date("February 10, 2090");
    var dateString = date.toGMTString();
    var cookieString = "Css=" + item + dateString;
    document.cookie = cookieString;
}

function getCookie(){
    alert(document.cookie);
}