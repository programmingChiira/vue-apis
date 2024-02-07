
let open = document.querySelector('.navbar--icon');
let menu = document.querySelector('.nav--open');
let close = document.querySelector('.nav--open-icon');

open.addEventListener('click', function() {
  menu.classList.toggle('close');
});


close.addEventListener('click', function() {
  menu.classList.toggle('close');
})
