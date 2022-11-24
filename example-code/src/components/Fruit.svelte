<script>
    let x;
    let y;

    $: if ($fruitEaten == true){
        Move();
        fruitEaten.set(false);
    }

    function Move(){
        x = Math.floor(Math.random() * 16) + 1;
        y = Math.floor(Math.random() * 16) + 1;
        X = x;
        Y = y;
    }
    Move();
</script>

<script context="module">
    import { writable } from 'svelte/store';
    let fruitEaten = writable(false);

    let X;
    let Y;

    export function getFruitLocation(){
        return {x: X, y: Y};
    }

    export function eatFruit(){
        fruitEaten.set(true);
    }
</script>

<style>
    #fruit{
        grid-column-start: var(--x);
        grid-column-end: var(--x);
        grid-row-start: var(--y);
        grid-row-end: var(--y);
        background-color:red;
    }
</style>

<div id="fruit" style="--x:{x}; --y:{y};"></div>