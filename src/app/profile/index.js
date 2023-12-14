import { useEffect } from "react"
import Head from "../../components/head"
import PageLayout from "../../components/page-layout"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import TopBar from "../../containers/top-bar"
import useTranslate from "../../hooks/use-translate"
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import UserCard from "../../components/user-card"

function Profile () {
    const { t } = useTranslate();
    const store = useStore();
    const select = useSelector((state) => ({
        userName: state.user.name,
        userEmail: state.user.email,
        userPhone: state.user.phone
    }))

    useEffect(() => {
        store.actions.user.getUserData();
    }, [])

    return (
        <PageLayout>
            <TopBar />
            <Head title={t("title")}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <UserCard t={t} name={select.userName} email={select.userEmail} phone={select.userPhone}/>
        </PageLayout>
    )
}

export default Profile