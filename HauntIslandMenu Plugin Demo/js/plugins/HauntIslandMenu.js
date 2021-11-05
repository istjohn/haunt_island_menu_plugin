//=============================================================================
// HauntIslandMenu.js
//=============================================================================

/*:
 * @plugindesc Game-specific in-game menu for Haunt: Island, overrides default game menu.
 * @author Ienna St. John
 *
 * @param Screen Width
 * @desc Width of the game screen
 * @type number
 * @decimals 0
 * @default 1280
 *
 * @param Screen Height
 * @desc Height of the game screen
 * @type number
 * @decimals 0
 * @default 815
 *
 * @param Fullscreen
 * @type boolean
 * 
 * @param Starting Corruption
 * @desc The starting value of corruption trait (indicate that character uses this trait by entering "<traitType:Corruption>" in the actor's Note within the database.)
 * @type number
 * @default 0.0
 * @max 1.0
 * @min 0.0
 * @decimals 2
 *
 * @param Starting Insight
 * @desc The starting value of insight trait (indicate that character uses this trait by entering "<traitType:Insight>" in the actor's Note within the database.)
 * @type number
 * @default 0.0
 * @max 1.0
 * @min 0.0
 * @decimals 2
 *
 * @param Trait Gauge Color 1
 * @desc Color hex code for the filled portion of the Trait level gauge. (Default is a lightish blue)
 * @default #4B87BA
 *
 * @param Trait Gauge Color 2
 * @desc Color hex code for the unfilled portion of the Trait level gauge. (Default is white).
 * @default #FFFFFF
 * 
 * @param Charlotte Story Texts
 * @desc Charlotte's "story so far" texts displayed in the main menu.
 * @type note[]
 *
 * @param Henrik Story Texts
 * @desc Henrik's "story so far" texts displayed in the main menu.
 * @type note[]
 * 
 * @param Charlotte Story Pictures
 * @desc List of Charlotte's pictures to be displayed in the character panel of the main menu.
 * @type struct<StoryPicture>[]
 * 
 * @param Henrik Story Pictures
 * @desc List of Henrik's pictures to be displayed in the character panel of the main menu.
 * @type struct<StoryPicture>[]
 *
 * @help
 *
 * HauntIslandMenu
 * Version 1.0
 * istjohn (Ienna St. John)
 *
 * This is a standalone plugin which does not require any others.
 *
 * This is a plugin written specifically for the HAUNT series first game, Haunt:Island.
 * It overwrites the game's default main menu with one specific to this game, and also
 * adds other game-specific data, including Clues, Corruption/Insight traits, and others.
 * 
 * This plugin expects that the only 2 playable characters/actors in the party will be named
 * Charlotte and Henrik. The plugin's functionality will not work correctly if these names change.
 *
 * ==========================================================================
 *  Plugin Data
 * ==========================================================================
 * All possible in-game clues are to be defined in Clues.json, located in project_root/data. Then,
 * it is the game's party that then "knows about" different defined clues. Party "learns" about
 * defined clues via the plugin commands "DiscoverClue", "DiscoverAllClues". (More on those below
 * in the commands section)
 *
 * All character "story pictures" (the picture for a given character that is displayed in the main menu)
 * are to be stored in project_root/img/pictures, and then defined in the corresponding plugin parameters,
 * "Charlotte Story Pictures" & "Henrik Story Pictures". The picture within that list
 * that will be displayed for either character can be changed via the plugin command,
 * "SetStorySoFarTextNumber" (more on that below, in commands section)
 *
 * This plugin can interpret 2 "traits" in the game: Corruption and Insight. You can
 * indicate which of these traits a charactor should use by editing that character's
 * note within Database > Actors > Note. Enter <traitType:Corruption> or <traitType:Insight>,
 * exactly like that.
 *
 * ==========================================================================
 *  Plugin Parameters
 * ==========================================================================
 * Screen Width
 * Screen Height
 * Fullscreen
 * Starting Corruption
 *  The initial value of the Corruption trait, between 0.0 and 1.0
 * Starting Insight
 *  The initial value of the Insight trait, between 0.0 and 1.0
 * Trait Gauge Color 1
 *  The color of the "filled" portion of the trait gauge bar, as a hex code
 * Trait Gauge Color 2
 *  The color of the "unfilled" portion of the trait gauge bar, as a hex code
 * Charlotte Story Texts
 *  The list of texts for story so far text for Charlotte to be displayed on the main menu
 * Henrik Story Texts
 *  The list of texts for story so far text for Henrik to be displayed on the main menu
 * Charlotte Story Pictures
 *  The list of pictures of Charlotte to be displayed in the main menu
 * Henrik Story Pictures
 *  The list of pictures of Henrik to be displayed in the main menu
 * 
 * ==========================================================================
 *  Plugin Commands
 * ==========================================================================
 * 
 * AddToTraitLevel actorID amount
 *  Used to add a given amount to the trait level of the actor with the given ID. 
 *  Trait level can't be < 0.0 or > 1.0
 *  Example:
 *   AddToTraitLevel 1 0.3
 * 
 * SubtractFromTraitLevel actorID amount
 *  Used to subtract a given amount from the trait level of the actor with the given ID.
 *  Trait level can't be < 0.0 or > 1.0
 *  Example:
 *   SubtractFromTraitLevel 1 0.25
 *
 * SetTraitLevel actorID value
 *  Used to directly set the value of the trait level of the actor with the given ID.
 *  Trait level can't be < 0.0 or > 1.0
 *  Example:
 *   SetTraitLevel 2 1.0
 *
 * SetStorySoFarTextNumber actorID textNumber
 *  Used to set the number of the story so far texts for the actor with the given ID that should be shown in the main menu.
 *  actorID = actor ID of Charlotte or Henrik
 *  textNumber = the number of the text in the Charlotte/Henrik Story Texts plugin parameter
 *  Example:
 *   SetStorySoFarTextNumber 1 3
 *
 * SetStoryPictureNumber actorID pictureNumber
 *  Used to set the number of the story picture for the actor with the given ID that should be shown in the main menu
 *  actor ID = actor ID of Charlotte or Henrik
 *  pictureNumber = the number of the picture in the list Charlotte/Henrik Story Pictures plugin parameter
 *  Example:
 *   SetStoryPictureNumber 2 5
 *
 * DiscoverClue clueNumber
 *  Used to add the clue with the given number/ID to the party's list of known clues
 *  Example:
 *   DiscoverClue 7
 *
 * DiscoverAllClues
 *  Used to add ALL defined clues in data/Clues.json to the party's list of known clues. (Has no arguments, just type the command)
 *
 * SwapPartyLeader
 *  Used to swap the order of the playable party so that slot 1 becomes slot 2 and vice versa. In other words, makes 2nd actor in the party the leader.
 *
*/
/*~struct~StoryPicture:
 * @param Image
 * @type file
 * @dir img/pictures
 *
 * @param Width
 * @type number
 * @decimals 0
 * @desc Width of the source image
 *
 * @param Height
 * @type number
 * @decimals 0
 * @desc Height of the source image
 *
 * @param Display Width
 * @type number
 * @decimals 0
 * @desc Width of the image when displayed in the menu
 * @default 140
 *
 * @param Display Height
 * @type number
 * @decimals 0
 * @desc Height of the image when displayed in the menu
 * @default 600
 *
 */

