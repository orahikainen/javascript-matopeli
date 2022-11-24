<script>
  import Fruit from "./Fruit.svelte";
  import Snake from "./Snake.svelte";
</script>

<style>
  #game{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color:white;
    border:0.5vmin solid #333;
    height: 75vh;
    aspect-ratio: 1;
    display:grid;
    grid-template-columns: repeat(16,4.7vmin);
    grid-template-rows: repeat(16,4.7vmin);
  }
</style>

<div id = "game">
  <Fruit></Fruit>
  <Snake></Snake>
</div>