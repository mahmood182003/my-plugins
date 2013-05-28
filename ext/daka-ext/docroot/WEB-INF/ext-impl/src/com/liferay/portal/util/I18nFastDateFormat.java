
package com.liferay.portal.util;

import java.text.AttributedCharacterIterator;
import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.FieldPosition;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Currency;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import com.liferay.portal.kernel.util.CalendarFactoryUtil;
import com.liferay.portal.kernel.util.DateFormatFactoryUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.icu.PersianCalendar;
import com.liferay.portal.kernel.util.icu.PersianDateFormat;

public class I18nFastDateFormat extends SimpleDateFormat {

	PersianDateFormat pdf = null;

	public I18nFastDateFormat() {

		super();
	}

	public I18nFastDateFormat(String pattern) {

		super(pattern);
	}

	public I18nFastDateFormat(String pattern, Locale locale) {

		super(pattern, locale);

		if ("fa".equals(locale.getLanguage())) {
			pdf = new PersianDateFormat(pattern, locale);
		}
	}

	public I18nFastDateFormat(String pattern, DateFormatSymbols formatSymbols) {

		super(pattern, formatSymbols);
	}

	public static DateFormat getInstance(String pattern, TimeZone timeZone, Locale locale) {

		DateFormat format = new I18nFastDateFormat(pattern, locale);
		if (timeZone != null) {
			format.setTimeZone(timeZone);
		}
		return format;
	}

	public static DateFormat getTimeInstance(int style, TimeZone timeZone, Locale locale) {

		String pattern = getPattern(style, locale);

		DateFormat format = getInstance(pattern, timeZone, locale);
		if (timeZone != null) {
			format.setTimeZone(timeZone);
		}

		return format;
	}

	public static DateFormat getDateTimeInstance(int dateStyle, int timeStyle, TimeZone timeZone, Locale locale) {

		String pattern = getPattern(dateStyle, locale);

		DateFormat format = getInstance(pattern, timeZone, locale);
		if (timeZone != null) {
			format.setTimeZone(timeZone);
		}

		return format;
	}

	public static DateFormat getDateInstance(int style, TimeZone timeZone, Locale locale) {

		String pattern = getPattern(style, locale);

		DateFormat format = getInstance(pattern, timeZone, locale);
		if (timeZone != null) {
			format.setTimeZone(timeZone);
		}

		return format;
	}

	private static String getPattern(int style, Locale locale) {

		if ("fa".equals(locale.getLanguage())) {
			String pattern;
			switch (style) {

			case SimpleDateFormat.SHORT:
				pattern = "yy/M/d";
				break;

			case SimpleDateFormat.MEDIUM:
				pattern = "d MMM, yyyy";
				break;

			case SimpleDateFormat.LONG:
				pattern = "MMMM d, yyyy";
				break;

			case SimpleDateFormat.FULL:
				pattern = "EEEE, MMMM d, yyyy";
				break;

			default:
				pattern = "d MMM, yyyy";
			}
			return pattern;
		}
		else {
			SimpleDateFormat formatter = (SimpleDateFormat) DateFormat.getDateInstance(style);
			return formatter.toPattern();
		}
	}

	@Override
	public Object clone() {

		if (pdf != null) {
			DateFormat gdf = DateFormatFactoryUtil.getSimpleDateFormat(this.toPattern(), this.getTimeZone());
			return gdf;
		}
		else {
			return super.clone();
		}
	}

