<template>
	<div>
		<div class="card shadow-sm">
			<div class="card-header">
				<h4>{{allDays[0].month}}</h4> 
			</div>
			<ul class="list-group list-group-flush" v-for="day in allDays" :key="day.date">
				<li v-if="day.event !== null" class="list-group-item active">
					{{day.date}} <small class="pr-5"> {{day.day}}</small> <span class="pl-5">{{day.event}}</span>
				</li>
				<li v-else class="list-group-item">{{day.date}} <small class="pr-5"> {{day.day}}</small></li>
			</ul>
		</div>
	</div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';

export default {

	name:"monthView",
	methods: {
		...mapActions(['DaysArray']),

	},
	computed: mapGetters(['allDays']),

	//lifecycle methods
	created() {

		this.DaysArray();

	},
	mounted() {
		console.log('Component mounted.')
	},
	
}
</script>