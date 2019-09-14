import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// view stores have 5 option.
// State, Mutation, getters, actions and modules
new Vuex.Store({
	state:{ //= data

		products: []

	},
	getters: {  //= computed properties
				// return length of array

		productsCount() {
			
		}
	},
	actions:{ // = method
		fetchProducts(){
			// make the call
		}

	},
	mutations: { //responsible for setting and updating the state
		//update products

	}
})