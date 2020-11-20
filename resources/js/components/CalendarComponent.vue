<template>
	<div>
		<div class="card mt-5 ml-5 mr-5 shadow">
			<div class="card-header">
				<h4>Events calendar</h4>
			</div>
			<div class="card-body">
				<div class="container-fluid">
					<div class="row">

						<div class="col-4">
							<eventView></eventView>
						</div>

						<div class="col-8">
							<monthView></monthView>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import eventView from "./EventComponent";
import monthView from "./MonthViewComponent";

export default {


	components: {
		eventView,
		monthView
	},

	mounted() {
		console.log('Component mounted.')
	}
}
</script>