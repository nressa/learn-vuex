import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

// view stores have 5 option.
// State, Mutation, getters, actions and modules
export default new Vuex.Store({
	state:{ 
		//= data
		// [id, product name]

		products: [],
		cart: [],
		checkoutStatus: null

	},
	getters: {  
		//= computed properties
		// return length of array

		availableProducts(state, getters){

			return state.products.filter(product => product.inventory > 0)
		},

		cartProducts(state){
			return state.cart.map(cartItem =>{
				const product = state.products.find(product => product.id === cartItem.id)
				return {
					title: product.title,
					price: product.price,
					quantity: cartItem.quantity
				}
			})
		},

		cartTotal(state, getters){
			
			return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
		},

		productIsInStock(){

			return (product) => {
				return product.inventory > 0
			}
		}

	},

	actions:{ 

		fetchProducts({commit}){
			//run setProducts mutations

			return new Promise((resolve, reject) => {
				shop.getProducts(products =>{
					commit('setProducts', products)
					resolve()
				})
			})
		},

		addProductToCart({state, getters, commit}, product){
			if(getters.productIsInStock(product)){
				const cartItem = state.cart.find(item => item.id === product.id)
				if(!cartItem){
					commit('pushProductToCart', product.id)
				} else{
					commit('incrementItemQuantity', cartItem)
				}

				commit('decrementProductInventory', product)
			}
		},

		checkout({state, commit}){

			shop.buyProducts(
				state.cart,
				()=>{
					commit('emptyCart')
					commit('setCheckoutStatus', 'success')
				},
				()=>{
					commit('setCheckoutStatus', 'fail')
				}
			)
		}

	},

	mutations: { 

		//responsible for setting and updating the state
		//update products array - responsible for changing the state
		// state, payload

		setProducts(state,  products) {

			state.products = products
		},

		pushProductToCart(state, productId){
			state.cart.push({

				id: productId,
				quantity: 1
			})
		},

		incrementItemQuantity(state, cartItem){

			cartItem.quantity++
		},

		decrementProductInventory(state, product){

			product.inventory--
		},

		setCheckoutStatus(state, status){

			state.checkoutStatus = status
		},
		emptyCart(state){
			state.cart = []
		}

	}
})

// Actions decide when a mutation should fire.
// Mutations are always the ones responsible for state changes.
// Thus never change the state directly in the action
// commit in mutation elps to track state changes