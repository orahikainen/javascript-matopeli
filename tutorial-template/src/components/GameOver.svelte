<script>
    import { Reset } from "./Snake.svelte";
</script>

<style>
    #gameover-wrapper{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    #gameover-text{
        font-size: 7vmin;
        font-weight: 100;
    }
    #tryagain-button{
        width: 30vmin;
        height: 10vmin;
        font-size: 3.5vmin;
        font-weight: 100;
    }
</style>

<div id="gameover-wrapper">
    <div id="gameover-text">Game Over!</div>
    <button id="tryagain-button" on:click={Reset}>Try again?</button>
</div>