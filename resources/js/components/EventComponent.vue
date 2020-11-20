<template>
<div>
	<form>
		<div class="form-group">
			<label for="exampleFormControlInput1">Event</label>
			<input v-model="eventName" type="email" class="form-control" id="eventName" placeholder="Name of event" required>
		</div>
		<div class="row">
			<div class="form-group col-6">
				<label for="fromDatepicker">From</label>
				<Datepicker v-model="fromDate" name="fromDate" bootstrap-styling required></Datepicker>
			</div>
			<div class="form-group col-6">
				<label for="toDatepicker">To</label>
				<Datepicker v-model="toDate" name="toDate" bootstrap-styling required></Datepicker>
			</div>
		</div>
		<div class="row">
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Mon"> Mon
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Tue"> Tue
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Wed"> Wed
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Thu"> Thu
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Fri"> Fri
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Sat"> Sat
			</label>
			<label class="checkbox-inline p-2">
				<input v-model="daysOfWeek" type="checkbox" value="Sun"> Sun
			</label>
		</div>
		<button type="button" class="btn btn-success" @click="save">Save</button>
	</form>
	
		<div class="card shadow-sm mt-3">
			<div class="card-header">
				<h6>Saved Events</h6>
			</div>
		<ul class="list-group list-group-flush" v-for="event in savedEvents" :key="event.id">
			<li class="list-group-item" @click="loadEvent(event)" >{{event.eventName}}</li>
		</ul>
		</div>

</div>
</template>
<script>

import Datepicker from 'vuejs-datepicker';
import {mapGetters, mapActions} from 'vuex';
import moment from 'moment';
import store from './store';
import axios from 'axios';

export default {

	name:"eventView",

	data(){
		return{
			fromDate: '',
			toDate: '',
			eventName: '',
			daysOfWeek: [],
			savedEvents: [],
		}
	},

	components: {
		Datepicker
	},

	methods: {

		...mapActions(['setEvent']),

		fetchEvents: function(){
			fetch('api/events')
			.then(res => res.json())
			.then(data => {
				this.savedEvents = data;
			})
		},

		loadEvent: function(event) {
			console.log(event);
			this.setEvent(event);

		},

		save:  function() {

			event = {
				fromDate: moment(this.fromDate).format('YYYY-MM-DD'),
				toDate: moment(this.toDate).format('YYYY-MM-DD'),
				eventName: this.eventName,
				daysOfWeek: this.daysOfWeek.toString(),
			}
			console.log(event);
			 axios
				.post('http://localhost:8000/api/events/create', event)	
				.then((res) => {
					this.fetchEvents();
					this.loadEvent(event);
					Vue.$toast.success('Event saved successfully.', {
						position: 'top-right',
						dismissable: true
					})
				})
				.catch(error => {
					console.log(error);
					Vue.$toast.error('Please fill all fields.', {
					position: 'top-right',
					dismissable: true
					})
				})
				.finally(() => this.loading = false)

			// console.log(event)
			// this.setEvent(event)
			// store.dispatch('DaysArray');
		},




	},
	created() {
		this.fetchEvents();
	},
	mounted() {
		console.log('Component mounted.')
	}
}
</script>

