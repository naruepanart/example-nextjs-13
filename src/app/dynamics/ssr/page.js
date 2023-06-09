import PageComponent from "@/components/PageComponent";
import React from "react";

export const metadata = {
	title: "SSR",
};

const fetchPostData = async () => {
	const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
	const cacheOptions = { cache: "no-store" };
	//const cacheOptions = { next: { revalidate: 0 } }
	const response = await fetch(apiUrl, cacheOptions); // getServerSideProps
	return response.json();
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>SSR</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} link={`/dynamics/ssr`} />
			))}
		</>
	);
};

export default page;
