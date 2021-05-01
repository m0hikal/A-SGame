
var matrix = new THREE.Matrix4();
var up = new THREE.Vector3( 0, 1, 0 );
var axis = new THREE.Vector3( );
var pt, radians, axis, tangent;
const scene = new THREE.Scene();
start_pos = [-414.6802564740712, -184.58692561687027, 246.11391432223832];
const playerBall = Ball();
playerBall.position.set(-414.6802564740712, -184.58692561687027, 246.11391432223832)
scene.add(playerBall);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

let aspectRatio = 3 / 4;
if (typeof window !== "undefined") {
    aspectRatio = window.innerWidth / window.innerHeight;
}

camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 2000);
camera.position.set(0,1100,0);
camera.lookAt(0,0,0)

//Create a  wavey loop
const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3(590.9837749350982, -158.59341787077054, 57.805323267322194),
    new THREE.Vector3(-23.93076376415431, -199.24790888659507, -7.920251611925668),
    new THREE.Vector3(377.084420746779, -208.93700943136975, -544.6629025681923),
    new THREE.Vector3(-348.03356398347347, -190.88506529297342, -812.5488829723234),
    new THREE.Vector3(-379.3197851352969, -193.7011293942732, -305.81324887901656),
    new THREE.Vector3(-414.6802564740712, -184.58692561687027, 246.11391432223832)] );



const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

const curveObject = new THREE.Line( geometry, material );
scene.add(curveObject);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
requestAnimationFrame(gameLoop);

document.body.appendChild(renderer.domElement);


function Ball()
{
    var geometry = new THREE.SphereGeometry(32, 32, 32);
    var material = new THREE.MeshNormalMaterial();
    var sphere = new THREE.Mesh( geometry, material );

    return sphere;
}

function gameLoop()
{
    requestAnimationFrame(gameLoop);
    playerBall.rotation.x += 0.03;
    playerBall.rotation.y += 0.02;
    playerBall.rotation.z += 0.01;
    render();
}

var t = 0;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    console.log("hieeer");
    var keyCode = event.which;
    console.log(keyCode);

    //
    // // up
    if (keyCode == 38) {
        t = (t >= 1) ? 0 : t += 0.005;
    } else if (keyCode == 40) {
        t = (t < 0) ? 0 : t -= 0.003;
    }
}

function render() {

    pt = curve.getPoint(t);
    playerBall.position.set( pt.x, pt.y, pt.z );

    tangent = curve.getTangent( t ).normalize();

    axis.crossVectors( up, tangent ).normalize();

    radians = Math.acos( up.dot( tangent ) );

    playerBall.quaternion.setFromAxisAngle( axis, radians );

    t = (t >= 1) ? 0 : t += 0.002;

    renderer.render(scene, camera);
}