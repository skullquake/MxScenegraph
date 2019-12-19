require(
	{
		packages:[
			{
				name:'babylonjs',
				location:'/widgets/MxScenegraph/lib/babylon.js',
				main:'babylon'
			},
			{
				name:'_babylonjs_loaders',
				location:'/widgets/MxScenegraph/lib/babylon.js',
				main:'babylonjs.loaders.min'
			},
			{
				name:'_earcut',
				location:'/widgets/MxScenegraph/lib/babylon.js',
				main:'earcut.min'
			},
			{
				name:'_tinycolorbabylonjs',
				location:'/widgets/MxScenegraph/lib/tinycolor',
				main:'tinycolor-min'
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
		//'_babylonjs_loaders',
		'_earcut',
		'_tinycolorbabylonjs',
		"MxScenegraph/lib/jquery-1.11.2",
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
		//_babylonjs_loaders,
		_earcut,
		_tinycolor,
                _jQuery,
		widgetTemplate
	){
                "use strict";
                var $=_jQuery.noConflict(true);
		window.earcut=_earcut;
		window.BABYLON=babylonjs;
		require(
			{
				packages:[
					{
						name:'_meshwriter',
						location:'/widgets/MxScenegraph/lib/babylon.js',
						main:'meshwriter'
					},
					{
						name:'babylonjs-loaders',
						location:'/widgets/MxScenegraph/lib/babylon.js',
						main:'babylonjs.loaders.min'
					}
				]
			},
			[
				'_meshwriter',
				'babylonjs-loaders'
			],
			function(
				_meshwriter,
				babylonjs_loaders
			){
				//console.log(_meshwriter);
				//console.log(babylonjs_loaders);
			}
		)
		//--------------------------------------------------------------------------------
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
				str_primitive_click_mf:null,
				int_canvas_width:null,
				int_canvas_height:null,
				//------------------------------
				_datarendered:false,
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
						if(!this._datarendered){
							new Promise((resolve,reject)=>{
								//get camera
								if(this._contextObj.getReference('SceneGraph.Scene_Camera')){
									mx.data.get({
										    guid:this._contextObj.getGuid(),
										    path:'SceneGraph.Scene_Camera',
										    filter:{
											offset:0,
											amount:1
										    },
										    callback:dojo.hitch(this,function(arr_camera){
											if(arr_camera.length>0){
												resolve(arr_camera[0]);
											}else{
												resolve(null);
											}
										    }),
										    error:dojo.hitch(this,function(e){
											reject(e);
										    })
										});
								}else{
									resolve(null);
								}
							}).then(
								dojo.hitch(
									this,
									function(obj_camera){
										//set camera
										if(obj_camera!=null){
											var x=obj_camera.get('x')==null?0:obj_camera.get('x');
											var y=obj_camera.get('y')==null?0:obj_camera.get('y');
											var z=obj_camera.get('z')==null?0:obj_camera.get('z');
											var tx=obj_camera.get('tx')==null?0:obj_camera.get('tx');
											var ty=obj_camera.get('ty')==null?0:obj_camera.get('ty');
											var tz=obj_camera.get('tz')==null?0:obj_camera.get('tz');
											this.camera.position=new BABYLON.Vector3(x,y,z);
											//this.camera.target=new BABYLON.Vector3(tx,ty,tz);
											window.camera=this.camera;
										}
										//get nodes
										return new Promise(
											(resolve,reject)=>{
												mx.data.get(
													{
														guid:this._contextObj.getGuid(),
														path:'SceneGraph.Node_Scene',
														filter:{
															offset:0,
															amount:4096
														},
														callback:dojo.hitch(
															this,
															function(arr_node){
																resolve(arr_node);
															}
														),
														error:dojo.hitch(
															this,
															function(e){
																reject(e);
															}
														)
													}
												);
											}
										);
									}
								)
							).then(
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
											arr_arr_primitive.forEach(dojo.hitch(this,function(arr_primitive,arr_primitive_idx){
												arr_primitive.forEach(dojo.hitch(this,function(obj_primitive,obj_primitive_idx){
													var x=obj_primitive.get('x')==null?0:obj_primitive.get('x');
													var y=obj_primitive.get('y')==null?0:obj_primitive.get('y');
													var z=obj_primitive.get('z')==null?0:obj_primitive.get('z');
													var rotx=obj_primitive.get('rotx')==null?0:obj_primitive.get('rotx');
													var roty=obj_primitive.get('roty')==null?0:obj_primitive.get('roty');
													var rotz=obj_primitive.get('rotz')==null?0:obj_primitive.get('rotz');
													var sclx=obj_primitive.get('sclx')==null?1:obj_primitive.get('sclx');
													var scly=obj_primitive.get('scly')==null?1:obj_primitive.get('scly');
													var sclz=obj_primitive.get('sclz')==null?1:obj_primitive.get('sclz');
													var visible=obj_primitive.get('visible')==null?true:obj_primitive.get('visible');
													switch(obj_primitive.getEntity()){
														case 'SceneGraph.Line':
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Vec3f_Line',
																filter:{
																	offset:0,
																	amount:4096
																},
																callback:dojo.hitch(this,function(arr_vec3f){
																	if(arr_vec3f.length>0){
																		if(arr_vec3f.length>1){
																			console.info('Creating '+obj_primitive.getEntity());
																			var arr_p=[];
																			arr_vec3f.forEach(dojo.hitch(this,function(obj_vec3f,obj_vec3f_idx){
																				var x=obj_vec3f.get('x');
																				var y=obj_vec3f.get('y');
																				var z=obj_vec3f.get('z');
																				arr_p.push(new BABYLON.Vector3(x,y,z));
																			}));
																			var line=BABYLON.MeshBuilder.CreateLines(
																				"lines",
																				{
																					points:arr_p
																				},
																				this.scene
																			);
																			var color=obj_primitive.get('color');
																			var _color=_tinycolor(color);
																			var material=new BABYLON.StandardMaterial(this.scene);
																			material.alpha=1;
																			material.diffuseColor=new BABYLON.Color3(
																				_color._r/255,
																				_color._g/255,
																				_color._b/255
																			);
																			line.rotation.x=rotx;
																			line.rotation.y=roty;
																			line.rotation.z=rotz;
																			line.material=material;
																			line.visibility=visible;
																		}else{
																			console.info('Not Creating '+obj_primitive.getEntity()+": Invalid number of points")
																		}
																	}else{
																		console.info('Not Creating '+obj_primitive.getEntity()+": No points")
																	}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});

															break;
														case 'SceneGraph.Polygon':
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Vec3f_Polygon',
																filter:{
																	offset:0,
																	amount:4096
																},
																callback:dojo.hitch(this,function(arr_vec3f){
																	if(arr_vec3f.length>0){
																		if(arr_vec3f.length>2){
																			console.info('Creating '+obj_primitive.getEntity());
																			var shape=[];
																			console.log('------------');
																			arr_vec3f.forEach(dojo.hitch(this,function(obj_vec3f,obj_vec3f_idx){
																				var x=Number(obj_vec3f.get('x'));
																				var y=Number(obj_vec3f.get('y'));
																				var z=Number(obj_vec3f.get('z'));
																				shape.push(new BABYLON.Vector3(x,y,z));
																			}));
																			console.log('------------');
																			var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
																			var polygon=BABYLON.MeshBuilder.CreatePolygon(
																				"polygon",
																				{
																					shape:shape,
																					holes:[],
																					sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																				},
																				this.scene
																			);
																			polygon.position=new BABYLON.Vector3(x,y,z);
																			var color=obj_primitive.get('color');
																			var _color=_tinycolor(color);
																			var material=new BABYLON.StandardMaterial(this.scene);
																			material.alpha=1;
																			material.diffuseColor=new BABYLON.Color3(
																				_color._r/255,
																				_color._g/255,
																				_color._b/255
																			);
																			polygon.rotation.x=rotx;
																			polygon.rotation.y=roty;
																			polygon.rotation.z=rotz;
																			polygon.material=material;
																			polygon.visibility=visible;
																			mx.data.get({
																				guid:obj_primitive.getGuid(),
																				path:'SceneGraph.Texture',
																				filter:{
																					offset:0,
																					amount:1
																				},
																				callback:dojo.hitch(this,function(objs){
																					if(objs.length>0){
																						var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																						var mat = new BABYLON.StandardMaterial("",this.scene);
																						mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																						polygon.material=mat;
																					}else{}
																				}),
																				error:function(e){
																					console.error("Could not retrieve objects:",e);
																				}
																			});

																			//--------------------------------------------------------------------------------
																			//attach userdata
																			//--------------------------------------------------------------------------------
																			polygon.userdata={};
																			polygon.userdata.mxobject=obj_primitive;
																			//--------------------------------------------------------------------------------
																			//setup evt
																			//--------------------------------------------------------------------------------
																			polygon.actionManager=new BABYLON.ActionManager(this.scene);
																			polygon.actionManager.registerAction(
																				new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																				dojo.hitch(this,function(event){
																					console.log('clicked');
																					var pickedMesh=event.meshUnderPointer; 
																					if(
																						pickedMesh!=null&&
																						pickedMesh.userdata!=null&&
																						pickedMesh.userdata.mxobject!=null&&
																						pickedMesh.userdata.mxobject.getGuid()!=null&&
																						this.str_primitive_click_mf!=null&&
																						this.str_primitive_click_mf!=''
																					){
																						this._execMf(
																							this.str_primitive_click_mf,
																							pickedMesh.userdata.mxobject.getGuid(),
																							dojo.hitch(this,function(){
																							})
																						);
																						//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																						//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																					}
																				}))
																			);
																			//--------------------------------------------------------------------------------
																		}else{
																			console.info('Not Creating '+obj_primitive.getEntity()+": Invalid number of points")
																		}
																	}else{
																		console.info('Not Creating '+obj_primitive.getEntity()+": No points")
																	}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															break;

														case 'SceneGraph.Plane':
															console.info('Creating '+obj_primitive.getEntity())
															var w=obj_primitive.get('w')==null?1:obj_primitive.get('w');
															var h=obj_primitive.get('h')==null?1:obj_primitive.get('h');
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var plane=BABYLON.MeshBuilder.CreatePlane(
																"",
																{
																	width:w,
																	height:h,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																},
																this.scene
															);
															//var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:1, width: 0.665, sideOrientation: BABYLON.Mesh.DOUBLESIDE, frontUVs: f, backUVs: b}, scene);
															plane.position=new BABYLON.Vector3(x,y,z);
															//var orientation = BABYLON.Vector3.RotationFromAxis(1,1,1);//axis1, axis2, axis3);
															//plane.rotation = orientation;
															plane.rotation.x=rotx;
															plane.rotation.y=roty;
															plane.rotation.z=rotz;
															plane.visibility=visible;
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															plane.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		plane.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
														case 'SceneGraph.Disc':
															console.info('Creating '+obj_primitive.getEntity())
															var r=obj_primitive.get('r')==null?1:obj_primitive.get('r');
															var tesselation=obj_primitive.get('tesselation')==null?1:obj_primitive.get('tesselation');
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var disc=BABYLON.MeshBuilder.CreateDisc(
																"",
																{
																	tessellation:tesselation,
																	radius:r,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																},
																this.scene
															);
															disc.position=new BABYLON.Vector3(x,y,z);
															disc.rotation.x=rotx;
															disc.rotation.y=roty;
															disc.rotation.z=rotz;
															disc.visibility=visible;
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															disc.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		disc.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});

															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															disc.userdata={};
															disc.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															disc.actionManager=new BABYLON.ActionManager(this.scene);
															disc.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Box':
															console.info('Creating '+obj_primitive.getEntity())
															var w=obj_primitive.get('w');
															var h=obj_primitive.get('h');
															var d=obj_primitive.get('d');
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var box=BABYLON.MeshBuilder.CreateBox(
																"",
																{
																	height:h,
																	width:w,
																	depth:d,
																	updatable:true,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																}
															);
															box.position=new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															box.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		box.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});

															box.rotation.x=rotx;
															box.rotation.y=roty;
															box.rotation.z=rotz;
															box.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															box.userdata={};
															box.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															box.actionManager=new BABYLON.ActionManager(this.scene);
															box.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Sphere':
															console.info('Creating '+obj_primitive.getEntity())
															var r=obj_primitive.get('r');
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var sphere=BABYLON.MeshBuilder.CreateSphere(
																"sphere",
																{
																	diameter:r,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																},
																this.scene
															);
															sphere.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															sphere.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		sphere.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															sphere.rotation.x=rotx;
															sphere.rotation.y=roty;
															sphere.rotation.z=rotz;
															sphere.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															sphere.userdata={};
															sphere.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															sphere.actionManager=new BABYLON.ActionManager(this.scene);
															sphere.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Cylinder':
															console.info('Creating '+obj_primitive.getEntity())
															var d0=obj_primitive.get('d0')==null?1:obj_primitive.get('d0');
															var d1=obj_primitive.get('d1')==null?1:obj_primitive.get('d1');
															var h=obj_primitive.get('h')==null?2:obj_primitive.get('h');
															var tessellation=obj_primitive.get('tessellation')==null?24:obj_primitive.get('tessellation');
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var cylinder=BABYLON.MeshBuilder.CreateCylinder(
																"cylinder",
																{
																	diameterTop:d1,
																	diameterBottom:d0,
																	height:h,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE 
																},
																this.scene
															);
															cylinder.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															cylinder.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		cylinder.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															cylinder.rotation.x=rotx;
															cylinder.rotation.y=roty;
															cylinder.rotation.z=rotz;
															cylinder.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															cylinder.userdata={};
															cylinder.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															cylinder.actionManager=new BABYLON.ActionManager(this.scene);
															cylinder.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Torus':
															console.info('Creating '+obj_primitive.getEntity())
															var d=obj_primitive.get('d')==null?1:obj_primitive.get('d')>0?obj_primitive.get('d'):1;
															var thickness=obj_primitive.get('thickness')==null?0.5:obj_primitive.get('thickness')>0?obj_primitive.get('thickness'):d/2;
															var tessellation=obj_primitive.get('tessellation')==null?16:obj_primitive.get('tessellation')>0?obj_primitive.get('tessellation'):16;
															var doublesided=obj_primitive.get('doublesided')==null?true:obj_primitive.get('doublesided');
															var torus=BABYLON.MeshBuilder.CreateTorus(
																"torus",
																{
																	thickness:thickness,
																	diameter:d,
																	//tessellation:tessellation//borks
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE //borks
																},
																this.scene
															);
															torus.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															torus.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		torus.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});

															torus.rotation.x=rotx;
															torus.rotation.y=roty;
															torus.rotation.z=rotz;
															torus.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															torus.userdata={};
															torus.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															torus.actionManager=new BABYLON.ActionManager(this.scene);
															torus.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Knot':
															console.info('Creating '+obj_primitive.getEntity())
															var radius=obj_primitive.get('radius')==null?1:obj_primitive.get('radius')>0?obj_primitive.get('radius'):2;
															var tube=obj_primitive.get('tube')==null?1:obj_primitive.get('tube')>0?obj_primitive.get('tube'):0.5;
															var radialSegments=obj_primitive.get('radialSegments')==null?1:obj_primitive.get('radialSegments')>0?obj_primitive.get('radialSegments'):32;
															var tubularSegments=obj_primitive.get('tubularSegments')==null?1:obj_primitive.get('tubularSegments')>0?obj_primitive.get('tubularSegments'):32;
															var p=obj_primitive.get('p')==null?1:obj_primitive.get('p')>0?obj_primitive.get('p'):2;
															var q=obj_primitive.get('q')==null?1:obj_primitive.get('q')>0?obj_primitive.get('q'):3;
															var doublesided=obj_primitive.get('doublesided')==null?obj_primitive.get('doublesided'):false;
															var knot=BABYLON.MeshBuilder.CreateTorusKnot(
																"",
																{
																	radius:radius,
																	tube:tube,
																	radialSegments:radialSegments,
																	tubularSegments:tubularSegments,
																	p:p,
																	q:q,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE
																},
																this.scene
															);
															knot.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															knot.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		knot.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															knot.rotation.x=rotx;
															knot.rotation.y=roty;
															knot.rotation.z=rotz;
															knot.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															knot.userdata={};
															knot.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															knot.actionManager=new BABYLON.ActionManager(this.scene);
															knot.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Ground':
															console.info('Creating '+obj_primitive.getEntity())
															var width=obj_primitive.get('width')==null?1:obj_primitive.get('width')>0?obj_primitive.get('width'):1;
															var height=obj_primitive.get('height')==null?1:obj_primitive.get('height')>0?obj_primitive.get('height'):1;
															var subdivisions=obj_primitive.get('subdivisions')==null?1:obj_primitive.get('subdivisions')>0?obj_primitive.get('subdivisions'):32;
															var doublesided=obj_primitive.get('doublesided')==null?obj_primitive.get('doublesided'):false;
															var ground=BABYLON.MeshBuilder.CreateGround(
																"",
																{
																	width:width,
																	height:height,
																	subdivisions:6,//subdivisions, borks
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE
																},
																this.scene
															);
															ground.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															ground.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		ground.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															ground.rotation.x=rotx;
															ground.rotation.y=roty;
															ground.rotation.z=rotz;
															ground.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															ground.userdata={};
															ground.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															ground.actionManager=new BABYLON.ActionManager(this.scene);
															ground.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.HeightMapGround':
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.HeightMap',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var urlheightmap='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		//var mat = new BABYLON.StandardMaterial("",this.scene);
																		//mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		//heightmapground.material=mat;

																		console.info('Creating '+obj_primitive.getEntity())
																		var width=obj_primitive.get('width')==null?1:obj_primitive.get('width')>0?obj_primitive.get('width'):1;
																		var height=obj_primitive.get('height')==null?1:obj_primitive.get('height')>0?obj_primitive.get('height'):1;
																		var subdivisions=Math.floor(obj_primitive.get('subdivisions')==null?1:obj_primitive.get('subdivisions')>0?obj_primitive.get('subdivisions'):32);
																		var doublesided=obj_primitive.get('doublesided')==null?obj_primitive.get('doublesided'):false;
																		//var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", url, {width: 6, subdivisions: 4}, scene);
																		var heightmapground=BABYLON.MeshBuilder.CreateGroundFromHeightMap(
																			"",
																			urlheightmap,
																			{
																				width:width,
																				height:height,
																				subdivisions:subdivisions,// borks
																				sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE
																			},
																			this.scene
																		);
																		heightmapground.position = new BABYLON.Vector3(x,y,z);
																		var color=obj_primitive.get('color');
																		var _color=_tinycolor(color);
																		var material=new BABYLON.StandardMaterial(this.scene);
																		material.alpha=1;
																		material.diffuseColor=new BABYLON.Color3(
																			_color._r/255,
																			_color._g/255,
																			_color._b/255
																		);
																		heightmapground.material=material;
																		mx.data.get({
																			guid:obj_primitive.getGuid(),
																			path:'SceneGraph.Texture',
																			filter:{
																				offset:0,
																				amount:1
																			},
																			callback:dojo.hitch(this,function(objs){
																				if(objs.length>0){
																					var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																					var mat = new BABYLON.StandardMaterial("",this.scene);
																					mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																					heightmapground.material=mat;
																				}else{}
																			}),
																			error:function(e){
																				console.error("Could not retrieve objects:",e);
																			}
																		});
																		heightmapground.rotation.x=rotx;
																		heightmapground.rotation.y=roty;
																		heightmapground.rotation.z=rotz;
																		heightmapground.visibility=visible;
																		//--------------------------------------------------------------------------------
																		//attach userdata
																		//--------------------------------------------------------------------------------
																		heightmapground.userdata={};
																		heightmapground.userdata.mxobject=obj_primitive;
																		//--------------------------------------------------------------------------------
																		//setup evt
																		//--------------------------------------------------------------------------------
																		heightmapground.actionManager=new BABYLON.ActionManager(this.scene);
																		heightmapground.actionManager.registerAction(
																			new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																			dojo.hitch(this,function(event){
																				console.log('clicked');
																				var pickedMesh=event.meshUnderPointer; 
																				if(
																					pickedMesh!=null&&
																					pickedMesh.userdata!=null&&
																					pickedMesh.userdata.mxobject!=null&&
																					pickedMesh.userdata.mxobject.getGuid()!=null&&
																					this.str_primitive_click_mf!=null&&
																					this.str_primitive_click_mf!=''
																				){
																					this._execMf(
																						this.str_primitive_click_mf,
																						pickedMesh.userdata.mxobject.getGuid(),
																						dojo.hitch(this,function(){
																						})
																					);
																					//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																					//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																				}
																			}))
																		);
																		//--------------------------------------------------------------------------------


																	}else{
																		console.error('Not Creating '+obj_primitive.getEntity()+': No heightmap')
																	}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															break;
														case 'SceneGraph.TiledGround':
															console.info('Creating '+obj_primitive.getEntity())
															var doublesided=obj_primitive.get('doublesided')==null?obj_primitive.get('doublesided'):false;
															var xmin=Math.floor(obj_primitive.get('xmin')==null?-1:obj_primitive.get('xmin'));
															var zmin=Math.floor(obj_primitive.get('zmin')==null?-1:obj_primitive.get('zmin'));
															var xmax=Math.floor(obj_primitive.get('xmax')==null?1:obj_primitive.get('xmax'));
															var zmax=Math.floor(obj_primitive.get('zmax')==null?1:obj_primitive.get('zmax'));
															var subdivisions={
																w:Math.floor(obj_primitive.get('subdivisions_w')==null?6:obj_primitive.get('subdivisions_w')>0?obj_primitive.get('subdivisions_w'):6),
																h:Math.floor(obj_primitive.get('subdivisions_h')==null?6:obj_primitive.get('subdivisions_h')>0?obj_primitive.get('subdivisions_h'):6)
															};
															var precision={
																w:Math.floor(obj_primitive.get('precision_w')==null?2:obj_primitive.get('precision_w')>0?obj_primitive.get('precision_w'):2),
																h:Math.floor(obj_primitive.get('precision_h')==null?2:obj_primitive.get('precision_h')>0?obj_primitive.get('precision_h'):2)
															};
															var tiledground=BABYLON.MeshBuilder.CreateTiledGround(
																"",
																{
																	doublesided:doublesided,
																	xmin:xmin,
																	zmin:zmin,
																	xmax:xmax,
																	zmin:zmin,
																	subdivisions:subdivisions,
																	precision:precision,
																	sideOrientation:doublesided?BABYLON.Mesh.DOUBLESIDE:BABYLON.Mesh.FRONTSIDE
																},
																this.scene
															);
															tiledground.position = new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															tiledground.material=material;
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Texture',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																		var mat = new BABYLON.StandardMaterial("",this.scene);
																		mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																		tiledground.material=mat;
																	}else{}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															tiledground.rotation.x=rotx;
															tiledground.rotation.y=roty;
															tiledground.rotation.z=rotz;
															tiledground.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															tiledground.userdata={};
															tiledground.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															tiledground.actionManager=new BABYLON.ActionManager(this.scene);
															tiledground.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Text':
															var sz=obj_primitive.get('sz')/10;
															var val=obj_primitive.get('val');
															var color=obj_primitive.get('color');
															//var Writer=BABYLON.MeshWriter(this.scene,{scale:1});
															var Writer=MeshWriter(this.scene,{scale:sz});
															var text1=new Writer(
																val,
																{
																	"anchor": "center",
																	"letter-height": 10,
																	"color": color,
																	"position": {
																		"x":0,
																		"y":0,
																		"z":0
																	}
																}
															);
															var textMesh=text1.getMesh();
															textMesh.position=new BABYLON.Vector3(x,y,z);
															var color=obj_primitive.get('color');
															var _color=_tinycolor(color);
															var material=new BABYLON.StandardMaterial(this.scene);
															material.alpha=1;
															material.diffuseColor=new BABYLON.Color3(
																_color._r/255,
																_color._g/255,
																_color._b/255
															);
															textMesh.material=material;
															textMesh.rotation.x=rotx;
															textMesh.rotation.y=roty;
															textMesh.rotation.z=rotz;
															textMesh.visibility=visible;
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															textMesh.userdata={};
															textMesh.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															textMesh.actionManager=new BABYLON.ActionManager(this.scene);
															textMesh.actionManager.registerAction(
																new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																dojo.hitch(this,function(event){//not working for text?
																	console.log('clicked');
																	var pickedMesh=event.meshUnderPointer; 
																	if(
																		pickedMesh!=null&&
																		pickedMesh.userdata!=null&&
																		pickedMesh.userdata.mxobject!=null&&
																		pickedMesh.userdata.mxobject.getGuid()!=null&&
																		this.str_primitive_click_mf!=null&&
																		this.str_primitive_click_mf!=''
																	){
																		this._execMf(
																			this.str_primitive_click_mf,
																			pickedMesh.userdata.mxobject.getGuid(),
																			dojo.hitch(this,function(){
																			})
																		);
																		//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																		//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																	}
																}))
															);
															//--------------------------------------------------------------------------------
															break;
														case 'SceneGraph.Model':
															mx.data.get({
																guid:obj_primitive.getGuid(),
																path:'SceneGraph.Model_ModelFile',
																filter:{
																	offset:0,
																	amount:1
																},
																callback:dojo.hitch(this,function(objs){
																	if(objs.length>0){
																		console.info('Creating '+obj_primitive.getEntity())
																		var urlmodel='file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime())+'&name='+objs[0].get('Name');//note: no leading /, urlencode !!!
																		console.log(urlmodel);
																		BABYLON.SceneLoader.LoadAssetContainerAsync(
																			'/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime()),
																			'&name='+objs[0].get('Name'),
																			this.scene
																		).then(
																			dojo.hitch(this,function(container){
																				container.meshes.forEach(dojo.hitch(this,function(mesh,meshidx){
																					mesh.position=new BABYLON.Vector3(x,y,z);
																					//mesh.position.x+=x;
																					//mesh.position.y+=y;
																					//mesh.position.z+=z;
																					mesh.scaling.x=sclx;
																					mesh.scaling.y=scly;
																					mesh.scaling.z=sclz;
																					//--------------------------------------------------------------------------------
																					//attach userdata
																					//--------------------------------------------------------------------------------
																					mesh.userdata={};
																					mesh.userdata.mxobject=obj_primitive;
																					//--------------------------------------------------------------------------------
																					//setup evt
																					//--------------------------------------------------------------------------------
																					mesh.actionManager=new BABYLON.ActionManager(this.scene);
																					mesh.actionManager.registerAction(
																						new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, 
																						dojo.hitch(this,function(event){
																							console.log('clicked');
																							var pickedMesh=event.meshUnderPointer; 
																							if(
																								pickedMesh!=null&&
																								pickedMesh.userdata!=null&&
																								pickedMesh.userdata.mxobject!=null&&
																								pickedMesh.userdata.mxobject.getGuid()!=null&&
																								this.str_primitive_click_mf!=null&&
																								this.str_primitive_click_mf!=''
																							){
																								this._execMf(
																									this.str_primitive_click_mf,
																									pickedMesh.userdata.mxobject.getGuid(),
																									dojo.hitch(this,function(){
																									})
																								);
																								//var hl = new BABYLON.HighlightLayer("hl1", this.scene);
																								//hl.addMesh(pickedMesh, BABYLON.Color3.Green());
																							}
																						}))
																					);
																					//--------------------------------------------------------------------------------
																				}));
																				mx.data.get({
																					guid:obj_primitive.getGuid(),
																					path:'SceneGraph.Texture',
																					filter:{
																						offset:0,
																						amount:1
																					},
																					callback:dojo.hitch(this,function(objs){
																						if(objs.length>0){
																							var url='/file?guid='+objs[0].getGuid()+'&cachebust='+(new Date().getTime());
																							var mat = new BABYLON.StandardMaterial("",this.scene);
																							mat.diffuseTexture = new BABYLON.Texture(url,this.scene);
																							container.meshes.forEach(dojo.hitch(this,function(mesh,meshidx){
																								mesh.material=mat;
																							}));
																						}else{}
																					}),
																					error:function(e){
																						console.error("Could not retrieve objects:",e);
																					}
																				});

																				container.addAllToScene();
																			})
																		);
																		//--------------------------------------------------------------------------------
																	}else{
																		console.error('Not Creating '+obj_primitive.getEntity()+': No heightmap')
																	}
																}),
																error:function(e){
																	console.error("Could not retrieve objects:",e);
																}
															});
															break;
	
														default:
															console.error('Invalid Primitive Entity Type')
															break;
													}
												}));
											}));
											this._datarendered=true;
										}),
										dojo.hitch(this,function(err){
											mx.ui.error(err.toString());
											this._datarendered=false;
										})
									);
								}),
								dojo.hitch(this,function(err){
									mx.ui.error(err.toString());
									this._datarendered=false;
								})
							);
						}
					} else {
						dojoStyle.set(this.domNode,"display","none");
						this._datarendered=false;
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
					console.log('----------------------------------------');
					console.log('main()');
					console.log('----------------------------------------');
					this.canvas=dojo.create(
						'canvas',
						{
							'width':this.int_canvas_width==null||this._int_canvas_width<0?320:this.int_canvas_width,
							'height':this.int_canvas_height==null||this._int_canvas_height<0?320:this.int_canvas_height
						}
					);
					this.canvasContainer.appendChild(this.canvas);
					this.engine=new BABYLON.Engine(this.canvas,true,{stencil:true});
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
					scene.onKeyboardObservable.add((kbInfo) => {
						switch (kbInfo.type) {
							case BABYLON.KeyboardEventTypes.KEYDOWN:
								console.log("KEY DOWN: ", kbInfo.event.key);
								break;
							case BABYLON.KeyboardEventTypes.KEYUP:
								console.log("KEY UP: ", kbInfo.event.keyCode);
								break;
						}
					});
					window.scene=scene;
					//BABYLON.SceneLoader.ImportMesh("", "/", "duck.gltf", this.scene, function (scene) { }, undefined, undefined, '.gltf');
					return scene;
				},
				loop:function(){ 
					this.scene.render();
				}
			}
		);
	}
);
