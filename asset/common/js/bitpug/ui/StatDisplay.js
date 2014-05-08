goog.provide('bitpug.ui.StatDisplay');

goog.require('goog.ui.Component');
goog.require('goog.Timer');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
bitpug.ui.StatDisplay = function()
{
	goog.base(this);

	/**
	 * @type {Element}
	 * @private
	 */
	this.statDisplay_ = null;

	/**
	 * @type {Object}
	 * @private
	 */
	this.registry_ = bitpug.gameComponents.registry;

	/**
	 * @type {Number}
	 * @private
	 */
	this.gamePoints_ = 0;

	/**
	 * @type {Element}
	 * @private
	 */
	this.pointEl_ = null;

	/**
	 * @type {Number}
	 * @private
	 */
	this.gameLevel_ = 0;

	/**
	 * @type {Element}
	 * @private
	 */
	this.levelEl_ = null;
};
goog.inherits(bitpug.ui.StatDisplay, goog.ui.Component);

bitpug.ui.StatDisplay.prototype.init = function()
{
	// Stat display element tree (Modules)
	this.statDisplay_ = goog.dom.createDom('div', '', [
		goog.dom.createDom('div', 'deko-pug'),
		goog.dom.createDom('div', 'module points'), // Point section
		goog.dom.createDom('div', 'module level'),   // Level section
		goog.dom.createDom('div', 'module boost', [
			goog.dom.createDom('div', 'bar-wrapper', [
				goog.dom.createDom('div', 'bar empty')])]
		) // Boost section
	]);

	// Add boost module to components
	var boostModule = goog.dom.getElementByClass('boost',
		this.statDisplay_);
	this.registry_.addElement(boostModule, 'boost-cmp');

	// Get point el
	this.pointEl_ = goog.dom.getElementByClass('points',
		this.statDisplay_);

	// Get level el
	this.levelEl_ = goog.dom.getElementByClass('level',
		this.statDisplay_);

	// Add element to registry
	this.registry_.addElement(this.statDisplay_, 'stat-display');

	// Render display
	this.renderDisplay_();

	// Add point element to registry
	this.registry_.addElement(this.pointEl_, 'point-count-el');

	// Add level element to registry
	this.registry_.addElement(this.levelEl_, 'level-count-el');

	// Add Component
	bitpug.gameComponents.StatDisplay = this;
};

/**
 * @private
 */
bitpug.ui.StatDisplay.prototype.renderDisplay_ = function()
{
	// Append display element
	var gameField = this.registry_.getElement(
		'game-section')[0];
	gameField.appendChild(this.statDisplay_);
	goog.Timer.callOnce(function(){
		goog.dom.classes.enable(this.statDisplay_, 'visible', true);
	}, 0, this);

	// Set points to 0
	this.setGamePoints(0);
	this.setGameLevel(1);
};

/**
 * @param {Number} points
 */
bitpug.ui.StatDisplay.prototype.setGamePoints = function(points)
{
	this.pointEl_.innerHTML = points;
	this.gamePoints_ = points;
};

/**
 * @param {Number} points
 */
bitpug.ui.StatDisplay.prototype.setGameLevel = function(level)
{
	this.levelEl_.innerHTML = level;
	this.gameLevel_ = level;
};