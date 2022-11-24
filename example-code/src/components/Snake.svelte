<script>
    import { getFruitLocation, eatFruit} from "./Fruit.svelte";
    import GameOver from "./GameOver.svelte";

    //snake array to store locations of the pieces
    let snake = [
        {x: 8, y: 8},
        {x: 7, y: 8},
        {x: 6, y: 8}
    ];

    $: if ($resetGame == true){
        ResetGame();
        resetGame.set(false);
    }

    //function that runs every 250ms
    let gameOver = false;
    window.setInterval(Update,250);
    function Update(){
        //check what the next tile will be:
        switch(CalculateNextMove()){
            case "wall":
                //end the game
                gameOver = true;
                break;
            case "snake":
                //end the game
                gameOver = true;
                break;
            case "fruit":
                //make the snake grow and move the fruit to a different location
                Move(true);
                eatFruit();
                break;
            case "empty":
                //make the snake move forward
                Move(false);
                break;
        }
    }

    //function that checks what the tile the snake is going to land on is
    function CalculateNextMove(){
        //if the snake isnt moving:
        if(movement == null) return;

        //calculate the tile the snake is going to land on and put it in a variable
        var firstCell = snake[0];
        var nextTile = {x: firstCell.x + movement.x, y: firstCell.y - movement.y};

        //check if the snake is going to hit a wall
        if(nextTile.x == 17 || nextTile.x == 0) return "wall";
        if(nextTile.y == 17 || nextTile.y == 0) return "wall";

        //check if the snake is going to hit itself
        var hitSelf = false;
        snake.forEach(cell =>{
            if(cell.x == nextTile.x && cell.y == nextTile.y) hitSelf = true; 
        });
        if(hitSelf) return "snake";

        //check if the snake is going to hit a fruit
        let fruitLocation = getFruitLocation();
        if(nextTile.x == fruitLocation.x && nextTile.y == fruitLocation.y) return "fruit";

        //if the snake is not going to hit anything, return "empty"
        return "empty";
    }

    //function that moves the snake forward
    //the function has a parameter to specify whether the snake should grow or not
    function Move(grow){
        //calculate the tile the snake will land on by adding together 
        //the x values and y values of the snakes first cell and the movement direction
        var nextTile = {x: snake[0].x + movement.x, y: snake[0].y - movement.y};
        
        //if you dont want the snake to grow, pop the last cell of the snake
        if(!grow) snake.pop();

        //make a new snake cell and put it on the top of the array
        snake.unshift(nextTile);

        //updates the array
        snake = snake;         
    }

    //function that sets all of the variables to default
    function ResetGame(){
        movement = null;
        gameOver = false;
        snake = [
        {x: 8, y: 8},
        {x: 7, y: 8},
        {x: 6, y: 8}
        ];
        eatFruit();
    }

    //map that holds the movement keys and their corresponding x and y values 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const directionMap = new Map([
        ["w",{x:0,y:1}],
        ["a",{x:-1,y:0}],
        ["s",{x:0,y:-1}],
        ["d",{x:1,y:0}],
    ]);

    //event listener that handles the "onkeydown" event
    //get the x and y values from the map and put them in a variable
    let movement = null;
    window.onkeydown = (e) => {
        movement = directionMap.get(e.key);
    }
</script>

<script context="module">
    import { writable } from 'svelte/store';

    //a writable variable that can be set from another file
    let resetGame = writable(false);

    //
    export function ResetGame(){
        resetGame.set(true);
    }
</script>

<style>
    #snake{
        /*use css variables and grid/column start/end to make it possible to change the elements position

        https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
        https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
        https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
        https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
        https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end*/
        grid-column-start: var(--x);
        grid-column-end: var(--x);
        grid-row-start: var(--y);
        grid-row-end: var(--y);
        /*set the background color of the snake to something*/
        background-color:black;
    }
</style>


<!--https://svelte.dev/tutorial/each-blocks-->
{#each snake as s}
    <div id="snake" style="--x:{s.x}; --y:{s.y}"></div>
{/each}

<!--https://svelte.dev/tutorial/if-blocks-->
{#if gameOver == true}
    <GameOver></GameOver>
{/if}