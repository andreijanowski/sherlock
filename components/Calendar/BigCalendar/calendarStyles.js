/* stylelint-disable */
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`.rbc-btn {
    color: inherit;
    font: inherit;
    margin: 0;
  }
  button.rbc-btn {
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    cursor: pointer;
  }
  button[disabled].rbc-btn {
    cursor: not-allowed;
  }
  button.rbc-input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  .rbc-calendar {
    box-sizing: border-box;
    height: 100%;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-align-items: stretch;
        -ms-flex-align: stretch;
            align-items: stretch;
  }
  .rbc-calendar *,
  .rbc-calendar *:before,
  .rbc-calendar *:after {
    box-sizing: inherit;
  }
  .rbc-abs-full,
  .rbc-row-bg {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .rbc-ellipsis,
  .rbc-event-label,
  .rbc-row-segment .rbc-event-content,
  .rbc-show-more {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
  }
  .rbc-rtl {
    direction: rtl;
  }
  .rbc-off-range {
    color: #999999;
  }
  .rbc-off-range-bg {}
  .rbc-header {
    overflow: hidden;
    -webkit-flex: 1 0 0%;
        -ms-flex: 1 0 0%;
            flex: 1 0 0%;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 3px;
    text-align: center;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    font-weight: ${p => p.theme.fontWeights.medium};
    font-size: ${p => p.theme.fontSizes.f12};
    min-height: 0;
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-header + .rbc-header {
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-header + .rbc-header {
    border-left-width: 0;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-header > a,
  .rbc-header > a:active,
  .rbc-header > a:visited {
    color: inherit;
    text-decoration: none;
  }
  .rbc-row-content {
    position: relative;
    -moz-user-select: none;
     -ms-user-select: none;
         user-select: none;
    -webkit-user-select: none;
    z-index: 4;
    height: 100%;
  }
  .rbc-today {}
  .rbc-toolbar {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .rbc-toolbar .rbc-toolbar-label {
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    padding: 0 10px;
    text-align: center;
  }
  .rbc-toolbar button {
    color: #373a3c;
    display: inline-block;
    margin: 0;
    text-align: center;
    vertical-align: middle;
    background: none;
    background-image: none;
    border: 1px solid #ccc;
    padding: .375rem 1rem;
    border-radius: 4px;
    line-height: normal;
    white-space: nowrap;
  }
  .rbc-toolbar button:active,
  .rbc-toolbar button.rbc-active {
    background-image: none;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .rbc-toolbar button:active:hover,
  .rbc-toolbar button.rbc-active:hover,
  .rbc-toolbar button:active:focus,
  .rbc-toolbar button.rbc-active:focus {
    color: #373a3c;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }
  .rbc-toolbar button:focus {
    color: #373a3c;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .rbc-toolbar button:hover {
    color: #373a3c;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .rbc-btn-group {
    display: inline-block;
    white-space: nowrap;
  }
  .rbc-btn-group > button:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .rbc-btn-group > button:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .rbc-rtl .rbc-btn-group > button:first-child:not(:last-child) {
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .rbc-rtl .rbc-btn-group > button:last-child:not(:first-child) {
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .rbc-btn-group > button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  .rbc-btn-group button + button {
    margin-left: -1px;
  }
  .rbc-rtl .rbc-btn-group button + button {
    margin-left: 0;
    margin-right: -1px;
  }
  .rbc-btn-group + .rbc-btn-group,
  .rbc-btn-group + button {
    margin-left: 10px;
  }
  .rbc-event {
    border: none;
    box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);
    margin: 0;
    padding: 0;
    background-color: rgba(${p => p.theme.colors.blue}, 0.9);
    border-radius: ${p => p.theme.radius.tiny};
    color: rgb(${p => p.theme.colors.white});
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: ${p => p.theme.fontSizes.f12};
    font-weight: ${p => p.theme.fontWeights.normal};
    line-height: 16px;
    position: relative;
    z-index: 1;
    outline: none;
  }
  .rbc-slot-selecting .rbc-event {
    cursor: inherit;
    pointer-events: none;
  }
  .rbc-event.rbc-selected {
    z-index: 2;
    background-color: rgba(${p => p.theme.colors.blue}, 1);
    box-shadow: 0 5px 12px 0 rgba(${p => p.theme.colors.blue}, 0.64);
  }
  .rbc-event-label {
    font-size: 80%;
  }
  .rbc-event-overlaps {
    box-shadow: -1px 1px 5px 0px rgba(51, 51, 51, 0.5);
  }
  .rbc-event-continues-prior {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .rbc-event-continues-after {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .rbc-event-continues-earlier {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .rbc-event-continues-later {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .rbc-row {
    display: none;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    &:first-child {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    &:nth-child(2) {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: calc(100% - 36px);
    }
  }
  .rbc-row-segment {
    padding: 0 1px 1px 1px;
  }
  .rbc-selected-cell {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .rbc-show-more {
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 4;
    font-weight: bold;
    font-size: 85%;
    height: auto;
    line-height: normal;
    white-space: nowrap;
  }
  .rbc-month-view {
    position: relative;
    border: 1px solid rgb(${p => p.theme.colors.background});
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    width: 100%;
    -moz-user-select: none;
     -ms-user-select: none;
         user-select: none;
    -webkit-user-select: none;
    height: 100%;
  }
  .rbc-month-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
  }
  .rbc-month-row {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    -webkit-flex-basis: 0px;
        -ms-flex-preferred-size: 0px;
            flex-basis: 0px;
    overflow: hidden;
    height: 100%;
  }
  .rbc-month-row + .rbc-month-row {
    border-top: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-date-cell {
    -webkit-flex: 1 1 0;
        -ms-flex: 1 1 0px;
            flex: 1 1 0;
    min-width: 0;
    padding: 3px;
    text-align: right;
    font-size: ${p => p.theme.fontSizes.f12};
  }
  .rbc-date-cell.rbc-now > a {
    background-color: rgb(${p => p.theme.colors.blue});
    box-shadow: 0 3px 8px 0 rgba(${p => p.theme.colors.blue}, 0.48);
    border-radius: 15px;
    color: rgb(${p => p.theme.colors.white});
  }
  .rbc-date-cell > a,
  .rbc-date-cell > a:visited {
    color: inherit;
    text-decoration: none;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    display: inline-block;
  }
  .rbc-row-bg {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    overflow: hidden;
  }
  .rbc-day-bg {
    -webkit-flex: 1 0 0%;
        -ms-flex: 1 0 0%;
            flex: 1 0 0%;
  }
  .rbc-day-bg + .rbc-day-bg {
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-day-bg + .rbc-day-bg {
    border-left-width: 0;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-overlay {
    position: absolute;
    z-index: 5;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    padding: 10px;
  }
  .rbc-overlay > * + * {
    margin-top: 1px;
  }
  .rbc-overlay-header {
    border-bottom: 1px solid #e5e5e5;
    margin: -10px -10px 5px -10px;
    padding: 2px 10px;
  }
  .rbc-agenda-view {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    overflow: auto;
  }
  .rbc-agenda-view table.rbc-agenda-table {
    width: 100%;
    border: 1px solid rgb(${p => p.theme.colors.background});
    border-spacing: 0;
    border-collapse: collapse;
  }
  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    padding: 5px 10px;
    vertical-align: top;
  }
  .rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell {
    padding-left: 15px;
    padding-right: 15px;
    text-transform: lowercase;
  }
  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td {
    border-left-width: 0;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {
    border-top: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    padding: 3px 5px;
    text-align: left;
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    text-align: right;
  }
  .rbc-agenda-time-cell {
    text-transform: lowercase;
  }
  .rbc-agenda-time-cell .rbc-continues-after:after {
    content: ' ??';
  }
  .rbc-agenda-time-cell .rbc-continues-prior:before {
    content: '?? ';
  }
  .rbc-agenda-date-cell,
  .rbc-agenda-time-cell {
    white-space: nowrap;
  }
  .rbc-agenda-event-cell {
    width: 100%;
  }
  .rbc-time-column {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    min-height: 100%;
    width: 70px;
  }
  .rbc-time-column .rbc-timeslot-group {
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
  }
  .rbc-timeslot-group {
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
    min-height: 40px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column nowrap;
        -ms-flex-flow: column nowrap;
            flex-flow: column nowrap;
  }
  .rbc-time-gutter,
  .rbc-header-gutter {
    -webkit-flex: none;
        -ms-flex: none;
            flex: none;
  }
  .rbc-label {
    font-size: ${p => p.theme.fontSizes.f12};
    color: rgb(${p => p.theme.colors.bombay});
  }
  .rbc-day-slot {
    position: relative;
  }
  .rbc-day-slot .rbc-events-container {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    margin-right: 10px;
    top: 0;
  }
  .rbc-day-slot .rbc-events-container.rbc-is-rtl {
    left: 10px;
    right: 0;
  }
  .rbc-day-slot .rbc-event {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    max-height: 100%;
    min-height: 20px;
    -webkit-flex-flow: column wrap;
        -ms-flex-flow: column wrap;
            flex-flow: column wrap;
    -webkit-align-items: flex-start;
        -ms-flex-align: start;
            align-items: flex-start;
    overflow: hidden;
    position: absolute;
  }
  .rbc-day-slot .rbc-event-label {
    display: none;
  }
  .rbc-day-slot .rbc-event-content {
    width: 100%;
    -webkit-flex: 1 1 0;
        -ms-flex: 1 1 0px;
            flex: 1 1 0;
    word-wrap: break-word;
    line-height: 1;
    height: 100%;
    min-height: 1em;
  }
  .rbc-day-slot .rbc-time-slot {}
  .rbc-time-view-resources .rbc-time-gutter,
  .rbc-time-view-resources .rbc-time-header-gutter {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    background-color: white;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
    z-index: 10;
    margin-right: -1px;
  }
  .rbc-time-view-resources .rbc-time-header {
    overflow: hidden;
  }
  .rbc-time-view-resources .rbc-time-header-content {
    min-width: auto;
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    -webkit-flex-basis: 0px;
        -ms-flex-preferred-size: 0px;
            flex-basis: 0px;
  }
  .rbc-time-view-resources .rbc-time-header-cell-single-day {
    display: none;
  }
  .rbc-time-view-resources .rbc-day-slot {
    min-width: 140px;
  }
  .rbc-time-view-resources .rbc-header,
  .rbc-time-view-resources .rbc-day-bg {
    width: 140px;
    -webkit-flex: 1 1 0;
        -ms-flex: 1 1 0px;
            flex: 1 1 0;
    -webkit-flex-basis: 0 px;
        -ms-flex-preferred-size: 0 px;
            flex-basis: 0 px;
  }
  .rbc-time-header-content + .rbc-time-header-content {
    margin-left: -1px;
  }
  .rbc-time-slot {
    -webkit-flex: 1 0 0;
        -ms-flex: 1 0 0px;
            flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rbc-time-slot.rbc-now {
    font-weight: bold;
  }
  .rbc-day-header {
    text-align: center;
  }
  .rbc-slot-selection {
    z-index: 10;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 75%;
    width: 100%;
    padding: 3px;
  }
  .rbc-slot-selecting {
    cursor: move;
  }
  .rbc-time-view {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
    width: 100%;
    border: 1px solid rgb(${p => p.theme.colors.background});
    min-height: 0;
  }
  .rbc-time-view .rbc-time-header-gutter {
    width: 70px !important;
    min-width: 70px !important;
    max-width: 70px !important;
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-view .rbc-time-gutter {
    white-space: nowrap;
  }
  .rbc-time-view .rbc-allday-cell {
    display: none;
  }
  .rbc-time-view .rbc-allday-cell + .rbc-allday-cell {
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-view .rbc-allday-events {
    position: relative;
    z-index: 4;
  }
  .rbc-time-view .rbc-row {
    box-sizing: border-box;
    min-height: 20px;
  }
  .rbc-time-header {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
  }
  .rbc-time-header.rbc-overflowing {
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-time-header.rbc-overflowing {
    border-right-width: 0;
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-header > .rbc-row:first-child {
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-header > .rbc-row.rbc-row-resource {
    border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-header-cell-single-day {
    display: none;
  }
  .rbc-time-header-content {
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    min-width: 0;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-time-header-content {
    border-left-width: 0;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-content {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1 0 0%;
        -ms-flex: 1 0 0%;
            flex: 1 0 0%;
    -webkit-align-items: flex-start;
        -ms-flex-align: start;
            align-items: flex-start;
    width: 100%;
    position: relative;
  }
  .rbc-time-content > .rbc-time-gutter {
    -webkit-flex: none;
        -ms-flex: none;
            flex: none;
  }
  .rbc-time-content > * + * > * {
    border-left: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-rtl .rbc-time-content > * + * > * {
    border-left-width: 0;
    border-right: 1px solid rgb(${p => p.theme.colors.background});
  }
  .rbc-time-content > .rbc-day-slot {
    width: 100%;
    -moz-user-select: none;
     -ms-user-select: none;
         user-select: none;
    -webkit-user-select: none;
  }
  .rbc-current-time-indicator {
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    height: 1px;
    background-color: rgb(${p => p.theme.colors.ruby});
    pointer-events: none;
    left: -800%;
    width: 1600%;
  }`;
