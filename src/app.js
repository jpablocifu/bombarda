/**
 * GLOBAL VARS
 */
lastTime = Date.now();
cameras = {
    default: null,
    current: null
};
canvas = {
    element: null,
    container: null
}
labels = {}
cameraControl = null;
scene = null;
renderer = null

players = {
    p1: null,
    p2: null,
    p3: null,
    p4: null
}
collidableList = [];
bombList = [];

/**
 * Function to start program running a
 * WebGL Application trouhg ThreeJS
 */
let webGLStart = () => {
    initScene();
    window.onresize = onWindowResize;
    lastTime = Date.now();
    animateScene();
     estaEs();
    
};



/**
 * Here we can setup all our scene noobsters
 */
function initScene() {
    //Selecting DOM Elements, the canvas and the parent element.
    canvas.container = document.querySelector("#app");
    canvas.element = canvas.container.querySelector("#appCanvas");

    /**
     * SETTING UP CORE THREEJS APP ELEMENTS (Scene, Cameras, Renderer)
     * */
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ canvas: canvas.element });
    renderer.setSize(canvas.container.clientWidth, canvas.container.clientHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    canvas.container.appendChild(renderer.domElement);

    //positioning cameras
    cameras.default = new THREE.PerspectiveCamera(45, canvas.container.clientWidth / canvas.container.clientHeight, 0.1, 10000);
    cameras.default.position.set(3429,5046,-47.883);
    cameras.default.lookAt(new THREE.Vector3(0, 0, 0));

    //Setting up current default camera as current camera
    cameras.current = cameras.default;
    
    //Camera control Plugin
    cameraControl = new THREE.OrbitControls(cameras.current, renderer.domElement);

    lAmbiente = new THREE.AmbientLight(0xb5b5b5);
    scene.add(lAmbiente);

    //Luz Spotlight
	var spotLight = new THREE.SpotLight(0xff69b4,3.0, 1500.0, Math.PI/4,0.5,2.2);
	var spotLight = new THREE.SpotLight(0xffffff,5.0, 9000, 180,0.5,2.2);
	spotLight.position.set(-1000, 4000, 0 );
    spotLight.castShadow = true;
    spotLight.shadowDarkness = 1;
	scene.add(spotLight);
    scene.add(new THREE.PointLightHelper(spotLight, 1));

    //FPS monitor
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

    //Init player with controls
    players.p1 = new Player("P1",null,new Control(),{label: true});
    spotLight.target = players.p1.element;

    players.p2 = new Player("P2",null,new Control('y','j','h','g','b','k'),{label: false});
    spotLight.target = players.p2.element;

    players.p3 = new Player("P3",null,new Control('8','6','5','4','0','+'),{label: false});
    spotLight.target = players.p3.element; 

    initObjects();
}

/**
 * Function to add all objects and stuff to scene
 */
