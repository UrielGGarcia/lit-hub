import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";
import HomePage from "../pages/home/HomePage";
import { AdmonPanelApp } from "../pages/administrative-panel/AdmonPanelApp";
import BookDetail from "../pages/bookdetail/BookDetailPage";
import { AuthForm } from "../pages/Auth/AuthApp";


export function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/administrative-panel" element={<AdmonPanelApp />} />
                <Route path="/ebook/:id/:authorId" element={<BookDetail />} />
                <Route path="/auth" element={<AuthForm />} />
            </Routes>
        </BrowserRouter>
    )
}