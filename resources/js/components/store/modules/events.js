import moment from 'moment';

const state = {
	days: [],
	events: [],
	eventName: '',
	startDate: '',
	endDate: '',
	selectedDaysOfWeek: [],
	savedEvents : []
};

const getters = {
	allDays: (state) => state.days
};

const actions = {

	DaysArray({commit, state}) {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		var start = new Date(y, m, 1);
		var end = new Date(y, m + 1, 0);

		for(var a=[],d=new Date(start);d<=end;d.setDate(d.getDate()+1)){

			var fdate = moment(new Date(d)).format('Do');
			var fday = moment(new Date(d)).format('ddd');
			var formattedDate = moment(new Date(d)).format('YYYY-MM-DD');
			var event = null;
			var month = moment(new Date(d)).format('MMMM YYYY');

			if (state.selectedDaysOfWeek.includes(fday) && moment(formattedDate).isBetween(state.startDate, state.endDate)) {
				event = state.eventName
			}
			
			a.push({
				date: fdate,
				day: fday,
				event:event,
				month: month
			});
		}

		commit('setDays',a);
	},

	setEvent({commit, dispatch}, event) {
		var daysOfWeek = event.daysOfWeek.split(',');
		commit('setEventName', event.eventName);
		commit('setStartDate', event.fromDate);
		commit('setEndDate', event.toDate);
		commit('setDaysOfWeek', daysOfWeek);
		dispatch('DaysArray');

	}
	
};

const mutations = {
	setDays: (state, days) => (state.days = days),
	setEventName: (state, eventName) => (state.eventName = eventName),
	setStartDate: (state, startDate) => (state.startDate = startDate),
	setEndDate: (state, endDate) => (state.endDate = endDate),
	setDaysOfWeek: (state, daysOfWeek) => (state.selectedDaysOfWeek = daysOfWeek)
};

export default {
	state,
	getters,
	actions,
	mutations
}