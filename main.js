var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map_width = canvas.width = canvas.scrollWidth = 1280;
var map_height = canvas.height = canvas.scrollHeight = 640;
var LastFrame = 0;
var FPS = 0;
var players = [];
var player_sprite;

function Awake()
{
    player_sprite = new Sprite("Images/g4502.png",{
        width: 128,
        height: 128
    });
    Start();
}

function Start()
{
    var new_player = new Player(map_width/2,map_height/2);
    players.push(new_player);
    Update();
}

function Update()
{
    draw_background("white");
    for(var i = 0; i < players.length; i++)
    {
        players[i].update();
        players[i].draw();
    }
    requestAnimationFrame(Update);
}

function Player(x,y)
{
    this.x = x;
    this.y = y;
    this.sprite = player_sprite;
    this.update = function()
    {

    }
    this.draw = function()
    {
        this.sprite.draw(this.x-this.sprite.width/2,this.y-this.sprite.height/2);
    }
}

function Sprite(source,options)
{
    this.source = new Image();
    this.source.src = source;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.image_index = options.image_index || 0;
    this.image_number = options.image_number || 1;
    this.play = options.play || false;
    this.counter = 0;
    this.update = function()
    {
        this.counter += 1;
        if(this.counter > 1/(FPS/500))
        {
            this.counter = 0;
            if(this.play == true)
            {
                if(this.image_number - 1 > this.image_index)
                {
                    this.image_index += 1;
                }
                else
                {
                    this.image_index = 0;
                }
            }
            else
            {
                this.image_index = 0;
            }
        }
    }
    this.draw = function(x,y)
    {
        context.drawImage(this.source,this.image_index * this.width/this.image_number,0,this.width/this.image_number,this.height,x,y,this.width/this.image_number,this.height);
    }
}

window.addEventListener("load",Awake);