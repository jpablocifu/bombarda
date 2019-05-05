var fg = 0.4;

class CollidableBox {
    constructor(mesh, boundingRadius) {
        this.mesh = mesh;
        this.collidableRadius = boundingRadius;
        this.isFalling = { state: false, acc: 0 };
    }

    collide(normal, callback, verticalColliding = false) {
        let collidableRay = new THREE.Raycaster();
        collidableRay.ray.direction.set(normal.x, normal.y, normal.z);

        let origin = this.mesh.position.clone();
        collidableRay.ray.origin.copy(origin);

        let intersections = collidableRay.intersectObjects(collidableList);

        if(verticalColliding){
            if (intersections.length > 0) {
                callback(intersections);
            }else{
                this.isFalling.state = true;
                this.isFalling.acc += 1;
                this.mesh.position.y -= 1 * this.isFalling.acc;
            }
        }else{
            if (intersections.length > 0) {
                let distance = intersections[0].distance;
                if (distance <= this.collidableRadius - 5) {
                    callback();
                }
            }
        }
        
    }
    collideFront(controls) {
        let callback = () => {
            this.mesh.position.x += controls.vx;
        }
        this.collide({ x: -1, y: 0, z: 0 }, callback);
    }

    collideBack(controls) {
        let callback = () => {
            this.mesh.position.x -= controls.vx;
        }
        this.collide({ x: 1, y: 0, z: 0 }, callback);
    }

    collideLeft(controls) {
        let callback = () => {
            this.mesh.position.z -= controls.vx;
        }
        this.collide({ x: 0, y: 0, z: 1 }, callback);
    }

    collideRight(controls) {
        let callback = () => {
            this.mesh.position.z += controls.vx;
        }
        this.collide({ x: 0, y: 0, z: -1 }, callback);
    }

    collideBottom(control) {

        let callback = (intersections) => {
            let distance = intersections[0].distance;
            if (distance > this.collidableRadius) { //inAir
                this.isFalling.state = true;
                this.isFalling.acc += 0.3;
                this.mesh.position.y -= 1 * this.isFalling.acc;
                control.isInAir = true;
                
            }
            if (distance <= this.collidableRadius + 1 ) { //over the floor
                control.isJumping = false;
                control.isInAir = false;
                this.isFalling.state = false;
                this.isFalling.acc = 0;
                if(distance <= this.collidableRadius){
                    this.mesh.position.y +=1;
                }
                switch (intersections[0].object.name) {
                    case "plataforma":

                            plataforma.isInUse = true;
                            plataforma.position.y += 1;
                            if(plataforma.position.y >= 500){
                                plataforma.position.y = 500;
                            }
                        
                        break;
                    case "plataforma2":
                        plataforma2.isInUse = true;
                        plataforma2.position.y += 1;
                        if(plataforma2.position.y >= 500){
                            plataforma2.position.y = 500;
                            
                        }

                        break;

                    case "plataforma3":
                    plataforma3.isInUse = true;
                    plataforma3.position.y+= 1;
                    if(plataforma3.position.y >= 500){
                        plataforma3.position.y = 500;
                        
                    }

                break;

                    case "plataforma4":
                    plataforma4.isInUse = true;
                    plataforma4.position.y+= 1;
                    if(plataforma4.position.y >= 500){
                        plataforma4.position.y = 500;
                        
                    }

                break;

                }
            }else{
                plataforma3.isInUse=false;
                plataforma2.isInUse = false;
                plataforma.isInUse = false;
                plataforma4.isInUse=false;

            }

        }
        this.collide({ x: 0, y: -1, z: 0 }, callback, true);
    }

    update(controls) {
        this.collideFront(controls);
        this.collideBack(controls);
        this.collideLeft(controls);
        this.collideRight(controls);
        this.collideBottom(controls);
    }
}