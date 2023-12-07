import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../router/router";

function AppRouter () {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
    )
}

export default AppRouter;