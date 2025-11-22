import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import HomePage from "../pages/home/HomePage";
import { AdmonPanelApp } from "../pages/administrative-panel/AdmonPanelApp";
import BookDetail from "../pages/bookdetail/BookDetailPage";
import { AuthForm } from "../pages/Auth/AuthApp";
import BibliotecaApp from "../pages/library/BibliotecaApp";
import AboutPage from "../pages/about/AboutPage";
import { AdminPanelApp } from "../pages/admin/AdminPanelApp";
import { SuccessPage } from "../pages/estados/SuccessPage";
import { CancelPage } from "../pages/estados/CancelPage";


export function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/administrative-panel" element={<AdmonPanelApp />} />
                <Route path="/ebook/:id/:authorId" element={<BookDetail />} />
                <Route path="/auth" element={<AuthForm />} />
                <Route path="/biblioteca" element={<BibliotecaApp />} />
                <Route path="/acerca-lithub" element={<AboutPage />} />
                <Route path="/admon" element={<AdminPanelApp />} />
                <Route path="/payment/success" element={<SuccessPage />} />
                <Route path="/payment/cancel" element={<CancelPage />} />
            </Routes>
        </BrowserRouter>
    )
}