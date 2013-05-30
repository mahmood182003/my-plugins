/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class HebrewDateUTC extends IntlDateBase
HebrewDateUTC.extend(IntlDateBase);
function HebrewDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 8;
	this.base();
}

// HebrewDateUTC Date.toHebrewDate()
Date.prototype.toHebrewDate = DateToHebrewDate;
function DateToHebrewDate(lateInit) {
	if (lateInit)
		return new HebrewDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_hebrew(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new HebrewDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date HebrewDateUTC.toDate()
HebrewDateUTC.prototype.toDate = HebrewDateToDate;
function HebrewDateToDate() {
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
	ymd = hebrew_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> HebrewDateUTC.getLocaleDate(Date date)
HebrewDateUTC.prototype.getLocaleDate = HebrewDateGetLocaleDate;
function HebrewDateGetLocaleDate(date) {
	return date.toHebrewDate();
}

// override
// Boolean HebrewDateUTC.validRange()
HebrewDateUTC.prototype.validRange = HebrewDateValidRange;
function HebrewDateValidRange() {
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
// Number HebrewDateUTC.getDaysInMonth(Number year, Number month)
HebrewDateUTC.prototype.getDaysInMonth = HebrewDateGetDaysInMonth;
function HebrewDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean HebrewDateUTC.isLeapYear(Number year)
HebrewDateUTC.prototype.isLeapYear = HebrewDateIsLeapYear;
function HebrewDateIsLeapYear(year) {
	return;
}

// override
// String HebrewDateUTC.toDateString()
HebrewDateUTC.prototype.toDateString = HebrewDateToDateString;
function HebrewDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String HebrewDateUTC.toTimeString()
HebrewDateUTC.prototype.toTimeString = HebrewDateToTimeString;
function HebrewDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String HebrewDateUTC.toString()
HebrewDateUTC.prototype.toString = HebrewDateToString;
function HebrewDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String HebrewDateUTC.toLocaleDateString()
HebrewDateUTC.prototype.toLocaleDateString = HebrewDateToLocaleDateString;
function HebrewDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HebrewDateUTC.toLocaleTimeString()
HebrewDateUTC.prototype.toLocaleTimeString = HebrewDateToLocaleTimeString;
function HebrewDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HebrewDateUTC.toLocaleString()
HebrewDateUTC.prototype.toLocaleString = HebrewDateToLocaleString;
function HebrewDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HebrewDateUTC.toUTCString()
HebrewDateUTC.prototype.toUTCString = HebrewDateToUTCString;
function HebrewDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_hebrew(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function hebrew_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
