/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class UmAlQuraDateUTC extends IntlDateBase
UmAlQuraDateUTC.extend(IntlDateBase);
function UmAlQuraDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 32;
	this.base();
}

// UmAlQuraDateUTC Date.toUmAlQuraDate()
Date.prototype.toUmAlQuraDate = DateToUmAlQuraDate;
function DateToUmAlQuraDate(lateInit) {
	if (lateInit)
		return new UmAlQuraDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_umAlQura(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new UmAlQuraDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date UmAlQuraDateUTC.toDate()
UmAlQuraDateUTC.prototype.toDate = UmAlQuraDateToDate;
function UmAlQuraDateToDate() {
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
	ymd = umAlQura_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> UmAlQuraDateUTC.getLocaleDate(Date date)
UmAlQuraDateUTC.prototype.getLocaleDate = UmAlQuraDateGetLocaleDate;
function UmAlQuraDateGetLocaleDate(date) {
	return date.toUmAlQuraDate();
}

// override
// Boolean UmAlQuraDateUTC.validRange()
UmAlQuraDateUTC.prototype.validRange = UmAlQuraDateValidRange;
function UmAlQuraDateValidRange() {
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
// Number UmAlQuraDateUTC.getDaysInMonth(Number year, Number month)
UmAlQuraDateUTC.prototype.getDaysInMonth = UmAlQuraDateGetDaysInMonth;
function UmAlQuraDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean UmAlQuraDateUTC.isLeapYear(Number year)
UmAlQuraDateUTC.prototype.isLeapYear = UmAlQuraDateIsLeapYear;
function UmAlQuraDateIsLeapYear(year) {
	return;
}

// override
// String UmAlQuraDateUTC.toDateString()
UmAlQuraDateUTC.prototype.toDateString = UmAlQuraDateToDateString;
function UmAlQuraDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String UmAlQuraDateUTC.toTimeString()
UmAlQuraDateUTC.prototype.toTimeString = UmAlQuraDateToTimeString;
function UmAlQuraDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String UmAlQuraDateUTC.toString()
UmAlQuraDateUTC.prototype.toString = UmAlQuraDateToString;
function UmAlQuraDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String UmAlQuraDateUTC.toLocaleDateString()
UmAlQuraDateUTC.prototype.toLocaleDateString = UmAlQuraDateToLocaleDateString;
function UmAlQuraDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String UmAlQuraDateUTC.toLocaleTimeString()
UmAlQuraDateUTC.prototype.toLocaleTimeString = UmAlQuraDateToLocaleTimeString;
function UmAlQuraDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String UmAlQuraDateUTC.toLocaleString()
UmAlQuraDateUTC.prototype.toLocaleString = UmAlQuraDateToLocaleString;
function UmAlQuraDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String UmAlQuraDateUTC.toUTCString()
UmAlQuraDateUTC.prototype.toUTCString = UmAlQuraDateToUTCString;
function UmAlQuraDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_umAlQura(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function umAlQura_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.

