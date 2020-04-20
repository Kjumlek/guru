const toggleMenu = document.querySelector('.toggle-menu');
const menu = document.querySelector('.menu');
const subC = document.querySelector('.sub-container');

const msgText = document.querySelector('.chatBox-title');

toggleMenu.addEventListener('click', function () {
  const open = JSON.parse(toggleMenu.getAttribute('aria-expanded'));
  toggleMenu.setAttribute('aria-expanded', !open);
  subC.hidden = !subC.hidden;
  if(!open){
    toggleUsers.setAttribute('aria-expanded', false);
    subC.style.gridTemplateColumns = "40% 25% auto 0%";
    msgText.hidden = true;
  } else {
    subC.style.gridTemplateColumns = "0% 25% auto 0%";
    msgText.hidden = false;
  }

});

menu.addEventListener('click', function() {
  subC.hidden = !subC.hidden;
  toggleMenu.setAttribute('aria-expanded', !open);
  subC.style.gridTemplateColumns = "0% 25% auto 0%";
})

/////////////////////////////////////////////////////////////////
const toggleUsers = document.querySelector('.toggle-users');

toggleUsers.addEventListener('click', function () {
  const open2 = JSON.parse(toggleUsers.getAttribute('aria-expanded'));
  toggleUsers.setAttribute('aria-expanded', !open2);
  if(open2){
    subC.style.gridTemplateColumns = "0% 25% auto 0%";
    msgText.hidden = false;
  } else{
    subC.style.gridTemplateColumns = "0% 0% 58% 50%";
    subC.hidden = true;
    msgText.hidden = true;
    toggleMenu.setAttribute('aria-expanded', false);
  }


});

