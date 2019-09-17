<template>
	<div>
		<h1>Product List</h1>

		<img
			v-if="loading"
			src="https://i.imgur.com/JfPpwOA.gif"
		>

		<ul v-else>
			<li v-for="product in allProducts">
				{{ product.title }} 
				- {{ product.price | currency }}
				- {{ product.inventory }}
				<button 
					:disabled="!productIsInStock(product)"
					@click="addProductToCart(product)">
					Add To Cart
				</button>
				<br/><br/>

			</li>
		</ul>

	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {

		data() {
			return{
				loading: false,
				productIndex: 1
			}
		},

		computed: mapState({
			allProducts: state => state.products,
			firstProduct: state => state.producrs[0],
			specificProduct(state){
				return state.products[this.productIndex]
			}
		}),

		// computed: {
		// 	products(){
				
		// 		return this.$store.state.products
		// 	},

		// 	productIsInStock(){
		// 		return this.$store.getters.productIsInStock
		// 	}

		// },

		methods: {
			addProductToCart(product){

				this.$store.dispatch('addProductToCart', product)
			}
		},

		created(){
			this.loading = true
			this.$store.dispatch('fetchProducts')
			.then(() => this.loading = false)
		}

	}
</script>