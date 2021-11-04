# HauntIslandMenu

Version: 1.0

Author: istjohn (Ienna St. John)

## Details
---
This is a standalone plugin which does not require any others.

This is a plugin written specifically for the HAUNT series first game, Haunt:Island. It overwrites the game's default main menu with one specific to this game, and also adds other game-specific data, including Clues, Corruption/Insight traits, and others.
  
This plugin expects that the only 2 playable characters/actors in the party will be named Charlotte and Henrik. The plugin's functionality will not work correctly if these names change.

## Setup
---
Place the file HauntIslandMenu.js in *project_root_folder/js/plugins* and the file Clues.json in *project_root_folder/data*.

Activate the plugin in RPG Maker MV by going to the Plugin Manager, adding an entry for HauntIslandMenu and setting status to "On". See plugin parameters for more info on configuration.

## Plugin Data
---
All possible in-game clues are to be defined in Clues.json, located in project_root/data. Then, it is the game's party that then "knows about" different defined clues. Party "learns" about defined clues via the plugin commands **DiscoverClue** & **DiscoverAllClues**. (More on those below in the commands section)

All character "story pictures" (the picture for a given character that is displayed in the main menu) are to be stored in *project_root/img/pictures*, and then defined in the corresponding plugin parameters, **Charlotte Story Pictures** & **Henrik Story Pictures**. The picture within that list that will be displayed for either character can be changed via the plugin command, **SetStorySoFarTextNumber** (more on that below, in commands section)
 
This plugin can interpret 2 "traits" in the game: *Corruption* and *Insight*. You can indicate which of these traits a charactor should use by editing that character's note within Database > Actors > Note. Enter **<traitType:Corruption\>** or **<traitType:Insight\>**, exactly like that.
 
## Plugin Parameters
---
- Starting Corruption -- The initial value of the Corruption trait, between 0.0 and 1.0
- Starting Insight -- The initial value of the Insight trait, between 0.0 and 1.0
- Trait Gauge Color 1 -- The color of the "filled" portion of the trait gauge bar, as a hex code
- Trait Gauge Color 2 -- The color of the "unfilled" portion of the trait gauge bar, as a hex code
- Charlotte Story Texts -- The list of texts for story so far text for Charlotte to be displayed on the main menu
- Henrik Story Texts -- The list of texts for story so far text for Henrik to be displayed on the main menu
- Charlotte Story Pictures -- The list of pictures of Charlotte to be displayed in the main menu
- Henrik Story Pictures -- The list of pictures of Henrik to be displayed in the main menu
  

## Plugin Commands
---
**AddToTraitLevel** *actorID* *amount* -- Used to add a given amount to the trait level of the actor with the given ID. Trait level can't be < 0.0 or > 1.0

Example: AddToTraitLevel 1 0.3

**SubtractFromTraitLevel** *actorID* *amount* -- Used to subtract a given amount from the trait level of the actor with the given ID. Trait level can't be < 0.0 or > 1.0

Example: SubtractFromTraitLevel 1 0.25

**SetTraitLevel** *actorID* *value* -- Used to directly set the value of the trait level of the actor with the given ID. Trait level can't be < 0.0 or > 1.0

Example: SetTraitLevel 2 1.0

**SetStorySoFarTextNumber** *actorID* *textNumber* -- Used to set the number of the story so far texts for the actor with the given ID that should be shown in the main menu.

actorID
: actor ID of Charlotte or Henrik

textNumber
: the number of the text in the Charlotte/Henrik Story Texts plugin parameter

Example: SetStorySoFarTextNumber 1 3

**SetStoryPictureNumber** *actorID* *pictureNumber* -- Used to set the number of the story picture for the actor with the given ID that should be shown in the main menu.

actor ID
: actor ID of Charlotte or Henrik

pictureNumber
: the number of the picture in the list Charlotte/Henrik Story Pictures plugin parameter

Example: SetStoryPictureNumber 2 5

**DiscoverClue** *clueNumber* -- Used to add the clue with the given number/ID to the party's list of known clues

Example: DiscoverClue 6

**DiscoverAllClues** -- Used to add ALL defined clues in data/Clues.json to the party's list of known clues. No arguments.
