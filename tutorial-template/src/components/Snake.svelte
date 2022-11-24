<script>

    import Fruit, { /**/ } from "./Fruit.svelte";
    import { /**/ } from "./GameOver.svelte";

    //snake array to store locations of the pieces

    let snake = [];

    /*
    function that runs every 250ms:
        check what the next tile will be:
            if the tile is:
                "wall":
                    end the game
                "snake":
                    end the game
                "fruit":
                    make the snake grow and move the fruit to a different location
                "empty":    
                    make the snake move forward
    */

   function Update(){

   }
   window.setInterval();

    /*
    function that checks what the tile the snake is going to land on is:
        if the snake isnt moving:
            return
        calculate the tile the snake is going to land on and put it in a variable
        if the tile is "wall":
            return "wall" 
        if the snake hits itself:
            return "snake" 
        if the tile is "fruit":
            return "fruit"
        if the tile is none of the above:
            return "empty"
    */

    function GetNextTile(){

    }

    if(Fruit.location.x == nextTile.location.x && Fruit.location.y == nextTile.location.y)

    /*
    function that moves the snake forward:
        get the head of the snake
        calculate the tile the snake should land on
        remove the last element from the snake array
        make a new element with the location of the next tile and move it to the top
        update the array
    */

    function MoveSnake(){

    }

    //function that resets all of the variables to default

    function Reset(){

    }

    //map that holds the movement keys and their corresponding x and y values 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

    const directionMap = new Map([]);

    /*
    event listener that handles the "onkeydown" event:
        get the x and y values from the map and put them in a variable
    */

    window.onkeydown();

</script>

<script context="module">

</script>

<style>
    /*
    set the background color of the snake to something
    use css variables and grid/column start/end to make it possible to change the elements position

    https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
    https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
    https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
    https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
    https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
    */

    #snake{

    }
</style>


<!--https://svelte.dev/tutorial/each-blocks-->
{#each snake as s}
    <div id="snake" style="--x:{s.x}; --y:{s.y}"></div>
{/each}

<!--https://svelte.dev/tutorial/if-blocks-->
{#if gameOver}
    <GameOver></GameOver>
{/if}