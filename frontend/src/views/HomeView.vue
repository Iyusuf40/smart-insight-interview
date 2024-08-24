<template>
  <div class="container">
    <h1 class="count-display">Autobots Created: {{ count }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      socket: null
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:3000')
    this.socket.onmessage = (event) => {
      this.count = event.data
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2f2f2f;
  color: #ffffff;
}

.count-display {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>