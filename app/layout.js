import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
    title: "zen",
    description: "Talk with your friends. Or don't.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NextTopLoader showSpinner={false} height={4} />
                {children}
            </body>
        </html>
    );
}