function initObjects(){
    //Cancion
    sound1 = new Sound(["./assets/songs/DKG.mp3"]);
    //Texture
    bgTexture= new THREE.TextureLoader().load("./assets/textures/15.jpg",
    function(texture){
        var img = texture.image;
        bgWidth=img.width;
        bgHeight=img.height;
    });
    scene.background=bgTexture;
    scene.add(bgTexture);
	//Suelo
    var cuboBase = new THREE.Mesh(
		new THREE.BoxGeometry(3000,500,3000,60,60,60),
        new THREE.MeshPhongMaterial( {color:0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")}));
        
    cuboBase.wrapS=cuboBase.wrapT= THREE.Repeatwrapping; 
    cuboBase.position.set(0,-1,0);
    cuboBase.name="cuboBase";
    scene.add(cuboBase);

    var segundoPiso = new THREE.Mesh(
        new THREE.BoxGeometry(1000,250,1000),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    segundoPiso.name="segundoPiso";
    segundoPiso.position.set(0,375,0);
    scene.add(segundoPiso);

    //Cubo para las luces
    var cuboAbajo = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboAbajo.castShadow=true;
    cuboAbajo.name="cuboAbajo";
    cuboAbajo.position.set(1125,275,0);
    scene.add(cuboAbajo);

    var Bola= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola.name="Light"
    Bola.position.set(1125,350,0);
    scene.add(Bola);

    var cuboAbajo2 = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboAbajo2.name="cuboAbajo2";
    cuboAbajo2.receiveShadow = true;
    cuboAbajo2.position.set(1125,275,375);
    scene.add(cuboAbajo2);

    var Bola2= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola2.name="Light2"
    Bola2.position.set(1125,350,375);
    scene.add(Bola2);

    var cuboAbajo3 = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboAbajo3.name="cuboAbajo3";
    cuboAbajo3.receiveShadow = true;
    cuboAbajo3.position.set(1125,275,-375);
    scene.add(cuboAbajo3);

    
    var Bola3= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola3.name="Light2"
    Bola3.position.set(1125,350,-375);
    scene.add(Bola3);
    //--------------------------------------

    var cuboArriba = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboArriba.name="cuboArriba";
    cuboArriba.receiveShadow = true;
    cuboArriba.position.set(-1125,275,0);
    scene.add(cuboArriba);

    var Bola4= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola4.name="Light2"
    Bola4.position.set(-1125,350,0);
    scene.add(Bola4);

    var cuboArriba2 = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboArriba2.name="cuboArriba2";
    cuboArriba2.receiveShadow = true;
    cuboArriba2.position.set(-1125,275,375);
    scene.add(cuboArriba2);

    var Bola5= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola5.name="Light2"
    Bola5.position.set(-1125,350,375);
    scene.add(Bola5);

    var cuboArriba3 = new THREE.Mesh(
        new THREE.BoxGeometry(150,50,150),
        new THREE.MeshBasicMaterial({color: 0xEEBF62,map: new THREE.TextureLoader().load("assets/textures/zuniga.jpg")})
    );
    cuboArriba3.name="cuboArriba3";
    cuboArriba3.receiveShadow = true;
    cuboArriba3.position.set(-1125,275,-375);
    scene.add(cuboArriba3);

    var Bola6= new THREE.Mesh(
        new THREE.SphereGeometry(20,20,20),
        new THREE.MeshBasicMaterial({color: 0xffffff,map:new THREE.TextureLoader().load("assets/textures/GG.jpg")})
    );
    Bola6.name="Light2"
    Bola6.position.set(-1125,350,-375);
    scene.add(Bola6);

    //Cubos segundo piso

    var cuboSegundoPiso = new THREE.Mesh(
        new THREE.BoxGeometry(150,70,150),
        new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/aldemar.jpg")})
    );

    cuboSegundoPiso.name="cuboSegundoPiso";
    cuboSegundoPiso.position.set(375,535,375);
    scene.add(cuboSegundoPiso);

    var cuboSegundoPiso2 = new THREE.Mesh(
        new THREE.BoxGeometry(150,70,150),
        new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/aldemar.jpg")})
    );
    cuboSegundoPiso2.name="cuboSegundoPiso2";
    cuboSegundoPiso2.receiveShadow = true;
    cuboSegundoPiso2.position.set(375,535,-375);
    scene.add(cuboSegundoPiso2);

    var cuboSegundoPiso3 = new THREE.Mesh(
        new THREE.BoxGeometry(150,70,150),
        new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/aldemar.jpg")})
    );

    cuboSegundoPiso3.name="cuboSegundoPiso3";
    cuboSegundoPiso3.receiveShadow = true;
    cuboSegundoPiso3.position.set(-375,535,375);
    scene.add(cuboSegundoPiso3);

    var cuboSegundoPiso4 = new THREE.Mesh(
        new THREE.BoxGeometry(150,70,150),
        new THREE.MeshBasicMaterial({color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/aldemar.jpg")})
    );

    cuboSegundoPiso4.name="cuboSegundoPiso4";
    cuboSegundoPiso4.receiveShadow = true;
    cuboSegundoPiso4.position.set(-375,535,-375);
    scene.add(cuboSegundoPiso4);

    //Paredes
    var pared = new THREE.Mesh(
        new THREE.BoxGeometry(100.1,700,3200.1),
        new THREE.MeshBasicMaterial({color: 0xC0392B,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")}));

    pared.name="pared";    
    pared.position.set(1550,10,0);
    scene.add(pared);

    var pared2 = new THREE.Mesh(
        new THREE.BoxGeometry(100.1,700,3200.1),
        new THREE.MeshBasicMaterial({color: 0xC0392B,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")}));
    pared2.name="pared2";    
    pared2.position.set(-1550,10,0);
    scene.add(pared2);

    var pared3 = new THREE.Mesh(
        new THREE.BoxGeometry(3200.1,700,100.1),
        new THREE.MeshBasicMaterial({color: 0xC0392B,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    pared3.name="pared3";
    pared3.position.set(0,10,-1550);
    scene.add(pared3);

    var pared4 = new THREE.Mesh(
        new THREE.BoxGeometry(3200.1,700,100.1),
        new THREE.MeshBasicMaterial({color: 0xC0392B,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    pared4.name="pared4";
    pared4.position.set(0,10,1550);
    scene.add(pared4);

    //cubo a explotar
    var cubosExplotable = new Array();
    //Barreras en X
    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(1350,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(1340,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(400,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(390,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    
    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(1000,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(990,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(800,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(790,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-1350,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-1340,300,i*200);
        cubosExplotable.push(explotable);
       

    }


    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-400,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-390,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-1000,300,i*-200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-990,300,i*200);
        cubosExplotable.push(explotable);
       

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-800,300,i*-200);
        cubosExplotable.push(explotable);

    }

    for (var i = 0; i < 8; i++) {
        explotable = new THREE.Mesh(
            new THREE.BoxGeometry(100,100,100),
            new THREE.MeshPhongMaterial( {color: 0x6a6a6a,map: new THREE.TextureLoader().load("assets/textures/kevind.jpg")})
        );
        explotable.position.set(-790,300,i*200);
        cubosExplotable.push(explotable);

    }


    for (let i = 0; i < cubosExplotable.length ; i++) {
        scene.add(cubosExplotable[i]);
        collidableList.push(cubosExplotable[i]);
        bombList.push(cubosExplotable[i]);
        
    } 
            
    //PLataforma para subir al segundo nivel
    plataforma = new THREE.Mesh(
        new THREE.BoxGeometry(200,25,200),
        new THREE.MeshBasicMaterial( {color: 0xAA8947,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    plataforma.position.set(550,265.5,2);
    plataforma.name="plataforma";
    plataforma.isInUse = false;
    scene.add(plataforma);

    plataforma2 = new THREE.Mesh(
        new THREE.BoxGeometry(200,25,200),
        new THREE.MeshBasicMaterial( {color: 0xAA8947,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    plataforma2.position.set(-550,265.5,2);
    plataforma2.name="plataforma2";
    plataforma2.isInUse = false;
    scene.add(plataforma2);

    plataforma3= new THREE.Mesh(
        new THREE.BoxGeometry(200,25,200),
        new THREE.MeshBasicMaterial( {color: 0xAA8947,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    plataforma3.position.set(2,265.5,600);
    plataforma3.name="plataforma3";
    plataforma3.isInUse = false;
    scene.add(plataforma3);

    plataforma4= new THREE.Mesh(
        new THREE.BoxGeometry(200,25,200),
        new THREE.MeshBasicMaterial( {color: 0xAA8947,map: new THREE.TextureLoader().load("assets/textures/rock.jpg")})
    );
    plataforma4.position.set(2,265.5,-600);
    plataforma4.name="plataforma4";
    plataforma4.isInUse = false;
    scene.add(plataforma4);

    collidableList.push(cuboBase);
    collidableList.push(segundoPiso);
    //-----------------------------
    collidableList.push(plataforma);
    collidableList.push(plataforma2);
    collidableList.push(plataforma3);
    collidableList.push(plataforma4);
    //-----------------------------
    collidableList.push(pared);
    collidableList.push(pared2);
    collidableList.push(pared3);
    collidableList.push(pared4);
    //-----------------------------
    collidableList.push(cuboAbajo);
    collidableList.push(cuboAbajo2);
    collidableList.push(cuboAbajo3);
    collidableList.push(cuboArriba);
    collidableList.push(cuboArriba2);
    collidableList.push(cuboArriba3);
    //-----------------------------
    collidableList.push(cuboSegundoPiso);
    collidableList.push(cuboSegundoPiso2);
    collidableList.push(cuboSegundoPiso3);
    collidableList.push(cuboSegundoPiso4);
    //-----------------------------
    collidableList.push(Bola);
    collidableList.push(Bola2);
    collidableList.push(Bola3);
    collidableList.push(Bola4);
    collidableList.push(Bola5);
    collidableList.push(Bola6);

    players.p1.play(scene);
    players.p2.play(scene);
    players.p3.play(scene);

     sound1.play();
}

/**
 * Function to render application over
 * and over.
 */
function animateScene() {
    requestAnimationFrame(animateScene);
    renderer.render(scene, cameras.current);
    updateScene();


}

//Cronometro
var tresmin;
function parar(){
    clearInterval(tresmin);
}
function estaEs(){
    count_Seconds=0;
    count_Minutes=0;

    seconds= document.getElementById("segundos");
    minutes=document.getElementById("minutes");
    tresmin=setInterval(
        function(){
            if(count_Seconds==60){
                count_Seconds=0;
                count_Minutes++;
                minutes.innerHTML=count_Minutes;
                
                if(count_Minutes==3){
                    count_Minutes=0;
                }
                
            }
            seconds.innerHTML=count_Seconds;
                count_Seconds++;
        }
    ,1000)

}


/**
 * Function to evaluate logic over and
 * over again.
 */
function updateScene() {
    lastTime = Date.now();

    //Updating camera view by control inputs
    cameraControl.update();

 
    //Updating FPS monitor
    stats.update();

    //Players controls
    for (const player of Object.keys(players)) {
        if( players[player] != null ){
            players[player].updateControls();
            players[player].collidableBox.update(players[player].control);

        }
    }


    for (const label of Object.keys(labels)) {
        labels[label].lookAt(cameras.current.position);
        if(label == "P1"){
            labels[label].position.copy(players.p1.element.position);
        }
        if(label == "P2"){
            labels[label].position.copy(players.p2.element.position);
        }
    }


    if(plataforma.position.y > 250 && !plataforma.isInUse){
            plataforma.position.y -= 1;
    }
    if(plataforma2.position.y > 250 && !plataforma2.isInUse){
        plataforma2.position.y -= 1;
}
    if(plataforma3.position.y > 250 && !plataforma3.isInUse){
        plataforma3.position.y -= 1;
}

    if(plataforma4.position.y > 250 && !plataforma4.isInUse){
        plataforma4.position.y -= 1;
}
}




function onWindowResize() {
    cameras.current.aspect = window.innerWidth / window.innerHeight;
    cameras.current.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
