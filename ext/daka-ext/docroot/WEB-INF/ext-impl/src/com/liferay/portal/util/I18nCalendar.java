
package com.liferay.portal.util;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.util.ULocale;
import com.ibm.icu.util.ULocale.Type;
import com.liferay.portal.kernel.util.icu.PersianCalendar;

public class I18nCalendar extends java.util.GregorianCalendar {

	private boolean isPersian = false;
	private PersianCalendar perCal;

	public I18nCalendar() {

		this.perCal = new PersianCalendar();
	}

	public I18nCalendar(Date date) {

		super.setTime(date);
		this.perCal = new PersianCalendar(super.getTime());
	}

	public I18nCalendar(Locale locale) {

		if ("fa".equals(locale.getLanguage())) {
			this.isPersian = true;
		}

		this.perCal = new PersianCalendar(locale);
	}

	public I18nCalendar(TimeZone tz, Locale locale) {

		super.setTimeZone(tz);

		if ("fa".equals(locale.getLanguage())) {
			this.isPersian = true;
		}

		com.ibm.icu.util.TimeZone icu_tz = com.ibm.icu.util.TimeZone.getDefault();
		icu_tz.setID(tz.getID());
		icu_tz.setRawOffset(tz.getRawOffset());
		this.perCal = new PersianCalendar(icu_tz, locale);
	}

	public I18nCalendar(TimeZone tz) {

		super.setTimeZone(tz);

		com.ibm.icu.util.TimeZone icu_tz = com.ibm.icu.util.TimeZone.getDefault();
		icu_tz.setID(tz.getID());
		icu_tz.setRawOffset(tz.getRawOffset());
		this.perCal = new PersianCalendar(icu_tz);
	}

	public I18nCalendar(int year, int month, int date) {

		super.set(year, month, date);
		this.perCal = new PersianCalendar(super.getTime());
	}

	public I18nCalendar(int year, int month, int date, int hour, int minute) {

		super.set(year, month, date, hour, minute);
		this.perCal = new PersianCalendar(super.getTime());
	}

	public I18nCalendar(int year, int month, int date, int hour, int minute, int second) {

		super.set(year, month, date, hour, minute, second);
		this.perCal = new PersianCalendar(super.getTime());
	}

	@Override
	public void add(int field, int amount) {

		super.add(field, amount);
		perCal.add(field, amount);

	}

	@Override
	protected void computeFields() {

		super.computeFields();
	}

	@Override
	protected void computeTime() {

		super.computeTime();
	}

	@Override
	public int getGreatestMinimum(int field) {

		if (isPersian) {
			return perCal.getGreatestMinimum(field);
		}
		else {
			return super.getGreatestMinimum(field);
		}

	}

	@Override
	public int getLeastMaximum(int field) {

		if (isPersian) {
			return perCal.getLeastMaximum(field);
		}
		else {
			return super.getLeastMaximum(field);
		}
	}

	@Override
	public int getMaximum(int field) {

		if (isPersian) {
			return perCal.getMaximum(field);
		}
		else {
			return super.getMaximum(field);
		}
	}

	@Override
	public int getMinimum(int field) {

		if (isPersian) {
			return perCal.getMinimum(field);
		}
		else {
			return super.getMinimum(field);
		}
	}

	@Override
	public void roll(int field, boolean up) {

		perCal.roll(field, up);
		super.roll(field, up);
	}

	@Override
	public int get(int field) {

		if (isPersian) {
			return perCal.get(field);
		}
		else {
			return super.get(field);
		}
	}

	@Override
	public int getFirstDayOfWeek() {

		if (isPersian) {
			return perCal.getFirstDayOfWeek();
		}
		else {
			return super.getFirstDayOfWeek();
		}
	}

	@Override
	public int getMinimalDaysInFirstWeek() {

		if (isPersian) {
			return perCal.getMinimalDaysInFirstWeek();
		}
		else {
			return super.getMinimalDaysInFirstWeek();
		}
	}

	@Override
	public int getActualMaximum(int field) {

		if (isPersian) {
			return perCal.getActualMaximum(field);
		}
		else {
			return super.getActualMaximum(field);
		}
	}

	@Override
	public int getActualMinimum(int field) {

		if (isPersian) {
			return perCal.getActualMinimum(field);
		}
		else {
			return super.getActualMinimum(field);
		}
	}

	@Override
	public void setLenient(boolean lenient) {

		super.setLenient(lenient);
		perCal.setLenient(lenient);
	}

	@Override
	public void setMinimalDaysInFirstWeek(int value) {

		perCal.setMinimalDaysInFirstWeek(value);
		super.setMinimalDaysInFirstWeek(value);
	}

	@Override
	// the value must be in Gregorian
	public void set(int field, int value) {

		super.set(field, value);
		perCal.setTime(super.getTime());

	}

	public boolean after(Object when) {

		if (isPersian) {
			return perCal.after(when);
		}
		else {
			return super.after(when);
		}
	}

	public boolean before(Object when) {

		if (isPersian) {
			return perCal.before(when);
		}
		else {
			return super.before(when);
		}
	}
/*
	public Object clone() {

		if (isPersian) {
			return this.clone();
		}
		else {
			return super.clone();
		}
	}
*/
	public boolean equals(Object obj) {

		if (isPersian) {
			return perCal.equals(obj);
		}
		else {
			return super.equals(obj);
		}
	}

	public long getTimeInMillis() {

		if (isPersian) {
			return perCal.getTimeInMillis();
		}
		else {
			return super.getTimeInMillis();
		}
	}

	public int hashCode() {

		if (isPersian) {
			return perCal.hashCode();
		}
		else {
			return super.hashCode();
		}
	}

	public void setFirstDayOfWeek(int value) {

		if (isPersian) {
			perCal.setFirstDayOfWeek(value);
		}
		else {
			super.setFirstDayOfWeek(value);
		}
	}

	public void setTimeInMillis(long millis) {

		if (isPersian) {
			perCal.setTimeInMillis(millis);
		}
		else {
			super.setTimeInMillis(millis);
		}
	}

	public String toString() {

		if (isPersian) {
			return perCal.toString();
		}
		else {
			return super.toString();
		}
	}

	@Override
	public void roll(int field, int amount) {

		super.roll(field, amount);
		perCal.roll(field, amount);
	}

	@Override
	public void setTimeZone(TimeZone zone) {

		perCal.getTimeZone().setID(zone.getID());
		perCal.getTimeZone().setRawOffset((zone.getRawOffset()));
		super.setTimeZone(zone);
	}

}
