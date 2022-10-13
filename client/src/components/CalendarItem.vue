<template>
   <div class="calendar">
    <FullCalendar :options="calendarOptions"/>
   </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        events: [
          { title: 'event 1', date: '2020-12-01' },
          { title: 'event 2', date: '2020-12-02' }
        ],
        dateClick: this.onDateClick
      }
    }
  },
  methods: {
    onDateClick(arg) {
      console.log(arg.dateStr)
    }
  }
}
</script>

<style scoped>
.calendar {
  padding: 1px;
  padding-right: 0;
  padding-top: 10px;
  width: 100%;
  height: 100%;
}
@media (max-width: 1000px){
  .calendar {
  padding: 1px;
  padding-right: 0;
  padding-top: 10px;
  width: 100%;
  height: 100%;
  font-size: 10px;
}
}
</style>
