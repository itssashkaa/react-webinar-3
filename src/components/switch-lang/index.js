import "./style.css";
import PropTypes from "prop-types";


function SwitchLang({changeLang, lang}) {
  const languages = [
    { id: "en", lang: "English" },
    { id: "ru", lang: "Русский" },
  ];

  return (
    <div className="SwitchLang">
      {languages.map((item) => (
        <div
          key={item.id}
          className={
            "SwitchLang__item" +
            (item.id === lang ? " SwitchLang__item_active" : "")
          }
          onClick={() => changeLang(item.id)}
        >
          {item.lang}
        </div>
      ))}
    </div>
  );
}

SwitchLang.propTypes = {
  changeLang: PropTypes.func,
  lang: PropTypes.string
};

SwitchLang.defaultProps = {
  changeLang: () => {},
  lang: 'ru'
};

export default SwitchLang;
