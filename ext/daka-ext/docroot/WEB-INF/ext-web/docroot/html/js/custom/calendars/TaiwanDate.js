/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class TaiwanDateUTC extends IntlDateBase
TaiwanDateUTC.extend(IntlDateBase);
function TaiwanDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 30;
	this.base();
}

// TaiwanDateUTC Date.toTaiwanDate()
Date.prototype.toTaiwanDate = DateToTaiwanDate;
function DateToTaiwanDate(lateInit) {
	if (lateInit)
		return new TaiwanDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_taiwan(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new TaiwanDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date TaiwanDateUTC.toDate()
TaiwanDateUTC.prototype.toDate = TaiwanDateToDate;
function TaiwanDateToDate() {
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
	ymd = taiwan_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> TaiwanDateUTC.getLocaleDate(Date date)
TaiwanDateUTC.prototype.getLocaleDate = TaiwanDateGetLocaleDate;
function TaiwanDateGetLocaleDate(date) {
	return date.toTaiwanDate();
}

// override
// Boolean TaiwanDateUTC.validRange()
TaiwanDateUTC.prototype.validRange = TaiwanDateValidRange;
function TaiwanDateValidRange() {
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
// Number TaiwanDateUTC.getDaysInMonth(Number year, Number month)
TaiwanDateUTC.prototype.getDaysInMonth = TaiwanDateGetDaysInMonth;
function TaiwanDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean TaiwanDateUTC.isLeapYear(Number year)
TaiwanDateUTC.prototype.isLeapYear = TaiwanDateIsLeapYear;
function TaiwanDateIsLeapYear(year) {
	return;
}

// override
// String TaiwanDateUTC.toDateString()
TaiwanDateUTC.prototype.toDateString = TaiwanDateToDateString;
function TaiwanDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String TaiwanDateUTC.toTimeString()
TaiwanDateUTC.prototype.toTimeString = TaiwanDateToTimeString;
function TaiwanDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String TaiwanDateUTC.toString()
TaiwanDateUTC.prototype.toString = TaiwanDateToString;
function TaiwanDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String TaiwanDateUTC.toLocaleDateString()
TaiwanDateUTC.prototype.toLocaleDateString = TaiwanDateToLocaleDateString;
function TaiwanDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String TaiwanDateUTC.toLocaleTimeString()
TaiwanDateUTC.prototype.toLocaleTimeString = TaiwanDateToLocaleTimeString;
function TaiwanDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String TaiwanDateUTC.toLocaleString()
TaiwanDateUTC.prototype.toLocaleString = TaiwanDateToLocaleString;
function TaiwanDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String TaiwanDateUTC.toUTCString()
TaiwanDateUTC.prototype.toUTCString = TaiwanDateToUTCString;
function TaiwanDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_taiwan(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function taiwan_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.

