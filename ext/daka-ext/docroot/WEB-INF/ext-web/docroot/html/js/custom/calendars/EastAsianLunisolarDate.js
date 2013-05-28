/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class EastAsianDateUTC extends IntlDateBase
EastAsianDateUTC.extend(IntlDateBase);
function EastAsianDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 22;
	this.base();
}

// EastAsianDateUTC Date.toEastAsianDate()
Date.prototype.toEastAsianDate = DateToEastAsianDate;
function DateToEastAsianDate(lateInit) {
	if (lateInit)
		return new EastAsianDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_eastAsian(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new EastAsianDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date EastAsianDateUTC.toDate()
EastAsianDateUTC.prototype.toDate = EastAsianDateToDate;
function EastAsianDateToDate() {
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
	ymd = eastAsian_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> EastAsianDateUTC.getLocaleDate(Date date)
EastAsianDateUTC.prototype.getLocaleDate = EastAsianDateGetLocaleDate;
function EastAsianDateGetLocaleDate(date) {
	return date.toEastAsianDate();
}

// override
// Boolean EastAsianDateUTC.validRange()
EastAsianDateUTC.prototype.validRange = EastAsianDateValidRange;
function EastAsianDateValidRange() {
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
// Number EastAsianDateUTC.getDaysInMonth(Number year, Number month)
EastAsianDateUTC.prototype.getDaysInMonth = EastAsianDateGetDaysInMonth;
function EastAsianDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean EastAsianDateUTC.isLeapYear(Number year)
EastAsianDateUTC.prototype.isLeapYear = EastAsianDateIsLeapYear;
function EastAsianDateIsLeapYear(year) {
	return;
}

// override
// String EastAsianDateUTC.toDateString()
EastAsianDateUTC.prototype.toDateString = EastAsianDateToDateString;
function EastAsianDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String EastAsianDateUTC.toTimeString()
EastAsianDateUTC.prototype.toTimeString = EastAsianDateToTimeString;
function EastAsianDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String EastAsianDateUTC.toString()
EastAsianDateUTC.prototype.toString = EastAsianDateToString;
function EastAsianDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String EastAsianDateUTC.toLocaleDateString()
EastAsianDateUTC.prototype.toLocaleDateString = EastAsianDateToLocaleDateString;
function EastAsianDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String EastAsianDateUTC.toLocaleTimeString()
EastAsianDateUTC.prototype.toLocaleTimeString = EastAsianDateToLocaleTimeString;
function EastAsianDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String EastAsianDateUTC.toLocaleString()
EastAsianDateUTC.prototype.toLocaleString = EastAsianDateToLocaleString;
function EastAsianDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String EastAsianDateUTC.toUTCString()
EastAsianDateUTC.prototype.toUTCString = EastAsianDateToUTCString;
function EastAsianDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_eastAsian(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function eastAsian_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
