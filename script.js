let cart = [];
let modalQt =1;
let modalKey = 0;

const cdd = (el)=>document.querySelector(el);
const cddAll = (el)=>document.querySelectorAll(el);

//Listagem das Pizzas
pizzaJson.map((item,index)=>{
    let pizzaItem = cdd('.models .pizza-item').cloneNode(true);
    
    //mostra o indice ou seja o numero da pizza q foi clicada no atributo data-key
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        //tras todas as informações da pizza acessando indice do array e todas as informações daquela pizza, trazendo p o modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
       
        modalQt = 1;//qtidade da pizza
        modalKey = key;//tipo da pizza


        //****** modal ******* */
            cdd('.pizzaBig img').src = pizzaJson[key].img;
            cdd('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
            cdd('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
            cdd('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
            cdd('.pizzaInfo--size.selected').classList.remove('selected');//remove a seleção dos tipos de pizza qndo abrir o modal
            //tamanhos das pizzas
            cddAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{
                if(sizeIndex == 2){
                    size.classList.add('selected');
                }
                size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];
            });
           cdd('.pizzaInfo--qt').innerHTML = modalQt;

        //****** modal ******* */
    
                //abre a modal deixando sem opacidade
            cdd('.pizzaWindowArea').style.opacity = 0;
            cdd('.pizzaWindowArea').style.display = 'flex';

            //da um tempo de 200milisgs  de espera p que a opacidade suma e mostre a modal da pizza clicada.
            setTimeout(()=>{
                cdd('.pizzaWindowArea').style.opacity = 1;
            }, 200);
     
    });
    //adiciona a modal
    cdd('.pizza-area').append(pizzaItem); 
    
    //console.log(item);
});
    
//Evento do Modal
function closeModal(){
    cdd('.pizzaWindowArea').style.opacity = 0;
    //da opacity e depois dispaly none
    setTimeout(()=>{
        cdd('.pizzaWindowArea').style.display= 'none';
    }, 500);
}
//fecha o modal
cddAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
//diminui a qtidade de pizza > botao menos do modal
cdd('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
if(modalQt > 1){
    modalQt--;
    cdd('.pizzaInfo--qt').innerHTML = modalQt;
}
});
//aumenta a qtidade de pizza > botao mais do modal
cdd('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    cdd('.pizzaInfo--qt').innerHTML = modalQt;
});
//selecionando o tamanho das pizzas peq, med, grd
cddAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        cdd('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//adicionar pizza ao carrinho,
//armazenar 3 informções > qt de pizza, tamanho, tipo
cdd('.pizzaInfo--addButton').addEventListener('click', ()=>{
let size = parseInt(cdd('.pizzaInfo--size.selected').getAttribute('data-key'));
let identifier = pizzaJson[modalKey].id+'@'+size;//indentifica se a pizza mesmo tipo e add
let key = cart.findIndex((item)=>item.identifier == identifier);
if(key > -1){
    cart[key].qt += modalQt;
}else{
    cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
    }); 
}
    updateCart();
    closeModal();
});

//Abre o cart e add as informações
function updateCart(){
    if(cart.length > 0){
        cdd('aside').classList.add('show');
        cdd('.cart').innerHTML = "";

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            //calculo subtotal
            subtotal += pizzaItem.price * cart[i].qt;  

            let cartItem = cdd('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;         
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML =cart[i].qt;

            //adicionar a qtidade de pedidos de pizza
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });

            //retira a qtidade de pedidos de pizza 
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });

            cdd('.cart').append(cartItem);
        }
        //calculando  desconto e total
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        cdd('.subtotal span:last-child').innerHTML = `R$  ${subtotal.toFixed(2)}`;
        cdd('.desconto span:last-child').innerHTML = `R$  ${desconto.toFixed(2)}`;
        cdd('.total span:last-child').innerHTML = `R$  ${total.toFixed(2)}`;

    }else{
        cdd('aside').classList.remove('show');
    }
}
