import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import "./style.css";

function SwitchLang() {
  const lang = useSelector(state => state.locale.lang);
  const store = useStore();
  const languages = [
    { id: "en", lang: "English" },
    { id: "ru", lang: "Русский" },
  ];

  function handleChangeLang(langId) {
    store.actions.locale.setLocale(langId)
  }

  return (
    <div className="SwitchLang">
      {languages.map((item) => (
        <div
          key={item.id}
          className={
            "SwitchLang__item" +
            (item.id === lang ? " SwitchLang__item_active" : "")
          }
          onClick={() => handleChangeLang(item.id)}
        >
          {item.lang}
        </div>
      ))}
    </div>
  );
}

export default SwitchLang;
