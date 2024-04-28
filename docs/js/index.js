
let scene, camera, renderer, mesh 
var lon = 90, // 把鼠标在屏幕上的横偏移量 作为 作为旋转角度的基准
    lat = 0, // 把鼠标在屏幕上的纵偏移量 作为 作为旋转角度的基准
    phi = 0,// 相机的横屏面 到 y轴的弧度
    theta = 0, // x相机的竖切面 到 x州的偏移弧度
    target = new THREE.Vector3();// 相机 看向的 那个方向

let startX, startY, startLon, startLat


function init(){
    scene = new THREE.Scene() // 场景
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000) // 相机
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.setSize(256, 256)

    let app = document.getElementById('app')
    app.appendChild(renderer.domElement)

    createMash()

    app.addEventListener('touchstart', start, false)
    app.addEventListener('touchmove', move, false)
}

function createMash(){
    let url = './imgs/gkd/'

    if(!mesh){
        var a = [
           
            
            loadTexture(url +'1.jpg'),
            loadTexture(url +'10.jpg'),
            
            loadTexture(url +'11.jpg'),
            loadTexture(url +'12.jpg'),
            loadTexture(url +'13.jpg'),
            loadTexture(url +'14.jpg'),
            loadTexture(url +'15.jpg'),
            loadTexture(url +'16.jpg'),
            loadTexture(url +'17.jpg'),
            loadTexture(url +'18.jpg'),
            loadTexture(url +'19.jpg'),
            loadTexture(url +'2.jpg'),
            loadTexture(url +'20.jpg'),
            loadTexture(url +'21.jpg'),
            loadTexture(url +'22.jpg'),
            
            loadTexture(url +'3.jpg'),
            
            loadTexture(url +'4.jpg'),
            
            loadTexture(url +'5.jpg'),
           
            loadTexture(url +'6.jpg'),
            
            loadTexture(url +'7.jpg'),
           
            loadTexture(url +'8.jpg'),
            
            loadTexture(url +'9.jpg')
           



        ]
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(300,300,300), 
            new THREE.MultiMaterial(a) 
        )
    }
    mesh.scale.x = -1; // 让盒子里外翻一下
    scene.add(mesh)
}

function loadTexture(url){
    let textureLoader = new THREE.TextureLoader()
    let texture = textureLoader.load(url)
    texture.rotation = Math.PI
    texture.needsUpdate = true

    var basicMaterial = new THREE.MeshBasicMaterial({
        map:texture
    })

    return basicMaterial // 这个就是有图片所造就的一个面的材料
}

init()


function update(){
    lon += 0.1;
    lat = Math.max(-85,Math.min(85,lat));
    phi = THREE.Math.degToRad(90-lat);
    theta = THREE.Math.degToRad(lon);
    target.x = 500 * Math.sin(phi) * Math.cos(theta)
    target.y = 500 * Math.cos(phi);
    target.z = 500 * Math.sin(phi) * Math.sin(theta)
    camera.lookAt(target);
    renderer.render(scene,camera)
}
function animate(){
    requestAnimationFrame(animate)
    update()
}


function start(e){
    e.preventDefault()

    startX = e.touches[0].pageX
    startY = e.touches[0].pageY

    startLon = lon
    startLat = lat
}
function move(e){
    e.preventDefault()

    lon = (startX-e.touches[0].pageX)*0.1 + startLon
    lat = (e.touches[0].pageY-startY)*0.1 + startLat

    update()
}


animate();