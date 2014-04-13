goog.provide('bitpug.events.PointCounter');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {string} type
 */
bitpug.events.PointCounter = function(type, points)
{
	goog.base(this, type);

	/**
	 * @type {Number}
	 */
	this.points = points
};
goog.inherits(bitpug.events.PointCounter, goog.events.Event);

bitpug.events.PointCounter.EventType = {
	ADD: 'add'
};