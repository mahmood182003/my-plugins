
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

	private PersianCalendar perCal;

	public I18nCalendar() {

		super();
	}

	public I18nCalendar(boolean isPersian) {

		super();

		if (isPersian) {
			this.perCal = new PersianCalendar();
		}
	}

	public I18nCalendar(Date date) {

		super();
		super.setTime(date);
		// this.perCal = new PersianCalendar(date);
	}

	public I18nCalendar(Locale locale) {

		super(locale);

		if ("fa".equals(locale.getLanguage())) {
			this.perCal = new PersianCalendar(locale);
		}
	}

	public I18nCalendar(TimeZone tz, Locale locale) {

		super(tz, locale);

		if ("fa".equals(locale.getLanguage())) {
			com.ibm.icu.util.TimeZone icu_tz = com.ibm.icu.util.TimeZone.getDefault();
			icu_tz.setID(tz.getID());
			icu_tz.setRawOffset(tz.getRawOffset());
			this.perCal = new PersianCalendar(icu_tz, locale);
		}
	}

	public I18nCalendar(TimeZone tz) {

		super(tz);
	}

	public I18nCalendar(int year, int month, int date) {

		super.set(year, month, date);
		// this.perCal = new PersianCalendar(super.getTime());
	}

	public I18nCalendar(int year, int month, int date, int hour, int minute) {

		super.set(year, month, date, hour, minute);
		// this.perCal = new PersianCalendar(super.getTime());
	}

	public I18nCalendar(int year, int month, int date, int hour, int minute, int second) {

		super.set(year, month, date, hour, minute, second);
		// this.perCal = new PersianCalendar(super.getTime());
	}

	@Override
	public void add(int field, int amount) {

		super.add(field, amount);
		if (this.perCal != null) {
			perCal.add(field, amount);
		}

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

		if (this.perCal != null) {
			return perCal.getGreatestMinimum(field);
		}
		else {
			return super.getGreatestMinimum(field);
		}

	}

	@Override
	public int getLeastMaximum(int field) {

		if (this.perCal != null) {
			return perCal.getLeastMaximum(field);
		}
		else {
			return super.getLeastMaximum(field);
		}
	}

	@Override
	public int getMaximum(int field) {

		if (this.perCal != null) {
			return perCal.getMaximum(field);
		}
		else {
			return super.getMaximum(field);
		}
	}

	@Override
	public int getMinimum(int field) {

		if (this.perCal != null) {
			return perCal.getMinimum(field);
		}
		else {
			return super.getMinimum(field);
		}
	}

	@Override
	public void roll(int field, boolean up) {

		if (this.perCal != null) {
			perCal.roll(field, up);
		}
		super.roll(field, up);
	}

	@Override
	public int get(int field) {

		if (this.perCal != null) {
			return perCal.get(field);
		}
		else {
			return super.get(field);
		}
	}

	@Override
	public int getFirstDayOfWeek() {

		if (this.perCal != null) {
			return perCal.getFirstDayOfWeek();
		}
		else {
			return super.getFirstDayOfWeek();
		}
	}

	@Override
	public int getMinimalDaysInFirstWeek() {

		if (this.perCal != null) {
			return perCal.getMinimalDaysInFirstWeek();
		}
		else {
			return super.getMinimalDaysInFirstWeek();
		}
	}

	@Override
	public int getActualMaximum(int field) {

		if (this.perCal != null) {
			return perCal.getActualMaximum(field);
		}
		else {
			return super.getActualMaximum(field);
		}
	}

	@Override
	public int getActualMinimum(int field) {

		if (this.perCal != null) {
			return perCal.getActualMinimum(field);
		}
		else {
			return super.getActualMinimum(field);
		}
	}

	@Override
	public void setLenient(boolean lenient) {

		super.setLenient(lenient);

		if (this.perCal != null) {
			perCal.setLenient(lenient);
		}
	}

	@Override
	public void setMinimalDaysInFirstWeek(int value) {

		if (this.perCal != null) {
			perCal.setMinimalDaysInFirstWeek(value);
		}
		super.setMinimalDaysInFirstWeek(value);
	}

	@Override
	// the value must be in Gregorian
	public void set(int field, int value) {

		super.set(field, value);

		if (this.perCal != null) {
			perCal.set(field, value);
		}
	}

	public boolean after(Object when) {

		if (this.perCal != null) {
			return perCal.after(when);
		}
		else {
			return super.after(when);
		}
	}

	public boolean before(Object when) {

		if (this.perCal != null) {
			return perCal.before(when);
		}
		else {
			return super.before(when);
		}
	}

	public Object clone() {

		if (this.perCal != null) {
			I18nCalendar i18Cal = new I18nCalendar(true);
			i18Cal.setTimeZone(this.getTimeZone());
			i18Cal.setTime1(this.getTime());
			return i18Cal;
		}
		else {
			return super.clone();
		}
	}

	public boolean equals(Object obj) {

		if (this.perCal != null) {
			return perCal.equals(obj);
		}
		else {
			return super.equals(obj);
		}
	}

	public long getTimeInMillis() {

		if (this.perCal != null) {
			return perCal.getTimeInMillis();
		}
		else {
			return super.getTimeInMillis();
		}
	}

	public int hashCode() {

		if (this.perCal != null) {
			return perCal.hashCode();
		}
		else {
			return super.hashCode();
		}
	}

	public void setFirstDayOfWeek(int value) {

		if (this.perCal != null) {
			perCal.setFirstDayOfWeek(value);
		}
		super.setFirstDayOfWeek(value);
	}

	public void setTimeInMillis(long millis) {

		super.setTimeInMillis(millis);
	}

	public String toString() {

		if (this.perCal != null) {
			return perCal.toString();
		}
		else {
			return super.toString();
		}
	}

	@Override
	public void roll(int field, int amount) {

		super.roll(field, amount);
		if (this.perCal != null) {
			perCal.roll(field, amount);
		}
	}

	@Override
	public void setTimeZone(TimeZone zone) {

		if (this.perCal != null) {
			perCal.getTimeZone().setID(zone.getID());
			perCal.getTimeZone().setRawOffset((zone.getRawOffset()));
		}
		super.setTimeZone(zone);
	}

	public void setTime1(Date date) {

		if (this.perCal != null) {
			this.perCal.setTime(date);
		}
		super.setTime(date);
	}

}
