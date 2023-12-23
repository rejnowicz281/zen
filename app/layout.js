import "./globals.css";

export const metadata = {
    title: "zen",
    description: "Talk with your friends. Or don't.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
