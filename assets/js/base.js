/**search */
var btnSearch = document.querySelector('.header__actions-search')
btnSearch.onclick = function(e) {
    document.querySelector('.header-inner').style.display="none"
    document.querySelector('.search').style.display="flex"
    e.stopPropagation()
}

var mainElement = document.querySelector('.main')
mainElement.onclick = function() {
    document.querySelector('.header-inner').style.display="flex"
    document.querySelector('.search').style.display="none"
}

document.querySelector('.search__input').onclick = function(e) {
    e.stopPropagation()
}

/**header hide */
var siteHeader = document.querySelector('.site-header')
var posBodyOld;
window.addEventListener('scroll', function() {
    let posBodyNew=document.documentElement.scrollTop
    if(posBodyNew>=80) {
        if(posBodyNew > posBodyOld) {
            posBodyOld = posBodyNew
            siteHeader.style.transform = 'translateY(-100%)'
        }
        else {
            posBodyOld = posBodyNew
            siteHeader.style.transform = 'translateY(0px)'
        }
    } 
})

/**display overlay */
var navProduct= document.querySelector('.header__navbar-product')
var aboutCoolMate = document.querySelector('.navbar-item--about-coolmate.header__navbar-item')

function displayModal(){
    let modal = document.querySelector('.modal')
    modal.style.visibility='visible';
    modal.style.opacity = '1'
    document.querySelector('.main').addEventListener('mouseover',function() {
        modal.style.visibility='hidden'
        modal.style.opacity = '0'
    })  
}
navProduct.onmouseover= function(e) {
    displayModal()
    e.stopImmediatePropagation()
}

aboutCoolMate.onmouseover = function(e) {
    displayModal()
    e.stopImmediatePropagation()
}

/**form */
var login = document.querySelector('.form-login')
var register = document.querySelector('.form-register')
var formAccount = document.querySelector('.form-account')
var optionLogin=document.querySelector('.form-option__login')
var optionRegister = document.querySelector('.form-option-register__item')
var btnAccount = document.querySelector('.header__actions-account')
var modalForm = document.querySelector('.modal-form')

login.onclick = function (e) {e.stopPropagation()}
register.onclick = function(e) {e.stopPropagation()}
btnAccount.addEventListener('click',function() {
    login.style.top='50%';
    register.style='top:50%; opacity:0; pointer-events:none;'
    modalForm.style='background-color: rgba(0, 0, 0, 0.5);pointer-events:visible;'
})

optionLogin.onclick = function (e) {
    login.style.opacity='0'
    login.style.pointerEvents = 'none'
    register.style.transition='all 0s'
    register.style.opacity='1'; 
    register.style.pointerEvents = 'visible';
    e.stopPropagation(); 
}

optionRegister.onclick=function (e) {
    login.style.transition='all 0s'
    login.style.opacity='1'
    login.style.pointerEvents = 'visible'
    register.style.opacity='0'; 
    register.style.pointerEvents = 'none';
    e.stopPropagation();
}

