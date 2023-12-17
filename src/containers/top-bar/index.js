import { memo, useCallback, useEffect } from "react";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import select from "../../components/select";
import TopNav from "../../components/top-nav";

function TopBar() {
  const { t } = useTranslate();
  const store = useStore();
  const user = useSelector((state) => ({
    name: state.user.name,
    isAuth: state.user.isAuth,
    wait: state.user.wait
  }));

  const callbacks = {
    logout: () => store.actions.user.logout(),
  };

  return (
    <SideLayout side="end" padding="small" border="bottom">
      <Spinner active={user.wait}>
        <TopNav isAuth={!!user.isAuth} name={user.name} callback={callbacks.logout} t={t}/>
      </Spinner>
    </SideLayout>
  );
}

export default memo(TopBar);
