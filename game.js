
const scene = new THREE.Scene();

const playerBall = Ball();
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
const cameraWidth = 960;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    50, // near plane
    700 // far plane
);

camera.position.set(0, -210, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);


function Ball()
{
    var geometry = new THREE.SphereGeometry(100, 32, 32);
    var material = new THREE.MeshNormalMaterial();
    var sphere = new THREE.Mesh( geometry, material );

    return sphere;
}