class Player {

    constructor(name,element,control,ap = {},vx){
        this.name = name;
        this.control = control;
        this.element = element;
        this.label = this.getLabel();
        

        this.vy = 0;
        this.vx = 20;
        this.m = 5;
        this.score= 0;
        this.vidas= 3;
        this.numBomb = 1;
        this.exist = false;



        if("label" in ap){
            if(ap.label){
                this.showLabel();
            }
        }
    }
    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set element(mesh){
        if(mesh instanceof THREE.Mesh){
            this._element = mesh;
        }else{
            let geometry = new THREE.SphereGeometry(50,10,10)
            
            let material = new THREE.MeshPhongMaterial( {color: Utilities.randomHexColor(), wireframe:false} );
            this._element = new THREE.Mesh( geometry, material );
            var helper = new THREE.BoundingBoxHelper(this._element, 0xff0000);
            //console.log(this._name);
            helper.update();
            this._element.add(helper);
            console.log(this._element.position);
            switch (!(this._element.position.set(1475,250.1,1475))) {
                
                case 'P1':
                console.log(this._element._name);
                this._element.position.y = 250.1;
                this._element.position.x = -1475;
                this._element.position.z = -1475;
                    break;
               
                default:
                    break;
            }
            this._element.castShadow = true;
            this._element.receiveShadow = true;
        }
        this.control.element = this._element;
    }

    get element(){
        return this._element;
    }

    updateControls(){
        this.control.update(this.vx,this.vy,this.m,60);
    }

    getLabel(){
        return Utilities.label(
            this.element.position,
            Utilities.textTure(this.name, 128, "Bold", "10px", "Arial", "0,0,0,1", 64, 50)
        )
    }

    showLabel(){
        this.element.add(this.label);
    }

    play(scene){
        this.collidableBox = new CollidableBox(this._element,25.1);
        scene.add(this.element);
    }
}