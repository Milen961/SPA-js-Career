import { page, render } from "./lib.js"
import { getUserData } from "./util.js"
import { catalogView } from "./views/catalog.js"
import { homeView } from "./views/home.js"
import { logout } from "./api/users.js"
import { loginView } from './views/login.js'
import { registerView } from './views/register.js'
import { createView } from "./views/create.js"
import { detailsView } from "./views/details.js"



const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext) //0
page('/', homeView) // 1, connected with 3 
page('/login', loginView) // 3
page('/register', registerView) // 4
page('/catalog', catalogView) // 2
page('/create', createView )
page('/details', detailsView )


//start App
updateNav()
page.start()

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav
    next()
}
   

function renderMain(templateResult){
  render(templateResult, main)
}
function updateNav(){
   const userData = getUserData();
   if(userData){
document.querySelector('.user').style.display = 'block'
document.querySelector('.guest').style.display = 'none'


   }else {
    document.querySelector('.user').style.display = 'none'
    document.querySelector('.guest').style.display = 'block'
   }
}
function onLogout(){
  logout();
  updateNav();
  page.redirect('/catalog')
}