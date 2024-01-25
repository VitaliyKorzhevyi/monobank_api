import "./Styled/Public-page.css";
import $api from "../Api/api";
import { useState } from "react";
import { toast } from "react-toastify";

export const PublicPage = () => {
  const [dataPublic, setDataPublic] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currencyFound, setCurrencyFound] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("");

  const cc = require("currency-codes");

  const onData = () => {
    console.log("запрос");
    $api.get("/bank/currency").then((response) => {
      setDataPublic(response.data);
      console.log("Дані", response.data);
    });
  };

  const onFileredData = () => {
    const currencyValue = cc.code(searchValue);
    console.log("currencyValue", currencyValue);
    if (!currencyValue) {
      toast.error("Немає такої валюти");
      setCurrencyFound(false);
      return;
    }

    const arDataPublic = dataPublic.find((cur) => {
      if (cur.currencyCodeA === parseInt(currencyValue.number)) {
        setCurrencyCode(currencyValue.code);
        return true;
      }
      setCurrencyFound(true);
      return undefined;
    });
    console.log("Найдено значение:", arDataPublic);
    if (!arDataPublic) {
      toast.warn("Вибачте, дані по цій валюті відсутні");
      setCurrencyFound(false);
      return;
    }

    setDataFiltered(arDataPublic);
    console.log("Найдено значение:", arDataPublic);
  };

  console.log("dataFiltered", dataFiltered);

  //**  ----------------- ФІЛЬТР -----------------

  return (
    <div className="public-page">
      <button type="button" onClick={onData}>
        Завантажити
      </button>
      <input
        type="text"
        name=""
        id=""
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="button" onClick={onFileredData}>
        Знайти
      </button>

      {currencyFound ? (
        <div>
          <p>Валюта: {currencyCode}</p>
          {dataFiltered.rateSell && <p>Покупка: {dataFiltered.rateSell}</p>}
          {dataFiltered.rateBuy && <p>Продаж: {dataFiltered.rateBuy}</p>}
          {dataFiltered.rateCross && (
            <p>Кросс курс до грн: {dataFiltered.rateCross}</p>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
