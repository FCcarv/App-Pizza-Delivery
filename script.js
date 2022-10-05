let modalQt =1;

const cdd = (el)=>document.querySelector(el);
const cddAll = (el)=>document.querySelectorAll(el);

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
        //console.log(pizzaJson[key]);
            modalQt = 1;
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
    


