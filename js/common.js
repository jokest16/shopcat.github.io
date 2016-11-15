$(function(){
  var sub = $('.category-subcategory'),// список с категорией щенки/взрослые/пожилые
      catItem = $('.category-item'),//пунк меню бокового списка
      prodSub = $('.product-item-discription-price-item'),//блок принимающий цену с выпадающего списка по дефолту 100 000
      prodItem = $('.product-item'),
      subPr = $('.sub-price'),// выпадающий список с ценой
      subIt = $('.sub-item'),// пункт меню выпадающего списока с ценой
      buyB = $('.buy'),//кнопка "в корзину"
      basket = $('.basket'),//popup окно корзины
      basketItem = $('.basket-item'),//блок обертка клонируемого блока с оваром
      totalPrice = $('.total-price'),//итоговая цена товара
      totalPriceIter = $('.iter-price-num'),//щетчик количества заказываемого товара
      plus = $('.plus'),minus = $('.minus'),//кнопки щетчика
      closeBasket = $('.fa-times'),//кнопка закрыть на popup окне корзины
      modalBg = $('.modal-bg'),//блок фона
      retButton = $('.return-b');//кнопка вернуться в каталог
      arrowDown = $('<i class="fa fa-chevron-down" aria-hidden="true"></i>');

  catItem.on('click',function(){//кдик по списку категорий
    $(this).find(sub).slideToggle('slow');//по клику на категорию он ищет дочерний элемент если есть то открывает по повторному прячет
  });
  prodSub.on('click',function(){//клик по цене
    $(this).next().slideToggle('normal');//ищет следующий блок и вешает на него мереключатель вверх/низ
    subIt.next().on('click', function () {//клик по пункту всплывающего списка
      $(this).append(arrowDown);
      $(this).parent().prev().html($(this).clone());// намудрил тут немного но больше в голову нечего не пришло поэтому нашел радителя и от него взял сл. элемент в который вставли клон нажатого пункта списка
      $(this).parent().slideUp();// по нажатию на родителя либо на пункт списка список сварачивается
    });
  });

  prodSub.append(arrowDown);
    $('.product-item-discription-h3').equalHeights();// дабы ширина не блока товара не ехала от количества слов
    $('.product-item-discription-p').equalHeights();// дабы ширина не блока товара не ехала от количества слов

    buyB.on('click',function(e){//клик по кнопке корзина
    basket.fadeIn('normal');//показывает блок корзины
    modalBg.show();// показывает фон
    basketItem.append($(this).parent().parent().clone());//вствляем родителя родителя нажтой кнопки
    price = basketItem.find('.price').html();// находим в клониваном блоке товара цену и записываем в перменною ниже я написал функцию для преобразования получившейся в строки в число
    totalPriceIter.html('0');//добовляем строку в щётчик по дефолту
    totalPrice.html('0');// тоже самое что и в пердидущем
    plus.on('click', function(e){//клик на кнопку плюс
      totalPriceIter.html(+totalPriceIter.html()+1);//заменяем содержимое спана на приведенное значение к числу и прибавляем еденицу
      totalPrice.html((+totalPriceIter.html())*getNum(price));// далее полученое ниже значение умножаем на приведённое значение блока с ценой за штуку и множаем на счётчик и всё это запихиваем в блок итоговой цены
      totalPrice.priceFormat({
        prefix: '',
        centsSeparator: ' ',
        thousandsSeparator: ' ',
        centsLimit: 3
      });
    });
    minus.on('click', function(){// клик по минусу
      totalPriceIter.html(+totalPriceIter.html()-1);// по клику отнимаем еденицу от текущего значения счетчика
      if(+totalPriceIter.html()<0){// также если счётчик меньше 0 возвращаем 0 в итоговою цену и в щётчик
         totalPriceIter.html('0');
         totalPrice.html('0');
      }
      totalPrice.html(((+totalPriceIter.html())/getNum(price)+(+totalPriceIter.html()*getNum(price))).toFixed())//также нужно отнимать значение иьоговой цены в обратку и фиксит нули
      totalPrice.priceFormat({
        prefix: '',
        centsSeparator: ' ',
        thousandsSeparator: ' ',
        centsLimit: 3
      });
    });

    function getNum(str) {//функция принимает строку
      str = str.split(' ');//строка делится по пробелам на массив
      str = str.join('');// потом этот массив соединяется без пробелов в строку
      return parseFloat(str);// потом из этой строки вынимается числа
    }
  });
  closeBasket.on('click', function () {//клик по крестику
    basket.fadeOut(200);// прячет корзину
    modalBg.fadeOut(600);// прячет фон
    basket.find('.product-item').remove();// чистка корзины от клона блока
  });
    retButton.on('click', function () {//тоже самое что и выше
      basket.fadeOut(200);
      modalBg.fadeOut(600);
      basket.find('.product-item').remove();
    });
  modalBg.on('click', function () {//клик по крестику
    basket.fadeOut(200);// прячет корзину
    modalBg.fadeOut(600);// прячет фон
    basket.find('.product-item').remove();// чистка корзины от клона блока
  });
});
