import React from "react";
import { useDispatch } from "react-redux";
// import IntlMessages from "@iso/components/utility/intlMessages";
import actions from "@iso/redux/languageSwitcher/actions";
import config from "./config";

const { changeLanguage } = actions;

export default function LanguageSwitcher({ style }) {
  // const { language } = useSelector((state) => state.LanguageSwitcher);

  const dispatch = useDispatch();
  return (
    <div className="themeSwitchBlock">
      {/* <h4>
        <IntlMessages id="languageSwitcher.label" />
      </h4> */}
      <div style={{ ...style }} className="themeSwitchBtnWrapper">
        {config.options.map((option) => {
          const { languageId, icon } = option;
          // const customClass =
          //   languageId === language.languageId
          //     ? "selectedTheme languageSwitch"
          //     : "languageSwitch";

          return (
            // <button
            //   type="button"
            //   className={customClass}
            //   key={languageId}
            //   onClick={() => {
            //     dispatch(changeLanguage(languageId));
            //   }}
            // >
            <img
              src={icon}
              alt="flag"
              style={{
                width: "50px",
                paddingRight: "10px",
                cursor: "pointer",
              }}
              key={languageId}
              onClick={() => {
                dispatch(changeLanguage(languageId));
              }}
            />
            // </button>
          );
        })}
      </div>
    </div>
  );
}
