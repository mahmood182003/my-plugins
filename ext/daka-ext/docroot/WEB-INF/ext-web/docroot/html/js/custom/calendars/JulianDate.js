
/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class JulianDateUTC extends IntlDateBase
JulianDateUTC.extend(IntlDateBase);
function JulianDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 26;
	this.base();
}

// JulianDateUTC Date.toJulianDate()
Date.prototype.toJulianDate = DateToJulianDate;
function DateToJulianDate(lateInit) {
	if (lateInit)
		return new JulianDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_julian(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new JulianDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date JulianDateUTC.toDate()
JulianDateUTC.prototype.toDate = JulianDateToDate;
function JulianDateToDate() {
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
	ymd = julian_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> JulianDateUTC.getLocaleDate(Date date)
JulianDateUTC.prototype.getLocaleDate = JulianDateGetLocaleDate;
function JulianDateGetLocaleDate(date) {
	return date.toJulianDate();
}

// override
// Boolean JulianDateUTC.validRange()
JulianDateUTC.prototype.validRange = JulianDateValidRange;
function JulianDateValidRange() {
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
// Number JulianDateUTC.getDaysInMonth(Number year, Number month)
JulianDateUTC.prototype.getDaysInMonth = JulianDateGetDaysInMonth;
function JulianDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean JulianDateUTC.isLeapYear(Number year)
JulianDateUTC.prototype.isLeapYear = JulianDateIsLeapYear;
function JulianDateIsLeapYear(year) {
	return;
}

// override
// String JulianDateUTC.toDateString()
JulianDateUTC.prototype.toDateString = JulianDateToDateString;
function JulianDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String JulianDateUTC.toTimeString()
JulianDateUTC.prototype.toTimeString = JulianDateToTimeString;
function JulianDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String JulianDateUTC.toString()
JulianDateUTC.prototype.toString = JulianDateToString;
function JulianDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String JulianDateUTC.toLocaleDateString()
JulianDateUTC.prototype.toLocaleDateString = JulianDateToLocaleDateString;
function JulianDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JulianDateUTC.toLocaleTimeString()
JulianDateUTC.prototype.toLocaleTimeString = JulianDateToLocaleTimeString;
function JulianDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JulianDateUTC.toLocaleString()
JulianDateUTC.prototype.toLocaleString = JulianDateToLocaleString;
function JulianDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String JulianDateUTC.toUTCString()
JulianDateUTC.prototype.toUTCString = JulianDateToUTCString;
function JulianDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_julian(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function julian_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
