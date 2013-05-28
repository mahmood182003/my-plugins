/*
	Calendar calculations for this IntlDate object are not
	implemented yet. This file is only a template to give you
	an idea on how to complete this code. Please take a look
	at PersianDate.js for an example of a working calendar.
*/

// Import IntlDate.js

// class HijriDateUTC extends IntlDateBase
HijriDateUTC.extend(IntlDateBase);
function HijriDateUTC(year, month, day, hr, min, sec)
{
	this.caltype = 6;
	this.base();
}

// HijriDateUTC Date.toHijriDate()
Date.prototype.toHijriDate = DateToHijriDate;
function DateToHijriDate(lateInit) {
	if (lateInit)
		return new HijriDateUTC(this.getTime());
	var year, month, day, hr, min, sec, ymd;
	year = this.getUTCFullYear();
	month = this.getUTCMonth();
	day = this.getUTCDate();
	hr = this.getUTCHours();
	min = this.getUTCMinutes();
	sec = this.getUTCSeconds();
	ymd = gregorian_to_hijri(new Array(year, month+1, day));
	year = ymd[0]; month = ymd[1]-1; day = ymd[2];
	if (isNaN(year) || isNaN(month) || isNaN(day))
		return null;
	var date = new HijriDateUTC(year, month, day, hr, min, sec);
	date.msTime = this.getTime();
	date.dow = this.getUTCDay();
	return date;
}

// override
// Date HijriDateUTC.toDate()
HijriDateUTC.prototype.toDate = HijriDateToDate;
function HijriDateToDate() {
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
	ymd = hijri_to_gregorian(new Array(year, month+1, day));
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
// <IntlDate> HijriDateUTC.getLocaleDate(Date date)
HijriDateUTC.prototype.getLocaleDate = HijriDateGetLocaleDate;
function HijriDateGetLocaleDate(date) {
	return date.toHijriDate();
}

// override
// Boolean HijriDateUTC.validRange()
HijriDateUTC.prototype.validRange = HijriDateValidRange;
function HijriDateValidRange() {
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
// Number HijriDateUTC.getDaysInMonth(Number year, Number month)
HijriDateUTC.prototype.getDaysInMonth = HijriDateGetDaysInMonth;
function HijriDateGetDaysInMonth(year, month) {
	return;
}

// override
// Boolean HijriDateUTC.isLeapYear(Number year)
HijriDateUTC.prototype.isLeapYear = HijriDateIsLeapYear;
function HijriDateIsLeapYear(year) {
	return;
}

// override
// String HijriDateUTC.toDateString()
HijriDateUTC.prototype.toDateString = HijriDateToDateString;
function HijriDateToDateString()
{
	return this.getFullYear() +"/"+ (this.getMonth()+1) +"/"+ this.getDate();
}

// override
// String HijriDateUTC.toTimeString()
HijriDateUTC.prototype.toTimeString = HijriDateToTimeString;
function HijriDateToTimeString()
{
	return this.getHours() +":"+ this.getMinutes() +":"+ this.getSeconds();
}

// override
// String HijriDateUTC.toString()
HijriDateUTC.prototype.toString = HijriDateToString;
function HijriDateToString()
{
	return this.toDateString() +"  "+ this.toTimeString();
}

// override
// String HijriDateUTC.toLocaleDateString()
HijriDateUTC.prototype.toLocaleDateString = HijriDateToLocaleDateString;
function HijriDateToLocaleDateString()
{
	return this.toDateString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HijriDateUTC.toLocaleTimeString()
HijriDateUTC.prototype.toLocaleTimeString = HijriDateToLocaleTimeString;
function HijriDateToLocaleTimeString()
{
	return this.toTimeString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HijriDateUTC.toLocaleString()
HijriDateUTC.prototype.toLocaleString = HijriDateToLocaleString;
function HijriDateToLocaleString()
{
	return this.toString()
		.changeDigitShapes(Calendar.digitShape);
}

// override
// String HijriDateUTC.toUTCString()
HijriDateUTC.prototype.toUTCString = HijriDateToUTCString;
function HijriDateToUTCString()
{
	var str = this.getUTCFullYear() +"/"+ (this.getUTCMonth()+1) +"/"+ this.getUTCDate() +
		"  "+ this.getUTCHours() +":"+ this.getUTCMinutes() +":"+ this.getUTCSeconds();
	return str;
}

// Helper methods for this calendar

function gregorian_to_hijri(g)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

function hijri_to_gregorian(i)
{
   var y, m, d;
   // ...
   return new Array(y, m, d);
}

// ...put necessary methods to calculate the date here.
