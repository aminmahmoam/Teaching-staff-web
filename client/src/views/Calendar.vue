<template>
    <div>
        <CalendarItem />
    </div>
</template>
<script>
import CalendarItem from '../components/CalendarItem.vue'

export default {
  name: 'calendar',
  props: ['calendar'],
  components: { CalendarItem }
}
</script>
