/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
//22fi061 菅原優斗


class ThreeJSContainer {
    scene;
    light;
    cloud;
    particleVelocity;
    beye;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(800000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x800000));
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        const objGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ConeGeometry(0.5, 1.5, 32); // 上部の円錐部分
        const topGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.ConeGeometry(0.1, 0.5, 32); // 上部の円錐部分
        const brimGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderGeometry(1, 1, 0.1, 32); // つば部分
        // 材質
        const objMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x000000 });
        const eyeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xFFFFFF }); // 白い目の材質
        const beyeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xFF0000 }); // 白い目の材質
        // メッシュの生成
        const objCone = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(objGeometry, objMaterial);
        const topCone = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(topGeometry, objMaterial);
        const hatBrim = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(brimGeometry, objMaterial);
        // 目
        const beyeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.15, 32, 32); // 球体の目
        this.beye = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(beyeGeometry, beyeMaterial);
        this.beye.position.set(0, 0.5, 0.25); // objCone の中心に配置
        const eyeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.25, 32, 32); // 球体の目
        const eye = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(eyeGeometry, eyeMaterial);
        eye.position.set(0, 0.5, 0.125); // objCone の中心に配置
        // 座標移動
        objCone.position.set(0, 0.75, 0); // 帽子の中心を合わせる
        topCone.position.set(0, 1.4, -0.25); // 帽子の中心を合わせる
        topCone.rotateX(-Math.PI / 2);
        hatBrim.position.set(0, 0, 0); // つばの中心を合わせる
        // グループにして一つのオブジェクトとして扱う
        const hat = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        hat.add(objCone);
        hat.add(topCone);
        hat.add(eye);
        hat.add(this.beye);
        hat.add(hatBrim);
        this.scene.add(hat);
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        //kirakira
        this.createParticles();
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
        let t = 0;
        let seg = 0;
        let v = 0.05;
        let update = (time) => {
            t += clock.getDelta();
            if (t > 1.0) {
                seg = seg + 1;
                if (seg >= 4) {
                    seg = 0;
                }
                t -= 1.0;
            }
            const elapsed = clock.getElapsedTime();
            hat.position.y = Math.sin(elapsed) * 0.5; // 正弦波で上下に動く
            //目の動き
            if (this.beye.position.x >= 0.05) {
                v = -0.0005;
            }
            else if (this.beye.position.x <= -0.05) {
                v = 0.0005;
            }
            this.beye.position.x += v;
            const geom = this.cloud.geometry;
            const positions = geom.getAttribute('position'); // 座標データ
            for (let i = 0; i < positions.count; i++) {
                positions.setX(i, positions.getX(i) + this.particleVelocity[i].x * elapsed / 1000);
                positions.setY(i, positions.getY(i) - elapsed / 1000);
                positions.setZ(i, positions.getZ(i) + this.particleVelocity[i].z * elapsed / 1000);
                if (positions.getX(i) >= 10) {
                    positions.setX(i, -10 + Math.random());
                }
                if (positions.getY(i) <= -10) {
                    positions.setY(i, 10);
                }
                if (positions.getZ(i) >= 10) {
                    positions.setZ(i, -10 + Math.random());
                }
                positions.needsUpdate = true;
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    createParticles = () => {
        //ジオメトリの作成
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        //マテリアルの作成
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const texture = textureLoader.load('raindrop.png');
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            size: 1,
            map: texture,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            color: 0xff000,
            depthWrite: false,
            transparent: true,
            opacity: 0.5
        });
        //particleの作成
        const particleNum = 51 * 51; // パーティクルの数
        const positions = new Float32Array(particleNum * 3);
        let particleIndex = 0;
        let particleIndey = 0;
        let particleIndez = 0;
        this.particleVelocity = [];
        for (let x = -25; x <= 25; ++x) {
            for (let y = -25; y <= 25; ++y) {
                positions[particleIndex++] = -5 + 10 * Math.random(); // x座標
                positions[particleIndex++] = y; // y座標
                positions[particleIndex++] = -5 + 10 * Math.random(); // z座標
                this.particleVelocity.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.random(), -10 * Math.random(), Math.random()));
            }
        }
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        //THREE.Pointsの作成
        this.cloud = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geometry, material);
        //シーンへの追加
        this.scene.add(this.cloud);
    };
}
//キラキラ
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 4));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8yMmZpMDYxIOiPheWOn+WEquaWl1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBjbG91ZDpUSFJFRS5Qb2ludHM7XG5cbiAgICBwcml2YXRlIHBhcnRpY2xlVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjNbXTtcblxuICAgIHByaXZhdGUgYmV5ZTogVEhSRUUuTWVzaDtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoODAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDgwMDAwMCkpOyBcbiAgICAgICAgLy/jgqvjg6Hjg6njga7oqK3lrppcbiAgICAgICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG5cbiAgICAgICAgY29uc3Qgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBcbiAgICAgICAgY29uc3Qgb2JqR2VvbWV0cnkgPSBuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuNSwgMS41LCAzMik7IC8vIOS4iumDqOOBruWGhumMkOmDqOWIhlxuICAgICAgICBjb25zdCB0b3BHZW9tZXRyeSA9IG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMC4xLCAwLjUsIDMyKTsgLy8g5LiK6YOo44Gu5YaG6YyQ6YOo5YiGXG4gICAgICAgIGNvbnN0IGJyaW1HZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDEsIDEsIDAuMSwgMzIpOyAvLyDjgaTjgbDpg6jliIZcbiAgICBcbiAgICAgICAgLy8g5p2Q6LOqXG4gICAgICAgIGNvbnN0IG9iak1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwIH0pO1xuICAgICAgICBjb25zdCBleWVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweEZGRkZGRiB9KTsgLy8g55m944GE55uu44Gu5p2Q6LOqXG4gICAgICAgIGNvbnN0IGJleWVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweEZGMDAwMCB9KTsgLy8g55m944GE55uu44Gu5p2Q6LOqXG5cbiAgICAgICAgLy8g44Oh44OD44K344Ol44Gu55Sf5oiQXG4gICAgICAgIGNvbnN0IG9iakNvbmUgPSBuZXcgVEhSRUUuTWVzaChvYmpHZW9tZXRyeSwgb2JqTWF0ZXJpYWwpO1xuICAgICAgICBjb25zdCB0b3BDb25lID0gbmV3IFRIUkVFLk1lc2godG9wR2VvbWV0cnksIG9iak1hdGVyaWFsKTtcbiAgICAgICAgY29uc3QgaGF0QnJpbSA9IG5ldyBUSFJFRS5NZXNoKGJyaW1HZW9tZXRyeSwgb2JqTWF0ZXJpYWwpO1xuICAgIFxuICAgICAgICAvLyDnm65cbiAgICAgICAgY29uc3QgYmV5ZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMTUsIDMyLCAzMik7IC8vIOeQg+S9k+OBruebrlxuICAgICAgICB0aGlzLmJleWUgPSBuZXcgVEhSRUUuTWVzaChiZXllR2VvbWV0cnksIGJleWVNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuYmV5ZS5wb3NpdGlvbi5zZXQoMCwgMC41LCAwLjI1KTsgLy8gb2JqQ29uZSDjga7kuK3lv4PjgavphY3nva5cblxuICAgICAgICBjb25zdCBleWVHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjI1LCAzMiwgMzIpOyAvLyDnkIPkvZPjga7nm65cbiAgICAgICAgY29uc3QgZXllID0gbmV3IFRIUkVFLk1lc2goZXllR2VvbWV0cnksIGV5ZU1hdGVyaWFsKTtcbiAgICAgICAgZXllLnBvc2l0aW9uLnNldCgwLCAwLjUsIDAuMTI1KTsgLy8gb2JqQ29uZSDjga7kuK3lv4PjgavphY3nva5cblxuICAgICAgICAvLyDluqfmqJnnp7vli5VcbiAgICAgICAgb2JqQ29uZS5wb3NpdGlvbi5zZXQoMCwgMC43NSwgMCk7IC8vIOW4veWtkOOBruS4reW/g+OCkuWQiOOCj+OBm+OCi1xuICAgICAgICB0b3BDb25lLnBvc2l0aW9uLnNldCgwLCAxLjQsIC0wLjI1KTsgLy8g5bi95a2Q44Gu5Lit5b+D44KS5ZCI44KP44Gb44KLXG4gICAgICAgIHRvcENvbmUucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xuICAgICAgICBoYXRCcmltLnBvc2l0aW9uLnNldCgwLCAwLCAwKTsgLy8g44Gk44Gw44Gu5Lit5b+D44KS5ZCI44KP44Gb44KLXG4gICAgXG4gICAgICAgIC8vIOOCsOODq+ODvOODl+OBq+OBl+OBpuS4gOOBpOOBruOCquODluOCuOOCp+OCr+ODiOOBqOOBl+OBpuaJseOBhlxuICAgICAgICBjb25zdCBoYXQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgaGF0LmFkZChvYmpDb25lKTtcbiAgICAgICAgaGF0LmFkZCh0b3BDb25lKTtcbiAgICAgICAgaGF0LmFkZChleWUpO1xuICAgICAgICBoYXQuYWRkKHRoaXMuYmV5ZSk7XG4gICAgICAgIGhhdC5hZGQoaGF0QnJpbSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGhhdCk7XG5cblxuXG4gICAgICAgIFxuICAgICAgICAgICAgICAgXG4gICAgXG4gICAgICAgIFxuICAgIFxuICAgICAgICBcbiAgICBcbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG5cblxuICAgICAgICAvL2tpcmFraXJhXG4gICAgICAgIHRoaXMuY3JlYXRlUGFydGljbGVzKCk7XG5cbiAgICBcbiAgICAgICAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICAgICAgbGV0IHQgPSAwO1xuXG4gICAgICAgIGxldCBzZWc6IG51bWJlciA9IDA7XG5cbiAgICAgICAgbGV0IHY9MC4wNTtcblxuXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHQgKz0gY2xvY2suZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgIGlmICh0ID4gMS4wKSB7XG4gICAgICAgICAgICAgICAgc2VnID0gc2VnICsgMTtcbiAgICAgICAgICAgICAgICBpZiAoc2VnID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdCAtPSAxLjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gY2xvY2suZ2V0RWxhcHNlZFRpbWUoKTtcbiAgICAgICAgICAgIGhhdC5wb3NpdGlvbi55ID0gTWF0aC5zaW4oZWxhcHNlZCkgKiAwLjU7IC8vIOato+W8puazouOBp+S4iuS4i+OBq+WLleOBj1xuXG5cblxuICAgICAgICAgICAgLy/nm67jga7li5XjgY1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmJleWUucG9zaXRpb24ueCA+PTAuMDUpe1xuICAgICAgICAgICAgICAgIHY9IC0wLjAwMDU7ICBcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuYmV5ZS5wb3NpdGlvbi54IDw9LTAuMDUpe1xuICAgICAgICAgICAgICAgIHY9IDAuMDAwNTsgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iZXllLnBvc2l0aW9uLnggKz12O1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGdlb20gPSA8VEhSRUUuQnVmZmVyR2VvbWV0cnk+dGhpcy5jbG91ZC5nZW9tZXRyeTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IGdlb20uZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpOyAvLyDluqfmqJnjg4fjg7zjgr9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxwb3NpdGlvbnMuY291bnQ7aSsrKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMuc2V0WChpLCBwb3NpdGlvbnMuZ2V0WChpKSArIHRoaXMucGFydGljbGVWZWxvY2l0eVtpXS54KiBlbGFwc2VkLzEwMDApO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5zZXRZKGksIHBvc2l0aW9ucy5nZXRZKGkpIC0gZWxhcHNlZC8xMDAwKTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMuc2V0WihpLCBwb3NpdGlvbnMuZ2V0WihpKSArIHRoaXMucGFydGljbGVWZWxvY2l0eVtpXS56KiBlbGFwc2VkLzEwMDApO1xuXG4gICAgICAgICAgICAgICAgaWYocG9zaXRpb25zLmdldFgoaSk+PTEwKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMuc2V0WChpLC0xMCtNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHBvc2l0aW9ucy5nZXRZKGkpPD0tMTApe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFkoaSwxMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYocG9zaXRpb25zLmdldFooaSk+PTEwKXtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFooaSwtMTArTWF0aC5yYW5kb20oKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLm5lZWRzVXBkYXRlPXRydWU7XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlUGFydGljbGVzID0gKCkgPT4ge1xuICAgICAgICAvL+OCuOOCquODoeODiOODquOBruS9nOaIkFxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICAvL+ODnuODhuODquOCouODq+OBruS9nOaIkFxuICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRleHR1cmVMb2FkZXIubG9hZCgncmFpbmRyb3AucG5nJyk7IFxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7IFxuICAgICAgICAgICAgc2l6ZTogMSwgXG4gICAgICAgICAgICBtYXA6IHRleHR1cmUsIFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIFxuICAgICAgICAgICAgY29sb3I6IDB4ZmYwMDAsIFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsIFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsIFxuICAgICAgICAgICAgb3BhY2l0eTogMC41IH0pIFxuICAgIFxuICAgICAgICAgICAgICAvL3BhcnRpY2xl44Gu5L2c5oiQXG4gICAgICAgICAgICAgIGNvbnN0IHBhcnRpY2xlTnVtID0gNTEgKiA1MTsgLy8g44OR44O844OG44Kj44Kv44Or44Gu5pWwXG4gICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcbiAgICAgICAgICAgICAgbGV0ICAgcGFydGljbGVJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGxldCAgIHBhcnRpY2xlSW5kZXkgPSAwO1xuICAgICAgICAgICAgICBsZXQgICBwYXJ0aWNsZUluZGV6ID0gMDtcbiAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5ID0gW107XG4gICAgXG4gICAgICAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAtMjU7IHggPD0gMjU7ICsreCl7XG4gICAgICAgICAgICAgICAgICAgZm9yKGxldCB5ID0gLTI1OyB5IDw9IDI1OyArK3kpe1xuICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IC01KzEwKk1hdGgucmFuZG9tKCk7IC8vIHjluqfmqJlcbiAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zW3BhcnRpY2xlSW5kZXgrK10gPSB5OyAvLyB55bqn5qiZXG4gICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1twYXJ0aWNsZUluZGV4KytdID0gLTUrMTAqTWF0aC5yYW5kb20oKTsgLy8geuW6p+aomVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlVmVsb2NpdHkucHVzaChuZXcgVEhSRUUuVmVjdG9yMyhNYXRoLnJhbmRvbSgpLC0xMCpNYXRoLnJhbmRvbSgpLE1hdGgucmFuZG9tKCkpKTtcbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLDMpKTtcbiAgICAgICAgICAgICAgLy9USFJFRS5Qb2ludHPjga7kvZzmiJBcbiAgICAgICAgICAgICAgdGhpcy5jbG91ZCA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8v44K344O844Oz44G444Gu6L+95YqgXG4gICAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY2xvdWQpXG4gICAgXG4gICAgICAgICBcbiAgICAgICAgIH1cbn1cbi8v44Kt44Op44Kt44OpXG4gICAgICAgIFxuICAgICAgICAgICAgXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgNCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==