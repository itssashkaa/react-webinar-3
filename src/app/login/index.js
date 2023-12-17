import { useEffect, useState } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopBar from "../../containers/top-bar";
import useTranslate from "../../hooks/use-translate";
import Form from "../../components/form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Login() {
  const { t } = useTranslate();
  const [form, setForm] = useState({ login: "", password: "" });
  const store = useStore();
  const select = useSelector(state => ({
    errors: state.user.errors,
    wait: state.user.wait
  }))

  const inputs = [
    {
      value: form.login,
      type: "text",
      placeholder: "",
      title: t('loginTitle'),
      onChange: (e) => setForm({ ...form, login: e.target.value }),
      required: true
    },
    {
      value: form.password,
      type: "password",
      placeholder: "",
      title: t('password'),
      onChange: (e) => setForm({ ...form, password: e.target.value }),
      required: true
    },
  ];

  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      store.actions.user.login(form)
    },
  };

  useEffect(() => {
    return store.actions.user.clearErrors();
  }, [store])

  return (
    <PageLayout>
      <TopBar />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
    <Form
        fields={inputs}
        title={t("login")}
        buttonTitle={t('login')}
        onSubmit={callbacks.onLogin}
        errors={t(select.errors)}
    />     
    </PageLayout>
  );
}

export default Login;
