import { ReactNode } from "react";

import "../styles";
import { geistMono, geistSans } from "../fonts";

export function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
