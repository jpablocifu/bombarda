class Explotando{
constructor(mesh, boundingRadius) {
    this.mesh = mesh;
    this.collidableRadius = boundingRadius;
}

explocion(normal, callback) {
    let destruibleRay = new THREE.Raycaster();
    destruibleRay.ray.direction.set(normal.x, normal.y, normal.z);

    let origin = this.mesh.position.clone();
    destruibleRay.ray.origin.copy(origin);

    let intersections = destruibleRay.intersectObjects(bombList);

    if (intersections.length > 0) {
        let distance = intersections[0].distance;
        if (distance <= this.collidableRadius - 0.5) {
            callback(intersections[0]);
        }
    }

}

explotandoleft() {
    let callback = (explotable) => {
        scene.remove(explotable.object);
        var icolli = collidableList.indexOf(explotable.object);
        var iexplo = bombList.indexOf(explotable.object);
        if (icolli<0) { 
            for (let i = 0; i < players.length; i++) {
                if (players[i].element == explotable.object) {
                    players.splice(i, 1);
                }
            }
            bombList.splice(iexplo, 1);
        }else{
            collidableList.splice(icolli, 1);
            bombList.splice(iexplo, 1);
        }
    }
    this.explocion({ x: -1, y: 0, z: 0 }, callback);
}

explotandoright() {
    let callback = (explotable) => {
        scene.remove(explotable.object);
        var icolli = collidableList.indexOf(explotable.object);
        var iexplo = bombList.indexOf(explotable.object);
        if (icolli<0) { 
            for (let i = 0; i < players.length; i++) {
                if (players[i].element == explotable.object) {
                    players.splice(i, 1);
                }
            }
            bombList.splice(iexplo, 1);
        }else{
            collidableList.splice(icolli, 1);
            bombList.splice(iexplo, 1);
        }
    }
    this.destroy({ x: 1, y: 0, z: 0 }, callback);
}

explotandoDown() {
    let callback = (explotable) => {
        scene.remove(explotable.object);
        var icolli = collidableList.indexOf(explotable.object);
        var iexplo = bombList.indexOf(explotable.object);
        if (icolli<0) { 
            for (let i = 0; i < players.length; i++) {
                if (players[i].element == explotable.object) {
                    players.splice(i, 1);
                }
            }
            bombList.splice(iexplo, 1);
        }else{
            collidableList.splice(icolli, 1);
            bombList.splice(iexplo, 1);
        }
    }
    this.explocion({ x: 0, y: 0, z: -1 }, callback);
}

explotandoFron() {
    let callback = (explotable) => {
        scene.remove(explotable.object);
        var icolli = collidableList.indexOf(explotable.object);
        var iexplo = bombList.indexOf(explotable.object);
        if (icolli<0) { 
            for (let i = 0; i < players.length; i++) {
                if (players[i].element == explotable.object) {
                    players.splice(i, 1);
                }
            }
            bombList.splice(iexplo, 1);
        }else{
            collidableList.splice(icolli, 1);
            bombList.splice(iexplo, 1);
        }
    }
    this.explocion({ x: 0, y: 0, z: 1 }, callback);
}

update() {
    this.explotandoleft();
    this.explotandorigth();
    this.explotandoFront();
    this.explotandoDown();
}
}