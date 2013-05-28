/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class JapaneseDateUTC extends IntlDateBase
JapaneseDateUTC.extend(IntlDateBase);
function JapaneseDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 24;
	this.base();
}

// JapaneseDateUTC Date.toJapaneseDate()
Date.prototype.toJapaneseDate = DateToJapaneseDate;
function DateToJapaneseDate(lateInit) {
	if (lateInit)
		return new JapaneseDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_japanese(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new JapaneseDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date JapaneseDateUTC.toDate()
JapaneseDateUTC.prototype.toDate = JapaneseDateToDate;
function JapaneseDateToDate() {
	if (this.msTime != null)
		return new Date(this.msTime);
	this.ensureFlat();
	if (!this.validRange())
		return null;
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = japanese_to_gregorian(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new Date(Date.UTC(year, month, day));
	if (year != date.getUTCFullYear() || month != date.getUTCMonth() ||
		day != date.getUTCDate())
		return null;
	date.setUTCHours(hr, min, sec, 0);
	return date;
}

// override
// <IntlDate> JapaneseDateUTC.getLocaleDate(Date date)
JapaneseDateUTC.prototype.getLocaleDate = JapaneseDateGetLocaleDate;
function JapaneseDateGetLocaleDate(date) {
	return date.toJapaneseDate();
}

// override
// Boolean JapaneseDateUTC.validRange()
JapaneseDateUTC.prototype.validRange = JapaneseDateValidRange;
function JapaneseDateValidRange() {
	var yrMin, yrMax, year, month, day, hr, min, sec;
	year = this.yr;
	month = this.mon + 1;
	day = this.day;
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return false;
	yrMin = 1700;
	yrMax = 2500;
	if ((year < yrMin || year > yrMax) ||
		(month < 1 || month > 12) ||
		(day < 1 || day > this.getDaysInMonth(year, month)))
		return false;
	return true;
}

// override
// Number JapaneseDateUTC.getDaysInMonth(Number year, Number month)
JapaneseDateUTC.prototype.getDaysInMonth = JapaneseDateGetDaysInMonth;
function JapaneseDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean JapaneseDateUTC.isLeapYear(Number year)
JapaneseDateUTC.prototype.isLeapYear = JapaneseDateIsLeapYear;
function JapaneseDateIsLeapYear(year) {
	return;
}

// override
// String JapaneseDateUTC.toDateString()
JapaneseDateUTC.prototype.toDateString = JapaneseDateToDateString;
function JapaneseDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String JapaneseDateUTC.toTimeString()
JapaneseDateUTC.prototype.toTimeString = JapaneseDateToTimeString;
function JapaneseDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String JapaneseDateUTC.toString()
JapaneseDateUTC.prototype.toString = JapaneseDateToString;
function JapaneseDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String JapaneseDateUTC.toLocaleDateString()
JapaneseDateUTC.prototype.toLocaleDateString = JapaneseDateToLocaleDateString;
function JapaneseDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JapaneseDateUTC.toLocaleTimeString()
JapaneseDateUTC.prototype.toLocaleTimeString = JapaneseDateToLocaleTimeString;
function JapaneseDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JapaneseDateUTC.toLocaleString()
JapaneseDateUTC.prototype.toLocaleString = JapaneseDateToLocaleString;
function JapaneseDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JapaneseDateUTC.toUTCString()
JapaneseDateUTC.prototype.toUTCString = JapaneseDateToUTCString;
function JapaneseDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_japanese(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function japanese_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
