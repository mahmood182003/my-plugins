/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class BuddhistDateUTC extends IntlDateBase
BuddhistDateUTC.extend(IntlDateBase);
function BuddhistDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 7;
	this.base();
}

// BuddhistDateUTC Date.toBuddhistDate()
Date.prototype.toBuddhistDate = DateToBuddhistDate;
function DateToBuddhistDate(lateInit) {
	if (lateInit)
		return new BuddhistDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_buddhist(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new BuddhistDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date BuddhistDateUTC.toDate()
BuddhistDateUTC.prototype.toDate = BuddhistDateToDate;
function BuddhistDateToDate() {
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
	ymd = buddhist_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> BuddhistDateUTC.getLocaleDate(Date date)
BuddhistDateUTC.prototype.getLocaleDate = BuddhistDateGetLocaleDate;
function BuddhistDateGetLocaleDate(date) {
	return date.toBuddhistDate();
}

// override
// Boolean BuddhistDateUTC.validRange()
BuddhistDateUTC.prototype.validRange = BuddhistDateValidRange;
function BuddhistDateValidRange() {
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
// Number BuddhistDateUTC.getDaysInMonth(Number year, Number month)
BuddhistDateUTC.prototype.getDaysInMonth = BuddhistDateGetDaysInMonth;
function BuddhistDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean BuddhistDateUTC.isLeapYear(Number year)
BuddhistDateUTC.prototype.isLeapYear = BuddhistDateIsLeapYear;
function BuddhistDateIsLeapYear(year) {
	return;
}

// override
// String BuddhistDateUTC.toDateString()
BuddhistDateUTC.prototype.toDateString = BuddhistDateToDateString;
function BuddhistDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String BuddhistDateUTC.toTimeString()
BuddhistDateUTC.prototype.toTimeString = BuddhistDateToTimeString;
function BuddhistDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String BuddhistDateUTC.toString()
BuddhistDateUTC.prototype.toString = BuddhistDateToString;
function BuddhistDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String BuddhistDateUTC.toLocaleDateString()
BuddhistDateUTC.prototype.toLocaleDateString = BuddhistDateToLocaleDateString;
function BuddhistDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String BuddhistDateUTC.toLocaleTimeString()
BuddhistDateUTC.prototype.toLocaleTimeString = BuddhistDateToLocaleTimeString;
function BuddhistDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String BuddhistDateUTC.toLocaleString()
BuddhistDateUTC.prototype.toLocaleString = BuddhistDateToLocaleString;
function BuddhistDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String BuddhistDateUTC.toUTCString()
BuddhistDateUTC.prototype.toUTCString = BuddhistDateToUTCString;
function BuddhistDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_buddhist(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function buddhist_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
