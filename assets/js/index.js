// variables
let btnMenu = document.querySelector('.hamburger')
let sideNav = document.querySelector('#sidenav')
let logo = document.querySelector('#logo')
let headerLogo = document.querySelector('.header-logo')
let dropDownIcon = document.querySelector('#dropdown-icon')
let alternateList = document.querySelector('#alternate-list')
let alternateMenu = document.querySelector('.sidenavMenu-list-options')

const active = 'active'

// Functions   
const toggleMenu = event => {
  listToggle(btnMenu, 'is-active')
  listToggle(sideNav, 'sidenavClose')
  listToggle(logo, active)
  listToggle(alternateMenu, active)
  
  if(btnMenu.classList[1] === 'is-active' && alternateMenu.classList[1] !== 'active')  {
    alternateMenu.classList.remove('active')
    listToggle(alternateList, active)
  }else {
    listToggle(alternateMenu, active)
  } 

  if(screen.width > 720){
    listToggle(headerLogo, active)
  }

  event.preventDefault()
}

const listToggle = (element, atr) => {
  element.classList.toggle(atr)
}

// Events
btnMenu.addEventListener('click', toggleMenu, false)

dropDownIcon.addEventListener('click', (e) => {
  e.preventDefault()
  if(sideNav.clientWidth < 100) {
    alternateMenu.classList.remove('active')
  }else{
    listToggle(alternateList, active)
    listToggle(alternateMenu, active)
  }

})
