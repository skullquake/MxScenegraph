require(
	{
		packages:[
			{
				name:'babylonjs',
				location:'/widgets/MxScenegraph/lib/babylon.js',
				main:'babylon'
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
		'babylonjs',
		"dojo/text!MxScenegraph/widget/template/MxScenegraphBabylon.html"
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
		babylonjs,
		widgetTemplate
	){
		"use strict";
		return declare(
			"MxScenegraph.widget.MxScenegraphBabylon",
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
					this.main();
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
								    path:'Main.Node_Scene',
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
												    path:'Main.Primitive_Node',
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
													case 'Main.Line':
														var x1=obj_primitive.get('x1');
														var y1=obj_primitive.get('y1');
														var z1=obj_primitive.get('z1');
														var arr_p=[
															new BABYLON.Vector3(x,y,z),
															new BABYLON.Vector3(x1,y1,z1)
														];
														var line=BABYLON.MeshBuilder.CreateLines(
															"lines",
															{
																points:arr_p
															},
															this.scene
														);
/*
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
*/
														break;
													case 'Main.Plane':
														var w=obj_primitive.get('w');
														var h=obj_primitive.get('h');
/*
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
*/
														var plane=BABYLON.MeshBuilder.CreatePlane(
															"",
															{
																width:w,
																height:h
															},
															this.scene
														);
														plane.position=new BABYLON.Vector3(x,y,z);
														break;
													case 'Main.Box':
														console.error('Creating '+obj_primitive.getEntity())
														var w=obj_primitive.get('w');
														var h=obj_primitive.get('h');
														var box=BABYLON.MeshBuilder.CreateBox(
															"",
															{
																height:h,
																width:w,
																depth:w,
																updatable:true,
																sideOrientation:BABYLON.Mesh.DOUBLESIDE}
															)
														;
														box.position=new BABYLON.Vector3(x,y,z);
/*
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
*/
														break;
													case 'Main.Sphere':
														console.error('Creating '+obj_primitive.getEntity())
														var r=obj_primitive.get('r');
														var sphere=BABYLON.MeshBuilder.CreateSphere(
															"sphere",
															{
																diameter:r
															},
															this.scene
														);
														sphere.position = new BABYLON.Vector3(x,y,z);

/*
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
*/
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
					this.canvas=dojo.create(
						'canvas',
						{
							'width':320,
							'height':320
						}
					);
					this.canvasContainer.appendChild(this.canvas);
					this.engine=new BABYLON.Engine(this.canvas,true);
					this.scene=this.createScene();
					this.engine.runRenderLoop(dojo.hitch(this,this.loop));
					window.addEventListener("resize",dojo.hitch(this,function(){
						this.engine.resize();
					}));
				},
				createScene:function(){
					var scene=new BABYLON.Scene(this.engine);
					scene.clearColor=new BABYLON.Color3(0,0,0);
					this.camera=new BABYLON.ArcRotateCamera(
						"Camera",
						Math.PI/2,
						Math.PI/2,
						2,
						new BABYLON.Vector3(0,0,5),
						scene
					);
					this.camera.attachControl(
						this.canvas,
						true
					);
					this.light1=new BABYLON.HemisphericLight(
						"light1",
						new BABYLON.Vector3(1,1,0),
						scene
					);
					this.light2=new BABYLON.PointLight(
						"light2",
						new BABYLON.Vector3(0,1,-1),
						scene
					);
					return scene;
				},
				loop:function(){ 
					this.scene.render();
				}
			}
		);
	}
);
