var sceneJson = {
	"version": "0.4.0",
	"root": {
		"node": {
			"node": {
				"size": {
					"w": 0,
					"h": 0
				},
				"active": false,
				"anchorPoint": {
					"x": 0,
					"y": 0
				},
				"color": {
					"r": 255,
					"g": 255,
					"b": 255
				},
				"opacity": 255,
				"scale": {
					"x": 0.5682291666666718,
					"y": 0.5682291666666718
				},
				"groupIndex": 0,
				"components": {}
			}
		},
		"children": [
			{
				"node": {
					"size": {
						"w": 1280,
						"h": 720
					},
					"active": true,
					"name": "Canvas",
					"anchorPoint": {
						"x": 0.5,
						"y": 0.5
					},
					"color": {
						"r": 252,
						"g": 252,
						"b": 252
					},
					"opacity": 255,
					"position": {
						"x": 640,
						"y": 360
					},
					"rotation": 0,
					"scale": {
						"x": 1,
						"y": 1
					},
					"groupIndex": 0,
					"components": {}
				},
				"children": [
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "Main Camera",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 3080,
								"h": 1000
							},
							"active": true,
							"name": "background",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 5,
								"g": 176,
								"b": 250
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 3080,
										"h": 1000
									},
									"active": true,
									"name": "bg",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 5,
										"g": 176,
										"b": 250
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": 0
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/singleColor.png",
											"spriteType": "Sliced",
											"fillType": "Horizontal",
											"sizeMode": "Custom",
											"spriteInsets": {
												"top": 0,
												"left": 0,
												"bottom": 0,
												"right": 0
											}
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 792,
										"h": 764
									},
									"active": true,
									"name": "bgDecor-1.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": -700,
										"y": 0
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/bgDecor-1.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 734,
										"h": 805
									},
									"active": true,
									"name": "bgDecor2.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 754,
										"y": 0
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/bgDecor2.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 1102,
								"h": 630
							},
							"active": true,
							"name": "mainbg",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 1,
								"y": -35
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {
									"spriteFrameName": "images/mainBg.fw.png",
									"spriteType": "Simple",
									"fillType": "Horizontal",
									"sizeMode": "Trimmed"
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 56,
								"h": 57
							},
							"active": true,
							"name": "gray_circle.fw",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 466.7,
								"y": 206
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {
									"spriteFrameName": "images/gray_circle.fw.png",
									"spriteType": "Simple",
									"fillType": "Horizontal",
									"sizeMode": "Trimmed"
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 56,
								"h": 57
							},
							"active": true,
							"name": "gray_circle.fw",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": -478,
								"y": 206
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {
									"spriteFrameName": "images/gray_circle.fw.png",
									"spriteType": "Simple",
									"fillType": "Horizontal",
									"sizeMode": "Trimmed"
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 56,
								"h": 57
							},
							"active": true,
							"name": "red_circle_1",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": -477.5,
								"y": 205.2
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {
									"spriteFrameName": "images/red_circle.fw.png",
									"spriteType": "Simple",
									"fillType": "Horizontal",
									"sizeMode": "Trimmed"
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 56,
								"h": 57
							},
							"active": true,
							"name": "red_circle_2",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 467.5,
								"y": 206.2
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {
									"spriteFrameName": "images/red_circle.fw.png",
									"spriteType": "Simple",
									"fillType": "Horizontal",
									"sizeMode": "Trimmed"
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 788,
								"h": 621
							},
							"active": true,
							"name": "gridTouchPad",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 1,
							"position": {
								"x": -9,
								"y": -22
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 788,
								"h": 621
							},
							"active": true,
							"name": "gridTouchPadHightlight",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 1,
							"position": {
								"x": -9,
								"y": -22
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Sprite": {}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "grid",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": -32
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "hightlightLayer",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": -31
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 38,
										"h": 38
									},
									"active": true,
									"name": "cell_highlight",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 250,
										"g": 190,
										"b": 0
									},
									"opacity": 120,
									"position": {
										"x": 0,
										"y": 644
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "image/default_sprite_splash.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 223,
										"h": 44
									},
									"active": true,
									"name": "win_row",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 37,
										"y": 766
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/win_row.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 217,
										"h": 217
									},
									"active": true,
									"name": "win_row_diagonal",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 37,
										"y": 766
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/win_row-diagonal.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 277.05,
								"h": 40
							},
							"active": true,
							"name": "labelTimeout",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 209,
								"g": 0,
								"b": 0
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 114
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {
								"Label": {
									"fontSize": 30,
									"string": "PLAYER 1 TIMEOUT !",
									"horizontalAlignment": "Left",
									"verticalAlignment": "Top",
									"overflowType": "None",
									"enableWrap": true,
									"fontName": "creator/fonts/brlnsdb.ttf",
									"fontType": "TTF",
									"lineHeight": 40
								}
							}
						},
						"children": []
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "player1",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 102.9,
										"h": 24
									},
									"active": true,
									"name": "New Label",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": -477.6,
										"y": 45
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 24,
											"string": "PLAYER 1",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 24
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 90.49,
										"h": 22
									},
									"active": true,
									"name": "move",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 25,
										"g": 179,
										"b": 25
									},
									"opacity": 255,
									"position": {
										"x": -479.9,
										"y": 12.1
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 22,
											"string": "Move: 25",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontType": "System",
											"fontName": "arial"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 102.62,
										"h": 40
									},
									"active": true,
									"name": "time",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 235,
										"g": 255,
										"b": 0
									},
									"opacity": 255,
									"position": {
										"x": -480,
										"y": 133
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 40,
											"string": "00:45",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 40
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 25,
										"h": 25
									},
									"active": true,
									"name": "x.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": -480,
										"y": -26
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/x.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "player2",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 107.59,
										"h": 24
									},
									"active": true,
									"name": "New Label",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 471.6,
										"y": 45
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 24,
											"string": "PLAYER 2",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 24
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 90.49,
										"h": 22
									},
									"active": true,
									"name": "move",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 25,
										"g": 179,
										"b": 25
									},
									"opacity": 255,
									"position": {
										"x": 473.9,
										"y": 12.1
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 22,
											"string": "Move: 25",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontType": "System",
											"fontName": "arial"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 102.62,
										"h": 40
									},
									"active": true,
									"name": "time",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 235,
										"g": 255,
										"b": 0
									},
									"opacity": 255,
									"position": {
										"x": 474,
										"y": 133
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 40,
											"string": "00:45",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Center",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 40
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 28,
										"h": 25
									},
									"active": true,
									"name": "o.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 475,
										"y": -26
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/o.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "score",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 309
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 534,
										"h": 68
									},
									"active": true,
									"name": "scoreBar.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": 8
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/scoreBar.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 385.14,
										"h": 19
									},
									"active": true,
									"name": "intro",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 235,
										"b": 0
									},
									"opacity": 255,
									"position": {
										"x": 9,
										"y": -2
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 19,
											"string": "PLAYER 1                                              PLAYER 2",
											"horizontalAlignment": "Left",
											"verticalAlignment": "Top",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 19
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 148.89,
										"h": 60
									},
									"active": true,
									"name": "score",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 235,
										"b": 0
									},
									"opacity": 255,
									"position": {
										"x": 9,
										"y": 4
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 60,
											"string": "4  -  5",
											"horizontalAlignment": "Left",
											"verticalAlignment": "Top",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 60
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 203,
										"h": 65
									},
									"active": true,
									"name": "btnPause.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 378,
										"y": 8
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnPause.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "sample_nodes",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 808
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 28,
										"h": 25
									},
									"active": true,
									"name": "o",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": 0
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/o.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 25,
										"h": 25
									},
									"active": true,
									"name": "x",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": 0
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/x.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "layerHome",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 788,
										"h": 621
									},
									"active": true,
									"name": "nagscreen",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 0,
										"g": 0,
										"b": 0
									},
									"opacity": 72,
									"position": {
										"x": 0,
										"y": -30
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "image/default_sprite_splash.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 301,
										"h": 84
									},
									"active": true,
									"name": "btnNewGame",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -164
									},
									"rotation": 0,
									"scale": {
										"x": 1.1,
										"y": 1.1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnNewGame.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 359,
										"h": 97
									},
									"active": true,
									"name": "btnPlay",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -162
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnPlay.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Raw"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 274,
										"h": 77
									},
									"active": true,
									"name": "btnReset",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -273
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnReset.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 521,
										"h": 195
									},
									"active": true,
									"name": "win_panel",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": -19,
										"y": 85
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {}
								},
								"children": [
									{
										"node": {
											"size": {
												"w": 521,
												"h": 195
											},
											"active": true,
											"name": "bg",
											"anchorPoint": {
												"x": 0.5,
												"y": 0.5
											},
											"color": {
												"r": 255,
												"g": 255,
												"b": 255
											},
											"opacity": 255,
											"position": {
												"x": 0,
												"y": 0
											},
											"rotation": 0,
											"scale": {
												"x": 1,
												"y": 1
											},
											"groupIndex": 0,
											"components": {
												"Sprite": {
													"spriteFrameName": "images/win_panel.fw.png",
													"spriteType": "Simple",
													"fillType": "Horizontal",
													"sizeMode": "Trimmed"
												}
											}
										},
										"children": []
									},
									{
										"node": {
											"size": {
												"w": 261.42,
												"h": 30
											},
											"active": true,
											"name": "winlabel",
											"anchorPoint": {
												"x": 0.5,
												"y": 0.5
											},
											"color": {
												"r": 235,
												"g": 255,
												"b": 0
											},
											"opacity": 255,
											"position": {
												"x": 66,
												"y": 3
											},
											"rotation": 0,
											"scale": {
												"x": 1,
												"y": 1
											},
											"groupIndex": 0,
											"components": {
												"Label": {
													"fontSize": 30,
													"string": "WINNER: PLAYER 1",
													"horizontalAlignment": "Center",
													"verticalAlignment": "Top",
													"overflowType": "None",
													"enableWrap": true,
													"fontName": "creator/fonts/brlnsdb.ttf",
													"fontType": "TTF",
													"lineHeight": 30
												}
											}
										},
										"children": []
									}
								]
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "layerTut",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 38,
										"h": 38
									},
									"active": true,
									"name": "cell_highlight",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 250,
										"g": 190,
										"b": 0
									},
									"opacity": 120,
									"position": {
										"x": -1,
										"y": -31
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "image/default_sprite_splash.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 46,
										"h": 48
									},
									"active": true,
									"name": "iconHand",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 21,
										"y": -49
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/iconHand.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 177.13,
										"h": 60
									},
									"active": true,
									"name": "label",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 51,
										"g": 190,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": -0.6,
										"y": 70.2
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 30,
											"string": "Double touch\nto go",
											"horizontalAlignment": "Center",
											"verticalAlignment": "Top",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 30
										}
									}
								},
								"children": []
							}
						]
					},
					{
						"node": {
							"size": {
								"w": 0,
								"h": 0
							},
							"active": true,
							"name": "layerPause",
							"anchorPoint": {
								"x": 0.5,
								"y": 0.5
							},
							"color": {
								"r": 255,
								"g": 255,
								"b": 255
							},
							"opacity": 255,
							"position": {
								"x": 0,
								"y": 0
							},
							"rotation": 0,
							"scale": {
								"x": 1,
								"y": 1
							},
							"groupIndex": 0,
							"components": {}
						},
						"children": [
							{
								"node": {
									"size": {
										"w": 788,
										"h": 621
									},
									"active": true,
									"name": "nagscreen",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 0,
										"g": 0,
										"b": 0
									},
									"opacity": 129,
									"position": {
										"x": 0,
										"y": -30
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "image/default_sprite_splash.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 451,
										"h": 392
									},
									"active": true,
									"name": "bgPause.fw",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -72
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/bgPause.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 120.16,
										"h": 40
									},
									"active": true,
									"name": "BRLNSDB",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": 82
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Label": {
											"fontSize": 40,
											"string": "PAUSE",
											"horizontalAlignment": "Left",
											"verticalAlignment": "Top",
											"overflowType": "None",
											"enableWrap": true,
											"fontName": "creator/fonts/brlnsdb.ttf",
											"fontType": "TTF",
											"lineHeight": 40
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 274,
										"h": 77
									},
									"active": true,
									"name": "btnResume",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -6
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnResume.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 274,
										"h": 77
									},
									"active": true,
									"name": "btnNewGame",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -97
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnNewGame.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Custom"
										}
									}
								},
								"children": []
							},
							{
								"node": {
									"size": {
										"w": 274,
										"h": 77
									},
									"active": true,
									"name": "btnReset",
									"anchorPoint": {
										"x": 0.5,
										"y": 0.5
									},
									"color": {
										"r": 255,
										"g": 255,
										"b": 255
									},
									"opacity": 255,
									"position": {
										"x": 0,
										"y": -191.9
									},
									"rotation": 0,
									"scale": {
										"x": 1,
										"y": 1
									},
									"groupIndex": 0,
									"components": {
										"Sprite": {
											"spriteFrameName": "images/btnReset.fw.png",
											"spriteType": "Simple",
											"fillType": "Horizontal",
											"sizeMode": "Trimmed"
										}
									}
								},
								"children": []
							}
						]
					}
				]
			}
		]
	},
	"designResolution": {
		"w": 1280,
		"h": 720
	},
	"resolutionFitWidth": false,
	"resolutionFitHeight": true,
	"spriteFrames": [
		{
			"name": "images/singleColor.png",
			"texturePath": "creator/images/singleColor.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 2,
				"h": 2
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 2,
				"h": 2
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 2,
				"h": 2
			}
		},
		{
			"name": "images/bgDecor-1.fw.png",
			"texturePath": "creator/images/bgDecor-1.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 792,
				"h": 764
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 792,
				"h": 764
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 792,
				"h": 764
			}
		},
		{
			"name": "images/bgDecor2.fw.png",
			"texturePath": "creator/images/bgDecor2.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 734,
				"h": 805
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 734,
				"h": 805
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 734,
				"h": 805
			}
		},
		{
			"name": "images/mainBg.fw.png",
			"texturePath": "creator/images/mainBg.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 1102,
				"h": 630
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 1102,
				"h": 630
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 1102,
				"h": 630
			}
		},
		{
			"name": "images/gray_circle.fw.png",
			"texturePath": "creator/images/gray_circle.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 56,
				"h": 57
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 56,
				"h": 57
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 56,
				"h": 57
			}
		},
		{
			"name": "images/red_circle.fw.png",
			"texturePath": "creator/images/red_circle.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 56,
				"h": 57
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 56,
				"h": 57
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 56,
				"h": 57
			}
		},
		{
			"name": "image/default_sprite_splash.png",
			"texturePath": "creator/image/default_sprite_splash.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 2,
				"h": 2
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 2,
				"h": 2
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 2,
				"h": 2
			}
		},
		{
			"name": "images/win_row.fw.png",
			"texturePath": "creator/images/win_row.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 223,
				"h": 44
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 223,
				"h": 44
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 223,
				"h": 44
			}
		},
		{
			"name": "images/win_row-diagonal.fw.png",
			"texturePath": "creator/images/win_row-diagonal.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 217,
				"h": 217
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 217,
				"h": 217
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 217,
				"h": 217
			}
		},
		{
			"name": "images/x.fw.png",
			"texturePath": "creator/images/x.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 25,
				"h": 25
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 25,
				"h": 25
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 25,
				"h": 25
			}
		},
		{
			"name": "images/o.fw.png",
			"texturePath": "creator/images/o.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 28,
				"h": 25
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 28,
				"h": 25
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 28,
				"h": 25
			}
		},
		{
			"name": "images/scoreBar.fw.png",
			"texturePath": "creator/images/scoreBar.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 534,
				"h": 68
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 534,
				"h": 68
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 534,
				"h": 68
			}
		},
		{
			"name": "images/btnPause.fw.png",
			"texturePath": "creator/images/btnPause.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 203,
				"h": 65
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 203,
				"h": 65
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 203,
				"h": 65
			}
		},
		{
			"name": "images/btnNewGame.fw.png",
			"texturePath": "creator/images/btnNewGame.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 301,
				"h": 84
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 301,
				"h": 84
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 301,
				"h": 84
			}
		},
		{
			"name": "images/btnPlay.fw.png",
			"texturePath": "creator/images/btnPlay.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 359,
				"h": 97
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 359,
				"h": 97
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 359,
				"h": 97
			}
		},
		{
			"name": "images/btnReset.fw.png",
			"texturePath": "creator/images/btnReset.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 274,
				"h": 77
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 274,
				"h": 77
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 274,
				"h": 77
			}
		},
		{
			"name": "images/win_panel.fw.png",
			"texturePath": "creator/images/win_panel.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 521,
				"h": 195
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 521,
				"h": 195
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 521,
				"h": 195
			}
		},
		{
			"name": "images/iconHand.fw.png",
			"texturePath": "creator/images/iconHand.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 46,
				"h": 48
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 46,
				"h": 48
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 46,
				"h": 48
			}
		},
		{
			"name": "images/bgPause.fw.png",
			"texturePath": "creator/images/bgPause.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 451,
				"h": 286
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 451,
				"h": 286
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 451,
				"h": 286
			}
		},
		{
			"name": "images/btnResume.fw.png",
			"texturePath": "creator/images/btnResume.fw.png",
			"rect": {
				"x": 0,
				"y": 0,
				"w": 274,
				"h": 77
			},
			"offset": {
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"originalSize": {
				"w": 274,
				"h": 77
			},
			"centerRect": {
				"x": 0,
				"y": 0,
				"w": 274,
				"h": 77
			}
		}
	],
	"collisionMatrix": [
		{
			"value": [
				true
			]
		}
	]
}