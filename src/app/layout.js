import "bootstrap/dist/css/bootstrap.min.css";
import "../css/globals.css";

import { Inter } from "next/font/google";
import NavbarComponent from "@/components/NavbarComponent";
import { SSRProvider } from "@/components/bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Example NextJS 13 - CSR,ISR,SSR,SSG",
	description: "Example NextJS 13 - CSR,ISR,SSR,SSG",
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SSRProvider>
					<NavbarComponent />
					<main>{children}</main>
				</SSRProvider>
			</body>
		</html>
	);
}
