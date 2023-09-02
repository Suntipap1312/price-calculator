import { createRouter, createWebHistory } from 'vue-router'
import { products } from '../store/config'
import Home from '../views/Home.vue'
import PreviewDocument from '../views/PreviewDocument.vue'

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/preview', name: "Preview", component: PreviewDocument },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// Not allow to access '/preview', if there is no item in products[]
router.beforeEach((to, _, next) => {
    if (to.name === 'Preview' && products.value.length < 1) return next({ name: 'Home' })
    else return next()
})

router.beforeEach((to, _, next) => {
    const body = document.body as HTMLBodyElement;
    if (to.path === '/preview') {
        body.style.backgroundColor = 'white'; // Change to the desired color
    } else {
        body.style.backgroundColor = '#00d1b2';
    }
    next();
});

export default router