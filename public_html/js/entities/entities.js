// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function(){
                    return (new me.rect(0, 0, 128, 128)).toPolygon();
                }
        }]);
    
    this.renderable.addAnimation("idle", [3]);
    this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
    
    this.renderable.setCurrentAnimation("idle");
        
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
},
    update: function(delta){
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
           
        }else{
            this.body.vel.x = 0;
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.body.vel.x !== 0) {
            if(!this.renderable.isCurrentAnimation("smallWalk"))
             this.reenderable.setCurrentAnimation("smallWalk");
         this.renderable.setAnimationFrame();
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
        
        
        this.body.update(delta);
        this._super(me.entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        
    }
    
});

game.LevelTrigger = me.Entity.extend ({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    onCollisison: function () {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
        
});