modalForm.addEventListener('click',function() {
    register.style.transition='all 0.2s'
    login.style.transition='all 0.2s'
    login.style.opacity='1'
    login.style.pointerEvents = 'visible'
    login.style.top='150%';
    register.style.top='150%';
    modalForm.style='background-color: rgba(0, 0, 0, 0);'
})


     
    /** Khi click v??o size th?? l???y product ??? giao di???n ch??nh th??m v??o bi???n cart trong local storage*/
    $('.btn--size').each(function(indexBtn,valueBtn) { 
        $(valueBtn).click(function() {
            
            var id=$(valueBtn).parent().parent().parent().attr("id") //l???y id ??? th??? cha c??ch button 3 b???c
            var name=$(`#${id} .product-name`).text()
            var img=$(`#${id} .product-img-1`).attr("src") //l???y link ???nh c???a s???n ph???m
            var color=$(`#${id} .product-content__option-item-wrap.active span`).attr("data") //l???y m??u ???????c ch???a trong data
            var size=$(valueBtn).text()
            var price=convertToNumber($(`#${id} .product-price`).text())
            var item={
                id: id,
                name: name,
                img: img,
                color: color,
                size: size,
                price: price,
                quantity:1,
                discount:0
            }
            addToCart(item) //th??m th??ng tin v??o local storage
        })
    })

    //H??m chuy???n t??? s??? sang chu???i theo ?????nh d???ng VND
     function convertVND(number) {
        if(number==0) {return '0??'}
        var str=JSON.stringify(number);
        var result=""
        var length=str.length
        var count=0
        for(var i=length-1; i>=0; --i) {
            if(count%3==0 && count!=0) {
                result=str[i]+'.'+result
            }
            else {
                result=str[i]+result
            }
            count++
        }
        return result+'??'
    }

    /**H??m chuy???n chu???i theo ?????nh d???ng VND v??? s??? */
     function convertToNumber(price) {
        var result =""
        for(var i=0; i<price.length; i++) {
            if(price[i]!="." && price[i]!="??") {
                result += price[i]
            }
        }
        return JSON.parse(result)
    }

    /** Khi click v??o n??t th??m gi??? h??ng th?? l???y product ??? giao di???n chi ti???t v??o bi???n cart trong local storage */
    $('.btn-addCart').click(function() {
        if($(this).text()=="Th??m v??o gi??? h??ng") {
            var name=$(".content__heading").text()
            var img=$(".product-img__option-item.active img").attr("src")
            var color=$(".content__color-heading b").text()
            var size=$(".btn-size.active").text()
            var price=convertToNumber($(".content__price").text())
            var quantity=JSON.parse($(".product-single__actions .quantity span").text())
            var item={
                id:"detail1",
                name: name,
                img: img,
                color: color,
                size: size,
                price: price,
                quantity:quantity,
                discount:0
            }
            addToCart(item) //th??m th??ng tin v??o local storage
        }
    })
    
    /**h??m th??m th??ng tin c???a 1 product v??o local storage*/
    function addToCart(item) {
        var list; //list ch???a c??c product trong cart
        if (localStorage.getItem('cart') == null) {
            list = [item];  
        } 
        else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let check = true;
            //t??m trong list xem ???? t???n t???i product ng?????i d??ng v???a th??m ch??a n???u r???i c???ng s??? l?????ng l??n 1, ch??a thid th??m product m???i
            for (let x of list) {
                //m???i product ???????c th??m v??o cart c?? id, color, size kh??c nhau
                if (x.id == item.id && x.color == item.color && x.size== item.size) {
                    x.quantity += 1;
                    check = false;
                    break;
                }
            }
            if(check){
                list.push(item); 
            } 
        }
        localStorage.setItem('cart', JSON.stringify(list));
        loadMiniCart() //Load th??ng tin l??n mini cart
        displayNotify(item) //Hi???n th??ng b??o ???? th??m
    }

     /**H??m load th??ng tin t??? local storage l??n mini cart*/
    function loadMiniCart() {
        let list= JSON.parse(localStorage.getItem('cart')) || []
        var str=""
        var length=list.length
        if(length>0) {
            for(let x of list) {
                str+=`<li class="mini-cart__item">
                <a class="mini-cart__link">
                <div class="mini-cart__link-img">
                    <img src="${x.img}" alt="">
                </div>
                <div class="mini-cart__link-content">
                    <p class="mini-cart__link-content-name">${x.name}</p>
                    <p class="mini-cart__link-content-describe">m??u ${x.color} ${x.size}</p>
                    <p class="mini-cart__link-content-price">${convertVND(x.price)}</p>
                    <p class="mini-cart__link-content-quantity">x${x.quantity}</p>
                    <span class="mini-cart__item-cancel" onclick="XoaMiniCart('${x.id}','${x.size}','${x.color}')">???</span>

                </div>
                </a>
            </li>`
            }
            $(".mini-cart__list").html(str)
            $(".header__actions-cart-notify").text(`${length}`)
            $(".added-product").text(`${length}`)
        }
        else {
            $(".mini-cart__list").html('<p class="cart-empty">Kh??ng c?? s???n ph???m</p>')
            $(".header__actions-cart-notify").text("0")
            $(".added-product").text("0")
        }                        
    }
    loadMiniCart();

    function XoaMiniCart(id,size,color){
        let list= JSON.parse(localStorage.getItem('cart')) || []
        var index = list.findIndex(x => x.id == id && x.size == size && x.color == color);
        if (index >= 0) {
            list.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(list));
        loadMiniCart();
    }

    /**H??m hi???n th??ng b??o ???? th??m s???n ph???m m???i*/
    function displayNotify(item) {
        $(".notify-added-img img").attr("src",`${item.img}`);//load link ???nh
        $(".notify-added__content-name").text(`${item.name}`)
        $(".notify-added__color").text(`${item.color}`)
        $(".notify-added__size").text(`${item.size}`)
        $(".notify-added__content-price").text(`${convertVND(item.price)}`)
        $(".notify-added").css("transform", "translateX(0px)")//????a block th??ng b??o d???ch chuy???n v??o trong m??n h??nh
        //block th??ng b??o ???????c thu v??o sau 4 gi??y
        setTimeout(function() {
            $(".notify-added").css("transform", "translateX(calc(100% + 20px))")
        },3000)
    }


    /*Menu-toggle*/
    var modal=$(".modal")
    var menuTogleList=$(".menu-toggle__list")
    $(".menu-toggle").click(function(){
        menuTogleList.css("transform", "translateX(0%)")//?????y menu ra ngo??i
        modal.css({"opacity":"1","pointer-events":"visible","visibility":"visible","z-index":"11"})//hi???n l???p modal v?? z-index=11 cao h??n header
    }) 
    
    $(".menu-toggle__close").click(function(){
        menuTogleList.css("transform", "translateX(-100%)")//?????y menu v??o trong
        modal.css({"opacity":"0","pointer-events":"hidden","visibility":"hidden","z-index":"9"})//???n l???p modal
    })

    modal.click(function(){
        menuTogleList.css("transform", "translateX(-100%)")//?????y menu v??o trong
        modal.css({"opacity":"0","pointer-events":"hidden","visibility":"hidden","z-index":"9"})//???n l???p modal v?? kh??ng ????? cho 
    })

    $(".btn-contact").click(function(){
        $(".message").addClass("active")
    })

    $(".hide-message").click(function(){
        $(".message").removeClass("active")
    })
// })



