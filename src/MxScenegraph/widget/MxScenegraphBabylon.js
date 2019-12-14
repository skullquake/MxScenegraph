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
								if(this._contextObj.getReference('Main.Scene_Camera')){
									mx.data.get({
										    guid:this._contextObj.getGuid(),
										    path:'Main.Scene_Camera',
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
														path:'Main.Node_Scene',
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
													console.log(rotx.toString());
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
															break;
														case 'Main.Plane':
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
															window.plane=plane;
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
																path:'Main.Texture',
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
															//--------------------------------------------------------------------------------
															//attach userdata
															//--------------------------------------------------------------------------------
															plane.userdata={};
															plane.userdata.mxobject=obj_primitive;
															//--------------------------------------------------------------------------------
															//setup evt
															//--------------------------------------------------------------------------------
															plane.actionManager=new BABYLON.ActionManager(this.scene);
															plane.actionManager.registerAction(
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
														case 'Main.Box':
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
															box.rotation.x=rotx;
															box.rotation.y=roty;
															box.rotation.z=rotz;
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
														case 'Main.Sphere':
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
															sphere.rotation.x=rotx;
															sphere.rotation.y=roty;
															sphere.rotation.z=rotz;
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
														case 'Main.Text':
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
				},
				//--------------------------------------------------------------------------------
				//color utils
				//--------------------------------------------------------------------------------
				RGBToHex:function(rgb){
					let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
					if (ex.test(rgb)) {
					// choose correct separator
						let sep = rgb.indexOf(",") > -1 ? "," : " ";
					// turn "rgb(r,g,b)" into [r,g,b]
						rgb = rgb.substr(4).split(")")[0].split(sep);

						// convert %s to 0–255
						for (let R in rgb) {
							let r = rgb[R];
							if (r.indexOf("%") > -1)
								rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
								/* Example:
								75% -> 191
								75/100 = 0.75, * 255 = 191.25 -> 191
								*/
						}

						let r = (+rgb[0]).toString(16),
							g = (+rgb[1]).toString(16),
							b = (+rgb[2]).toString(16);

						if (r.length == 1)
							r = "0" + r;
						if (g.length == 1)
							g = "0" + g;
						if (b.length == 1)
							b = "0" + b;
						
						return "#" + r + g + b;

					} else {
						return "Invalid input color";
					}
				},
				RGBAToHexA:function(rgba){
					let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
					if (ex.test(rgba)) {
						let sep = rgba.indexOf(",") > -1 ? "," : " ";
						rgba = rgba.substr(5).split(")")[0].split(sep);
						
						// strip the slash if using space-separated syntax
						if (rgba.indexOf("/") > -1)
							rgba.splice(3,1);

						for (let R in rgba) {
							let r = rgba[R];
							if (r.indexOf("%") > -1) {
								let p = r.substr(0,r.length - 1) / 100;

								if (R < 3) {
									rgba[R] = Math.round(p * 255);
								} else {
									rgba[R] = p;
								}
							}
						}

						let r = (+rgba[0]).toString(16),
							g = (+rgba[1]).toString(16),
							b = (+rgba[2]).toString(16),
							a = Math.round(+rgba[3] * 255).toString(16);
						
						if (r.length == 1)
							r = "0" + r;
						if (g.length == 1)
							g = "0" + g;
						if (b.length == 1)
							b = "0" + b;
						if (a.length == 1)
							a = "0" + a;
						
						return "#" + r + g + b + a;

					} else {
						return "Invalid input color";
					}
				},
				hexToRGB:function (h,isPct) {
					let ex = /^#([\da-f]{3}){1,2}$/i;
					if (ex.test(h)) {
						let r = 0, g = 0, b = 0;
						isPct = isPct === true;

						// 3 digits
						if (h.length == 4) {
							r = "0x" + h[1] + h[1];
							g = "0x" + h[2] + h[2];
							b = "0x" + h[3] + h[3];

						// 6 digits
						} else if (h.length == 7) {
							r = "0x" + h[1] + h[2];
							g = "0x" + h[3] + h[4];
							b = "0x" + h[5] + h[6];
						}
						if (isPct) {
							r = +(r / 255 * 100).toFixed(1);
							g = +(g / 255 * 100).toFixed(1);
							b = +(b / 255 * 100).toFixed(1);
						}
						return "rgb("+ (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";
					
					} else {
						return "Invalid input color";
					}
				},
				hexAToRGBA:function (h,isPct) {
					let ex = /^#([\da-f]{4}){1,2}$/i;
					if (ex.test(h)) {
						let r = 0, g = 0, b = 0, a = 1;
						isPct = isPct === true;

						if (h.length == 5) {
							r = "0x" + h[1] + h[1];
							g = "0x" + h[2] + h[2];
							b = "0x" + h[3] + h[3];
							a = "0x" + h[4] + h[4];

						} else if (h.length == 9) {
							r = "0x" + h[1] + h[2];
							g = "0x" + h[3] + h[4];
							b = "0x" + h[5] + h[6];
							a = "0x" + h[7] + h[8];
						}
						a = +(a / 255).toFixed(3);
						if (isPct) {
							r = +(r / 255 * 100).toFixed(1);
							g = +(g / 255 * 100).toFixed(1);
							b = +(b / 255 * 100).toFixed(1);
							a = +(a * 100).toFixed(1);
						}

						return "rgba("+ (isPct ? r + "%," + g + "%," + b + "%" + "," + a : +r + "," + +g + "," + +b + "," + a) + ")";

					} else {
						return "Invalid input color";
					}
				},
				RGBToHSL:function (rgb) {
					let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
					if (ex.test(rgb)) {
						let sep = rgb.indexOf(",") > -1 ? "," : " ";
						rgb = rgb.substr(4).split(")")[0].split(sep);
						
						// convert %s to 0–255
						for (let R in rgb) {
							let r = rgb[R];
							if (r.indexOf("%") > -1)
								rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
						}

						// make r, g, and b fractions of 1
						let r = rgb[0] / 255,
							g = rgb[1] / 255,
							b = rgb[2] / 255,

						// find greatest and smallest channel values
							cmin = Math.min(r,g,b),
							cmax = Math.max(r,g,b),
							delta = cmax - cmin,
							h = 0,
							s = 0,
							l = 0;

						// calculate hue
						// no difference
						if (delta == 0)
							h = 0;
						// red is max
						else if (cmax == r)
							h = ((g - b) / delta) % 6;
						// green is max
						else if (cmax == g)
							h = (b - r) / delta + 2;
						// blue is max
						else
							h = (r - g) / delta + 4;

						h = Math.round(h * 60);

						// make negative hues positive behind 360°
						if (h < 0)
							h += 360;

						// calculate lightness
						l = (cmax + cmin) / 2;

						// calculate saturation
						s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

						// multiply l and s by 100
						s = +(s * 100).toFixed(1);
						l = +(l * 100).toFixed(1);
						
						return "hsl(" + h + "," + s + "%," + l + "%)";

					} else {
						return "Invalid input color";
					}
				},
				RGBAToHSLA:function (rgba) {
					let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
					if (ex.test(rgba)) {
						let sep = rgba.indexOf(",") > -1 ? "," : " ";
						rgba = rgba.substr(5).split(")")[0].split(sep);
						
						// strip the slash if using space-separated syntax
						if (rgba.indexOf("/") > -1)
							rgba.splice(3,1);

						for (let R in rgba) {
							let r = rgba[R];
							if (r.indexOf("%") > -1) {
								let p = r.substr(0,r.length - 1) / 100;

								if (R < 3) {
									rgba[R] = Math.round(p * 255);
								}
							}
						}
						
						// make r, g, and b fractions of 1
						let r = rgba[0] / 255,
							g = rgba[1] / 255,
							b = rgba[2] / 255,
							a = rgba[3],
						
						// find greatest and smallest channel values
							cmin = Math.min(r,g,b),
							cmax = Math.max(r,g,b),
							delta = cmax - cmin,
							h = 0,
							s = 0,
							l = 0;

						// calculate hue
						// no difference
						if (delta == 0)
							h = 0;
						// red is max
						else if (cmax == r)
							h = ((g - b) / delta) % 6;
						// green is max
						else if (cmax == g)
							h = (b - r) / delta + 2;
						// blue is max
						else
							h = (r - g) / delta + 4;

						h = Math.round(h * 60);

						// make negative hues positive behind 360°
						if (h < 0)
							h += 360;
						
						// calculate lightness
						l = (cmax + cmin) / 2;

						// calculate saturation
						s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

						// multiply l and s by 100
						s = +(s * 100).toFixed(1);
						l = +(l * 100).toFixed(1);
						
						return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";

					} else {
						return "Invalid input color";
					}
				},
				HSLToRGB:function (hsl,isPct) {
					let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
					if (ex.test(hsl)) {
						let sep = hsl.indexOf(",") > -1 ? "," : " ";
						hsl = hsl.substr(4).split(")")[0].split(sep);
						isPct = isPct === true;

						let h = hsl[0],
							s = hsl[1].substr(0,hsl[1].length - 1) / 100,
							l = hsl[2].substr(0,hsl[2].length - 1) / 100;

						// strip label and convert to degrees (if necessary)
						if (h.indexOf("deg") > -1)
							h = h.substr(0,h.length - 3);
						else if (h.indexOf("rad") > -1)
							h = Math.round(h.substr(0,h.length - 3) / (2 * Math.PI) * 360);
						else if (h.indexOf("turn") > -1)
							h = Math.round(h.substr(0,h.length - 4) * 360);
						// keep hue fraction of 360 if ending up over
						if (h >= 360)
							h %= 360;
						
						let c = (1 - Math.abs(2 * l - 1)) * s,
							x = c * (1 - Math.abs((h / 60) % 2 - 1)),
							m = l - c/2,
							r = 0,
							g = 0,
							b = 0;
						
						if (0 <= h && h < 60) {
							r = c; g = x; b = 0;
						} else if (60 <= h && h < 120) {
							r = x; g = c; b = 0;
						} else if (120 <= h && h < 180) {
							r = 0; g = c; b = x;
						} else if (180 <= h && h < 240) {
							r = 0; g = x; b = c;
						} else if (240 <= h && h < 300) {
							r = x; g = 0; b = c;
						} else if (300 <= h && h < 360) {
							r = c; g = 0; b = x;
						}

						r = Math.round((r + m) * 255);
						g = Math.round((g + m) * 255);
						b = Math.round((b + m) * 255);

						if (isPct) {
							r = +(r / 255 * 100).toFixed(1);
							g = +(g / 255 * 100).toFixed(1);
							b = +(b / 255 * 100).toFixed(1);
						}

						return "rgb("+ (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";

					} else {
						return "Invalid input color";
					}
				},
				HSLAToRGBA:function (hsla,isPct) {
					let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
					if (ex.test(hsla)) {
						let sep = hsla.indexOf(",") > -1 ? "," : " ";
						hsla = hsla.substr(5).split(")")[0].split(sep);

						// strip the slash if using space-separated syntax
						if (hsla.indexOf("/") > -1)
							hsla.splice(3,1);

						isPct = isPct === true;

						// must be fractions of 1
						let h = hsla[0],
							s = hsla[1].substr(0,hsla[1].length-1) / 100,
							l = hsla[2].substr(0,hsla[2].length-1) / 100,
							a = hsla[3];
						
						// strip label and convert to degrees (if necessary)
						if (h.indexOf("deg") > -1)
							h = h.substr(0,h.length - 3);
						else if (h.indexOf("rad") > -1)
							h = Math.round(h.substr(0,h.length - 3) / (2 * Math.PI) * 360);
						else if (h.indexOf("turn") > -1)
							h = Math.round(h.substr(0,h.length - 4) * 360);
						if (h >= 360)
							h %= 360;

						let c = (1 - Math.abs(2 * l - 1)) * s,
							x = c * (1 - Math.abs((h / 60) % 2 - 1)),
							m = l - c/2,
							r = 0,
							g = 0,
							b = 0;
						
						if (0 <= h && h < 60) {
							r = c; g = x; b = 0;
						} else if (60 <= h && h < 120) {
							r = x; g = c; b = 0;
						} else if (120 <= h && h < 180) {
							r = 0; g = c; b = x;
						} else if (180 <= h && h < 240) {
							r = 0; g = x; b = c;
						} else if (240 <= h && h < 300) {
							r = x; g = 0; b = c;
						} else if (300 <= h && h < 360) {
							r = c; g = 0; b = x;
						}

						r = Math.round((r + m) * 255);
						g = Math.round((g + m) * 255);
						b = Math.round((b + m) * 255);

						let pctFound = a.indexOf("%") > -1;

						if (isPct) {
							r = +(r / 255 * 100).toFixed(1);
							g = +(g / 255 * 100).toFixed(1);
							b = +(b / 255 * 100).toFixed(1);
							if (!pctFound) {
								a *= 100;
							} else {
								a = a.substr(0,a.length - 1);
							}

						} else if (pctFound) {
							a = a.substr(0,a.length - 1) / 100;
						}
						
						return "rgba("+ (isPct ? r + "%," + g + "%," + b + "%," + a + "%" : +r + ","+ +g + "," + +b + "," + +a) + ")";

					} else {
						return "Invalid input color";
					}
				},
				hexToHSL:function (H) {
					let ex = /^#([\da-f]{3}){1,2}$/i;
					if (ex.test(H)) {
						// convert hex to RGB first
						let r = 0, g = 0, b = 0;
						if (H.length == 4) {
							r = "0x" + H[1] + H[1];
							g = "0x" + H[2] + H[2];
							b = "0x" + H[3] + H[3];
						} else if (H.length == 7) {
							r = "0x" + H[1] + H[2];
							g = "0x" + H[3] + H[4];
							b = "0x" + H[5] + H[6];
						}
						// then to HSL
						r /= 255;
						g /= 255;
						b /= 255;
						let cmin = Math.min(r,g,b),
							cmax = Math.max(r,g,b),
							delta = cmax - cmin,
							h = 0,
							s = 0,
							l = 0;

						if (delta == 0)
							h = 0;
						else if (cmax == r)
							h = ((g - b) / delta) % 6;
						else if (cmax == g)
							h = (b - r) / delta + 2;
						else
							h = (r - g) / delta + 4;

						h = Math.round(h * 60);

						if (h < 0)
							h += 360;

						l = (cmax + cmin) / 2;
						s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
						s = +(s * 100).toFixed(1);
						l = +(l * 100).toFixed(1);
						
						return "hsl(" + h + "," + s + "%," + l + "%)";

					} else {
						return "Invalid input color";
					}
				},
				hexAToHSLA:function (H) {
					let ex = /^#([\da-f]{4}){1,2}$/i;
					if (ex.test(H)) {
						let r = 0, g = 0, b = 0, a = 1;
						// 4 digits
						if (H.length == 5) {
							r = "0x" + H[1] + H[1];
							g = "0x" + H[2] + H[2];
							b = "0x" + H[3] + H[3];
							a = "0x" + H[4] + H[4];
						// 8 digits
						} else if (H.length == 9) {
							r = "0x" + H[1] + H[2];
							g = "0x" + H[3] + H[4];
							b = "0x" + H[5] + H[6];
							a = "0x" + H[7] + H[8];
						}
						
						// normal conversion to HSLA
						r /= 255;
						g /= 255;
						b /= 255;
						let cmin = Math.min(r,g,b),
							cmax = Math.max(r,g,b),
							delta = cmax - cmin,
							h = 0,
							s = 0,
							l = 0;

						if (delta == 0)
							h = 0;
						else if (cmax == r)
							h = ((g - b) / delta) % 6;
						else if (cmax == g)
							h = (b - r) / delta + 2;
						else
							h = (r - g) / delta + 4;

						h = Math.round(h * 60);

						if (h < 0)
							h += 360;

						l = (cmax + cmin) / 2;
						s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
						s = +(s * 100).toFixed(1);
						l = +(l * 100).toFixed(1);
						
						a = (a / 255).toFixed(3);
						
						return "hsla("+ h + "," + s + "%," + l + "%," + a + ")";

					} else {
						return "Invalid input color";
					}
				},
				HSLToHex:function (hsl) {
					let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
					if (ex.test(hsl)) {
						let sep = hsl.indexOf(",") > -1 ? "," : " ";
						hsl = hsl.substr(4).split(")")[0].split(sep);

						let h = hsl[0],
							s = hsl[1].substr(0,hsl[1].length - 1) / 100,
							l = hsl[2].substr(0,hsl[2].length - 1) / 100;
					
						// strip label and convert to degrees (if necessary)
						if (h.indexOf("deg") > -1)
							h = h.substr(0,h.length - 3);
						else if (h.indexOf("rad") > -1)
							h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
						else if (h.indexOf("turn") > -1)
							h = Math.round(h.substr(0,h.length - 4) * 360);
						if (h >= 360)
							h %= 360;
						
						let c = (1 - Math.abs(2 * l - 1)) * s,
							x = c * (1 - Math.abs((h / 60) % 2 - 1)),
							m = l - c/2,
							r = 0,
							g = 0,
							b = 0;
						
						if (0 <= h && h < 60) {
							r = c; g = x; b = 0;
						} else if (60 <= h && h < 120) {
							r = x; g = c; b = 0;
						} else if (120 <= h && h < 180) {
							r = 0; g = c; b = x;
						} else if (180 <= h && h < 240) {
							r = 0; g = x; b = c;
						} else if (240 <= h && h < 300) {
							r = x; g = 0; b = c;
						} else if (300 <= h && h < 360) {
							r = c; g = 0; b = x;
						}
						// having obtained RGB, convert channels to hex
						r = Math.round((r + m) * 255).toString(16);
						g = Math.round((g + m) * 255).toString(16);
						b = Math.round((b + m) * 255).toString(16);
						
						// prepend 0s if necessary
						if (r.length == 1)
							r = "0" + r;
						if (g.length == 1)
							g = "0" + g;
						if (b.length == 1)
							b = "0" + b;
						
						return "#" + r + g + b;

					} else {
						return "Invalid input color";
					}
				},
				HSLAToHexA:function (hsla) {
					let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
					if (ex.test(hsla)) {
						let sep = hsla.indexOf(",") > -1 ? "," : " ";
						hsla = hsla.substr(5).split(")")[0].split(sep);
						
						// strip the slash
						if (hsla.indexOf("/") > -1)
							hsla.splice(3,1);

						let h = hsla[0],
							s = hsla[1].substr(0,hsla[1].length - 1) / 100,
							l = hsla[2].substr(0,hsla[2].length - 1) / 100,
							a = hsla[3];
						
						// strip label and convert to degrees (if necessary)
						if (h.indexOf("deg") > -1)
							h = h.substr(0,h.length - 3);
						else if (h.indexOf("rad") > -1)
							h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
						else if (h.indexOf("turn") > -1)
							h = Math.round(h.substr(0,h.length - 4) * 360);
						if (h >= 360)
							h %= 360;

						// strip % from alpha, make fraction of 1 (if necessary)
						if (a.indexOf("%") > -1)
							a = a.substr(0,a.length - 1) / 100;
					
						let c = (1 - Math.abs(2 * l - 1)) * s,
							x = c * (1 - Math.abs((h / 60) % 2 - 1)),
							m = l - c/2,
							r = 0,
							g = 0,
							b = 0;
						
						if (0 <= h && h < 60) {
							r = c; g = x; b = 0;
						} else if (60 <= h && h < 120) {
							r = x; g = c; b = 0;
						} else if (120 <= h && h < 180) {
							r = 0; g = c; b = x;
						} else if (180 <= h && h < 240) {
							r = 0; g = x; b = c;
						} else if (240 <= h && h < 300) {
							r = x; g = 0; b = c;
						} else if (300 <= h && h < 360) {
							r = c; g = 0; b = x;
						}
						r = Math.round((r + m) * 255).toString(16);
						g = Math.round((g + m) * 255).toString(16);
						b = Math.round((b + m) * 255).toString(16);
						a = Math.round(a * 255).toString(16);
						
						if (r.length == 1)
							r = "0" + r;
						if (g.length == 1)
							g = "0" + g;
						if (b.length == 1)
							b = "0" + b;
						if (a.length == 1)
							a = "0" + a;
						
						return "#" + r + g + b + a;
					} else {
						return "Invalid input color";
					}
				}
			}
		);
	}
);
