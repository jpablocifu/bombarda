var bombas=0;

class Control {
    //myControl = new Control("w","d","s","a","f");
    constructor(up, right, down, left, jump,bomb) {
        this.initControls();
        this.up = up || "w";
        this.right = right || "d";
        this.down = down || "s";
        this.left = left || "a";
        this.jump = jump || " ";
        this.bomb = bomb || "f";
        
        this.isInAir, this.isFalling, this.isJumping = false;

        this.element = null;

        this.initListeners();
    }

    set up(key) {
        this._up.key = key;
    }

    get up() {
        return this._up.key;
    }

    set right(key) {
        this._right.key = key;
    }

    get right() {
        return this._right.key;
    }

    set down(key) {
        this._down.key = key;
    }

    get down() {
        return this._down.key;
    }

    set left(key) {
        this._left.key = key;
    }

    get left() {
        return this._left.key;
    }

    set jump(key) {
        this._jump.key = key;
    }

    get jump() {
        return this._jump.key;
    }

    set bomb(key){
        this._bomb.key = key;
    }

    get bomb(){
        return this._bomb.key;
    }

    initControls() {
        this._up = { key: "", isPressed: false };
        this._right = { key: "", isPressed: false };
        this._down = { key: "", isPressed: false };
        this._left = { key: "", isPressed: false };
        this._jump = { key: "", isPressed: false };
        this._bomb = { key: "", isPressed: false };
    }

    initListeners() {


    }
    update(vx,vy,m,jf) {
        this.vx = vx;
        this.vy = vy;
        this.m = m;
        this.jumpForce = jf;

        if (this._up.isPressed) {
            this.element.position.x -= this.vx;
        }
        if (this._right.isPressed) {
            this.element.position.z -= this.vx;
        }
        if (this._down.isPressed) {
            this.element.position.x += this.vx;
        }
        if (this._left.isPressed) {
            this.element.position.z += this.vx;
        }
        if (this._jump.isPressed) {
            
            if(!this.isJumping && !this.isInAir){
                this.isJumping = true;
                this.element.position.y += this.jumpForce;
                var sound3  = new Sound(["./assets/songs/Jump.wav"]);
                sound3.volume=0.5;
                sound3.play();
            } 
        }
        if(this._bomb.isPressed){
            var sound2 = new Sound(["./assets/songs/ssg.mp3"]);
            if(bombas == 0){
            bombas = 1;
            var bomb= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/bmb.jpg")}),
                
            );
            bomb.position.set(this.element.position.x,this.element.position.y,this.element.position.z);
            collidableList.push(bomb);
            
            scene.add(bomb);
            bombas -=1;
           }

           setTimeout(function(){
            var explotando1= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando1);

            var explotando2= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando2);

            var explotando3= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando3);
            var explotando4= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando4);
            var explotando5= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando5);
            var explotando6= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando6);
            var explotando7= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando7);
            var explotando8= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando8);
            var explotando9= new THREE.Mesh(
                new THREE.SphereGeometry(50,10,10),
                new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/Fire.jpg")}),
                
            );
            collidableList.push(explotando9);
            
            var sound6 = new Sound(["./assets/songs/bmb.mp3"]);
            sound6.play();
            explotando1.position.set(bomb.position.x+50,bomb.position.y,bomb.position.z);
            scene.add(explotando1);
            explotando2.position.set(bomb.position.x+100,bomb.position.y,bomb.position.z);
            scene.add(explotando2);
            explotando3.position.set(bomb.position.x-50,bomb.position.y,bomb.position.z);
            scene.add(explotando3);
            explotando4.position.set(bomb.position.x-100,bomb.position.y,bomb.position.z);
            scene.add(explotando4);
            explotando5.position.set(bomb.position.x,bomb.position.y,bomb.position.z+50);
            scene.add(explotando5);
            explotando6.position.set(bomb.position.x,bomb.position.y,bomb.position.z+100);
            scene.add(explotando6);
            explotando7.position.set(bomb.position.x,bomb.position.y,bomb.position.z-50);
            scene.add(explotando7);
            explotando8.position.set(bomb.position.x,bomb.position.y,bomb.position.z-100);
            scene.add(explotando8);
            explotando9.position.set(bomb.position.x,bomb.position.y,bomb.position.z);
            scene.add(explotando9);


            setTimeout(function(){
                setTimeout(function(){
                    scene.remove(explotando1);
                    collidableList.pop(explotando1);
                },200);

                scene.remove(explotando2);
                collidableList.pop(explotando2);

                setTimeout(function(){  
                    scene.remove(explotando3);
                    collidableList.pop(explotando3);
                },200);

                scene.remove(explotando4);
                collidableList.pop(explotando4);

                setTimeout(function(){
                    scene.remove(explotando5);
                    collidableList.pop(explotando5);
                },200);

                scene.remove(explotando6);
                collidableList.pop(explotando6);

                setTimeout(function(){
                scene.remove(explotando7);
                collidableList.pop(explotando6);
                },200);

                scene.remove(explotando8);
                collidableList.pop(explotando8);

                setTimeout(function(){
                scene.remove(explotando9);
                collidableList.pop(explotando9);
                },100);   
                 
            },1000)
           },4000);
           setTimeout(function() {
               scene.remove(bomb);
               collidableList.pop(bomb);
           },4000);
             
            
            sound2.play();
            
        }
        
    }

    pressUp() {
        this._up.isPressed = true;
    }
    pressRight() {
        this._right.isPressed = true;
    }
    pressDown() {
        this._down.isPressed = true;
    }
    pressLeft() {
        this._left.isPressed = true;
    }
    pressJump() {
        this._jump.isPressed = true;
    }
    pressBomb(){
        this._bomb.isPressed = true;
    }

    releaseUp() {
        this._up.isPressed = false;
    }
    releaseRight() {
        this._right.isPressed = false;
    }
    releaseDown() {
        this._down.isPressed = false;
    }
    releaseLeft() {
        this._left.isPressed = false;
    }
    releaseJump() {
        this._jump.isPressed = false;
    }
    releaseBomb(){
        this._bomb.isPressed = false;
    }

}



document.onkeydown = (e) => {
    sound1.play();
    for (let i = 0; i < Object.keys(players).length; i++) {
        let key = Object.keys(players)[i];
        if (players[key] == null) { return false; }
        let elControl = players[key]["control"];
        switch (e.key) {
            case elControl.up:
                elControl.pressUp();
                break;
            case elControl.right:
                elControl.pressRight();
                break;
            case elControl.down:
                elControl.pressDown();
                break;
            case elControl.left:
                elControl.pressLeft();
                break;
            case elControl.jump:
                elControl.pressJump();
                break;
            case elControl.bomb:
                elControl.pressBomb();
                break;
        }

    }
}

document.onkeyup = (e) => {
    for (let i = 0; i < Object.keys(players).length; i++) {

        let key = Object.keys(players)[i];
        if (players[key] == null) { return false; }
        let elControl = players[key]["control"];

        switch (e.key) {
            case elControl.up:
                elControl.releaseUp();
                break;
            case elControl.right:
                elControl.releaseRight();
                break;
            case elControl.down:
                elControl.releaseDown();
                break;
            case elControl.left:
                elControl.releaseLeft();
                break;
            case elControl.jump:
                elControl.releaseJump();
                break;
            case elControl.bomb:
                elControl.releaseBomb();
                break;
        }
    }
}