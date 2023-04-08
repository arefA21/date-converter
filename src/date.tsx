import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
//gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
//arabic calendar & locale
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";

export const DateConverter = () => {
  const [state, setState] = useState({
    format: `DD (dddd) - MM (MMMM) - YYYY`,
  });
  const [showResult, setShowResult] = useState(false);

  const showRes = () => {
    setShowResult(true);
    console.log(showRes);
  };

  // @ts-ignore
  const convert = (date, format = state.format) => {
    let object = { date, format };

    setState({
      // @ts-ignore
      gregorian: new DateObject(object)
        .convert(gregorian, gregorian_en)
        .format(),
      persian: new DateObject(object).convert(persian, persian_fa).format(),
      arabic: new DateObject(object).convert(arabic, arabic_ar).format(),
      jsDate: date.toDate(),
      ...object,
    });
    setShowResult(false);
  };

  const [type, setType] = useState("");
  return (
    <div className="w-1/2 mt-2 p-2">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <select
          className="bg-slate-200 text-slate-600 flex justify-center h-10 cursor-pointer px-2 outline-0 rounded"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option>نوع تقویم را انتخاب کنید</option>
          <option value={"shamsi"}>شمسی</option>
          <option value={"miladi"}>میلادی</option>
          <option value={"qamari"}>قمری</option>
        </select>

        <DatePicker
          inputClass="custom-input border border-2 border-slate-300 rounded p-2 h-10 outline-none"
          onChange={convert}
          calendar={
            type === "shamsi"
              ? persian
              : arabic && type === "qamari"
              ? arabic
              : persian && type === "miladi"
              ? gregorian
              : persian
          }
          locale={
            type === "shamsi"
              ? persian_fa
              : gregorian_en && type === "qamari"
              ? arabic_ar
              : persian_fa && type === "miladi"
              ? gregorian_en
              : persian_fa
          }
          placeholder="تاریخ"
        />

        <button className="btn bg-slate-700 text-white mr-10 h-10 rounded" onClick={showRes}>
          تبدیل
        </button>
      </div>
      {showResult && (
        <div className="text-center text-slate-700">
          <div className="bg-slate-50 m-1 p-3 text-md rounded border-b border-slate-300">
            <span>میلادی: </span>
            <span>
              {
                // @ts-ignore
                state.gregorian
              }
            </span>
          </div>
          <div className="bg-slate-50 m-1 p-3 text-md rounded border-b border-slate-300">
            <span>هجری شمسی: </span>
            <span>
              {
                // @ts-ignore
                state.persian
              }
            </span>
          </div>
          <div className="bg-slate-50 m-1 p-3 text-md rounded">
            <span>هجری قمری: </span>
            <span>
              {
                // @ts-ignore
                state.arabic
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};