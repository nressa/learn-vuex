<template>
	<div>
		<h1>Shoppping Cart</h1>

		<ul>
			<li v-for="product in products">
				{{ product.title }}
				- {{ product.price | currency }}
				- {{ product.quantity }}
			</li>
		</ul>
		<br/>
		<p>Total: {{ total| currency }}</p>
		<button @click="$store.dispatch('checkout')">Checkout</button>
		<p v-if="$store.state.checkoutStatus"> {{ $store.state.checkoutStatus }} </p>
	</div>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		computed: {
			...mapGetters({
				products: 'cartProducts',
				total: 'cartTotal'
			}),
		},
	}
</script>

<style scoped>
	
</style>
