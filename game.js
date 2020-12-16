var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var bullets;
var control;
var weapon;
var fire;
var bulletTime = 0;

function preload ()
{
    this.load.image('lgrock1', './images/sprite_3.png');
    this.load.image('lgrock2', './images/sprite_4.png');
    this.load.image('smrock1', './images/sprite_5.png');
    this.load.image('smrock2', './images/sprite_6.png');

    this.load.image('ship', '/sprite_0.png')
    this.load.image('bullet', '/New Piskel-8.png.png')
}

function create ()
{
    player = this.physics.add.sprite(200,300,'ship')
    .setDamping(true)
    .setDrag(0.99)
    .setMaxVelocity(200)
    .setScale(0.75)

    bullets = this.physics.add.group();
    bullets.enableBody = true;
    bullets.createMultiple(30, 'bullet', true);
    console.log(bullets);
    //bullets.setAll('checkWorldBounds', true);
    //bullets.setAll('outOfBoundsKill', true);
    //firecooldown = this.time.add( new Phaser.timer)

    //weapon = this.add.weapon(30, 'bullet')

    control = this.input.keyboard.createCursorKeys()
    fire = this.input.keyboard.addKey(this.input.keyboard.SPACEBAR)

}

function update (time) 
{
    //console.log(time);
    if (control.up.isDown)
    {
        this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
    }
    else
    {
        player.setAcceleration(0);
    }

    if (control.left.isDown)
    {
        player.setAngularVelocity(-300);
    }
    else if (control.right.isDown)
    {
        player.setAngularVelocity(300);
    }
    else
    {
        player.setAngularVelocity(0);
    }
    if(fire.isDown || control.down.isDown){
        
        if (time > bulletTime)
        {
            var bullet = bullets.getFirstDead();
            console.log(bullets);

            if (bullet)
            {
                
                bullet.reset(player.x + 6, player.y - 12);
                bullet.body.velocity.y = -600;
                bulletTime = time + 100;
            }
        }
    }

    this.physics.world.wrap(player, 32);
    this.physics.world.wrap(bullets, 32);

}

function fireBullet(){
    

}