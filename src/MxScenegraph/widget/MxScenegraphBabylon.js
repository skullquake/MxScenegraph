require(
	{
		packages:[
			{
				name:'babylonjs',
				location:'/widgets/MxScenegraph/lib/babylon.js',
				main:'babylon'
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
		'_earcut',
		'_tinycolorbabylonjs',
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
		_earcut,
		_tinycolor,
		widgetTemplate
	){
		"use strict";
		//--------------------------------------------------------------------------------
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//--------------------------------------------------------------------------------
		window.earcut=_earcut;
		require(
			{
				packages:[
					{
						name:'_meshwriter',
						location:'/widgets/MxScenegraph/lib/babylon.js',
						main:'meshwriter'
					}
				]
			},
			[
				'_meshwriter'
			],
			function(
				_meshwriter
			){}
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
													var visible=obj_primitive.get('visible')==null?true:obj_primitive.get('visible');
													switch(obj_primitive.getEntity()){
														case 'SceneGraph.Line':
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
															break;
														case 'SceneGraph.Plane':
															window.obj_primitive=obj_primitive;
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
															window.obj_primitive=obj_primitive;
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
															console.error('Creating '+obj_primitive.getEntity())
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
															console.error('Creating '+obj_primitive.getEntity())
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
															console.error('Creating '+obj_primitive.getEntity())
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
															console.error('Creating '+obj_primitive.getEntity())
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
																dojo.hitch(this,function(event){alert('asdf');
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
					return scene;
				},
				loop:function(){ 
					this.scene.render();
				}
			}
		);
	}
);
