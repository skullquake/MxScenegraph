require(
	{
		packages:[
			{
				name:'_Three_amd',
				location:'/widgets/MxScenegraph/lib/threejs/amd',
				main:'Three.amd.min'
			}
		]
	},
	[
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"dijit/_TemplatedMixin",
		"mxui/dom",
		"dojo/dom",
		"dojo/dom-prop",
		"dojo/dom-geometry",
		"dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/text",
		"dojo/html",
		"dojo/_base/event",
		"dojo/mouse",
		"dojo/on",
		'_Three_amd',
		"dojo/text!MxScenegraph/widget/template/MxScenegraphThree.html"
	],
	function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		dom,
		dojoDom,
		dojoProp,
		dojoGeometry,
		dojoClass,
		dojoStyle,
		dojoConstruct,
		dojoArray,
		lang,
		dojoText,
		dojoHtml,
		dojoEvent,
		mouse,
		on,
		_three,
		widgetTemplate
	){
		"use strict";
		return declare(
			"MxScenegraph.widget.MxScenegraphThree",
			[
				_WidgetBase,
				_TemplatedMixin
			],
			{
				templateString:widgetTemplate,
				widgetBase:null,
				_handles:null,
				_contextObj:null,
				//------------------------------
				//------------------------------
				//------------------------------
				_objectChangeHandler:null,
				//------------------------------
				constructor:function(){
					this._handles=[];
				},
				postCreate:function(){
					if(window.THREE==null)window.THREE=_three;
					this.addModules(this.testsvg)
				},
				addModules:function(cb){
					if(true){
						require(
							{
								packages:[
								]
							},
							[
							],
							dojo.hitch(this,function(
							){
								dojo.hitch(this,cb)();
							})
						);

					}else{dojo.hitch(this,cb)()}
				},
				update:function(obj,callback){
                                        if(this._objectChangeHandler!==null) {
                                                this.unsubscribe(this._objectChangeHandler);
                                        }
                                        if(obj){
                                                this._objectChangeHandler=this.subscribe(
							{
								guid: obj.getGuid(),
								callback:dojo.hitch(this,function(){
									this._updateRendering(callback);
								})
							}
						);
                                        }else{}
					this._contextObj=obj;
					this._updateRendering(callback);
					this._executeCallback(callback,"update");
				},
				resize:function(box){
				},
				uninitialize:function(){
				},
				destroy:function () {
				},
				_updateRendering:function(callback){
					if(this._contextObj!=null){
						dojoStyle.set(this.domNode,"display","block");
						new Promise((resolve,reject)=>{
								mx.data.get({
								    guid:this._contextObj.getGuid(),
								    path:'SceneGraph.Node_Scene',
								    filter:{
									offset:0,
									amount:4096
								    },
								    callback:dojo.hitch(this,function(arr_node){
									resolve(arr_node);
								    }),
								    error:dojo.hitch(this,function(e){
									reject(e);
								    })
								});
						}).then(
							dojo.hitch(this,function(arr_node){
								var arr_promise=[];
								arr_node.forEach(dojo.hitch(this,function(obj_node,obj_nodeidx){
									arr_promise.push(
										new Promise((resolve,reject)=>{
												mx.data.get({
												    guid:obj_node.getGuid(),
												    path:'SceneGraph.Primitive_Node',
												    filter:{
													offset:0,
													amount:4096
												    },
												    callback:dojo.hitch(this,function(arr_primitive){
													resolve(arr_primitive);
												    }),
												    error:dojo.hitch(this,function(e){
													reject(e);
												    })
												});
										})
									);
								}))
								Promise.all(arr_promise).then(
									dojo.hitch(this,function(arr_arr_primitive){
										console.log('----------------------------------------');
										console.log(arr_arr_primitive);
										console.log('----------------------------------------');
										arr_arr_primitive.forEach(dojo.hitch(this,function(arr_primitive,arr_primitive_idx){
											arr_primitive.forEach(dojo.hitch(this,function(obj_primitive,obj_primitive_idx){
												var x=obj_primitive.get('x');
												var y=obj_primitive.get('y');
												var z=obj_primitive.get('z');
												x=x==null?0:x;
												y=y==null?0:y;
												z=z==null?0:z;
												var rotx=obj_primitive.get('rotx');
												var roty=obj_primitive.get('roty');
												var rotz=obj_primitive.get('rotz');
												switch(obj_primitive.getEntity()){
													case 'SceneGraph.Line':
														var x1=obj_primitive.get('x1');
														var y1=obj_primitive.get('y1');
														var z1=obj_primitive.get('z1');
														var material = new THREE.LineBasicMaterial({
																color:new THREE.Color(color)
														});

														var geometry = new THREE.Geometry();
														geometry.vertices.push(
															new THREE.Vector3(x,y,z),
															new THREE.Vector3(x1,y1,z1)
														);

														var line = new THREE.Line( geometry, material );
														this.scene.add( line );
														break;
													case 'SceneGraph.Plane':
														var w=obj_primitive.get('w');
														var h=obj_primitive.get('h');
														var geometry=new THREE.BoxGeometry(w,h,w);
														var geometry = new THREE.PlaneGeometry(w,h,1);
														var material=new THREE.MeshPhongMaterial(
															{
																color:new THREE.Color(color)
															}
														);
														var plane=new THREE.Mesh(geometry, material);
														plane.position.x = x;
														plane.position.y = y;
														plane.position.z = z;
														this.scene.add(plane);

														break;
													case 'SceneGraph.Box':
														console.error('Creating '+obj_primitive.getEntity())
														var w=obj_primitive.get('w');
														var h=obj_primitive.get('h');
														var color=obj_primitive.get('color');
														var geometry=new THREE.BoxGeometry(w,h,w);
														var material=new THREE.MeshPhongMaterial(
															{
																color:new THREE.Color(color)
															}
														);
														var cube=new THREE.Mesh(geometry, material);
														cube.position.x = x;
														cube.position.y = y;
														cube.position.z = z;
														this.scene.add(cube);
														break;
													case 'SceneGraph.Sphere':
														console.error('Creating '+obj_primitive.getEntity())
														var r=obj_primitive.get('r');
														var geometry=new THREE.SphereGeometry(r,32,32);
														var material=new THREE.MeshPhongMaterial(
															{
																color:new THREE.Color(color)
															}
														);
														var sphere=new THREE.Mesh(geometry,material);
														sphere.position.x=x;
														sphere.position.y=y;
														sphere.position.z=z;
														this.scene.add( sphere );
														break;
													default:
														console.error('Invalid Primitive Entity Type')
														break;
												}
											}));
										}));
									}),
									dojo.hitch(this,function(err){
										mx.ui.error(err.toString());
									})
								);
							}),
							dojo.hitch(this,function(err){
								mx.ui.error(err.toString());
							})
						);
					} else {
						dojoStyle.set(this.domNode,"display","none");
					}
					this._executeCallback(callback,"_updateRendering");
				},
				_execMf:function(mf,guid,cb){
					if(mf&&guid){
						mx.ui.action(
							mf,
							{
								params: {
									applyto:"selection",
									guids:[guid]
								},
								callback:lang.hitch(this,function(objs){
									if(cb&&typeof cb==="function"){
										cb(objs);
									}
								}),
								error:function(error){
									console.debug(error.description);
								}
							},
							this
						);
					}
				},
				_executeCallback:function(cb,from){
					if(cb&&typeof cb==="function"){
						cb();
					}
				},
				testsvg:function(){
					this.main();
				},
				main:function(){
						this.renderer=new THREE.WebGLRenderer(
							{
								antialias:true
							}
						);
						this.domNode.appendChild( this.renderer.domElement );
						this.w=this.renderer.domElement.width;
						this.h=this.renderer.domElement.height;
						const fov=75;
						const aspect=2;
						const near=0.1;
						const far=5;
						//this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
						this.camera=new THREE.PerspectiveCamera(75,this.w/this.h,0.1,1000);
						this.camera.position.z=0;
						this.camera.position.x=0;
						this.camera.position.y=5;
						this.scene=new THREE.Scene();
						{
							const color=0xFFFFFF;
							const intensity=2;
							const light=new THREE.DirectionalLight(color,intensity);
							light.position.set(-1,2,4);
							this.scene.add(light);
						}
						//var axesHelper = new THREE.AxesHelper( 5 );
						//this.scene.add( axesHelper );
						this.composer=new THREE.EffectComposer(this.renderer);
						this.composer.addPass(new THREE.RenderPass(this.scene,this.camera));
						var params = {};
						params = {
							exposure: 0.5,
							bloomStrength: 0.5,
							bloomThreshold: 10,
							bloomRadius: 0
						};
						params = {
							exposure: 0.1,
							bloomStrength: 0.4,
							bloomThreshold: 0,
							bloomRadius: 1
						};
						var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
						bloomPass.threshold = params.bloomThreshold;
						bloomPass.strength = params.bloomStrength;
						bloomPass.radius = params.bloomRadius;
						this.composer.addPass( bloomPass );
						/*
						*/
						const filmPass=new THREE.FilmPass(
								0.35,	// noise intensity
								0.025,	// scanline intensity
								1024,	// scanline count
								false,	// grayscale
						);
						filmPass.renderToScreen=true;
						this.composer.addPass(filmPass);
						//var glitchPass = new THREE.GlitchPass(64);
						//this.composer.addPass(glitchPass );
						//--------------------------------------------------------------------------------
						var controls=new THREE.OrbitControls(this.camera,this.renderer.domElement);
						var group=new THREE.Group();
						//--------------------------------------------------------------------------------
						this.mouse = new THREE.Vector2();
						this.INTERSECTED=null;
						this.raycaster = new THREE.Raycaster();
						//--------------------------------------------------------------------------------
						this.then=0;
						this.rad=0;
						//declared once at the top of your code
						var axis = new THREE.Vector3(0.0,0.0,1.0);//tilted a bit on x and y - feel free to plug your different axis here

						document.addEventListener( 'mousemove', dojo.hitch(this,this.onDocumentMouseMove), false );
						//document.addEventListener( 'click', dojo.hitch(this,this.onDocumentMouseMove), false );
						requestAnimationFrame(dojo.hitch(this,this.render));
				},
				makeInstance:function(geometry,color,x,y,z){
					x=x==null?0:x;
					y=y==null?0:y;
					z=z==null?0:z;
					const material=new THREE.MeshPhongMaterial({color});
					const cube=new THREE.Mesh(geometry, material);
					this.scene.add(cube);
					cube.position.x = x;
					cube.position.y = y;
					cube.position.z = z;
					return cube;
				},
				resizeRendererToDisplaySize:function(renderer){
					const canvas=this.renderer.domElement;
					const width=canvas.clientWidth;
					const height=canvas.clientHeight;
					const needResize=canvas.width!== width||canvas.height!==height;
					if (needResize) {
						renderer.setSize(width,height,false);
					}
					return needResize;
				},
				onDocumentMouseMove:function( event ) {
window.e=event;
					try{
						this.raycaster.setFromCamera(this.mouse,this.camera );
						// Welcome to the exciting world of raycasting !
						// First let's get some mouse coordinates:
						this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
						this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
						//console.log(this.mouse.x+":"+this.mouse.y);
						//this.mouse.x = (event.target.clientX / window.innerWidth) * 2 - 1;
						//this.mouse.y = -(event.target.clientY / window.innerHeight) * 2 + 1;
						// This is basically converting 2d coordinates to 3d Space:
						this.raycaster.setFromCamera(this.mouse,this.camera);
						// And checking if it intersects with an array object
						//var intersects = raycaster.intersectObjects([cube]);
						var intersects = this.raycaster.intersectObjects( this.scene.children );

						// does your cursor intersect the object on click ? 
						//console.log(intersects.length > 0 ? "yes" : "no");

						// And finally change the color:
						intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
					}catch(e){}
				},
				render:function(now){
					now *= 0.001;
					const deltaTime=now-this.then;
					this.then=now;
					if(this.resizeRendererToDisplaySize(this.renderer)){
						const canvas=this.renderer.domElement;
						this.camera.aspect=canvas.clientWidth/canvas.clientHeight;
						this.camera.updateProjectionMatrix();
						this.composer.setSize(canvas.width,canvas.height);
					}
					const speed = 8;
					const rot = now * speed;
					//this.renderer.render(this.scene,this.camera);
					this.composer.render(deltaTime);
					requestAnimationFrame(dojo.hitch(this,this.render));
				}
			}
		);
	}
);