	@Override
	public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos) {

		if (pdf != null) {
			return pdf.format(date, toAppendTo, pos);
		}
		else {
			return super.format(date, toAppendTo, pos);
		}
	}

	@Override
	public DateFormatSymbols getDateFormatSymbols() {

		if (pdf != null) {
			com.ibm.icu.text.DateFormatSymbols pdfs = pdf.getDateFormatSymbols();
			DateFormatSymbols dfs = new DateFormatSymbols();
			dfs.setAmPmStrings(pdfs.getAmPmStrings());
			dfs.setEras(pdfs.getEras());
			dfs.setLocalPatternChars(pdfs.getLocalPatternChars());
			dfs.setMonths(pdfs.getMonths());
			dfs.setShortMonths(pdfs.getShortMonths());
			dfs.setShortWeekdays(pdfs.getShortWeekdays());
			dfs.setZoneStrings(pdfs.getZoneStrings());
			return dfs;
		}
		else {
			return super.getDateFormatSymbols();
		}
	}

	@Override
	public Date parse(String arg0, ParsePosition arg1) {

		if (pdf != null) {
			return pdf.parse(arg0, arg1);
		}
		else {
			return super.parse(arg0, arg1);
		}
	}

	@Override
	public String toLocalizedPattern() {

		if (pdf != null) {
			return pdf.toLocalizedPattern();
		}
		else {
			return super.toLocalizedPattern();
		}
	}

	@Override
	public String toPattern() {

		if (pdf != null) {
			return pdf.toPattern();
		}
		else {
			return super.toPattern();
		}
	}

	@Override
	public void applyLocalizedPattern(String pattern) {

		if (pdf != null) {
			pdf.applyLocalizedPattern(pattern);
		}
		else {
			super.applyLocalizedPattern(pattern);
		}
	}

	@Override
	public void applyPattern(String pattern) {

		if (pdf != null) {
			pdf.applyPattern(pattern);
		}
		else {
			super.applyPattern(pattern);
		}
	}

	@Override
	public Date get2DigitYearStart() {

		if (pdf != null) {
			return pdf.get2DigitYearStart();
		}
		else {
			return super.get2DigitYearStart();
		}
	}

	@Override
	public void set2DigitYearStart(Date startDate) {

		if (pdf != null) {
			pdf.set2DigitYearStart(startDate);
		}
		else {
			super.set2DigitYearStart(startDate);
		}
	}

	@Override
	public void setDateFormatSymbols(DateFormatSymbols newFormatSymbols) {

		if (pdf != null) {
			com.ibm.icu.text.DateFormatSymbols pdfs = pdf.getDateFormatSymbols();
			pdfs.setAmPmStrings(newFormatSymbols.getAmPmStrings());
			pdfs.setEras(newFormatSymbols.getEras());
			pdfs.setLocalPatternChars(newFormatSymbols.getLocalPatternChars());
			pdfs.setMonths(newFormatSymbols.getMonths());
			pdfs.setShortMonths(newFormatSymbols.getShortMonths());
			pdfs.setShortWeekdays(newFormatSymbols.getShortWeekdays());
			pdfs.setZoneStrings(newFormatSymbols.getZoneStrings());

			pdf.setDateFormatSymbols(pdfs);
		}
		else {
			super.setDateFormatSymbols(newFormatSymbols);
		}
	}

	@Override
	public AttributedCharacterIterator formatToCharacterIterator(Object obj) {

		if (pdf != null) {
			return pdf.formatToCharacterIterator(obj);
		}
		else {
			return super.formatToCharacterIterator(obj);
		}
	}

	@Override
	public Calendar getCalendar() {

		Locale locale = LocaleUtil.getDefault();

		if (pdf != null) {
			if (pdf.getCalendar().getFirstDayOfWeek() == Calendar.SATURDAY) {
				locale = LocaleUtil.fromLanguageId("fa_IR");
			}

			Calendar cal = CalendarFactoryUtil.getCalendar(locale);
			cal.setTimeZone(TimeZone.getTimeZone("GMT+3:30"));
			cal.setTime(pdf.getCalendar().getTime());
			return cal;
		}
		else {
			return super.getCalendar();
		}
	}

	@Override
	public NumberFormat getNumberFormat() {

		if (pdf != null) {
			com.ibm.icu.text.NumberFormat pnf = pdf.getNumberFormat();
			NumberFormat nf = NumberFormat.getInstance();
			nf.setCurrency(Currency.getInstance(pnf.getCurrency().getCurrencyCode()));
			nf.setMaximumFractionDigits(pnf.getMaximumFractionDigits());
			nf.setMaximumIntegerDigits(pnf.getMaximumIntegerDigits());
			nf.setMinimumIntegerDigits(pnf.getMinimumIntegerDigits());
			nf.setMinimumFractionDigits(pnf.getMinimumFractionDigits());
			return nf;
		}
		else {
			return super.getNumberFormat();
		}
	}

	@Override
	public TimeZone getTimeZone() {

		if (pdf != null) {
			return TimeZone.getTimeZone(pdf.getTimeZone().getID());
		}
		else {
			return super.getTimeZone();
		}
	}

	@Override
	public boolean isLenient() {

		if (pdf != null) {
			return pdf.isLenient();
		}
		else {
			return super.isLenient();
		}
	}

	@Override
	public Date parse(String source)
		throws ParseException {

		if (pdf != null) {
			return pdf.parse(source);
		}
		else {
			return super.parse(source);
		}
	}

	@Override
	public Object parseObject(String source, ParsePosition pos) {

		if (pdf != null) {
			return pdf.parseObject(source, pos);
		}
		else {
			return super.parseObject(source, pos);
		}
	}

	@Override
	public void setCalendar(Calendar newCalendar) {

		if (pdf != null) {
			PersianCalendar icuCal = new PersianCalendar();
			icuCal.setTimeZone(com.ibm.icu.util.TimeZone.getTimeZone(newCalendar.getTimeZone().getID()));
			icuCal.setTime(newCalendar.getTime());
			pdf.setCalendar(icuCal);
		}
		else {
			super.setCalendar(newCalendar);
		}
	}

	@Override
	public void setLenient(boolean lenient) {

		if (pdf != null) {
			pdf.setLenient(lenient);
		}
		else {
			super.setLenient(lenient);
		}
	}

	@Override
	public void setNumberFormat(NumberFormat newNumberFormat) {

		if (pdf != null) {
			com.ibm.icu.text.NumberFormat pnf = com.ibm.icu.text.NumberFormat.getInstance();
			pnf.setCurrency(pnf.getCurrency());
			pnf.setMaximumFractionDigits(newNumberFormat.getMaximumFractionDigits());
			pnf.setMaximumIntegerDigits(newNumberFormat.getMaximumIntegerDigits());
			pnf.setMinimumIntegerDigits(newNumberFormat.getMinimumIntegerDigits());
			pnf.setMinimumFractionDigits(newNumberFormat.getMinimumFractionDigits());
			pdf.setNumberFormat(pnf);
		}
		else {
			super.setNumberFormat(newNumberFormat);
		}
	}

	@Override
	public void setTimeZone(TimeZone zone) {

		if (pdf != null) {
			pdf.setTimeZone(com.ibm.icu.util.TimeZone.getTimeZone(zone.getID()));
		}
		else {
			super.setTimeZone(zone);
		}
	}

	@Override
	public boolean equals(Object obj) {

		if (pdf != null) {
			return pdf.equals(obj);
		}
		return super.equals(obj);
	}

	@Override
	public int hashCode() {

		if (pdf != null) {
			return pdf.hashCode();
		}
		return super.hashCode();
	}

	@Override
	public Object parseObject(String source)
		throws ParseException {

		if (pdf != null) {
			return pdf.parseObject(source);
		}
		return super.parseObject(source);

	}

}
