import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// view stores have 5 option.
// State, Mutation, getters, actions and modules
export default new Vuex.Store({
	state:{ //= data

		products: []

	},
	getters: {  //= computed properties
				// return length of array

		productsCount() {
			
		}
	},
	actions:{ // = method
			  // make the call
			  // can be  complex but never update the state

		fetchProducts(){
			//run setProducts mutation

		}

	},
	mutations: { //responsible for setting and updating the state
				 //update products array - responsible for changing the state

		// state, payload
		setProducts(state,  products) {
			state.products = products
		}

	}
})