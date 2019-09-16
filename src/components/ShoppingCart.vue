<template>
	<div>
		<h1>Shoppping Cart</h1>

		<ul>
			<li v-for="product in products">
				{{ product.title }}
				- {{ product.price }}
				- {{ product.quantity }}
			</li>
		</ul>
		<br/>
		<p>Total: {{ total }}</p>
	</div>
</template>

<script>
	export default {
		computed: {
			products(){
				return this.$store.getters.cartProducts
			},

			total(){
				return this.$store.getters.cartTotal
			}
		},
	}
</script>

<style scoped>
	
</style>