(function() {

	//========== Plugin constants ==========
	const MENU_COMMANDS_SIZE = 200;

	//Parse/retrieve plugin parameters
	var parameters = PluginManager.parameters("HauntIslandMenu");
	var startingCorruption = parseFloat(parameters["Starting Corruption"]);
	var startingInsight = parseFloat(parameters["Starting Insight"]);
	var traitGaugeColor1 = String(parameters["Trait Gauge Color 1"]);
	var traitGaugeColor2 = String(parameters["Trait Gauge Color 2"]);
	var charlotteStoryTexts = parameters["Charlotte Story Texts"] ? JSON.parse(parameters["Charlotte Story Texts"]) : null;
	var henrikStoryTexts = parameters["Henrik Story Texts"] ? JSON.parse(parameters["Henrik Story Texts"]) : null;
	var charlotteStoryPictures = parameters["Charlotte Story Pictures"] ? JSON.parse(parameters["Charlotte Story Pictures"]) : null;
	var henrikStoryPictures = parameters["Henrik Story Pictures"] ? JSON.parse(parameters["Henrik Story Pictures"]) : null;
	var _screenWidth = parseInt(parameters["Screen Width"]);
	var _screenHeight = parseInt(parameters["Screen Height"]);
	var fullscreen = parameters["Fullscreen"] === "false" ? false : true;

	//=============================================================================
	// Scene_Boot
	//=============================================================================
	var _SBS = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		_SBS.call(this);
		if(fullscreen) {
			Graphics._switchFullScreen();
		}
	};
	
	//=============================================================================
	// Scene_Base_Create
	//=============================================================================
	var _SBC = Scene_Base.prototype.create;
	Scene_Base.prototype.create = function() {
		_SBC.call(this);
		Graphics.height    = _screenHeight;
		Graphics.width     = _screenWidth;
		Graphics.boxWidth  = _screenWidth;
		Graphics.boxHeight = _screenHeight;
	};

	//-----------------------------------------------------------------------------
	// Game_Party additions
	//-----------------------------------------------------------------------------
	var Game_Party_init = Game_Party.prototype.initialize;
	Game_Party.prototype.initialize = function() {
		Game_Party_init.call(this);
		//Holds all the defined clue IDs that the party knows about
		this._knownClues = [];
	};

	Game_Party.prototype.discoverClue = function(clueId) {
		var clue = $gameClues.clue(clueId);
		if(clue && !this._knownClues.contains(clue)) {
			this._knownClues.push($gameClues.clue(clueId));
		}
	};

	Game_Party.prototype.knownClues = function() {
		return this._knownClues;
	};

	//-----------------------------------------------------------------------------
	// Game_Actor additions
	//-----------------------------------------------------------------------------
	var Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		Game_Actor_setup.call(this, actorId);
		this.traitType = $dataActors[actorId].meta.traitType || null;

		//determine the starting value for the trait type this actor has
		if(this.traitType === "Corruption") {
			this.traitLevel = startingCorruption;
		} else if(this.traitType === "Insight") {
			this.traitLevel = startingInsight;
		} else {
			this.traitLevel = null;
		}
		this.storySoFarTextIndex = 0;
		this.storyPictureIndex = 0;
	};

	Game_Actor.prototype.addToTraitLevel = function(traitLevelDelta) {
		var newTraitLevel = Math.min(this.traitLevel + traitLevelDelta, 1.0);
		this.traitLevel = newTraitLevel;
	};

	Game_Actor.prototype.subtractFromTraitLevel = function(traitLevelDelta) {
		var newTraitLevel = Math.max(this.traitLevel - traitLevelDelta, 0.0);
		this.traitLevel = newTraitLevel;
	};

	Game_Actor.prototype.setTraitLevel = function(newTraitLevel) {
		this.traitLevel = Math.min(newTraitLevel, 1.0);
	};

	Game_Actor.prototype.setStorySoFarTextIndex = function(newTextIndex) {
		this.storySoFarTextIndex = newTextIndex;
	};

	Game_Actor.prototype.setStoryPictureIndex = function(newIndex) {
		this.storyPictureIndex = newIndex;
	};

	Game_Actor.prototype.storyPictures = function() {

		if(this.name() === "Charlotte") {
			return charlotteStoryPictures;
		} else if(this.name() === "Henrik") {
			return henrikStoryPictures;
		} else {
			return null;
		}
	};

	Game_Actor.prototype.storySoFarTexts = function() {
		if(this.name() === "Charlotte") {
			return charlotteStoryTexts;
		} else if(this.name() === "Henrik") {
			return henrikStoryTexts;
		} else {
			return null;
		}
	};

	Game_Actor.prototype.storySoFarText = function() {
		var text;
		
		storyTexts = this.storySoFarTexts();
		if(storyTexts) {
			return JSON.parse([this.storySoFarTextIndex]);
		} else {
			return "";
		}
	};

	//Define handling of any and all plugin commands
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		
		if(command === "AddToTraitLevel") {

			var actorId = parseInt(args[0]);
			var change = parseFloat(args[1]);

			$gameActors.actor(actorId).addToTraitLevel(change);

		} else if(command === "SubtractFromTraitLevel") {
			var actorId = parseInt(args[0]);
			var change = parseFloat(args[1]);

			$gameActors.actor(actorId).subtractFromTraitLevel(change);

		} else if(command === "SetTraitLevel") {
			var actorId = parseInt(args[0]);
			var newValue = parseFloat(args[1]);

			$gameActors.actor(actorId).setTraitLevel(newValue);
		
		} else if(command === "SetStorySoFarTextNumber") {
			var actorId = parseInt(args[0]);
			var textNum = parseInt(args[1]);

			$gameActors.actor(actorId).setStorySoFarTextIndex(textNum-1);
		
		} else if(command === "SetStoryPictureNumber") {
			var actorId = parseInt(args[0]);
			var num = parseInt(args[1]);

			$gameActors.actor(actorId).setStoryPictureIndex(num-1);
		
		} else if(command === "DiscoverClue") {
			$gameParty.discoverClue(parseInt(args[0]));
		
		} else if(command === "DiscoverAllClues") {
			for(var i = 0; i < $gameClues.clues().length; i++) {
				$gameParty.discoverClue(i);
			}
		} else if(command === "SwapPartyLeader") {
			$gameParty.swapOrder(0, 1);
			$gameParty.setMenuActor($gameParty.leader());
		}
	};


	//---------------------------------------------------------------
	// Game_Clue
	//
	// Class holding a single clue
	function Game_Clue() {
		this.initialize.apply(this, arguments);
	};

	Game_Clue.prototype.initialize = function(clue) {
		this._clueId = clue ? clue.id : 0;
		if(this._clueId > 0) {
			this._clueTitle = clue.title;
			this._clueText = clue.text;
		}
	};

	//---------------------------------------------------------------
	// Game_Clues
	//
	// Class containing all clue data for the game, wrapper class for an array of clues.
	function Game_Clues() {
		this.initialize.apply(this, arguments);
	};

	Game_Clues.prototype.initialize = function() {
		this._data = [];
		this.fillData();
	};

	Game_Clues.prototype.fillData = function() {
		$dataClues.forEach(function(clue) {
			this._data.push(new Game_Clue(clue));
		}, this);
	};

	Game_Clues.prototype.clue = function(clueId) {
		if($dataClues[clueId]) {
			if(!this._data[clueId]) {
				this._data[clueId] = new Game_Clue(clueId);
			}
			return this._data[clueId];
		}
		return null;
	};

	Game_Clues.prototype.clues = function() {
		return this._data;
	};

	Game_Clues.prototype.lastClue = function() {
		var lastIndex = this._data.length - 1;
		return this._data[lastIndex];
	};

	Game_Clues.createfromArray = function(arr) {
		var gameClues = new Game_Clues();
		gameClues._data = [...arr];
		return gameClues;
	};

	//-----------------------------------------------------------------------------
	// DataManager
	//-----------------------------------------------------------------------------
	//DataManager definitions to define corruption/insight levels as well as clues
	DataManager._databaseFiles.push({name: "$dataClues", src: "Clues.json"});

	var _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		_DataManager_createGameObjects.call(this);
		$gameClues = new Game_Clues();
	};

	//Aliases for methods to add to (for saving and loading)
	var _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
		var contents = _DataManager_makeSaveContents.call(this);
		contents.clues = $gameClues;
		return contents;
	};

	var _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
		_DataManager_extractSaveContents.call(this, contents);
		if(contents.clues instanceof Game_Clues) {
			$gameClues = contents.clues;
		} else {
			$gameClues = Game_Clues.createfromArray(contents.clues._data);
		}
	};

	Window_Base.prototype.wrapText = function(text, wrapAt) {
		var lines = [];
		var words = text.split(" ");
		var nextLine = "";

		words.forEach(function(word) {
			//If the total text width of every word already on the next line PLUS this next word is < our wrap limit, we add the word
			if(this.textWidth(nextLine + word + " ") < wrapAt) {
				nextLine += word;
				nextLine += " ";
			
			//Otherwise, adding this next word would make the line longer than the limit. End the line
			} else {
				nextLine += "\n";
			}

			//If we ended this line, or this was the last word, then we add it to our list of lines and prepare for the next line
			if(nextLine.endsWith("\n") || words.indexOf(word) == words.length-1) {
				lines.push(nextLine);

				//current word starts the next line
				nextLine = word + " ";
			}

		}, this);

		return lines;
	};

	Window_Base.prototype.prepareTextForWrapping = function(text) {
		if(text.contains("\n")) {
			return text.split("\n").join(" ");
		}
		return text;
	};


	//-----------------------------------------------------------------------------
	// Main menu overwriting
	//-----------------------------------------------------------------------------
	//Methods which will be bound to the custom game menu commands
	Scene_Menu.prototype.commandBackpack = function() {
		SceneManager.push(Scene_Backpack);
	};

	Scene_Menu.prototype.commandClues = function() {
		SceneManager.push(Scene_Clues);
	};

	Scene_Menu.prototype.create = function() {
    	Scene_MenuBase.prototype.create.call(this);
    	this.createCommandWindow();
    	this.createStatusWindow();
    };

    //Override the default menu creation to combine the desired defaults with the menu commands specific to Haunt
    Scene_Menu.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_MenuCommand(0, 0);
		this._commandWindow.setHandler('backpack', this.commandBackpack.bind(this));
		this._commandWindow.setHandler('clueList', this.commandClues.bind(this));
		this._commandWindow.setHandler('options', this.commandOptions.bind(this));
    	this._commandWindow.setHandler('save', this.commandSave.bind(this));
    	this._commandWindow.setHandler('gameEnd', this.commandGameEnd.bind(this));
    	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    	this.addWindow(this._commandWindow);
	};

	Scene_Menu.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_CharacterStatus(this._commandWindow.width, 0);
		this.addWindow(this._statusWindow);
	};

	Window_MenuCommand.prototype.windowWidth = function() {
        return MENU_COMMANDS_SIZE;
    };

    Window_MenuCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuCommand.prototype.numVisibleRows = function() {
        return 16;
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 100;
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        return 1;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 5;
    };

    //Override the default menu commands list to our game-specific ones
    Window_MenuCommand.prototype.makeCommandList = function() {
    	this.addCommand("Backpack", "backpack");
    	this.addCommand("Clues", "clueList");
    	this.addOptionsCommand();
    	this.addSaveCommand();
    	this.addGameEndCommand();
    };

    //-----------------------------------------------------------------------------
	// Game-specific windows & scenes for display in the main menu
	//-----------------------------------------------------------------------------
	//---------------------------------------------------------------
	// Window_CharacterStatus
	//
	// Window meant to replace menu status to display character information
	function Window_CharacterStatus() {
		this.initialize.apply(this, arguments);
	}
	Window_CharacterStatus.prototype = Object.create(Window_MenuStatus.prototype);
	Window_CharacterStatus.prototype.constructor = Window_CharacterStatus;
	Window_CharacterStatus.prototype.initialize = function(x, y) {
		Window_MenuStatus.prototype.initialize.call(this, x, y);
		$gameParty.setMenuActor($gameParty.members()[0]);
		this.refresh();
	};

	Window_CharacterStatus.prototype.refresh = function() {
		this.contents.clear();
		var actor = $gameParty.menuActor();
		var midX = (Graphics.width / 2) - 330;
		var rightSideX = midX + 300;
		this.drawActorName(actor, midX, 20, 120);
		this.drawActorBust(actor, rightSideX, 50);
		this.drawActorClass(actor, midX, 120, 120);
		this.drawTraitGauge(midX);

		var storyText = actor.storySoFarText();
		//Handle text wrapping for the story so far text. Wrap before it reaches the picture
		if(this.textWidth(storyText) > rightSideX) {
			storyText = this.prepareTextForWrapping(storyText);
			var textY = 200;
			var textLines = this.wrapText(storyText, rightSideX-10);
			textLines.forEach(function(textLine) {
				this.textWidth(textLine);
				this.drawTextEx(textLine, 0, textY);
				textY += 30;
			}, this);

		} else {
			this.drawTextEx(storyText, 0, 200);
		}
	};

	Window_CharacterStatus.prototype.drawTraitGauge = function(midX) {
		var actor = $gameParty.menuActor();
		if(actor.traitType) {
			this.drawGauge(midX, 60, 200, actor.traitLevel, traitGaugeColor1, traitGaugeColor2);
			//draw the label for the trait
			this.drawText(actor.traitType, midX - 77, 70, 75);
			//convert, then draw the number for the trait level
			//gauge measured in 0.0-1.0, convert that to percent.
			var levelPercent = actor.traitLevel * 100.00;
			var level = String(levelPercent) + "%";

			this.drawText(level, midX + 210, 70, 25);
		}
	};

	//todo - change this to use the storyPicture at the specified index
	Window_CharacterStatus.prototype.drawActorBust = function(actor, dx, dy) {

		if(actor.storyPictures()) {
			var storyPic = JSON.parse(actor.storyPictures()[actor.storyPictureIndex]);

			if(storyPic) {
				var bitmap = ImageManager.loadPicture(storyPic["Image"]);
				this.contents.bltImage(bitmap, 0, 0, storyPic["Width"], storyPic["Height"], dx, dy, storyPic["Display Width"], storyPic["Display Height"]);
			}	
		}
	};

	Window_CharacterStatus.prototype.windowWidth = function() {
		return Graphics.boxWidth - MENU_COMMANDS_SIZE;
	};

	Window_CharacterStatus.prototype.windowHeight = function() {
		return Graphics.boxHeight;
	};

	//-----------------------------------------------------------------------------
	//Scene_Backpack
	//
	//The scene class of the Backpack screen (which is just a simplified items screen), extends
	//Scene_ItemBase. 
	function Scene_Backpack() {
		this.initialize.apply(this, arguments);
	};
	Scene_Backpack.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Backpack.prototype.constructor = Scene_Backpack;

	Scene_Backpack.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Backpack.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._itemWindow = new Window_BackpackList(0, 0, Graphics.boxWidth, Graphics.boxHeight);
		this.addWindow(this._itemWindow);
	};

	Scene_Backpack.prototype.activateItemWindow = function() {
		this._itemWindow.refresh();
		this._itemWindow.activate();
	};

	Scene_Backpack.prototype.update = function() {
		Scene_MenuBase.prototype.update.call(this);
		if(Input.isTriggered("cancel")) SceneManager.pop();
	};

	//---------------------------------------------------------------
	// Window_BackpackList
	//
	// The window for the list of items within the backpack screen
	function Window_BackpackList() {
		this.initialize.apply(this, arguments);
	};
	
	Window_BackpackList.prototype = Object.create(Window_Selectable.prototype);
	Window_BackpackList.prototype.constructor = Window_BackpackList;
	
	Window_BackpackList.prototype.initialize = function(x, y, width, height) {
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
	};

	Window_BackpackList.prototype.maxCols = function() {
		return 1;
	};

	Window_BackpackList.prototype.spacing = function() {
		return 32;
	};

	Window_BackpackList.prototype.maxItems = function() {
		return this._data ? this._data.length : 1;
	};

	Window_BackpackList.prototype.item = function() {
		var index = this.index();
		return this._data && index >= 0 ? this._data[index] : null;
	};

	Window_BackpackList.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.item());
	};

	Window_BackpackList.prototype.isEnabled = function(item) {
		return $gameParty.hasItem(item);
	};

	Window_BackpackList.prototype.makeItemList = function() {
		this._data = $gameParty.allItems();
	};

	Window_BackpackList.prototype.selectLast = function() {
		var index = this._data.indexOf($gameParty.lastItem());
		this.select(index >= 0 ? index : 0);
	};

	Window_BackpackList.prototype.drawItem = function(index) {
		var item = this._data[index];
		if(item) {
			var numberWidth = this.numberWidth();
	        var rect = this.itemRect(index);
	        rect.width -= this.textPadding();
	        this.changePaintOpacity(this.isEnabled(item));
	        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
	        this.drawItemNumber(item, rect.x, rect.y, rect.width);
	        this.changePaintOpacity(1);
		}
	};

	Window_BackpackList.prototype.numberWidth = function() {
    	return this.textWidth('000');
	};

	Window_BackpackList.prototype.drawItemNumber = function(item, x, y, width) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
	};

	Window_BackpackList.prototype.refresh = function() {
		this.makeItemList();
		this.createContents();
		this.drawAllItems();
	};

	//---------------------------------------------------------------
	// Scene_Clues
	//
	// The scene class of the Clues (list) screen
	function Scene_Clues() {
		this.initialize.apply(this, arguments);
	};
	Scene_Clues.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Clues.prototype.constructor = Scene_Clues;
	
	Scene_Clues.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Clues.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._clueListWindow = new Window_ClueList();
		this._clueListWindow.setHandler('ok', this.onClueOk.bind(this));
		this._clueDetailsWindow = new Window_ClueDetails();
		this.addWindow(this._clueListWindow);
		this.addWindow(this._clueDetailsWindow);
	};

	Scene_Clues.prototype.onClueOk = function() {
		var index = this._clueListWindow.index();
		var clue = $gameClues.clues()[index];
		this._clueDetailsWindow.setClue(clue);
		//make sure list screen always remains active
		this._clueListWindow.activate();
	};

	Scene_Clues.prototype.update = function() {
		Scene_MenuBase.prototype.update.call(this);
		if(Input.isTriggered("cancel")) SceneManager.pop();
	};

	Scene_Clues.prototype.start = function() {
		Scene_MenuBase.prototype.start.call(this);
		this._clueListWindow.refresh();
	};

	//---------------------------------------------------------------
	// Window_ClueList
	//
	// Window for listing clues on the clues screen of the game menu.
	function Window_ClueList() {
		this.initialize.apply(this, arguments);
	};

	Window_ClueList.prototype = Object.create(Window_Selectable.prototype);
	Window_ClueList.prototype.constructor = Window_ClueList;

	Window_ClueList.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight/2);
		this._data = [];
		this.refresh();
		this.activate();
	};

	Window_ClueList.prototype.populate = function() {
		this._data = $gameParty.knownClues();
	};

	Window_ClueList.prototype.drawItem = function(index) {
		var clue = this._data[index];
		if(clue._clueTitle) {
			var rect = this.itemRectForText(index);
			this.drawText(clue._clueTitle, rect.x, rect.y, 600, 'left');	
		}
	};

	Window_ClueList.prototype.refresh = function() {
		this.populate();
		this.createContents();
		this.drawAllItems();
	};

	Window_ClueList.prototype.maxCols = function() {
		return 1;
	};

	Window_ClueList.prototype.spacing = function() {
		return 32;
	};

	Window_ClueList.prototype.drawAllItems = function() {
		for(var i = 0; i < this._data.length; i++) {
			this.drawItem(i);
		}
	};

	Window_ClueList.prototype.clue = function() {
		var index = this.index();
		return this._data && index >= 0 ? this._data[index] : null;
	};

	Window_ClueList.prototype.selectLast = function() {
		var index = this._data.indexOf($gameClues.lastClue());
		this.select(index >= 0 ? index : 0);
	};

	Window_ClueList.prototype.maxPageRows = function() {
		return 20;
	};

	Window_ClueList.prototype.maxCols = function() {
		return 1;
	};

	Window_ClueList.prototype.maxItems = function() {
		return this._data ? this._data.length : 0;
	};

	Window_ClueList.prototype.maxPageRows = function () {
		return 10;
	};

	Window_ClueList.prototype.maxPageItems = function () {
    	return this.maxPageRows() * this.maxCols();
	};


	//---------------------------------------------------------------
	// Window_ClueDetails
	//
	// Window for displaying info for a single clue.
	function Window_ClueDetails() {
		this.initialize.apply(this, arguments);
		this._clue = null;
	};

	Window_ClueDetails.prototype = Object.create(Window_Selectable.prototype);
	Window_ClueDetails.prototype.constructor = Window_ClueDetails;

	Window_ClueDetails.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, 0, (Graphics.boxHeight/2)-1, Graphics.boxWidth, Graphics.boxHeight/2);
	};

	Window_ClueDetails.prototype.setClue = function(clue) {
		if(this._clue !== clue) {
			this._clue = clue;
			this.refresh();
		}
	};

	Window_ClueDetails.prototype.refresh = function() {
		this.contents.clear();
		if(this._clue) {
			var clueText = this._clue._clueText;

			//if clue text width is greater than the window width, we need to break things up.
			//find the last space within the width of the window
			if(this.textWidth(clueText) > this.width) {

				//check if the text is already manually broken up with newlines. If it's manually broken up with newlines, but it's
				//still wider than the window, replace the newlines with spaces so we can handle things manually.
				clueText = this.prepareTextForWrapping(clueText);

				var textY = 20;
				var textLines = this.wrapText(clueText, this.width-10);
				textLines.forEach(function(textLine) {
					this.drawTextEx(textLine, 0, textY);
					textY += 30;
				}, this);

			//Otherwise, text fits within the window, just print it as is
			} else {
				this.drawTextEx(this._clue._clueText, 0, 20);
			}
		}
	};

})();