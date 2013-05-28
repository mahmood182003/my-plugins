<%--
/**
 * Copyright (c) 2000-2012 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@page import="com.liferay.portal.util.I18nCalendar"%>
<%@ include file="/html/taglib/init.jsp" %>

<%
String randomNamespace = PortalUtil.generateRandomKey(request, "taglib_ui_input_date_page") + StringPool.UNDERLINE;

if (GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:disableNamespace"))) {
	namespace = StringPool.BLANK;
}

String cssClass = GetterUtil.getString((String)request.getAttribute("liferay-ui:input-date:cssClass"));
String formName = namespace + request.getAttribute("liferay-ui:input-date:formName");
String monthParam = namespace + request.getAttribute("liferay-ui:input-date:monthParam");
int monthValue = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:monthValue"));
boolean monthNullable = GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:monthNullable"));
String dayParam = namespace + request.getAttribute("liferay-ui:input-date:dayParam");
int dayValue = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:dayValue"));
boolean dayNullable = GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:dayNullable"));
String yearParam = namespace + request.getAttribute("liferay-ui:input-date:yearParam");
int yearValue = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:yearValue"));
boolean yearNullable = GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:yearNullable"));
int yearRangeStart = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:yearRangeStart"));
int yearRangeEnd = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:yearRangeEnd"));
String monthAndYearParam = namespace + request.getAttribute("liferay-ui:input-date:monthAndYearParam");
boolean monthAndYearNullable = GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:monthAndYearNullable"));
int firstDayOfWeek = GetterUtil.getInteger((String)request.getAttribute("liferay-ui:input-date:firstDayOfWeek"));
String imageInputId = GetterUtil.getString((String)request.getAttribute("liferay-ui:input-date:imageInputId"));
boolean disabled = GetterUtil.getBoolean((String)request.getAttribute("liferay-ui:input-date:disabled"));

if (Validator.isNull(imageInputId)) {
	imageInputId = randomNamespace + "imageInputId";
}
else {
	imageInputId = namespace + imageInputId;
}

String dateFormatPattern = ((SimpleDateFormat)(DateFormat.getDateInstance(DateFormat.SHORT, locale))).toPattern();

String dateFormatOrder = _DATE_FORMAT_ORDER_MDY;

if (dateFormatPattern.indexOf("y") == 0) {
	dateFormatOrder = _DATE_FORMAT_ORDER_YMD;
}
else if (dateFormatPattern.indexOf("d") == 0) {
	dateFormatOrder = _DATE_FORMAT_ORDER_DMY;
}

Date selectedDate = new Date();

Calendar gcal = CalendarFactoryUtil.getCalendar(timeZone);

gcal.setTime(selectedDate);

boolean dayEmpty = false;

if (dayValue > 0) {
	gcal.set(Calendar.DATE, dayValue);
}
else if (dayNullable) {
	dayEmpty = true;
}

boolean monthEmpty = false;

if (monthValue > -1) {
	gcal.set(Calendar.MONTH, monthValue);
}
else if (monthNullable) {
	monthEmpty = true;
}

boolean yearEmpty = false;

if (yearValue > 0) {
	gcal.set(Calendar.YEAR, yearValue);
}
else if (yearNullable) {
	yearEmpty = true;
}

I18nCalendar pcal =new I18nCalendar(locale, I18nCalendar.AUTO);
pcal.setTime1(gcal.getTime());

int yearValue1 = pcal.get(Calendar.YEAR);
int monthValue1 = pcal.get(Calendar.MONTH);
int dayValue1 = pcal.get(Calendar.DATE);

if("fa".equals(locale.getLanguage())){
	yearRangeStart -= 621;
	yearRangeEnd -= 621;
}
%>

<div class="aui-datepicker aui-datepicker-display aui-helper-clearfix <%= Validator.isNotNull(cssClass) ? cssClass : StringPool.BLANK %>" id="<%= randomNamespace %>displayDate">
	<div class="aui-datepicker-content" id="<%= randomNamespace %>displayDateContent">
		<div class="aui-datepicker-select-wrapper">
			<c:choose>
				<c:when test="<%= monthAndYearParam.equals(namespace) %>">

					<%
					int[] monthIds = CalendarUtil.getMonthIds();
					String[] months = CalendarUtil.getMonths(locale);
					%>

					<c:choose>
						<c:when test="<%= dateFormatOrder.equals(_DATE_FORMAT_ORDER_MDY) %>">
							<%@ include file="/html/taglib/ui/input_date/select_month.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_day.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_year.jspf" %>
						</c:when>
						<c:when test="<%= dateFormatOrder.equals(_DATE_FORMAT_ORDER_YMD) %>">
							<%@ include file="/html/taglib/ui/input_date/select_year.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_month.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_day.jspf" %>
						</c:when>
						<c:otherwise>
							<%@ include file="/html/taglib/ui/input_date/select_day.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_month.jspf" %>

							<%@ include file="/html/taglib/ui/input_date/select_year.jspf" %>
						</c:otherwise>
					</c:choose>
				</c:when>
			</c:choose>
		</div>
		<div class="aui-datepicker-button-wrapper">
			<button class="aui-buttonitem aui-buttonitem-content aui-buttonitem-icon-only aui-component aui-state-default yui3-widget" id="buttonTest" type="button">
				<span class="aui-buttonitem-icon aui-icon aui-icon-calendar"></span>
			</button>
		</div>
	</div>
</div>

<input class="<%= disabled ? "disabled" : "" %>" id="<%= imageInputId %>Input" type="hidden" />
<aui:script use="aui-datepicker-select">
	var displayDateNode = A.one('#<%= randomNamespace %>displayDate');

	var displayDatePickerHandle = displayDateNode.on(
		['click', 'mousemove'],
		function(event) {
			new A.DatePickerSelect(
				{
					after: {
						render: function(event) {
							var instance = this;

							<c:if test="<%= dayEmpty %>">
								instance.get('dayNode').val('-1');
							</c:if>

							<c:if test="<%= monthEmpty %>">
								instance.get('monthNode').val('-1');
							</c:if>

							<c:if test="<%= yearEmpty %>">
								instance.get('yearNode').val('-1');
							</c:if>
						}
					},
					appendOrder: '<%= dateFormatOrder %>',
					boundingBox: displayDateNode,
					calendar: {
						dates: [
							<c:if test="<%= !monthEmpty && !dayEmpty && !yearEmpty %>">
								new Date(
									<%= gcal.get(Calendar.YEAR) %>,
									<%= gcal.get(Calendar.MONTH) %>,
									<%= gcal.get(Calendar.DATE) %>
								)<%=("fa".equals(locale.getLanguage()))?".toPersianDate()":""%>
							</c:if>
						],

						<c:choose>
							<c:when test="<%= dateFormatOrder.equals(_DATE_FORMAT_ORDER_MDY) %>">
								dateFormat: '%m/%d/%y',
							</c:when>
							<c:when test="<%= dateFormatOrder.equals(_DATE_FORMAT_ORDER_YMD) %>">
								dateFormat: '%y/%m/%d',
							</c:when>
							<c:otherwise>
								dateFormat: '%d/%m/%y',
							</c:otherwise>
						</c:choose>

						firstDayOfWeek: <%= firstDayOfWeek %>,
						locale: '<%= LanguageUtil.getLanguageId(request) %>',
						strings: {
							next: '<liferay-ui:message key="next" />',
							none: '<liferay-ui:message key="none" />',
							previous: '<liferay-ui:message key="previous" />',
							today: '<liferay-ui:message key="today" />'
						}
					},
					dayNode: '#<%= dayParam %>',
					disabled: <%= disabled %>,
					monthNode: '#<%= monthParam %>',
					nullableDay: <%= dayNullable %>,
					nullableMonth: <%= monthNullable %>,
					nullableYear: <%= yearNullable %>,
					on: {
						'calendar:select': function(event) {
							var formatted = event.date.formatted[0];
							A.one('#<%= imageInputId %>Input').val(formatted);

					// populate hidden inputs on calendar select
					<%if("fa".equals(locale.getLanguage())){%>

							var pd=new PersianDate(event.date.detailed[0].year,event.date.detailed[0].month,event.date.detailed[0].day);
							var gd = pd.toDate();
					<%}else{%>

							var gd=new Date(event.date.detailed[0].year,event.date.detailed[0].month,event.date.detailed[0].day);
					<%} %>

							A.one('#year_<%= yearParam %>').val(gd.getFullYear());
							A.one('#month_<%= monthParam %>').val(gd.getMonth());
							A.one('#day_<%= dayParam %>').val(gd.getDate());
						},
							// update hidden inputs when a select is changed manually
						'change':function(event){

						<%if("fa".equals(locale.getLanguage())){%>

							var pd=new PersianDate(A.one('#<%= yearParam %>').val(),
													A.one('#<%= monthParam %>').val(),
													A.one('#<%= dayParam %>').val());
							var gd = pd.toDate();
					<%}else{%>

							var gd=new Date(A.one('#<%= yearParam %>').val(),
													A.one('#<%= monthParam %>').val(),
													A.one('#<%= dayParam %>').val());
					<%} %>

							A.one('#year_<%= yearParam %>').val(gd.getFullYear());
							A.one('#month_<%= monthParam %>').val(gd.getMonth());
							A.one('#day_<%= dayParam %>').val(gd.getDate());
						}
					},
					srcNode: '#<%= randomNamespace %>displayDateContent',
					yearNode: '#<%= yearParam %>',
					yearRange: [<%= yearRangeStart %>, <%= yearRangeEnd %>]
				}
			)	.render();

			displayDatePickerHandle.detach();
		}
	);
</aui:script>

<%!
private static final String _DATE_FORMAT_ORDER_DMY = "[\\'d\\', \\'m\\', \\'y\\']";

private static final String _DATE_FORMAT_ORDER_MDY = "[\\'m\\', \\'d\\', \\'y\\']";

private static final String _DATE_FORMAT_ORDER_YMD = "[\\'y\\', \\'m\\', \\'d\\']";
%>