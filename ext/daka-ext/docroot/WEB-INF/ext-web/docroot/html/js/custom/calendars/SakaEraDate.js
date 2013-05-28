/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class SakaEraDateUTC extends IntlDateBase
SakaEraDateUTC.extend(IntlDateBase);
function SakaEraDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 16;
	this.base();
}

// SakaEraDateUTC Date.toSakaEraDate()
Date.prototype.toSakaEraDate = DateToSakaEraDate;
function DateToSakaEraDate(lateInit) {
	if (lateInit)
		return new SakaEraDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_sakaEra(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new SakaEraDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date SakaEraDateUTC.toDate()
SakaEraDateUTC.prototype.toDate = SakaEraDateToDate;
function SakaEraDateToDate() {
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
	ymd = sakaEra_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> SakaEraDateUTC.getLocaleDate(Date date)
SakaEraDateUTC.prototype.getLocaleDate = SakaEraDateGetLocaleDate;
function SakaEraDateGetLocaleDate(date) {
	return date.toSakaEraDate();
}

// override
// Boolean SakaEraDateUTC.validRange()
SakaEraDateUTC.prototype.validRange = SakaEraDateValidRange;
function SakaEraDateValidRange() {
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
// Number SakaEraDateUTC.getDaysInMonth(Number year, Number month)
SakaEraDateUTC.prototype.getDaysInMonth = SakaEraDateGetDaysInMonth;
function SakaEraDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean SakaEraDateUTC.isLeapYear(Number year)
SakaEraDateUTC.prototype.isLeapYear = SakaEraDateIsLeapYear;
function SakaEraDateIsLeapYear(year) {
	return;
}

// override
// String SakaEraDateUTC.toDateString()
SakaEraDateUTC.prototype.toDateString = SakaEraDateToDateString;
function SakaEraDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String SakaEraDateUTC.toTimeString()
SakaEraDateUTC.prototype.toTimeString = SakaEraDateToTimeString;
function SakaEraDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String SakaEraDateUTC.toString()
SakaEraDateUTC.prototype.toString = SakaEraDateToString;
function SakaEraDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String SakaEraDateUTC.toLocaleDateString()
SakaEraDateUTC.prototype.toLocaleDateString = SakaEraDateToLocaleDateString;
function SakaEraDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String SakaEraDateUTC.toLocaleTimeString()
SakaEraDateUTC.prototype.toLocaleTimeString = SakaEraDateToLocaleTimeString;
function SakaEraDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String SakaEraDateUTC.toLocaleString()
SakaEraDateUTC.prototype.toLocaleString = SakaEraDateToLocaleString;
function SakaEraDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String SakaEraDateUTC.toUTCString()
SakaEraDateUTC.prototype.toUTCString = SakaEraDateToUTCString;
function SakaEraDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_sakaEra(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function sakaEra_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
